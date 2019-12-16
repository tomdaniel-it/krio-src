(function(bey) {
    const beB = require("./config.js");
    const version = require("./version.js");
    module.exports.keyboardMap = ['', '', '', 'CANCEL', '', '', 'HELP', '', 'BACK_SPACE', 'TAB', '', '', 'CLEAR', 'ENTER', 'ENTER_SPECIAL', '', 'SHIFT', 'CONTROL', 'ALT', 'PAUSE', 'CAPS_LOCK', 'KANA', 'EISU', 'JUNJA', 'FINAL', 'HANJA', '', 'ESCAPE', 'CONVERT', 'NONCONVERT', 'ACCEPT', 'MODECHANGE', 'SPACE', 'PAGE_UP', 'PAGE_DOWN', 'END', 'HOME', 'LEFT', 'UP', 'RIGHT', 'DOWN', 'SELECT', 'PRINT', 'EXECUTE', 'PRINTSCREEN', 'INSERT', 'DELETE', '', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'COLON', 'SEMICOLON', 'LESS_THAN', 'EQUALS', 'GREATER_THAN', 'QUESTION_MARK', 'AT', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'OS_KEY', '', 'CONTEXT_MENU', '', 'SLEEP', 'NUMPAD0', 'NUMPAD1', 'NUMPAD2', 'NUMPAD3', 'NUMPAD4', 'NUMPAD5', 'NUMPAD6', 'NUMPAD7', 'NUMPAD8', 'NUMPAD9', 'MULTIPLY', 'ADD', 'SEPARATOR', 'SUBTRACT', 'DECIMAL', 'DIVIDE', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24', '', '', '', '', '', '', '', '', 'NUM_LOCK', 'SCROLL_LOCK', 'WIN_OEM_FJ_JISHO', 'WIN_OEM_FJ_MASSHOU', 'WIN_OEM_FJ_TOUROKU', 'WIN_OEM_FJ_LOYA', 'WIN_OEM_FJ_ROYA', '', '', '', '', '', '', '', '', '', 'CIRCUMFLEX', 'EXCLAMATION', 'DOUBLE_QUOTE', 'HASH', 'DOLLAR', 'PERCENT', 'AMPERSAND', 'UNDERSCORE', 'OPEN_PAREN', 'CLOSE_PAREN', 'ASTERISK', 'PLUS', 'PIPE', 'HYPHEN_MINUS', 'OPEN_CURLY_BRACKET', 'CLOSE_CURLY_BRACKET', 'TILDE', '', '', '', '', 'VOLUME_MUTE', 'VOLUME_DOWN', 'VOLUME_UP', '', '', 'SEMICOLON', 'EQUALS', 'COMMA', 'MINUS', 'PERIOD', 'SLASH', 'BACK_QUOTE', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'OPEN_BRACKET', 'BACK_SLASH', 'CLOSE_BRACKET', 'QUOTE', '', 'META', 'ALTGR', '', 'WIN_ICO_HELP', 'WIN_ICO_00', '', 'WIN_ICO_CLEAR', '', '', 'WIN_OEM_RESET', 'WIN_OEM_JUMP', 'WIN_OEM_PA1', 'WIN_OEM_PA2', 'WIN_OEM_PA3', 'WIN_OEM_WSCTRL', 'WIN_OEM_CUSEL', 'WIN_OEM_ATTN', 'WIN_OEM_FINISH', 'WIN_OEM_COPY', 'WIN_OEM_AUTO', 'WIN_OEM_ENLW', 'WIN_OEM_BACKTAB', 'ATTN', 'CRSEL', 'EXSEL', 'EREOF', 'PLAY', 'ZOOM', '', 'PA1', 'WIN_OEM_CLEAR', ''];
    module.exports.getB64Size = function() {};
    Number.prototype.round = function(places) {
        return +this.toFixed(places);
    };
    String.prototype.escape = function() {
        return (this + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
    };
    Number.prototype.roundToNearest = function(bex) {
        return 0 < this ? Math.ceil(this / bex) * bex : 0 > this ? Math.floor(this / bex) * bex : this;
    };
    module.exports.capFirst = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    module['exports']['isURL'] = function(bex) {
        try {
            return /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%@_.~+&:]*)*(\?[;&a-z\d%@_.,~+&:=-]*)?(\#[-a-z\d_]*)?$/i ['test'](bex);
        } catch (beH) {}
        return !0x1;
    };
    module['exports']['arrayAverage'] = function(bex) {
        for (var bey = 0x0, bez = 0x0; bez < bex['length']; bez++) bey += bex[bez];
        return bey / bex['length'];
    };
    module['exports']['countInArray'] = function(bex, bey) {
        for (var bez = 0x0, beB = 0x0; beB < bex['length']; beB++) bex[beB] === bey && bez++;
        return bez;
    };
    module['exports']['formatNum'] = function(bex, bey = 0x1) {
        var bez = Math['floor'](Math['log'](Math['abs'](bex)) / Math['log'](0x3e8)),
            beB = 'kmb' [bez - 0x1];
        return beB ? (bex / Math['pow'](0x3e8, bez))['toFixed'](bey) + beB : '' + bex;
    };
    module['exports']['randInt'] = function(bex, bey) {
        return Math['floor'](Math['random']() * (bey - bex + 0x1)) + bex;
    };
    module['exports']['randFloat'] = function(bex, bey) {
        return Math['random']() * (bey - bex) + bex;
    };
    module['exports']['getPercentDiff'] = function(bex, bey) {
        return Math['round']((bey - bex) / bex * 0x64, 0x1);
    };
    module['exports']['getRandom'] = function(bey) {
        return bey[module['exports']['randInt'](0x0, bey['length'] - 0x1)];
    };
    module['exports']['getDistance'] = function(bex, bey, bez, beB) {
        return Math['sqrt']((bez -= bex) * bez + (beB -= bey) * beB);
    };
    module['exports']['getD3D'] = function(bex, bey, bez, beB, beC, bf9) {
        var bfa = bex - beB,
            bfb = bey - beC,
            bfc = bez - bf9;
        return Math['sqrt'](bfa * bfa + bfb * bfb + bfc * bfc);
    };
    module['exports']['getAnglesSSS'] = function(bex, bey, bez) {
        var beB = Math['acos']((bey * bey + bez * bez - bex * bex) / (0x2 * bey * bez)),
            beC = Math['acos']((bez * bez + bex * bex - bey * bey) / (0x2 * bez * bex)),
            bfi = Math['PI'] - beB - beC;
        return [-beB - Math['PI'] / 0x2, beC, bfi];
    };
    module['exports']['getXDire'] = function(bey, bez, beB, beC, bfn, bfo) {
        var bfp = Math['abs'](bez - bfn),
            bfq = module['exports']['getD3D'](bey, bez, beB, beC, bfn, bfo);
        return Math['asin'](bfp / bfq) * (bez > bfn ? -0x1 : 0x1);
    };
    module['exports']['getAngleDst'] = function(bex, bey) {
        return Math['atan2'](Math['sin'](bey - bex), Math['cos'](bex - bey));
    };
    module['exports']['getAngleDist2'] = function(bex, bey) {
        var bez = Math['abs'](bey - bex) % (0x2 * Math['PI']);
        return bez > Math['PI'] ? 0x2 * Math['PI'] - bez : bez;
    };
    module['exports']['toRad'] = function(bex) {
        return bex * (Math['PI'] / 0xb4);
    };
    module['exports']['getDir'] = function(bex, bey, bez, beB) {
        return Math['atan2'](bey - beB, bex - bez);
    };
    module['exports']['lerp'] = function(bex, bey, bez) {
        return bex + (bey - bex) * bez;
    };
    module['exports']['orderByScore'] = function(bex, bey) {
        return bey['score'] - bex['score'];
    };
    module['exports']['orderByKills'] = function(bex, bey) {
        return bey['kills'] - bex['kills'];
    };
    module['exports']['orderByDst'] = function(bex, bey) {
        return bex['dst'] - bey['dst'];
    };
    module['exports']['orderByNum'] = function(bex, bey) {
        return bex - bey;
    };
    module['exports']['capFirst'] = function(bex) {
        return bex['charAt'](0x0)['toUpperCase']() + bex['slice'](0x1);
    };
    module['exports']['truncateText'] = function(bex, bey) {
        return bex['length'] > bey ? bex['substring'](0x0, bey) + '...' : bex;
    };
    module['exports']['cleanseString'] = function(bex) {
        return bex ? bex['replace'](/['"]+/g, '') : bex;
    };
    module['exports']['randomString'] = function(bex) {
        for (var bey = '', bez = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', beB = 0x0; beB < bex; beB++) bey += bez['charAt'](Math['floor'](Math['random']() * bez['length']));
        return bey;
    };
    module['exports']['formatNumCash'] = function(bex) {
        return parseFloat(Math['round'](0x64 * bex) / 0x64)['toFixed'](0x2);
    };
    module['exports']['getKeyName'] = function(bey) {
        return 0x0 > bey ? 'UNBOUND' : 0x4e20 == bey ? 'SCROLL' : 0x2710 < bey ? 'M' + (bey - 0x2710) : module['exports']['keyboardMap'][bey];
    };
    var bfW = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    module['exports']['getDate'] = function(bex) {
        if (!bex) return 'None';
        bex = bex['split'](/[-A-Z :\.]/i);
        var bey = new Date(bex[0x0], --bex[0x1], bex[0x2], bex[0x3], bex[0x4], bex[0x5]),
            bez = new Date(bey['getTime']());
        return bez['getDate']() + ' ' + bfW[bez['getMonth']()] + ' ' + bez['getFullYear']();
    };
    module['exports']['getTime'] = function(bex, bey) {
        if ('inf' == bex) return 'Infinite';
        var bez = parseInt(bex % 0x3e8 / 0x64),
            beB = parseInt(bex / 0x3e8 % 0x3c),
            beC = parseInt(bex / 0xea60 % 0x3c);
        return (beC = 0xa > beC ? '0' + beC : beC) + ':' + (beB = 0xa > beB ? '0' + beB : beB) + (bey ? '.' + bez : '');
    };
    module['exports']['commaFormatNum'] = function(bex) {
        return bex['toString']()['replace'](/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    module['exports']['getReadableTime'] = function(bex, bey) {
        var bez = Math['floor'](bex / 0x3e8),
            beB = Math['floor'](bez / 0x3c);
        bez %= 0x3c;
        var beC = Math['floor'](beB / 0x3c);
        beB %= 0x3c;
        var bfW = Math['floor'](beC / 0x18);
        return (bfW ? bfW + 'd ' : '') + ((beC %= 0x18) ? beC + 'h ' : '') + (beB || 0x0) + 'm ' + (bey ? bez + 's' : '');
    };
    module['exports']['getReadableTime2'] = function(bex) {
        if (0x0 > bex) return 'just now';
        var bey = Math['floor'](bex / 0x3e8),
            bez = Math['floor'](bey / 0x3c),
            beB = Math['floor'](bez / 0x3c);
        bez %= 0x3c;
        var beC = Math['floor'](beB / 0x18);
        return beB %= 0x18, beC ? beC + 'd ago' : beB ? beB + 'h ago' : bez ? bez + 'm ago' : 'just now';
    };
    module['exports']['getTimeH'] = function(bex) {
        parseInt(bex % 0x3e8 / 0x64);
        var bey = Math['floor'](bex / 0x3e8 % 0x3c),
            bez = Math['floor'](bex / 0xea60 % 0x3c),
            beB = Math['floor'](bex / 0x36ee80 % 0x18);
        return (beB = 0xa > beB ? '0' + beB : beB) + ':' + (bez = 0xa > bez ? '0' + bez : bez) + ':' + (bey = 0xa > bey ? '0' + bey : bey);
    };
    module['exports']['scrambleS'] = function(bex) {
        return bex && bex['replace'] ? bex['replace'](/.(.)?/g, '$1') + ('d' + bex)['replace'](/.(.)?/g, '$1') : bex;
    };
    module['exports']['sanitizeStr'] = function(bex) {
        return bex && bex['replace'] ? bex['replace'](/<|>|&/g, '')['replace'](/[^\x00-\x7F]/g, '') : bex;
    };
    module['exports']['fixTo'] = function(bex, bey) {
        return parseFloat(bex['toFixed'](bey));
    };
    module['exports']['limit'] = function(bex, bey) {
        return bex < -bey ? -bey : bex > bey ? bey : bex;
    };
    module['exports']['limitMM'] = function(bex, bey, bez) {
        return bex < bey ? bey : bex > bez ? bez : bex;
    };
    module['exports']['cropVal'] = function(bex, bey) {
        return bex <= bey && bex >= -bey ? 0x0 : bex;
    };
    module['exports']['isNumber'] = function(bex) {
        return null != bex && 'number' == typeof bex && !isNaN(bex) && isFinite(bex);
    };
    module['exports']['arrayInts'] = function(bey) {
        for (var bez = 0x0; bez < bey['length']; ++bez)
            if (!module['exports']['isNumber'](bey[bez])) return !0x1;
        return !0x0;
    };
    module['exports']['isArray'] = function(bex) {
        return !!bex && bex['constructor'] === Array;
    };
    module['exports']['isString'] = function(bex) {
        return bex && 'string' == typeof bex;
    };
    module['exports']['emptyString'] = function(bex) {
        return !bex || 0x0 === bex['length'] || /^\s*$/ ['test'](bex) || !bex['trim']();
    };
    module['exports']['compareString'] = function(bex, bey) {
        return 0x0 <= bex['toLowerCase']()['indexOf'](bey['toLowerCase']()) || 0x0 <= bey['toLowerCase']()['indexOf'](bex['toLowerCase']());
    };
    module['exports']['lineInRect'] = function(bex, bey, bez, beB, beC, bfW, bgK, bgL, bgM, bgN, bgO, bgP) {
        var bgQ = (bgK - bex) * beB,
            bgR = (bgN - bex) * beB,
            bgS = (bgM - bez) * bfW,
            bgT = (bgP - bez) * bfW,
            bgU = (bgL - bey) * beC,
            bgV = (bgO - bey) * beC,
            bgW = Math['max'](Math['max'](Math['min'](bgQ, bgR), Math['min'](bgS, bgT)), Math['min'](bgU, bgV)),
            bgX = Math['min'](Math['min'](Math['max'](bgQ, bgR), Math['max'](bgS, bgT)), Math['max'](bgU, bgV));
        return !(0x0 > bgX) && !(bgW > bgX) && bgW;
    };
    module['exports']['pointInBox3D'] = function(bex, bey, bez, beB, beC) {
        return beC = beC || 0x0, bex >= beB['x'] - beB['width'] - beC && bex <= beB['x'] + beB['width'] + beC && bey >= beB['y'] - beB['height'] - beC && bey <= beB['y'] + beB['height'] + beC && bez >= beB['z'] - beB['length'] - beC && bez <= beB['z'] + beB['length'] + beC;
    };
    module['exports']['similar'] = function(bex, bey, bez) {
        return bez = bez || 0x0, Math['abs'](bex - bey) <= bez;
    };
    module['exports']['pointInBox'] = function(bex, bey, bez, beB, beC, bfW, bhc) {
        return bhc ? bex >= bez && bex <= beC && bey >= beB && bey <= bfW : bex > bez && bex < beC && bey > beB && bey < bfW;
    };
    module['exports']['sharePos'] = function(bex, bey, bez) {
        return bez = bez || 0x0, Math['abs'](bex['x'] - bey['x']) <= bez && Math['abs'](bex['y'] - bey['y']) <= bez && Math['abs'](bex['z'] - bey['z']) <= bez && Math['abs'](bex['d'] - bey['d']) <= bez;
    };
    module['exports']['cdv'] = {
        'x': 'width',
        'y': 'height',
        'z': 'length'
    };
    module['exports']['boxIntersection'] = function(bey, bez, beB, beC, bfW) {
        var bhl = module['exports']['cdv'][beB],
            bhm = module['exports']['cdv'][beC],
            bhn = bey[beB] - bey[bhl] - 0.1,
            bho = bez[beB] - bez[bhl] - 0.1,
            bhp = bey[beB] + bey[bhl] + 0.1,
            bhq = bez[beB] + bez[bhl] + 0.1,
            bhr = bey[beC] - bey[bhm] - 0.1,
            bhs = bez[beC] - bez[bhm] - 0.1,
            bht = bey[beC] + bey[bhm] + 0.1,
            bhu = bez[beC] + bez[bhm] + 0.1,
            bhv = Math['max'](bhn, bho),
            bhw = Math['min'](bhp, bhq);
        if (bhw >= bhv) {
            var bhx = Math['max'](bhr, bhs),
                bhy = Math['min'](bht, bhu);
            if (bhy >= bhx) {
                for (var bhz = [{
                        [beB]: bhv,
                        [beC]: bhx,
                        'd': bfW[0x0]
                    }, {
                        [beB]: bhw,
                        [beC]: bhy,
                        'd': bfW[0x1]
                    }, {
                        [beB]: bhv,
                        [beC]: bhy,
                        'd': bfW[0x2]
                    }, {
                        [beB]: bhw,
                        [beC]: bhx,
                        'd': bfW[0x3]
                    }], bhA = bhz['length'] - 0x1; 0x0 <= bhA; --bhA)(bhz[bhA][beB] == bhp && bhz[bhA][beB] == bhq || bhz[bhA][beB] == bhn && bhz[bhA][beB] == bho || bhz[bhA][beC] == bht && bhz[bhA][beC] == bhu || bhz[bhA][beC] == bhr && bhz[bhA][beC] == bhs || module['exports']['pointInBox'](bhz[bhA][beB], bhz[bhA][beC], bhn, bhr, bhp, bht) || module['exports']['pointInBox'](bhz[bhA][beB], bhz[bhA][beC], bho, bhs, bhq, bhu)) && (bhz[bhA]['dontUse'] = !0x0);
                return bhz;
            }
        }
        return null;
    };
    module['exports']['boxCornerIntersection'] = function(bey, bez, beB, beC) {
        for (var bfW = module['exports']['cdv'][beB], bhG = module['exports']['cdv'][beC], bhH = bey[beB] - bey[bfW], bhI = bez[beB] - bez[bfW], bhJ = bey[beB] + bey[bfW], bhK = bez[beB] + bez[bfW], bhL = bey[beC] - bey[bhG], bhM = bez[beC] - bez[bhG], bhN = bey[beC] + bey[bhG], bhO = bez[beC] + bez[bhG], bhP = [{
                [beB]: bhH,
                [beC]: bhL,
                'd': Math['PI'] / 0x2
            }, {
                [beB]: bhH,
                [beC]: bhN,
                'd': Math['PI']
            }, {
                [beB]: bhJ,
                [beC]: bhL,
                'd': 0x0
            }, {
                [beB]: bhJ,
                [beC]: bhN,
                'd': -Math['PI'] / 0x2
            }], bhQ = bhP['length'] - 0x1; 0x0 <= bhQ; --bhQ) bhP[bhQ]['i'] = bhQ, module['exports']['pointInBox'](bhP[bhQ][beB], bhP[bhQ][beC], bhI, bhM, bhK, bhO, !0x0) || bhP['splice'](bhQ, 0x1);
        return bhP['length'] ? bhP : null;
    };
    module['exports']['getIntersection'] = function(bey, bez, beB) {
        var beC = module['exports']['cdv'][beB],
            bfW = bey[beB] - bey[beC],
            bhW = bez[beB] - bez[beC],
            bhX = bey[beB] + bey[beC],
            bhY = bez[beB] + bez[beC],
            bhZ = Math['max'](bfW, bhW),
            bi0 = Math['min'](bhX, bhY);
        if (bi0 >= bhZ) {
            var bi1 = (bi0 - bhZ) / 0x2;
            return {
                [beB]: bhZ + bi1,
                [beC]: bi1
            };
        }
        return null;
    };
    module['exports']['limitRectVal'] = function(bey, bez, beB) {
        var beC = module['exports']['cdv'][beB];
        if (bey[beB] - bey[beC] < bez[beB] - bez[beC]) {
            var bfW = (bez[beB] - bez[beC] - (bey[beB] - bey[beC])) / 0x2;
            bey[beC] -= bfW, bey[beB] += bfW;
        }
        if (bey[beB] + bey[beC] > bez[beB] + bez[beC]) {
            bfW = (bey[beB] + bey[beC] - (bez[beB] + bez[beC])) / 0x2;
            bey[beC] -= bfW, bey[beB] -= bfW;
        }
    };
    module['exports']['getMaxRect'] = function(bey, bez, beB) {
        for (var beC, bfW, bic, bid, bie = module['exports']['cdv'][bez], bif = module['exports']['cdv'][beB], big = 0x0; big < bey['length']; ++big) beC = null == beC ? bey[big][bez] - bey[big][bie] : Math['min'](bey[big][bez] - bey[big][bie], beC), bic = null == bic ? bey[big][bez] + bey[big][bie] : Math['max'](bey[big][bez] + bey[big][bie], bic), bfW = null == bfW ? bey[big][beB] - bey[big][bif] : Math['min'](bey[big][beB] - bey[big][bif], bfW), bid = null == bid ? bey[big][beB] + bey[big][bif] : Math['max'](bey[big][beB] + bey[big][bif], bid);
        return {
            [bez]: (beC + bic) / 0x2,
            [beB]: (bfW + bid) / 0x2,
            [bie]: Math['abs'](bic - beC) / 0x2,
            [bif]: Math['abs'](bid - bfW) / 0x2
        };
    };
    module['exports']['limitRect'] = function(bey, bez, beB, beC, bfW, bim, bin, bio) {
        var bip = module['exports']['getMaxRect'](bim, bin, bio),
            biq = module['exports']['cdv'][bin],
            bir = module['exports']['cdv'][bio],
            bis = {};
        if (bis[bin] = bey, bis[bio] = bez, bis[biq] = beB, bis[bir] = beC, module['exports']['limitRectVal'](bis, bip, bin), module['exports']['limitRectVal'](bis, bip, bio), 0x0 == bfW || bfW == Math['PI']) {
            var bit = bis[biq];
            bis[biq] = bis[bir], bis[bir] = bit;
        }
        return bis;
    };
    module['exports']['progressOnLine'] = function(bex, bey, bez, beB, beC, bfW) {
        var biA = bez - bex,
            biB = beB - bey,
            biC = Math['sqrt'](biA * biA + biB * biB);
        return ((biA /= biC) * (beC - bex) + (biB /= biC) * (bfW - bey)) / Math['sqrt'](Math['pow'](bez - bex, 0x2) + Math['pow'](beB - bey, 0x2));
    };
    module['exports']['generateSID'] = function(bex) {
        for (var bey = 0x0, bez = !0x0; bez;) {
            bez = !0x1, bey++;
            for (var beB = 0x0; beB < bex['length']; ++beB)
                if (bex[beB]['sid'] == bey) {
                    bez = !0x0;
                    break;
                }
        }
        return bey;
    };
    module['exports']['levelIconId'] = function(bex) {
        return Math['max'](Math['min'](beB['maxLevel'] - 0x1, bex['roundToNearest'](0x2) - 0x1), 0x0);
    };
    module['exports']['eloIconId'] = function(bex) {
        return Math['max'](Math['min'](beB['maxELOLevel'], Math['floor']((bex || 0x0) / beB['eloPer'])), 0x0);
    };
    module['exports']['copyToClipboard'] = function(bex) {
        const bey = document['createElement']('textarea');
        bey['value'] = bex, bey['setAttribute']('readonly', ''), bey['style']['position'] = 'absolute', bey['style']['left'] = '-9999px', document['body']['appendChild'](bey);
        const bez = !!(0x0 < document['getSelection']()['rangeCount']) && document['getSelection']()['getRangeAt'](0x0);
        bey['select'](), document['execCommand']('copy'), document['body']['removeChild'](bey), bez && (document['getSelection']()['removeAllRanges'](), document['getSelection']()['addRange'](bez));
    };
    var biM = function(bex, bey) {
        return bex['concat'](bey);
    };
    Array['prototype']['flatMap'] = function(bex) {
        return function(bex, bey) {
            return bey['map'](bex)['reduce'](biM, []);
        }(bex, this);
    };
    var msgpack = require("msgpack-lite");
    module.exports.encodeNetworkMessage = function(input, bez) {
        let beB = msgpack.encode(input);
        let beC = new Uint8Array(beB.length + 2);
        beC.set(module.exports.encodeShort(bez), beC.length - 2)
        beC.set(beB, 0)
        return beC;
    };
    module.exports.decodeNetworkMessage = function(enc) {
        enc = new Uint8Array(enc);
        let bez = module.exports.decodeShort(enc[enc.length - 2], enc[enc.length - 1]),
            beB = enc.slice(0, enc.length - 2);
        return [msgpack.decode(beB), bez];
    };
    module.exports.rotateNumber = function(last, key) {
        return 0xff & last + key;
    };
    module['exports']['encodeShort'] = function(bex) {
        return [0xf & bex >> 0x4, 0xf & bex];
    };
    module['exports']['decodeShort'] = function(bex, bey) {
        return (bex << 0x4) + bey;
    };
    module['exports']['restartIfNeeded'] = function(bex) {
        if (beB['needsRestart']) {
            for (var bez in bex['sockets']) {
                var beC = bex['sockets'][bez];
                beC['send']('error', 'GAME UPDATING'), beC['close']();
            }
            setTimeout(function() {
                bey['exit']();
            }, 0x3e8);
        }
    };
    module['exports']['thumbnailSize'] = function(bex) {
        return parseInt(0.75 * bex['replace'](/=/g, '')['length']) / 0x3e8;
    };
    module['exports']['hexToRGB'] = bex => bex['replace'](/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (bex, bey, bez, beB) => '#' + bey + bey + bez + bez + beB + beB)['substring'](0x1)['match'](/.{2}/g)['map'](bex => parseInt(bex, 16));
    module.exports.versionifyUrl = function(bex) {
        return bex + '?build=' + version;
    };
    module['exports']['assetsUrl'] = function(bex) {
        return bex['startsWith']('/') && (bex = bex['slice'](0x1)), this['versionifyUrl']('https://assets.krunker.io/' + bex);
    };
    module['exports']['getPreview'] = function(bey, bez) {
        return module['exports']['assetsUrl']('/textures/previews/' + (bey['type'] && 0x3 > bey['type'] ? 'cosmetics/' + bey['type'] + '_' + bey['id'] + (bey['tex'] ? '_' + bey['tex'] : '') : bez['types'][bey['type'] || 0x0] + (bey['type'] && 0x3 == bey['type'] ? bey['id'] + (null == bey['tex'] ? '' : '_' + bey['tex']) : (bey['weapon'] || 0x0) + '_' + (null == bey['mid'] ? null == bey['pat'] ? bey['tex'] ? bey['tex'] : bey['id'] : 'c' + bey['pat'] : 'm' + bey['mid'] + (null == bey['midT'] ? '' : '_' + bey['midT']['split']('_')['slice'](-0x1)[0x0])))) + '.png');
    };
    module['exports']['toSocial'] = function(bey) {
        return './social.html?p=profile&q=' + module['exports']['cleanseString'](bey);
    };
    module['exports']['isDropbox'] = function(bex) {
        return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?(dropbox|dropboxusercontent|dl\.dropboxusercontent)\.com\//g ['test'](bex);
    };
    module['exports']['ctxText'] = function(bex, bey, bez, beB, beC) {
        bex['save'](), bex['translate'](~~beB, ~~beC), bex['fillStyle'] = bez, bex['strokeStyle'] = 'rgba(0, 0, 0, 0.5)', bex['lineWidth'] = 0x1, bex['strokeText'](bey, 0x0, 0x0), bex['fillText'](bey, 0x0, 0x0), bex['restore']();
    };
    module['exports']['getLines'] = function(bex, bey, bez) {
        for (var beB = bey['split'](' '), beC = [], bfW = beB[0x0], biM = 0x1; biM < beB['length']; biM++) {
            var biS = beB[biM];
            bex['measureText'](bfW + ' ' + biS)['width'] < bez ? bfW += ' ' + biS : (beC['push'](bfW), bfW = biS);
        }
        return beC['push'](bfW), beC;
    };
    module['exports']['createCanvasText'] = function(bey, bez, beC, bfW, biM, biS, bjE, bjF) {
        var bjG = 0x0,
            bjH = 0x0;
        bez > bey ? (bjG = 0x1, bjH = bey / bez) : bez < bey ? (bjG = bez / bey, bjH = 0x1) : (bjG = 0x1, bjH = 0x1);
        var bjI = document['createElement']('canvas'),
            bjJ = bjI['getContext']('2d');
        bjI['width'] = 0x400 * bjH, bjI['height'] = 0x400 * bjG, bjE || (bjJ['fillStyle'] = biS, bjJ['fillRect'](0x0, 0x0, bjI['width'], bjI['height']));
        var bjK = bfW;
        bjJ['font'] = bjK + 'px GameFont', beC = beC['substring'](0x0, beB['signTextLimit'] - 0x1), bjJ['textAlign'] = 0x2 == bjF ? 'right' : 0x1 == bjF ? 'center' : 'left';
        var bjL = 0x2 * bjK,
            bjM = bjJ['measureText']('M')['width'] / 0x2;
        bjM = 0x2 == bjF ? bjI['width'] - bjM : 0x1 == bjF ? bjI['width'] / 0x2 : bjM;
        for (var bjN = 1.2 * bjJ['measureText']('M')['width'], bjO = beC['split']('\\n'), bjP = null, bjQ = 0x0; bjQ < bjO['length']; ++bjQ) {
            bjP = module['exports']['getLines'](bjJ, bjO[bjQ], bjI['width'] - bjK);
            for (var bjR = 0x0; bjR < bjP['length'] && (module['exports']['ctxText'](bjJ, bjP[bjR], biM, bjM, bjL), !((bjL += bjN) > bjI['height'])); ++bjR);
        }
        return bjI;
    };
}.call(this, require("process")));
