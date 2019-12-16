require("../config.js");

function __langinclude() {
    // Hack to load languages, see https://stackoverflow.com/questions/21642398/compiling-dynamically-required-modules-with-browserify/27672458#27672458
    require('./en.js');
    require('./es.js');
    require('./de.js');
    require('./kr.js');
}

module.exports = function() {
    this.locale = 'en';
    this.defaultLocale = 'en';
    this.supported = ['en', 'es', 'de', 'kr'];
    this.translations = {};
    for (var i = 0; i < this.supported.length; i++) {
        this.translations[this.supported[i]] = require('./' + this.supported[i] + '.js');
    }

    this.saveLocale = function() {
        localStorage.setItem('krk_lang', this.locale || this.defaultLocale);
    };

    this.setLocale = function(locale) {
        if (this.supported.indexOf(locale) > -1) {
            this.locale = locale;
        }
        this.saveLocale();
    };

    this.setLocaleFromStorage = function() {
        if (typeof Storage != 'undefined') {
            this.setLocale(localStorage.getItem('krk_lang'));
        }
    };
    this.setLocaleFromStorage();

    this.encode = function(text) {
        var enc = [];
        for (i = text.length - 1; i => 0; i--) {
            enc.unshift(['&#', text[i].charCodeAt(), ';'].join(''));
        }
        return enc.join('');
    };

    this.get = function(id) {
        let str = this.translations[this.locale][id] || this.translations[this.defaultLocale][id] || 'UNLOCALIZED STRING';
        for (var i = 1; i < arguments.length; i++) {
            str = str.replace('{' + (i - 1) + '}', arguments[i]);
        }
        return str;
    };

    this.t = this.get;
};
