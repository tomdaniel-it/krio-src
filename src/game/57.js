var bOQ, bOR, bOS = require("./config.js"),
    bOT = require("three"),
    bOU = require("./58.js");
module['exports'] = function(bOO, bOS, bOT, bOY, bOZ) {
    bOO.ImageUtils.crossOrigin = '';
    var bP0 = require("./24.js"),
        bP1 = new bOO['LoadingManager'](),
        bP2 = new bOO['OBJLoader'](bP1);
    this['cubeGeo'] = new bOO['BoxGeometry'](0x1, 0x1, 0x1), this['getCubeMesh'] = function() {
        return new bOO['Mesh'](this['cubeGeo']);
    };
    var bP3 = new bOO['PlaneGeometry'](0x1, 0x1);
    new bOO['CylinderGeometry'](0.1, 0x1, 0x1, 0x4, 0x1, !0x1, Math['PI'] / 0x4)['computeFlatVertexNormals']();
    var bP4 = new bOO['TextureLoader'](),
        bP5 = new bOO['MeshBasicMaterial']({
            'color': 0xffffff
        }),
        bP6 = new bOO['MeshBasicMaterial']({
            'color': 0xff00
        }),
        bP7 = {},
        bP8 = {},
        bP9 = {};
    this['movTextures'] = [], this['pulsMats'] = [], this['frameMats'] = [], this['pulsVal'] = 0x0;
    var bPa, bPb = this,
        bPc = {};
    this['frustum'] = new bOO['Frustum']();
    var bPd = new bOO['Matrix4']();
    this['camera'] = new bOO['PerspectiveCamera'](0x0, window['innerWidth'] / window['innerHeight'], 0.1, 0x1770), this['fpsCamera'] = new bOO['PerspectiveCamera'](bOY['fov'], window['innerWidth'] / window['innerHeight'], 0.1, 0x12c), this['fpsCamera']['layers']['set'](0x1), this['camera']['add'](this['fpsCamera']), this['weaponLean'] = 0x1, this['weaponOffX'] = 0x1, this['weaponOffY'] = 0x1, this['weaponOffZ'] = 0x1, this['weaponBob'] = 0x1, this['hideADS'] = 0x0, this['renderDst'] = 0x0, this['customADS'] = '', this['lowSpec'] = !0x1, this['customRatio'] = null, this['aspectRatio'] = '', this['init'] = function(bOP, bOQ) {
        this['clearPendingMeshes'](), this['scene'] = new bOO['Scene'](), this['backgroundScene'] = new bOO['Scene'](), bOP['skyDome'] && bOQ && null == bOQ['skyCol'] && (this['skyDome'] = bOU['fromConfig'](bOP), this['backgroundScene']['add'](this['skyDome'])), module['exports']['initScene']['call'](this, bOP, bOQ);
    }, this['getRes'] = function() {
        var bON = this['aspectRatio']['split']('x');
        return (parseInt(bON[0x0]) || window['innerWidth']) / (parseInt(bON[0x1]) || window['innerHeight']);
    };
    var bPh = 0x0;
    this['flash'] = function(bON, bOO) {
        bOZ['showFlash'] = !0x0, bOZ['flashX'] = bON, bOZ['flashY'] = 0x1 - bOO, bPh = 0x1;
    }, this['updateLightMap'] = function(bON) {
        this['skyLight'] && (this['skyLight']['shadow']['camera']['right'] = bON['shadWidth'], this['skyLight']['shadow']['camera']['left'] = -bON['shadWidth'], this['skyLight']['shadow']['camera']['top'] = bON['shadLength'], this['skyLight']['shadow']['camera']['bottom'] = -bON['shadLength']);
    }, this['useDepthMap'] = 0x0, this['toggleDepthMap'] = function(bOP) {
        if (this['useDepthMap'] = bOP, this['scene']) {
            var bOS = bOP && '0' != bOP;
            this['scene']['overrideMaterial'] = bOS ? bP5 : null, bOS ? (this['scene']['fog'] = new bOO['Fog'](0x0, 0x0, bOP), this['renderer']['setClearColor'](0x0)) : module['exports']['initScene']['call'](this, bOQ, bOR);
        }
    }, this['greenScreen'] = !0x1, this['updateGreenScreen'] = function(bON) {
        bPb['greenScreen'] && !bON['noGreen'] ? (bON['realMat'] = bON['material'], bON['material'] = bP6) : bON['material'] = bON['realMat'] || bON['material'];
    }, this.toggleGreenscreen = function(bON) {
        this['greenScreen'] = bON, this['scene'] && (bON ? (this['renderer']['setClearColor'](0xff00), this['scene']['fog']['near'] = 0.1, this['scene']['fog']['far'] = 0x0) : (this['scene']['fog']['near'] = 0x1, this['scene']['fog']['far'] = bOR && null != bOR['fogD'] ? bOR['fogD'] : bOQ['fogD'], this['renderer']['setClearColor'](bOR && null != bOR['skyCol'] ? bOR['skyCol'] : bOQ['sky'])), this['scene']['traverse'](function(bON) {
            bPb['updateGreenScreen'](bON);
        }));
    }, this['renderer'] = new bOO['WebGLRenderer']({
        'precision': 'mediump',
        'powerPreference': 'high-performance',
        'antialias': false
    }), this['renderer']['shadowMap']['enabled'] = !0x0, this['renderer']['shadowMap']['autoUpdate'] = !0x1, this['renderer']['shadowMap']['type'] = bOO['BasicShadowMap'], this['renderer']['setPixelRatio'](window['devicePixelRatio']), this['renderer']['setSize'](window['innerWidth'], window['innerHeight']), this['renderer']['autoClear'] = !0x1, document['body']['appendChild'](this['renderer']['domElement']), this['shadows'] = !0x0, this['updateShadowMap'] = function() {
        this['shadows'] && (this['renderer']['shadowMap']['needsUpdate'] = !0x0);
    }, this['toggleShadowMap'] = function(bON) {
        bON ? (this['shadows'] = !0x0, this['updateShadowMap']()) : (this['shadows'] = !0x1, this['skyLight'] && (this['renderer']['setRenderTarget'](this['skyLight']['shadow']['map']), this['renderer']['clear'](), this['renderer']['setRenderTarget'](null)));
    }, this['zoomVal'] = 0x1, this['zoom'] = function(bON) {
        this['zoomVal'] = bON, this['updateCamFOV'](), this['fpsCamera']['fov'] = this['fpsFov'] / bON, this['fpsCamera']['updateProjectionMatrix']();
    }, this['setFPSFov'] = function(bON) {
        this['fpsFov'] = bON, this['fpsCamera']['fov'] = bON, this['fpsCamera']['updateProjectionMatrix']();
    }, this['setFPSFov'](bOY['fov']), this['fovMult'] = function(bON) {
        this['fovMlt'] != bON && (this['fovMlt'] = bON, this['updateCamFOV']());
    }, this['fovMlt'] = 0x1, this['updateCamFOV'] = function() {
        this['camera']['fov'] = this['fov'] / this['zoomVal'] * this['fovMlt'], this['camera']['updateProjectionMatrix']();
    }, this['setFov'] = function(bON) {
        this['fov'] = bON, this['updateCamFOV']();
    }, this['setFov'](bOY['fov']), this['resize'] = function() {
        this['camera']['aspect'] = this['getRes'](), this['camera']['updateProjectionMatrix'](), this['fpsCamera']['aspect'] = this['getRes'](), this['fpsCamera']['updateProjectionMatrix'](), this['renderer']['setSize'](window['innerWidth'], window['innerHeight']);
    }, this['resMltV'] = 0x1, this['setResMlt'] = function(bON) {
        this['resMltV'] = bON, this['renderer']['setPixelRatio'](window['devicePixelRatio'] * this['resMltV']), this['renderer']['setSize'](window['innerWidth'], window['innerHeight']);
    }, this['updateFrustum'] = function() {
        this['frustum']['setFromMatrix'](bPd['multiplyMatrices'](this['camera']['projectionMatrix'], this['camera']['matrixWorldInverse']));
    };
    var bPw = 0x0,
        bPx = 0x0;
    this['shakeX'] = 0x0, this['shakeY'] = 0x0, this['updateShake'] = function(bON) {
        bPw && (bPw *= Math['pow'](0.99, bON), bPx += bOS['randFloat'](-Math['PI'], Math['PI']), this['shakeX'] = Math['cos'](bPx) * bPw, this['shakeY'] = Math['sin'](bPx) * bPw, 0.01 >= bPw && (bPw = 0x0, this['shakeX'] = this['shakeY'] = 0x0));
    }, this['shake'] = function(bON) {
        bPw = bON;
    }, this['render'] = function(bON, bOO) {
        if (this['scene'] || bOO) {
            for (var bOP = 0x0; bOP < this['movTextures']['length']; ++bOP)(bPa = this['movTextures'][bOP])['tex']['offset'] && (bPa['tex']['offset'][0x0 == bPa['movD'] ? 'x' : 'y'] += bPa['mov'] * bON);
            this['pulsVal'] += 0.003 * bON;
            var bOQ;
            for (bOP = 0x0; bOP < this['pulsMats']['length']; ++bOP) bOQ = 1.2 * (Math['sin'](this['pulsVal']) / 0x2 + 0.5), this['pulsMats'][bOP]['mat']['emissiveIntensity'] = bOQ;
            for (bOP = 0x0; bOP < this['frameMats']['length']; ++bOP)(bPa = this['frameMats'][bOP])['dur'] -= bON, 0x0 >= bPa['dur'] && (bPa['dur'] = bPa['orgDur'], bPa['cur']++, bPa['cur'] > bPa['num'] && (bPa['cur'] = 0x0), bPa['mat']['map'] && (bPa['mat']['map']['offset']['x'] = bPa['cur'] % bPa['num'] / bPa['num']));
            bOO || (this['renderer']['clear'](), this['camera']['layers']['set'](0x0), this['skyDome'] && (this['camera']['getWorldPosition'](this['skyDome']['position']), this['renderer']['render'](this['backgroundScene'], this['camera']), this['renderer']['clearDepth']()), this['renderer']['render'](this['scene'], this['camera']), this['camera']['layers']['set'](0x2), this['renderer']['clearDepth'](), this['renderer']['render'](this['scene'], this['camera']), this['renderer']['clearDepth'](), this['renderer']['render'](this['scene'], this['fpsCamera']), bOZ['showFlash'] && (0x0 >= bPh && (bPh = 0x0, bOZ['showFlash'] = !0x1), bPh -= bON), this['updateShake'](bON));
        }
    }, this['updateTexture'] = function(bON, bOP, bOQ) {
        bOQ = bOQ || {};
        var bOR = 0x0;
        for (var bOS in bP9) bOS['substring'](0x0, bON['length'] + 0x2) == bON + 'mt' && (bOR++, bP9[bOS]['image'] = bOP, bP9[bOS]['needsUpdate'] = !0x0);
        if (!bOR) {
            var bOT = bON + (null == bOQ['movT'] ? 'mt' : 'mt' + bOQ['movT']) + (null == bOQ['movD'] ? 'md' : bOQ['movD']) + (bOQ['fontSize'] || 'fs') + (bOQ['fcolr'] || 'fc') + (bOQ['bcolr'] || 'bc') + (bOQ['noBVis'] || 'bv') + (bOQ['text'] || 'txt') + (bOQ['tAlign'] || 'ta'),
                bOU = bP9[bOT];
            bOU = new bOO['Texture'](bOP), bP9[bOT] = bOU, bP9[bOT]['needsUpdate'] = !0x0;
        }
    }, this['loadTexture'] = function(bON, bOP, bOQ, bOR) {
        var bOT = bOP + (null == (bOQ = bOQ || {})['movT'] ? 'mt' : 'mt' + bOQ['movT']) + (null == bOQ['movD'] ? 'md' : bOQ['movD']) + (bOQ['fontSize'] || 'fs') + (bOQ['fcolr'] || 'fc') + (bOQ['bcolr'] || 'bc') + (bOQ['noBVis'] || 'bv') + (bOQ['text'] || 'txt') + (bOQ['tAlign'] || 'ta');
        if (bP9[bOT]) bP9[bOT]['mats'] ? bP9[bOT]['mats']['push']({
            't': bOR,
            'm': bON
        }) : (bON[bOR || 'map'] = bP9[bOT], bON['needsUpdate'] = !0x0);
        else if (bP9[bOT] = {
                'mats': [{
                    't': bOR,
                    'm': bON
                }]
            }, bOQ['canvas']) {
            var bOU = new bOO['Texture'](bOQ['canvas']);
            bOU['wrapS'] = bOO['RepeatWrapping'], bOU['wrapT'] = bOO['RepeatWrapping'], bOU['repeat']['set'](bOQ['repeatX'] || 0x1, bOQ['repeatY'] || 0x1), bOU['minFilter'] = bOQ['tFilter'] || bOO['NearestFilter'], bOU['magFilter'] = bOQ['tFilter'] || bOO['NearestFilter'], bOU['needsUpdate'] = !0x0;
            for (var bOY = 0x0; bOY < bP9[bOT]['mats']['length']; ++bOY) bP9[bOT]['mats'][bOY]['m'][bP9[bOT]['mats'][bOY]['t'] || 'map'] = bOU, bP9[bOT]['mats'][bOY]['m']['needsUpdate'] = !0x0;
            bP9[bOT] = bOU, bOQ['movT'] && this['movTextures']['push']({
                'tex': bOU,
                'mov': bOQ['movT'],
                'movD': bOQ['movD'] || 0x0
            });
        } else 'string' != typeof bOP || bOP['includes']('default') || bP4['load'](bOS['assetsUrl']('/textures/' + bOP + '.png'), bON => {
            bON['wrapS'] = bOO['RepeatWrapping'], bON['wrapT'] = bOO['RepeatWrapping'], bON['repeat']['set'](bOQ['frames'] ? 0x1 / bOQ['frames'] : bOQ['repeatX'] || 0x1, bOQ['repeatY'] || 0x1), bON['minFilter'] = bOQ['tFilter'] || bOO['NearestFilter'], bON['magFilter'] = bOQ['tFilter'] || bOO['NearestFilter'], bON['needsUpdate'] = !0x0;
            for (var bOP = 0x0; bOP < bP9[bOT]['mats']['length']; ++bOP) bP9[bOT]['mats'][bOP]['m'][bP9[bOT]['mats'][bOP]['t'] || 'map'] = bON, bP9[bOT]['mats'][bOP]['m']['needsUpdate'] = !0x0;
            bP9[bOT] = bON, bOQ['movT'] && this['movTextures']['push']({
                'tex': bON,
                'mov': bOQ['movT'],
                'movD': bOQ['movD'] || 0x0
            });
        });
        return bON;
    }, this['getMat'] = function(bON, bOP) {
        var bOQ = (bOP && bOP['texSrc'] || bON) + (bOP ? (bOP['rotation'] || 'x') + (bOP['noFog'] || 'y') + (bOP['opacity'] || 'z') + (bOP['color'] || 'b') + (bOP['mat'] ? 'ma' : 'nm') + (bOP['ao'] || 'a') + (bOP['emissive'] || 'e') + (bOP['glowText'] || 'g') + (null == bOP['movT'] ? 'mt' : bOP['movT']) + (null == bOP['movD'] ? 'md' : bOP['movD']) + (null == bOP['canvas'] ? '' : 'canvas') + (null == bOP['pulsT'] ? 'npt' : 'pt' + bOP['pulsT']) + (null == bOP['frames'] ? 'nfr' : 'fr' + bOP['frames']) + (null == bOP['frameT'] ? 'nfrt' : 'frt' + bOP['frameT']) + (null == bOP['depthWrite'] ? 'd' : bOP['depthWrite']) + (bOP['fontSize'] || 'fs') + (bOP['fcolr'] || 'fc') + (bOP['bcolr'] || 'bc') + (bOP['noBVis'] || 'bv') + (bOP['text'] || 'txt') + (bOP['tAlign'] || 'ta') : ''),
            bOR = bP8[bOQ];
        return bOR || (bOR = new((bOP = bOP || {})['mat'] ? bOP['mat'] : bOO['StrippedLambertMaterial'])(bOP), bOP['canvas'] && this['loadTexture'](bOR, bOQ, bOP), bON && 'default' != bON && this['loadTexture'](bOR, bOP['texSrc'] || bON, bOP), bOP && bOP['emissive'] && this['loadTexture'](bOR, (bOP['glowText'] && bOP['texSrc'] || bON) + (bOP['sameGlow'] ? '' : '_e'), bOP, 'emissiveMap'), bOP && bOP['ao'] && (this['loadTexture'](bOR, bON + '_ao', bOP, 'aoMap'), bOR['aoMapIntensity'] = 1.3), bOP && bOP['normal'] && this['loadTexture'](bOR, bON + '_n', bOP, 'normalMap'), 'default' == bON && (bOR['vertexColors'] = bOO['VertexColors']), bOP && bOP['noFog'] && (bOR['fog'] = !0x1), bOR['shading'] = bOO['SmoothShading'], bP8[bOQ] = bOR, bOP['pulsT'] && this['pulsMats']['push']({
            'mat': bOR,
            'pul': bOP['pulsT']
        }), bOP['frames'] && this['frameMats']['push']({
            'mat': bOR,
            'num': bOP['frames'],
            'cur': 0x0,
            'dur': bOP['frameT'],
            'orgDur': bOP['frameT']
        })), bOR;
    }, this['genColorCube'] = function(bON, bOP, bOQ, bOR, bOS, bOT) {
        for (var bOU = (bOT = bOT || {})['us'] ? 'us' : 'ns', bOY = 0x0; bOY < bOR['length']; ++bOY) {
            for (var bOZ = 0x0; bOZ < bOR[bOY]['length']; ++bOZ) bOU += bOR[bOY][bOZ] + '_';
            bOU += '|';
        }
        var bP1 = bP7[bOU];
        if (!bP1) {
            bP1 = new bOO['Geometry']();
            var bP2 = 0.5 + (bOS || 0x0);
            for (bOY = 0x0; bOY < bOR['length']; ++bOY) {
                var bP3 = bOR[bOY][0x1],
                    bP4 = bOR[bOY][0x2] || 0x1;
                if (bOT['us']) {
                    bP5 = bP0['generateCube']([0x1, 0x1, 0x1, 0x1, 0x1, 0x1], 0x1, 0x1, 0x1, {
                        'colr': bOR[bOY][0x0],
                        'fAmb': bOR[bOY][0x4],
                        'amb': bOR[bOY][0x3]
                    });
                    (bP6 = new bOO['Mesh'](bP5))['scale']['set'](bP4, bP3, bP4), this['moveMesh'](bP6, 0x0, bP2 - bP3, 0x0);
                } else {
                    var bP5 = new bOO['BoxGeometry'](bP4, bP3, bP4);
                    bP0['colorize'](bP5, bOR[bOY][0x0]), bP6 = new bOO['Mesh'](bP5), this['moveMesh'](bP6, 0x0, bP2 - bP3 / 0x2, 0x0);
                }
                this['merge'](bP1, bP6), bP2 -= bP3;
            }
            bP7[bOU] = bP1;
        }
        var bP6 = new bOO['Mesh'](bP1, this['getMat']('default'));
        return this['scaleMesh'](bP6, bON, bOP, bOQ), bP6;
    };
    var bQd = {};
    this['genBody'] = function(bON, bOP, bOQ, bOR, bOS) {
        var bOT = bON + '-' + bOP + '-' + bOQ + '-' + bOR,
            bOU = bQd[bOT];
        if (!bOU) {
            bOU = new bOO['Geometry']();
            var bOZ = bOY['ahnMyEEY'] - bOY['headScale'] - bOY['legHeight'],
                bP0 = this['genColorCube'](bOY['chestWidth'], bOZ, bOY['chestScale'], [
                    [bON, 0.8, 0x1, 0.8],
                    [bOP, 0.2, 1.05]
                ], 0x0, {
                    'us': bOS
                });
            this['moveMesh'](bP0, 0x0, bOZ / 0x2, 0x0), this['merge'](bOU, bP0);
            var bP1 = this['genColorCube'](bOY['headScale'], bOY['headScale'], bOY['headScale'], [
                [bOQ, 0.2, 0x1, 0.6],
                [bOR, 0.8]
            ], 0x0, {
                'us': bOS
            });
            this['moveMesh'](bP1, 0x0, bOY['ahnMyEEY'] - bOY['headScale'] / 0x2 - bOY['legHeight'], 0x0), this['merge'](bOU, bP1), bOU = new bOO['BufferGeometry']()['fromGeometry'](bOU), bQd[bOT] = bOU;
        }
        var bP2 = new bOO['Mesh'](bOU, this['getMat']('default'));
        return bP2['receiveShadow'] = !0x0, bP2['noGreen'] = !0x0, bP2;
    };
    var bQp = {};
    this['genLeg'] = function(bON, bOP, bOQ, bOR, bOS) {
        var bOT = bOY['legScale'],
            bOU = null;
        if (bOR) {
            var bOZ = bOP + '-' + (bOR || '');
            if (!(bOU = bQp[bOZ])) {
                var bP0 = bOY['legHeight'] / 0x2,
                    bP1 = bOT / 0x2,
                    bP2 = [0.5, 0x2],
                    bP3 = this['genColorCube'](bOT, bP0, bOT, [
                        [bOP, 0x1]
                    ], 0x0, {
                        'us': bOS
                    });
                this['moveMesh'](bP3, 0x0, -bP0 / 0x2 * Math['cos'](bP2[0x1]), -bP0 / 0x2 * Math['sin'](bP2[0x1])), this['rotateMesh'](bP3, 0x0, bP2[0x1], 0x0);
                var bP4 = Math['sqrt'](bP1 * bP1 + bP1 * bP1 - 0x2 * bP1 * bP1 * Math['cos'](bP2[0x0] - bP2[0x1])),
                    bP5 = 0x2 * Math['sqrt'](bP1 * bP1 - bP4 / 0x2 * (bP4 / 0x2)),
                    bP6 = this['genColorCube'](bOT, bP4, bP5, [
                        [bOP, 0x1]
                    ], 0x0, {
                        'us': bOS
                    });
                this['moveMesh'](bP6, 0x0, -bP0 * Math['cos'](bP2[0x1]), -bP0 * Math['sin'](bP2[0x1])), this['rotateMesh'](bP6, 0x0, (bP2[0x1] + bP2[0x0]) / 0x2, 0x0);
                var bP7 = this['genColorCube'](bOT, bP0, bOT, [
                    [bOP, 0.5, 0x1, 0.8],
                    [bOQ, 0.5]
                ], 0x0, {
                    'us': bOS
                });
                this['moveMesh'](bP7, 0x0, -bP0 * Math['cos'](bP2[0x1]) - bP0 / 0x2 * Math['cos'](bP2[0x0]), -bP0 * Math['sin'](bP2[0x1]) - bP0 / 0x2 * Math['sin'](bP2[0x0])), this['rotateMesh'](bP7, 0x0, bP2[0x0], 0x0);
                bOU = new bOO['Geometry']();
                this['merge'](bOU, bP3), this['merge'](bOU, bP6), this['merge'](bOU, bP7), bQp[bOZ] = bOU;
            }
            bOU = new bOO['BufferGeometry']()['fromGeometry'](bOU), bOU = new bOO['Mesh'](bOU, this['getMat']('default')), this['moveMesh'](bOU, bOY['legScale'] / 0x2 * (bON ? -0x1 : 0x1), bOY['legHeight'] - bOY['crouchDst'] + 0.5, 0x0);
        } else bOU = this['genColorCube'](bOT, bOY['legHeight'], bOT, [
            [bOP, 0.75, 0x1],
            [bOQ, 0.25]
        ], -0.5, {
            'us': bOS
        }), this['moveMesh'](bOU, bOY['legScale'] / 0x2 * (bON ? -0x1 : 0x1), bOY['legHeight'], 0x0);
        return bOU['receiveShadow'] = !0x0, bOU['noGreen'] = !0x0, bOU;
    };
    var bQG = {};
    this['genArms'] = function(bON, bOP, bOQ, bOR, bOS, bOT) {
        var bOU = bQG[bON['name'] + '-' + bOQ + '-' + bOR + '-' + bOT + '-' + (bOS || 0x0)];
        if (!bOU) {
            bOU = new bOO['Geometry']();
            var bOZ = (-bOY['chestWidth'] + bOY['armScale'] / 0x2 - bOY['armInset']) * (bOT ? bON['holdW'] || 0.4 : 0x1);
            bOS && 0x1 != bOS || this['merge'](bOU, this['genArm'](bOZ, bOY['armOff'], bON, !0x0, bOP, bOQ, bOR, bOT)), bOS && 0x2 != bOS || this['merge'](bOU, this['genArm'](-bOZ, bOY['armOff'], bON, !0x1, bOP, bOQ, bOR, bOT)), bOU = new bOO['BufferGeometry']()['fromGeometry'](bOU), bQG[bON['name'] + '-' + bOQ + '-' + bOT + '-' + (bOS || 0x0)] = bOU;
        }
        return (bOU = new bOO['Mesh'](bOU, this['getMat']('default')))['position']['z'] += bOT && bON['hDstOff'] || 0x0, bOU['noGreen'] = !0x0, bOU['receiveShadow'] = !0x0, bOU;
    }, this['genArm'] = function(bON, bOP, bOQ, bOR, bOT, bOU, bOZ, bP0) {
        var bP1 = bOR ? bOQ['leftHoldY'] : bOQ['rightHoldY'],
            bP2 = bOR ? bOQ['leftHoldZ'] : bOQ['rightHoldZ'];
        bP2 += bP0 && bOQ['hDstOff'] || 0x0;
        var bP3 = bOR ? bOQ['leftHoldX'] || 0x0 : bOQ['rightHoldX'] || 0x0,
            bP4 = bOY['armScale'] * (bP0 ? 0.7 : 0x1),
            bP5 = Math['min'](bOY['uArmLength'] + bOY['lArmLength'] - 0.01, bOS['getD3D'](bON, bOP, 0x0, (bOQ['xOff'] - bP3) * (bOR && bOQ['akimbo'] ? -0x1 : 0x1), bOQ['yOff'] + bP1, bOQ['zOff'] - bP2)),
            bP6 = bOS['getAnglesSSS'](bP5, bOY['uArmLength'], bOY['lArmLength']),
            bP7 = Math['PI'] / 0x2;
        if (!bP0) {
            var bP8 = this['genColorCube'](bP4, bOY['uArmLength'], bP4, [
                [bOT, 0x1]
            ], 0x0, {
                'us': bP0
            });
            this['moveMesh'](bP8, 0x0, -bOY['uArmLength'] / 0x2 * Math['cos'](bP7), -bOY['uArmLength'] / 0x2 * Math['sin'](bP7)), this['rotateMesh'](bP8, 0x0, bP7, 0x0);
            var bP9 = bP4 / 0x2,
                bPa = Math['sqrt'](bP9 * bP9 + bP9 * bP9 - 0x2 * bP9 * bP9 * Math['cos'](Math['PI'] + bP6[0x0] + Math['PI'] / 0x2)),
                bPb = 0x2 * Math['sqrt'](bP9 * bP9 - bPa / 0x2 * (bPa / 0x2)),
                bPc = this['genColorCube'](bP4, bPa, bPb, [
                    [bOT, 0x1]
                ], 0x0, {
                    'us': bP0
                });
            this['moveMesh'](bPc, 0x0, -bOY['uArmLength'] * Math['cos'](bP7), -bOY['uArmLength'] * Math['sin'](bP7)), this['rotateMesh'](bPc, 0x0, (bP7 + bP6[0x0]) / 0x2, 0x0);
        }
        var bPd = this['genColorCube'](bP4, bOY['lArmLength'], bP4, [
                [bOT, 0.65, 0x1, 0.6],
                [bOU, 0.15, 1.1],
                [bOZ, 0.2, 0x1, 0.5, !0x0]
            ], 0x0, {
                'us': bP0
            }),
            bPh = bOY['lArmLength'] / 0x2;
        this['moveMesh'](bPd, 0x0, -bOY['uArmLength'] * Math['cos'](bP7) - bPh * Math['cos'](bP6[0x0]), -bOY['uArmLength'] * Math['sin'](bP7) - bPh * Math['sin'](bP6[0x0])), this['rotateMesh'](bPd, 0x0, bP6[0x0], 0x0);
        var bPw = new bOO['Geometry']();
        if (bP0) {
            var bPx = this['genColorCube'](bP4, 0x14, bP4, [
                [bOT, 0x1]
            ], 0x0, {
                'us': bP0
            });
            this['moveMesh'](bPx, 0x0, -bOY['uArmLength'] * Math['cos'](bP7) - -0xa * Math['cos'](bP6[0x0]), -bOY['uArmLength'] * Math['sin'](bP7) - -0xa * Math['sin'](bP6[0x0])), this['rotateMesh'](bPx, 0x0, bP6[0x0], 0x0), this['merge'](bPw, bPx);
        } else this['merge'](bPw, bP8), this['merge'](bPw, bPc);
        return this['merge'](bPw, bPd), bPw = new bOO['Mesh'](bPw), this['moveMesh'](bPw, bON - bOQ['xOff'], bOP - bOQ['yOff'], -bOQ['zOff']), bPw['rotation']['order'] = 'YXZ', bPw['rotation']['x'] = -bP6[0x1] - bOS['getDir'](0x0, bOP, bOQ['zOff'] - bP2, bOQ['yOff'] + bP1), bPw['rotation']['y'] = bOS['getDir'](-bON, 0x0, (bOR && bOQ['akimbo'] ? 0x1 : -0x1) * (bOQ['xOff'] - bP3), bOQ['zOff'] - bP2) - Math['PI'] / 0x2, bPw;
    }, this['addCube'] = function(bON, bOP, bOQ, bOR, bOS, bOT, bOU, bOY) {
        bOY = bOY || {};
        var bOZ = new bOO['Mesh'](bP0['generateCube'](bOU, bOR, bOS, bOT, bOY));
        return this['moveMesh'](bOZ, bON, bOP, bOQ), bOZ['rotation']['set'](bOY['yR'] || 0x0, bOY['xR'] || 0x0, bOY['zR'] || 0x0), bOZ['scale']['set'](bOR, bOS, bOT), bOY['src'] && !bOY['noGroup'] ? this['meshGroup'](bOZ, bOY) : this['add'](bOZ, bOY), bOZ;
    }, this['addCone'] = function(bON, bOP, bOQ, bOR, bOS, bOT, bOU) {
        bOU = bOU || {};
        var bOY = new bOO['Mesh'](bP0['generateCone'](bOR, bOS, bOT, bOU));
        return this['moveMesh'](bOY, bON, bOP, bOQ), bOY['rotation']['set'](bOU['yR'] || 0x0, bOU['xR'] || 0x0, bOU['zR'] || 0x0), bOU['src'] && !bOU['noGroup'] ? this['meshGroup'](bOY, bOU) : this['add'](bOY, bOU), bOY;
    };
    var bRu = [];
    this['addSpray'] = function(bON, bOP, bOQ, bOR, bOT, bOU, bOZ, bP0) {
        bPa = null;
        for (var bP1 = 0x0; bP1 < bRu['length']; ++bP1)
            if (bRu[bP1]['sid'] == bON) {
                bPa = bRu[bP1];
                break;
            } bPa || ((bPa = new bOO['Mesh'](bP3))['sid'] = bON, bPa['scale']['set'](bOY['sprayScale'], bOY['sprayScale'], 0x1), bPa['receiveShadow'] = !0x0, bRu['push'](bPa), this['add'](bPa)), this['moveMesh'](bPa, bOQ, bOR, bOT), bPa['rotation']['y'] = bOS['toRad'](bOU), bPa['rotation']['x'] = bOS['toRad'](bOZ), bPa['material'] = this['getMat']('sprays/' + bOP, {
            'depthWrite': !0x1,
            'opacity': bP0,
            'transparent': !0x0
        });
    }, this['clearSprays'] = function() {
        for (var bON = 0x0; bON < bRu['length']; ++bON) bRu[bON] && bRu[bON]['material']['map'] && bRu[bON]['material']['map']['dispose'](), this['scene']['remove'](bRu[bON]);
        bRu['length'] = 0x0;
    }, this['addPlane'] = function(bON, bOP, bOQ, bOR, bOS, bOT, bOU, bOY, bOZ) {
        (bOT = bOT || {})['premultipliedAlpha'] = !0x0;
        var bP1 = new bOO['Mesh'](bP0['generatePlane'](bOS, bOR, bOT, bON, bOP, bOQ));
        return bOT['euler'] && (bP1['rotation']['order'] = bOT['euler']), this['moveMesh'](bP1, bON, bOP, bOQ), bP1['rotateY'](bOU || 0x0), bP1['rotateX']((bOY || 0x0) - Math['PI'] / 0x2), bP1['rotateZ'](bOZ || 0x0), bP1['scale']['set'](0x2 * bOR, 0x2 * bOS, 0x1), bOT['dontAdd'] ? bOT['src'] && (bP1['material'] = this['getMat'](bOT['src'], bOT)) : bOT['src'] && !bOT['noGroup'] ? this['meshGroup'](bP1, bOT, 0x1) : this['add'](bP1, bOT), bP1;
    }, this['addRamp'] = function(bON, bOP, bOQ, bOR, bOS, bOT, bOU, bOY, bOZ) {
        bOY = bOY || {};
        var bP1 = new bOO['Mesh'](bP0['generatePlane'](0x2 * bOT, bOR, bOY));
        this['moveMesh'](bP1, bON, bOP + bOS / 0x2, bOQ), bOT *= 0x2;
        var bP2 = Math['sqrt'](bOS * bOS + bOT * bOT);
        return bP1['scale']['set'](bOR, bP2, 0x2), bP1['rotateY'](-Math['PI'] / 0x2 - bOU), bP1['rotateX'](Math['asin'](bOS / bP2) - Math['PI'] / 0x2), bP1['rotateZ'](bOZ || 0x0), bOY['src'] ? this['meshGroup'](bP1, bOY, 0x1) : this['add'](bP1, bOY), bP1;
    }, this['addGrass'] = function(bON, bOP, bOQ, bOR, bOS, bOT, bOU) {
        bOU = bOU || {};
        let bOY = new bOO['Geometry'](),
            bOZ = 0x2 * Math['PI'] * Math['random'](),
            bP1 = new bOO['Mesh'](bP0['generatePlane'](bOR, bOS, bOU));
        bP1['rotateY'](bOZ * (Math['PI'] / 0x2)), this['merge'](bOY, bP1);
        let bP2 = new bOO['Mesh'](bP0['generatePlane'](bOR, bOS, bOU));
        bP2['rotateY']((bOZ + 0x1) * (Math['PI'] / 0x2)), this['merge'](bOY, bP2);
        let bP3 = new bOO['Mesh'](bOY);
        return this['moveMesh'](bP3, bON, bOP + bOS / 0x2, bOQ), bP3['rotation']['set'](bOU['yR'] || 0x0, bOU['xR'] || 0x0, bOU['zR'] || 0x0), bP3['scale']['set'](bOR, bOS, bOT), bOU['src'] && !bOU['noGroup'] ? this['meshGroup'](bP3, bOU) : this['add'](bP3, bOU), bP3;
    };
    var bSc = [],
        bSd = [];
    this['loadMesh'] = function(bON, bOP, bOQ, bOR, bOT, bOU, bOY, bOZ) {
        var bP0 = this['getMat'](bON['src'], bON),
            bP1 = bSc[bON['src']];
        if (bP1) {
            if (bON['centerZ']) {
                bP1['computeBoundingBox']();
                var bP3 = bP1['boundingBox']['getCenter']();
                bOY['translateZ'](bP3['x'] * bOU);
            }
        } else bP1 = bOZ ? new bOO['Geometry']() : new bOO['BufferGeometry'](), bSc[bON['src']] = bP1, bP2['load'](bOS['assetsUrl']('/models/' + bON['src'] + '.obj'), function(bOP) {
            if (bP1['copy'](bOZ ? new bOO['Geometry']()['fromBufferGeometry'](bOP['children'][0x0]['geometry']) : bOP['children'][0x0]['geometry']), bON['uv2'] && bP1['addAttribute']('uv2', new bOO['BufferAttribute'](bP1['attributes']['uv']['array'], 0x2)), bOZ) {
                for (var bOQ = new bOO['Geometry'](), bOR = 0x0; bOR < bSd[bON['src']]['length']; ++bOR) bPb['merge'](bOQ, bSd[bON['src']][bOR]);
                bPb['add'](new bOO['Mesh'](new bOO['BufferGeometry']()['fromGeometry'](bOQ), bP0), bON), bSd[bON['src']]['length'] = 0x0, bSd[bON['src']]['loaded'] = !0x0;
            }
            if (bON['centerZ']) {
                bP1['computeBoundingBox']();
                var bOS = bP1['boundingBox']['getCenter']();
                bOY['translateZ'](bOS['x'] * bOU);
            }
        });
        var bP4 = new bOO['Mesh'](bP1, bP0);
        return bP4['receiveShadow'] = !bON['noShadow'], bP4['noGreen'] = bON['noGreen'], bP4['castShadow'] = bON['shadows'], 'object' == typeof bOT ? (bP4['rotation']['x'] = bP4['xR'] = bOT[0x0] || 0x0, bP4['rotation']['y'] = bP4['yR'] = bOT[0x1] || 0x0, bP4['rotation']['z'] = bP4['zR'] = bOT[0x2] || 0x0) : bP4['rotation']['y'] = bOT || 0x0, bP4['xP'] = bOP, bP4['yP'] = bOQ, bP4['zP'] = bOR, bPb['moveMesh'](bP4, bOP, bOQ, bOR), bPb['scaleMesh'](bP4, bOU || 0x1, bOU || 0x1, bOU || 0x1), bOZ ? bSd[bON['src']] ? bSd[bON['src']]['loaded'] ? this['meshGroup'](bP4, bON) : bSd[bON['src']]['push'](bP4) : bSd[bON['src']] = [bP4] : bOY['add'](bP4), bP4;
    }, this['clearPendingMeshes'] = function() {
        for (var bON in bSd) bSd['hasOwnProperty'](bON) && bSd[bON] && (bSd[bON]['length'] = 0x0);
    }, this['updateMesh'] = function(bON, bOP) {
        var bOQ = bP2['parse'](bOP),
            bOR = new bOO['BufferGeometry']();
        bSc[bON] = bOR, bOR['copy'](bOQ['children'][0x0]['geometry']), bOR['needsUpdate'] = !0x0;
    }, this['genObj3D'] = function(bON, bOP, bOQ) {
        var bOR = new bOO['Object3D']();
        return this['moveMesh'](bOR, bON || 0x0, bOP || 0x0, bOQ || 0x0), bOR;
    }, this['merge'] = function(bON, bOO, bOP) {
        bOO['updateMatrix'](), bON['merge'](bOO['geometry'], bOO['matrix'], bOP);
    }, this['meshGroup'] = function(bON, bOP) {
        var bOQ = bOP['src'] + '-' + (bOP['shadowsR'] || 'a') + (bOP['emissive'] || 'e') + (bOP['opacity'] || 'o') + (null == bOP['movT'] ? 'mt' : bOP['movT']) + (null == bOP['movD'] ? 'md' : bOP['movD']);
        bPc[bOQ] || (bPc[bOQ] = new bOO['Geometry'](), bPc[bOQ]['data'] = bOP), bON['updateMatrix'](), bPc[bOQ]['merge'](bON['geometry'], bON['matrix']);
    }, this['addMeshGroups'] = function() {
        for (var bON in bPc)
            if (bPc['hasOwnProperty'](bON)) {
                var bOP = new bOO['Mesh'](new bOO['BufferGeometry']()['fromGeometry'](bPc[bON]));
                bOP['groupSrc'] = bPc[bON]['data']['src'], bOP['visible'] = !bSL[bOP['groupSrc']], bOP['matrixAutoUpdate'] = !0x1, this['add'](bOP, bPc[bON]['data']);
            } bPc = {};
    };
    var bSL = {};
    this['toggleMeshGroup'] = function(bON, bOP) {
        bSL[bON] = !bOP, this['scene'] && this['scene']['traverse'](function(bOQ) {
            bOQ instanceof bOO['Mesh'] && bOQ['groupSrc'] == bON && (bOQ['visible'] = bOP);
        });
    }, this['add'] = function(bON, bOO) {
        bOO && (bON['castShadow'] = bOO['shadows'], bON['receiveShadow'] = bOO['shadows'] || bOO['shadowsR'], bON['material'] = this['getMat'](bOO['src'], bOO)), this['updateGreenScreen'](bON), this['scene']['add'](bON), this['updateShadowMap']();
    }, this['remove'] = function(bON) {
        this['scene']['remove'](bON);
    }, this['moveMesh'] = function(bON, bOO, bOP, bOQ) {
        bON && (null != bOO && (bON['position']['x'] = bOO), null != bOP && (bON['position']['y'] = bOP), null != bOQ && (bON['position']['z'] = bOQ));
    }, this['scaleMesh'] = function(bON, bOO, bOP, bOQ) {
        bON['scale']['set'](bOO, bOP, bOQ);
    }, this['rotateMesh'] = function(bON, bOO, bOP, bOQ) {
        bON && ((bOO || 0x0 == bOO) && (bON['rotation']['y'] = bOO), (bOP || 0x0 == bOP) && (bON['rotation']['x'] = bOP), (bOQ || 0x0 == bOQ) && (bON['rotation']['z'] = bOQ));
    }, this['reset'] = function() {
        bSc = [], bSd = [], bPc = {}, bP8 = {}, bP9 = {}, this['movTextures'] = [], this['pulsMats'] = [], this['frameMats'] = [], this['pulsVal'] = 0x0;
    };
}, module['exports']['initScene'] = function(bON, bOO) {
    if (bOQ = bON, bOR = bOO, (bOO && null != bOO['ambCol'] || bON['ambient']) && (this['ambientLight'] = new bOT['AmbientLight'](bOO && null != bOO['ambCol'] ? bOO['ambCol'] : bON['ambient']), this['ambientLight']['layers']['enable'](0x1), this['ambientLight']['layers']['enable'](0x2), this['ambientLight']['name'] = 'ambLight', !this['scene']['getObjectByName']('ambLight') && this['scene']['add'](this['ambientLight'])), bOO && null != bOO['lightCol'] || bON['light']) {
        this['skyLight'] = new bOT['DirectionalLight'](bOO && null != bOO['lightCol'] ? bOO['lightCol'] : bON['light'], 1.3), this['skyLight']['name'] = 'skyLight', this['skyLight']['layers']['enable'](0x1), this['skyLight']['layers']['enable'](0x2), this['scene']['getObjectByName']('skyLight') || this['scene']['add'](this['skyLight']);
        var bOP = -0.3 * Math['PI'],
            bOU = 0x2 * Math['PI'] * -0.25;
        this['skyLight']['position']['x'] = bOS['lightDistance'] * Math['cos'](bOU), this['skyLight']['position']['y'] = bOS['lightDistance'] * Math['sin'](bOU) * Math['sin'](bOP), this['skyLight']['position']['z'] = bOS['lightDistance'] * Math['sin'](bOU) * Math['cos'](bOP), this['skyLight']['castShadow'] = !0x0, this['skyLight']['shadow']['mapSize']['width'] = bON['shadowR'] || bOS['shadowRes'], this['skyLight']['shadow']['mapSize']['height'] = bON['shadowR'] || bOS['shadowRes'], this['skyLight']['shadow']['camera']['far'] = bOS['shadowDst'];
    }
    this['scene']['fog'] = new bOT['Fog'](bOO && null != bOO['fogC'] ? bOO['fogC'] : bON['fog'], 0x1, bOO && null != bOO['fogD'] ? bOO['fogD'] : bON['fogD']), this['renderer']['setClearColor'](bOO && null != bOO['skyCol'] ? bOO['skyCol'] : bON['sky']), this['useDepthMap'] && '0' != this['useDepthMap'] && this['toggleDepthMap'](this['useDepthMap']), this['greenScreen'] && this['toggleGreenscreen'](this['greenScreen']);
};
