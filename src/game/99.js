const cVO = require("./config.js");
module.exports = function() {
    var cVL;
    this.divs = [];
    this.update = function(cVM) {
        for (var cVN = this.divs.length - 1; 0 <= cVN; --cVN)
            if (0x0 < (cVL = this['divs'][cVN])['delay']) cVL['delay'] -= cVM, 0x0 >= cVL['delay'] && (cVL['style']['display'] = 'inline-block');
            else {
                if (cVL['scale'] > cVL['minScale'] && (cVL['scale'] -= cVL['scaleSpeed'] * cVM, cVL['scale'] <= cVL['minScale'] && (cVL['scale'] = cVL['minScale']), cVL['style']['fontSize'] = cVL['scale'] + 'px'), cVL['scaleSpd'] && (cVL['startS'] += cVL['scaleSpd'] * cVM, cVL['style']['width'] = cVL['startS'] + 'px', cVL['style']['height'] = cVL['startS'] + 'px'), cVL['life'] -= cVM, 0x0 >= cVL['life']) {
                    cVL['style']['display'] = 'none';
                    var cVS = cVL['callback'];
                    this['divs']['splice'](cVN, 0x1), cVS && cVS();
                }
                if (cVL['fade'] && cVL['life'] <= cVL['fade'] && (cVL['style']['opacity'] = cVL['life'] / cVL['fade']), cVL['srcA'] && cVL['srcA']['cnt'] && cVL['maxLife'] - cVL['life'] <= cVL['srcA']['tim']) {
                    var cVT = Math['floor'](cVL['srcA']['cnt'] * ((cVL['maxLife'] - cVL['life']) / cVL['srcA']['tim']));
                    cVL['src'] = cVO['assetsUrl']('/textures/' + cVL['srcA']['src'] + '_' + cVT + '.png');
                }
            }
    };
    this.animateText = function(cVL, cVM, cVN, cVO, cVY, cVZ, cW0, cW1) {
        0x0 > this['divs']['indexOf'](cVL) && this['divs']['push'](cVL), cVL['delay'] = cW0, cW0 || (cVL['style']['display'] = 'inline-block')
        cVL['style']['fontSize'] = cVN + 'px'
        cVL['scale'] = cVN
        cVL['minScale'] = cVO ? 0.4 * cVN : cVN
        cVL['innerHTML'] = cVM
        cVL['scaleSpeed'] = cVO
        cVL['life'] = cVY
        cVL['fade'] = cVZ
        cVL['style']['opacity'] = 1
        cVL['callback'] = cW1;
    };
    this.animateDiv = function(cVL, cVM, cVN, cW5, cW6, cW7) {
        0x0 > this['divs']['indexOf'](cVL) && this['divs']['push'](cVL), cVL['style']['display'] = 'block', cVL['life'] = cVM, cVL['maxLife'] = cVM, cVL['srcA'] = cW7, cW7 && (cVL['src'] = cVO['assetsUrl']('/textures/' + cW7['src'] + '_0.png')), cVL['style']['opacity'] = 0x1, cVL['fade'] = cVN, cW5 && (cVL['style']['width'] = cW5 + 'px', cVL['style']['height'] = cW5 + 'px', cVL['startS'] = cW5, cVL['scaleSpd'] = cW6);
    };
    this.reset = function() {
        for (var cVL = 0x0; cVL < this['divs']['length']; ++cVL) this['divs'][cVL]['style']['display'] = 'none';
        this['divs']['length'] = 0x0;
    };
};
