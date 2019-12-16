require("three");
var cWF = require("./gamepad.js");

module.exports = function(cWC, cWD, cWE, cWJ, cWK, cWL, cWM) {
    function cWN(cWC, cWD) {
        return {
            'identifier': cWC.identifier,
            'pageX': cWC.pageX,
            'pageY': cWC.pageY,
            'screenX': cWC.screenX,
            'screenY': cWC.screenY,
            'callback': cWD
        };
    }

    function cWQ(cWC) {
        for (var i = 0; i < cXv.length; i++)
            if (cXv[i].identifier == cWC) return i;
        return -1;
    }

    function cWT(cWC, cWD) {
        if (cX2['idleTimer'] = 0x0, cX2['keys'])
            if (cWD && cX2['keys'][cWC] !== cWD && null != cX2['inputChanger']) cX2['moveKeys'][cX2['inputChanger']] ? cX2['moveKeys'][cX2['inputChanger']] = cWC : cX2['streakKeys'][cX2['inputChanger'] - 0x12] ? cX2['streakKeys'][cX2['inputChanger'] - 0x12] = cWC : cX2[cX2['inputChanger']] = cWC, cX2['checkForScroll'](), saveVal('cont_' + cX2['inputChanger'], cWC), showWindow(0x7, !0x0), cX2['inputChanger'] = null;
            else {
                if (cX2['keys'][cWC] !== cWD && cWC == cX2['voiceKey'] && toggleRecord(cWD), !cX2['enabled']) return;
                cX2['keys'][cWC] !== cWD && (cX2['keys'][cWC] = cWD, 0x0 <= cX2['moveKeys']['indexOf'](cWC) && cX2['updateMoveDir'](), cWD && (cWC == cX2['swapKey'] ? cX2['wSwap'] = 0x1 : cWC == cX2['meleeKey'] ? cX2['wSwap'] = 0x2 : cWC == cX2['primKey'] ? cX2['wSwap'] = 0x3 : window['pressButton'](cWC)));
            }
    }

    function cWW(cWC, cWD) {
        (cXN = cWD || cWC['which'] || cWC['keyCode']) == cX2['chatKey'] ? window['pressButton'](cXN) : document['activeElement'] != chatInput && (cX2['enabled'] && cWC && cWC['preventDefault'] && cWC['preventDefault'](), cWT(cXN || 0x0, 0x1));
    }

    function cWZ(cWC, cWD) {
        cXN = cWD || cWC['which'] || cWC['keyCode'], cX2['enabled'] && cWC && cWC['preventDefault'] && cWC['preventDefault'](), cWT(cXN || 0x0, 0x0);
    }
    var cX2 = this;
    if (this['isMobile'] = function() {
            if (navigator['userAgent']['match'](/Android/i) || navigator['userAgent']['match'](/webOS/i) || navigator['userAgent']['match'](/iPhone/i) || navigator['userAgent']['match'](/iPad/i) || navigator['userAgent']['match'](/iPod/i) || navigator['userAgent']['match'](/BlackBerry/i) || navigator['userAgent']['match'](/Windows Phone/i)) return !0x0;
        }, this['isMobile']()) {
        cWE['isMobile'] = !0x0;
        var cX3 = nipplejs['create']({
            'zone': document['getElementById']('mobileJoystick'),
            'size': 0x64,
            'mode': 'static',
            'color': 'red'
        });
        cX3['on']('move', function(cWC, cWD) {
            var cWE = cWD['direction'];
            cWE && ('left' == cWE['x'] ? (cWW(null, cX2['moveKeys'][0x2]), cWZ(null, cX2['moveKeys'][0x3])) : 'right' == cWE['x'] && (cWW(null, cX2['moveKeys'][0x3]), cWZ(null, cX2['moveKeys'][0x2])), 'up' == cWE['y'] ? (cWW(null, cX2['moveKeys'][0x0]), cWZ(null, cX2['moveKeys'][0x1])) : 'down' == cWE['y'] && (cWW(null, cX2['moveKeys'][0x1]), cWZ(null, cX2['moveKeys'][0x0])));
        }), cX3['on']('end', function() {
            cWZ(null, cX2['moveKeys'][0x0]), cWZ(null, cX2['moveKeys'][0x1]), cWZ(null, cX2['moveKeys'][0x2]), cWZ(null, cX2['moveKeys'][0x3]);
        });
    }
    this['mobileChange'] = function(cWC) {
        cX2['enabled'] = cWC, (cWM['connected'] || cWK['singlePlayer']) && (cX2['enabled'] && enterGame(), cWE['toggleControlUI'](cX2['enabled']));
    }, this['gamepad'] = new cWF();
    var cX8 = cWC['renderer']['domElement'];
    if (this['hasPointerlock'] = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document, this['hasPointerlock']) {
        cX8['requestPointerLock'] = cX8['requestPointerLock'] || cX8['mozRequestPointerLock'] || cX8['webkitRequestPointerLock'];
        var cX9 = function() {
            cX2['enabled'] = document['pointerLockElement'] === cX8 || document['mozPointerLockElement'] === cX8 || document['webkitPointerLockElement'] === cX8, (cWM['connected'] || cWK['singlePlayer']) && (cX2['enabled'] && enterGame(), cWE['toggleControlUI'](cX2['enabled']), !cX2['enabled'] && cX2['resetKeys']());
        };
        document['addEventListener']('pointerlockchange', cX9, !0x1), document['addEventListener']('mozpointerlockchange', cX9, !0x1), document['addEventListener']('webkitpointerlockchange', cX9, !0x1);
    }
    this['isn'] = 0x0, this['tmpInpts'] = [], this['getISN'] = function() {
        return this['isn']++;
    }, this['sensMltXCntrl'] = 0x1, this['sensMltYCntrl'] = 0x1, this['sensAimMltXCntrl'] = 0x1, this['sensAimMltYCntrl'] = 0x1, this['invertYCntrl'] = !0x1, this['deadZoneR'] = 0.25, this['deadZoneL'] = 0.3, this['vibration'] = !0x0, this['triggerThres'] = 0.1, this['masterLock'] = !0x0, this['sensMltX'] = 0x1, this['sensMltY'] = 0x1, this['sensAimMltX'] = 0x1, this['sensAimMltY'] = 0x1, this['invertY'] = !0x1, this['locked'] = !0x1, this['enabled'] = !0x1, this['idleTimer'] = 0x0, cWC['camera']['rotation']['set'](0x0, 0x0, 0x0), this['pchObjc'] = new cWD['Object3D'](), this['pchObjc']['add'](cWC['camera']), this['object'] = new cWD['Object3D'](), this['object']['add'](this['pchObjc']);
    var cXa = Math['PI'] / 0x2,
        cXb = function(cWD, cWE) {
            if (cX2['enabled'] && !window['locked'] && !window['noMouseInp']) {
                cWD['preventDefault'] && cWD['preventDefault'](), cX2['idleTimer'] = 0x0;
                var cWF = cWD['movementX'] || cWD['mozMovementX'] || cWD['webkitMovementX'] || 0x0,
                    cWJ = cWD['movementY'] || cWD['mozMovementY'] || cWD['webkitMovementY'] || 0x0,
                    cWK = cX2['mouseDownR'] ? cWE ? cX2['sensAimMltXCntrl'] : cX2['sensAimMltX'] : cWE ? cX2['sensMltXCntrl'] : cX2['sensMltX'],
                    cWM = cWL['mouseSens'] * cWK * (cX2['target'] ? cWL['camChaseSen'] : 0x1) * (cWC['camera']['fov'] / cWC['fov']),
                    cWN = cX2['mouseDownR'] ? cWE ? cX2['sensAimMltYCntrl'] : cX2['sensAimMltY'] : cWE ? cX2['sensMltYCntrl'] : cX2['sensMltY'],
                    cWQ = cWL['mouseSens'] * cWN * (cX2['target'] ? cWL['camChaseSen'] : 0x1) * (cWC['camera']['fov'] / cWC['fov']);
                cX2['pchObjc']['rotation']['x'] -= cWJ * cWQ * ((cWE ? cX2['invertYCntrl'] : cX2['invertY']) ? -0x1 : 0x1), cX2['unlockView'] || (cX2['pchObjc']['rotation']['x'] = Math['max'](-cXa, Math['min'](cXa, cX2['pchObjc']['rotation']['x']))), cX2['object']['rotation']['y'] -= cWF * cWM, cX2['yDr'] = cX2['pchObjc']['rotation']['x'] % Math['PI2'], cX2['xDr'] = cX2['object']['rotation']['y'] % Math['PI2'];
            }
        };
    cX8['addEventListener']('mousemove', cXb, !0x1);
    var cXk = function(cWC) {
        if (!cX2['masterLock']) switch (cX2['enabled'] || cX2['toggle'](!0x0), document['activeElement'] == chatInput && chatInput['blur'](), cWC['which']) {
            case 0x3:
                cX2['mouseDownR'] = 0x1, window['spectating'] && window['spectMode'](0x1);
                break;
            default:
                0x3 < cWC['which'] || 0x2 == cWC['which'] ? (cWC['preventDefault'] && cWC['preventDefault'](), cWW(null, 0x2710 + cWC['which'])) : (cX2['mouseDownL'] = 0x1, window['spectating'] && window['spectMode'](-0x1));
        }
    };
    cX8['addEventListener']('mousedown', cXk, !0x1), window['addEventListener']('mousedown', function(cWC) {
        cX2['enabled'] || (0x3 < cWC['which'] || 0x2 == cWC['which']) && (cWC['preventDefault'] && cWC['preventDefault'](), cWW(null, 0x2710 + cWC['which']));
    }, !0x1);
    var cXn = function(cWC) {
        if (!cX2['locked']) switch (cWC['which']) {
            case 0x3:
                cX2['mouseDownR'] = 0x0;
                break;
            default:
                0x3 < cWC['which'] || 0x2 == cWC['which'] ? (cWC['preventDefault'] && cWC['preventDefault'](), cWZ(null, 0x2710 + cWC['which'])) : cX2['mouseDownL'] = 0x0;
        }
    };
    cX8['addEventListener']('mouseup', cXn, !0x1), window['addEventListener']('mouseup', function(cWC) {
        cX2['enabled'] || (0x3 < cWC['which'] || 0x2 == cWC['which']) && (cWC['preventDefault'] && cWC['preventDefault'](), cWZ(null, 0x2710 + cWC['which']));
    }, !0x1), this['specSpeed'] = 0x1;
    var cXq = function(cWC) {
            cWC = window['event'] || cWC;
            var cWD = -Math['max'](-0x1, Math['min'](0x1, cWC['wheelDelta'] || -cWC['detail'])),
                cWE = 0x0 < cWD ? -0x1 : 0x1;
            return window['spectating'] && (window['spectTarget'] ? (cX2['followCamD'] -= 0x3 * cWE, cX2['followCamD'] < cWL['specMinD'] && (cX2['followCamD'] = cWL['specMinD']), cX2['followCamD'] > cWL['specMaxD'] && (cX2['followCamD'] = cWL['specMaxD'])) : (cX2['specSpeed'] += cWE, 0x1 > cX2['specSpeed'] && (cX2['specSpeed'] = 0x1), 0xa < cX2['specSpeed'] && (cX2['specSpeed'] = 0xa))), cX2['skipScroll'] ? cX2['skipScroll'] = !0x1 : cX2['scrollDelta'] = cWD, cWW(null, 0x4e20), !0x1;
        },
        cXr = function() {
            return null != cX2['inputChanger'] && (cWW(null, 0x4e20), cWZ(null, 0x4e20)), !0x1;
        };
    cX8['addEventListener'] ? (cX8['addEventListener']('mousewheel', cXq, !0x1), cX8['addEventListener']('DOMMouseScroll', cXq, !0x1)) : myitem['attachEvent']('onmousewheel', cXq), window['addEventListener']('mousewheel', cXr, !0x1), window['addEventListener']('DOMMouseScroll', cXr, !0x1);
    var cXv = [];
    mobileUI['addEventListener']('touchstart', function(cWC) {
        if (!cX2['masterLock']) {
            cX2['enabled'] || cX2['toggle'](!0x0), document['activeElement'] == chatInput && chatInput['blur'](), cWC['preventDefault']();
            for (var cWD = null, cWE = null, cWF = cWC['changedTouches'], cWJ = 0x0; cWJ < cWF['length']; cWJ++) 'mobileJump' == (cWD = document['elementFromPoint'](cWF[cWJ]['pageX'], cWF[cWJ]['pageY']))['id'] ? (cWW(null, cX2['jumpKey']), cWE = function() {
                cWZ(null, cX2['jumpKey']);
            }) : 'mobileCrouch' == cWD['id'] ? (cWW(null, cX2['crouchKey']), cWE = function() {
                cWZ(null, cX2['crouchKey']);
            }) : 'mobileEsc' == cWD['id'] ? (cX2['toggle'](!0x1), cWE = function() {}) : 'mobileShoot' == cWD['id'] ? (cX2['mouseDownL'] = 0x1, window['spectating'] && window['spectMode'](-0x1), cWE = function() {
                cX2['mouseDownL'] = 0x0;
            }) : cWE = cWD['id'], cXv['push'](cWN(cWF[cWJ], cWE));
        }
    }, !0x1), mobileUI['addEventListener']('touchmove', function(cWC) {
        if (!cX2['masterLock']) {
            cX2['enabled'] || cX2['toggle'](!0x0), cWC['preventDefault']();
            for (var cWD, cWE = cWC['changedTouches'], cWF = 0x0; cWF < cWE['length']; cWF++) 0x0 <= (cWD = cWQ(cWE[cWF]['identifier'])) && !(cXv[cWD]['callback'] instanceof Function) && 'mobileUI' == cXv[cWD]['callback'] && cX2['fakeMouse'](0x2, 0.2 * (cWE[cWF]['screenX'] - cXv[cWD]['screenX']), 0.2 * (cWE[cWF]['screenY'] - cXv[cWD]['screenY']));
        }
    }, !0x1), mobileUI['addEventListener']('touchend', function(cWC) {
        if (!cX2['locked'])
            for (var cWD, cWE = cWC['changedTouches'], cWF = 0x0; cWF < cWE['length']; cWF++) 0x0 <= (cWD = cWQ(cWE[cWF]['identifier'])) && (cXv[cWD]['callback'] instanceof Function && cXv[cWD]['callback'](), cXv['splice'](cWD, 0x1));
    }, !0x1), mobileUI['addEventListener']('touchcancel', function(cWC) {
        cWC['preventDefault']();
        for (var cWD, cWE = cWC['changedTouches'], cWF = 0x0; cWF < cWE['length']; cWF++) cWD = cWQ(cWE[cWF]['identifier']), cXv[cWD]['callback'] instanceof Function && cXv[cWD]['callback'](), cXv['splice'](cWD, 0x1);
    }, !0x1), this['xVel'] = 0x0, this['yVel'] = 0x0, this['zVel'] = 0x0;
    var cXN, cXO = new cWD['Vector3'](0x0, 0x0, 0x0);
    this['freeCam'] = function(cWD) {
        cXO['set'](0x0, 0x0, 0x0), this['keys'][this['moveKeys'][0x0]] && (cXO['z'] -= 0x1), this['keys'][this['moveKeys'][0x1]] && (cXO['z'] += 0x1), this['keys'][this['moveKeys'][0x2]] && (cXO['x'] -= 0x1), this['keys'][this['moveKeys'][0x3]] && (cXO['x'] += 0x1), this['keys'][0x51] && (cXO['y'] -= 0x1), this['keys'][0x45] && (cXO['y'] += 0x1), cXO['applyQuaternion'](cWC['camera']['getWorldQuaternion']());
        var cWE = (this['keys'][this['crouchKey']] ? 0.08 : 0.04) * this['specSpeed'] * cWD;
        cX2['object']['position']['add'](cXO['multiplyScalar'](cWE)), cWC['camera']['position']['set'](0x0, 0x0, 0x0), cWC['updateFrustum']();
    }, this['followCamD'] = cWL['specMinD'], this['followCam'] = function(cWD) {
        cXO['set'](cWD['x'], cWD['y'] + cWD['height'], cWD['z']), cX2['object']['position']['lerp'](cXO, 0.9), cWC['camera']['position']['set'](0x0, 0x0, this['followCamD']), cWC['camera']['updateProjectionMatrix'](), cWC['updateFrustum']();
    }, this['setCamPosOff'] = function() {
        cWC['camera']['updateMatrixWorld'](), cX2['object']['position']['setFromMatrixPosition'](cWC['camera']['matrixWorld']), cWC['camera']['position']['set'](0x0, 0x0, 0x0), cWC['camera']['rotation']['set'](0x0, 0x0, 0x0);
    }, this['update'] = function(cWD) {
        if (this['target']) {
            var cWE = cWJ['getAngleDst'](this['object']['rotation']['y'], this['target']['yD']);
            this['object']['rotation']['y'] += cWE * cWD * cWL['camChaseTrn'], cWE = cWJ['getAngleDst'](cX2['pchObjc']['rotation']['x'], this['target']['xD']), this['pchObjc']['rotation']['x'] += cWE * cWD * cWL['camChaseTrn'], cWE = cWJ['getD3D'](this['object']['position']['x'], this['object']['position']['y'], this['object']['position']['z'], this['target']['x'], this['target']['y'], this['target']['z']) * cWD * cWL['camChaseSpd'];
            var cWF = cWJ['getDir'](this['object']['position']['z'], this['object']['position']['x'], this['target']['z'], this['target']['x']),
                cWK = cWJ['getXDire'](this['object']['position']['x'], this['object']['position']['y'], this['object']['position']['z'], this['target']['x'], this['target']['y'], this['target']['z']);
            this['object']['position']['x'] -= cWE * Math['sin'](cWF) * Math['cos'](cWK), this['object']['position']['y'] += cWE * Math['sin'](cWK), this['object']['position']['z'] -= cWE * Math['cos'](cWF) * Math['cos'](cWK), cWC['updateFrustum']();
        }
    }, this['camLookAt'] = function(cWC, cWD, cWE) {
        var cWF = cWJ['getXDire'](this['object']['position']['x'], this['object']['position']['y'], this['object']['position']['z'], cWC, cWD, cWE),
            cWK = cWJ['getDir'](this['object']['position']['z'], this['object']['position']['x'], cWE, cWC);
        this['target'] = {
            'xD': cWF,
            'yD': cWK,
            'x': cWC + cWL['camChaseDst'] * Math['sin'](cWK) * Math['cos'](cWF),
            'y': cWD - cWL['camChaseDst'] * Math['sin'](cWF),
            'z': cWE + cWL['camChaseDst'] * Math['cos'](cWK) * Math['cos'](cWF)
        };
    }, this['moveCam'] = function(cWD, cWE, cWF) {
        cX2['object']['position']['set'](cWD, cWE, cWF), cWC['camera']['updateProjectionMatrix'](), cWC['updateFrustum']();
    }, this['rotateCam'] = function(cWD, cWE, cWF) {
        cWC['camera']['rotation']['y'] = cWD, cWC['camera']['rotation']['x'] = cWE, cWC['camera']['rotation']['z'] = cWF;
    }, this['scrollToSwap'] = !0x0, this['jumpKey'] = parseInt(getSavedVal('cont_jumpKey') || 0x20), this['crouchKey'] = parseInt(getSavedVal('cont_crouchKey') || 0x10), this['meleeKey'] = parseInt(getSavedVal('cont_meleeKey') || 0x51), this['swapKey'] = parseInt(getSavedVal('cont_swapKey') || 0x45), this['primKey'] = parseInt(getSavedVal('cont_primKey') || 0x54), this['reloadKey'] = parseInt(getSavedVal('cont_reloadKey') || 0x52), this['sprayKey'] = parseInt(getSavedVal('cont_sprayKey') || 0x46), this['inspKey'] = parseInt(getSavedVal('cont_inspKey') || 0x58), this['aimKey'] = parseInt(getSavedVal('cont_aimKey') || 0x43), this['shootKey'] = parseInt(getSavedVal('cont_shootKey') || -0x1), this['chatKey'] = parseInt(getSavedVal('cont_chatKey') || 0xd), this['voiceKey'] = parseInt(getSavedVal('cont_voiceKey') || 0x56), this['listKey'] = parseInt(getSavedVal('cont_listKey') || 0x9), this['interactKey'] = parseInt(getSavedVal('cont_interactKey') || 0x47), this['interactSecKey'] = parseInt(getSavedVal('cont_interactSecKey') || 0x48), this['dropKey'] = parseInt(getSavedVal('cont_dropKey') || 0x5a), this['wepVisKey'] = parseInt(getSavedVal('cont_wepVisKey') || -0x1), this['streakKeys'] = [parseInt(getSavedVal('cont_18') || 0x31), parseInt(getSavedVal('cont_19') || 0x32), parseInt(getSavedVal('cont_20') || 0x33), parseInt(getSavedVal('cont_21') || 0x34)], this['moveKeys'] = [parseInt(getSavedVal('cont_0') || 0x57), parseInt(getSavedVal('cont_1') || 0x53), parseInt(getSavedVal('cont_2') || 0x41), parseInt(getSavedVal('cont_3') || 0x44)], this['moveDirs'] = [
        [0x0, -0x1],
        [0x0, 0x1],
        [-0x1, 0x0],
        [0x1, 0x0]
    ], this['checkForScroll'] = function() {
        for (var cWC = ['jumpKey', 'crouchKey', 'meleeKey', 'swapKey', 'primKey', 'reloadKey', 'sprayKey', 'inspKey', 'aimKey', 'shootKey', 'chatKey', 'voiceKey', 'listKey', 'interactKey', 'interactSecKey', 'dropKey', 'wepVisKey'], cWD = 0x0; cWD < cWC['length']; cWD++)
            if (0x4e20 == cX2[cWC[cWD]]) return void(cX2['scrollToSwap'] = !0x1);
        return 0x0 <= cX2['streakKeys']['indexOf'](0x4e20) || 0x0 <= cX2['moveKeys']['indexOf'](0x4e20) ? void(cX2['scrollToSwap'] = !0x1) : void(cX2['scrollToSwap'] = !0x0);
    }, this['checkForScroll'](), this['export'] = function() {
        for (var cWC = {}, cWD = ['jumpKey', 'crouchKey', 'meleeKey', 'swapKey', 'primKey', 'reloadKey', 'sprayKey', 'inspKey', 'aimKey', 'shootKey', 'chatKey', 'voiceKey', 'listKey', 'interactKey', 'interactSecKey', 'dropKey', 'wepVisKey', 'streakKeys', 'moveKeys'], cWE = 0x0; cWE < cWD['length']; cWE++) cWC[cWD[cWE]] = cX2[cWD[cWE]];
        return cWC;
    }, this['updateMoveDir'] = function() {
        for (var cWC = 0x0, cWD = 0x0, cWE = 0x0; cWE < cX2['moveKeys']['length']; ++cWE) cX2['keys'][cX2['moveKeys'][cWE]] && (cWC += cX2['moveDirs'][cWE][0x0], cWD += cX2['moveDirs'][cWE][0x1]);
        this['moveDir'] = 0x0 == cWC && 0x0 == cWD ? null : Math['atan2'](cWD, cWC);
    }, window['addEventListener']('keydown', cWW, !0x1), window['addEventListener']('keyup', cWZ, !0x1), this['mapping'] = {
        'button_1': {
            'KEY': 'jumpKey'
        },
        'button_2': {
            'KEY': 'crouchKey'
        },
        'button_3': {
            'KEY': 'reloadKey'
        },
        'shoulder_bottom_left': {
            'KEY': 'aimKey'
        },
        'button_4': {
            'KEY': 'swapKey'
        },
        'shoulder_top_left': {
            'KEY': 'swapKey'
        },
        'shoulder_top_right': {
            'KEY': 'meleeKey'
        },
        'shoulder_bottom_right': {
            'THRES': !0x0,
            'MOUSE': !0x0
        },
        'select': {
            'KEY': 'listKey'
        },
        'd_pad_up': {
            'KEY': 'voiceKey'
        },
        'd_pad_down': {
            'KEY': 'sprayKey'
        },
        'd_pad_left': {
            'KEY': 'interactKey'
        },
        'd_pad_right': {
            'KEY': 'dropKey'
        }
    }, this['gamepad']['on'](['press', 'hold', 'release'], Object['keys'](this['mapping']), function(cWC) {
        'press' == cWC['type'] ? cX2['mapping'][cWC['button']]['MOUSE'] && (cWC['value'] >= cX2['triggerThres'] || !cX2['mapping'][cWC['button']]['THRES']) ? cX2['fakeMouse'](0x0) : cX2['mapping'][cWC['button']]['KEY'] && cWW(null, cX2[cX2['mapping'][cWC['button']]['KEY']]) : 'release' == cWC['type'] ? cX2['mapping'][cWC['button']]['MOUSE'] ? cX2['fakeMouse'](0x1) : cWZ(null, cX2[cX2['mapping'][cWC['button']]['KEY']]) : 'hold' == cWC['type'] && cX2['mapping'][cWC['button']]['THRES'] && (cWC['value'] >= cX2['triggerThres'] ? cX2['fakeMouse'](0x0) : cX2['fakeMouse'](0x1));
    }), this['gamepad']['on']('hold', 'stick_axis_left', function(cWC) {
        cWC['value'][0x1] <= -cX2['deadZoneL'] ? (cWZ(null, cX2['moveKeys'][0x1]), cWW(null, cX2['moveKeys'][0x0])) : cWZ(null, cX2['moveKeys'][0x0]), cWC['value'][0x1] >= cX2['deadZoneL'] ? (cWZ(null, cX2['moveKeys'][0x0]), cWW(null, cX2['moveKeys'][0x1])) : cWZ(null, cX2['moveKeys'][0x1]), cWC['value'][0x0] <= -cX2['deadZoneL'] ? (cWZ(null, cX2['moveKeys'][0x3]), cWW(null, cX2['moveKeys'][0x2])) : cWZ(null, cX2['moveKeys'][0x2]), cWC['value'][0x0] >= cX2['deadZoneL'] ? (cWZ(null, cX2['moveKeys'][0x2]), cWW(null, cX2['moveKeys'][0x3])) : cWZ(null, cX2['moveKeys'][0x3]);
    }), this['gamepad']['on']('release', 'stick_axis_left', function() {
        cWZ(null, cX2['moveKeys'][0x0]), cWZ(null, cX2['moveKeys'][0x1]), cWZ(null, cX2['moveKeys'][0x2]), cWZ(null, cX2['moveKeys'][0x3]);
    }), this['gamepad']['on']('hold', 'stick_axis_right', function(cWC) {
        cX2['fakeMouse'](0x2, cX2['applyDeadzone'](cWC['value'][0x0], cX2['deadZoneR']), cX2['applyDeadzone'](cWC['value'][0x1], cX2['deadZoneR']), 0x0, !0x0);
    }), this['gamepad']['on']('press', 'start', function() {
        cX2['toggle'](!cX2['enabled']);
    }), this['applyDeadzone'] = function(cWC, cWD) {
        let cWE = (Math['abs'](cWC) - cWD) / (0x1 - cWD);
        return 0x0 > cWE && (cWE = 0x0), cWE * (0x0 < cWC ? 0x1 : -0x1);
    }, this['fakeKey'] = function(cWC, cWD = 0x0) {
        0x0 == cWD && cWW(null, cWC), 0x1 == cWD && cWZ(null, cWC);
    };
    var cYn = {
        'movementX': 0x0,
        'movementY': 0x0,
        'which': 0x0
    };
    this['fakeMouse'] = function(cWC = 0x0, cWD = 0x0, cWE = 0x0, cWF = 0x0, cWJ) {
        cYn['movementX'] = cWD, cYn['movementY'] = cWE, cYn['which'] = cWF, 0x0 == cWC && cXk(cYn), 0x1 == cWC && cXn(cYn), 0x2 == cWC && cXb(cYn, cWJ);
    }, this['toggle'] = function(cWC) {
        this['locked'] || this['masterLock'] || ('block' == windowHolder['style']['display'] ? cWC && cWE['toggleWindow'](!0x1, this['gamepad']['_connected']) : cWE['isMobile'] ? this['mobileChange'](cWC) : cWC ? cX8['requestPointerLock']() : document['exitPointerLock']());
    }, this['disable'] = function() {
        cX2['toggle'](!0x1), cX2['locked'] = !0x0;
    }, this['reset'] = function() {
        this['mouseDownL'] = 0x0, this['mouseDownR'] = 0x0, this['keys'] = {}, this['tmpInpts']['length'] = 0x0, this['wSwap'] = 0x0, this['scrollDelta'] = 0x0, this['xDr'] = 0x0, this['yDr'] = 0x0, this['isn'] = 0x0, this['moveDir'] = null, this['skipScroll'] = !0x1, this['inputChanger'] = null, this['target'] = null, this['locked'] = !0x1, cX2['pchObjc']['rotation']['x'] = 0x0, cX2['object']['rotation']['y'] = 0x0, cWC['camera']['rotation']['set'](0x0, 0x0, 0x0);
    }, this['resetKeys'] = function() {
        cX2['mouseDownL'] = 0x0, cX2['mouseDownR'] = 0x0, cX2['keys'] = {}, cX2['updateMoveDir']();
    };
};
