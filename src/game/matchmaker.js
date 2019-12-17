'use strict';
var cT8 = this && this['__awaiter'] || function(cT5, cT6, cT7, cT8) {
    function cTd(cT5) {
        return cT5 instanceof cT7 ? cT5 : new cT7(function(cT6) {
            cT6(cT5);
        });
    }
    return new(cT7 || (cT7 = Promise))(function(cT7, cTh) {
        function cTi(cT5) {
            try {
                cTo(cT8['next'](cT5));
            } catch (cTk) {
                cTh(cTk);
            }
        }

        function cTl(cT5) {
            try {
                cTo(cT8['throw'](cT5));
            } catch (cTn) {
                cTh(cTn);
            }
        }

        function cTo(cT5) {
            cT5['done'] ? cT7(cT5['value']) : cTd(cT5['value'])['then'](cTi, cTl);
        }
        cTo((cT8 = cT8['apply'](cT5, cT6 || []))['next']());
    });
};
Object.defineProperty(exports, '__esModule', {
    'value': true
});

const cTq = require("url-parse");
class QueueManager {
    constructor(manager, queueClientId, statusCallback, hostCallback, joinCallback, cancelJoinCallback) {
        this.manager = manager;
        this.queueClientId = queueClientId;
        this.statusCallback = statusCallback;
        this.hostCallback = hostCallback;
        this.joinCallback = joinCallback;
        this.cancelJoinCallback = cancelJoinCallback;
        this.status = 'Queuing';
        this.queueSize = 0;
        this.newGameId = null;
    }
    get isQueued() {
        return 'Queuing' != this.status && 'CreatingGame' != this.status && 'Join' != this.status;
    }
    get isActive() {
        return this.manager.queueManager === this;
    }
    _start() {
        return cT8(this, undefined, undefined, function*() {
            this._poll();
        });
    }
    _poll() {
        return cT8(this, undefined, undefined, function*() {
            let cT5 = yield this.manager.matchmakerRequest('/queue/poll', {
                'clientId': this.queueClientId
            });
            this._handleNewStatus(cT5.status);
        });
    }
    _handleNewStatus(cT5) {
        this.status = cT5.t
        switch (cT5.t) {
            case 'Queued':
                this.queueSize = cT5.c.queueSize;
                break;
            case 'CreatingGame':
                let cT6 = cT5.c.pendingGameId;
                this.hostCallback(cT6);
                break;
            case 'Join':
                let cT7 = cT5.c.gameId;
                if (cT7 != this.newGameId) {
                    this.newGameId = cT7;
                    this.joinCallback(cT7);
                }
                break;
            default:
                console.error('Unknown status', cT5);
                return;
        }
        setTimeout(() => {
            this.isActive && this._poll();
        }, 1000);
        if (this.newGameId && 'Join' != cT5.t) {
            this.newGameId = null;
            this.cancelJoinCallback();
        }
        this.statusCallback(cT5.t, cT5.c);
    }
}
exports.QueueManager = QueueManager;

class cTC {
    constructor(matchmakerAddress) {
        this.matchmakerAddress = matchmakerAddress;
        this.cachePingRegion = true;
        this.enableLogging = !!localStorage.getItem('CLIENT_MANAGER_LOGGING');
    }
    get hostname() {
        return localStorage.__HOSTNAME__ || location.hostname;
    }
    seek(cT5) {
        return cT8(this, void 0x0, void 0x0, function*() {
            this.log('Seeking games...');
            let cT6 = localStorage.__REGION__ || cT5.regionId || (yield this.getRegion()),
                cT7 = cT5.gameId || this.parseQuery(),
                cT8 = yield this['matchmakerSeek'](cT6, cT7, cT5['dataQuery'] || null, cT5['autoChangeGame'], cT5['validationToken'], cT5['captchaToken']);
            return cT5['skipReplaceState'] || window['history']['replaceState'](document['title'], document['title'], this['generateHref'](cT8['gameId'])), cT8;
        });
    }
    getRegion() {
        return cT8(this, void 0x0, void 0x0, function*() {
            return new Promise((cT5, cT6) => cT8(this, void 0x0, void 0x0, function*() {
                let cT7 = localStorage['getItem'](cTC['PING_REGION_CACHE_KEY']);
                if (cT7) return void cT5(cT7);
                let cT8 = yield this['fetchPingList'](), cTq = 0x0, cTr = !0x1;
                for (let cT7 in cT8) {
                    let cTP = cT8[cT7],
                        cTQ = cTP['endsWith'](':443') ? 'https:' : 'http:';
                    fetch(cTQ + '//' + cTP + '/ping')['then'](() => {
                        cTr || cTC['setDefaultRegion'](cT7), cTr = !0x0, cT5(cT7);
                    })['catch'](() => {
                        ++cTq >= Object['keys'](cT8)['length'] && cT6('All pings failed.');
                    });
                }
            }));
        });
    }
    switchGame(cT5) {
        window['location']['href'] = this['generateHref'](cT5);
    }
    static setDefaultRegion(cT5) {
        localStorage['setItem'](cTC['PING_REGION_CACHE_KEY'], cT5);
    }
    ['parseQuery']() {
        this['log']('Parsing query...');
        var cT5 = cTq(location['href'], !0x0)['query']['game'];
        return 'string' == typeof cT5 ? cT5 : null;
    }
    ['fetchPingList']() {
        return cT8(this, void 0x0, void 0x0, function*() {
            return this['log']('Fetching list of servrs to ping...'), yield this['matchmakerRequest']('/ping-list', {
                'hostname': this['hostname']
            });
        });
    }
    ['fetchGameList']() {
        return cT8(this, void 0x0, void 0x0, function*() {
            return this['log']('Fetching game list...'), yield this['matchmakerRequest']('/game-list', {
                'hostname': this['hostname']
            });
        });
    }
    ['fetchGameInfo'](cT5) {
        return cT8(this, void 0x0, void 0x0, function*() {
            return this['log']('Fetching game info for ' + cT5 + '...'), yield this['matchmakerRequest']('/game-info', {
                'game': cT5
            });
        });
    }
    matchmakerSeek(cT5, exports = null, cT7, cTq = !0x0, cTr, cTC = null) {
        return cT8(this, undefined, undefined, function*() {
            this.log('Seeking matchmaker with region ' + cT5 + '...');
            let cT8 = {
                'hostname': this.hostname,
                'region': cT5,
                'autoChangeGame': cTq,
                'validationToken': cTr
            };
            exports && (cT8.game = exports);
            cT7 && (cT8.dataQuery = JSON.stringify(cT7));
            cTC && (cT8.captchaToken = cTC);
            return yield this.matchmakerRequest('/seek-game', cT8);
        });
    }
    ['fetchAllDebugInfo'](cT5) {
        return cT8(this, void 0x0, void 0x0, function*() {
            return this['log']('Fetching all debug info...'), yield this['matchmakerRequest']('/internal/all-debug-info', {
                'key': cT5
            });
        });
    }
    ['fetchGameDebugInfo'](cT5, cT6) {
        return cT8(this, void 0x0, void 0x0, function*() {
            return this['log']('Fetching game debug info for ' + cT6 + '...'), yield this['matchmakerRequest']('/internal/game-debug-info', {
                'key': cT5,
                'gameId': cT6
            });
        });
    }
    ['queue'](cT5) {
        return cT8(this, void 0x0, void 0x0, function*() {
            this['queueManager'] && this['unqueue']();
            let cT6 = new cTr(this, cT5['clientId'], cT5['statusCallback'], cT5['hostCallback'], cT5['joinCallback'], cT5['cancelJoinCallback']);
            return this['queueManager'] = cT6, yield cT6['_start']();
        });
    }
    ['unqueue']() {
        return cT8(this, void 0x0, void 0x0, function*() {
            this['queueManager'] = void 0x0;
        });
    }
    ['generateHref'](cT5) {
        return '/?game=' + cT5;
    }
    ['matchmakerRequest'](cT5, exports = {}) {
        return cT8(this, void 0x0, void 0x0, function*() {
            for (let cT7 in this['log']('Executing matchmaker request ' + cT5 + ' with params ' + JSON['stringify'](exports) + '...'), exports) null == exports[cT7] && delete exports[cT7];
            let cT7 = new URLSearchParams(exports)['toString'](),
                cT8 = yield fetch('' + this['matchmakerAddress'] + cT5 + (cT7 ? '?' + cT7 : ''));
            if (cT8['ok']) return yield cT8['json'](); {
                let cT5 = null;
                try {
                    cT5 = yield cT8['json']();
                } catch (cUe) {}
                throw {
                    'message': cT8['statusText'],
                    'response': {
                        'data': cT5
                    }
                };
            }
        });
    }
    log(...cT5) {
        return this.enableLogging ? (console.debug || console.info || console.log)(...cT5) : undefined;
    }
}
exports.default = cTC;
cTC.PING_REGION_CACHE_KEY = 'sid-utils:ping-region';
