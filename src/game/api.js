const apiurl = require("./config.js").apiURL
const api = {
    apiRequest(callback, path, params = {}) {
        for (let param in params) {
            if (params[param] == null) delete params[param];
        }
        let qs = new URLSearchParams(params).toString();
        return fetch('' + apiurl + path + (qs ? '?' + qs : ''))
            .then(response => response.json())
            .catch(error => callback(error, null))
            .then(json => callback(null, json));
    },
    listMaps(index, pos, accountid, callback) {
        this.apiRequest(callback, '/maps', {
            'index': index,
            'pos': cWa,
            'accountId': accountid
        });
    },
    listMods(index, pos, cWb, callback) {
        this.apiRequest(callback, '/mods', {
            'index': index,
            'pos': pos,
            'accountId': accountid
        });
    },
    searchMap(val, callback) {
        this.apiRequest(callback, '/search', {
            'type': 'map',
            'val': val
        });
    },
    getMapPreset(mn, callback) {
        this.apiRequest(function(err, resp) {
            callback(mn, (resp || {}).da);
        }, '/config', {
            'mn': mn
        });
    },
    searchMod(val, callback) {
        this.apiRequest(callback, '/search', {
            'type': 'mod',
            'val': val
        });
    }
};
module.exports = api;
