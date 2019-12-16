var config = require("../config.js");
var util = require("../util.js");
var msgkey = require("./msgkey.js");
module.exports = {
    ahNum: 0,
    socket: null,
    connected: false,
    socketId: -1,
    sendQueue: [],
    connect: function(url, callback, handlers) {
        if (!this.socket) {
            var scheme = config.enableHttps ? 'wss:' : 'ws:';
            var _this = this;
            try {
                var error = false;
                this.socket = new WebSocket(scheme + url);
                this.socket.binaryType = 'arraybuffer';
                this.socket.onmessage = function(msg) {
                    var dec = util.decodeNetworkMessage(msg.data)[0];
                    var name = dec[0];
                    var data = dec[1];
                    if (name == 'io-init') {
                        _this.socketId = data[0]
                    } else if (handlers[name]) {
                        handlers[name].apply(void 0, data)
                    } else {
                        console.error('Received unregistered event', name);
                    }
                };
                this.socket.onopen = function() {
                    _this.connected = true;
                    callback();
                    for (let msg of _this.sendQueue)
                        _this.send(msg[0], ...msg[1]);
                };
                this.socket.onclose = function() {
                    _this.connected = false;
                    error || callback('Disconnected. Try connecting to another server.');
                };
                this.socket.onerror = function() {
                    if (this.socket.readyState != WebSocket.OPEN) {
                        error = true
                        console.error('Socket error', arguments)
                        callback('Socket error')
                    };
                };
            } catch (e) {
                console.error('Socket connection error:', e);
                callback(e);
            }
        }
    },
    send: function(name, ...data) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.warn('Socket not open yet', name, data);
            this.sendQueue.push([name, data]);
            return;
        }
        this.ahNum = util.rotateNumber(this.ahNum, msgkey);
        var enc = util.encodeNetworkMessage([name, data], this.ahNum);
        this.socket.send(enc);
    },
    socketReady: function() {
        return this.socket && this.connected;
    }
};
