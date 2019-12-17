let bEo = require("three");
const bEp = require("./config.js"),
    bEq = require("./24.js"),
    bEr = require("./util.js"),
    bEs = require("./weapons.js");
let bEt = new bEo['TextureLoader'](),
    bEu = new bEo['LoadingManager'](),
    bEv = new bEo['OBJLoader'](bEu);

function bEw(bEl, bEm, bEn, bEp, bEq, bEs = 0x0, bEu = 0x0, bEw = 0x0, bEF = null) {
    return new Promise(bEG => {
        bEv['load'](bEr['assetsUrl'](bEm), bEm => {
            let bEv;
            bEn && (bEv = bEt['load'](bEr['assetsUrl'](bEn), bEl => {
                bEl['wrapS'] = bEo['RepeatWrapping'], bEl['wrapT'] = bEo['RepeatWrapping'], bEl['repeat']['set'](0x1, 0x1), bEl['minFilter'] = bEo['NearestFilter'], bEl['magFilter'] = bEo['NearestFilter'], bEl['needsUpdate'] = !0x0;
            }));
            let bEK = new bEo['StrippedLambertMaterial']({
                    'map': bEv
                }),
                bEL = new bEo['Geometry']();
            bEm['traverse'](bEl => {
                bEl instanceof bEo['Mesh'] && (bEl['geometry']['isBufferGeometry'] ? (bEL['fromBufferGeometry'](bEl['geometry']), bEL['computeFlatVertexNormals'](), bEl['geometry']['fromGeometry'](bEL)) : bEl['geometry']['computeFlatVertexNormals'](), bEl['material'] = bEK);
            }), bEK['vertexColors'] = bEo['VertexColors'], bEK['color']['set'](bEq || 0xffffff), bEm['scale']['setScalar'](bEp || 0x1), bEm['position']['y'] += bEs, bEm['rotateX'](bEu || 0x0), bEm['rotateY'](bEw || 0x0), bEF ? (bEl[bEF] && (bEl['remove'](bEl[bEF]), bEl[bEF] = null), bEl[bEF] = bEm, bEl['add'](bEl[bEF])) : bEl['add'](bEm), bEG(bEm);
        });
    });
}
new bEo['BoxBufferGeometry'](0x1, 0x1, 0x1);
new bEo['PlaneBufferGeometry'](0x1, 0x1)['rotateX'](-Math['PI'] / 0x2);
new bEo['StrippedLambertMaterial']({
    'color': 0xff00
}), new bEo['StrippedLambertMaterial']({
    'color': 0x555555
});

function bEN(bEl, bEm, bEn, bEp) {
    var bEr = bEq['generateCube']([0x1, 0x1, 0x1, 0x1, 0x1, 0x1], bEl, bEm, bEn, {
        'scale': 0x1,
        'amb': bEp,
        'useScale': !0x0
    });
    return bEr = new bEo['BufferGeometry']()['fromGeometry'](bEr);
}
let bET = (bEl, bEm, bEn, bEp, bEr, bEs, bEt, bEu, bEv, bEw) => {
        (bEt = bEt || {})['premultipliedAlpha'] = !0x0;
        var bEN = new bEo['Mesh'](bEq['generatePlane'](bEs, bEr, bEt, bEm, bEn, bEp));
        bEN['position']['set'](bEm, bEn, bEp), bEN['rotateY'](bEu || 0x0), bEN['rotateX']((bEv || 0x0) - Math['PI'] / 0x2), bEN['rotateZ'](bEw || 0x0), bEN['scale']['set'](0x2 * bEr, 0x2 * bEs, 0x1), bEN['updateMatrix'](), bEl['merge'](bEN['geometry'], bEN['matrix']);
    },
    bEU = (bEl, bEm, bEn, bEp, bEr, bEs, bEt, bEu, bEv) => {
        bEv = bEv || {};
        var bEw = new bEo['Mesh'](bEq['generateCube'](bEu, bEr, bEs, bEt, bEv));
        return bEw['position']['set'](bEm, bEn, bEp), bEw['rotation']['set'](bEv['yR'] || 0x0, bEv['xR'] || 0x0, bEv['zR'] || 0x0), bEw['scale']['set'](bEr, bEs, bEt), bEl instanceof bEo['Geometry'] ? (bEw['updateMatrix'](), bEl['merge'](bEw['geometry'], bEw['matrix'])) : bEl['add'](bEw), bEw;
    };
module['exports']['prefabs'] = {
    'CRATE': {
        'hasHealth': !0x0,
        'editColor': !0x0,
        'dontRound': !0x0,
        'gen': bEl => bEw(bEl, 'models/crate_0.obj', 'textures/crate_0.png', bEp['crateScale'], bEl['color']),
        'dummy': !0x1,
        'castShadow': !0x0,
        'receiveShadow': !0x0
    },
    'STACK': {
        'hasHealth': !0x0,
        'editColor': !0x0,
        'dontRound': !0x0,
        'gen': bEl => bEw(bEl, 'models/stack_0.obj', 'textures/stack_0.png', bEp['crateScale'], bEl['color']),
        'dummy': !0x1,
        'castShadow': !0x0,
        'receiveShadow': !0x0
    },
    'BARREL': {
        'hasHealth': !0x0,
        'editColor': !0x0,
        'dontRound': !0x0,
        'gen': bEl => bEw(bEl, 'models/barrel_0.obj', 'textures/barrel_0.png', bEp['barrelScale'], bEl['color']),
        'castShadow': !0x0,
        'receiveShadow': !0x0
    },
    'ACIDBARREL': {
        'hasHealth': !0x0,
        'editColor': !0x0,
        'dontRound': !0x0,
        'emiss': !0x0,
        'gen': bEl => bEw(bEl, 'models/acidbarrel_0.obj', 'textures/acidbarrel_0.png', bEp['acidbarrelScale'], bEl['color']),
        'castShadow': !0x0,
        'receiveShadow': !0x0
    },
    'TREE': {
        'hasHealth': !0x0,
        'editColor': !0x0,
        'dontRound': !0x0,
        'complex': !0x0,
        'gen': bEl => bEw(bEl, 'models/tree_0.obj', 'textures/tree_0.png', bEp['treeScale'], bEl['color']),
        'castShadow': !0x0,
        'receiveShadow': !0x0
    },
    'CONE': {
        'hasHealth': !0x0,
        'editColor': !0x0,
        'dontRound': !0x0,
        'complex': !0x0,
        'gen': bEl => bEw(bEl, 'models/cone_0.obj', 'textures/cone_0.png', bEp['coneScale'], bEl['color']),
        'castShadow': !0x0,
        'receiveShadow': !0x0
    },
    'TEDDY': {
        'hasHealth': !0x0,
        'editColor': !0x0,
        'dontRound': !0x0,
        'complex': !0x0,
        'gen': bEl => bEw(bEl, 'models/teddy_0.obj', 'textures/teddy_0.png', bEp['teddyScale'], bEl['color']),
        'castShadow': !0x0,
        'receiveShadow': !0x0
    },
    'CONTAINER': {
        'hasHealth': !0x0,
        'editColor': !0x0,
        'dontRound': !0x0,
        'gen': bEl => bEw(bEl, 'models/container_0.obj', 'textures/container_0.png', bEp['containerScale'], bEl['color']),
        'castShadow': !0x0,
        'receiveShadow': !0x0
    },
    'CONTAINERR': {
        'hasHealth': !0x0,
        'editColor': !0x0,
        'dontRound': !0x0,
        'gen': bEl => bEw(bEl, 'models/containerr_0.obj', 'textures/containerr_0.png', bEp['containerScale'], bEl['color']),
        'castShadow': !0x0,
        'receiveShadow': !0x0
    },
    'DOOR': {
        'hasHealth': !0x0,
        'editColor': !0x0,
        'dontRound': !0x0,
        'gen': bEl => bEw(bEl, 'models/door_0.obj', 'textures/door_0.png', bEp['doorScale'], bEl['color']),
        'castShadow': !0x0,
        'receiveShadow': !0x0
    },
    'WINDOW': {
        'hasHealth': !0x0,
        'editColor': !0x0,
        'dontRound': !0x0,
        'gen': bEl => bEw(bEl, 'models/window_0.obj', 'textures/window_0.png', bEp['windowScale'], bEl['color']),
        'castShadow': !0x0,
        'transparent': !0x0,
        'receiveShadow': !0x0
    },
    'GRASS': {
        'hasHealth': !0x0,
        'editColor': !0x0,
        'complex': !0x0,
        'doubleSide': !0x0,
        'transparent': !0x0,
        'gen': bEl => bEw(bEl, 'models/grass_0.obj', 'textures/grass_0.png', bEp['grassScale'], bEl['color']),
        'receiveShadow': !0x0
    },
    'WEAPON_PICKUP': {
        'notStyleable': !0x0,
        'interact': !0x0,
        'customScore': !0x0,
        'defaultSize': [bEp['pickupZoneX'], bEp['pickupZoneH'], bEp['pickupZoneZ']],
        'scalable': !0x1,
        'tool': !0x0,
        'scaleWithSize': !0x1,
        'lineCol': 0x36dbff,
        'noTexture': !0x0,
        'texturable': !0x1,
        'opacity': 0.1,
        'genGeo': async (bEl, bEm) => function(bEl, bEm) {
            let bEn = bEq['generateCube']([0x1, 0x1, 0x1, 0x1, 0x1, 0x1], ...bEl['size'], {
                'scale': 0x1,
                'amb': bEm,
                'useScale': !0x0
            });
            return bEn = new bEo['BufferGeometry']()['fromGeometry'](bEn), bEw(bEl, 'models/weapons/' + bEs[bEl['weaponId']]['src'] + '.obj', 'textures/weapons/' + bEs[bEl['weaponId']]['src'] + '.png', bEs[bEl['weaponId']]['scale'], 0xffffff, -0.5, -1.6, 0x0, 'wepMesh'), bEn;
        }(bEl, bEm),
        'stepSrc': 'a'
    },
    'VEHICLE': {
        'hasHealth': !0x0,
        'editColor': !0x0,
        'dontRound': !0x0,
        'complex': !0x0,
        'emiss': !0x0,
        'gen': bEl => bEw(bEl, 'models/vehicle_0.obj', 'textures/vehicle_0.png', bEp['vehicleScale'], bEl['color']),
        'castShadow': !0x0,
        'receiveShadow': !0x0
    },
    'LADDER': {
        'notTechnical': !0x0,
        'defaultSize': [0x2, 0xa, 0x4],
        'scalable': !0x0,
        'scaleWithSize': !0x1,
        'editColor': !0x0,
        'hideBoundingBox': !0x1,
        'texturable': !0x0,
        'genGeo': async bEl => function(bEl, bEm, bEn, bEq) {
            var bEs = new bEo['Geometry']();
            bEq = bEq * Math['PI'] / 0x2;
            let bEt = {
                'x': 0x0 + bEp['ladderScale'] * Math['cos'](bEq),
                'z': 0x0 + bEp['ladderScale'] * Math['sin'](bEq),
                'y': 0x0 - bEm / 0x2
            };
            bEU(bEs, bEt['x'] + bEp['ladderWidth'] * Math['sin'](bEq), bEt['y'], bEt['z'] + bEp['ladderWidth'] * Math['cos'](bEq), 0x2 * bEp['ladderScale'], bEm + 0x2, 0x2 * bEp['ladderScale'], [0x1, 0x1, 0x1, 0x1, 0x1, 0x1], {
                'scale': 0.02
            }), bEU(bEs, bEt['x'] - bEp['ladderWidth'] * Math['sin'](bEq), bEt['y'], bEt['z'] - bEp['ladderWidth'] * Math['cos'](bEq), 0x2 * bEp['ladderScale'], bEm + 0x2, 0x2 * bEp['ladderScale'], [0x1, 0x1, 0x1, 0x1, 0x1, 0x1], {
                'scale': 0.02
            });
            for (var bEu = Math['floor'](bEm / 0x6), bEv = 0x0; bEv < bEu; ++bEv) bET(bEs, bEt['x'], bEt['y'] + 0x6 * (bEv + 0x1) + bEr['randFloat'](-0x1, 0x1), bEt['z'], bEp['ladderWidth'], bEp['ladderScale'], {
                'scale': 0.02
            }, -bEq + Math['PI'] / 0x2, Math['PI'] / 0x2, bEr['randFloat'](-0.1, 0.1));
            return bEs;
        }(...bEl['size'], bEl['direction']),
        'customDirection': !0x0,
        'stepSrc': 'a',
        'dummy': !0x1,
        'castShadow': !0x0,
        'receiveShadow': !0x0
    },
    'CUBE': {
        'canInterface': !0x0,
        'movingTexture': !0x0,
        'defaultSize': [0xa, 0xa, 0xa],
        'hasHealth': !0x0,
        'scalable': !0x0,
        'editAmb': !0x0,
        'scaleWithSize': !0x1,
        'editColor': !0x0,
        'editEmissive': !0x0,
        'editOpac': !0x0,
        'hideBoundingBox': !0x1,
        'editPen': !0x0,
        'texturable': !0x0,
        'genGeo': async (bEl, bEm) => bEN(...bEl['size'], bEm),
        'stepSrc': 'a',
        'dummy': !0x1,
        'castShadow': !0x0,
        'receiveShadow': !0x0,
        'hasBorder': !0x0
    },
    'RAMP': {
        'notTechnical': !0x0,
        'defaultSize': [0xa, 0x5, 0xa],
        'movingTexture': !0x0,
        'scalable': !0x0,
        'scaleWithSize': !0x1,
        'hideBoundingBox': !0x1,
        'boostable': !0x0,
        'editColor': !0x0,
        'editEmissive': !0x0,
        'texturable': !0x0,
        'genGeo': async bEl => function(bEl, bEm, bEn, bEp, bEr, bEs, bEt) {
            var bEu = new bEo['Geometry']();
            bEm = 0x0 - bEr / 0x2;
            var bEv = 0x0 != (bEt = bEt * Math['PI'] / 0x2) && bEt != Math['PI'];
            return ((bEl, bEm, bEn, bEp, bEr, bEs, bEt, bEv, bEw) => {
                bEv = bEv || {};
                var bEN = new bEo['Mesh'](bEq['generatePlane'](0x2 * bEs, bEp, bEv));
                bEN['position']['set'](bEl, bEm + bEr / 0x2, bEn), bEs *= 0x2;
                var bET = Math['sqrt'](bEr * bEr + bEs * bEs);
                bEN['scale']['set'](bEp, bET, 0x2), bEN['rotateY'](-Math['PI'] / 0x2 - bEt), bEN['rotateX'](Math['asin'](bEr / bET) - Math['PI'] / 0x2), bEN['rotateZ'](bEw || 0x0), bEN['updateMatrix'](), bEu['merge'](bEN['geometry'], bEN['matrix']);
            })(bEl, bEm, bEn, bEv ? bEp : bEs, bEr, (bEv ? bEs : bEp) / 0x2, bEt, {
                'scale': 0x1
            }), bEu;
        }(0x0, 0x0, 0x0, ...bEl['size'], bEl['direction']),
        'shootable': !0x0,
        'customDirection': !0x0,
        'stepSrc': 'a',
        'dummy': !0x1,
        'castShadow': !0x0,
        'receiveShadow': !0x0,
        'doubleSide': !0x0
    },
    'PLANE': {
        'notTechnical': !0x0,
        'defaultSize': [0x4, 0.01, 0x4],
        'movingTexture': !0x0,
        'dontRound': !0x0,
        'scalable': !0x0,
        'canTerrain': !0x0,
        'edgeNoise': !0x0,
        'scaleWithSize': !0x0,
        'editColor': !0x0,
        'editPen': !0x0,
        'editEmissive': !0x0,
        'editOpac': !0x0,
        'hideBoundingBox': !0x1,
        'texturable': !0x0,
        'genGeo': async bEl => function(bEl, bEm) {
            let bEn = new bEo['PlaneGeometry'](bEl, bEm);
            return bEn['rotateX'](-Math['PI'] / 0x2), bEn;
        }(bEl['size'][0x0], bEl['size'][0x2]),
        'stepSrc': 'a',
        'dummy': !0x1,
        'castShadow': !0x0,
        'receiveShadow': !0x0,
        'doubleSide': !0x0
    },
    'OBJECTIVE': {
        'notTechnical': !0x0,
        'notStyleable': !0x0,
        'defaultSize': [0x32, 0x32, 0x32],
        'scalable': !0x0,
        'noTexture': !0x0,
        'opacity': 0.2,
        'lineCol': 0xc800ff,
        'tool': !0x0,
        'genGeo': async (bEl, bEm) => bEN(...bEl['size'], bEm),
        'stepSrc': 'a'
    },
    'PARTICLES': {
        'notTechnical': !0x0,
        'notStyleable': !0x0,
        'defaultSize': [0x14, 0x14, 0x14],
        'hasParticles': !0x0,
        'scalable': !0x0,
        'noTexture': !0x0,
        'opacity': 0.3,
        'lineCol': 0x2effff,
        'tool': !0x0,
        'genGeo': async (bEl, bEm) => bEN(...bEl['size'], bEm),
        'stepSrc': 'a'
    },
    'BILLBOARD': {
        'notTechnical': !0x0,
        'defaultSize': [0x28, 0.01, 0xa],
        'lineCol': 0xffff00,
        'dontRound': !0x0,
        'scalable': !0x0,
        'canTerrain': !0x0,
        'scaleWithSize': !0x0,
        'hideBoundingBox': !0x1,
        'genGeo': async bEl => function(bEl, bEm, bEn, bEp, bEq, bEr) {
            var bEs = new bEo['Geometry']();
            return bET(bEs, bEl, bEm, bEn, bEp / 0x2, bEr / 0x2), bEs;
        }(0x0, 0x0, 0x0, ...bEl['size']),
        'stepSrc': 'a',
        'dummy': !0x1,
        'castShadow': !0x0,
        'receiveShadow': !0x0,
        'doubleSide': !0x0
    },
    'SCORE_ZONE': {
        'notStyleable': !0x0,
        'customScore': !0x0,
        'defaultSize': [0xa, 0xa, 0xa],
        'scalable': !0x0,
        'noTexture': !0x0,
        'opacity': 0.3,
        'lineCol': 0xffff00,
        'tool': !0x0,
        'genGeo': async (bEl, bEm) => bEN(...bEl['size'], bEm),
        'stepSrc': 'a'
    },
    'DEATH_ZONE': {
        'notTechnical': !0x0,
        'notStyleable': !0x0,
        'defaultSize': [0xa, 0xa, 0xa],
        'scalable': !0x0,
        'noTexture': !0x0,
        'opacity': 0.3,
        'lineCol': 0xff0000,
        'tool': !0x0,
        'genGeo': async (bEl, bEm) => bEN(...bEl['size'], bEm),
        'stepSrc': 'a'
    },
    'SPAWN_POINT': {
        'notTechnical': !0x0,
        'notStyleable': !0x0,
        'scalable': !0x1,
        'alwaysSee': !0x0,
        'tool': !0x0,
        'scaleWithSize': !0x1,
        'teamable': !0x0,
        'noTexture': !0x0,
        'opacity': 0.00001,
        'stepSrc': 'a',
        'customDirection': !0x0,
        'dontRound': !0x0,
        'genGeo': async (bEl, bEm) => function(bEl, bEm) {
            bEw(bEl, 'models/spawn_0.obj', 'textures/spawn_0.png', 0x1, 0xffffff, -5.5, 0x0, -((bEl['direction'] || 0x0) + 0x1) * Math['PI'] / 0x2, 'spwnMesh');
            let bEn = bEq['generateCube']([0x1, 0x1, 0x1, 0x1, 0x1, 0x1], 0x7, 0xb, 0x7, {
                'scale': 0x1,
                'amb': bEm,
                'transparent': !0x0,
                'useScale': !0x0,
                'depthWrite': !0x1,
                'side': 0x2
            });
            return bEn = new bEo['BufferGeometry']()['fromGeometry'](bEn);
        }(bEl, bEm),
        'dummy': !0x1,
        'castShadow': !0x1,
        'receiveShadow': !0x1
    },
    'CHECK_POINT': {
        'notStyleable': !0x0,
        'defaultSize': [0xa, 0xa, 0xa],
        'scalable': !0x0,
        'noTexture': !0x0,
        'opacity': 0.3,
        'lineCol': 0x3dac5,
        'tool': !0x0,
        'customDirection': !0x0,
        'genGeo': async (bEl, bEm) => bEN(...bEl['size'], bEm),
        'stepSrc': 'a'
    },
    'TELEPORTER': {
        'notStyleable': !0x0,
        'hasSignals': !0x0,
        'defaultSize': [0xa, 0xa, 0xa],
        'scalable': !0x0,
        'noTexture': !0x0,
        'opacity': 0.3,
        'lineCol': 0xb1fff0,
        'tool': !0x0,
        'genGeo': async (bEl, bEm) => bEN(...bEl['size'], bEm),
        'stepSrc': 'a'
    },
    'CAMERA_POSITION': {
        'notTechnical': !0x0,
        'notStyleable': !0x0,
        'defaultSize': [0x2, 0x2, 0x2],
        'scalable': !0x1,
        'alwaysSee': !0x0,
        'tool': !0x0,
        'scaleWithSize': !0x1,
        'hideBoundingBox': !0x0,
        'editorGen': bEl => function(bEl, bEm, bEn) {
            let bEp = new bEo['TextureLoader']()['load'](bEr['assetsUrl'](bEm));
            bEp['magFilter'] = bEo['NearestFilter'];
            let bEq = new bEo['SpriteMaterial']({
                    'map': bEp,
                    'color': 0xffffff
                }),
                bEs = new bEo['Sprite'](bEq);
            bEn && bEs['scale']['set'](bEn, bEn, 0x1), bEl['add'](bEs);
        }(bEl, 'img/crosshair.png', 0x5),
        'stepSrc': 'a',
        'dummy': !0x1,
        'castShadow': !0x1,
        'receiveShadow': !0x1
    },
    'FLAG': {
        'notTechnical': !0x0,
        'notStyleable': !0x0,
        'defaultSize': [bEp['flagZoneS'], bEp['flagZoneH'], bEp['flagZoneS']],
        'scalable': !0x1,
        'tool': !0x0,
        'scaleWithSize': !0x1,
        'lineCol': 0xc800ff,
        'teamable': !0x0,
        'noDefault': !0x0,
        'genGeo': async (bEl, bEm) => function(bEl, bEm) {
            bEw(bEl, 'models/crystal_0.obj', 'textures/crystal_0.png', bEp['flagScale'], 0xffffff, bEp['flagOff'] / 0x2);
            var bEn = bEq['generateCube']([0x1, 0x1, 0x0, 0x0, 0x1, 0x1], ...bEl['size'], {
                'scale': 0x1,
                'amb': bEm,
                'useScale': !0x0,
                'transparent': !0x0,
                'depthWrite': !0x1,
                'side': 0x2
            });
            return bEn = new bEo['BufferGeometry']()['fromGeometry'](bEn);
        }(bEl, bEm),
        'stepSrc': 'a',
        'dummy': !0x1,
        'castShadow': !0x1,
        'receiveShadow': !0x1
    },
    'GATE': {
        'canInterface': !0x0,
        'canUndo': !0x0,
        'interact': !0x0,
        'customScore': !0x0,
        'movingTexture': !0x0,
        'defaultSize': [0xa, 0xa, 0xa],
        'scalable': !0x0,
        'forceCollision': !0x0,
        'editAmb': !0x0,
        'scaleWithSize': !0x1,
        'editColor': !0x0,
        'editEmissive': !0x0,
        'editOpac': !0x0,
        'lineCol': 0xff00ff,
        'texturable': !0x0,
        'tool2': !0x0,
        'genGeo': async (bEl, bEm) => bEN(...bEl['size'], bEm),
        'stepSrc': 'a',
        'dummy': !0x1,
        'castShadow': !0x0,
        'receiveShadow': !0x0,
        'complex': !0x0,
        'hasBorder': !0x0
    },
    'TRIGGER': {
        'canInterface': !0x0,
        'canTargetInterface': !0x0,
        'hasHealth': !0x0,
        'movingTexture': !0x0,
        'defaultSize': [0xa, 0xa, 0xa],
        'scalable': !0x0,
        'forceCollision': !0x0,
        'editAmb': !0x0,
        'scaleWithSize': !0x1,
        'editColor': !0x0,
        'editEmissive': !0x0,
        'editOpac': !0x0,
        'lineCol': 0xff00ff,
        'texturable': !0x0,
        'tool2': !0x0,
        'genGeo': async (bEl, bEm) => bEN(...bEl['size'], bEm),
        'stepSrc': 'a',
        'dummy': !0x1,
        'castShadow': !0x0,
        'receiveShadow': !0x0,
        'complex': !0x0
    },
    'SIGN': {
        'notTechnical': !0x0,
        'movingTexture': !0x0,
        'hasText': !0x0,
        'defaultSize': [0x28, 0.01, 0xa],
        'forceCollision': !0x0,
        'lineCol': 0xffff00,
        'scalable': !0x0,
        'scaleWithSize': !0x0,
        'hideBoundingBox': !0x1,
        'tool': !0x0,
        'genGeo': async bEl => function(bEl, bEm, bEn, bEp, bEq, bEr, bEs) {
            var bEt = new bEo['Geometry']();
            return bET(bEt, 0x0, 0x0, 0x0, bEq / 0x2, bEs / 0x2), bEt;
        }(bEl, 0x0, 0x0, 0x0, ...bEl['size']),
        'stepSrc': 'a',
        'dummy': !0x1,
        'castShadow': !0x0,
        'receiveShadow': !0x0,
        'doubleSide': !0x0
    },
    'DEPOSIT_BOX': {
        'canInterface': !0x0,
        'movingTexture': !0x0,
        'defaultSize': [0xa, 0xa, 0xa],
        'scalable': !0x0,
        'forceCollision': !0x0,
        'editAmb': !0x0,
        'scaleWithSize': !0x1,
        'editColor': !0x0,
        'editEmissive': !0x0,
        'editOpac': !0x0,
        'lineCol': 0xff00ff,
        'texturable': !0x0,
        'tool2': !0x0,
        'genGeo': async (bEl, bEm) => bEN(...bEl['size'], bEm),
        'stepSrc': 'a',
        'dummy': !0x1,
        'castShadow': !0x0,
        'receiveShadow': !0x0,
        'complex': !0x0,
        'hasBorder': !0x0
    },
    'LIGHT_CONE': {
        'notTechnical': !0x0,
        'defaultSize': [0xa, 0xa, 0xa],
        'scalable': !0x0,
        'noCollision': !0x0,
        'scaleWithSize': !0x1,
        'editOpac': !0x0,
        'editColor': !0x0,
        'lineCol': 0xff00ff,
        'tool2': !0x0,
        'genGeo': async (bEl, bEm) => function(bEl, bEm, bEn) {
            var bEp = bEq['generateCone'](bEl, bEm, bEn, {
                'scale': 0x1,
                'useScale': !0x0
            });
            return bEp = new bEo['BufferGeometry']()['fromGeometry'](bEp);
        }(...bEl['size'], bEm),
        'stepSrc': 'a',
        'dummy': !0x1,
        'castShadow': !0x0,
        'receiveShadow': !0x0,
        'complex': !0x0,
        'doubleSide': !0x0,
        'blending': bEo['AdditiveBlending']
    },
    'PLACEHOLDER': {
        'notStyleable': !0x0,
        'defaultSize': [0xa, 0xa, 0xa],
        'scalable': !0x0,
        'noTexture': !0x0,
        'noExport': !0x0,
        'tool': !0x0,
        'opacity': 0.1,
        'lineCol': 0x0,
        'genGeo': async (bEl, bEm) => bEN(...bEl['size'], bEm),
        'stepSrc': 'a'
    }
}, module['exports']['texturePrefabs'] = {
    'WALL': {
        'src': 'wall_0',
        'filter': bEo['NearestFilter']
    },
    'DIRT': {
        'src': 'dirt_0',
        'filter': bEo['NearestFilter']
    },
    'FLOOR': {
        'src': 'floor_0',
        'filter': bEo['NearestFilter']
    },
    'GRID': {
        'src': 'grid_0',
        'filter': bEo['NearestFilter']
    },
    'GREY': {
        'src': 'grey_0',
        'filter': bEo['NearestFilter']
    },
    'DEFAULT': {
        'src': 'default',
        'filter': bEo['NearestFilter']
    },
    'ROOF': {
        'src': 'roof_0',
        'filter': bEo['NearestFilter']
    },
    'FLAG': {
        'src': 'flag_0',
        'filter': bEo['NearestFilter']
    },
    'CHECK': {
        'src': 'check_0',
        'filter': bEo['NearestFilter']
    },
    'GRASS': {
        'src': 'grass_1',
        'filter': bEo['NearestFilter']
    },
    'LINES': {
        'src': 'lines_0',
        'filter': bEo['NearestFilter']
    },
    'BRICK': {
        'src': 'brick_0',
        'filter': bEo['NearestFilter']
    },
    'LINK': {
        'src': 'link_0',
        'trans': !0x0,
        'filter': bEo['NearestFilter']
    }
};
let bH6 = bEl => ({
    'src': bEl,
    'filter': bEo['NearestFilter']
});
module['exports']['loadTexturePrefab'] = function(bEm, require = null) {
    if (require['prefab']['hasText']) return (bEl => {
        var bEm = new bEo['Texture'](bEl);
        return bEm['wrapS'] = bEo['RepeatWrapping'], bEm['wrapT'] = bEo['RepeatWrapping'], bEm['repeat']['set'](0x1, 0x1), bEm['minFilter'] = bEo['NearestFilter'], bEm['magFilter'] = bEo['NearestFilter'], bEm['needsUpdate'] = !0x0, bEm;
    })(bEr['createCanvasText'](require['size'][0x0], require['size'][0x2], require['text'] || 'Hello World', require['fsize'] || 0xa, require['fcolor'] || '#000', require['bcolor'] || '#fff', !require['backVisible'], require['tAlign'] || 0x0));
    let bEq = 'BILLBOARD' == require['objType'] ? bH6('pubs/b_' + (require['poster'] || bEr['randInt'](0x1, bEp['billboardCnt']))) : module['exports']['texturePrefabs'][bEm];
    return bEq = 'FLAG' == require['objType'] ? bH6('zone_r') : bEq, 'default' == (bEq = 'LIGHT_CONE' == require['objType'] ? bH6('lightcone_0') : bEq)['src'] ? void 0x0 : bEt['load'](bEr['assetsUrl']('/textures/' + bEq['src'] + '.png'), bEl => {
        bEl['wrapS'] = bEo['RepeatWrapping'], bEl['wrapT'] = bEo['RepeatWrapping'], bEl['repeat']['set'](0x1, 0x1), bEl['minFilter'] = bEq['filter'], bEl['magFilter'] = bEq['filter'], bEl['needsUpdate'] = !0x0;
    });
};
