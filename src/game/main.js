window.calcvcode = __LOADER__calcGameValidationCode;
if (location.hostname == 'localhost') {
    location.hostname = '127.0.0.1';
}

var czZ = typeof __LOADER__sharedObj == 'undefined' ? {} : __LOADER__sharedObj;
var cA0 = require("./config.js");
var cA1 = (0, eval)('typeof require == \"function\"') && cA0.isProd;
var cA2 = typeof Storage != 'undefined';

function cA3(name) {
    cA2 && localStorage.removeItem(name);
}
window.saveVal = function(name, val) {
    cA2 && localStorage.setItem(name, val);
};
window.getSavedVal = function(name) {
    return cA2 ? localStorage.getItem(name) : null;
};

var cA8 = new(require("./lang/locale.js"))();

function cA9() {
    var buttons = ['Ranked', 'Shop', 'Social', 'Maps', 'Mods', 'Settings', 'Host', 'Browser', 'Join'];
    for (i = 0; i < buttons.length; i++) {
        document.getElementById('menuBtn' + buttons[i]).innerHTML = cA8.t('menu.btn.' + buttons[i].toLowerCase());
    }
    customizeButton.innerHTML = cA8.t('menu.btn.customize');
    inviteButton.innerHTML = cA8.t('menu.btn.invite');
}
cA9();

window.openURL = function(url) {
    window.open(url, '_blank');
};

var cAd = new URLSearchParams(window.location.search).has('autoQueue');
var cAe = require("./matchmaker.js").default;
cAe.PING_REGION_CACHE_KEY = 'pingRegion4';
var cAf = new cAe(cA0.matchmakerURL);
var cAg = null;
var cAh = null;
var cAi = null;

function cAj(czW) {
    cAf.switchGame(czW);
}
window.switchServer = cAj;

function cAl(czW) {
    if (cBc && !cAN && (!cAf.queueManager || 'Queued' == cAf.queueManager.status)) {
        var czX;
        var czY = Array.from(document.getElementsByClassName('rankedQueueOption'));
        if (czY.length) {
            czX = czY.filter(czW => czW.checked)
                .map(czW => czW.dataset.queueId);
        } else if (czW && localStorage.lastQueues) {
            czX = JSON.parse(localStorage.lastQueues);
        }
        if (czX.length != 0) {
            localStorage.lastQueues = JSON.stringify(czX);
            var czZ = parseInt('undefined' == typeof queueRegionSelect ? getSavedVal('krk_rankedRegion') : queueRegionSelect.value) || 0;
            saveVal('krk_rankedRegion', czZ);
            cB8.send('queue', czX, cAf.hostname, czZ);
            cG0('Queuing');
        }
    }
}
window.joinQueue = cAl;

function cAs(czW, czX) {
    hostGameMsg && (hostGameMsg.innerHTML = czW);
    czX && function(czW) {
        var czX = cAf.generateHref(czW);
        window.history.replaceState({}, 'Krunker', czX);
        windows[1].lastLoadTime = 0;
        cAg = czW;
    }(czX);
    cLz = null;
    cLA = null;
}

window.checkedSwitchServer = function(czW, czX) {
    czX.innerText = '...';
    cAf.fetchGameInfo(czW).then(czY => {
        var [czZ, cA0, cA1, cA2, cA3] = czY;
        if (cA1 >= cA2) {
            czX.innerHTML = cA8.t('matchmaker.full');
            setTimeout(() => {
                czX.innerText = Math.min(cA1, cA2) + '/' + cA2;
            }, 1000);
        } else {
            cAj(czW);
        }
    });
}

window.leaveQueue = function() {
    cB8.send('unqueue');
    cG0(null);
    cAf.unqueue();
};

Object.defineProperty(window, 'createPrivateRoom', {
    'writeable': false,
    'value': function() {
        if (cB9.mode.isRanked) {
            hostGameMsg.innerHTML = '<span class=\'error\'>Can\'t host match while in ranked.</span>';
        } else {
            for (var czW, czX = [], czY = document['getElementById']('rawMapData'), czZ = 0x0; czZ < cBh['length']; czZ++)(czW = document['getElementById']('gameMap' + czZ)) && czW['checked'] && czX['push'](czZ);
            if (0x0 != czX['length'] || cLz || '' != rawMapData['value']) {
                var cA1 = [];
                for (czZ = 0x0; czZ < cBi['length']; czZ++) cBi[czZ]['preventCustomGames'] || document['getElementById']('gameMode' + czZ)['checked'] && cA1['push'](czZ);
                if (0x0 != cA1['length']) {
                    var cA2 = [];
                    for (czZ = 0x0; czZ < cB9['classes']['length']; czZ++) document['getElementById']('gameClass' + czZ)['checked'] && cA2['push'](czZ);
                    if (0x0 != cA2['length']) {
                        var cA3, cA9 = {
                            'customMap': cLz,
                            'rawMapData': czY ? czY['value'] : null,
                            'private': makePrivate['checked'],
                            'maps': czX,
                            'modes': cA1,
                            'classes': cA2
                        };
                        for (czZ = 0x0; czZ < cA0['serverConfig']['length']; czZ++) cA3 = document['getElementById']('customS' + cA0['serverConfig'][czZ]['varN']), tmpV = cA0['serverConfig'][czZ]['bool'] ? cA3 ? cA3['checked'] : 0x0 : cA0['serverConfig'][czZ]['input'] ? cA3 ? cB0['sanitizeStr'](cA3['value']) : 0x0 : cA3 ? parseFloat(cA3['value']) : 0x0, cA9[cA0['serverConfig'][czZ]['varN']] = tmpV;
                        cB8['send']('custom', cA9), hostGameMsg['innerHTML'] = cA8['t']('generic.wait');
                    } else hostGameMsg['innerHTML'] = '<span class=\'error\'>' + cA8['t']('custom.class.missing') + '</span>';
                } else hostGameMsg['innerHTML'] = '<span class=\'error\'>' + cA8['t']('custom.mode.missing') + '</span>';
            } else hostGameMsg['innerHTML'] = '<span class=\'error\'>' + cA8['t']('custom.map.missing') + '</span>';
        }
    }
});

var cAN = false;
var cAO = 5;

function cAP(czW, czX) {
    if (!czW) return cG0(null), void('AccountAlreadyPlaying' == czX && (cGb(cA8['t']('queue.status.already-queued')), setTimeout(function() {
        cGb(null);
    }, 0x7d0)));
    var czY = null;
    cAf['queue']({
        'clientId': czW,
        'statusCallback': function(czW, czX) {
            cG0(czW, czX);
        },
        'hostCallback': function(czW) {
            cAN = !0x0, cB8['send']('pgi', czW);
        },
        'joinCallback': function(czW) {
            (function czW(czX) {
                playTick();
                cGb('Joining in ' + czX);
                1 < czX && (cG8 = setTimeout(function() {
                    czW(czX -x1);
                }, 1000));
            }(cAO), czY = setTimeout(function() {
                cAf.unqueue()
                cB8.send('unqueue', true)
                cAf.switchGame(czW);
            }, 1000 * cAO));
        },
        'cancelJoinCallback': function() {
            cGb('Cancelled'), clearTimeout(czY), clearTimeout(cG8);
        }
    });
}
Object.defineProperty(console, '_commandLineAPI', {
    'get': function() {
        throw '';
    }
});
var cAY = require("./color.js");
var cAZ = require("three");
cAZ.OBJLoader = require("./64.js")(cAZ);
cAZ.Shaders = require("./lambert-stripped.js")(cAZ);
var cB0 = require("./util.js");
var cB1 = require("./92.js");
var cB2 = new(require("./57.js"))(cAZ, cB0, cAY, cA0, cB1);
var cB3 = window.SOUND = new(require("./sound.js"))(cB0, cA0);
var cB4 = new(require("./74.js"))(cB2, cA0);
var cB5 = require("./98.js");
var cB6 = new(require("./99.js"))(cB2, cA0);
var cB7 = require("./api.js");
var cB8 = require("./proto/socket.js");
var cB9 = require("./88.js").obj;
cB9 = new cB9(false, 0, null, cB2, cB3, cB4);
var cBa = new(require("./101.js"))(cB2, cAZ, cB5, cB0, cB9, cA0, cB8);
cB9.controls = cBa;
var cBb, cBc, cBd, cBe, cBf, cBg;
var cBh = require("./55.js").maps;
var cBi = require("./55.js").modes;
var cBj = require("./90.js");
var cBk = require("./players.js").Player;
var cBl = new(require("bad-words"))();
var version = require("./version.js");
var cBn = (new cAZ.Vector3(), false);
var cBo = null;
window.locked = false;
var cBp, cBq, cBr, cBs, cBt = [];
var cBu = [];
var cBv = null;
var cBw = true;
var cBx = 0;
var cBy = 0;
var cBz = 0;
var cBA = 30;
var cBB = 0;
var cBC = 1;
var cBD = 1;
var cBE = -1;
var cBF = 0;
var cBG = true;
var cBH = true;
var cBI = true;
var cBJ = '';
var cBK = false;
var cBL = 0;
var cBM = 1;
var cBN = true;
var cBO = 0;
var cBP = [];
var cBQ = false;
var cBR = [];
var cBS = false;
var cBT = 0.2;
var cBU = true;
var cBV = true;
var cBW = false;
var cBX = getSavedVal('krk_lastMod') || '';

function cBY(czW) {
    cBX = czW, saveVal('krk_lastMod', czW);
}
cBY(cBX);
var cC0, cC1 = 0x1,
    cC2 = 0x1,
    cC3 = 0x6a4,
    cC4 = 0x384;

function cC5() {
    var czW = window.innerWidth,
        czX = window.innerHeight,
        czY = cC3 * cC2,
        czZ = cC4 * cC2,
        cA0 = czW / czY,
        cA1 = czX / czZ;
    cA1 < cA0 ? (cC1 = cA1, uiBase['style']['transform'] = 'scale(' + cA1['toFixed'](0x3) + ')', uiBase['style']['width'] = (czW / cA1)['toFixed'](0x3) + 'px', uiBase['style']['height'] = czZ + 'px') : (cC1 = cA0, uiBase['style']['transform'] = 'scale(' + cA0['toFixed'](0x3) + ')', uiBase['style']['width'] = czY + 'px', uiBase['style']['height'] = (czX / cA0)['toFixed'](0x3) + 'px'), cC0 = czX / cC1 / 0x2b5, cB2['resize']();
}
window['addEventListener']('resize', cC5);
cC5();
czZ.r = (...czW) => cB8.send(...czW);
window['checkTerms'] = function(czW) {
    czW ? (consentBlock['style']['display'] = 'none', saveVal('consent', 0x1)) : $('#consentShake')['effect']('shake');
};
var cCe = ['/img/button/button-normal.png', '/img/button/button-hover.png', '/img/button/button-pressed.png', '/img/social-buttons/discord-normal.png', '/img/social-buttons/discord-hover.png', '/img/social-buttons/discord-pressed.png', '/img/social-buttons/reddit-normal.png', '/img/social-buttons/reddit-hover.png', '/img/social-buttons/reddit-pressed.png', '/img/social-buttons/twitter-normal.png', '/img/social-buttons/twitter-hover.png', '/img/social-buttons/twitter-pressed.png', '/img/social-buttons/kr-normal.png', '/img/social-buttons/kr-hover.png', '/img/social-buttons/kr-pressed.png'],
    cCf = [];
window['addEventListener']('load', function() {
    for (var czW of cCe) {
        var czX = new Image();
        czX['src'] = czW, cCf['push'](czX);
    }
}), Math['PI2'] = 0x2 * Math['PI'], Math['lerpAngle'] = function(czW, czX, czY) {
    Math['abs'](czX - czW) > Math['PI'] && (czW > czX ? czX += Math['PI2'] : czW += Math['PI2']);
    var czZ = czX + (czW - czX) * czY;
    return 0x0 <= czZ && czZ <= Math['PI2'] ? czZ : czZ % Math['PI2'];
}, console['warn'] = function() {}, console['info'] = function() {};
var cCm = !0x1;
window['toggleStrm'] = function(czW, exports = !0x1) {
    cCm = czW, exports || (czW ? window['history']['pushState'](document['title'], document['title'], '/') : window['history']['pushState'](document['title'], document['title'], cAf['generateHref'](cAg))), cQj(cQh, cQi);
};
var cCp = !0x1;

function cCq(czW) {
    return cA0.apiURL + czW;
}
window['loading'] = !0x1, Object['defineProperty'](window, 'enterGame', {
    'writeable': !0x1,
    'value': function() {
        if (cB9['singlePlayer'] && !cCp) {
            cNp('0:00');
            var czW = cB9['getSpawnPoint'](null, !0x0),
                czX = cB9['classes'][parseInt(cBL)];
            cPe([cB8['socketId'], 0x1, czW['x'], czW['y'], czW['z'], 'TEST', cBL, czX['health'], czX['health'], null, 0x64, null, [null == cGR[czX['loadout'][0x0]] ? -0x1 : cGR[czX['loadout'][0x0]], null == cGR[czX['loadout'][0x1]] ? -0x1 : cGR[czX['loadout'][0x1]]], null, null, czX['secondary'] ? parseInt(cGS) : null, !0x1, null, -((czW['dir'] || 0x0) + 0x1) * Math['PI'] / 0x2, parseInt(cGN), parseInt(cGL), 0x0, 0x0]), cCp = !0x0, cQj([0x1, 'TEST', 0x0, 0x0, 0x0, 0x0]), cB5['toggleMenu'](!0x1);
        } else if (cB8['connected'] && (!cCp || window['spectating'] && !cCP)) {
            bloodDisplay['style']['display'] = 'none', cCp = !0x0, cBa['idleTimer'] = 0x0, cB5['toggleMenu'](!0x1), instructions['innerHTML'] = cA8['t']('generic.loading'), window['loading'] = !0x0;
            czX = parseInt(cBL);
            var czY = cB9['classes'][czX]['loadout'],
                czZ = [null == cGR[czY[0x0]] ? -0x1 : -0x2 == cGR[czY[0x0]] ? cGU(czY[0x0] + 0x1) : cGR[czY[0x0]], null == cGR[czY[0x1]] ? -0x1 : cGR[czY[0x1]]];
            cB8['send']('etg', [czX, -0x2 == cP0 ? cB0['randInt'](0x0, cB9['sprays']['length'] - 0x1) || 0x0 : parseInt(cP0), czZ, -0x2 == cGP ? cGU(null, 0x1) : parseInt(cGP), -0x2 == cGO ? cGU(null, 0x2) : parseInt(cGO), parseInt(cGS), cCP ? 0x1 : 0x0, cCU ? 0x1 : 0x0, cGK, -0x2 == cGN ? cGU(null, 0x3) : parseInt(cGN), parseInt(cGL), parseFloat(cBD), parseInt(cGM)]);
        }
    }
}), window['toggleAd'] = function() {};
var cCw = 0x0,
    cCx = !0x1;

function cCy(czW) {
    cBc && (cBc['funds'] = czW), cFY();
}

function cCA(czW, czX) {
    cBa['idleTimer'] = 0x0, czW ? purchaseError() : (cBc && (cBc['funds'] = czX), cFY(), updateWindow(null, !0x0), cB5['toggleMenuHider'](!0x0), purchaseLoad['style']['display'] = 'none');
}
window['cancelPurchase'] = function() {
    cCx && (cBa['idleTimer'] = 0x0, purchaseResponse['style']['display'] = 'none', cCw = 0x0, purchaseLoad['style']['display'] = 'none', cCx = !0x1);
}, window['showPurchase'] = function(czW) {
    cB9['store']['purchases'][czW] && (cBa['idleTimer'] = 0x0), cCw = czW, purchaseHolder['style']['display'] = 'block';
    var czX = document['getElementById']('paypal-button'),
        czY = document['getElementById']('creatorCodeI') || {};
    czX && (czX['innerHTML'] = ''), cBc && paypal['Button']['render']({
        'style': {
            'size': 'large'
        },
        'env': 'production',
        'commit': !0x0,
        'payment': function(czW, czX) {
            return purchaseHolder['style']['display'] = 'none', czX['request']['post'](cCq('/my-api/create-payment/'), {
                'pIndex': cCw,
                'acID': cBc['id'],
                'creID': czY['value'] || null
            })['then'](function(czW) {
                return czW['id'];
            });
        },
        'onAuthorize': function(czW, czX) {
            return czX['request']['post'](cCq('/my-api/execute-payment/'), {
                'pIndex': cCw,
                'acID': cBc['id'],
                'creID': czY['value'] || null,
                'paymentID': czW['paymentID'],
                'payerID': czW['payerID']
            })['then'](function(czW) {
                czW && null != czW['funds'] && null != czW['funds'] ? (cBc && (cBc['funds'] = czW['funds']), cFY(), updateWindow(null, !0x0), cB5['toggleMenuHider'](!0x0), purchaseLoad['style']['display'] = 'none') : purchaseError(czW);
            });
        },
        'onError': function(czW) {
            purchaseError(czW);
        }
    }, '#paypal-button');
}, purchaseHolder['onclick'] = function() {
    purchaseHolder['style']['display'] = 'none';
}, window['purchaseError'] = function(czW) {
    cCx = !0x0;
    var czX = 'Purchase Error';
    czW && czW['err'] && (czX = czW['err']), purchaseResponse['style']['display'] = 'block', purchaseRespH['innerHTML'] = czX + ' <a href=\'javascript:;\' onclick=\'cancelPurchase()\'>' + cA8['t']('purchase.error.click') + '</a>';
}, purchaseResponse['onclick'] = function() {
    purchaseResponse['style']['display'] = 'none';
};
var cCP = !0x1,
    cCQ = null;
window['noMouseInp'] = !0x1;
var cCR = !0x1,
    cCS = null;
window['spectating'] = !0x1, window['toggleSpect'] = function(czW) {
    cCP = czW;
};
var cCU = !0x1;
window['toggleChal'] = function(czW) {
    cCU = czW;
}, window['spectFP'] = function(czW) {
    (cCR = czW) ? (cCS = !0x0, window['noMouseInp'] = !0x0) : (cCS = null, window['noMouseInp'] = !0x1), cBa['setCamPosOff'](), specIns['innerHTML'] = cCR ? 'Third Person' : 'First Person';
}, window['spectMode'] = function(czW) {
    if (cB9 && cB9['players'])
        if (czW) {
            for (var czX = Math['max'](0x0, cCQ ? cB9['players']['list']['indexOf'](cCQ) : 0x0), czY = null, czZ = 0x0; czZ < cB9['players']['list']['length']; ++czZ)
                if ((czX += czW) >= cB9['players']['list']['length'] ? czX = 0x0 : 0x0 > czX && (czX = cB9['players']['list']['length'] - 0x1), (cBd = cB9['players']['list'][czX]) && cBd['active']) {
                    czY = cBd;
                    break;
                } cCQ != czY && (cCQ = czY, cB8['send']('fpSp', czY ? czY['sid'] : null));
        } else cCQ = null, cBa['setCamPosOff'](), cB8['send']('fpSp');
}, window['specStatUpdate'] = function(czW) {
    if (czW = cCQ) {
        specStats['style']['display'] = 'inline-block';
        for (var czX = czW['name'] + (czW['clan'] ? '<span style=\'color:' + (0x0 <= cA0['verClans']['indexOf'](czW['clan']) ? cAY['verified']['clan'] : '#353535') + '\'> [' + czW['clan'] + ']</span>' : ''), czY = cB9['mode']['endStats'] || cA0['endStats'], czZ = 'font-size:11px;color:rgb(255,255,255,0.5)', cA1 = 0x2; cA1 < czY['length']; ++cA1) czX += '<div style=\'' + czZ + '\'>' + cB0['capFirst'](czY[cA1]) + '<span style=\'float:right;' + czZ + '\'>' + (cA0['endForm'][czY[cA1]] ? cA0['endForm'][czY[cA1]](czW[czY[cA1]], cB9, czW[cL7]) : czW[czY[cA1]]) + '</span></div>';
        specStats['innerHTML'] = czX;
    } else specStats['style']['display'] = 'none', specStats['innerHTML'] = '';
};
const cD6 = new FileReader();
var cD7, cD8, cD9 = !0x1,
    cDa = 0x0,
    cDb = !0x0,
    cDc = {};

function cDd() {
    cCp = !0x1, cBa['idleTimer'] = 0x0, cB5['toggleMenu'](!0x0), cBa['toggle'](!0x1), cMz = {
        'states': []
    };
}

function cDe() {
    menuMiniProfilePic['src'] = hudClassImg['src'] = cBJ['length'] ? cBJ : cB0['assetsUrl']('/textures/classes/icon_' + cBL + '.png');
}

function cDf(czW) {
    var czX = [],
        czY = 0x1 == czW;
    0x1 != cE2[czY ? 'menuSaturation' : 'saturation']['val'] && czX['push']('saturate(' + 0x64 * cE2[czY ? 'menuSaturation' : 'saturation']['val'] + '%)'), 0x0 != cE2[czY ? 'menuHue' : 'hue']['val'] && czX['push']('hue-rotate(' + 3.6 * cE2[czY ? 'menuHue' : 'hue']['val'] + 'deg)'), czX['length'] ? (czY ? uiBase : cB2['renderer']['domElement'])['style']['filter'] = czX['join'](' ') : (czY ? uiBase : cB2['renderer']['domElement'])['style']['removeProperty']('filter');
}
window['addVoiceStream'] = function(czW, czX) {
    cDc[czW] || (cDc[czW] = [], speakerDisplay['innerHTML'] += '<div id=\'speaker' + czW + '\' class=\'voiceSpeaker\'>' + czW + ' <i class=\'material-icons\' style=\'color:#fff;font-size:35px;vertical-align:middle\'>volume_down</i></div>');
    var czY = new Howl({
        'src': [czX],
        'volume': cDa
    });
    cDc[czW]['push'](czY), czY['on']('load', function() {
        czY['duration']() <= cA0['voiceChatMaxLength'] ? (czY['on']('end', function() {
            remSpeaker(czW);
        }), czY['isReady'] = !0x0, 0x0 == cDc[czW]['indexOf'](czY) && czY['play']()) : remSpeaker(czW);
    });
}, window['remSpeaker'] = function(czW, czX) {
    if (cDc[czW] && cDc[czW][0x0] && (cDc[czW]['splice'](0x0, 0x1), cDc[czW][0x0] && cDc[czW][0x0]['isReady'] && cDc[czW][0x0]['play']()), !cDc[czW] || !cDc[czW]['length'] || czX) {
        var czY = document['getElementById']('speaker' + czW);
        czY && czY['parentElement']['removeChild'](czY), delete cDc[czW];
    }
}, window['voiceChat'] = function(czW, czX) {
    if (cDa) {
        cCm && cBl && (czX = cB0['scrambleS'](czX));
        try {
            addVoiceStream(czX, czW);
        } catch (cDr) {}
    }
}, cD6['addEventListener']('load', function() {
    var czW = cD6['result'];
    cB8['send']('vc', czW);
}), window['toggleRecord'] = function(czW) {
    'INPUT' == document['activeElement']['tagName'] || (cBb || window['spectating']) && (czW && !cD9 && cDb ? navigator['mediaDevices']['getUserMedia']({
        'audio': !0x0,
        'video': !0x1
    })['then'](function(czW) {
        cDb = !0x1, voiceDisplay['style']['opacity'] = 0.9, cD9 = !0x0, cD7 = new MediaRecorder(czW, {
            'mimetype': 'audio/ogg',
            'bitsPerSecond': 0x1770
        });
        const czX = [];
        cD7['addEventListener']('dataavailable', function(czW) {
            czX['push'](czW['data']);
        }), cD7['addEventListener']('stop', function() {
            var czW = new Blob(czX, {
                'type': 'audio/ogg; codecs=opus'
            });
            cD6['readAsDataURL'](czW), czX['length'] = 0x0;
        }), cD7['start'](), cD8 = setInterval(function() {
            'recording' == cD7['state'] && cD7['stop'](), cD9 ? cD7['start']() : (voiceDisplay['style']['opacity'] = 0.5, cD8 && clearInterval(cD8), cDb = !0x0);
        }, cA0['voiceRate']);
    })['catch'](function() {
        cD9 = !0x1, voiceDisplay['style']['opacity'] = 0.5, cD8 && clearInterval(cD8);
    }) : !czW && cD9 && cD7 && (cD9 = !0x1));
}, window['updateSliderLabel'] = function(czW, czX) {
    var czY = document['getElementById']('customSet' + czW);
    czY && (czY['innerHTML'] = czX);
}, Object['defineProperty'](window, 'setSetting', {
    'writeable': !0x1,
    'value': function(czW, czX) {
        czX = czX['replace'] ? czX['replace']('>', '') : czX, (cE2[czW]['min'] || cE2[czW]['max']) && (czX = Math['min'](cE2[czW]['max'], Math['max'](cE2[czW]['min'], czX))), document['getElementById']('slid_' + czW) && (document['getElementById']('slid_' + czW)['value'] = czX), document['getElementById']('slid_input_' + czW) && (document['getElementById']('slid_input_' + czW)['value'] = czX), cE2[czW]['val'] = czX, cE2[czW]['set'](czX), saveVal('kro_setngss_' + czW, czX);
    }
}), window['resetSettings'] = function() {
    confirm(cA8['t']('settings.reset.confirm')) && (Object['keys'](localStorage)['filter'](czW => czW['includes']('kro_setngss_') || czW['includes']('cont_'))['forEach'](czW => localStorage['removeItem'](czW)), location['reload']());
}, window['exportSettings'] = function() {
    var czW = {
        'controls': cBa['export']()
    };
    for (var czX in cE2) czW[czX] = cE2[czX]['val'];
    downloadFile('settings.txt', czW);
}, window['importSettings'] = function() {
    var czW = prompt('Copy Paste Settings Text Here');
    if (czW && '' != czW) try {
        let cA0 = JSON['parse'](czW);
        for (var czX in cA0)
            if ('controls' == czX) {
                for (var czY in cA0['controls'])
                    if (cBa[czY])
                        if ('moveKeys' == czY || 'streakKeys' == czY)
                            for (var czZ = 0x0; czZ < cA0['controls'][czY]['length']; czZ++) cBa[czY][czZ] = cA0['controls'][czY][czZ], saveVal('cont_' + (czZ + ('streakKeys' == czY ? 0x12 : 0x0)), cA0['controls'][czY][czZ]);
                        else cBa[czY] = cA0['controls'][czY], saveVal('cont_' + czY, cA0['controls'][czY]);
            } else setSetting(czX, cA0[czX]);
        cBa['checkForScroll'](), showWindow(0x1);
    } catch (cDM) {
        alert('Failed to import settings with error:\x0a' + cDM['toString']());
    }
}, window['aspectSelect'] = function(czW, czX) {
    var czY = czX['selectedIndex'] - 0x1,
        czZ = document['getElementById']('slid_' + czW);
    czZ && (czZ['value'] = 0x0 == czY ? '' : cA0['customRatios'][czY]), czX['selectedIndex'] = 0x0, setSetting(czW, czZ['value']);
};
var cDR = {};

function cDS(czW, czX, czY, czZ) {
    if ('checkbox' == czW) return '<label class=\'switch\'><input type=\'checkbox\' onclick=\'setSetting(\"' + czX + '\", this.checked)\'\x0a        ' + (czY['val'] ? 'checked' : '') + '><span class=\'slider\'></span></label>';
    if ('slider' == czW) return '<input type=\'number\' class=\'sliderVal\' id=\'slid_input_' + czX + '\'\x0a        min=\'' + czY['min'] + '\' max=\'' + czY['max'] + '\' value=\'' + czY['val'] + '\' onkeypress=\'return delayExecute(\"' + czX + '\", this)\' style=\'border-width:0px\'/>\x0a        <div class=\'slidecontainer\'>\x0a        <input type=\'range\' id=\'slid_' + czX + '\' min=\'' + czY['min'] + '\' max=\'' + czY['max'] + '\' step=\'' + czY['step'] + '\'\x0a        value=\'' + czY['val'] + '\' class=\'sliderM\' oninput=\'setSetting(\"' + czX + '\", this.value)\'></div>';
    if ('select' == czW) {
        var cA0 = '<select onchange=\'setSetting(\"' + czX + '\", this.value)\' class=\'inputGrey2\'>';
        for (var cA1 in czZ) cA0 += '<option value=\'' + cA1 + '\' ' + (cA1 == czY['val'] ? 'selected' : '') + '>' + czZ[cA1] + '</option>';
        return cA0 += '</select>';
    }
    return '<input type=\'' + czW + '\' name=\'' + czW + '\' id=\'slid_' + czX + '\'\x0a        ' + ('color' == czW ? 'style=\'float:right;margin-top:5px\'' : 'class=\'inputGrey2\' placeholder=\'' + czZ + '\'') + '\x0a        value=\'' + czY['val'] + '\' oninput=\'setSetting(\"' + czX + '\", this.value)\'/>';
}
window['delayExecute'] = function(czW, czX, require = 0x258) {
    return clearTimeout(cDR[czW]), cDR[czW] = setTimeout(function() {
        setSetting(czW, czX['value']);
    }, require), !0x0;
};
var cE2 = {
    'defaultRegion': {
        'name': 'settings.local.region',
        'cat': 'local',
        get 'val'() {
            return localStorage[cAe['PING_REGION_CACHE_KEY']];
        },
        set 'val'(czW) {},
        'html': function() {
            var czW = {};
            for (var czX of cSA) czW[czX] = cA0['regionNames'][czX];
            return cDS('select', 'defaultRegion', this, czW);
        },
        'set': function(czW) {
            czW && cA0['isProd'] && localStorage['setItem'](cAe['PING_REGION_CACHE_KEY'], czW);
        }
    },
    'lang': {
        'name': 'settings.local.lang',
        'cat': 'local',
        'val': cA8['locale'],
        'html': function() {
            var czW = {};
            for (var czX of cA8['supported']) czW[czX] = cA0['langNames'][czX];
            return cDS('select', 'lang', this, czW);
        },
        'set': function(czW) {
            czW && (cA8['setLocale'](czW), cA9(), 'block' == windowHolder['style']['display'] && cB5['toggleWindow'](!0x1, cBa['gamepad']['_connected']));
        }
    },
    'resolution': {
        'name': 'settings.quality.res',
        'cat': 'quality',
        'val': 0.6,
        'min': 0.1,
        'max': 0x2,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'resolution', this);
        },
        'set': function(czW) {
            cB2['setResMlt'](czW);
        }
    },
    'updateRate': {
        'name': 'settings.quality.updRate',
        'cat': 'quality',
        'val': 0x0,
        'min': 0x0,
        'max': 0x4b0,
        'step': 0xa,
        'html': function() {
            return cDS('slider', 'updateRate', this);
        },
        'set': function(czW) {
            cBz = czW;
        }
    },
    'aspectRatio': {
        'name': 'settings.gameplay.aspectRatio',
        'cat': 'quality',
        'val': '',
        'html': function() {
            var czW = '<select onchange=\'aspectSelect(\"aspectRatio\", this)\' class=\'inputGrey2\'>';
            czW += '<option value=\'\' disabled selected>Presets</option>';
            for (var czX = 0x0; czX < cA0['customRatios']['length']; czX++) czW += '<option>' + cA0['customRatios'][czX] + '</option>';
            return (czW += '</select>') + cDS('input', 'aspectRatio', this, window['innerWidth'] + 'x' + window['innerHeight']);
        },
        'set': function(czW) {
            cB2['aspectRatio'] = czW, cB2['resize']();
        }
    },
    'lowSpec': {
        'name': 'settings.quality.lowSpec',
        'cat': 'quality',
        'val': !0x1,
        'html': function() {
            return cDS('checkbox', 'lowSpec', this);
        },
        'set': function(czW) {
            cB2['lowSpec'] = czW;
        }
    },
    'particles': {
        'name': 'settings.quality.part',
        'cat': 'quality',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'particles', this);
        },
        'set': function(czW) {
            cB4['active'] = czW;
        }
    },
    'shadows': {
        'name': 'settings.quality.shadows',
        'cat': 'quality',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'shadows', this);
        },
        'set': function(czW) {
            cB2['toggleShadowMap'](czW);
        }
    },
    'ambientShading': {
        'name': 'settings.quality.ambient',
        'cat': 'quality',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'ambientShading', this);
        },
        'set': function(czW) {
            cB2['toggleMeshGroup']('ambient_0', czW), cB2['toggleMeshGroup']('ambient_1', czW);
        }
    },
    'showTrails': {
        'name': 'settings.quality.trails',
        'cat': 'quality',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'showTrails', this);
        },
        'set': function(czW) {
            cB4['showTrails'] = czW;
        }
    },
    'muzzleFlash': {
        'name': 'settings.quality.mflash',
        'cat': 'quality',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'muzzleFlash', this);
        },
        'set': function(czW) {
            cB4['showMuzzle'] = czW;
        }
    },
    'sniperFlap': {
        'name': 'settings.quality.flap',
        'cat': 'quality',
        'val': !0x1,
        'html': function() {
            return cDS('checkbox', 'sniperFlap', this);
        },
        'set': function(czW) {
            cB2['sniperFlap'] = czW;
        }
    },
    'scaleUI': {
        'name': 'settings.interface.scale',
        'cat': 'interface',
        'val': 0x1,
        'min': 0.1,
        'max': 0x1,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'scaleUI', this);
        },
        'set': function(czW) {
            cC2 = 0x1 - czW + 0x1, cC5();
        }
    },
    'showUI': {
        'name': 'settings.interface.ui',
        'cat': 'interface',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'showUI', this);
        },
        'set': function(czW) {
            for (cB5['hideGameUI'] = !czW, chatUI['style']['display'] = czW ? 'block' : 'none'; 0xfa <= chatList['scrollHeight'];) chatList['removeChild'](chatList['childNodes'][0x0]);
        }
    },
    'dynamicHP': {
        'name': 'settings.interface.hp',
        'cat': 'interface',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'dynamicHP', this);
        },
        'set': function(czW) {
            cB1['dynamicHP'] = czW;
        }
    },
    'showHitInd': {
        'name': 'settings.interface.hitInd',
        'cat': 'interface',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'showHitInd', this);
        },
        'set': function(czW) {
            cBU = czW, czW || (cRB && (cRB['length'] = 0x0), hitHolder['innerHTML'] = '');
        }
    },
    'showDMG': {
        'name': 'settings.interface.dmg',
        'cat': 'interface',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'showDMG', this);
        },
        'set': function(czW) {
            cB1['showDMG'] = czW;
        }
    },
    'dmgColor': {
        'name': 'settings.interface.dmgCol',
        'cat': 'interface',
        'val': cAY['damage'],
        'html': function() {
            return cDS('color', 'dmgColor', this);
        },
        'set': function(czW) {
            cB1['dmgColor'] = czW;
        }
    },
    'critColor': {
        'name': 'settings.interface.critCol',
        'cat': 'interface',
        'val': cAY['critical'],
        'html': function() {
            return cDS('color', 'critColor', this);
        },
        'set': function(czW) {
            cB1['critColor'] = czW;
        }
    },
    'dmgScale': {
        'name': 'settings.interface.dmgScale',
        'cat': 'interface',
        'val': 0x1,
        'min': 0.1,
        'max': 0x2,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'dmgScale', this);
        },
        'set': function(czW) {
            cB1['dmgScale'] = 0x1e * czW;
        }
    },
    'showChat': {
        'name': 'settings.interface.chat',
        'cat': 'interface',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'showChat', this);
        },
        'set': function(czW) {
            chatHolder['style']['display'] = czW ? 'block' : 'none';
        }
    },
    'showKills': {
        'name': 'settings.interface.kills',
        'cat': 'interface',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'showKills', this);
        },
        'set': function(czW) {
            cBG = czW;
        }
    },
    'showDeaths': {
        'name': 'settings.interface.deaths',
        'cat': 'interface',
        'val': !0x1,
        'html': function() {
            return cDS('checkbox', 'showDeaths', this);
        },
        'set': function(czW) {
            deathCount['style']['display'] = czW ? 'inline-block' : 'none';
        }
    },
    'showStreak': {
        'name': 'settings.interface.streak',
        'cat': 'interface',
        'val': !0x1,
        'html': function() {
            return cDS('checkbox', 'showStreak', this);
        },
        'set': function(czW) {
            streakCount['style']['display'] = czW ? 'inline-block' : 'none';
        }
    },
    'showMessages': {
        'name': 'settings.interface.messages',
        'cat': 'interface',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'showMessages', this);
        },
        'set': function(czW) {
            cBH = czW;
        }
    },
    'showUnboxings': {
        'name': 'settings.interface.unboxings',
        'cat': 'interface',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'showUnboxings', this);
        },
        'set': function(czW) {
            cBI = czW;
        }
    },
    'showPing': {
        'name': 'settings.interface.ping',
        'cat': 'interface',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'showPing', this);
        },
        'set': function(czW) {
            pingDisplay['style']['display'] = czW ? 'block' : 'none';
        }
    },
    'showFPS': {
        'name': 'settings.interface.fps',
        'cat': 'interface',
        'val': !0x1,
        'html': function() {
            return cDS('checkbox', 'showFPS', this);
        },
        'set': function(czW) {
            fpsDisplay['style']['display'] = menuFPSDisplay['style']['display'] = czW ? 'block' : 'none';
        }
    },
    'showSpeed': {
        'name': 'settings.interface.speed',
        'cat': 'interface',
        'val': !0x1,
        'html': function() {
            return cDS('checkbox', 'showSpeed', this);
        },
        'set': function(czW) {
            speedDisplay['style']['display'] = czW ? 'block' : 'none';
        }
    },
    'speedOffX': {
        'name': 'settings.interface.speedOffX',
        'cat': 'interface',
        'val': 0x5,
        'min': 0x0,
        'max': 0xa,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'speedOffX', this);
        },
        'set': function(czW) {
            speedDisplay['style']['left'] = 0xa * czW + '%', speedDisplay['style']['transform'] = 'translate(' + (0xa * czW - 0x64) + '%, ' + (0xa * cE2['speedOffY']['val'] - 0x64) + '%)';
        }
    },
    'speedOffY': {
        'name': 'settings.interface.speedOffY',
        'cat': 'interface',
        'val': 5.4,
        'min': 0x0,
        'max': 0xa,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'speedOffY', this);
        },
        'set': function(czW) {
            speedDisplay['style']['top'] = 0xa * czW + '%', speedDisplay['style']['transform'] = 'translate(' + (0xa * cE2['speedOffX']['val'] - 0x64) + '%, ' + (0xa * czW - 0x64) + '%)';
        }
    },
    'showMedals': {
        'name': 'settings.interface.medals',
        'cat': 'interface',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'showMedals', this);
        },
        'set': function(czW) {
            cBN = czW;
        }
    },
    'hideNames': {
        'name': 'settings.interface.hideNames',
        'cat': 'interface',
        'val': 0x0,
        'html': function() {
            return cDS('select', 'hideNames', this, {
                0: cA8['t']('settings.interface.hideNames.all'),
                1: cA8['t']('settings.interface.hideNames.team'),
                2: cA8['t']('settings.interface.hideNames.enemy'),
                3: cA8['t']('generic.off')
            });
        },
        'set': function() {}
    },
    'nametagStyle': {
        'name': 'settings.interface.nametagStyle',
        'cat': 'interface',
        'val': 0x0,
        'html': function() {
            return cDS('select', 'nametagStyle', this, {
                0: cA8['t']('settings.interface.nametagStyle.all'),
                1: cA8['t']('settings.interface.nametagStyle.name'),
                2: cA8['t']('settings.interface.nametagStyle.nameLvl'),
                3: cA8['t']('settings.interface.nametagStyle.health')
            });
        },
        'set': function(czW) {
            cB1['nametagStyle'] = czW;
        }
    },
    'crosshairSho': {
        'name': 'settings.crosshair.type',
        'cat': 'crosshair',
        'val': 0x1,
        'html': function() {
            return cDS('select', 'crosshairSho', this, {
                0: cA8['t']('generic.off'),
                1: cA8['t']('generic.default'),
                2: cA8['t']('settings.crosshair.type.2'),
                3: cA8['t']('settings.crosshair.type.3'),
                4: cA8['t']('settings.crosshair.type.4')
            });
        },
        'set': function(czW) {
            cB1['crosshairType'] = czW;
            let czX = ['crosshairStyle', 'crosshairAlways', 'crosshairLen', 'crosshairThick'];
            for (let czY of czX) {
                cE2[czY]['hide'] = 'crosshairAlways' == czY ? 0x2 > czW : 0x4 == czW || 0x2 > czW;
                let czX = document['getElementById'](czY + '_div');
                czX && (czX['style']['display'] = cE2[czY]['hide'] ? 'none' : 'block');
            }
            for (let czX of ['crosshairColor', 'crosshairShadow']) {
                cE2[czX]['hide'] = 0x1 > czW || 0x4 == czW;
                let czY = document['getElementById'](czX + '_div');
                czY && (czY['style']['display'] = cE2[czX]['hide'] ? 'none' : 'block');
            }
            cE2['crosshairImage']['hide'] = 0x4 != czW;
            let czY = document['getElementById']('crosshairImage_div');
            czY && (czY['style']['display'] = 0x4 == czW ? 'block' : 'none');
        }
    },
    'crosshairStyle': {
        'name': 'settings.crosshair.style',
        'cat': 'crosshair',
        'val': 0x0,
        'hide': !0x0,
        'html': function() {
            return cDS('select', 'crosshairStyle', this, {
                0: cA8['t']('settings.crosshair.style.0'),
                1: cA8['t']('settings.crosshair.style.1'),
                2: cA8['t']('settings.crosshair.style.2'),
                3: cA8['t']('settings.crosshair.style.3'),
                4: cA8['t']('settings.crosshair.style.4')
            });
        },
        'set': function(czW) {
            cB1['crosshairStyle'] = czW;
        }
    },
    'crosshairImage': {
        'name': 'settings.crosshair.image',
        'cat': 'crosshair',
        'val': '',
        'hide': !0x0,
        'html': function() {
            return cDS('url', 'crosshairImage', this, cA8['t']('settings.crosshair.image.paste'));
        },
        'set': function(czW) {
            czW = cB0['isURL'](czW) && !/\.svg/ ['test'](czW) ? czW : '', cB1['crosshairImage']['src'] != czW && czW['length'] && (cB1['crosshairImage']['src'] = czW);
        }
    },
    'crosshairAlways': {
        'name': 'settings.crosshair.always',
        'cat': 'crosshair',
        'val': !0x1,
        'hide': !0x0,
        'html': function() {
            return cDS('checkbox', 'crosshairAlways', this);
        },
        'set': function(czW) {
            cB1['crosshairAlways'] = czW;
        }
    },
    'crosshairColor': {
        'name': 'settings.crosshair.color',
        'cat': 'crosshair',
        'val': cAY['crosshair']['background'],
        'html': function() {
            return cDS('color', 'crosshairColor', this);
        },
        'set': function(czW) {
            cB1['crosshairColor'] = czW;
        }
    },
    'crosshairShadow': {
        'name': 'settings.crosshair.shadow',
        'cat': 'crosshair',
        'val': cAY['crosshair']['shadow'],
        'html': function() {
            return cDS('color', 'crosshairShadow', this);
        },
        'set': function(czW) {
            cB1['crosshairShadow'] = czW;
        }
    },
    'crosshairLen': {
        'name': 'settings.crosshair.size',
        'cat': 'crosshair',
        'val': 0x10,
        'min': 0x2,
        'max': 0x32,
        'step': 0x1,
        'hide': !0x0,
        'html': function() {
            return cDS('slider', 'crosshairLen', this);
        },
        'set': function(czW) {
            cB1['crosshairLen'] = czW;
        }
    },
    'crosshairThick': {
        'name': 'settings.crosshair.thickness',
        'cat': 'crosshair',
        'val': 0x2,
        'min': 0x2,
        'max': 0x14,
        'step': 0x1,
        'hide': !0x0,
        'html': function() {
            return cDS('slider', 'crosshairThick', this);
        },
        'set': function(czW) {
            cB1['crosshairThick'] = czW;
        }
    },
    'sensitivityX': {
        'name': 'settings.gameplay.sensitivityX',
        'cat': 'gameplay',
        'val': 0x1,
        'min': 0.1,
        'max': 0xf,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'sensitivityX', this);
        },
        'set': function(czW) {
            cBa['sensMltX'] = czW;
        }
    },
    'sensitivityY': {
        'name': 'settings.gameplay.sensitivityY',
        'cat': 'gameplay',
        'val': 0x1,
        'min': 0.1,
        'max': 0xf,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'sensitivityY', this);
        },
        'set': function(czW) {
            cBa['sensMltY'] = czW;
        }
    },
    'aimSensitivityX': {
        'name': 'settings.gameplay.aimsensX',
        'cat': 'gameplay',
        'val': 0x1,
        'min': 0.1,
        'max': 0xf,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'aimSensitivityX', this);
        },
        'set': function(czW) {
            cBa['sensAimMltX'] = czW;
        }
    },
    'aimSensitivityY': {
        'name': 'settings.gameplay.aimsensY',
        'cat': 'gameplay',
        'val': 0x1,
        'min': 0.1,
        'max': 0xf,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'aimSensitivityY', this);
        },
        'set': function(czW) {
            cBa['sensAimMltY'] = czW;
        }
    },
    'fov': {
        'name': 'settings.gameplay.fov',
        'cat': 'gameplay',
        'val': cA0['fov'] + 0x14,
        'min': 0x3c,
        'max': 0x78,
        'step': 0x5,
        'html': function() {
            return cDS('slider', 'fov', this);
        },
        'set': function(czW) {
            cB2['setFov'](czW);
        }
    },
    'lagComp': {
        'name': 'settings.gameplay.lagComp',
        'cat': 'gameplay',
        'val': 0x1,
        'min': 0x1,
        'max': 1.5,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'lagComp', this);
        },
        'set': function(czW) {
            cBD = czW;
        }
    },
    'scrollDir': {
        'name': 'settings.gameplay.scrollDir',
        'cat': 'gameplay',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'scrollDir', this);
        },
        'set': function(czW) {
            cBC = czW ? 0x1 : -0x1;
        }
    },
    'streamMode': {
        'name': 'settings.gameplay.streamer',
        'cat': 'gameplay',
        'val': !0x1,
        'dontInit': !0x0,
        'html': function() {
            return cDS('checkbox', 'streamMode', this);
        },
        'set': function(czW) {
            toggleStrm(czW);
        }
    },
    'challMode': {
        'name': 'settings.gameplay.challenge',
        'cat': 'gameplay',
        'val': !0x1,
        'html': function() {
            return cDS('checkbox', 'challMode', this);
        },
        'set': function(czW) {
            toggleChal(czW);
        }
    },
    'invertY': {
        'name': 'settings.gameplay.invert',
        'cat': 'gameplay',
        'val': !0x1,
        'html': function() {
            return cDS('checkbox', 'invertY', this);
        },
        'set': function(czW) {
            cBa['invertY'] = czW;
        }
    },
    'sensitivityXCntrl': {
        'name': 'settings.controller.sensitivityX',
        'cat': 'controller',
        'val': 0x1,
        'min': 0.1,
        'max': 0xf,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'sensitivityXCntrl', this);
        },
        'set': function(czW) {
            cBa['sensMltXCntrl'] = 0x5 * czW;
        }
    },
    'sensitivityYCntrl': {
        'name': 'settings.controller.sensitivityY',
        'cat': 'controller',
        'val': 0x1,
        'min': 0.1,
        'max': 0xf,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'sensitivityYCntrl', this);
        },
        'set': function(czW) {
            cBa['sensMltYCntrl'] = 0x5 * czW;
        }
    },
    'aimSensitivityXCntrl': {
        'name': 'settings.controller.aimsensX',
        'cat': 'controller',
        'val': 0x1,
        'min': 0.1,
        'max': 0xf,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'aimSensitivityXCntrl', this);
        },
        'set': function(czW) {
            cBa['sensAimMltXCntrl'] = 0x5 * czW;
        }
    },
    'aimSensitivityYCntrl': {
        'name': 'settings.controller.aimsensY',
        'cat': 'controller',
        'val': 0x1,
        'min': 0.1,
        'max': 0xf,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'aimSensitivityYCntrl', this);
        },
        'set': function(czW) {
            cBa['sensAimMltYCntrl'] = 0x5 * czW;
        }
    },
    'deadZoneL': {
        'name': 'settings.controller.deadZoneL',
        'cat': 'controller',
        'val': 0.3,
        'min': 0x0,
        'max': 0x1,
        'step': 0.05,
        'html': function() {
            return cDS('slider', 'deadZoneL', this);
        },
        'set': function(czW) {
            cBa['deadZoneL'] = czW;
        }
    },
    'deadZoneR': {
        'name': 'settings.controller.deadZoneR',
        'cat': 'controller',
        'val': 0.25,
        'min': 0x0,
        'max': 0x1,
        'step': 0.05,
        'html': function() {
            return cDS('slider', 'deadZoneR', this);
        },
        'set': function(czW) {
            cBa['deadZoneR'] = czW;
        }
    },
    'triggerThres': {
        'name': 'settings.controller.triggerThres',
        'cat': 'controller',
        'val': 0.1,
        'min': 0x0,
        'max': 0x1,
        'step': 0.05,
        'html': function() {
            return cDS('slider', 'triggerThres', this);
        },
        'set': function(czW) {
            cBa['triggerThres'] = czW;
        }
    },
    'invertYCntrl': {
        'name': 'settings.controller.invert',
        'cat': 'controller',
        'val': !0x1,
        'html': function() {
            return cDS('checkbox', 'invertYCntrl', this);
        },
        'set': function(czW) {
            cBa['invertYCntrl'] = czW;
        }
    },
    'vibration': {
        'name': 'settings.controller.vibration',
        'cat': 'controller',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'vibration', this);
        },
        'set': function(czW) {
            cBa['vibration'] = czW;
        }
    },
    'sound': {
        'name': 'settings.audio.sound',
        'cat': 'audio',
        'val': 0x1,
        'min': 0x0,
        'max': 0x1,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'sound', this);
        },
        'set': function(czW) {
            cB3['setVolume'](czW);
        }
    },
    'voiceVolume': {
        'name': 'settings.audio.voice',
        'cat': 'audio',
        'val': 0x1,
        'min': 0x0,
        'max': 0x1,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'voiceVolume', this);
        },
        'set': function(czW) {
            cDa = czW;
        }
    },
    'fpsFOV': {
        'name': 'settings.viewmodel.fps',
        'cat': 'viewmodel',
        'val': cA0['fov'],
        'min': 0x3c,
        'max': 0x78,
        'step': 0x5,
        'html': function() {
            return cDS('slider', 'fpsFOV', this);
        },
        'set': function(czW) {
            cB2['setFPSFov'](czW);
        }
    },
    'weaponBob': {
        'name': 'settings.viewmodel.bobbing',
        'cat': 'viewmodel',
        'val': 0x1,
        'min': 0x0,
        'max': 0x3,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'weaponBob', this);
        },
        'set': function(czW) {
            cB2['weaponBob'] = czW;
        }
    },
    'weaponLean': {
        'name': 'settings.viewmodel.leaning',
        'cat': 'viewmodel',
        'val': 0x1,
        'min': 0x0,
        'max': 0x6,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'weaponLean', this);
        },
        'set': function(czW) {
            cB2['weaponLean'] = czW;
        }
    },
    'weaponOffX': {
        'name': 'settings.viewmodel.xOff',
        'cat': 'viewmodel',
        'val': 0x1,
        'min': 0x0,
        'max': 0x2,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'weaponOffX', this);
        },
        'set': function(czW) {
            cB2['weaponOffX'] = czW;
        }
    },
    'weaponOffY': {
        'name': 'settings.viewmodel.yOff',
        'cat': 'viewmodel',
        'val': 0x1,
        'min': 0x0,
        'max': 0x2,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'weaponOffY', this);
        },
        'set': function(czW) {
            cB2['weaponOffY'] = czW;
        }
    },
    'weaponOffZ': {
        'name': 'settings.viewmodel.zOff',
        'cat': 'viewmodel',
        'val': 0x1,
        'min': 0x0,
        'max': 0x2,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'weaponOffZ', this);
        },
        'set': function(czW) {
            cB2['weaponOffZ'] = czW;
        }
    },
    'hideADS': {
        'name': 'settings.viewmodel.show.ads',
        'cat': 'viewmodel',
        'val': !0x1,
        'html': function() {
            return cDS('checkbox', 'hideADS', this);
        },
        'set': function(czW) {
            cB2['hideADS'] = czW;
        }
    },
    'showWeapon': {
        'name': 'settings.viewmodel.show.primary',
        'cat': 'viewmodel',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'showWeapon', this);
        },
        'set': function(czW) {
            if (cB9['hideWeapon'][0x0] = !czW, cBb)
                for (var czX, czY = 0x0; czY < cBb['loadout']['length']; czY++) !(czX = cB9['weapons'][cBb['loadout'][czY]])['secondary'] && !czX['melee'] && cBb['weaponMeshes'][czY] && cBb['weaponIndex'] == czY && (cBb['weaponMeshes'][czY]['visible'] = czW);
        }
    },
    'showWeaponSec': {
        'name': 'settings.viewmodel.show.secondary',
        'cat': 'viewmodel',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'showWeaponSec', this);
        },
        'set': function(czW) {
            if (cB9['hideWeapon'][0x1] = !czW, cBb)
                for (var czX = 0x0; czX < cBb['loadout']['length']; czX++) cB9['weapons'][cBb['loadout'][czX]]['secondary'] && cBb['weaponMeshes'][czX] && cBb['weaponIndex'] == czX && (cBb['weaponMeshes'][czX]['visible'] = czW);
        }
    },
    'showWeaponMel': {
        'name': 'settings.viewmodel.show.melee',
        'cat': 'viewmodel',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'showWeaponMel', this);
        },
        'set': function(czW) {
            if (cB9['hideWeapon'][0x2] = !czW, cBb)
                for (var czX = 0x0; czX < cBb['loadout']['length']; czX++) cB9['weapons'][cBb['loadout'][czX]]['melee'] && cBb['weaponMeshes'][czX] && cBb['weaponIndex'] == czX && (cBb['weaponMeshes'][czX]['visible'] = czW);
        }
    },
    'hudHealthHigh': {
        'name': 'settings.editing.health.high',
        'cat': 'editing',
        'val': cAY['hudHealth']['high'],
        'html': function() {
            return cDS('color', 'hudHealthHigh', this);
        },
        'set': function() {}
    },
    'hudHealthLow': {
        'name': 'settings.editing.health.low',
        'cat': 'editing',
        'val': cAY['hudHealth']['low'],
        'html': function() {
            return cDS('color', 'hudHealthLow', this);
        },
        'set': function() {}
    },
    'scoreColor': {
        'name': 'settings.editing.score.color',
        'cat': 'editing',
        'val': cAY['popupScore'],
        'html': function() {
            return cDS('color', 'scoreColor', this);
        },
        'set': function(czW) {
            scoreText['style']['color'] = czW;
        }
    },
    'scoreShadow': {
        'name': 'settings.editing.score.shadow',
        'cat': 'editing',
        'val': !0x1,
        'html': function() {
            return cDS('checkbox', 'scoreShadow', this);
        },
        'set': function(czW) {
            scoreText['classList']['remove']('blackShad'), czW && scoreText['classList']['add']('blackShad');
        }
    },
    'scoreScale': {
        'name': 'settings.editing.score.scale',
        'cat': 'editing',
        'val': 0x1,
        'min': 0.1,
        'max': 0x2,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'scoreScale', this);
        },
        'set': function(czW) {
            cBM = czW || 0x1;
        }
    },
    'scoreOffX': {
        'name': 'settings.editing.scoreOffX',
        'cat': 'editing',
        'val': 0x5,
        'min': 0x0,
        'max': 0xa,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'scoreOffX', this);
        },
        'set': function(czW) {
            scoreText['style']['left'] = 0xa * czW + '%', scoreText['style']['transform'] = 'translate(' + (0xa * czW - 0x64) + '%, ' + (0xa * cE2['scoreOffY']['val'] - 0x64) + '%)';
        }
    },
    'scoreOffY': {
        'name': 'settings.editing.scoreOffY',
        'cat': 'editing',
        'val': 3.7,
        'min': 0x0,
        'max': 0xa,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'scoreOffY', this);
        },
        'set': function(czW) {
            scoreText['style']['top'] = 0xa * czW + '%', scoreText['style']['transform'] = 'translate(' + (0xa * cE2['scoreOffX']['val'] - 0x64) + '%, ' + (0xa * czW - 0x64) + '%)';
        }
    },
    'saturation': {
        'name': 'settings.editing.saturation',
        'cat': 'editing',
        'val': 0x1,
        'min': 0x0,
        'max': 0x3,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'saturation', this);
        },
        'set': function() {
            cDf(0x0);
        }
    },
    'menuSaturation': {
        'name': 'settings.editing.menuSaturation',
        'cat': 'editing',
        'val': 0x1,
        'min': 0x0,
        'max': 0x3,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'menuSaturation', this);
        },
        'set': function() {
            cDf(0x1);
        }
    },
    'hue': {
        'name': 'settings.editing.hue',
        'cat': 'editing',
        'val': 0x0,
        'min': 0x0,
        'max': 0x64,
        'step': 0x5,
        'html': function() {
            return cDS('slider', 'hue', this);
        },
        'set': function() {
            cDf(0x0);
        }
    },
    'menuHue': {
        'name': 'settings.editing.menuHue',
        'cat': 'editing',
        'val': 0x0,
        'min': 0x0,
        'max': 0x64,
        'step': 0x5,
        'html': function() {
            return cDS('slider', 'menuHue', this);
        },
        'set': function() {
            cDf(0x1);
        }
    },
    'vignette': {
        'name': 'settings.editing.vignette',
        'cat': 'editing',
        'val': 0x0,
        'min': 0x0,
        'max': 0x1,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'vignette', this);
        },
        'set': function(czW) {
            0x1 == czW ? vignette['style']['removeProperty']('opacity') : vignette['style']['opacity'] = czW;
        }
    },
    'chatOp': {
        'name': 'settings.editing.chatOp',
        'cat': 'editing',
        'val': 0x1,
        'min': 0x0,
        'max': 0x1,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'chatOp', this);
        },
        'set': function(czW) {
            chatList['style']['opacity'] = czW;
        }
    },
    'chatBGOp': {
        'name': 'settings.editing.chatBGOp',
        'cat': 'editing',
        'val': 0.2,
        'min': 0x0,
        'max': 0x1,
        'step': 0.1,
        'html': function() {
            return cDS('slider', 'chatBGOp', this);
        },
        'set': function(czW) {
            cBT = czW, Array['from'](document['getElementsByClassName']('chatItem'))['forEach'](function(czX) {
                czX['style']['backgroundColor'] = 'rgba(0, 0, 0, ' + czW + ')';
            });
        }
    },
    'depthMap': {
        'name': 'settings.editing.depth',
        'cat': 'editing',
        'val': 0x0,
        'min': 0x0,
        'max': 0x1f4,
        'step': 0x5,
        'html': function() {
            return cDS('slider', 'depthMap', this);
        },
        'set': function(czW) {
            cB2['toggleDepthMap'](czW);
        }
    },
    'greenScreen': {
        'name': 'settings.editing.green',
        'cat': 'editing',
        'val': !0x1,
        'html': function() {
            return cDS('checkbox', 'greenScreen', this);
        },
        'set': function(czW) {
            cB2['toggleGreenscreen'](czW);
        }
    },
    'canLoadMods': {
        'name': 'settings.mods.load',
        'cat': 'mods',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'canLoadMods', this);
        },
        'set': function(czW) {
            cBw = czW;
        }
    },
    'autoLoadLast': {
        'name': 'settings.mods.auto',
        'cat': 'mods',
        'val': !0x1,
        'html': function() {
            return cDS('checkbox', 'autoLoadLast', this);
        },
        'set': function() {}
    },
    'scopeBorders': {
        'name': 'settings.mods.borders',
        'cat': 'mods',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'scopeBorders', this);
        },
        'set': function(czW) {
            Array['from'](document['querySelectorAll']('.black'))['forEach'](czX => czX['style']['display'] = czW ? 'block' : 'none');
        }
    },
    'customScope': {
        'name': 'settings.mods.scope',
        'cat': 'mods',
        'val': '',
        'html': function() {
            return cDS('url', 'customScope', this, cA8['t']('settings.mods.scope.paste'));
        },
        'set': function(czW) {
            czW = cB0['isURL'](czW) && !/\.svg/ ['test'](czW) ? czW : '', recticleImg['src'] = 0x1 < czW['length'] ? czW : cB0['assetsUrl']('/textures/recticle.png');
        }
    },
    'customHitmarker': {
        'name': 'settings.mods.hitmarker',
        'cat': 'mods',
        'val': '',
        'html': function() {
            return cDS('url', 'customHitmarker', this, cA8['t']('settings.mods.hitmarker.paste'));
        },
        'set': function(czW) {
            czW = cB0['isURL'](czW) && !/\.svg/ ['test'](czW) ? czW : '', hitmarker['src'] = 0x1 < czW['length'] ? czW : cB0['assetsUrl']('/textures/hitmarker_3.png');
        }
    },
    'customADSDot': {
        'name': 'settings.mods.dot',
        'cat': 'mods',
        'val': '',
        'html': function() {
            return cDS('url', 'customADSDot', this, cA8['t']('settings.mods.dot.paste'));
        },
        'set': function(czW) {
            cB2['customADS'] = cB0['isURL'](czW) && !/\.svg/ ['test'](czW) ? czW : '', cB2['customADS']['length'] && (aimDot['src'] = cB2['customADS']);
        }
    },
    'endMessage': {
        'name': 'settings.mods.endmessage',
        'cat': 'mods',
        'val': '',
        'html': function() {
            return cDS('text', 'endMessage', this, cA8['t']('settings.mods.endmessage'));
        },
        'set': function() {}
    },
    'customProfile': {
        'name': 'settings.mods.profile',
        'cat': 'mods',
        'val': '',
        'html': function() {
            return cDS('url', 'customProfile', this, cA8['t']('settings.mods.profile.paste'));
        },
        'set': function(czW) {
            cBJ = cB0['isURL'](czW) && !/\.svg/ ['test'](czW) ? czW : '', cDe();
        }
    },
    'customAmmo': {
        'name': 'settings.mods.ammo',
        'cat': 'mods',
        'val': '',
        'html': function() {
            return cDS('url', 'customAmmo', this, cA8['t']('settings.mods.ammo.paste'));
        },
        'set': function(czW) {
            czW = cB0['isURL'](czW) && !/\.svg/ ['test'](czW) ? czW : '', ammoIcon['src'] = 0x1 < czW['length'] ? czW : cB0['assetsUrl']('/textures/ammo_0.png');
        }
    },
    'customKills': {
        'name': 'settings.mods.kills',
        'cat': 'mods',
        'val': '',
        'html': function() {
            return cDS('url', 'customKills', this, cA8['t']('settings.mods.kills.paste'));
        },
        'set': function(czW) {
            czW = cB0['isURL'](czW) && !/\.svg/ ['test'](czW) ? czW : '', killsIcon['src'] = 0x1 < czW['length'] ? czW : location['origin'] + '/img/skull_0.png';
        }
    },
    'customDeaths': {
        'name': 'settings.mods.deaths',
        'cat': 'mods',
        'val': '',
        'html': function() {
            return cDS('url', 'customDeaths', this, cA8['t']('settings.mods.deaths.paste'));
        },
        'set': function(czW) {
            czW = cB0['isURL'](czW) && !/\.svg/ ['test'](czW) ? czW : '', deathsIcon['src'] = 0x1 < czW['length'] ? czW : location['origin'] + '/img/skull_1.png';
        }
    },
    'customStreak': {
        'name': 'settings.mods.streak',
        'cat': 'mods',
        'val': '',
        'html': function() {
            return cDS('url', 'customStreak', this, cA8['t']('settings.mods.streak.paste'));
        },
        'set': function(czW) {
            czW = cB0['isURL'](czW) && !/\.svg/ ['test'](czW) ? czW : '', streakIcon['src'] = 0x1 < czW['length'] ? czW : location['origin'] + '/img/skull_2.png';
        }
    },
    'useDamageOverlay': {
        'name': 'settings.mods.usedamage',
        'cat': 'mods',
        'val': !0x0,
        'html': function() {
            return cDS('checkbox', 'useDamageOverlay', this);
        },
        'set': function(czW) {
            cBV = czW, czW || (bloodDisplay['style']['display'] = 'none', bloodDisplay['style']['opacity'] = 0x0);
        }
    },
    'customDamage': {
        'name': 'settings.mods.damage',
        'cat': 'mods',
        'val': '',
        'html': function() {
            return cDS('url', 'customDamage', this, cA8['t']('settings.mods.damage.paste'));
        },
        'set': function(czW) {
            czW = cB0['isURL'](czW) && !/\.svg/ ['test'](czW) ? czW : '', bloodDisplay['src'] = 0x1 < czW['length'] ? czW : location['origin'] + '/img/blood.png';
        }
    },
    'customTimer': {
        'name': 'settings.mods.timer',
        'cat': 'mods',
        'val': '',
        'html': function() {
            return cDS('url', 'customTimer', this, cA8['t']('settings.mods.timer.paste'));
        },
        'set': function(czW) {
            czW = cB0['isURL'](czW) && !/\.svg/ ['test'](czW) ? czW : '', timerIcon['src'] = 0x1 < czW['length'] ? czW : location['origin'] + '/img/timer.png';
        }
    },
    'customGameOverlay': {
        'name': 'settings.mods.overlay',
        'cat': 'mods',
        'val': '',
        'html': function() {
            return cDS('url', 'customGameOverlay', this, cA8['t']('settings.mods.overlay.paste'));
        },
        'set': function(czW) {
            czW = cB0['isURL'](czW) && !/\.svg/ ['test'](czW) ? czW : '', overlay['style']['backgroundImage'] = 0x1 < czW['length'] ? 'url(\'' + czW + '\')' : '';
        }
    }
};
for (var cFU in cE2)
    if (cE2[cFU]['set'] && !cE2[cFU]['dontInit']) {
        var cFV = getSavedVal('kro_setngss_' + cFU);
        cE2[cFU]['val'] = null === cFV ? cE2[cFU]['val'] : cFV, 'false' == cE2[cFU]['val'] && (cE2[cFU]['val'] = !0x1), (cE2[cFU]['min'] || cE2[cFU]['max']) && (cE2[cFU]['val'] = Math['min'](cE2[cFU]['max'], Math['max'](cE2[cFU]['min'], cE2[cFU]['val']))), cE2[cFU]['set'](cE2[cFU]['val'], !0x0);
    }

function cFW(czW) {
    cBc && cBc['setData'](czW), updateWindow(0x5), cFY();
}

function cFY() {
    if (cBc) {
        signedOutHeaderBar['style']['display'] = 'none', signedInHeaderBar['style']['display'] = null, cBc['level'] >= cA0['rewardMinLvl'] ? (claimHolder['style']['display'] = 'block', merchHolder['style']['top'] = '205px', cGz()) : merchHolder['style']['top'] = '110px', menuAccountUsername['innerText'] = cBc['name'], menuKRCount['innerHTML'] = cBc['funds'] + ' <span style=\'color:#fff\'>KR</span>', menuLevelText['innerText'] = 'LVL ' + cBc['level'], menuLevelBar['style']['width'] = cBc['levelProg'] + '%';
        var czW = cB0['levelIconId'](cBc['level']);
        menuLevelIcon['style']['backgroundImage'] = 'url(\'/img/levels/' + czW + '.png\')';
    } else signedOutHeaderBar['style']['display'] = null, signedInHeaderBar['style']['display'] = 'none', claimHolder['style']['display'] = 'none', merchHolder['style']['top'] = '110px';
}

function cG0(czW, czX) {
    if (cBa['idleTimer'] = 0x0, czW) switch (czW) {
        case 'Queuing':
            cGb(cA8['t']('queue.status.queuing'));
            break;
        case 'Queued':
            cGb(cA8['t']('queue.status.queued', czX['queueSize']), !0x0);
            break;
        case 'CreatingGame':
            cGb(cA8['t']('queue.status.creating-game'));
            break;
        case 'Join':
            break;
        default:
            console['warn']('Unknown status', czW), cGb('?');
    } else cGb(null);
}
window['changeCont'] = function(czW, czX) {
    czX || showWindow(0x7, !0x0), 0x3 >= czW || 0x12 <= czW && 0x15 >= czW ? cBa['inputChanger'] = czW : 0x4 == czW ? cBa['inputChanger'] = 'jumpKey' : 0x5 == czW ? cBa['inputChanger'] = 'crouchKey' : 0x6 == czW ? cBa['inputChanger'] = 'meleeKey' : 0x7 == czW ? cBa['inputChanger'] = 'swapKey' : 0x8 == czW ? cBa['inputChanger'] = 'reloadKey' : 0x9 == czW ? cBa['inputChanger'] = 'sprayKey' : 0xa == czW ? cBa['inputChanger'] = 'aimKey' : 0xb == czW ? cBa['inputChanger'] = 'chatKey' : 0xc == czW ? cBa['inputChanger'] = 'voiceKey' : 0xd == czW ? cBa['inputChanger'] = 'primKey' : 0xe == czW ? cBa['inputChanger'] = 'inspKey' : 0xf == czW ? cBa['inputChanger'] = 'listKey' : 0x10 == czW ? cBa['inputChanger'] = 'interactKey' : 0x11 == czW ? cBa['inputChanger'] = 'dropKey' : 0x16 == czW ? cBa['inputChanger'] = 'interactSecKey' : 0x17 == czW ? cBa['inputChanger'] = 'wepVisKey' : 0x18 == czW && (cBa['inputChanger'] = 'shootKey'), document['getElementById']('cont' + czW)['innerHTML'] = cA8['t']('settings.controls.press');
}, window['unbindCont'] = function(czW, czX) {
    cBa['inputChanger'] = null, czX || showWindow(0x7, !0x0);
    let czY = null;
    0x3 >= czW || 0x12 <= czW && 0x15 >= czW ? czY = czW : 0x4 == czW ? czY = 'jumpKey' : 0x5 == czW ? czY = 'crouchKey' : 0x6 == czW ? czY = 'meleeKey' : 0x7 == czW ? czY = 'swapKey' : 0x8 == czW ? czY = 'reloadKey' : 0x9 == czW ? czY = 'sprayKey' : 0xa == czW ? czY = 'aimKey' : 0xb == czW ? czY = 'chatKey' : 0xc == czW ? czY = 'voiceKey' : 0xd == czW ? czY = 'primKey' : 0xe == czW ? czY = 'inspKey' : 0xf == czW ? czY = 'listKey' : 0x10 == czW ? czY = 'interactKey' : 0x11 == czW ? czY = 'dropKey' : 0x16 == czW ? czY = 'interactSecKey' : 0x17 == czW ? czY = 'wepVisKey' : 0x18 == czW && (czY = 'shootKey'), document['getElementById']('cont' + czW)['innerHTML'] = 'UNBOUND', cBa['moveKeys'][czY] ? cBa['moveKeys'][czY] = -0x1 : cBa['streakKeys'][czY - 0x12] ? cBa['streakKeys'][czY - 0x12] = -0x1 : cBa[czY] = -0x1, cBa['checkForScroll'](), saveVal('cont_' + czY, -0x1);
};
var cG8 = null;
var cG9 = null,
    cGa = !0x1;

function cGb(czW, exports = !0x1) {
    cB8['connected'] && (czW != cG9 || exports != cGa) && (cG9 = czW, cGa = exports, czW ? (queueStatus['style']['display'] = 'inline-block', queueStatusText['innerText'] = czW, uiBase['classList']['toggle']('isQueued', !0x0)) : (queueStatus['style']['display'] = 'none', uiBase['classList']['toggle']('isQueued', !0x1)), cS8(), 'none' != windowHolder['style']['display'] && updateWindow(0x1b));
}
const cGe = [];
let cGf, cGg = 0x0;

function cGh(czW) {
    try {
        accResp['innerHTML'] = czW || '', accResp['style']['display'] = czW ? 'block' : 'none';
    } catch (cGj) {}
}

function cGk(czW, czX) {
    0x0 <= czW && cGh(cA8['t']('generic.wait')), cB8['send']('a', czW, czX);
}

function cGn(czW, czX, czY, czZ, cA1) {
    if (czW) {
        cGh(czW)
    } else {
        cBc = new cBj(czX, czY, null, cA0)
        saveVal('krunker_id', czX)
        saveVal('krunker_username', czY)
        cFW(czZ)
        cBc['hack'] && (window['activeHacker'] = true)
        cA1 && (saveVal('krunker_token', cA1), loginToken = cA1)
        updateWindow(null, true)
        cAd && (cAd = false, cAl(true))
    };
}
window['registerAcc'] = function() {
    cGk(0x0, [accName['value'], accPass['value']]);
}, window['loginAcc'] = function() {
    cGk(0x1, [accName['value'], accPass['value'], null]);
}, window['logoutAcc'] = function() {
    cB9 && cB9['mode']['isRanked'] || (cGk(-0x1), cGh(), cA3('krunker_id'), cA3('krunker_username'), cA3('krunker_token'), cA3('skins'), cA3('hatIndex'), cA3('backIndex'), cA3('meleeIndex'), cA3('skinColIndex'), cGP = -0x1, cGO = -0x1, cGN = -0x1, cGL = -0x1, cGR = {}, selectSecondary(0x2), windows[0xc]['clanData'] = null, windows[0x1a]['cantQueue'] = null, loginToken = null, cBc = null, cFW(), showWindow(0x5), cHf());
};
var cGt = !0x1;
window['newTok'] = function(czW) {
    czW && (saveVal('krunker_token', czW), loginToken = czW);
}, window['logoutSessions'] = function(czW) {
    czW && (czW['style']['display'] = 'none'), cGt = !0x0, cB8['send']('las');
};
var cGw, cGx = 0x0,
    cGy = !0x1;

function cGz(czW) {
    if (czW || 'block' == claimHolder['style']['display']) {
        cGx = cA0['rewardTime'] - ((cBp || Date['now']()) - cBc['lastReward']);
        var czX = cB0['getTimeH'](Math['max'](0x0, cGx));
        (czW || cGw != czX) && (cGw = czX, claimTimer['innerHTML'] = '00:00:00' == czX ? cGy ? '' : 'Play 1 Game' : czX, claimTimer['style']['fontSize'] = '00:00:00' == czX ? cGy ? '18px' : '13px' : '18px', merchHolder['style']['top'] = '00:00:00' == czX && cGy ? '205px' : '237px');
        var czY = 0x0 >= cGx && cGy ? './img/claim_0.png' : './img/claim_1.png';
        claimImg['getAttribute']('src') != czY && (claimImg['src'] = czY);
    }
}

function cGD(czW, czX) {
    cCy(czX), cBc && (cBc['lastReward'] = czW), cGz();
}
window['claimReward'] = function() {
    0x0 < cGx || !cGy || function() {
        if (!cSD) {
            cSD = !0x0;
            var czW = document['createElement']('script');
            czW['src'] = '//cdn.playwire.com/bolt/js/zeus/embed.js', czW['type'] = 'text/javascript', czW['setAttribute']('charset', 'utf-8'), czW['setAttribute']('data-config', '//config.playwire.com/1020124/v2/pre_content.json'), czW['setAttribute']('data-width', '640px'), czW['setAttribute']('data-height', '360px'), czW['setAttribute']('data-id', 'pre-content-player'), czW['setAttribute']('data-hidden-container', 'my-content'), czW['setAttribute']('data-onready', 'window.boltEventHandlers'), cB8['send']('sfk');
            var czX = document['getElementById']('pre-content-container');
            czX['style']['display'] = 'block', czX['appendChild'](czW), cSB = setTimeout(function() {
                let czW = 'none' != document['getElementById']('my-content')['style']['display'];
                czW && cSE(!0x1);
            }, 0x3a98), cSC = setTimeout(function() {
                cSE(!0x1);
            }, 0x9c40);
        }
    }();
}, Object['defineProperty'](window, 'setClassIndex', {
    'writeable': !0x1,
    'value': function(czW) {
        cBL = czW;
    }
});
var cGK = 0x1,
    cGL = getSavedVal('skinColIndex') || -0x1,
    cGM = getSavedVal('attachIndex') || 0x0,
    cGN = getSavedVal('meleeIndex') || -0x1,
    cGO = getSavedVal('backIndex') || -0x1,
    cGP = getSavedVal('hatIndex') || -0x1,
    cGQ = getSavedVal('skins'),
    cGR = cGQ ? JSON['parse'](cGQ) : {};
setClassIndex(getSavedVal('classindex') || 0x0);
var cGS = getSavedVal('secondaryInd') || 0x2,
    cGT = 0x0;

function cGU(czW, czX) {
    if (!cBc) return -0x1;
    var czY = cBc['skins']['filter'](czY => cB9['store']['skins'][czY['ind']] && (null == czX ? !cB9['store']['skins'][czY['ind']]['type'] && cB9['store']['skins'][czY['ind']]['weapon'] == czW : cB9['store']['skins'][czY['ind']]['type'] == czX));
    return czY['length'] && cB0['getRandom'](czY)['ind'] || -0x1;
}
Object['defineProperty'](window, 'selectHat', {
    'writeable': !0x1,
    'value': function(czW) {
        saveVal('hatIndex', czW), cGP = czW, cHf(), showWindow(0x3);
    }
}), Object['defineProperty'](window, 'selectBack', {
    'writeable': !0x1,
    'value': function(czW) {
        saveVal('backIndex', czW), cGO = czW, cHf(), showWindow(0x3);
    }
}), Object['defineProperty'](window, 'selectMelee', {
    'writeable': !0x1,
    'value': function(czW) {
        saveVal('meleeIndex', czW), cGN = czW, cHf(), showWindow(0x3);
    }
}), Object['defineProperty'](window, 'selectSecondary', {
    'writeable': !0x1,
    'value': function(czW) {
        saveVal('secondaryInd', czW), cGS = czW, cHf(), showWindow(0x3);
    }
}), Object['defineProperty'](window, 'selectSkinColor', {
    'writeable': !0x1,
    'value': function(czW) {
        saveVal('skinColIndex', czW), cGL = czW, cHf(), updateWindow(0x3);
    }
}), Object['defineProperty'](window, 'selectAttachment', {
    'writeable': !0x1,
    'value': function(czW) {
        saveVal('attachIndex', czW), cGM = czW, cHf(), showWindow(0x3);
    }
}), Object['defineProperty'](window, 'selectClass', {
    'writeable': !0x1,
    'value': function(czW) {
        saveVal('classindex', czW), cB9['classes'][czW]['txts'] ? cS4(cB9['classes'][czW]['txts'][cB0['randInt'](0x0, cB9['classes'][czW]['txts']['length'] - 0x1)]) : !cB0['randInt'](0x0, 0x2) && cS4(['Let\'s Go!', 'Alright!', 'I\'m Ready!'][cB0['randInt'](0x0, 0x2)]), setClassIndex(czW), cHf(), showWindow(0x3);
    }
}), Object['defineProperty'](window, 'skinSelector', {
    'writeable': !0x1,
    'value': function(czW) {
        cGT = czW, cHf(), showWindow(0xf);
    }
}), Object['defineProperty'](window, 'selectSkin', {
    'writeable': !0x1,
    'value': function(czW, czX) {
        cBd = cB9['store']['skins'][czW], cGR[czX] = cBd || -0x2 == czW ? czW : void 0x0, saveVal('skins', JSON['stringify'](cGR)), cHf(), showWindow(0x3);
    }
});
var cH9, cHa, cHb = 0x294,
    cHc = 0x15e,
    cHd = new cAZ['PerspectiveCamera'](0xf, 0x1, 0.1, 0x64),
    cHe = new cAZ['WebGLRenderer']({
        'canvas': classPreviewCanvas,
        'precision': 'mediump',
        'antialias': !0x1,
        'alpha': !0x0
    });

function cHf() {
    function czW(czW, czX = !0x0) {
        czY && (czY += ' - ');
        var czZ = 'inherit',
            cA0 = cB9['weapons'][czW]['name'];
        if (null != cGR[czW]) {
            var cA1 = cB9['store']['skins'][cGR[czW]];
            cA1 && (czZ = cB9['store']['rarities'][cA1['rarity']]['color'], cA0 = cA1['name']);
        }
        czY += '<span style=\'color:' + (czX ? czZ : 'inherit') + '\'>' + cA0 + '</span>';
    }
    var czX = cB9['classes'][cBL];
    menuClassName['innerText'] = czX['name'];
    var czY = '';
    for (var czZ of czX['loadout']) czW(czZ);
    menuClassSubtext['innerHTML'] = czY, (cH9 = new cAZ['Scene']())['add'](new cAZ['AmbientLight'](0x97a0a8));
    var cA1 = new cAZ['DirectionalLight'](0xf2f8fc, 0.5);
    cA1['position']['set'](0xa, 0x11, -0xa), cH9['add'](cA1);
    var cA2 = [null != cGR[czX['loadout'][0x0]] || -0x2 != cGR[czX['loadout'][0x0]] ? cGR[czX['loadout'][0x0]] : -0x1, null == cGR[czX['loadout'][0x1]] ? -0x1 : cGR[czX['loadout'][0x1]]];
    (cHa = new cBk(-0x1, this, cB0, cAY, cA0, cB9))['sid'] = -0x1, cHa['init'](0x0, 0x0, 0x0, 'preview', !0x1), cHa['skins'] = cA2, cHa['hatIndex'] = -0x2 == cGP ? -0x1 : cGP, cHa['backIndex'] = -0x2 == cGO ? -0x1 : cGO, cHa['meleeIndex'] = -0x2 == cGN ? -0x1 : cGN, cHa['attachIndex'] = cGM, cHa['skinColIndex'] = cGL, cHa['secIndex'] = cGS, cHa['setClass'](cB9, cBL, cGS, !0x0), cB9['players']['swapWeapon'](cHa, 0x0, !0x0), cH9['add'](cB9['players']['generateMeshes'](cHa, !0x1, !0x0)), cHa['swapTime'] = 0x0, cHa['weaponMeshes'][0x0]['visible'] = !0x0, cHd['lookAt'](new cAZ['Vector3'](0x0, 0.8 * cA0['ahnMyEEY'], 0x0));
}
cHd['position']['x'] = -0xa, cHd['position']['y'] = 0x11, cHd['position']['z'] = -0x1d, cHf();
var cHr = !('true' != getSavedVal('krk_hideFull'));
window['toggleHF'] = function(czW) {
    cHr = czW, saveVal('krk_hideFull', czW);
}, toggleHF(cHr);
var cHt = !('true' != getSavedVal('krk_regionPriority'));
window['toggleRP'] = function(czW) {
    cHt = czW, saveVal('krk_regionPriority', czW);
}, toggleRP(cHt);
var cHv = 0x1f;

function cHw(czW, czX, require = 0x0) {
    for (var czZ, cA0 = '', cA1 = 'map' == czX ? 'selectHostMap' : 'loadUserMod', cA2 = 0x0; cA2 < czW['length']; ++cA2) {
        if (czZ = -0x1, czW[cA2] && czW[cA2]['map_date']) {
            var cA3 = 0x0,
                cA8 = new Date(czW[cA2]['map_date']);
            cA8 && (cA3 = cBp - (cA8['getTime']() || 0x0)), czZ = cA3 / 0x5265c00;
        }
        cA0 += '<div class=\'mapListItem\'>' + (0x0 <= czZ && 0x7 >= czZ ? '<div class=\'mapAgeD\' style=\'background-color:#E040FB\'>NEW</div>' : '') + '<div class=\'mapInfoB\'>?</div><div style=\'height:100px;width:220px;overflow: hidden;\'><img class=\'mapListThumb\' loading=\'lazy\' src=\'' + (czW[cA2][czX + '_image'] ? czW[cA2][czX + '_image'] : './img/noimg.png') + '\' onclick=\'' + cA1 + '(&quot;' + czW[cA2][czX + '_name'] + '&quot;,&quot;' + czW[cA2]['mod_url'] + '&quot;,&quot;' + czW[cA2]['mod_id'] + '&quot;)\'/></div><div style=\'margin-top:1px\'><a href=\'javascript:;\' onclick=\'' + cA1 + '(&quot;' + czW[cA2][czX + '_name'] + '&quot;,&quot;' + czW[cA2]['mod_url'] + '&quot;,&quot;' + czW[cA2]['mod_id'] + '&quot;)\'/>' + czW[cA2][czX + '_name'] + '</a></div><div style=\'display: flex\'><span style=\'color:rgba(0,0,0,0.2);font-size:15px\'> by <a target=\'_blank\' class=\'grey\' href=\'/social.html?p=profile&q=' + czW[cA2]['creatorname'] + '\'>' + czW[cA2]['creatorname'] + '</a></span><div style=\'font-size:15px;text-align:right;flex-grow:1\'>' + czW[cA2][czX + '_votes'] + '</div></div></div>';
    }
    return cA0;
}

function cHG(czW, czX) {
    var czY = '<div id=\'skinList\'><div class=\'skinCard\'>' + (0x3 == czX ? 'Combat Knife' : cA8['t']('generic.none')) + '<div class=\'itemOwn\'>' + cA8['t']('generic.default') + '</div><img class=\'skinImgC\' src=\'' + cB0['assetsUrl']('/textures/previews/cosmetics/' + czX + '_default.png') + '\'><div class=\'selctBtn\' onmouseenter=\'playTick()\' style=\'width: 127px;\' onclick=\'' + czW + '(-1)\'>' + cA8['t']('generic.select') + '</div></div><div class=\'skinCard\'>' + cA8['t']('generic.random') + '<div class=\'itemOwn\' style=\'opacity:0;\'\'>by ???</div><img class=\'skinImgC skinSil\' src=\'' + cB0['assetsUrl']('/textures/previews/cosmetics/' + czX + '_default.png') + '\'><div class=\'skinRandom blackShad\'>?</div><div class=\'selctBtn\' onmouseenter=\'playTick()\' style=\'width: 127px;\' onclick=\'' + czW + '(-2)\'>' + cA8['t']('generic.select') + '</div></div>';
    if (cBc || cB9['singlePlayer'])
        for (var czZ = (cB9['singlePlayer'] ? Object['keys'](cB9['store']['skins'])['map'](czW => czW = {
                'ind': parseInt(czW),
                'cnt': 0x1
            }) : cBc['skins'])['slice']()['sort'](function(czW, czX) {
                return (null != czX['ind'] && cB9['store']['skins'][czX['ind']] ? cB9['store']['skins'][czX['ind']]['rarity'] : 0x0) - (null != czW['ind'] && cB9['store']['skins'][czW['ind']] ? cB9['store']['skins'][czW['ind']]['rarity'] : 0x0);
            }), cA0 = 0x0; cA0 < czZ['length']; ++cA0)(cBd = cB9['store']['skins'][czZ[cA0]['ind']]) && cBd['type'] == czX && (czY += '<div class=\'skinCard\' style=\'color:' + cB9['store']['rarities'][cBd['rarity']]['color'] + '\'><div class=\'itemCnt\' data-badge=\'x' + czZ[cA0]['cnt'] + '\'></div>' + cBd['name'] + '<div class=\'itemOwn\'>by ' + (cBd['creator'] || 'Krunker.io') + '</div><img class=\'skinImg' + (cBd['type'] ? 'C' : '') + '\' src=\'' + cB0['getPreview'](cBd, cB9['store']) + '\'/><div class=\'selctBtn\' onmouseenter=\'playTick()\'onclick=\'' + czW + '(' + czZ[cA0]['ind'] + ')\'>' + cA8['t']('generic.select') + '</div><div class=\'selctInfoBtn\' onmouseenter=\'playTick()\'onclick=\'openURL(&quot;/social.html?p=itemsales&i=' + czZ[cA0]['ind'] + '&quot;)\'>?</div></div>');
    return czY += '</div>';
}
window['windows'] = [{
    'header': cA8['t']('windows.settings.header'),
    'settingSearch': null,
    'searchList': function() {
        var czW = document['getElementById']('settingSearch');
        this['settingSearch'] = czW && '' != czW['value'] ? czW['value'] : null, (czW = document['getElementById']('settingHolder')) && (czW['innerHTML'] = this['getSettings']());
    },
    'getCSettings': function() {
        return '';
    },
    'getSettings': function() {
        var czW = '',
            czX = [];
        for (var czY in cE2) this['settingSearch'] && (!this['searchMatches'](cE2[czY]) || cE2[czY]['hide']) || (-0x1 == czX['indexOf'](cE2[czY]['cat']) && (czX['push'](cE2[czY]['cat']), czW += '<div class=\'setHed\'>' + cA8['t']('settings.' + cE2[czY]['cat'] + '.header') + '</div>'), czW += '<div class=\'settName\' title=\'' + (cE2[czY]['info'] || '') + '\'' + (null == cE2[czY]['hide'] ? '' : 'id=\'' + czY + '_div\' style=\'display:' + (cE2[czY]['hide'] ? 'none' : 'block') + '\'') + '>' + cA8['t'](cE2[czY]['name']) + ' ' + cE2[czY]['html']() + '</div>');
        var czZ = czW + this['getCSettings']();
        return czZ['length'] ? czZ : '<div class=\'setHed\'>' + cA8['t']('settings.none') + '</div>';
    },
    'genList': function() {
        var czW = '<div style=\'width:100%;padding-bottom:15px;\'><div style=\'display:inline-block;width:65%;\'><a href=\'javascript:;\' onclick=\'showWindow(7);\' class=\'+\'>' + cA8['t']('settings.controls.change') + '</a> | <a onclick=\'importSettings()\' class=\'+\'>' + cA8['t']('settings.import') + '</a> | <a onclick=\'exportSettings()\' class=\'+\'>' + cA8['t']('settings.export') + '</a> | <a onclick=\'resetSettings()\' class=\'+\'>' + cA8['t']('settings.reset') + '</a></div><div style=\'float:right;display:inline-block;\'><input id=\'settingSearch\' ' + (this['settingSearch'] ? 'value=\'' + this['settingSearch'] + '\'' : '') + ' type=\'text\' placeholder=\'' + cA8['t']('generic.search') + '\' oninput=\'windows[0].searchList()\'></div></div>';
        return czW += '<div id=\'settingHolder\'>' + this['getSettings']() + '</div>';
    },
    'gen': function() {
        return this['genList']();
    },
    'searchMatches': function(czW) {
        return !!czW['name'] && 0x0 <= (cA8['t'](czW['name']) || '')['toLowerCase']()['indexOf']((this['settingSearch'] || '')['toLowerCase']());
    }
}, {
    'header': cA8['t']('windows.servers.header'),
    'lastLoadTime': 0x0,
    'serverListData': [],
    'gen': function() {
        return Date['now']() - this['lastLoadTime'] < cA0['serverBrowserRate'] ? this['genList']() : (this['lastLoadTime'] = Date['now'](), this['loadData']());
    },
    'loadData': function() {
        return cAf['fetchGameList']()['then'](czW => {
            this['totalPlayerCount'] = czW['totalPlayerCount'];
            var czX = czW['games'];
            this['serverListData'] = czX;
            var czY = !0x1;
            for (var czZ of czX) {
                var [cA0, cA1, cA2, cA3, czW] = czZ;
                if (cA0 === cAg) {
                    czY = !0x0;
                    break;
                }
            }
            czY ? window['showWindow'](0x2, !0x0) : cAf['fetchGameInfo'](cAg)['then'](czW => {
                this['privateServerData'] = czW, window['showWindow'](0x2, !0x0);
            });
        }), cA8['t']('generic.loading');
    },
    'expandedRegion': -0x1,
    'totalPlayerCount': 0x0,
    'serverSearch': null,
    'searchList': function() {
        var czW = document['getElementById']('serverSearch');
        this['serverSearch'] = czW && '' != czW['value'] ? czW['value'] : null, (czW = document['getElementById']('serverHolder')) && (czW['innerHTML'] = this['getServers']());
    },
    'getServers': function() {
        for (var czW = !!localStorage['debugServerList'], czX = '', czY = {
                'custom': {
                    'order': 0x1,
                    'name': 'Custom Games',
                    'players': 0x0,
                    'games': []
                }
            }, czZ = cE2['defaultRegion']['val'], cA1 = !0x1, cA2 = 0x0; cA2 < this['serverListData']['length']; cA2++) {
            var cA3 = this['serverListData'][cA2],
                [cA9, cAd, cAe, cAf, cAh] = cA3;
            if (cAh) {
                czY[cAd] || (czY[cAd] = {
                    'name': cA0['regionNames'][cAd],
                    'players': 0x0,
                    'games': []
                }, czZ == cAd && (czY[cAd]['order'] = 0x1));
                var cAi = cAh['cs'] ? 'custom' : cAd;
                cA3[0x2] = Math['min'](cAe, cAf), cAg === cA9 && (cA1 = !0x0), (!this['serverSearch'] || this['searchMatches'](cA3)) && (czY[cAi]['players'] += cAe), czY[cAi]['games']['push'](cA3);
            } else console['warn']('Server doesn\'t have data yet.');
        }
        cA1 || (this['privateServerData'] ? this['privateServerData'][0x4] ? czY['custom']['games']['push'](this['privateServerData']) : console['warn']('Server doesn\'t have data yet.') : console['warn']('Missing private server data.'));
        var cAj = [];
        for (var cAd in czY) czY['hasOwnProperty'](cAd) && cAj['push'](czY[cAd]);
        for (var cAd of cAj = cAj['sort']((czW, czX) => (czX['order'] || -0x1) - (czW['order'] || -0x1))) cAd['games']['sort']((czW, czX) => czX[0x2] - czW[0x2]), 'Custom Games' == cAd['name'] && cHt && cAd['games']['sort']((czW, czX) => czZ == czW[0x1] && czZ != czX[0x1] ? -0x1 : czZ == czX[0x1] && czZ != czW[0x1] ? 0x1 : 0x0);
        cBc && cBc['level'];
        for (var cAl = 0x0; cAl < cAj['length']; cAl++) {
            (cAd = cAj[cAl])['games'] = cAd['games']['filter'](czW => !cHr || czW[0x2] != czW[0x3]);
            var cAs = cAd['name'] + '<span style=\'float:right\'>' + cAd['players'] + ' online</span>',
                cAN = this['expandedRegion'] == cAl;
            if (czX += '<div class=\'menuSelectorHeader\' onclick=\'setExpandedRegion(' + (cAN ? -0x1 : cAl) + ')\' style=\'cursor: pointer;\'>' + (cAN ? '&#x25BC;' : '&#x25B6;') + ' ' + cAs + '</div>', cAN) {
                czX += '<div class=\'menuSelectorHolder\'>';
                for (var cAO = 0x0, cAP = 0x0; cAP < cAd['games']['length']; cAP++) {
                    var cAY = cAd['games'][cAP],
                        [cA9, cAZ, cAe, cAf, cAh] = cAY,
                        cB0 = cAg && cAg == cA9;
                    if (!this['serverSearch'] || this['searchMatches'](cAY)) {
                        cAO++;
                        var cB1 = (czW ? cA9 : cAh['i']) + (cAh['earnKR'] ? ' <i class=\'material-icons\' style=\'color:#2196F3;font-size:33px;vertical-align:bottom;\'>check_circle</i>' : '') + '<div class=\'serverPCount\'>' + cAe + '/' + cAf + '</div>' + (cAh['cs'] ? '<div class=\'serverRegion\'>' + cA9['split'](':')[0x0] + ' -&nbsp;</div>' : '');
                        czX += '<div class=\'' + ('menuSelector' + (cB0 ? ' selectedMenuSelector' : '')) + '\' onclick=\'' + ('checkedSwitchServer(\"' + cA9 + '\", this.querySelector(\".serverPCount\"))') + '\'>' + cB1 + '</div>';
                    }
                }
                cAd['games']['length'] && cAO || (czX += '<div style=\'margin-left:30px;margin-top:5px\'>' + cA8['t']('windows.servers.none') + '</div>'), czX += '</div>';
            }
        }
        return czX;
    },
    'genList': function() {
        var czW = this;
        window['setExpandedRegion'] = function(czX) {
            czW['expandedRegion'] = czX, czW['lastLoadTime'] = Date['now'](), showWindow(0x2, !0x0);
        };
        var czX = '<div style=\'font-size:20px\'>';
        return czX += '<a class=\'menuLink\' onclick=\'openHostWindow()\'>' + cA8['t']('windows.servers.host') + '</a><div style=\'float:right;display:inline-block\'><input id=\'serverSearch\' style=\'width:333px;\'' + (this['serverSearch'] ? 'value=\'' + this['serverSearch'] + '\'' : '') + ' type=\'text\' placeholder=\'Search Game\' oninput=\'windows[1].searchList()\'></input></div></div><div id=\"serverFilters\"><div id=\"hideFull\" style=\"float:right;align-items:center;display:flex\"><span class=\"grey\">' + cA8['t']('windows.servers.hide') + '</span><label class=\"switchsml\"><input type=\"checkbox\" onclick=\"toggleHF(this.checked);windows[1].searchList()\"' + (cHr ? ' checked' : '') + '><span class=\"sliderSml\"></span></label></div><div style=\"margin-left:10px;margin-right:10px;float:right;align-items:center;display:flex\">|</div><div id=\"regionPriority\" style=\"float:right;align-items:center;display:flex\"><span class=\"grey\">' + cA8['t']('windows.servers.priority') + '</span><label class=\"switchsml\"><input type=\"checkbox\" onclick=\"toggleRP(this.checked);windows[1].searchList()\"' + (cHt ? ' checked' : '') + '><span class=\"sliderSml\"></span></label></div></div><div style=\'height:10px\'></div>', czX += '<div style=\'font-size:20px\'>', czX += '<div id=\'serverHolder\'>' + this['getServers']() + '</div>', czX += '<div style=\'height:10px\'></div><b style=\'color:rgba(0,0,0,0.6)\'>' + cA8['t']('windows.servers.online', this['totalPlayerCount']) + '</b>', czX += '</div>';
    },
    'searchMatches'(czW) {
        var [czX, czY, czZ, cA0, cA1] = czW;
        return !!cA1 && 0x0 <= (cA1['i'] || '')['toLowerCase']()['indexOf']((this['serverSearch'] || '')['toLowerCase']());
    }
}, {
    'header': cA8['t']('windows.loadout.header'),
    'gen': function() {
        var czW = cB9['classes'][cBL];
        0x0 > cB9['config']['classes']['indexOf'](parseInt(cBL)) && (cBL = cB9['config']['classes'][0x0], czW = cB9['classes'][cBL]);
        var czX = cB9['weapons'][czW['loadout'][0x0]]['name'],
            czY = '#2196F3',
            czZ = czW['secondary'] ? cB9['weapons'][cGS]['name'] : cA8['t']('generic.none'),
            cA1 = cB9['store']['skins'][cGN] ? cB9['store']['skins'][cGN]['name'] : -0x2 == cGN ? 'Random' : 'Combat Knife',
            cA2 = cB9['store']['skins'][cGP] ? cB9['store']['skins'][cGP]['name'] : -0x2 == cGP ? 'Random' : cA8['t']('generic.none'),
            cA3 = cB9['store']['skins'][cGO] ? cB9['store']['skins'][cGO]['name'] : -0x2 == cGO ? 'Random' : cA8['t']('generic.none'),
            cA9 = cB9['sprays'][cP0] ? cB9['sprays'][cP0]['name'] : -0x2 == cP0 ? 'Random' : cA8['t']('generic.none'),
            cAd = null != cB9['weapons'][czW['loadout'][0x0]]['attach'],
            cAe = (cAd && cB9['attach'][cGM] ? cB9['attach'][cGM]['name'] : cA8['t']('generic.none'), czW['secondary'] ? '#2196F3' : 'rgba(0,0,0,0.3)'),
            cAf = 'rgba(0,0,0,0.3)',
            cAg = cAf,
            cAh = 'rgba(0,0,0,0.3)';
        cBc && (null != cGR[czW['loadout'][0x0]] && ((czX = cB9['store']['skins'][cGR[czW['loadout'][0x0]]]) ? (czY = cB9['store']['rarities'][czX['rarity']]['color'], czX = czX['name']) : -0x2 == cGR[czW['loadout'][0x0]] && (czX = 'Random')), czW['loadout'][0x1] && null != cGR[czW['loadout'][0x1]] && ((czZ = cB9['store']['skins'][cGR[czW['loadout'][0x1]]]) && (cAe = cB9['store']['rarities'][czZ['rarity']]['color'], czZ = czZ['name'])), 0x0 <= cGP && cB9['store']['skins'][cGP] && (cAf = cB9['store']['rarities'][cB9['store']['skins'][cGP]['rarity']]['color']), 0x0 <= cGO && cB9['store']['skins'][cGO] && (cAg = cB9['store']['rarities'][cB9['store']['skins'][cGO]['rarity']]['color']), 0x0 <= cGN && cB9['store']['skins'][cGN] && (cAh = cB9['store']['rarities'][cB9['store']['skins'][cGN]['rarity']]['color']));
        for (var cAi = cA8['t']('windows.loadout.color.skin'), cAj = cA0['skinColors']['length'] - 0x1; 0x0 <= cAj; cAj--) cAi += '<div class=\'skinColorItem' + (cGL == cAj ? ' activeSkin' : '') + '\' style=\'background-color:#' + cA0['skinColors'][cAj]['toString'](0x10) + '\' onclick=\'selectSkinColor(' + cAj + ')\'></div>';
        return '<div class=\'settName\'>' + cA8['t']('windows.loadout.class') + '<span class=\'settText floatR\' onclick=\'showWindow(6)\'>' + czW['name'] + '</span></div><div class=\'settName\'>' + cA8['t']('windows.loadout.primary') + '<span class=\'settLabel wepLink\' style=\'color:' + czY + '\' onclick=\'skinSelector(' + czW['loadout'][0x0] + ')\'>' + czX + '</span></div><div class=\'settName\'>' + cA8['t']('windows.loadout.secondary') + '<span class=\'settLabel' + (czW['secondary'] ? ' wepLink' : '') + '\' ' + (czW['secondary'] ? 'onclick=\'showWindow(20)\'' : '') + ' style=\'color:' + cAe + '\'>' + czZ + '</span></div><div class=\'settName\'>' + cA8['t']('windows.loadout.melee') + '<span onclick=\'showWindow(26)\' class=\'settText floatR\' style=\'color:' + cAh + '\'>' + cA1 + '</span></div><div class=\'settName\'>' + cA8['t']('windows.loadout.hat') + '<span onclick=\'showWindow(16)\' class=\'settText floatR\' style=\'color:' + cAf + '\'>' + cA2 + '</span></div><div class=\'settName\'>' + cA8['t']('windows.loadout.body') + '<span onclick=\'showWindow(17)\' class=\'settText floatR\' style=\'color:' + cAg + '\'>' + cA3 + '</span></div><div class=\'settName\'>' + cA8['t']('windows.loadout.spray') + '<span onclick=\'showWindow(9)\' class=\'settText floatR\'>' + cA9 + '</span></div><div class=\'settName\'>' + cAi + '</div>';
    }
}, {
    'header': cA8['t']('windows.mods.header'),
    'tabIndex': 0x0,
    'listData': {},
    'searchMods': function() {
        searchResultsMO['innerHTML'] = 'Loading...', cB7['searchMod'](mdSrch['value'], cMf);
    },
    'searchResp': function(czW) {
        var czX = '';
        czW['length'] ? (czX += '<div style=\'height:10px\'></div>', czX += cHw(czW, 'mod')) : czX = cA8['t']('windows.mods.none'), document['getElementById']('searchResultsMO') && (document['getElementById']('searchResultsMO')['innerHTML'] = czX);
    },
    'loadMore': function(czW) {
        this['listData'][this['tabIndex']]['waiting'] || (czW && (czW['className'] = 'loadMoreW', czW['innerHTML'] = 'Loading...'), this['listData'][this['tabIndex']]['waiting'] = !0x0, this['listData'][this['tabIndex']]['loadInd'] += 0x1, cB7['listMods'](this['tabIndex'], this['listData'][this['tabIndex']]['loadInd'], cBc ? cBc['id'] : null, cM9));
    },
    'modsLoaded': function(czW, czX, czY) {
        if (modList)
            if (this['listData'][czX]['waiting'] = !0x1, czW && czW['length'])
                if (czY) this['listData'][czX]['dat'] || (modList['innerHTML'] = czY, this['listData'][czX] = null);
                else {
                    var czZ = cHw(czW, 'mod', czX);
                    this['listData'][czX]['dat'] = (this['listData'][czX]['dat'] || '') + czZ, this['tabIndex'] == czX && updateWindow(0x4);
                }
        else this['listData'][czX]['dat'] || (modList['innerHTML'] = cA8['t']('windows.mods.none'), this['listData'][czX] = null);
    },
    'switchTab': function(czW) {
        this['tabIndex'] != czW && (this['tabIndex'] = czW, updateWindow(0x4));
    },
    'gen': function() {
        for (var czW = cA0['modTabs'][this['tabIndex']], czX = '', czY = 0x0; czY < cA0['modTabs']['length']; ++czY) czX += '<div class=\'menuTab' + (this['tabIndex'] == czY ? ' tabA' : '') + '\' onclick=\'windows[3].switchTab(' + czY + ')\'>' + cA0['modTabs'][czY]['n'] + '</div>';
        var czZ = '';
        return czW['search'] ? czZ = '<input style=\'margin-top:10px\' type=\'text\' id=\'mdSrch\' class=\'smlInput\' placeholder=\'Mod Name\' onkeydown=\'if(window.event.keyCode==13)windows[3].searchMods()\' /><a class=\'menuLink\' style=\'margin-left:20px\' onclick=\'windows[3].searchMods()\'>' + cA8['t']('generic.search') + '</a><div style=\'color:rgba(0,0,0,0.5);margin-top:10px\' id=\'searchResultsMO\'></div>' : this['listData'][this['tabIndex']] ? this['listData'][this['tabIndex']]['dat'] ? (czZ = this['listData'][this['tabIndex']]['dat'], czZ += this['listData'][this['tabIndex']]['waiting'] ? '<div class=\'loadMoreW\'>Loading...</div>' : '<div class=\'loadMoreD\' onclick=\'windows[3].loadMore(this)\'>Load More</div>') : czZ = '<div class=\'loadMoreW\'>Loading...</div>' : (czZ = '<div class=\'loadMoreW\'>Loading...</div>', this['listData'][this['tabIndex']] = {
            'loadInd': 0x0
        }, cB7['listMods'](this['tabIndex'], 0x0, cBc ? cBc['id'] : null, cM9)), '<a href=\'javascript:;\' onclick=\'showWindow(18)\' class=\'menuLink\'>Load Mod</a> | <a href=\'javascript:;\' onclick=\'showWindow(19)\' class=\'menuLink\'>Upload Mod</a><a style=\'float:right\' href=\'/viewer.html\' class=\'menuLink\'>Model Viewer</a><div style=\'margin-top:25px;margin-bottom:15px\'>' + czX + '</div><div style=\'color:rgba(0,0,0,0.3)\' id=\'modList\'>' + czZ + '</div>';
    }
}, {
    'header': cA8['t']('windows.account.header'),
    'getScore': function(czW) {
        var czX = 0x1 < czW['level'] ? Math['pow'](czW['level'] / cA0['rankVar'], 0x2) : 0x0;
        return parseInt(czW['score'] - czX) + ' / ' + parseInt(Math['pow']((czW['level'] + 0x1) / cA0['rankVar'], 0x2) - czX);
    },
    'gen': function() {
        return cBc ? '<div style=\'font-size:26px;margin-top:0px:font-weight:bold\'>Profile</div><div class=\'settName\' style=\'width:100%\'>' + cA8['t']('generic.name') + '<a href=\'/social.html?p=profile&q=' + cBc['name'] + '\' class=\'floatR\'>' + cBc['name'] + '</a></div><div class=\'settName\' style=\'width:100%\'>' + cA8['t']('generic.clan') + '<a class=\'floatR\' class=\'menuLink\' onclick=\'showWindow(13)\'>' + (cBc['clan'] ? '[' + cBc['clan'] + ']' : 'None') + '</a></div><div class=\'settName\'>' + cA8['t']('generic.level') + '<span class=\'floatR\'>' + cBc['level'] + '</span></div><div class=\'xpBar\'><div class=\'xpBarB\' style=\'width:' + cBc['levelProg'] + '%\'></div><span class=\'xpBarV\'>' + this['getScore'](cBc) + '</span></div><div class=\'settName\'>' + cA8['t']('generic.score') + '<span class=\'floatR\'>' + cBc['score'] + '</span></div><div class=\'settName\'>ELO (1v1)<span class=\'floatR\'>' + cBc['elo']['round'](0x1) + '</span></div><div class=\'settName\'>ELO (2v2)<span class=\'floatR\'>' + cBc['elo2']['round'](0x1) + '</span></div><div class=\'settName\'>ELO (4v4)<span class=\'floatR\'>' + cBc['elo4']['round'](0x1) + '</span></div><div class=\'settName\'>KR<span class=\'floatR\'>' + cBc['funds'] + 'KR</span></div><div class=\'settName\'>' + cA8['t']('generic.kills') + '<span class=\'floatR\'>' + cBc['kills'] + '</span></div><div class=\'settName\'>' + cA8['t']('generic.deaths') + '<span class=\'floatR\'>' + cBc['deaths'] + '</span></div><div class=\'settName\'>' + cA8['t']('generic.kdr') + '<span class=\'floatR\'>' + (cBc['kills'] / Math['max'](cBc['deaths'], 0x1))['toFixed'](0x2) + '</span></div><div class=\'settName\'>KPG<span class=\'floatR\'>' + (cBc['kills'] / Math['max'](cBc['games'], 0x1))['toFixed'](0x2) + '</span></div><div class=\'settName\'>Nukes<span class=\'floatR\'>' + (cBc['stats']['n'] || 0x0) + '</span></div><div class=\'settName\'>Melee<span class=\'floatR\'>' + (cBc['stats']['mk'] || 0x0) + '</span></div><div class=\'settName\'>' + cA8['t']('generic.games.played') + '<span class=\'floatR\'>' + cBc['games'] + '</span></div><div class=\'settName\'>' + cA8['t']('generic.games.won') + '<span class=\'floatR\'>' + cBc['wins'] + '</span></div><div class=\'settName\'>W/L<span class=\'floatR\'>' + (cBc['wins'] / Math['max'](cBc['games'], 0x1))['toFixed'](0x2) + '</span></div><div class=\'settName\'>' + cA8['t']('generic.timep') + '<span class=\'floatR\'>' + cB0['getReadableTime'](cBc['timePlayed']) + '</span></div><div style=\'height:10px\'></div>' + (cBc['partnerName'] ? cBc['partnerApp'] ? '<div style=\'font-size:26px;margin-top:20px;font-weight:bold\'>Creator Code</div><a class=\'menuLink\' onclick=\'showWindow(28)\'>Creator Dashboard</a>' : '<div style=\'font-size:26px;margin-top:20px;font-weight:bold\'>Creator Code Application</div><div style=\'color:rgba(0,0,0,0.4)\'>Your application is waiting for approval...</div>' : '<div style=\'font-size:26px;margin-top:20px;font-weight:bold\'>Creator Code Application</div><div style=\'font-size:17px;color:rgba(0,0,0,0.4)\'>By submitting an Application you agree to the <a href=\'./docs/partner.txt\'>Partner Terms</a></div><input type=\'text\' id=\'crtrCode\' class=\'smlInput\' style=\'width:100%;margin-bottom:8px\' placeholder=\'Creator Code Name\' /><input type=\'text\' id=\'crtrEmail\' class=\'smlInput\' style=\'width:80%;margin-bottom:8px\' placeholder=\'PayPal Email for Payouts\' /><a class=\'menuLink\' style=\'margin-left:20px;vertical-align:middle\' onclick=\'submitCrtrCod()\'>' + cA8['t']('generic.submit') + '</a><div id=\'ctrtRes\' style=\'color:rgba(0,0,0,0.5)\'></div>') + '<div style=\'height:25px\'></div><a class=\'menuLink\' onclick=\'logoutAcc()\'>' + cA8['t']('generic.logout') + '</a>' + (cGt ? '' : '<a style=\'float:right\' class=\'menuLink\' onclick=\'logoutSessions(this)\'>' + cA8['t']('generic.logout.sessions') + '</a>') : '<input id=\'accName\' type=\'text\' placeholder=\'' + cA8['t']('generic.username') + '\' class=\'accountInput\' style=\'margin-top:0\' value=\'' + (getSavedVal('krunker_username') || '') + '\'></input><input id=\'accPass\' type=\'password\' placeholder=\'' + cA8['t']('generic.password') + '\' class=\'accountInput\'></input><div id=\'accResp\' style=\'margin-top:10px;color:rgba(0,0,0,0.5);display:none\'></div><div class=\'accountButton\' onclick=\'registerAcc()\'>' + cA8['t']('generic.register') + '</div><div class=\'accountButton\' onclick=\'loginAcc()\' style=\'margin-left: 20px\'>' + cA8['t']('generic.login') + '</div>';
    }
}, {
    'header': cA8['t']('windows.class.header'),
    'gen': function() {
        for (var czW = '<div id=\'skinList\'>', czX = 0x0; czX < cB9['classes']['length']; ++czX)
            if (0x0 <= cB9['config']['classes']['indexOf'](czX)) {
                var czY = cBc && cBc['stats'] && cBc['stats']['c' + czX] ? cBc['stats']['c' + czX] : 0x0,
                    czZ = cA0['rankVar'] * Math['sqrt'](czY);
                czY = Math['floor'](czZ);
                var cA1 = Math['round'](0x64 * (czZ - czY));
                czY = Math['max'](0x1, czY + 0x1), czW += '<div class=\'classCard\' onclick=\'selectClass(' + czX + ')\'>' + cB9['classes'][czX]['name'] + '<div class=\'classWeap\'>' + cB9['weapons'][cB9['classes'][czX]['loadout'][0x0]]['name'] + '</div><img style=\'image-rendering:pixelated\' class=\'classImgC\' src=\'' + cB0['assetsUrl']('/textures/classes/icon_' + czX + '.png') + '\'/><div class=\'classXPBar\'><div class=\'clsXPBarC\' style=\'width:' + cA1 + '%\'></div></div><div class=\'classLvl\'>lvl ' + czY + '</div></div>';
            } return czW += '</div>';
    }
}, {
    'header': cA8['t']('windows.controls.header'),
    'gen': function() {
        for (var czW = '', czX = [
                ['forward', 0x0, cBa['moveKeys'][0x0]],
                ['backward', 0x1, cBa['moveKeys'][0x1]],
                ['left', 0x2, cBa['moveKeys'][0x2]],
                ['right', 0x3, cBa['moveKeys'][0x3]],
                ['reload', 0x8, cBa['reloadKey']],
                ['aim', 0xa, cBa['aimKey']],
                ['shoot', 0x18, cBa['shootKey']],
                ['inspect', 0xe, cBa['inspKey']],
                ['spray', 0x9, cBa['sprayKey']],
                ['jump', 0x4, cBa['jumpKey']],
                ['crouch', 0x5, cBa['crouchKey']],
                ['prim', 0xd, cBa['primKey']],
                ['melee', 0x6, cBa['meleeKey']],
                ['swap', 0x7, cBa['swapKey']],
                ['chat', 0xb, cBa['chatKey']],
                ['voice', 0xc, cBa['voiceKey']],
                ['list', 0xf, cBa['listKey']],
                ['interact', 0x10, cBa['interactKey']],
                ['interactSec', 0x16, cBa['interactSecKey']],
                ['drop', 0x11, cBa['dropKey']],
                ['wepVis', 0x17, cBa['wepVisKey']],
                ['streak0', 0x12, cBa['streakKeys'][0x0]],
                ['streak1', 0x13, cBa['streakKeys'][0x1]],
                ['streak2', 0x14, cBa['streakKeys'][0x2]],
                ['streak3', 0x15, cBa['streakKeys'][0x3]]
            ], czY = 0x0; czY < czX['length']; czY++) czW += '<div class=\'settName\'>' + cA8['t']('windows.controls.' + czX[czY][0x0]) + '<span class=\'unbind\' onclick=\'unbindCont(' + czX[czY][0x1] + ')\'><i class=\'material-icons\' style=\'font-size:38px;color:red;\'>delete_forever</i></span><span class=\'settText floatRNoC\' id=\'cont' + czX[czY][0x1] + '\' onclick=\'changeCont(' + czX[czY][0x1] + ')\'>' + cB0['getKeyName'](czX[czY][0x2]) + '</span></div>';
        return czW;
    }
}, {
    'header': cA8['t']('windows.host.header'),
    'presets': {},
    'presetLoaded': function(czW, czX) {
        try {
            windows[0x7]['presets'][czW]['data'] = czW && windows[0x7]['presets'][czW] && czX ? JSON['parse'](czX) : 'DEFAULT';
        } catch (cJt) {
            windows[0x7]['presets'][czW]['data'] = 'DEFAULT';
        }
        updateWindow(0x8);
    },
    'gen': function() {
        var czW = '';
        if (czW += '<div class=\'settName b\'>' + cA8['t']('windows.host.maps') + '</div>', czW += '<div style=\'margin-top:10px\'>', czW += '<div class=\'settNameSmall\' style=\'margin:0;margin-top:10px\'>' + cA8['t']('windows.host.cmaps') + ' <div style=\'float:right\'>' + (cLz ? '<span><i style=\'color:#eb5656;font-size:30px;vertical-align:-3px;cursor:pointer\' onclick=\'openHostWindow(true)\'class=\'material-icons\'>delete</i> </span>' : '') + '<a id=\'commMap\' href=\'javascript:;\' onclick=\'showWindow(10);\' class=\'menuLink\' style=\'font-size:18px\'>' + (cLz || cA8['t']('generic.select')) + '</a></div></div><br/>', cLz || (czW += '<div class=\'settNameSmall\' style=\'margin:0;margin-top:-24px;\'>' + cA8['t']('windows.host.raw') + '<input id=\'rawMapData\' type=\'text\' class=\'formInput\' ' + (cLA ? 'value=\'' + cLA + '\'' : 'placeholder=\'' + cA8['t']('windows.host.raw') + '\'') + ' autocomplete=\'off\' autocorrect=\'off\' autocapitalize=\'off\' spellcheck=\'false\'></div><br/>'), czW += '</div>', czW += '<div style=\'margin-top:-15px;margin-bottom:20px;\'>', !cLz)
            for (var czX, czY = 0x0; czY < cBh['length']; czY++) czX = cBh[czY], czW += '<label class=\'hostMap\'><div class=\'hostMapName blackShad\'>' + cB0['capFirst'](czX['name']) + '</div><div class=\'mapInfoB\' style=\'top:54px\'>?</div><input id=\'gameMap' + czY + '\' type=\'checkbox\'><img class=\'hostMapImg\' src=\'/img/maps/map_' + czY + '.png\'></label>';
        czW += '</div>';
        var czZ = windows[0x7]['presets'][cLz],
            cA1 = !cLz || czZ && czZ['data'];
        if (cA1) {
            czZ && (czZ = czZ['data']), 'DEFAULT' == czZ && (czZ = null), czW += '<div class=\'settName b\'>' + cA8['t']('windows.host.modes') + '</div>', czW += '<div style=\'margin-top:5px\'>';
            var cA2;
            for (czY = 0x0; czY < cBi['length']; czY++)
                if (!(cA2 = cBi[czY])['preventCustomGames']) {
                    var cA3 = '<label class=\'switch\'><input id=\'gameMode' + czY + '\' type=\'checkbox\' ' + ((cAe = czZ ? czZ['modes'] && 0x0 <= czZ['modes']['indexOf'](czY) : 0x0 == czY) ? 'checked' : '') + '><span class=\'slider\'></span></label>';
                    czW += '<div class=\'settNameSmall\' style=\'margin:0\'>' + cB0['capFirst'](cA2['name']) + cA3 + '</div>';
                } czW += '<div class=\'settName b\' style=\'margin-top:20px\'>' + cA8['t']('windows.host.classes') + '</div>', czW += '<div style=\'margin-top:5px\'>';
            for (czY = 0x0; czY < cB9['classes']['length']; czY++) {
                var cA9 = cB9['classes'][czY];
                cA3 = '<label class=\'switch\'><input id=\'gameClass' + czY + '\' type=\'checkbox\' ' + ((cAe = !czZ || !czZ['classes'] || 0x0 <= czZ['classes']['indexOf'](czY)) ? 'checked' : '') + '><span class=\'slider\'></span></label>';
                czW += '<div class=\'settNameSmall\' style=\'margin:0\'>' + cA9['name'] + cA3 + '</div>';
            }
            czW += '<div class=\'settName b\' style=\'margin-top:25px\'>' + cA8['t']('windows.host.settings') + '</div>';
            for (czY = 0x0; czY < cA0['serverConfig']['length']; czY++) {
                cBd = cA0['serverConfig'][czY];
                var cAd = cA8['t']('server.config.' + cBd['varN']);
                if (cBd['bool']) {
                    var cAe = cBd['def'];
                    czZ && czZ['settings'] && null != czZ['settings'][cBd['varN']] && (cAe = !!czZ['settings'][cBd['varN']]), czW += '<div class=\'settNameSmall\' style=\'margin:0;margin-bottom:5px;\'>' + cAd + ' <label class=\'switch\'><input type=\'checkbox\' id=\'customS' + cBd['varN'] + '\' ' + (cAe ? 'checked' : '') + '><span class=\'slider\'></span></label></div>';
                } else if (cBd['input']) czW += '<div class=\'settNameSmall\' style=\'margin:0;margin-bottom:5px;\'>' + cAd + '<input id=\'customS' + cBd['varN'] + '\' value=\'' + cBd['def'] + '\' type=\'text\'style=\'border-radius:12px;border:none;background:#eee;padding:6px;padding-bottom:6px;float:right;margin-top:5px;margin-bottom:5px;\' autocomplete=\'off\' autocorrect=\'off\' autocapitalize=\'off\' spellcheck=\'false\'></div>';
                else {
                    var cAf = cBd['def'],
                        cAg = cBc && cBc['featured'] && cBd['maxF'] || cBd['max'];
                    czZ && czZ['settings'] && null != czZ['settings'][cBd['varN']] && ((cAf = czZ['settings'][cBd['varN']]) > cAg && (cAf = cAg)), czW += '<div class=\'settNameSmall\' style=\'margin-left:0\'>' + cAd + '<span class=\'sliderVal\' id=\'customSet' + czY + '\'>' + cAf + '</span><div class=\'slidecontainer\'><input type=\'range\' min=\'' + cBd['min'] + '\' max=\'' + cAg + '\' step=\'' + cBd['step'] + '\' id=\'customS' + cBd['varN'] + '\' value=\'' + cAf + '\' oninput=\'updateSliderLabel(' + czY + ',this.value)\' class=\'sliderM\'></div></div>';
                }
            }
            czW += '<div class=\'settNameSmall\' style=\'margin:0\'>' + cA8['t']('server.config.private') + ' <label class=\'switch\'><input id=\'makePrivate\' type=\'checkbox\'><span class=\'slider\'></span></label></div>', czW += '<div id=\'hostGamePreset\' style=\'text-align:left;margin-top:30px\'>' + windows[0x7]['genPresets'](!0x0) + '</div>';
        } else windows[0x7]['presets'][cLz] || (windows[0x7]['presets'][cLz] = {}, cB7['getMapPreset'](cLz, this['presetLoaded'])), czW += '<div style=\'color:rgba(0,0,0,0.3)\'>' + cA8['t']('windows.host.preset.load') + '</div>';
        return cA1 && (czW += '<div style=\'text-align:left;margin-top:30px\'>', czW += '<div style=\'color:#919191;margin-bottom:5px\' id=\'hostGameMsg\'></div>', czW += '<a class=\'menuLink\' onclick=\'createPrivateRoom()\'>' + cA8['t']('windows.host.start') + '</a>', czW += '</div>'), czW;
    },
    'presetAction': function(czW) {
        if (0x0 == czW && 'Select' == presetSelect['value']) return;
        if (0x2 == czW && 'Select' == presetSelect['value']) return;
        let czX = getSavedVal('krk_hostPresets');
        czX = czX ? JSON['parse'](czX) : {};
        var czY = presetName['value']['length'] ? presetName['value'] : 'Select' == presetSelect['value'] ? 'Preset1' : presetSelect['value'];
        if (0x2 == czW) czX[presetSelect['value']] && delete czX[presetSelect['value']], saveVal('krk_hostPresets', JSON['stringify'](czX));
        else {
            let cA2 = 0x1 == czW ? {} : czX[presetSelect['value']];
            for (var czZ, cA1 = 0x0; cA1 < cBh['length']; cA1++) cBh[cA1], czZ = document['getElementById']('gameMap' + cA1), 0x1 == czW ? 0x1 != czZ['checked'] && (cA2['gameMap' + cA1] = czZ['checked']) : 'gameMap' + cA1 in cA2 && (czZ['checked'] = cA2['gameMap' + cA1]);
            for (cA1 = 0x0; cA1 < cBi['length']; cA1++) czZ = document['getElementById']('gameMode' + cA1), 0x1 == czW ? czZ['checked'] != !cA1 && (cA2['gameMode' + cA1] = czZ['checked']) : 'gameMode' + cA1 in cA2 && (czZ['checked'] = cA2['gameMode' + cA1]);
            for (cA1 = 0x0; cA1 < cB9['classes']['length']; cA1++) cB9['classes'][cA1], czZ = document['getElementById']('gameClass' + cA1), 0x1 == czW ? 0x1 != czZ['checked'] && (cA2['gameClass' + cA1] = czZ['checked']) : 'gameClass' + cA1 in cA2 && (czZ['checked'] = cA2['gameClass' + cA1]);
            for (cA1 = 0x0; cA1 < cA0['serverConfig']['length']; cA1++) cBd = cA0['serverConfig'][cA1], czZ = document['getElementById']('customS' + cBd['varN']), 0x1 == czW ? czZ[cBd['bool'] ? 'checked' : 'value'] != cBd['def'] && (cA2[cBd['varN']] = czZ[cBd['bool'] ? 'checked' : 'value']) : cBd['varN'] in cA2 && (!cBd['bool'] && !cBd['input'] && (document['getElementById']('customSet' + cA1)['innerText'] = cA2[cBd['varN']]), czZ[cBd['bool'] ? 'checked' : 'value'] = cA2[cBd['varN']]);
            0x1 == czW ? (cLz && (cA2['commMap'] = cLz), '' != (czZ = document['getElementById']('rawMapData'))['value'] && (cA2['rawMapData'] = czZ['value']), 0x0 != (czZ = document['getElementById']('makePrivate'))['checked'] && (cA2['makePrivate'] = czZ['checked']), czX[czY] = cA2, saveVal('krk_hostPresets', JSON['stringify'](czX))) : ('commMap' in cA2 && (document['getElementById']('commMap')['innerText'] = cLz = cA2['commMap']), 'rawMapData' in cA2 && (document['getElementById']('rawMapData')['value'] = cA2['rawMapData']), 'makePrivate' in cA2 && (document['getElementById']('makePrivate')['checked'] = cA2['makePrivate']));
        }
        windows[0x7]['genPresets']();
    },
    'genPresets': function(module = !0x1) {
        let czX = getSavedVal('krk_hostPresets');
        czX = czX ? JSON['parse'](czX) : {};
        var czY = '<div class=\'settName b\' style=\'margin-top:25px\'>' + cA8['t']('windows.host.preset') + '</div>';
        for (let czW in czY += '<span class=\'settNameSmall\' style=\'margin:0;margin-bottom:5px;\'><input id=\'presetName\' type=\'text\' class=\'formInput\' placeholder=\'' + cA8['t']('windows.host.preset.name') + '\' autocomplete=\'off\' autocorrect=\'off\' autocapitalize=\'off\' spellcheck=\'false\' style=\'border:none;background:#eee;padding:6px;padding-bottom:6px;float:left;margin-top:5px;margin-bottom:5px;\'><select id=\'presetSelect\' style=\'border-radius:12px;margin-left:10px;border:none;background:#eee;padding:6px;padding-bottom:6px;margin-top:5px;margin-bottom:5px;\'><option selected>Select</option>', czX) czY += '<option>' + czW + '</option>';
        return czY += '</select>', czY += '<div class=\'hostPresetBtn\' onclick=\'windows[7].presetAction(2)\'>' + cA8['t']('generic.delete') + '</div><div class=\'hostPresetBtn\' onclick=\'windows[7].presetAction(1)\'>' + cA8['t']('generic.save') + '</div><div class=\'hostPresetBtn\' onclick=\'windows[7].presetAction(0)\'>' + cA8['t']('generic.load') + '</div></span>', czW ? czY : void(hostGamePreset['innerHTML'] = czY);
    }
}, {
    'header': cA8['t']('windows.spray.header'),
    'gen': function() {
        for (var czW = '<div id=\'skinList\'><div class=\'noBtnCard\' onclick=\'selectSpray(-2)\'>' + cA8['t']('generic.random') + '<div class=\'itemOwn\' style=\'opacity:0;\'\'>by ???</div><img style=\'margin-top:10px;width:110px;\' class=\'noBtnImgC skinSil\' src=\'' + cB0['assetsUrl']('/textures/sprays/0.png') + '\'><div class=\'skinRandom blackShad\' style=\'top: 80px;\'>?</div></div>', czX = 0x0; czX < cB9['sprays']['length']; ++czX) czW += '<div class=\'noBtnCard\' onclick=\'selectSpray(' + czX + ')\'>' + cB9['sprays'][czX]['name'] + '<div class=\'itemOwn\'>' + cA8['t']('windows.spray.default') + '</div><img style=\'margin-top:10px;width:110px;\' class=\'noBtnImgC\' src=\'' + cB0['assetsUrl']('/textures/sprays/' + czX + '.png') + '\'/></div>';
        return czW += '</div>';
    }
}, {
    'header': cA8['t']('windows.maps.header'),
    'searchMaps': function() {
        searchResultsMA['innerHTML'] = 'Loading...', cB7['searchMap'](mpSrch['value'], cMf);
    },
    'searchResp': function(czW) {
        var czX = '';
        czW['length'] ? (czX += '<div style=\'height:10px\'></div>', czX += cHw(czW, 'map')) : czX = cA8['t']('windows.maps.none'), document['getElementById']('searchResultsMA') && (document['getElementById']('searchResultsMA')['innerHTML'] = czX);
    },
    'loadMore': function(czW) {
        this['listData'][this['tabIndex']]['waiting'] || (czW && (czW['className'] = 'loadMoreW', czW['innerHTML'] = 'Loading...'), this['listData'][this['tabIndex']]['waiting'] = !0x0, this['listData'][this['tabIndex']]['loadInd'] += 0x1, cB7['listMaps'](this['tabIndex'], this['listData'][this['tabIndex']]['loadInd'], cBc ? cBc['id'] : null, cMc));
    },
    'mapsLoaded': function(czW, czX, czY) {
        if (mapList)
            if (this['listData'][czX]['waiting'] = !0x1, czW && czW['length'])
                if (czY) this['listData'][czX]['dat'] || (mapList['innerHTML'] = czY, this['listData'][czX] = null);
                else {
                    var czZ = cHw(czW, 'map', czX);
                    this['listData'][czX]['dat'] = (this['listData'][czX]['dat'] || '') + czZ, this['tabIndex'] == czX && updateWindow(0xa);
                }
        else this['listData'][czX]['dat'] || (mapList['innerHTML'] = cA8['t']('windows.maps.none'), this['listData'][czX] = null);
    },
    'tabIndex': 0x0,
    'listData': {},
    'switchTab': function(czW) {
        this['tabIndex'] != czW && (this['tabIndex'] = czW, updateWindow(0xa));
    },
    'gen': function() {
        for (var czW = cA0['mapTabs'][this['tabIndex']], czX = '', czY = 0x0; czY < cA0['mapTabs']['length']; ++czY) czX += '<div class=\'menuTab' + (this['tabIndex'] == czY ? ' tabA' : '') + '\' onclick=\'windows[9].switchTab(' + czY + ')\'>' + cA0['mapTabs'][czY]['n'] + '</div>';
        var czZ = '';
        return czW['search'] ? czZ = '<input style=\'margin-top:10px\' type=\'text\' id=\'mpSrch\' class=\'smlInput\' placeholder=\'' + cA8['t']('windows.maps.name') + '\' onkeydown=\'if(window.event.keyCode==13)windows[9].searchMaps()\' /><a class=\'menuLink\' style=\'margin-left:20px\' onclick=\'windows[9].searchMaps()\'>' + cA8['t']('generic.search') + '</a><div style=\'color:rgba(0,0,0,0.5);margin-top:10px\' id=\'searchResultsMA\'></div>' : this['listData'][this['tabIndex']] ? this['listData'][this['tabIndex']]['dat'] ? (czZ = this['listData'][this['tabIndex']]['dat'], czZ += this['listData'][this['tabIndex']]['waiting'] ? '<div class=\'loadMoreW\'>Loading...</div>' : '<div class=\'loadMoreD\' onclick=\'windows[9].loadMore(this)\'>Load More</div>') : czZ = '<div class=\'loadMoreW\'>Loading...</div>' : (czZ = '<div class=\'loadMoreW\'>Loading...</div>', this['listData'][this['tabIndex']] = {
            'loadInd': 0x0
        }, cB7['listMaps'](this['tabIndex'], 0x0, cBc ? cBc['id'] : null, cMc)), '<a href=\'./editor.html\' class=\'menuLink\'>' + cA8['t']('windows.maps.editor') + '</a> | <a href=\'javascript:;\' onclick=\'showWindow(11)\' class=\'menuLink\'>' + cA8['t']('windows.maps.publish') + '</a><a href=\'https://discord.gg/Kfypyp5\' class=\'menuLink\' style=\'float:right\'>' + cA8['t']('windows.maps.community') + '</a><br/><div style=\'margin-top:25px;margin-bottom:15px\'>' + czX + '</div><div style=\'color:rgba(0,0,0,0.3)\' id=\'mapList\'>' + czZ + '</div>';
    }
}, {
    'header': cA8['t']('windows.publish.map.header'),
    'gen': function() {
        return cBc ? '<div style=\'margin-top:-8px;margin-bottom:10px\' class=\'setHed\'>' + cA8['t']('windows.publish.map.header') + '</div><div style=\'color:rgba(0,0,0,0.4);font-size:18px\'><input onclick=\'selectMapThumb()\' type=\'button\' id=\'thumbBtn\' style=\'cursor:pointer\' value=\'Select\' /><input id=\'mapThumb\' type=\'file\' accept=\'image/*\' style=\'width:1px;visibility:hidden;\' onchange=\'updateMapThumb()\'><span style=\'color:rgba(0,0,0,0.4);margin-left:10px\' id=\'mapThumbName\'>' + cA8['t']('windows.publish.map.thumbnail') + '</span></div><input id=\'mapDataNew\' type=\'text\' placeholder=\'' + cA8['t']('windows.publish.map.paste') + '\' class=\'mapInput\' autocomplete=\'off\' autocorrect=\'off\' autocapitalize=\'off\' spellcheck=\'false\'/><div id=\'mapUpResp\' style=\'color:rgba(0,0,0,0.3);margin-top:8px;margin-bottom:5px\'></div><div class=\'mapLoadButton\' style=\'margin-top:6px\' onclick=\'uploadCustomMap()\'>' + cA8['t']('windows.publish.map.update') + '</div>' : '<div style=\'color:rgba(0,0,0,0.3);\'><a href=\'javascript:;\' onclick=\'showWindow(5);\' class=\'menuLink\'>' + cA8['t']('windows.publish.map.login') + '</div>';
    }
}, {
    'header': cA8['t']('windows.theatre.header'),
    'gen': function() {
        return '';
    }
}, {
    'header': cA8['t']('windows.clans.header'),
    'clanData': null,
    'kickReq': function(czW) {
        if (cB8['send']('cln', 0x5, czW), this['clanData'] && this['clanData']['members']) {
            for (var czX = this['clanData']['members']['length'] - 0x1; 0x0 <= czX; --czX) this['clanData']['members'][czX]['player_id'] == czW && this['clanData']['members']['splice'](czX, 0x1);
            updateWindow(0xd);
        }
    },
    'sendReq': function(czW, czX) {
        var czY = document['getElementById']('clanErr');
        czY && (czY['style']['color'] = 'rgba(0,0,0,0.6)', czY['innerHTML'] = cA8['t']('generic.loading'));
        var czZ = (czY = document['getElementById']('clanInp' + czW)) ? czY['value'] : null;
        cB8['send']('cln', czW, czX || czZ || 0x1);
    },
    'updReq': function(czW, czX, czY) {
        cB8['send']('clnR', czX, czY), this['clanData']['members'] && 0x1 == czY && this['clanData']['members']['push']({
            'player_name': this['clanData']['requests'][czW]['player_name']
        }), this['clanData']['requests']['splice'](czW, 0x1), updateWindow(0xd);
    },
    'delReq': function() {
        this['clanData'] = null, cBc && (cBc['clan'] = null), cB8['send']('cln', 0x4, 0x1), showWindow(0x5);
    },
    'resp': function(czW, czX, czY) {
        var czZ = document['getElementById']('clanErr');
        czW && czZ ? (czZ['style']['color'] = czY ? 'rgba(0,0,0,0.6)' : 'rgba(255,0,0,0.6)', czZ['innerHTML'] = czW) : czX && (cBc && (cBc['clan'] = czX['clan_name']), this['clanData'] = czX, updateWindow(0xd));
    },
    'gen': function() {
        var czW = '',
            czX = '';
        if (this['clanData'] && this['clanData']['members']) {
            var czY = cBc && this['clanData']['clan_playerid'] == cBc['id'];
            czW = '<div class=\'setHed\' style=\'margin-top:10px\'>' + cA8['t']('windows.clans.members', this['clanData']['members']['length']) + '</div>';
            for (var czZ = 0x0; czZ < this['clanData']['members']['length']; ++czZ) czW += '<div class=\'settName\'><a target=\'_blank\'href=\'/social.html?p=profile&q=' + this['clanData']['members'][czZ]['player_name'] + '\'>' + this['clanData']['members'][czZ]['player_name'] + '</a>' + (czY && this['clanData']['clan_playerid'] != this['clanData']['members'][czZ]['player_id'] ? '<i style=\'font-size:40px;float:right;color:rgba(255,0,0,0.6)\'  class=\'material-icons h\' onclick=\'windows[12].kickReq(' + this['clanData']['members'][czZ]['player_id'] + ')\'>clear</i>' : '') + '</div>';
        }
        if (this['clanData'] && this['clanData']['requests']) {
            czX = '<div class=\'setHed\' style=\'margin-top:10px\'>' + cA8['t']('windows.clans.requests') + '</div>';
            for (czZ = 0x0; czZ < this['clanData']['requests']['length']; ++czZ) czX += '<div class=\'settName\'><a target=\'_blank\' href=\'/social.html?p=profile&q=' + this['clanData']['requests'][czZ]['player_name'] + '\'>' + this['clanData']['requests'][czZ]['player_name'] + '</a><span style=\'float:right\'><i style=\'font-size:40px;color:rgba(255,0,0,0.6)\'  class=\'material-icons h\' onclick=\'windows[12].updReq(' + czZ + ',' + this['clanData']['requests'][czZ]['cr_playerid'] + ', 0)\'>clear</i><i style=\'font-size:40px;color:rgba(0,255,0,0.6);margin-left:10px\' class=\'material-icons h\' onclick=\'windows[12].updReq(' + czZ + ',' + this['clanData']['requests'][czZ]['cr_playerid'] + ', 1)\'>done</i></span></div>';
            this['clanData']['requests']['length'] || (czX += '<div style=\'color:rgba(0,0,0,0.4)\'>' + cA8['t']('windows.clans.requests.none') + '</div>');
        }
        var cA1 = cBc ? cBc['clan'] ? '<div class=\'setHed\' style=\'margin-top:0px\'>' + cA8['t']('windows.clans.page', cBc['clan']) + '<a style=\'float:right\' href=\'javascript:;\' onclick=\'windows[12].delReq()\' class=\'menuLink\'>' + (this['clanData'] ? cBc && this['clanData']['clan_playerid'] == cBc['id'] ? cA8['t']('generic.delete') : cA8['t']('generic.leave') : '') + '</a></div><div id=\'clanErr\' style=\'margin-top:0px;color:rgba(0,0,0,0.5)\'>' + (this['clanData'] ? '<div class=\'settName\'>' + cA8['t']('generic.level') + '<span class=\'floatR\'>' + Math['max'](0x1, Math['floor'](cA0['rankVar'] * Math['sqrt'](this['clanData']['clan_score'] || 0x0))) + '</span></div><div class=\'settName\'>' + cA8['t']('generic.score') + '<span class=\'floatR\'>' + (this['clanData']['clan_score'] || 0x0) + '</span></div>' + czW + czX : cA8['t']('generic.loading')) + '</div>' : '<div class=\'setHed\' style=\'margin-top:-5px\'>' + cA8['t']('windows.clans.create') + '</div><input id=\'clanInp1\' type=\'text\' class=\'smlInput\' maxlength=\'4\' placeholder=\'' + cA8['t']('windows.clans.name') + '\' /><a class=\'menuLink\' style=\'margin-left:20px\' onclick=\'windows[12].sendReq(1)\'>' + cA8['t']('generic.create') + '</a><div style=\'margin-top:0px\' class=\'setHed\'>' + cA8['t']('windows.clans.join') + ' <a href=\'./social.html?q=clan\' class=\'menuLink\' style=\'margin-top:10px;display:inline-block\'>' + cA8['t']('windows.clans.view') + '</a></div><input id=\'clanInp2\' type=\'text\' class=\'smlInput\' maxlength=\'5\' placeholder=\'' + cA8['t']('windows.clans.name') + '\' /><a class=\'menuLink\' style=\'margin-left:20px\' onclick=\'windows[12].sendReq(2)\'>' + cA8['t']('generic.submit') + '</a><div id=\'clanErr\' style=\'margin-top:10px\'></div>' : '<div style=\'color:rgba(0,0,0,0.3);margin-top:20px\'><a href=\'javascript:;\' onclick=\'showWindow(5);\' class=\'menuLink\'>' + cA8['t']('windows.clans.login') + '</div>';
        return cBc && cBc['clan'] && !this['clanData'] && this['sendReq'](0x3), cA1;
    }
}, {
    'header': cA8['t']('windows.store.header'),
    'gen': function() {
        cB3['play']('store', 0.4);
        for (var czW = '', czX = 0x0; czX < cB9['store']['wheels']['length']; ++czX) cBd = cB9['store']['wheels'][czX], (cBc && 0x0 == cBc['following'] && cBd['free'] && cBc['level'] >= cBd['minLvl'] || !cBd['free']) && (czW += '<div><a href=\'javascript:;\' class=\'menuLink\' onclick=\'prizeWheel(' + czX + ')\'>' + cA8['t']('windows.store.spin', cBd['name']) + '</a> ' + (cBd['lab'] ? '<span style=\'color:#fff;margin-left:5px;background-color:' + cBd['lab']['col'] + ';font-size:15px;padding:3px;padding-left:8px;padding-right:8px\'> ' + cBd['lab']['nm'] + ' </span>' : '') + '<span style=\'float:right;color:rgba(0,0,0,0.3)\'>' + (cBd['priceT'] || cBd['price']) + '<span style=\'color:rgba(0,0,0,0.6)\'> ' + (cBd['priceT'] ? '' : 'KR') + '</span></span></div>');
        var czY = '<div style=\'color:rgba(0,0,0,0.3);font-size:19px;margin-bottom:-3px\'>' + cA8['t']('windows.store.agree', '<a href=\'./docs/terms.txt\'>') + '</a>. Support your favorite Content Creator by using a Creator Code</div><input type=\'text\' id=\'creatorCodeI\' class=\'smlInput\' style=\'width:100%;margin-bottom:8px\' placeholder=\'Enter Creator Code\' />';
        czY += '<div id=\'skinList\'>';
        for (czX = 0x0; czX < cB9['store']['purchases']['length']; ++czX) czY += '<div class=\'shopCard\' onmouseenter=\'playTick()\' onclick=\'showPurchase(' + czX + ')\' style=\'background-image: url(&quot;./img/shop/' + czX + '.png&quot;)\'>' + ((cBd = cB9['store']['purchases'][czX])['tag'] ? '<div class=\'shopSale\' style=\'background-color:' + cBd['tagCol'] + '\'>' + cBd['tag'] + '</div>' : '') + cBd['val'] + ' <span style=\'color:#fff\'>KR</span><div class=\'purBtn\' onmouseenter=\'playTick()\' onclick=\'showPurchase(' + czX + ')\'>$' + cBd['price'] + ' USD</div></div>';
        czY += '</div>';
        var czZ = '<div style=\'height:10px;\'></div><b style=\'font-size:26px;margin-bottom:10px\'>' + cA8['t']('windows.store.purchase') + '</b>' + czY,
            cA0 = '<div style=\'height:10px;\'></div><b style=\'font-size:26px;margin-bottom:10px\'>' + cA8['t']('windows.store.voucher') + '</b><div style=\'color:rgba(0,0,0,0.3);font-size:19px;margin-bottom:6px\'>' + cA8['t']('windows.store.voucherinfo') + '</div><input type=\'text\' id=\'redVouch\' class=\'smlInput\' style=\'width:80%\' placeholder=\'Enter KR Code\' /><a class=\'menuLink\' style=\'margin-left:20px\' onclick=\'redeemVoucher()\'>Redeem</a><div id=\'vouchRes\'></div>';
        return cBc ? '<b style=\'font-size:26px\'>' + cA8['t']('windows.store.market') + '</b><div style=\'color:rgba(0,0,0,0.3);margin-bottom:10px\'>' + cA8['t']('windows.store.buy') + ' <a href=\'javascript:;\' onclick=\'window.open(`/social.html?p=market`)\'>' + cA8['t']('windows.store.market2') + '</a></div><b style=\'font-size:26px\'>' + cA8['t']('windows.store.wheels') + '</b><div style=\'color:rgba(0,0,0,0.3);margin-bottom:10px\'>' + cA8['t']('windows.store.unlock') + '</div>' + czW + czZ + cA0 + '<div style=\'float:right;margin-top:20px\'>' + cA8['t']('windows.store.amount', cBc['funds']) + '</div>' : '<div style=\'color:rgba(0,0,0,0.3)\'><a href=\'javascript:;\' onclick=\'showWindow(5);\' class=\'menuLink\'>' + cA8['t']('windows.store.login') + '</div>';
    }
}, {
    'header': cA8['t']('windows.skin.header'),
    'gen': function() {
        var czW = '<div id=\'skinList\'><div class=\'skinCard\'>' + cA8['t']('generic.default') + '<div class=\'itemOwn\'>by Krunker.io</div><img class=\'skinImg\' src=\'' + cB0['assetsUrl']('/textures/previews/weapons/' + cB9['weapons'][cGT]['src'] + '.png') + '\' style=\'margin-top:-10px\'><div class=\'selctBtn\' onmouseenter=\'playTick()\' style=\'width: 127px;margin-top:-40px\' onclick=\'selectSkin(-1,' + cGT + ')\'>' + cA8['t']('generic.select') + '</div></div><div class=\'skinCard\'>' + cA8['t']('generic.random') + '<div class=\'itemOwn\' style=\'opacity:0;\'\'>by ???</div><img class=\'skinImg skinSil\' src=\'' + cB0['assetsUrl']('/textures/previews/weapons/' + cB9['weapons'][cGT]['src'] + '.png') + '\' style=\'margin-top:-10px\'><div class=\'skinRandom blackShad\'>?</div><div class=\'selctBtn\' onmouseenter=\'playTick()\' style=\'width: 127px;margin-top:-40px\' onclick=\'selectSkin(-2,' + cGT + ')\'>' + cA8['t']('generic.select') + '</div></div>';
        if (cBc || cB9['singlePlayer'])
            for (var czX = (cB9['singlePlayer'] ? Object['keys'](cB9['store']['skins'])['map'](czW => czW = {
                    'ind': parseInt(czW),
                    'cnt': 0x1
                }) : cBc['skins'])['slice']()['sort'](function(czW, czX) {
                    return (null != czX['ind'] && cB9['store']['skins'][czX['ind']] ? cB9['store']['skins'][czX['ind']]['rarity'] : 0x0) - (null != czW['ind'] && cB9['store']['skins'][czW['ind']] ? cB9['store']['skins'][czW['ind']]['rarity'] : 0x0);
                }), czY = 0x0; czY < czX['length']; ++czY)(cBd = cB9['store']['skins'][czX[czY]['ind']]) && !cBd['type'] && cBd['weapon'] == cGT + 0x1 && (czW += '<div class=\'skinCard\' style=\'color:' + cB9['store']['rarities'][cBd['rarity']]['color'] + '\'><div class=\'itemCnt\' data-badge=\'x' + czX[czY]['cnt'] + '\'></div>' + cBd['name'] + '<div class=\'itemOwn\'>by ' + (cBd['creator'] || 'Krunker.io') + '</div><img style=\'margin-top:-10px\' class=\'skinImg' + (cBd['type'] ? 'C' : '') + '\' src=\'' + cB0['getPreview'](cBd, cB9['store']) + '\'/><div class=\'selctBtn\' style=\'margin-top:-40px\' onmouseenter=\'playTick()\'onclick=\'selectSkin(' + czX[czY]['ind'] + ',' + (cBd['weapon'] - 0x1) + ')\'>' + cA8['t']('generic.select') + '</div><div class=\'selctInfoBtn\' onmouseenter=\'playTick()\'onclick=\'openURL(&quot;/social.html?p=itemsales&i=' + czX[czY]['ind'] + '&quot;)\'>?</div></div>');
        return czW += '</div>';
    }
}, {
    'header': cA8['t']('windows.hat.header'),
    'gen': function() {
        return cHG('selectHat', 0x1);
    }
}, {
    'header': cA8['t']('windows.back.header'),
    'gen': function() {
        return cHG('selectBack', 0x2);
    }
}, {
    'header': cA8['t']('windows.mods.load.header'),
    'gen': function() {
        return '<div id=\'modPckHead\' style=\'margin-bottom:10px;font-size:22px\'>Mod Loader</div><form id=\'modDropper\'><input onchange=\'loadMod()\' id=\'modInput\'type=\'file\'><p id=\'modLInfo\'>' + cA8['t']('windows.mods.drop') + '</p></form><input type=\'text\' id=\'modURL\' class=\'accountInput\' style=\'width:78%\' placeholder=\'' + cA8['t']('windows.mods.paste') + '\'><a class=\'menuLink\' style=\'display:inline-block;margin-left:10px\' onclick=\'loadModURL()\'>' + cA8['t']('windows.mods.load') + '</a>';
    }
}, {
    'header': cA8['t']('windows.publish.mod.header'),
    'gen': function() {
        return cBc ? '<div style=\'margin-top:0px\' class=\'setHed\'>' + cA8['t']('windows.publish.mod.header') + '</div><div style=\'color:rgba(0,0,0,0.4);font-size:18px\'><input onclick=\'selectModThumb()\' type=\'button\' id=\'thumbBtn\' style=\'cursor:pointer\' value=\'Select\' /><input id=\'modThumb\' type=\'file\' accept=\'image/*\' style=\'width:1px;visibility:hidden;\' onchange=\'updateModThumb()\'><span style=\'color:rgba(0,0,0,0.4);margin-left:10px\' id=\'modThumbName\'>' + cA8['t']('windows.publish.mod.thumbnail') + '</span></div><input id=\'pubModName\' type=\'text\' placeholder=\'' + cA8['t']('windows.publish.mod.name') + '\' class=\'mapInput\' autocomplete=\'off\' autocorrect=\'off\' autocapitalize=\'off\' spellcheck=\'false\'/><input id=\'pubModURL\' type=\'text\' placeholder=\'' + cA8['t']('windows.publish.mod.paste') + '\' class=\'mapInput\' autocomplete=\'off\' autocorrect=\'off\' autocapitalize=\'off\' spellcheck=\'false\'/><div id=\'modUpResp\' style=\'color:rgba(0,0,0,0.3);margin-top:8px\'></div><div class=\'mapLoadButton\' style=\'margin-top:6px\' onclick=\'uploadCustomMod()\'>' + cA8['t']('windows.publish.mod.update') + '</div>' : '<div style=\'color:rgba(0,0,0,0.3);\'><a href=\'javascript:;\' onclick=\'showWindow(5)\' class=\'menuLink\'>' + cA8['t']('windows.publish.mod.login') + '</div>';
    }
}, {
    'header': cA8['t']('windows.secondary.header'),
    'gen': function() {
        for (var czW = '<div id=\'skinList\'>', czX = 0x0; czX < cB9['weapons']['length']; ++czX)
            if ((cBd = cB9['weapons'][czX]) && cBd['secondary']) {
                var czY = !cBd['minRec'] || cBc && cBc['level'] >= cBd['minRec'] || cB9['singlePlayer'];
                czW += '<div class=\'skinCard\'>' + cBd['name'] + '<div class=\'itemOwn\'>' + (cBd['minRec'] ? cA8['t']('windows.secondary.' + (czY ? 'unlocked' : 'req'), cBd['minRec']) : cA8['t']('generic.default')) + '</div><img style=\'margin-top:10px;image-rendering:pixelated\' class=\'skinImgC\' src=\'/img/prev/' + cBd['src'] + '.png\'/><div class=\'selctBtn\' onmouseenter=\'playTick()\' style=\'width: 127px;\'' + (czY ? 'onclick=\'selectSecondary(' + czX + ')' : '') + '\'>' + cA8['t']('generic.select') + '</div></div>';
            } return czW += '</div>';
    }
}, {
    'header': cA8['t']('windows.advertise.header'),
    'gen': function() {
        return '<div class=\'setHed\' style=\'margin-top:0\'>Advertise in Game</div><div style=\'color:rgba(0,0,0,0.4)\'>On krunker.io you have the ability to place advertisements in game.<div style=\'height:10px\'></div> The game features several <b>3d Billboards</b> that yield a very high impression rate & that are <b>not affected by ad blockers</b>.</div><img src=\'/img/ad_1.png\' style=\'width:100%;margin-top:10px\'/><div style=\'color:rgba(0,0,0,0.4);margin-top:10px\'><b>Daily Users:</b> ~ 2,000,000<br/><b>Registered Accounts:</b> ~ 5,000,000<br/><b>Daily Impressions:</b> ~ 6,500,000<br/><b>Peak CCU:</b> ~ 28,000<br/><b>Session Time avg:</b> 14 minutes<br/><div style=\'height:5px\'></div><i style=\'color:rgba(0,0,0,0.2)\'>as of 16/06/2019</i></div><div style=\'margin-top:10px;color:rgba(0,0,0,0.4)\'>For inquiries contact <a>info@yendis.ch</a></div>';
    }
}, {
    'header': 'Social',
    'gen': function() {
        return 'TODO';
    }
}, {
    'header': cA8['t']('windows.players.header'),
    'gen': function() {
        var czW = '<div style=\'margin-top:0px\' class=\'setHed\'><center>' + (cB9['players']['list']['length'] ? cA8['t']('windows.players.header') + '<hr>' : cA8['t']('windows.players.none')) + '</div>';
        czW += '<div style=\'background-color:gainsboro;border-radius: 12px;\'>', cBb && (czW += '<div><span class=\'settNameSmall\'>' + (cBn ? '<i class=\'material-icons\' style=\'font-size:25px\'>stars</i>' : '') + cBb['name'] + (cBb['clan'] ? '<span style=\'color:' + (0x0 <= cA0['verClans']['indexOf'](cBb['clan']) ? cAY['verified']['clan'] : '#353535') + '\'> [' + cBb['clan'] + ']</span>' : '') + '</span><span style=\'float:right\'>' + (cBc && cBc['developer'] ? '<span onmouseenter=\'playTick()\' class=\'punishButton kill\' onclick=\'punishPlayer(\"' + cBb['id'] + '\", 2)\'>Kill</span>' : '') + (cBc && cBc['developer'] ? '<span onmouseenter=\'playTick()\' class=\'punishButton tpall\' onclick=\'punishPlayer(null, 5)\'>TPAll</span>' : '') + '</span></div>');
        for (let czY of cB9['players']['list']['filter'](czW => !czW['isYou'])) {
            var czX = (czY['level'] <= cA0['voteKickMaxLvl'] || !czY['level']) && cBc && !cB9['isCustom'] && -0x1 == cBR['indexOf'](czY['name']) && (cBW == czY['name'] || !cBW && !cBS);
            czW += '<div><span class=\'settNameSmall\'>' + (cBo == czY['id'] ? '<i class=\'material-icons\' style=\'font-size:25px\'>stars</i>' : '') + '<a target=\'_blank\' class=\'' + (czY['isHacker'] ? 'red' : 'grey') + '\' href=\'/social.html?p=profile&q=' + czY['name'] + '\'>' + czY['name'] + (czY['clan'] ? '<span style=\'color:' + (0x0 <= cA0['verClans']['indexOf'](czY['clan']) ? cAY['verified']['clan'] : '#353535') + '\'> [' + czY['clan'] + ']</span>' : '') + '</a></span><span style=\'float:right\'>' + (czX ? '<span onmouseenter=\'playTick()\' class=\'punishButton vote\' onclick=\'kickVote(\"' + czY['id'] + '\")\'>Votekick</span>' : '') + (cBn || cBc && (cBc['developer'] || cBc['moderator']) ? '<span onmouseenter=\'playTick()\' class=\'punishButton kick\' onclick=\'punishPlayer(\"' + czY['id'] + '\", 0)\'>Kick</span>' : '') + (cBn || cBc && cBc['developer'] ? '<span onmouseenter=\'playTick()\' class=\'punishButton ban\' onclick=\'punishPlayer(\"' + czY['id'] + '\", 1)\'>Ban</span>' : '') + (cBc && cBc['developer'] ? '<span onmouseenter=\'playTick()\' class=\'punishButton kill\' onclick=\'punishPlayer(\"' + czY['id'] + '\", 2)\'>Kill</span>' : '') + (cBc && (cBc['developer'] || cBc['moderator']) ? '<span onmouseenter=\'playTick()\' class=\'punishButton tp2\' onclick=\'punishPlayer(\"' + czY['id'] + '\", 3)\'>TP2</span>' : '') + (cBc && (cBc['developer'] || cBc['moderator']) ? '<span onmouseenter=\'playTick()\' class=\'punishButton tpme\' onclick=\'punishPlayer(\"' + czY['id'] + '\", 4)\'>TPME</span>' : '') + '</span></div>';
        }
        return czW += '</div>';
    }
}, {
    'header': cA8['t']('windows.join.header'),
    'gen': function() {
        return '<input id=\'gameURL\' type=\'text\' placeholder=\'' + cA8['t']('windows.join.code') + '\' class=\'accountInput\' style=\'margin-top:0\' value=\'\'></input><div class=\'accountButton\' onclick=\'joinGame()\' style=\'width:100%\'>' + cA8['t']('windows.join.header') + '</div>';
    }
}, {
    'header': cA8['t']('windows.client.header'),
    'gen': function() {
        return '<div><ul style=\'padding:0;display:flex;list-style:none;text-align:center;margin:0;margin-top:-10px\'><li style=\'display: flex;flex-basis:200px;-webkit-box-flex:1;flex-grow:1;margin-right:10px\'><a href=\'//client2.krunker.io/setup.exe\' style=\'display:block;width:100%;padding-top:1em;\'><img src =\'./img/windows.png\' style=\'width:80px;height:80px;display:block;margin:0 auto 10px;\'>' + cA8['t']('windows.client.windows') + '</a></li><li style=\'display: flex;flex-basis:200px;-webkit-box-flex:1;flex-grow:1;\'><a href=\'//client2.krunker.io/setup.dmg\' style=\'display: block;width: 100%;padding-top:1em;\'><img src =\'./img/mac.png\' style=\'width:80px;height:80px;display:block;margin:0 auto 10px;\'>' + cA8['t']('windows.client.mac') + '</a></li><li style=\'display: flex;flex-basis:200px;-webkit-box-flex:1;flex-grow:1;\'><a href=\'//client2.krunker.io/setup.AppImage\' style=\'display: block;width: 100%;padding-top:1em;\'><img src =\'./img/linux.png\' style=\'width:80px;height:80px;display:block;margin:0 auto 10px;\'>' + cA8['t']('windows.client.linux') + '</a></li></ul></div>';
    }
}, {
    'header': cA8['t']('windows.melee.header'),
    'gen': function() {
        return cHG('selectMelee', 0x3);
    }
}, {
    'header': cA8['t']('windows.ranked.header'),
    'hideScroll': !0x0,
    'cantQueue': !0x1,
    'resp': function(czW, czX) {
        czW ? showWindow(0x0) : (this['cantQueue'] = czX, cG0(null), updateWindow(0x1b));
    },
    'gen': function() {
        if (!cBc) return '<div style=\'color:rgba(0,0,0,0.3)\'><a href=\'javascript:;\' onclick=\'showWindow(5);\' class=\'menuLink\'>' + cA8['t']('windows.ranked.login') + '</div>';
        if (this['cantQueue']) return '<span style=\'font-size: 20px\'>You have abandoned a ranked match in the last 5 hours. Please wait ' + cB0['getReadableTime'](this['cantQueue']) + ' to requeue.</span>';
        var czW = '<span class=\'rankedParty\' style=\'width: 302px;\'>Queue with Friends soon...</span>',
            czX = [];
        if (localStorage['lastQueues']) try {
            czX = JSON['parse'](localStorage['lastQueues']);
        } catch (cKI) {}
        0x0 == czX['length'] && (czX = [cA0['queues'][0x0]['id']]);
        var czY = getSavedVal('krk_rankedRegion');
        czY = czY ? parseInt(czY) : cA0['regionGroups']['findIndex'](czW => -0x1 != czW['regions']['indexOf'](cAi)), cA0['regionGroups'][czY] || (czY = 0x0), czW += '<select id=\"queueRegionSelect\" class=\'inputGrey\'>';
        for (var czZ = 0x0; czZ < cA0['regionGroups']['length']; czZ++) {
            czW += '<option value=\'' + czZ + '\' ' + (czZ == czY ? 'selected' : '') + '>', czW += cA0['regionGroups'][czZ]['name'], czW += '</option>';
        }
        for (var cA1 of (czW += '</select>', czW += '<div style=\'margin-top:10px;\'>', cA0['queues'])) {
            var cA2 = cB0['eloIconId'](cBc[cA1['key']]);
            czW += '<label class=\'rankedSelection\' onmouseover=\'SOUND.play(`tick_0`,0.1)\'><div class=\'rankedType blackShad\'>' + cA8['t'](cA1['name']) + '</div><img class=\'rankedELO\' src=\'./img/ranks/icon_' + cB0['eloIconId'](cBc[cA1['key']]) + '.png\'><div class=\'rankedELOTxt blackShad\'>' + (0x0 == cA2 ? 'No Rank' : 'Rank ' + cA2) + '</div><input type=\'checkbox\' class=\'rankedQueueOption\' data-queue-id=\'' + cA1['id'] + '\' ><img class=\'rankedImg\' src=\'/img/ranked/' + cA1['id'] + '.png\'></label>';
        }
        czW += '</div>';
        var cA3 = cBc['level'] >= cA0['minRankedLevel'];
        return cGa ? czW += '<div class=\"joinQueue jQR\" onclick=\"leaveQueue()\">Leave Queue</div>' : cG9 ? czW += '<div class=\"joinQueue jQR\">' + cG9 + '</div>' : cB9['config']['isFromQueue'] ? czW += '<div class=\"joinQueue jQR\">In Ranked Match</div>' : (czW += '<div class=\"joinQueue', !cA3 && (czW += ' jQR'), czW += '\" ', cA3 && (czW += 'onclick=\"joinQueue()\"'), czW += '>', czW += cA3 ? 'Join Queue' : 'Requires lvl ' + cA0['minRankedLevel'], czW += '</div>'), czW;
    }
}, {
    'header': 'Creator Dashboard',
    'getData': function(czW) {
        var czX = document['getElementById']('creatorDash');
        if (czX) {
            var czY = 'Error. Try Again';
            czW && (czY = '<div style=\'margin-bottom:20px;\'>The following are estimates of your Creator Code earnings</div><div>Earnings this Month: <span style=\'color:rgba(0,0,0,0.4)\'>' + czW['revenuesharethismonth'] + ' USD</span></div><div>Earnings last Month: <span style=\'color:rgba(0,0,0,0.4)\'>' + czW['revenuesharelastmonth'] + ' USD</span></div><div>Earning all Time: <span style=\'color:rgba(0,0,0,0.4)\'>' + czW['revenuesharetotal'] + ' USD</span></div><div style=\'color:rgba(0,0,0,0.5);margin-top:20px\'>Payouts happen on a monthly basis</div>'), czX['innerHTML'] = czY;
        }
    },
    'gen': function() {
        return cB8['send']('crtD'), '<div id=\'creatorDash\'>Loading...</div>';
    }
}, {
    'header': cA8['t']('windows.support.header'),
    'gen': function() {
        return '<div class=\'setHed\' style=\'margin-top:0\'>Krunker Support</div><div style=\'color:rgba(0,0,0,0.4)\'>Contact us on <a>krunker@yendis.ch</a> for support requests relating to your <b>Account</b>. Recovery is only possible if certain information can be provided.<div style=\'height:10px\'></div> For <b>Bug Reports, Suggestions</b> or <b>Other Queries</b> join our <a href=\'https://discord.gg/2hhCVc9\'>Discord</a> or <a href=\'https://www.reddit.com/r/KrunkerIO\'>Reddit</a> communities.<div style=\'height:10px\'></div>For Business related matters go to our <a href=\'https://yendis.io\'>Website</a>';
    }
}, {
    'header': cA8['t']('windows.mail.header'),
    'mailData': null,
    'mailCount': function(czW) {
        mailCount['innerHTML'] = czW, mailCount['style']['display'] = czW ? 'block' : 'none';
    },
    'onData': function(czW) {
        czW ? this['mailData']['d'] = czW : windows[0x1d]['mailData'] = null, updateWindow(0x1e);
    },
    'onReadData': function(czW) {
        var czX;
        if (czW) {
            if (czW = czW[0x0], czX = document['getElementById']('mail_' + czW['km_id'])) {
                czX['style']['border'] = '', czX['classList']['remove']('mailUnread');
                var czY = czW['km_text']['replace'](/<|>/g, '')['replace']('&', '')['replace'](/[^\x00-\x7F]/g, '');
                czX['children'][0x2]['innerHTML'] = czY['length'] ? czY : 'No message provided';
                for (var czZ = 0x0; czZ < this['mailData']['d']['length']; czZ++)
                    if (this['mailData']['d'][czZ]['km_id'] == czW['km_id']) {
                        this['mailData']['d'][czZ]['km_archive'] = 0x1;
                        break;
                    }
            }
        } else(czX = document['getElementById']('mail_' + czW['km_id'])) && (czX['children'][0x2]['innerHTML'] = 'Failed to load mail');
    },
    'readMail': function(czW, czX) {
        czW['children'][0x2]['innerHTML']['length'] ? czW['children'][0x2]['innerHTML'] = '' : (czW['children'][0x2]['innerHTML'] = 'Loading...', cB8['send']('rml', czX));
    },
    'gen': function() {
        var czW = '';
        if (this['mailData'])
            if (this['mailData']['d']) {
                for (var czX, czY = 0x0; czY < this['mailData']['d']['length']; ++czY) czW += '<div class=\'mailObj' + ((czX = this['mailData']['d'][czY]['km_archive']) ? '' : ' mailUnread') + '\' id=\'mail_' + this['mailData']['d'][czY]['km_id'] + '\' onclick=\'windows[29].readMail(this, ' + this['mailData']['d'][czY]['km_id'] + ')\' style=\'' + (czX ? '' : 'border: 2px solid #5699eb;') + '\'><div style=\'position:relative;\'><div class=\'mailDate\'>' + cB0['getReadableTime2'](new Date()['getTime']() - new Date(this['mailData']['d'][czY]['km_datesent'])['getTime']()) + '</div></div><div class=\'mailFrom\'>' + this['mailData']['d'][czY]['km_playerfrom'] + '</div>' + this['mailData']['d'][czY]['km_subject'] + '<div class=\'mailText\'></div></div>';
                this['mailData']['d']['length'] || (czW = 'Empty Inbox');
            } else czW = 'Loading...';
        else this['mailData'] = {}, cB8['send']('kml'), czW = 'Loading...';
        return '<div>Your Inbox [BETA]</div><div id=\'mailList\'>' + czW + '</div>';
    }
}, {
    'header': cA8['t']('windows.attach.header'),
    'gen': function() {
        var czW = '<div id=\'skinList\'><div class=\'noBtnCard\' onclick=\'selectAttachment(-1)\'>' + cA8['t']('generic.none') + '<div class=\'skinRandom blackShad\' style=\'top: 60px;\'>X</div></div>';
        if (null != cB9['weapons'][cB9['classes'][cBL]['loadout'][0x0]]['attach'])
            for (var czX = 0x0; czX < cB9['attach']['length']; ++czX)(cBd = cB9['attach'][czX]) && (czW += '<div class=\'noBtnCard\' onclick=\'selectAttachment(' + czX + ')\'>' + cBd['name'] + '<div><img class=\'noBtnImgC\' src=\'' + cB0['assetsUrl']('/textures/previews/attach/attach_' + czX + '.png') + '\'/></div></div>');
        return czW += '</div>';
    }
}], window['advertMapCreator'] = function() {
    var czW = cB0['randInt'](0x1, 0x3);
    if (cBP['length'] && !cBQ && 0x2 == czW && cBb) {
        var czX = '<div class=\'supportRate\'>Do you enjoy this map?</div><div class=\'voteHint\'>Rate</div><i id=\'mapSupVoteD\' onclick=\'voteMapSupport(' + cBP[0x0] + ',-1)\' class=\'material-icons vote\'>thumb_down</i><i id=\'mapSupVoteU\' onclick=\'voteMapSupport(' + cBP[0x0] + ',1)\' class=\'material-icons vote\'>thumb_up</i><div style=\'font-size: 17px;\'>If you would like to support the creator of this map consider gifting them some KR.<div class=\'supportGift\' onclick=\'openURL(&quot;/social.html?p=profile&q=' + cBP[0x1] + '&autoGift=1&quot;)\'>GIFT KR</div>';
        supportMapCreator['innerHTML'] = czX, supportMapCreator['style']['display'] = 'inline-block', cBQ = !0x0;
    }
};
for (var cL7 = 0x0; cL7 < windows['length']; ++cL7) windows[cL7]['html'] = '';
var cL8 = 0x0;

function cL9(czW, czX) {
    null == czW || null == czW ? (tmpEl = document['getElementById']('vouchRes'), tmpEl && (tmpEl['innerHTML'] = czX || 'Failed to Redeem')) : (cCy(czW), updateWindow(null, !0x0));
}

function cLc(czW) {
    windows[0x1d]['onData'](czW);
}

function cLe(czW) {
    windows[0x1d]['onReadData'](czW);
}

function cLg(czW) {
    windows[0x1d]['mailCount'](czW);
}
Object['defineProperty'](window, 'updateWindow', {
    'writeable': !0x1,
    'value': function(czW, czX) {
        'block' == windowHolder['style']['display'] && (cL8 == czW && null != czW ? showWindow(czW, !0x0) : czX && showWindow(cL8, !0x0));
    }
}), Object['defineProperty'](window, 'showWindow', {
    'writeable': !0x1,
    'value': function(czW, czX) {
        !cB0['isNumber'](czW) || 0x0 > czW || (cBa['idleTimer'] = 0x0, function() {
            document['getElementById']('aContainer') || cSc(), windows['length'] > cHv && (windows['length'] = cHv), menuBtnSettings ? 'showWindow(1)' != menuBtnSettings['parentNode']['getAttribute']('onclick') && elm['parentNode']['setAttribute']('onclick', 'showWindow(1)') : cSc();
            var czW = document['getElementById']('menuBtnHost');
            czW ? 'openHostWindow()' != czW['getAttribute']('onclick') && czW['setAttribute']('onclick', 'openHostWindow()') : cSc(), aHolder['style']['visibility']['length'] && cSc();
        }(), czX || czW && ('block' != windowHolder['style']['display'] || czW != cL8) ? (cB5['toggleMenu'](!0x0), menuWindow['innerHTML'] = windows[czW - 0x1]['gen'] ? windows[czW - 0x1]['gen']() : windows[czW - 0x1]['html'], cL8 = czW, menuWindow['style']['overflowY'] = windows[czW - 0x1]['hideScroll'] ? 'hidden' : 'auto', windowHeader['innerHTML'] = windows[czW - 0x1]['header'], cB5['toggleWindow'](!0x0, cBa['gamepad']['_connected'])) : (cB5['toggleWindow'](!0x1, cBa['gamepad']['_connected']), cBa['inputChanger'] = null));
    }
}), window['playTick'] = function() {
    cB3['play']('tick_0', 0.2);
}, window['copyInviteLink'] = function() {
    cB9['mode']['isRanked'] || (cB0['copyToClipboard']('https://' + location['host'] + '/?game=' + cAg), inviteButton['innerText'] = cA8['t']('menu.btn.invite.clicked'), setTimeout(() => inviteButton['innerText'] = cA8['t']('menu.btn.invite'), 0x4e2));
};
Object.defineProperty(window, 'punishPlayer', {
    'writeable': false,
    'value': function(czW, czX) {
        if (!(0x2 < czX || 0x0 > czX) || cBc && (cBc['developer'] || cBc['moderator']))
            if (0x4 < czX) cB8['send']('pnh', czX, null);
            else
                for (var czY = 0x0; czY < cB9['players']['list']['length']; ++czY)
                    if ((cBd = cB9['players']['list'][czY])['id'] == czW) {
                        cB8['send']('pnh', czX, cBd['id']);
                        break;
                    }
    }
}), window['submitCrtrCod'] = function() {
    var czW = document['getElementById']('crtrEmail'),
        czX = document['getElementById']('crtrCode');
    czW['value'] && czX['value'] && (tmpEl = document['getElementById']('ctrtRes'), tmpEl && (tmpEl['innerHTML'] = 'Loading...'), cB8['send']('crtC', czX['value'], czW['value']));
}, window['crtrCodRes'] = function(czW, czX) {
    czW ? (tmpEl = document['getElementById']('ctrtRes'), tmpEl && (tmpEl['innerHTML'] = czW)) : windows[0x1b]['getData'](czX);
}, Object['defineProperty'](window, 'redeemVoucher', {
    'writeable': !0x1,
    'value': function() {
        var czW = document['getElementById']('redVouch');
        if (czW && czW['value']) {
            var czX = czW['value'];
            (czW = document['getElementById']('vouchRes')) && (czW['innerHTML'] = 'Loading...'), cB8['send']('vo', czX);
        }
    }
});
var cLw, cLx, cLy, cLz, cLA, cLB = spinWindow,
    cLC = cLB['getContext']('2d'),
    cLD = 0.95,
    cLE = 0.6,
    cLF = null,
    cLG = !0x1,
    cLH = 0x0,
    cLI = 0x0,
    cLJ = 0x0,
    cLK = 0x0,
    cLL = 0x0,
    cLM = 0x1e,
    cLN = 0x12c,
    cLO = !0x0,
    cLP = !0x1,
    cLQ = 0x0,
    cLR = 0x0,
    cLS = new cAZ['PerspectiveCamera'](0x2d, 0x1, 0.1, 0x64),
    cLT = new cAZ['WebGLRenderer']({
        'precision': 'mediump',
        'antialias': !0x1,
        'alpha': !0x0
    });

function cLU(czW, czX) {
    if (cBI) {
        var czY = cB9['store']['skins'][czX];
        czY && cRH(null, '<span style=\'color:#fff\'>' + cA8['t']('windows.store.unboxed', cCm && cBl ? cB0['scrambleS'](czW) : czW, '</span>') + ' <span style=\'color:' + cB9['store']['rarities'][czY['rarity']]['color'] + '\'>' + czY['name'] + '</span>', !0x0);
    }
}

function cLY(czW, czX, czY, czZ, cA0) {
    if (cLG = !0x1, czZ);
    else {
        if (cLF = cB9['store']['skins'][czX], spinItemName['innerHTML'] = cLF['name'] + '<div style=\'color:rgba(255,255,255,0.5)\'>by ' + (cLF['creator'] || 'Krunker.io') + '</div>', cLI = 0x2 * Math['PI'] * (czW / 0x64 + 0xd) + Math['PI'] / 0x2, cBc)
            if (cA0 && (cBc['following'] = cA0), cBc['funds'] = czY, cFY(), spinKR['innerHTML'] = cBc['funds'] + ' KR', cBc['skins']['some'](czW => czW['ind'] === czX)) {
                var cA1 = cBc['skins']['find'](czW => czW['ind'] === czX);
                cA1 && cA1['cnt']++;
            } else cBc['skins']['push']({
                'ind': czX,
                'cnt': 0x1
            });
        spinRotation = 0x0, cLQ = 0x0, spinCost['innerHTML'] = '', (cLw = new cAZ['Scene']())['add'](new cAZ['AmbientLight'](0x4f4f4f));
        var cA2 = new cAZ['DirectionalLight'](0xffffff, 0.5);
        cA2['position']['set'](0x3, 0x1, 0x0), cLw['add'](cA2);
        var cA3 = cLF['type'] ? cLF : cB9['store']['previews'][cLF['weapon']] || {};
        (cLx = cB2['genObj3D'](0x0, 0x1 + (cA3['yOff'] || 0x0), cA3['xOff'] || 0x0))['rotateX'](-Math['PI'] / 0x7), cLx['rotateY'](Math['PI'] + 0.5 + (cA3['zRota'] || 0x0)), cLx['rotateZ'](-0.5), cLx['orgXR'] = cLx['rotation']['x'], cLx['orgYP'] = cLx['position']['y'], cB2['loadMesh']({
            'src': cB9['store']['types'][cLF['type'] || 0x0] + (cLF['type'] ? cLF['id'] : cLF['weapon']) + (null == cLF['mid'] ? '' : '_' + cLF['mid']),
            'texSrc': null == cLF['mid'] ? cLF['type'] && 0x3 == cLF['type'] ? 'melee/melee_' + (cLF['id'] || 0x0) + (cLF['tex'] ? '_' + cLF['tex'] : '') : cLF['type'] ? cLF['tex'] ? (0x1 == cLF['type'] ? 'hats/hat_' : 'body/body_') + cLF['id'] + '_' + cLF['tex'] : null : cLF['tex'] ? cLF['tex'] : 'weapons/skins/weapon_' + cLF['weapon'] + '_' + cLF['id'] : cLF['midT'],
            'movT': cLF['movT'],
            'pulsT': cLF['pulsT'],
            'frames': cLF['frames'],
            'frameT': cLF['frameT'],
            'sameGlow': cLF['sameGlow'],
            'glowText': cLF['glow'] || cLF['sameGlow'],
            'emissive': cLF['glow'] || cLF['sameGlow'] ? 0xffffff : null,
            'noGreen': !0x0,
            'uv2': !0x0,
            'fillScale': 0x3c,
            'centerZ': !0x0
        }, 0x0, 0x0, 0x0, (cLF['type'] && 0x3 != cLF['type'] ? Math['PI'] : Math['PI'] / 0x2) + (cA3['xRot'] || 0x0), 2.2 * (cA3['scl'] || 0x1), cLx), cLw['add'](cLx), cLS['lookAt'](cLw['position']);
    }
}

function cM9(czW, czX) {
    czX && windows[0x3]['modsLoaded'](czX['data'], czX['index'], czX['error']);
}

function cMc(czW, czX) {
    czX && windows[0x9]['mapsLoaded'](czX['data'], czX['index'], czX['error']);
}

function cMf(czW, czX) {
    czX && windows[czX['index']]['searchResp'](czX['data']);
}

function cMi(czW, czX, czY) {
    windows[0xc]['resp'](czW, czX, czY);
}

function cMm(czW, czX) {
    windows[0x1a]['resp'](czW, czX);
}
cLT['setPixelRatio'](0.6 * window['devicePixelRatio']), cLS['position']['y'] = 0xa, spinItemCanvas['appendChild'](cLT['domElement']), Object['defineProperty'](window, 'prizeWheel', {
    'writeable': !0x1,
    'value': function(czW, czX) {
        (cLy = cB9['store']['wheels'][czW])['openURL'] && window['openURL'](cA0['followURLS'][cB0['randInt'](0x0, cA0['followURLS']['length'] - 0x1)]), cLJ = czW, showWindow(0x0), cLH = 0x0, cLO = !cLG, cLP = !0x1, cLI = 0x0, cLR = 0x0, spinRotation = 0x0, cLK = cLL = 0x0, cB5['toggleMenuHider'](!0x1), spinItem['style']['display'] = 'none', spinItemName['style']['display'] = 'none', respinUI['style']['display'] = 'none', spinUI['style']['display'] = 'block', cLS['position']['x'] = cLN, spinButton['style']['opacity'] = 0x1, spinText['style']['display'] = 'table-cell', spinHeader['innerHTML'] = 'SPIN', spinCost['innerHTML'] = '-' + cLy['price'] + 'KR', spinRespin['innerHTML'] = '<i class=\'material-icons\' style=\'margin-left:-10px;text-shadow:none;vertical-align:sub;font-size:35px;\'>refresh</i> ' + cLy['price'] + ' KR';
        for (var czY = '<div style=\'font-size:50px;color:#fff\'>' + cLy['name']['toUpperCase']() + '</div>', czZ = 0x0; czZ < cB9['store']['rarities']['length']; ++czZ)(cBd = cB9['store']['rarities'][czZ])['noSpin'] || (czY += '<div style=\'margin-top:5px;color:#fff\'>' + cBd['name'] + '<span style=\'color:rgba(255,255,255,0.5)\'>&emsp;' + cLy['rarities'][czZ] + '%</span><div class=\'colCub\' style=\'background-color:' + cBd['color'] + '\'></div></div>');
        spinInfo['innerHTML'] = czY, cBc && (spinKR['innerHTML'] = cBc['funds'] + ' KR'), czX && spinButton['click']();
    }
}), spinRespin['onclick'] = function() {
    cLP && prizeWheel(cLJ, !0x0);
}, spinRespinInfo['onclick'] = function() {
    cLP && openURL('/social.html?p=itemsales&i=' + cB9['store']['skins']['findIndex'](czW => czW == cLF));
}, spinButton['onclick'] = function(czW) {
    czW['stopPropagation'](), czW['preventDefault'](), cBa['idleTimer'] = 0x0, cB8 && !cLG && cLO && cBc && cBc['funds'] >= cLy['price'] ? (cLG = !0x0, cLO = !0x1, cB8['send']('spin', cLJ), spinHeader['innerHTML'] = '', spinCost['innerHTML'] = cA8['t']('windows.store.purchasing'), cB3['play']('buy_1', 0.1)) : cLP && czW['shiftKey'] && prizeWheel(cLJ, !0x0);
}, spinUI['onclick'] = function(czW) {
    showWindow(0xe), cB5['toggleMenuHider'](!0x0), spinUI['style']['display'] = 'none', cB8 && cB8['send']('unbx'), cLP && czW['shiftKey'] && prizeWheel(cLJ, !0x0);
}, Object['defineProperty'](window, 'selectHostMap', {
    'writeable': !0x1,
    'value': function(czW, exports = null) {
        cLz = czW, cLA = 'undefined' == exports ? null : exports, showWindow(0x8);
    }
}), Object['defineProperty'](window, 'openHostWindow', {
    'writeable': !0x1,
    'value': function(czW) {
        return cB9['mode']['isRanked'] ? showWindow(0x0) : (cLz = null, cLA = null, void showWindow(0x8, czW));
    }
});
var cMz, cMA = !('true' != getSavedVal('krk_record'));

function cMB(czW, czX) {
    try {
        mapUpResp && !czX && (mapUpResp['innerHTML'] = czW);
    } catch (cME) {}
    try {
        modUpResp && czX && (modUpResp['innerHTML'] = czW);
    } catch (cMF) {}
}
window['enableRecord'] = function(czW) {
    cMA = czW, saveVal('krk_record', czW);
}, enableRecord(cMA), window['createClip'] = function() {
    if (cMA && cBb && cBb['active'] && cMz['states']['length']) {
        for (var czW = Object['assign']({}, cB9['map']['maps'][cB9['mapIndex']]), czX = 0x0; czX < czW['objects']['length']; ++czX) czW['objects'][czX]['i'] = cA0['prefabIDS']['indexOf'](czW['objects'][czX]['i']), czW['objects'][czX]['t'] = cA0['textureIDS']['indexOf'](czW['objects'][czX]['t']);
        var czY = {
            'id': 'clip_' + Date['now'](),
            'mode': cB9['modeIndex'],
            'map': czW,
            'states': []
        };
        for (czX = 0x0; czX < cMz['states']['length']; ++czX)
            if (czX) {
                var czZ = [];
                czZ['push'](cMz['states'][czX]['input']['data']), cMz['states'][czX]['players']['length'] && czZ['push'](cMz['states'][czX]['players']), czY['states']['push'](czZ);
            } else czY['states']['push'](cMz['states'][czX]);
        downloadFile(czY['id'] + '.txt', czY);
    }
}, window['downloadFile'] = function(czW, czX) {
    var czY = document['createElement']('a');
    czY['setAttribute']('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON['stringify'](czX))), czY['setAttribute']('download', czW), czY['style']['display'] = 'none', document['body']['appendChild'](czY), czY['click'](), document['body']['removeChild'](czY);
}, window['updateMapThumb'] = function() {
    var czW = null;
    try {
        czW = document['getElementById']('mapThumb')['files'][0x0];
    } catch (cMP) {}
    document['getElementById']('mapThumbName')['innerHTML'] = czW ? czW['name'] : cA8['t']('generic.failed');
}, window['selectMapThumb'] = function() {
    document['getElementById']('mapThumb')['click']();
}, window['uploadCustomMap'] = function() {
    mapUpResp && (mapUpResp['innerHTML'] = cA8['t']('generic.loading'));
    var czW = null;
    try {
        czW = document['getElementById']('mapThumb')['files'][0x0];
    } catch (cMR) {}
    if (czW) {
        var czX = new FileReader();
        czX['readAsDataURL'](czW), czX['onload'] = function() {
            return 0x28 < cB0['thumbnailSize'](czX['result']) ? void cMB(cA8['t']('thumbnail.upload.limit')) : void cB8['send']('uploadM', mapDataNew['value'], czX['result']);
        }, czX['onerror'] = function() {
            mapUpResp['innerHTML'] = cA8['t']('thumbnail.upload.error');
        };
    } else cB8['send']('uploadM', mapDataNew['value']);
}, window['updateModThumb'] = function() {
    var czW = null;
    try {
        czW = document['getElementById']('modThumb')['files'][0x0];
    } catch (cMU) {}
    document['getElementById']('modThumbName')['innerHTML'] = czW ? czW['name'] : cA8['t']('generic.failed');
}, window['selectModThumb'] = function() {
    document['getElementById']('modThumb')['click']();
}, window['uploadCustomMod'] = function() {
    modUpResp && (modUpResp['innerHTML'] = cA8['t']('generic.loading'));
    var czW = null;
    try {
        czW = document['getElementById']('modThumb')['files'][0x0];
    } catch (cMW) {}
    if (czW) {
        var czX = new FileReader();
        czX['readAsDataURL'](czW), czX['onload'] = function() {
            return 0x28 < cB0['thumbnailSize'](czX['result']) ? void cMB(cA8['t']('thumbnail.upload.limit'), 0x1) : void cB8['send']('uploadMo', pubModName['value'], pubModURL['value'], czX['result']);
        }, czX['onerror'] = function() {
            modUpResp['innerHTML'] = cA8['t']('thumbnail.upload.error');
        };
    } else cB8['send']('uploadMo', pubModName['value'], pubModURL['value']);
}, zip['workerScriptsPath'] = './libs/';
var cMY = new FileReader();

function cMZ(czW) {
    this['imgAsDataURL'] = '', this['process'] = function(czX) {
        if (this['imgAsDataURL'] = URL['createObjectURL'](czX), this['imgAsDataURL'] && czW) {
            try {
                var czY = new Image();
                czY['onload'] = function() {
                    cB2['updateTexture'](czW['replace']('textures/', '')['replace']('.png', ''), this);
                }, czY['src'] = this['imgAsDataURL'];
            } catch (cN3) {}
            cNm['close']();
        }
    };
}

function cN4(czW) {
    this['filename'] = czW;
    var czX = this;
    this['process'] = function(czW) {
        var czY = URL['createObjectURL'](czW);
        if (czY) {
            try {
                var czZ = czX['filename']['split']('/')[0x1];
                if (0x0 <= czZ['indexOf']('ambient'))
                    for (var cA0 = 0x1; 0x4 > cA0; ++cA0) cB3['stop']('ambient_' + cA0);
                cB3['sounds'][czZ] = new Howl({
                    'src': [czY],
                    'format': 'mp3'
                }), cB3['sounds'][czZ + '3d'] = new Howl({
                    'src': [czY],
                    'format': 'mp3'
                }), 'ambient_1' == czZ && cB3['play']('ambient_1', 0.12, !0x0, 0x1);
            } catch (cNb) {}
            cNm['close']();
        }
    };
}

function cNc(czW) {
    this['process'] = function(czX) {
        if (czW) {
            try {
                const czY = new FileReader();
                czY['addEventListener']('loadend', czX => {
                    const czY = czX['srcElement']['result'];
                    cB2['updateMesh'](czW['replace']('models/', '')['replace']('.obj', ''), czY);
                }), czY['readAsText'](czX);
            } catch (cNi) {}
            cNm['close']();
        }
    };
}
cMY['onload'] = function(czW) {
    var czX = czW['target']['result'];
    loadModPack(czX);
};
var cNl, cNm = new function() {
    this['init'] = function(czW, czX) {
        this['numFiles'] = czX, this['progress'] = 0x0, this['reader'] = czW;
    }, this['close'] = function() {
        this['reader'] && (this['progress']++, document['getElementById']('modLInfo') && (document['getElementById']('modLInfo')['innerHTML'] = cA8['t']('mod.extracting', this['progress'], this['numFiles'])), this['numFiles'] === this['progress'] && (spriteIndex = 0x0, document['getElementById']('modLInfo') && (document['getElementById']('modLInfo')['innerHTML'] = cA8['t']('generic.success')), this['reader']['close'](), this['reader'] = void 0x0));
    };
}();

function cNp(czW, czX, czY, czZ) {
    cBB = czX, window['spectating'] = czY, !cBB && czY && (cBB = 0x1), cPb(czW), cB5['toggleMenu'](!0x1), cR2['length'] = 0x0, cRB['length'] = 0x0, cB5['toggleGameUI'](!0x0), cB6['reset'](), cBa['reset'](), cNK(!0x1), cB9['players']['forcePos'](), cB9['players']['resetAim'](), cBt['length'] = 0x0, cBu['length'] = 0x0, cBv = null, cBA = 0x1e, window['loading'] = !0x1, cBa['idleTimer'] = 0x0, teamName['innerHTML'] = '', hiddenMsg['style']['display'] = 'none', cS8(), cBg = null, cB5['toggleControlUI'](cBa['enabled']), cB9['updateUI'](), challIcon['src'] = czZ ? './img/skull_0.png' : './img/hp_0.png';
}

function cNu(czW, czX, czY, czZ, cA0, cA1, cA2, cA3, cA8, cA9) {
    if (cA1['isFromQueue'] && window['history']['replaceState']({}, 'Krunker', '/'), cBK = !0x1, cA3 ? cA3['data'] && cB9['customMap'](cA3['data'], cA3['id'], cA3['creator'], null, !0x0) : cB9['map']['setMaps'](), cB9['isCustom'] = !!cA0, cBo = cA0, cBn = cA0 && cA0 == cB8['socketId'], mapVote['innerHTML'] = '', mapVoteVal = 0x0, cBP['length'] = 0x0, cBQ = !0x1, cA0 && cA3 && null != cA3['id'] && (cBP = [cA3['id'], cA3['creator']], mapVote['innerHTML'] = '<div class=\'voteHint\'>Rate</div><i id=\'mapVoteD\' onclick=\'voteMap(' + cA3['id'] + ',-1)\' class=\'material-icons vote\'>thumb_down</i><i id=\'mapVoteU\' onclick=\'voteMap(' + cA3['id'] + ',1)\' class=\'material-icons vote\'>thumb_up</i>'), cB9['applyConfig'](cA1, cA3 && cA3['featured']), cB9['init'](czW, czX, cA9), cB9['setObjective'](czZ), loadingBg['style']['display'] = 'none', inviteButton['classList']['toggle']('buttonD', !!cB9['mode']['isRanked']), menuBtnHost['classList']['toggle']('buttonD', !!cB9['mode']['isRanked']), (cA8 = cA8 || {})['dest'])
        for (var cAd = 0x0; cAd < cA8['dest']['length']; ++cAd) cB9['destroyObj'](cA8['dest'][cAd]);
    if (cA8['flg'])
        for (cAd = 0x0; cAd < cA8['flg']['length']; ++cAd) cB9['updateFlag'](...cA8['flg'][cAd]);
    if (cA8['pkups'])
        for (cAd = 0x0; cAd < cA8['pkups']['length']; ++cAd) cB9['updatePickup'](...cA8['pkups'][cAd]);
    if (cA8['gates'])
        for (cAd = 0x0; cAd < cA8['gates']['length']; ++cAd) cB9['updateGate'](...cA8['gates'][cAd]);
    if (cA8['banks'])
        for (cAd = 0x0; cAd < cA8['banks']['length']; ++cAd) cB9['updateBank'](...cA8['banks'][cAd]);
    if (cA8['zone'] && cB9['updateZone'](cA8['zone']), null != cA8['lck'] && cB9['lockMove'](cA8['lck']), specNameTm0['innerHTML'] = teamNm1['innerHTML'] = 0x0 < cB9['config']['nameTeam1']['replace'](/\s/g, '')['length'] ? cB9['config']['nameTeam1'] : 'Team 1', specNameTm1['innerHTML'] = teamNm2['innerHTML'] = 0x0 < cB9['config']['nameTeam1']['replace'](/\s/g, '')['length'] ? cB9['config']['nameTeam2'] : 'Team 2', teamScores['style']['display'] = 'none', spec0['style']['display'] = 'none', spec1['style']['display'] = 'none', cB9['mode']['teams'] && czY) {
        teamScores['style']['display'] = 'inline-block', spec0['style']['display'] = 'inline-block', spec1['style']['display'] = 'inline-block';
        var cAe = '';
        for (cAd = 0x0; cAd < czY['length']; ++cAd) cAe += '<div class=\'tScore\'><div id=\'tScoreC' + czY[cAd][0x0] + '\' class=\'tScoreC\'></div><span class=\'tScoreT\' id=\'tScoreV' + czY[cAd][0x0] + '\'>' + czY[cAd][0x1] + '</span></div>', document['getElementById']('specScoreTm' + (czY[cAd][0x0] - 0x1))['innerHTML'] = czY[cAd][0x1];
        teamScores['innerHTML'] = cAe;
    }
    cA2 && '' != cA2 && loadModPack(cA2, !0x0);
    var cAf = 0x0,
        cAg = 0x0;
    for (cAd = 0x0; cAd < cB9['map']['manager']['objects']['length']; ++cAd) cB9['map']['manager']['objects'][cAd]['score'] && (cAf++, cAg += cB9['map']['manager']['objects'][cAd]['scoreP']);
    cAf ? (scoreZoneCount['style']['display'] = 'inline-block', scoreZoneCount['innerHTML'] = '<i class=\'material-icons\' style=\'color:#fff;font-size:35px\'>flag</i> ' + cAg) : scoreZoneCount['style']['display'] = 'none', cB9['config']['lives'] || cB9['mode']['lives'] ? (livesCount['style']['display'] = 'inline-block', livesCount['innerHTML'] = '<i class=\'material-icons\' style=\'color:#fff;font-size:35px\'>favorite</i> <span id=\'livesDisp\' style=\'color:rgba(255,255,255,0.6)\'>' + (cB9['config']['lives'] || cB9['mode']['lives'] || 0x0) + '</span>') : livesCount['style']['display'] = 'none', cB5['setShowSpect'](cB9['config']['allowSpect']), cB5['setShowSelTeam'](cB9['config']['selTeam']), cBs = null, cBa['reset']();
    var cAh = cB9['map']['maps'][czW];
    cBa['moveCam'](cAh['camPos'][0x0], cAh['camPos'][0x1], cAh['camPos'][0x2]), cBa['rotateCam'](0x0, 0x0, 0x0), cB2['clearSprays'](), cB2['scene']['add'](cBa['object']), cBb = null, cB1['showObjective'] = !!cB9['mode']['objective'] && 0x0 < cB9['map']['manager']['objectives']['length'], killStreakHolder['innerHTML'] = '', bloodDisplay['style']['display'] = 'none', killsVal['innerHTML'] = 0x0, deathsVal['innerHTML'] = 0x0, cBO = 0x0, streakVal['innerHTML'] = cBO, cBy = 0x0, cBR['length'] = 0x0, cBW = !0x1, cBS = !0x1, voteToKick['style']['display'] = 'none', cDd(), cBa['masterLock'] = !0x1, cS8();
}

function cNK(czW) {
    window['locked'] = czW, blocker['style']['display'] = czW ? 'block' : 'none';
}

function cNM(czW, czX, czY, czZ) {
    cS8(), victoryText['innerHTML'] = czX ? 'VICTORY' : 'DEFEAT', victorySub['src'] = './img/' + (czX ? 'sub' : 'defeat') + '.png', cB5['toggleWindow'](!0x1, cBa['gamepad']['_connected']), cE2['endMessage']['val']['length'] && !cBK && (cB8['send']('ct', cE2['endMessage']['val']), cBK = !0x0), cBb && cBb['active'] || window['spectating'] ? (cB5['showEndScreen'](), cBs = cA0['endAnim'], setTimeout(function() {
        cB8['connected'] && (cBa['disable'](), cNR(czY));
    }, cA0['endAnim'])) : czW && (cBa['disable'](), cB5['showEndScreen'](), cNR(czY)), (cGy = czZ) && cGz(!0x0);
}

function cNR(czW) {
    if (czW && czW['ed']['length']) {
        var czX = '',
            czY = czW['mts'],
            czZ = czW['tms'];
        if (endTable['style']['top'] = cB9['mode']['isRanked'] ? '205px' : '310px', matchVoteHolder['style']['display'] = 'inline-block', matchVoteHolder['classList']['toggle']('isRanked', !!cB9['mode']['isRanked']), cB9['mode']['isRanked']) matchVoteHolder['innerHTML'] += '<div class=\'button small buttonR\' style=\'margin-right:10px\' onclick=\'location.reload()\'>Leave Game</div>', matchVoteHolder['innerHTML'] += '<div class=\'button small\' onclick=\'location = \"/?autoQueue=true\"\'>Requeue</div>', endTable['style']['maxHeight'] = 'calc(100% - 450px)';
        else if (0x1 < czY['length']) {
            for (var cA1 = 0x0; cA1 < czY['length']; ++cA1) {
                var cA2 = czY[cA1]['split'](','),
                    cA3 = cB9['map']['modes'][parseInt(cA2[0x0])],
                    cA8 = cB9['map']['maps'][parseInt(cA2[0x1])];
                cA3 && cA8 && (czX += '<label class=\'matchVote\'' + (0x0 == cA1 ? ' style=\"margin-left: 8px;\" ' : '') + 'onclick=\'voteOnMatch(\"' + czY[cA1] + '\")\'><img src=\'/img/' + (0x0 == parseInt(cA2[0x1]) && 'Burg' != cA8['name'] ? 'noimg' : 'maps/map_' + parseInt(cA2[0x1])) + '.png\' class=\'matchVoteThumb\'><div class=\'matchVoteMap\'>' + cA8['name'] + '</div><div class=\'matchVoteMode\'>' + cA3['id']['toUpperCase']() + '</div><div class=\'matchVoteTotal\' id=\'voteT' + czY[cA1] + '\'>0</div></label>');
            }
            matchVoteHolder['innerHTML'] = czX, czX['length'] && (endTable['style']['maxHeight'] = 'calc(100% - 490px)'), czW['vo'] && updMatchVote(czW['vo'], czW['mts']);
        } else matchVoteHolder['style']['display'] = 'none', endTable['style']['top'] = '205px';
        czZ ? (teamTotal0['innerHTML'] = '<span class=\"teamTotalN0\">' + teamNm1['innerHTML'] + '</span><span class=\"teamTotalScore\">' + (czZ[0x0][0x1] || 0x0) + '</span>', teamTotal1['innerHTML'] = '<span class=\"teamTotalScore\">' + (czZ[0x1][0x1] || 0x0) + '</span><span class=\"teamTotalN1\">' + teamNm2['innerHTML'] + '</span>', teamTotal0['style']['display'] = 'inline-block', teamTotal1['style']['display'] = 'inline-block') : (teamTotal0['style']['display'] = 'none', teamTotal1['style']['display'] = 'none'), endTable['style']['display'] = 'inline-block', czX = '<tr><th>Rank</th>';
        var cA9 = cB9['mode']['endStats'] || cA0['endStats'],
            cAd = cA9['length'];
        for (cA1 = 0x1; cA1 < cAd; ++cA1) czX += '<th>' + cB0['capFirst'](cA9[cA1]) + '</th>';
        czX += '<th></th></tr>';
        var cAe = 0x1,
            cAf = cBb && cBb['team'] ? cBb['team'] : window['spectating'] ? 0x1 : 0x0;
        for (cA1 = 0x0; cA1 < czW['ed']['length'];) {
            cBd = cB9['players']['findBySid'](czW['ed'][cA1]), czX += '<tr style=\'' + (cA1 + cAd >= czW['ed']['length'] ? 'border-bottom:none' : '') + '\'><td style=\'color:#fff\'>' + cAe + '.</td>';
            for (var cAg = 0x1; cAg < cAd; ++cAg) czX += '<td>' + (0x1 == cAg ? '<a class=\'endTableN\' href=\'' + cB0['toSocial'](czW['ed'][cA1 + cAg] || '') + '\' target=\'_blank\' style=\'color:' + (cBb && cBd && cBb['sid'] == cBd['sid'] ? '#fff\'' : cBd && cAf == cBd['team'] ? 'rgba(255,255,255,0.6)\'' : cAY['teams'][0x1] + '\'') + '>' : '') + (cCm && 0x1 == cAg && cBl ? cB0['scrambleS'](czW['ed'][cA1 + cAg] || 0x0) : czW['ed'][cA1 + cAg] || 0x0) + (0x1 == cAg && cBd && cBd['clan'] ? '<span style=\'color:' + (0x0 <= cA0['verClans']['indexOf'](cBd['clan']) ? cAY['verified']['clan'] : '#fff') + '\'> [' + cBd['clan'] + ']<span>' : '') + (0x1 == cAg ? '</a>' : '') + '</td>';
            czX += '<td>' + (cBc && cBd && cBd['level'] && cBd != cBb ? '<div class=\'reportBut\' onclick=\'reportPlayer(`' + cBd['name'] + '`,this)\'>REPORT</div>' : '') + '</td></tr>', cAe++, cA1 += cAd;
        }
        endTable['innerHTML'] = czX;
    } else endTable['style']['display'] = 'none';
}

function cO5(czW, czX, czY, czZ) {
    czY ? (czZ == cBb['name'] && (cBS = !0x0), cBW = czW, voteKickInfo['innerHTML'] = czZ + ' voted to kick ' + czW, voteKickName['innerHTML'] = 'Kick ' + czW, voteKickNum['innerHTML'] = 'Votes: ' + czX + '/' + cA0['voteKickReq'], voteToKick['style']['display'] = 'block', voteKickName['style']['display'] = czZ == cBb['name'] ? 'none' : 'block', voteKickKeys['style']['display'] = czZ == cBb['name'] ? 'none' : 'block') : czW ? (czW == cBb['name'] ? (cRH(null, '<span style=\'color:#fc03ec\'>Vote Submitted - ' + czX + '/' + cA0['voteKickReq'] + '</span>', !0x0), voteKickName['style']['display'] = 'none', voteKickKeys['style']['display'] = 'none') : voteToKick['style']['display'] = 'block', voteKickNum['innerHTML'] = 'Votes: ' + czX + '/' + cA0['voteKickReq']) : (cBW = !0x1, voteToKick['style']['display'] = 'none');
}

function cOa(czW, czX, czY) {
    cB9['playerSound'](czW, czX, czY);
}

function cOe(czW, czX, czY, czZ, cA0, cA1 = !0x0, cA2) {
    (cBd = cB9['players']['findBySid'](czW)) && (cBd == cBb && cB3['play']('pick_0', 0.2), cBd['updateLoadout'](cB9, czY, !0x0, ...czX)), cA1 && cB9['updatePickup'](czZ, cA0, null, cA2);
}
window['loadUserMod'] = function(czW, czX, czY) {
    showWindow(0x12), document['getElementById']('modLInfo') && (document['getElementById']('modLInfo')['innerHTML'] = cA8['t']('generic.loading')), loadModPack(czX, !0x0, czW, czY);
}, window['loadModURL'] = function() {
    modURL['value'] && loadModPack(modURL['value'], !0x0);
}, window['loadModPack'] = function(czW, czX, czY, czZ) {
    if (cB0['isDropbox'](czW) && !(-0x1 < czW['indexOf']('&')) || !czX) {
        if (!cBw) return void(document['getElementById']('modLInfo') && (document['getElementById']('modLInfo')['innerHTML'] = cA8['t']('mod.disabled')));
        modVote['innerHTML'] = '', czX && cBY(czW), null != czY && null != czZ && (cNl = 0x0, modVote['innerHTML'] = '<span id=\'modVoteHold\'><div class=\'voteHint vHR\'>Rate</div><i id=\'modVoteD\' onclick=\'voteMod(' + czZ + ',-1)\' class=\'material-icons vote\'>thumb_down</i><i id=\'modVoteU\' onclick=\'voteMod(' + czZ + ',1)\' class=\'material-icons vote\'>thumb_up</i></br></span>' + czY + ' Mod');
        try {
            czW = czW['replace']('dropbox.com', 'dl.dropboxusercontent.com')['replace'](/&/g, 'nope');
            var cA0 = '',
                cA1 = czX ? new zip['HttpReader'](czW) : new zip['Data64URIReader'](czW);
            zip['createReader'](cA1, function(czW) {
                czW['getEntries'](function(czX) {
                    if (czX['length']) {
                        cNm['init'](czW, czX['length']);
                        for (var czY, czZ = 0x0; czZ < czX['length']; czZ++)(czY = czX[czZ])['directory'] ? cNm['close']() : 'textures' == (cA0 = czY['filename']['split']('/')[0x0]) ? czY['getData'](new zip['BlobWriter']('image/png'), new cMZ(czY['filename'])['process'], function() {}) : 'sound' == cA0 ? czY['getData'](new zip['BlobWriter']('audio/mp3'), new cN4(czY['filename']['replace']('.mp3', ''))['process'], function() {}) : 'models' == cA0 && czY['getData'](new zip['BlobWriter']('application/x-tgif'), new cNc(czY['filename'])['process'], function() {});
                    }
                });
            }, function() {
                document['getElementById']('modLInfo') && (document['getElementById']('modLInfo')['innerHTML'] = cA8['t']('mod.error'));
            });
        } catch (cOz) {
            document['getElementById']('modLInfo') && (document['getElementById']('modLInfo')['innerHTML'] = cA8['t']('mod.error'));
        }
    }
}, cE2['autoLoadLast']['val'] && cBX['length'] && loadModPack(cBX, !0x0), window['loadMod'] = function() {
    if (modInput['files'] && modInput['files'][0x0]) {
        var czW = modInput['files'][0x0];
        'zip' == czW['name']['split']('.')['pop']()['toLowerCase']() ? (document['getElementById']('modLInfo') && (document['getElementById']('modLInfo')['innerHTML'] = cA8['t']('mod.loading')), cMY['readAsDataURL'](czW)) : document['getElementById']('modLInfo') && (document['getElementById']('modLInfo')['innerHTML'] = cA8['t']('mod.invalid'));
    }
}, window['joinGame'] = function() {
    let czW = gameURL['value'] || '';
    czW['match'](/^(https?:\/\/)?(www\.)?(.+)krunker\.io(|\/|\/\?game=.+)$/) ? location = czW : czW['match'](/^([A-Z]+):(\w+)$/) ? window['switchServer'](czW) : navigator['clipboard']['readText']()['then'](function(czW) {
        czW['match'](/^(https?:\/\/)?(www\.)?(.+)krunker\.io(|\/|\/\?game=.+)$/) && (location = czW);
    })['catch'](() => {
        console['log']('Failed to open clipboard link');
    });
}, window['toggleTeam'] = function(czW) {
    cGK = czW ? 0x2 : 0x1, teamNm1['style']['color'] = czW ? 'rgba(255,255,255,0.5)' : '#fff', teamNm2['style']['color'] = czW ? '#fff' : 'rgba(255,255,255,0.5)';
}, Object['defineProperty'](window, 'updMatchVote', {
    'writeable': !0x1,
    'value': function(czW, czX) {
        for (var czY = 0x0; czY < czX['length']; ++czY)
            if (cBd = document['getElementById']('voteT' + czX[czY])) {
                var czZ = 0x0;
                if (czW)
                    for (var cA0 in czW) czW['hasOwnProperty'](cA0) && czX[czY] == czW[cA0] && czZ++;
                cBd['innerHTML'] = czZ;
            }
    }
}), Object['defineProperty'](window, 'voteOnMatch', {
    'writeable': !0x1,
    'value': function(czW) {
        document['querySelectorAll']('div[id^=\"voteT\"')['forEach'](czX => {
            czX['style']['color'] = czX['id'] == 'voteT' + czW ? czX['style']['color'] == cAY['matchVote']['selected'] ? cAY['matchVote']['notSelected'] : cAY['matchVote']['selected'] : cAY['matchVote']['notSelected'];
        }), cB8['send']('maVote', czW);
    }
}), window['voteMod'] = function(czW, czX) {
    if (cBc) {
        document['getElementById']('modVoteU'), document['getElementById']('modVoteD');
        var czY = 0x0;
        0x1 == czX ? (czY = 0x1, 0x1 == cNl && (czY = 0x0)) : -0x1 == czX && (czY = -0x1, -0x1 == cNl && (czY = 0x0)), cNl = czY, cB8['send']('vote', cBc['id'], loginToken, czW, czY, 0x1);
    }
    var czZ = document['getElementById']('modVoteHold');
    czZ && (czZ['innerHTML'] = '');
}, window['voteMap'] = function(czW, czX) {
    if (cBc) {
        document['getElementById']('mapVoteU'), document['getElementById']('mapVoteD');
        var czY = 0x0;
        0x1 == czX ? (czY = 0x1, 0x1 == mapVoteVal && (czY = 0x0)) : -0x1 == czX && (czY = -0x1, -0x1 == mapVoteVal && (czY = 0x0)), mapVoteVal = czY, cB8['send']('vote', cBc['id'], loginToken, czW, czY);
    }
    mapVote['innerHTML'] = '';
}, window['voteMapSupport'] = function(czW, czX) {
    if (cBc) {
        document['getElementById']('mapSupVoteU'), document['getElementById']('mapSupVoteD');
        var czY = 0x0;
        0x1 == czX ? (czY = 0x1, 0x1 == mapVoteVal && (czY = 0x0)) : -0x1 == czX && (czY = -0x1, -0x1 == mapVoteVal && (czY = 0x0)), mapVoteVal = czY, cB8['send']('vote', cBc['id'], loginToken, czW, czY);
    }
}, Object['defineProperty'](window, 'followPlayer', {
    'writeable': !0x1,
    'value': function(czW, czX) {
        czX && (czX['style']['visibility'] = 'hidden'), cB8['send']('fo', czW);
    }
}), Object['defineProperty'](window, 'reportPlayer', {
    'writeable': !0x1,
    'value': function(czW) {
        openURL('/social.html?p=profile&q=' + czW + '&autoReport=1');
    }
}), Object['defineProperty'](window, 'kickVote', {
    'writeable': !0x1,
    'value': function(czW) {
        for (var czX = 0x0; czX < cB9['players']['list']['length']; ++czX)
            if ((cBd = cB9['players']['list'][czX])['id'] == czW) {
                cB8['send']('v2k', cBd['name']), cBR['push'](cBd['name']), updateWindow(0x17);
                break;
            }
    }
});
var cP0 = getSavedVal('sprayindex') || 0x0;

function cP1(czW, czX, czY, czZ, cA0, cA1, cA2) {
    cB2['addSpray'](czW, czX, czY, czZ, cA0, cA1, cA2, cB9['sprays'][czX]['opacity']);
}

function cP9(czW) {
    0x0 == czW ? cB3['play']('siren_0') : 0x1 == czW && (cB3['play']('nuke_0'), imgFlash['style']['display'] = 'block', imgFlash['style']['opacity'] = 0x1, imgFlash['style']['backgroundImage'] = '', cB2['shake'](0x1));
}

function cPb(czW, czX) {
    if (0x1 == czX) {
        endTimer['innerHTML'] = cA8['t']('timer.end', czW);
    } else if (0x2 == czX) {
        endTimer['innerHTML'] = cA8['t']('generic.matchover');
    } else if (0x3 == czX) {
        endTimer['innerHTML'] = cA8['t']('generic.matchaband');
    } else {
        timerVal['innerHTML'] = czW;
        specTimer['innerHTML'] = czW;
        timerDisplay['style']['display'] = '0:00' == czW ? 'none' : 'inline-block';
    }
}

function cPe(czW) {
    for (var czX, czY = 0x0; czY < czW['length'];) {
        if (czX = czW[czY] == cB8['socketId'], (cBd = cB9['players']['add'](czW[czY], czW[czY + 0x1], czW[czY + 0x2], czW[czY + 0x3], czW[czY + 0x4], czW[czY + 0x5], czW[czY + 0x6], czW[czY + 0xc], czW[czY + 0xd], czW[czY + 0xe], czW[czY + 0x13], czW[czY + 0x14], czW[czY + 0x16], czW[czY + 0xf], czW[czY + 0x15], czW[czY + 0x9], czX, czW[czY + 0x10], czW[czY + 0x11]))['health'] = null == czW[czY + 0x7] ? cBd['maxHealth'] : czW[czY + 0x7], cBd['maxHealth'] = czW[czY + 0x8], cBd['hpChase'] = cBd['health'] / cBd['maxHealth'], cBd['team'] = czW[czY + 0x9], cBd['level'] = czW[czY + 0xa], cBd['clan'] = czW[czY + 0xb], cBd['xDire'] = czW[czY + 0x12], czX) {
            if (cBb = cBd, cB9['mode']['showTeam'] && (teamName['innerHTML'] = cBb['team']), cBb['team']) {
                var czZ = document['getElementById']('tScoreC' + cBb['team']);
                czZ && (czZ['className'] = 'tScoreC you');
            }
            cDe(), botRightHider['style']['display'] = 'prop' == cBb['team'] ? 'none' : 'block', propInstruct['style']['display'] = 'prop' == cBb['team'] ? 'block' : 'none', cBa['object']['rotation']['y'] = cBb['xDire'], cBa['xDr'] = cBa['object']['rotation']['y'] % Math['PI2'];
        } else cBd['objInstances']['visible'] = !0x1;
        cRi(cBd['health'], cBd['sid'], null, null), czY += 0x17;
    }
    cPj();
}

function cPj() {
    if (window['spectating']) {
        for (var czW = ['', ''], czX = 0x0; czX < cB9['players']['list']['length']; ++czX)
            if (!(cBd = cB9['players']['list'][czX])['isYou']) {
                var czY = cB9['mode']['teams'] ? cBd['team'] - 0x1 : 0x1 & czX;
                czW[czY] += '<div class=\'specPlayerHolder' + czY + '\'><img src=\'https://assets.krunker.io/textures/classes/icon_' + (cBd['classIndex'] || 0x0) + '.png\' class=\'specPlayerIcon' + (cBd['active'] ? '' : ' silhouette') + '\'><div class=\'specPlayerName\'>' + cBd['name'] + '</div></div>';
            } document['getElementById']('specTeam0')['innerHTML'] = czW[0x0], document['getElementById']('specTeam1')['innerHTML'] = czW[0x1];
    }
}

function cPn(czW) {
    if (cB8['send']('p'), cBb) {
        if (cBb['x'] = czW[0x1], cBb['y'] = czW[0x2], cBb['z'] = czW[0x3], cBb['xVel'] = czW[0x4], cBb['yVel'] = czW[0x5], cBb['zVel'] = czW[0x6], cBb['onGround'] = czW[0x7], cBb['didJump'] = czW[0x8], cBb['onLadder'] = czW[0x9], cBb['aimVal'] = czW[0xa], cBb['crouchVal'] = czW[0xb], cB9['players']['swapWeapon'](cBb, 0x0, !0x1, czW[0xc], void 0x0, !0x0), cBb['slideTimer'] = czW[0xd], cBb['canSlide'] = czW[0xe], cBb['onTerrain'] = czW[0xf], czW[0x10]) {
            var czX = cBE != czW[0x10];
            cBE = czW[0x10], czX && function() {
                var czW = cAY['ping']['low'];
                0x96 <= cBE ? czW = cAY['ping']['high'] : 0x32 <= cBE && (czW = cAY['ping']['medium']);
                var czX = -0x1 == cBE ? '-' : cBE;
                pingDisplay['innerHTML'] = czX + '<i class=\'material-icons\' style=\'color:' + czW + '\'>signal_cellular_alt</i>', menuPingDisplay['innerHTML'] = '<i class=\'material-icons\' style=\'color:' + czW + '\'>signal_cellular_alt</i> ' + czX;
            }();
        }
        for (var czY = 0x0; czY < cBa['tmpInpts']['length'];) cBa['tmpInpts'][czY][0x0] <= czW[0x0] ? cBa['tmpInpts']['splice'](czY, 0x1) : (cBb['procInputs'](cBa['tmpInpts'][czY], cB9, !0x0), czY++);
    }
}

function cPt() {
    cB8['send']('po');
}

function cPu(czW) {
    czW;
}

function cPw() {
    if (!cB9['singlePlayer'] && (cBb && cBb['active'] || spectating))
        for (var czW = 0x0; czW < cB9['players']['list']['length']; ++czW)(cBd = cB9['players']['list'][czW])['active'] && cBd['objInstances'] && cBd != cBb && (cBd['cnBSeen'] = !0x0, !spectating && !(cBB && cBB == cBd['team']) && !(cBB && cBB != cBd['team'] && cB9['mode']['teamSee'] && cB9['mode']['teamSee'][0x0] == cBB && cB9['mode']['teamSee'][0x1] == cBd['team']) && (cB9['config']['nameTags'] || cB9['mode']['hideNames'] || null != cB9['canSee'](cBb, cBd['x'], cBd['y'], cBd['z'])) && (cBd['cnBSeen'] = !0x1), (0x1 == cE2['hideNames']['val'] && cBB && cBB != cBd['team'] || 0x2 == cE2['hideNames']['val'] && cBB && cBB == cBd['team'] || 0x3 == cE2['hideNames']['val']) && (cBd['cnBSeen'] = !0x1), cB9['players']['toggleLOD'](cBd, null == cB9['canSee'](cB2['camera']['getWorldPosition'](), cBd['x'], cBd['y'], cBd['z'], 0xa)));
}

function cPy(czW, czX) {
    'wt' == czW && (czW = cA8['t']('player.waiting')), czW && (czW += czX ? ' ' + czX : ''), gameMessage['innerHTML'] = czW || '', specGMessage['innerHTML'] = czW || '';
}

function cPB(czW, czX) {
    (cBd = cB9['players']['findBySid'](czW)) && (cBd['team'] = czX, cBd == cBb && (cBB = czX, cB9['mode']['showTeam'] && (teamName['innerHTML'] = cBB), 'stalk' == czX && cB9['players']['resetAim']()));
}

function cPE(czW) {
    if (cB9['players']['hideAll'](), czW)
        for (var czX = 0x0; czX < czW['length'];)(cBd = cB9['players']['findBySid'](czW[czX])) && cBd != cBb && (cBd['objInstances']['visible'] = !cBd['lodActive'], cBd['latestData'] = !0x0, cBd['forcePos'] ? (cBd['x'] = czW[czX + 0x1], cBd['y'] = czW[czX + 0x2], cBd['z'] = czW[czX + 0x3], cBd['xDire'] = czW[czX + 0x4], cBd['yDire'] = czW[czX + 0x5], cBd['interpolate'] = !0x1, cBd['forcePos'] = !0x1) : (cBd['dt'] = 0x0, cBd['x1'] = cBd['x'], cBd['x2'] = czW[czX + 0x1], cBd['y1'] = cBd['y'], cBd['y2'] = czW[czX + 0x2], cBd['z1'] = cBd['z'], cBd['z2'] = czW[czX + 0x3], cBd['xDir1'] = cBd['xDire'], cBd['xDir2'] = czW[czX + 0x4], cBd['yDir1'] = cBd['yDire'], cBd['yDir2'] = czW[czX + 0x5], cBd['interpolate'] = !0x0), cBd['onGround'] = czW[czX + 0x6], cBd['crouchVal'] = czW[czX + 0x7], cB9['players']['swapWeapon'](cBd, 0x0, !0x1, czW[czX + 0x8])), czX += 0x9;
}

function cPH(czW) {
    cB9['players']['remove'](czW);
}

function cPJ(czW, czX, czY, czZ, cA1, cA2) {
    cBd = cB9['players']['findBySid'](czW), cBe = cB9['players']['findBySid'](czY), killCardKick['style']['display'] = 'none';
    var cA3 = !0x1;
    if (cBd) {
        if (cB9['players']['kill'](cBd), cBd['isYou']) {
            deathsVal['innerHTML'] = czX || 0x0, cBO = 0x0, streakVal['innerHTML'] = cBO;
            var cA8 = '';
            if (cBe) {
                cBd != cBe && ((0xa >= cBe['level'] || !cBe['level']) && cBc && !cB9['isCustom'] && -0x1 == cBR['indexOf'](cBe['name']) && (cA3 = !0x0), cBa['camLookAt'](cBe['x'], cBe['y'] + cBe['height'] / 1.5, cBe['z']), cBe['interpolate'] = !0x1, cBe['cnBSeen'] = !0x0, cBe['objInstances'] && (cBe['objInstances']['visible'] = !0x0)), cA8 = '<img id=\'kCProfile\' src=\'https://assets.krunker.io/textures/classes/icon_' + cBe['classIndex'] + '.png\' />';
                var cA9 = Math['floor'](cA0['rankVar'] * Math['sqrt'](czZ[0x2] || 0x0));
                cA8 += '<div class=\'kClvl\'>lvl ' + (cA9 = Math['max'](0x1, cA9 + 0x1)) + '</div>', cA8 += '<div id=\'kCName\'>' + (cBe ? cCm && cBl ? cB0['scrambleS'](cBe['name']) : cBe['name'] : 'You') + (cBe['clan'] ? '<span style=\'color:' + (0x0 <= cA0['verClans']['indexOf'](cBe['clan']) ? cAY['verified']['clan'] : 'rgba(255,255,255,0.3)') + '\'> [' + cBe['clan'] + ']</span>' : '') + '</div>';
                var cAd = cBe['loadout']['indexOf'](czZ[0x0]),
                    cAe = null == cBe['skins'][cAd] ? null : cBe['skins'][cAd];
                null != cAe && (cAe = cB9['store']['skins'][cAe]);
                var cAf = cAe ? cB9['store']['rarities'][cAe['rarity']]['color'] : 'rgba(255,255,255,0.7)',
                    cAg = cAe ? cAe['name'] : cB9['weapons'][czZ[0x0]]['name'];
                'Combat Knife' == cAg && 0x0 <= cBe['meleeIndex'] && cB9['store']['skins'][cBe['meleeIndex']] && (cAg = cB9['store']['skins'][cBe['meleeIndex']]['name'], cAf = cB9['store']['rarities'][cB9['store']['skins'][cBe['meleeIndex']]['rarity']]['color']), cA8 += '<br/><div id=\'kCInfo\' style=\'color:' + cAf + '\'>[' + cAg + ']</div>';
            }
            cA8 += czZ && czZ[0x1] ? '<div id=\'kCInfoS\'>+' + czZ[0x1] + '</div>' : '', killCardBy['innerHTML'] = cBe ? 'Killed by' : 'You died', killCard['style']['display'] = cBe ? 'inline-block' : 'none', killCardKick['style']['display'] = cA3 ? 'inline-block' : 'none', killCard['innerHTML'] = cA8, cB5['toggleGameUI'](!0x1), setTimeout(function() {
                cDd();
            }, cA0['deathDelay']);
        }
        if (!cA2 && cBG) {
            var cAh = cBd == cBb ? '<span style=\'color:' + cAY['killFeed']['you'] + '\'>You</span>' : '<span style=\'color:' + (cBB && cBB == cBd['team'] ? cAY['killFeed']['ally'] : cAY['killFeed']['enemy']) + '\'>' + (cCm && cBl ? cB0['scrambleS'](cBd['name']) : cBd['name']) + '</span>',
                cAi = cBe == cBb ? '<span style=\'color:' + cAY['killFeed']['you'] + '\'>You</span>' : cBe ? '<span style=\'color:' + (cBB && cBB == cBe['team'] ? cAY['killFeed']['ally'] : cAY['killFeed']['enemy']) + '\'>' + (cCm && cBl ? cB0['scrambleS'](cBe['name']) : cBe['name']) + '</span>' : '';
            cBe ? function(czW, czX, czY, czZ) {
                for (cCm && cBl && (czZ = cBl['clean'](czZ)), cRy = cB9['weapons'][null == czX['weaponId'] ? czW['loadout'][czW['weaponIndex']] : czX['weaponId']], chatList['innerHTML'] += '<div class=\'chatItem\' style=\'word-break:break-all;overflow-wrap:break-word;' + (0.1 == cBT ? '' : 'background-color:rgba(0, 0, 0, ' + cBT + ')') + '\'><span class=\'chatMsg\'>' + czY + (null == czX['streak'] ? '<img style=\'opacity:0.7;margin-right:' + (cRy['melee'] && 0x1 != (cB9['store']['skins'][czW['meleeIndex']] && cB9['store']['skins'][czW['meleeIndex']]['id'] || 0x0) ? '5' : cRy['icnPad'] || 0x0) + 'px;' + (cRy['melee'] ? 'margin-bottom:-12px' : '') + '\' class=\'weaponChatIcon\' src=\'' + cB0['assetsUrl']((cRy['melee'] ? '/textures/melee/icon_' + (cB9['store']['skins'][czW['meleeIndex']] && cB9['store']['skins'][czW['meleeIndex']]['id'] || 0x0) : '/textures/weapons/' + cRy['icon']) + '.png') : '<img class=\'streakChatIcon\' src=\'./img/streaks/' + czX['streak'] + '.png') + '\' />' + (czX['headShot'] ? '<img class=\'headShotChatIcon\' src=\'./img/headshot_0.png\'>' : '') + czZ + '</span></div><br/>'; 0xfa <= chatList['scrollHeight'];) chatList['removeChild'](chatList['childNodes'][0x0]);
            }(cBe, cA1, cAi, cAh) : cRH(null, cAh + ' committed ' + cA0['suicides'][cB0['randInt'](0x0, cA0['suicides']['length'] - 0x1)], !0x0);
        }
        cPj();
    }
}

function cQ3(czW, czX) {
    if (cBb) {
        czX ? cBb['streaks'][czW] ? cBb['streaks'][czW]['cnt'] = czX : cBb['streaks'][czW] = {
            'cnt': czX,
            'streak': cB9['streaks'][czW]
        } : cBb['streaks'][czW] = null;
        for (var czY = '', czZ = 0x0; czZ < cB9['streaks']['length']; ++czZ) cBb['streaks'][czW] && (czY += '<div class=\'killStreakItem\' style=\'background-image: url(&quot;./img/streaks/' + czZ + '.png&quot;)\'><span>[' + cB0['getKeyName'](cBa['streakKeys'][czZ]) + ']</span><div class=\'killStreakCnt\'>x' + cBb['streaks'][czW]['cnt'] + '</div></div>');
        killStreakHolder['innerHTML'] = czY;
    }
}

function cQ8(czW, czX) {
    if (cBd = cB9['players']['findBySid'](czW)) {
        var czY = cBd == cBb ? '<span style=\'color:' + cAY['killFeed']['you'] + '\'>You\'re</span>' : '<span style=\'color:' + (cBB && cBB == cBd['team'] ? cAY['killFeed']['ally'] : cAY['killFeed']['enemy']) + '\'>' + (cCm && cBl ? cB0['scrambleS'](cBd['name']) : cBd['name']) + '</span> is';
        cRH(null, cA8['t']('player.killstreak', czY, czX), !0x0);
    }
}

function cQc(czW, czX, czY) {
    (cBd = cB9['players']['findBySid'](czW), cBe = cB9['players']['findBySid'](czX), cBd) && cRH(null, (cBd == cBb ? '<span style=\'color:' + cAY['killFeed']['you'] + '\'>You</span>' : '<span style=\'color:' + (cBB && cBB == cBd['team'] ? cAY['killFeed']['ally'] : cAY['killFeed']['enemy']) + '\'>' + (cCm && cBl ? cB0['scrambleS'](cBd['name']) : cBd['name']) + '</span>') + ' ' + czY + ' ' + (cBe == cBb ? '<span style=\'color:#fff\'>You</span>' : cBe ? '<span style=\'color:' + (cBB && cBB == cBe['team'] ? cAY['killFeed']['ally'] : cAY['killFeed']['enemy']) + '\'>' + (cCm && cBl ? cB0['scrambleS'](cBe['name']) : cBe['name']) + '</span>' : ''), !0x0);
}
Object['defineProperty'](window, 'selectSpray', {
    'writeable': !0x1,
    'value': function(czW) {
        saveVal('sprayindex', czW), cP0 = czW, showWindow(0x3);
    }
});
var cQh = null,
    cQi = 0x0;

function cQj(czW, czX) {
    if (cQh = czW, cQi = czX, czW) {
        for (var czY = 0x1, czZ = '', cA1 = 0x0; cA1 < czW['length']; cA1 += 0x6) czZ += '<div class=\'leaderItem\'>', czZ += '<div class=\'leaderCounter\'>' + czY + '.</div>', czZ += czW[cA1 + 0x5] ? ' <i class=\'material-icons\' style=\'color:' + cAY['verified']['player'] + ';margin-top:4px;font-size:25px\'>check_circle</i>' : '', czZ += '<div class=\'leaderName' + (cBb && czW[cA1] == cBb['sid'] ? 'M' : cBB && cBB == czW[cA1 + 0x2] ? 'F' : '') + '\'>' + (cCm ? cB0['scrambleS'](czW[cA1 + 0x1]) : czW[cA1 + 0x1]) + (czW[cA1 + 0x4] ? '<span style=\'color:' + (0x0 <= cA0['verClans']['indexOf'](czW[cA1 + 0x4]) ? cAY['verified']['clan'] : '#fff') + '\'> [' + czW[cA1 + 0x4] + ']</span>' : '') + '</div>', czZ += '<div class=\'leaderScore\'>' + cB0['formatNum'](czW[cA1 + 0x3], 0x2) + '</div>', czZ += '</div>', czY++;
        leaderContainer && (leaderContainer['innerHTML'] = czZ), 0x1 >= czY && (leaderContainer['innerHTML'] = cA8['t']('leaderboard.empty')), spectCount['style']['display'] = czX ? 'inline-block' : 'none', spectCount['innerHTML'] = '<i class=\'material-icons\' style=\'color:#fff;font-size:35px;margin-right:8px\'>visibility</i>' + czX;
    }
}

function cQp(czW, czX, czY, czZ, cA1, cA2, cA3) {
    if (cBb && cBb['active'] || window['spectating']) {
        if (cBd = cB9['players']['findBySid'](czW)) {
            var cA8 = cBd['y'] + cBd['height'] - cA0['cameraHeight'] - cBd['crouchVal'] * cA0['crouchDst'],
                cA9 = cB0['getD3D'](cBd['x'], cA8, cBd['z'], czX, czY, czZ),
                cAd = cB0['getDir'](cBd['z'], cBd['x'], czZ, czX),
                cAe = cB0['getDir'](cB0['getDistance'](cBd['x'], cBd['z'], czX, czZ), czY, 0x0, cA8);
            cB4['physObj'](cBd['x'], cA8, cBd['z'], cAd, cAe, cA9, cA3, 0x0);
        }
        null != cA1 && null == cB9['canSee'](cBb, czX, czY, czZ) && (cB4['effect'](czX, czY, czZ, cA1, cA2, 0x0), cBb && cB3['play3Dv']('rico_' + cB0['randInt'](0x1, 0x2), czX, czY, czZ, 0x37, 0.55, cB0['randFloat'](0.7, 1.1), cBb));
    }
}

function cQB(czW, czX, czY, czZ, cA0, cA1, cA2) {
    var cA3 = cB9['projectiles']['types'][cA1];
    cB4['physObj'](czW, czX, czY, czZ, cA0, cB9['projectiles']['types'][cA1]['range'], !0x1, null, null, cA3, cA2);
}

function cQK(czW) {
    cB4['disablePhys'](czW);
}

function cQM(czW, czX, czY, czZ) {
    if (cBb || window['spectating']) {
        cBd = cB2['camera']['getWorldPosition']();
        var cA1 = 0x1 - cB0['getD3D'](czW, czX, czY, cBd['x'], cBd['y'], cBd['z']) / cA0['explosionRange'];
        0x0 < cA1 && cB2['shake'](0.14 * cA1), cB3['play3D']('explosion', czW, czX, czY, 0x1, cB0['randFloat'](0.9, 1.1)), cB4['ExplosionManager']['explodeAt'](czW, czX, czY, 0.08 * czZ);
    }
}

function cQS(czW, czX) {
    var czY = document['getElementById']('tScoreV' + czW);
    czY && (czY['innerHTML'] = czX);
    var czZ = document['getElementById']('specScoreTm' + (czW - 0x1));
    czZ && (czZ['innerHTML'] = czX);
}

function cQX(czW) {
    czW && (cBy += czW, cB6['animateText'](scoreText, (0x0 < cBy ? '+' : '') + cBy, 0x64 * cBM, 0.38, 0x44c, 0x64, 0x0, function() {
        cBy = 0x0;
    }), cBb['score'] += czW);
}

function cQZ() {
    cBN && cB6['animateText'](checkText, cA8['t']('popup.checkpoint'), 0x4b, 0.38, 0x44c, 0x64, 0x0, null);
}

function cR0(czW) {
    (cBd = document['getElementById']('livesDisp')) && (cBd['innerHTML'] = czW);
}
var cR2 = [];

function cR3(czW, czX, czY, czZ) {
    cBO += czZ || 0x1, cR9(czW), czX && cB3['play']('headshot_0'), killsVal['innerHTML'] = czY, streakVal['innerHTML'] = cBO;
}

function cR8() {
    cR9(['Assist', cA0['assistScore']]);
}

function cR9(czW) {
    if (czW) {
        for (var czX = 0x0 == cR2['length'], czY = 0x0; czY < czW['length']; ++czY) '' == czW[czY] ? czY++ : cR2['push'](czW[czY]);
        czX && function czW(czX) {
            !cBN || 0x0 < cR2['length'] && cB6['animateText'](chalName, '<span class=\'cTxt\'>' + cR2[0x0] + '</span>' + (cR2[0x1] ? '<div id=\'chalScore\' style=\'color:' + cE2['scoreColor']['val'] + '\'>+' + cR2[0x1] + '</div>' : ''), 0x82, 0.4, cA0['medalAnim'], 0x64, czX, function() {
                cR2['splice'](0x0, 0x2), czW(0x0);
            });
        }(cA0['medalDelay']);
    }
}

function cRe(czW, czX) {
    (cBd = cB9['players']['findBySid'](czW)) && cB9['players']['updateProp'](cBd, czX, !0x0);
}
var cRh = 0x0;

function cRi(czW, czX, czY, czZ) {
    if ((cBb || spectating) && (cBd = null == czX || null == czX ? cBb : cB9['players']['findBySid'](czX))) {
        cBd['health'] = czW, cBd['health'] > cBd['maxHealth'] && (cBd['maxHealth'] = cBd['health']);
        var cA1 = czW / cBd['maxHealth'];
        if (cBd == cBb && cBb) {
            healthValue['innerHTML'] = czW + ' <span id=\'maxHP\'>| ' + cBd['maxHealth'] + '</span>';
            for (var cA2 = '', cA3 = cB9['classes'][cBb['classIndex']]['segs'], cA8 = cA3 * cA1, cA9 = cA8, cAd = 0x0; cAd < cA3; ++cAd) cA2 += '<div class=\'healthBarSeg\'><div class=\'hpBSeg\' style=\'width:' + 0x64 * Math['max'](0x0, Math['min'](0x1, cA9)) + '%;background-color:' + (0x3 >= cA8 ? cE2['hudHealthLow']['val'] : cE2['hudHealthHigh']['val']) + '\'></div></div>', cA9 -= 0x1;
            healthBar['innerHTML'] = cA2, cBV && (bloodDisplay['style']['display'] = 0.9 >= cA1 ? 'block' : 'none', bloodDisplay['style']['opacity'] = 0x1 - cA1 / 0.9), czW < cRh && (null != czY && null != czY && function(czW, czX) {
                if (cBU) {
                    for (var czY = null, czZ = 0x0; czZ < cRB['length']; ++czZ)
                        if (!cRB[czZ]['life']) {
                            czY = cRB[czZ];
                            break;
                        } czY || (czY = {}, cRB['push'](czY)), czY['life'] = cA0['hitLife'], czY['x'] = czW, czY['z'] = czX;
                }
            }(czY, czZ), cB3['play']('impact_0', 0.8)), cRh = czW;
        }
    }
}
var cRx, cRy, cRz, cRA, cRB = [];

function cRC(czW, czX, czY) {
    if (cB3['play']('hit_0', 3.1), cB6['animateDiv'](hitmarker, 0x15e, 0x64, 0x69), null != czW && czX) {
        var czZ = cB9['players']['findBySid'](czW);
        czZ && cB1['dmgVal'](czZ['x'], czZ['y'], czZ['z'], czX, czY);
    }
}

function cRH(czW, czX, czY) {
    if (czY || cBH)
        for (cRx = 0.2 == cBT ? '' : ' style=\'background-color: rgba(0, 0, 0, ' + cBT + ')\'', cCm && cBl && (czX = cBl['clean'](czX), !czY && (czW = cB0['scrambleS'](czW))), chatList['innerHTML'] += czY ? '<div class=\'chatItem\'' + cRx + '><span class=\'chatMsg\'>' + czX + '</span></div><br/>' : '<div class=\'chatItem\'' + cRx + '>' + (czW || 'unknown') + ': <span class=\'chatMsg\'>' + czX + '</span></div><br/>'; 0xfa <= chatList['scrollHeight'];) chatList['removeChild'](chatList['childNodes'][0x0]);
}

function cRL() {
    if (cBp = Date['now'](), cBq = cBp - cBr, cBz && Math['ceil'](0x3e8 / cBz) > cBq) setTimeout(cRL, 0x0);
    else {
        if (cBq = Math['min'](cBq, cA0['dltMx']), cBr = cBp, function() {
                if (cE2['showFPS']['val']) {
                    for (; 0x0 < cGe['length'] && cGe[0x0] <= cBp - 0x3e8;) cGe['shift']();
                    cGe['push'](cBp), cGf = cGe['length'], 0x64 <= cBp - cGg && (cGg = cBp, ingameFPS['textContent'] = cGf, menuFPS['textContent'] = cGf);
                }
            }(), TWEEN['update'](), 0x0 < cBs && (0x0 >= (cBs -= cBq) && (cBs = 0x0)), cB3['rate'] = cB9['config']['deltaMlt'], null != cBs && (cBq *= cBs / cA0['endAnim'], cB3['rate'] = cB9['config']['deltaMlt'] * (cBs / cA0['endAnim'])), cBb || window['spectating'] || (cBx += 0.0001 * cBq, cBx %= 0x2 * Math['PI'], cBa['rotateCam'](cBx, 0x0, 0x0)), cH9 && 0x0 < classPreviewCanvas['offsetWidth'] && 0x0 < classPreviewCanvas['offsetHeight'] && (cB9['players']['playerStep'](cHa, 0.015 * cBq, !0x0), cHa['idleAnim'] += cA0['idleAnimS'] * cBq, cB9['players']['updateMsh'](cHa, !0x0), cHd['aspect'] = cHb / cHc, cHd['updateProjectionMatrix'](), cHe['setSize'](cHb, cHc), cHe['setPixelRatio'](window['devicePixelRatio'] * cE2['resolution']['val']), cHe['render'](cH9, cHd)), function(czW) {
                if ('block' == spinUI['style']['display'] && (cLB['width'] = cLB['clientWidth'], cLB['height'] = cLB['clientHeight'], spinItemCanvas['style']['width'] = 2.1 * cLB['clientWidth'] + 'px', spinItemCanvas['style']['height'] = 2.1 * cLB['clientWidth'] + 'px', cLT['setSize'](2.1 * cLB['clientWidth'], 2.1 * cLB['clientWidth']), 0x0 < cLB['width'])) {
                    0x1 > cLH && 0x1 <= (cLH += 0.008 * czW) && (cLH = 0x1), cLK < cLL && ((cLK += 0.4 * czW) >= cLL && (cLK = cLL), cLP = !0x0, spinItem['style']['display'] = 'block', spinItemName['style']['display'] = 'inline-block', respinUI['style']['display'] = 'inline-block'), spinRotation != cLI && (spinRotation += 0.024 * (cLI - spinRotation), 0x0 >= (cLR -= 0.024 * (cLI - spinRotation)) && (cLR += Math['PI'] / 1.5, cB3['play']('tick_0', 0.2)), 0.002 >= cLI - spinRotation && (spinRotation = cLI, cLL = 0x64 - cLy['rarities'][cLF['rarity']], cB3['play']('reward', 0.3), cB8 && cB8['send']('unbx'), 0x1 <= cLF['rarity'] && cB3['play']('cheer_0', 0.1)));
                    var czX = 0x1 - (cLL ? cLK / cLL : 0x0);
                    cLC['translate'](0x2, 0x2);
                    var czY = cLB['width'] / 0x2 * cLD * cLH;
                    spinButton['style']['opacity'] = czX;
                    var czZ = 0.3 * czY * (0x1 - czX);
                    spinButton['style']['width'] = 0x2 * czY * cLE * 0.8 + czZ + 'px', spinButton['style']['height'] = 0x2 * czY * cLE * 0.8 + czZ + 'px', spinText['style']['fontSize'] = 0x2 * czY * cLE * 0.15 + czZ + 'px', spinCost['style']['fontSize'] = 0x2 * czY * cLE * 0.08 + czZ + 'px', cLC['fillStyle'] = '#fff', cLC['beginPath'](), cLC['arc'](cLB['width'] / 0x2, cLB['height'] / 0x2, czY, 0x0, 0x2 * Math['PI']), cLC['closePath'](), cLC['fill']();
                    var cA0 = 0x0;
                    if (cLC['save'](), cLC['translate'](cLB['width'] / 0x2, cLB['height'] / 0x2), cLL) {
                        for (var cA1 = 0x0, cA2 = 0x0; cA2 < cB9['store']['rarities']['length']; cA2++) {
                            if (cLF['rarity'] == cA2) {
                                cA1 += cLy['rarities'][cA2] / 0x2;
                                break;
                            }
                            cA1 += cLy['rarities'][cA2];
                        }
                        cA1 /= 0x64, cA1 = 0x2 * Math['PI'] * cA1 * (cLK / cLL) % (0x2 * Math['PI']), cLC['rotate'](cA1 - Math['PI'] * (cLK / cLL));
                    }
                    for (cA2 = 0x0; cA2 < cB9['store']['rarities']['length']; cA2++) {
                        cBd = cB9['store']['rarities'][cA2], cLC['fillStyle'] = cBd['color'], cLC['beginPath']();
                        var cA3 = cLy['rarities'][cA2];
                        cLL && (cLF['rarity'] == cA2 ? cA3 += cLK : cA3 -= cLK * (cLy['rarities'][cA2] / cLL)), 0x0 < cA3 && (cLC['moveTo'](0x0, 0x0), cLC['arc'](0x0, 0x0, 0.95 * czY, cA0, cA0 + 0x2 * Math['PI'] * (cA3 / 0x64), !0x1), cLC['lineTo'](0x0, 0x0), cLC['fill']()), cA0 += 0x2 * Math['PI'] * (cA3 / 0x64);
                    }
                    cLC['restore'](), cLC['fillStyle'] = '#F44336', cLC['save'](), cLC['translate'](cLB['width'] / 0x2, cLB['height'] / 0x2), cLC['rotate'](spinRotation), cLC['beginPath']();
                    var cA8 = (spinButton['getBoundingClientRect']()['width'] / spinButton['offsetWidth'] - 0x1) * (czY * cLE) * 0.3;
                    if (cLC['moveTo'](0x0, (czY * cLE * -1.2 - cA8) * czX), cLC['lineTo'](czY * cLE * czX, 0x0), cLC['lineTo'](-czY * cLE * czX, 0x0), cLC['closePath'](), cLC['fill'](), cLC['restore'](), cLC['fillStyle'] = '#fff', cLC['beginPath'](), cLC['arc'](cLB['width'] / 0x2, cLB['height'] / 0x2, czY * cLE, 0x0, 0x2 * Math['PI']), cLC['closePath'](), cLC['fill'](), 'block' == spinItem['style']['display'] && cLw) {
                        var cA9 = 0x1 - Math['abs'](cLS['position']['x'] - cLM) / (cLN - cLM);
                        spinItemName['style']['opacity'] = cA9, spinItemName['style']['marginTop'] = 0.6 * czY + 'px', spinItemName['style']['fontSize'] = czY / 6.5 * cA9 + 'px', spinItemName['children'][0x0]['style']['fontSize'] = czY / 0xc * cA9 + 'px', spinItemName['style']['padding'] = czY / 0x14 * cA9 + 'px', spinItemName['style']['paddingLeft'] = czY / 0x2 * cA9 + 'px', spinItemName['style']['paddingRight'] = czY / 0x2 * cA9 + 'px', cLS['position']['x'] != cLM && (cLS['position']['x'] -= 0.2 * (cLS['position']['x'] - cLM), 0.05 >= Math['abs'](cLM - cLS['position']['x']) && (cLS['position']['x'] = cLM), cLS['lookAt'](cLw['position'])), cLQ += 0.0018 * czW, cLx['position']['y'] = cLx['orgYP'] + 0.55 * Math['sin'](cLQ), cLx['rotation']['x'] = cLx['orgXR'] + -0.042 * Math['sin'](0.9 * cLQ), cLT['render'](cLw, cLS);
                    }
                }
            }(cBq), cGz(), cBa['update'](cBq * cB9['config']['deltaMlt']), cBb && cBb['active'] && !window['locked'] ? (cB9['config']['thirdPerson'] ? cB2['camera']['position']['set'](cA0['thrdPX'], 0x2, cA0['thirdPZ']) : 'prop' == cBb['team'] ? (cBA += 0x5 * cBa['scrollDelta'], cBA = Math['min'](Math['max'](0xa, cBA), 0x64), cB2['camera']['position']['set'](0x0, 0x0, cBA)) : cB2['camera']['position']['set'](0x0, 0x0, 0x0), cBa['skipScroll'] = !0x1, cBf = [cBa['getISN'](), Math['round'](cBq * cB9['config']['deltaMlt']), cBa['xDr']['round'](0x3), cBa['yDr']['round'](0x3), cA0['movDirs']['indexOf'](cBa['moveDir']), cBa['mouseDownL'] || cBa['keys'][cBa['shootKey']] ? 0x1 : 0x0, cBa['mouseDownR'] || cBa['keys'][cBa['aimKey']] ? 0x1 : 0x0, cBa['keys'][cBa['jumpKey']] ? 0x1 : 0x0, cBa['keys'][cBa['crouchKey']] ? 0x1 : 0x0, cBa['keys'][cBa['reloadKey']] ? 0x1 : 0x0, cBa['scrollToSwap'] ? cBa['scrollDelta'] * cBC : 0x0, cBa['wSwap']], cBa['scrollDelta'] && (cBa['skipScroll'] = cBa['scrollToSwap'], !cBa['scrollToSwap'] && cBa['fakeKey'](0x4e20, 0x1)), cBa['scrollDelta'] = 0x0, cBa['wSwap'] = 0x0, !cB9['moveLock'] && cBa['tmpInpts']['push'](cBf), cBb['procInputs'](cBf, cB9, !0x1, cB9['moveLock']), cBa['moveCam'](cBb['x'], cBb['y'] + cBb['height'] - cA0['cameraHeight'], cBb['z']), cBa['rotateCam'](cB2['shakeX'], cB2['shakeY'] + cBb['recoilAnimY'] * cA0['recoilMlt'] + 0.1 * cBb['landBobY'], 0x0), cB5['updateCrosshair'](Math['max'](0x3a, cBb['spread'] * cC0), cB9['config']['thirdPerson'] && !cBb['weapon']['scope'] ? 0x1 : cBb['aimVal'] * (cBb['inspecting'] ? 0x0 : 0x1) * ('prop' == cBb['team'] ? 0x0 : 0x1) * (0x0 < cBb['reloadTimer'] ? 0x0 : 0x1)), !cB9['singlePlayer'] && !cB9['moveLock'] && function(czW) {
                if (null === cBv && (cBv = czW[0x0]), cBu['push'](czW[0x1] - 0xa), cBg && cBg[0x2] == czW[0x2] && cBg[0x3] == czW[0x3] && cBg[0x4] == czW[0x4] && cBg[0x5] == czW[0x5] && cBg[0x6] == czW[0x6] && cBg[0x7] == czW[0x7] && cBg[0x8] == czW[0x8] && cBg[0x9] == czW[0x9] && cBg[0xa] == czW[0xa] && cBg[0xb] == czW[0xb])
                    if ('string' == typeof cBt[cBt['length'] - 0x1]) {
                        var czX = parseInt(cBt[cBt['length'] - 0x1]) || 0x0;
                        cBt[cBt['length'] - 0x1] = czX + 0x1 + '';
                    } else cBt['push']('1');
                else cBt['push'](czW[0x2], czW[0x3], czW[0x4], czW[0x5], czW[0x6], czW[0x7], czW[0x8], czW[0x9], czW[0xa], czW[0xb]);
                cBg = czW;
            }(cBf), Howler['pos'](cBb['x'], cBb['y'] + cBb['height'] - cA0['cameraHeight'], cBb['z']), Howler['orientation'](Math['sin'](cBa['xDr'] + Math['PI']), cBa['yDr'], Math['cos'](cBa['xDr'] + Math['PI'])), cB9['singlePlayer'] && cBb['y'] <= cB9['map']['deathY'] && cPJ(cBb['sid'], cBb['deaths'])) : window['spectating'] && (cCQ && (cCQ['active'] ? cCS && cCR ? (cBa['moveCam'](cCQ['x'], cCQ['y'] + cCQ['height'] - cA0['cameraHeight'], cCQ['z']), cBa['object']['rotation']['y'] = cCQ['xDire'], cBa['pchObjc']['rotation']['x'] = cCQ['yDire']) : cBa['followCam'](cCQ, cBq) : spectMode()), !cCQ && cBa['freeCam'](cBq), Howler['pos'](cBa['object']['position']['x'], cBa['object']['position']['y'], cBa['object']['position']['z']), Howler['orientation'](Math['sin'](cBa['xDr'] + Math['PI']), cBa['yDr'], Math['cos'](cBa['xDr'] + Math['PI']))), cB9['update'](cBq, cBp, cBb), cB9['updateFlags'](cBb, cBq), function(czW) {
                if (cBU) {
                    var czX = '';
                    if (cBb && cBb['active'])
                        for (var czY = 0x0; czY < cRB['length']; ++czY) cRB[czY]['life'] && (cRB[czY]['life'] -= czW, 0x0 >= cRB[czY]['life'] && (cRB[czY]['life'] = 0x0), czX += '<div class=\'hitInd\' style=\'transform: translate(0, -50%) rotate(' + (cB0['getDir'](cRB[czY]['x'], cRB[czY]['z'], cBb['x'], cBb['z']) + cBa['xDr']) + 'rad);opacity:' + cRB[czY]['life'] / cA0['hitLife'] + '\'></div>');
                    hitHolder['innerHTML'] = czX;
                }
            }(cBq), cB6['update'](cBq), cBF -= cBq, 'block' == speedDisplay['style']['display'] && 0x0 >= cBF) {
            var czW = '';
            cBF = 0x12c, cBb && cBb['active'] && (czW = cB0['getD3D'](cBb['oldX'], cBb['oldY'], cBb['oldZ'], cBb['x'], cBb['y'], cBb['z']));
            var czX = Math['round'](0x64 * czW);
            czX != speedDisplay['textContent'] && (speedDisplay['textContent'] = czX);
        }
        'block' == imgFlash['style']['display'] && (imgFlash['style']['opacity'] -= 0.002 * cBq, 0x0 >= imgFlash['style']['opacity'] && (imgFlash['style']['opacity'] = 0x0, imgFlash['style']['display'] = 'none')), cB1['render'](cC1, cB9, cB2, cBb, cBq), window['spectating'] || 'block' != menuHolder['style']['display'] || !cA0['isProd'] || cBn || cBc && cBc['developer'] || (cBa['idleTimer'] += cBq, cBa['idleTimer'] >= cA0['kickTimer'] && cSc(cA8['t']('player.inactive'))), requestAnimFrame(cRL);
    }
}

function cS3() {
    !cB9['singlePlayer'] && cBb && cBb['active'] && (cB8['send']('in', cBv, cBt, cBu), cBt['length'] = 0x0, cBu['length'] = 0x0, cBv = null);
}

function cS4(czW) {
    czW && (txtBubble['innerHTML'] = czW, bubbleContainer['style']['transform'] = 'scale(1.0)', cRz && clearTimeout(cRz), cRz = setTimeout(function() {
        bubbleContainer['style']['transform'] = 'scale(0.0)';
    }, 0x834));
}

function cS6(czW) {
    console['trace']('Error message', czW), instructionHolder['style']['display'] = 'block', instructions['innerHTML'] = '<span style=\'color: rgba(255, 255, 255, 0.6)\'>' + czW + '</span><br/><span style=\'color: rgba(255, 255, 255, 0.6)\'>' + cA8['t']('error.seek') + ' <a href=\'/\'>here</a>.</span><div style=\'margin-top:10px;font-size:20px;color:rgba(255,255,255,0.4)\'>' + cA8['t']('error.extentions') + ' (Error 0x' + window['krunkerErrorCode'] + ')</div>', instructionHolder['style']['pointerEvents'] = 'all';
}

function cS8() {
    var czW = cBa['gamepad']['_connected'] ? cA8['t']('app.play.controller') : cB5['isMobile'] ? 'TAP TO PLAY' : cA8['t']('app.play');
    cG9 && (czW += '<div id=\'instructionsSubtitle\'>' + cG9['toUpperCase']() + '</div>');
    instructions['innerHTML'] = czW;
}

function cSa(czW) {
    cRA = czW, cB8['connected'] = !0x1, showWindow(0x0), cBa['disable'](), cB5['hideUI'](), cB5['hideDiscon'](), cS6(czW), cB8['socket'] && (cB8['socket']['onclose'] = function() {}), cSc = function() {};
}

function cSc(czW, czX) {
    cRA || cB9['singlePlayer'] || (cB8['socket']['onclose'] = function() {}, cB8 && cB8['socket'] && cB8['socket']['close'](), !czX && (showWindow(0x0), cBa['disable'](), cB5['hideUI'](), cB5['hideDiscon'](), cS6(czW || cA8['t']('player.disconnect'))));
}

function cSf(czW) {
    var czX = '';
    if (czW) {
        0x3 < czW['length'] && (czW['length'] = 0x3);
        for (var czY = 0x0; czY < czW['length']; ++czY) czX += '<div class=\'streamItem\' onclick=\'openTab(&quot;https://twitch.tv/' + czW[czY]['name'] + '&quot;)\'><div class=\'streamName\'>' + (czW[czY]['partner'] ? '<div style=\'display:inline-block;\'><i class=\'material-icons streamPartner\'>check_circle</i></div>' : '') + '<div class=\'strmLink blackShad\'>' + czW[czY]['name'] + '</div><div class=\'strmViews\'>' + cA8['t']('streamers.views', czW[czY]['view']) + '</div></div><img class=\'strmIcn\' src=\'' + czW[czY]['logo'] + '\'/></div>';
    } else czX = '<span style=\'color:rgba(244,60,60,0.5)\'>' + cA8['t']('streamers.none') + '</span>';
    streamContainer['innerHTML'] = czX;
}

function cSj(czW) {
    cB9['singlePlayer'] = !0x0, cB8 && cB8['socket'] && cB8['socket']['close'](), cB8['send'] = function() {};
    try {
        cNu(0x0, null, null, null, null, {
            'maps': [0x0]
        }, 0x0, {
            'data': czW
        }, null, !0x0);
    } catch (cSl) {}
    cA3('custMap'), cDd(), window['history']['replaceState']({}, 'Krunker Offline', 'offline');
}

function cSm(chal) {
    var pvt = '###PVT###';
    var code = 'undefined' == typeof __LOADER__calcGameValidationCode ? null : __LOADER__calcGameValidationCode(cB8, chal, pvt);
    cB8.send('load', code);
    czZ.k && cB8.send('rt');
}

function cSo(czW) {
    cB8['send']('strm'),
        function() {
            loginToken = getSavedVal('krunker_token');
            var czW = getSavedVal('krunker_username');
            loginToken && czW && cGk(0x1, [czW, null, loginToken]);
            var czX = getSavedVal('krunker_last'),
                czY = Date['now']();
            saveVal('krunker_last', czY), (!czX || 0x927c0 <= czY - czX) && cB8['send']('sb', 'welc', czW);
        }(), czW && cB8['send']('van', getSavedVal('krunker_username'));
}
window['pressButton'] = function(czW) {
    if (cBW && cBb && cBb['active'] && -0x1 == cBR['indexOf'](cBW) && (0x31 == czW ? (cB8['send']('v2k', cBW), cBR['push'](cBW)) : 0x32 == czW && (voteToKick['style']['display'] = 'none', cBR['push'](cBW))), window['spectating'] && (0x46 == czW && spectMode(), 0x30 < czW && 0x3a > czW)) {
        var czX = cB9['players']['list'][czW - 0x31];
        czX && czX['active'] && (cCQ = czX, cB8['send']('fpSp', czX ? czX['sid'] : null));
    }
    if (czW == cBa['chatKey'] && (document['activeElement'] == chatInput ? ('' != chatInput['value'] && (!czZ['disC'] && cB8['send']('ct', chatInput['value']), chatInput['value'] = ''), chatInput['blur']()) : chatInput['focus']()), czW == cBa['listKey']) {
        if ('INPUT' == document['activeElement']['tagName']) return;
        if (null == endUI['style']['display']) return;
        cBa['keys'][czW] = 0x0, cBa['hasPointerlock'] && cBa['toggle'](!0x1), showWindow(0x17);
    }
    if (cBb && cBb['active']) {
        czW == cBa['sprayKey'] && cB8['send']('int', 0x0), czW == cBa['interactKey'] && cB8['send']('int', 0x1), czW == cBa['interactSecKey'] && cB8['send']('int', 0x1, !0x0), czW == cBa['dropKey'] && cB8['send']('int', 0x2), czW == cBa['inspKey'] && cB9['players']['wInspect'](cBb);
        var czY = cBa['streakKeys']['indexOf'](czW);
        0x0 <= czY && cB8['send']('k', czY), czW == cBa['wepVisKey'] && function(czW) {
            var czX = czW['loadout'][czW['weaponIndex']];
            cB9['weapons'][czX]['melee'] ? setSetting('showWeaponMel', !cE2['showWeaponMel']['val']) : cB9['weapons'][czX]['secondary'] ? setSetting('showWeaponSec', !cE2['showWeaponSec']['val']) : !cB9['weapons'][czX]['melee'] && !cB9['weapons'][czX]['secondary'] && setSetting('showWeapon', !cE2['showWeapon']['val']);
        }(cBb);
    }
}, cB5['updatePlayInstructions'] = cS8, window['openTab'] = function(czW) {
    window['open'](czW, '_blank');
}, getSavedVal('consent') || (consentBlock['style']['display'] = 'block');
var cSz = !0x1;
var cSA = cA0['isProd'] ? ['de-fra', 'us-ca-sv', 'au-syd', 'jb-hnd', 'us-fl', 'sgp', 'us-nj'] : ['local'];
var cSB, cSC, cSD = !0x1;

function cSE(czW) {
    return clearTimeout(cSB), clearTimeout(cSC), cSD ? (cSD = !0x1, document['getElementById']('pre-content-container')['style']['display'] = 'none', document['getElementById']('my-content')['style']['display'] = 'none', void(czW ? cB8['send']('fkr') : alert(cA8['t']('adblocker')))) : void console['warn']('Attempting to finish when pre ad not showing');
}
window['boltEventHandlers'] = function() {
        Bolt['on']('pre-content-player', 'showHiddenContainer', function() {
            console['log']('Ad finished successfully'), cSE(!0x0);
        });
    }, window['debugMatchmaker'] = function(czW, czX) {
        return czX || (czX = cAg), Promise['all']([cAf['fetchGameInfo'](czX), cAf['fetchGameDebugInfo'](czW, czX), cAf['fetchAllDebugInfo'](czW)])['then'](([czW, czX, czY]) => ({
            'gameInfo': czW,
            'gameDebugInfo': czX,
            'allDebugInfo': czY
        }));
    }, window['getGameActivity'] = function() {
        return {
            'id': cB9['mode']['isRanked'] ? null : cAg,
            'time': timerVal['innerHTML'] ? timerVal['innerHTML']['split'](':')['reverse']()['reduce']((czW, czX, czY) => czW + czX * Math['pow'](0x3c, czY), 0x0) : null,
            'user': cBc ? cBc['name'] : 'Guest' + (cBb ? '_' + cBb['sid'] : ''),
            'class': {
                'name': cB9['classes'][cBL]['name'] || null,
                'index': cBb ? cBb['classIndex'] : cBL
            },
            'mode': cB9['mode'] ? cB9['mode']['name'] : null,
            'map': cB9['map']['maps'][cB9['map']['lastGen']]['name'],
            'custom': cB9['isCustom']
        };
    },
    function() {
        if (!cA1 && (instructions['innerHTML'] = cA8['get']('generic.connecting'), !cSz)) {
            cSz = !0x0;
            var czW = getSavedVal('custMap');
            cA3('custMap');
            czW ? cSj(czW) : ('undefined' == typeof __LOADER__mmValidationTokenPromise ? Promise['resolve'](null) : __LOADER__mmValidationTokenPromise)['then'](czW => cAf['seek']({
                'autoChangeGame': !0x1,
                'dataQuery': {
                    'v': cA0['useLooseClient'] ? undefined : version
                },
                'skipReplaceState': cCm,
                'validationToken': czW
            }))['then'](czW => {
                cAg = czW['gameId'], czW['host'], cAh = czW['port'];
                var czX = '//' + czW['host'] + ':' + cAh + '/ws?gameId=' + czW['gameId'] + '&clientKey=' + czW['clientId'];
                cB8['connect'](czX, function(czW) {
                    if (czW) {
                        if (console['warn']('IO connect error', czW), null != cRA) return;
                        cSc();
                    } else {
                        cDd(), aHolder['style']['display'] = null;
                        var czX = getSavedVal('mapToLoad');
                        cA3('mapToLoad'), czX && selectHostMap(czX);
                        var czY = getSavedVal('custToLoad');
                        cA3('custToLoad'), czY && selectHostMap(!0x1, czY);
                    }
                }, {
                    'init': cNu,
                    'load': cSm,
                    'ready': cSo,
                    'start': cNp,
                    'cust': cAs,
                    'iq': cAP,
                    'qr': cMm,
                    'pur': cCA,
                    'uf': cCy,
                    'clm': cGD,
                    'gmsg': cPy,
                    'pc': cSj,
                    'cln': cMi,
                    'upMp': cMB,
                    'lock': cNK,
                    'spin': cLY,
                    'unb': cLU,
                    'end': cNM,
                    'pErr': purchaseError,
                    'error': cSa,
                    'strm': cSf,
                    'dc': cSc,
                    'ts': cQS,
                    't': cPb,
                    'n': cP9,
                    0: cPe,
                    1: cPE,
                    8: cPn,
                    2: cPH,
                    3: cPJ,
                    'kst': cQ8,
                    'am': cR9,
                    'ac': cQc,
                    4: cRC,
                    5: cQX,
                    6: cR3,
                    'lv': cR0,
                    'up': cRe,
                    7: cQj,
                    9: cQp,
                    10: cR8,
                    'h': cRi,
                    's': cOa,
                    'sp': cP1,
                    'ch': cRH,
                    'vc': voiceChat,
                    'a': cGn,
                    'ua': cFW,
                    'ex': cQM,
                    'st': cQ3,
                    'pr': cQB,
                    'tm': cPB,
                    'pre': cQK,
                    'obj': cB9['setObjective'],
                    'do': cB9['destroyObj'],
                    'ro': cB9['respawnObj'],
                    'ufl': cB9['updateFlag'],
                    'gte': cB9['updateGate'],
                    'bnk': cB9['updateBank'],
                    'lm': cB9['lockMove'],
                    'is': cB9['triggerImgSound'],
                    'pi': cPt,
                    'pir': cPu,
                    'chp': cQZ,
                    'mv': updMatchVote,
                    'nwT': newTok,
                    'inat': cOe,
                    'sb': cS4,
                    'zn': cB9['updateZone'],
                    'vr': cL9,
                    'ctrR': crtrCodRes,
                    'kml': cLc,
                    'rml': cLe,
                    'gmc': cLg,
                    'vk': cO5
                }), cAf['fetchGameInfo'](czW['gameId'])['then'](czW => {
                    var [czX, czY, czZ, cA1, cA2] = czW;
                    cAi = czY, menuRegionLabel['innerText'] = cA0['regionNames'][czY];
                })['catch'](czW => console['error']('Failed to fetch game info', czW));
            })['catch'](czW => {
                console['warn']('Matchmaker error:', czW, czW['message'], czW['response']);
                let czX = czW['message'];
                czW['response'] ? 'InvalidGameId' == (czX = czW['response']['data'] && czW['response']['data']['error'] ? czW['response']['data']['error'] : 'GameFull') ? czX = cA8['t']('matchmaker.invalid') : 'GameFull' == czX ? czX = cA8['t']('matchmaker.full2') : 'NoServersMatchQuery' == czX ? czX = cA8['t']('matchmaker.updating') : 'NoAvailableServers' == czX ? czX = cA8['t']('matchmaker.none') : console['warn']('Unhandled error message', czX) : console['warn']('No error response', czW['response']), cSa(czX);
            }), window['requestAnimFrame'] = window['requestAnimationFrame'] || window['webkitRequestAnimationFrame'] || window['mozRequestAnimationFrame'] || function(czW) {
                window['setTimeout'](czW, 0x3e8 / 0x3c);
            }, setInterval(cS3, cA0['clientSendRate']), setInterval(cPw, cA0['nameVisRate']), cBr = Date['now'](), cRL();
        }
    }();
