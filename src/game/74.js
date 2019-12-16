var cpL = require("three"),
    cpM = require("./util.js"),
    cpN = require("./24.js"),
    cpO = new cpL['Vector3'](),
    cpP = cpN['generateCube'](null, 0x1, 0x1, 0x1, {}),
    cpQ = function(cpI) {
        this['mesh'] = new cpL['Mesh'](cpP), this['init'] = function(cpJ) {
            this['dst'] = cpJ['dst'], this['spd'] = cpJ['spd'], this['xS'] = cpJ['xS'], this['zS'] = cpJ['zS'], this['yS'] = cpJ['yS'], this['scale'] = 0.45, this['len'] = 0x0, this['mesh']['material'] = cpI['getMat']('default', {
                'mat': cpL['MeshBasicMaterial'],
                'color': 0xededed,
                'transparent': !0x0,
                'opacity': 0.21
            });
            var cpK = cpJ['mesh']['position']['x'],
                cpM = cpJ['mesh']['position']['y'],
                cpN = cpJ['mesh']['position']['z'];
            cpI['moveMesh'](this['mesh'], cpK, cpM, cpN), this['mesh']['lookAt'](cpK + this['xS'], cpM + this['yS'], cpN + this['zS']), this['mesh']['rotateX'](Math['PI'] / 0x2), cpI['scaleMesh'](this['mesh'], this['scale'], this['len'], this['scale']), this['mesh']['visible'] = !0x0;
        }, this['update'] = function(cpJ) {
            this['mesh']['visible'] && (this['len'] < this['dst'] && (this['len'] += this['spd'] * cpJ, this['len'] >= this['dst'] && (this['len'] = this['dst'])), this['scale'] -= 0.00036 * cpJ, cpI['scaleMesh'](this['mesh'], this['scale'], this['len'], this['scale']), 0x0 >= this['scale'] && (this['scale'] = 0x0, this['mesh']['visible'] = !0x1));
        };
    };

function cpX() {
    cpL['Object3D']['call'](this), this['largeSpawnCount'] = 0x8, this['smallSpawnCount'] = 0xf, this['emissiveness'] = 0.55, this['velocityDamping'] = 0x3, this['lifeSpeedMin'] = 2.2, this['lifeSpeedRange'] = 0x3;
    var cpI = new cpL['Geometry']({
            'dynamic': !0x0
        }),
        cpJ = new cpL['Color'](0xbbbbbb);
    this['mesh'] = new cpL['Mesh'](cpI, new cpL['StrippedLambertMaterial']({
        'color': cpJ,
        'emissive': cpJ['multiplyScalar'](this['emissiveness']),
        'smoothShading': !0x0
    })), this['mesh']['castShadow'] = !0x0, this['mesh']['receiveShadow'] = !0x0, this['add'](this['mesh']), this['cubeTemplate'] = new cpL['BoxGeometry'](0x1, 0x1, 0x1);
    for (var cpK = 0x0; cpK < this['cubeTemplate']['faces']['length']; cpK++) this['cubeTemplate']['faces'][cpK]['materialIndex'] = 0x0;
    this['cubeTemplate']['faceVertexUvs'] = [
        []
    ], this['entities'] = [];
}
cpX['staticMatrix'] = new cpL['Matrix4'](), cpX['prototype'] = Object['create'](cpL['Object3D']['prototype']), Object['defineProperty'](cpX, 'finished', function() {
    return 0x0 === this['entities']['length'];
}), cpX['prototype']['explodeAt'] = function(cpI, cpJ, cpK, cpL) {
    this['sizeMin'] = 0.35 * cpL, this['sizeRange'] = 1.8 * cpL, this['velocityMin'] = 0x1e * cpL, this['velocityRange'] = 0x11 * cpL, cpO['set'](cpI, cpJ, cpK);
    for (var cpM = 0x0; cpM < this['largeSpawnCount']; cpM++) this['spawnEntity'](0.1 * Math['random']() + 0.9, cpO, !0x1);
    for (cpM = 0x0; cpM < this['smallSpawnCount']; cpM++) this['spawnEntity'](0.9 * Math['random'](), cpO, !0x1);
}, cpX['prototype']['spawnEntity'] = function(cpI, cpJ) {
    for (var cpK = Math['pow'](cpI, 2.5), cpL = cpK * this['sizeRange'] + this['sizeMin'], cpM = (0x1 - cpK) * this['velocityRange'] + this['velocityMin'], cpN = this['_randomVector']()['normalize']()['multiplyScalar'](cpM), cpO = cpK * this['lifeSpeedRange'] + this['lifeSpeedMin'], cpP = 0x0;;) {
        for (var cpQ = !0x0, cqf = 0x0; cqf < this['entities']['length']; cqf++)
            if (this['entities'][cqf]['index'] === cpP) {
                cpQ = !0x1;
                break;
            } if (cpQ) break;
        cpP++;
    }
    0x8 * cpP > this['mesh']['geometry']['vertices']['length'] - 0x1 && this['mesh']['geometry']['merge'](this['cubeTemplate'], cpX['emptyMatrix']), this['entities']['push']({
        'index': cpP,
        'rank': cpK,
        'rankSeed': cpI,
        'life': 0x0,
        'lifeSpeed': cpO,
        'size': cpL,
        'position': cpJ['clone'](),
        'velocity': cpN
    });
}, cpX['prototype']['destroyEntity'] = function(cpI) {
    this['entities']['splice'](this['entities']['indexOf'](cpI), 0x1);
    for (var cpJ = 0x8 * cpI['index']; cpJ < 0x8 * (cpI['index'] + 0x1); cpJ++) this['mesh']['geometry']['vertices'][cpJ]['set'](0x0, 0x0, 0x0);
    this['mesh']['geometry']['verticesNeedUpdate'] = !0x0, this['mesh']['geometry']['elementsNeedUpdate'] = !0x0, this['_cleanGeometry']();
}, cpX['prototype']['update'] = function(cpI) {
    cpI /= 0x3e8;
    for (var cpJ, cpK = 0x0; cpK < this['entities']['length']; cpK++) {
        (cpJ = this['entities'][cpK])['life'] += cpI * cpJ['lifeSpeed'], cpJ['velocity']['multiplyScalar'](0x1 - this['velocityDamping'] * cpI), cpJ['position']['add'](cpJ['velocity']['clone']()['multiplyScalar'](cpI));
        var cpL = 0x2 - Math['pow'](cpJ['life'] / Math['sqrt'](0x2), 0x2);
        cpL *= cpJ['size'];
        for (var cpM = 0x8 * cpJ['index']; cpM < 0x8 * (cpJ['index'] + 0x1); cpM++) {
            var cpN = this['mesh']['geometry']['vertices'][cpM],
                cpO = this['cubeTemplate']['vertices'][cpM % 0x8];
            cpN['set'](cpJ['position']['x'], cpJ['position']['y'], cpJ['position']['z'])['addScaledVector'](cpO, cpL);
        }
        0x0 >= cpL && this['destroyEntity'](cpJ);
    }
    this['mesh']['geometry']['verticesNeedUpdate'] = !0x0, this['mesh']['geometry']['elementsNeedUpdate'] = !0x0, this['mesh']['geometry']['computeBoundingSphere']();
}, cpX['prototype']['_cleanGeometry'] = function() {
    for (var cpI, cpJ = this['mesh']['geometry']['vertices'], cpK = this['mesh']['geometry']['faces'], cpL = -0x1, cpM = 0x0; cpM < this['entities']['length']; cpM++)(cpI = this['entities'][cpM])['index'] > cpL && (cpL = cpI['index']);
    var cpN = cpL + 0x1;
    cpJ['splice'](0x8 * cpN, cpJ['length'] - 0x8 * cpN), cpK['splice'](0xc * cpN, cpK['length'] - 0xc * cpN);
}, cpX['prototype']['_randomVector'] = function() {
    return new cpL['Vector3'](Math['random']() - 0.5, Math['random']() - 0.5, Math['random']() - 0.5);
};
var cqv = [{
        'mat': cpL['MeshBasicMaterial'],
        'snd': {
            'rng': 0x1a,
            'src': ['whizz_0', 'whizz_1'],
            'vol': 0.12
        },
        'spd': 1.7,
        'scale': 0x1,
        'length': 0xd,
        'color': 0xffffdb
    }, {
        'spd': [0.03, 0.031],
        'rand': !0x0,
        'carryV': !0x0,
        'grav': 0.0003,
        'spn': [0.04, 0.05],
        'scale': 0.15,
        'length': 0.5,
        'color': 0x9a7b3e
    }, {
        'spd': [0.03, 0.031],
        'rand': !0x0,
        'carryV': !0x0,
        'grav': 0.0003,
        'spn': [0.03, 0.05],
        'scale': 0.1,
        'length': 0.4,
        'color': 0x9a7b3e
    }],
    cqw = function(cpI) {
        this['mesh'] = new cpL['Mesh'](cpI['cubeGeo']), this['init'] = function(cpJ, cpK, cpN, cpO, cpP, cpQ, cpX, cqv) {
            this['dst'] = cpQ, this['scale'] = cpX['scale'], this['spd'] = cpX['spd'][0x1] ? cpM['randFloat'](cpX['spd'][0x0], cpX['spd'][0x1]) : cpX['spd'];
            var cqw = cpX && cpX['carryV'] && cqv;
            cpO -= Math['PI'], this['xS'] = this['spd'] * Math['sin'](cpO) * Math['cos'](cpP) + (cqw ? cqv['xVel'] : 0x0), this['zS'] = this['spd'] * Math['cos'](cpO) * Math['cos'](cpP) + (cqw ? cqv['zVel'] : 0x0), this['yS'] = this['spd'] * Math['sin'](cpP) + (cqw ? cqv['yVel'] : 0x0), this['grav'] = cpX['grav'], this['spin'] = cpX['spn'] ? cpX['spn'][0x1] ? cpM['randFloat'](cpX['spn'][0x0], cpX['spn'][0x1]) : cpX['spn'] : 0x0, this['mesh']['receiveShadow'] = cpX['mat'] != cpL['MeshBasicMaterial'], this['mesh']['material'] = cpI['getMat']('default', {
                'fog': cpX['mat'] != cpL['MeshBasicMaterial'],
                'color': cpX['color'],
                'emissive': cpX['emis'],
                'mat': cpX['mat']
            }), this['layer'] = cqv && cqv['isYou'] ? 0x1 : 0x0, this['sound'] = cqv && cqv['isYou'] ? null : cpX['snd'], this['soundPlayed'] = !0x1, this['mesh']['layers']['set'](this['layer']), cpI['moveMesh'](this['mesh'], cpJ, cpK, cpN), this['mesh']['lookAt'](cpJ + this['xS'], cpK + this['yS'], cpN + this['zS']), cpX && cpX['rand'] && this['mesh']['rotateX'](cpM['randFloat'](-Math['PI'], Math['PI'])), cpI['scaleMesh'](this['mesh'], cpX['scale'], cpX['scale'], cpX['length']);
        }, this['checkSound'] = function() {
            if (this['sound'] && !this['soundPlayed']) {
                var cpI = Howler['pos']();
                cpM['getD3D'](cpI[0x0], cpI[0x1], cpI[0x2], this['mesh']['position']['x'], this['mesh']['position']['y'], this['mesh']['position']['z']) <= this['sound']['rng'] && (SOUND['play'](this['sound']['src'][cpM['randInt'](0x0, this['sound']['src']['length'] - 0x1)], this['sound']['vol'], !0x1, cpM['randFloat'](0.8, 1.2)), this['soundPlayed'] = !0x0);
            }
        }, this['update'] = function(cpI) {
            this['mesh']['visible'] && (this['mesh']['position']['x'] += this['xS'] * cpI, this['mesh']['position']['z'] += this['zS'] * cpI, this['mesh']['position']['y'] += this['yS'] * cpI, this['spin'] && this['mesh']['rotateX'](this['spin'] * cpI), this['yS'] -= (this['grav'] || 0x0) * cpI, this['dst'] -= this['spd'] * cpI, this['checkSound'](), 0x0 >= this['dst'] && (this['mesh']['visible'] = !0x1));
        };
    };
cpL['Sprite']['prototype']['init'] = function(cpI, cpJ, cpK, cpL, cpM, cpN, cpO, cpP, cpQ, cpX) {
    this['position']['x'] = cpI, this['position']['y'] = cpJ, this['position']['z'] = cpK, this['xVel'] = cpL, this['yVel'] = cpM, this['zVel'] = cpN, this['scale']['x'] = this['scale']['y'] = cpO, this['life'] = cpP || 0x0, this['grav'] = cpQ || 0x0, this['area'] = cpX, this['updC'] = 0x0;
}, cpL['Sprite']['prototype']['update'] = function(cpI, cpJ, cpK) {
    if (this['area'] && (this['visible'] = cpJ && 0xa0 >= cpM['getD3D'](cpK ? cpK['x'] : 0x0, cpK ? cpK['y'] : 0x0, cpK ? cpK['z'] : 0x0, this['position']['x'], this['position']['y'], this['position']['z'])), this['visible'] || this['area']) {
        if (this['position']['x'] += this['xVel'] * cpI, this['position']['y'] += this['yVel'] * cpI, this['yVel'] -= this['grav'] * cpI, this['position']['z'] += this['zVel'] * cpI, this['area']) {
            var cpL = this['scale']['x'] / 0x2;
            this['position']['x'] - cpL >= this['area']['x'] + this['area']['w'] ? this['position']['x'] = this['area']['x'] - this['area']['w'] - cpL : this['position']['x'] + cpL <= this['area']['x'] - this['area']['w'] && (this['position']['x'] = this['area']['x'] + this['area']['w'] + cpL), this['position']['z'] - cpL >= this['area']['z'] + this['area']['l'] ? this['position']['z'] = this['area']['z'] - this['area']['l'] - cpL : this['position']['z'] + cpL <= this['area']['z'] - this['area']['l'] && (this['position']['z'] = this['area']['z'] + this['area']['l'] + cpL), this['position']['y'] - cpL >= this['area']['y'] + this['area']['h'] ? this['position']['y'] = this['area']['y'] - cpL : this['position']['y'] + cpL <= this['area']['y'] && (this['position']['y'] = this['area']['y'] + this['area']['h'] + cpL);
        }
        0x0 < this['life'] ? (this['life'] -= cpI, 0x0 >= this['life'] && this['updC'] && (this['visible'] = !0x1), this['updC']++) : 0x0 >= this['life'] && this['updC'] && (this['visible'] = !0x1);
    }
};
var cqX = [Math['PI'] / 0x3, -Math['PI'] / 0x3],
    cqY = [{
        'hole': !0x0,
        'count': 0x2,
        'grav': -0.00002,
        'scale': [0x5, 0x9],
        'speed': [0x0, 0.025],
        'spread': [-0.4, 0.4],
        'life': [0x12c, 0x1f4]
    }, {}, {
        'count': 0x1,
        'blending': 0x2,
        'scale': [0x5, 0x7],
        'speed': [0x0, 0x0],
        'spread': [0x0, 0x0],
        'life': [0x1e, 0x23]
    }, {
        'count': 0x1,
        'blending': 0x2,
        'scale': [0x7d0, 0x7d0],
        'speed': [0x0, 0x0],
        'spread': [0x0, 0x0]
    }, {
        'count': 0x4,
        'src': '0',
        'scale': [0x5, 0x6],
        'speed': [0x0, 0.01],
        'spread': [-0x1, 0x1],
        'life': [0x258, 0x320]
    }];
module['exports'] = function(cpI) {
    var cpJ, cpK, cpN;
    this['particles'] = [], this['trails'] = [], this['physObjs'] = [], this['areas'] = [], this['active'] = !0x0, this['ExplosionManager'] = new cpX(), this['prefabs'] = [{
        'src': 'glow_0',
        'blending': 0x1,
        'spd': 0.008,
        'cnt': 2.2,
        'grav': [-0.015, -0.005],
        'scl': [0.7, 0x1],
        'dir': 0x0
    }, {
        'src': 'glow_1',
        'blending': 0x1,
        'spd': 0.003,
        'cnt': 0x8,
        'grav': [-0.2, -0.22],
        'scl': [0x1, 1.5],
        'dir': 0x0
    }, {
        'src': 'fog_0',
        'blending': 0x1,
        'spd': 0.002,
        'cnt': 0x6,
        'grav': [0x0, 0x0],
        'scl': [0x19, 0x1e],
        'dir': 0x0
    }], this['addTrail'] = function(cpJ) {
        cpN = null;
        for (var cpK = 0x0; cpK < this['trails']['length']; ++cpK)
            if (!this['trails'][cpK]['mesh']['visible']) {
                cpN = this['trails'][cpK];
                break;
            } cpN || (cpN = new cpQ(cpI), this['trails']['push'](cpN), cpI['scene']['add'](cpN['mesh'])), cpN['init'](cpJ);
    }, this['area'] = function(cpI, cpJ, cpK, cpL, cpN, cpO, cpP, cpQ) {
        cpL /= 0x2, cpO /= 0x2, this['areas']['push']({
            'f': cpQ,
            'x': cpI,
            'y': cpJ,
            'z': cpK,
            'w': cpL,
            'h': cpN,
            'l': cpO
        });
        for (var cpX = 0x0; cpX < cpP['count']; ++cpX) this['add'](cpP['src'], cpI + cpM['randInt'](-cpL, cpL), cpJ + cpM['randInt'](0x0, cpN), cpK + cpM['randInt'](-cpO, cpO), cpP['spd'] * Math['sin'](cpP['dir']), cpP['grav'] ? cpM['randFloat'](cpP['grav'][0x0], cpP['grav'][0x1]) : 0x0, cpP['spd'] * Math['cos'](cpP['dir']), cpM['randFloat'](cpP['scl'][0x0], cpP['scl'][0x1]), 0x0, 0x0, cpP['blending'], this['areas'][this['areas']['length'] - 0x1]);
    }, this['effect'] = function(cpK, cpN, cpO, cpP, cpQ, cpX) {
        if (this['active'] && (0x0 == cpI['useDepthMap'] || '0' == cpI['useDepthMap'])) {
            cpJ = cqY[cpX];
            for (var cqv = 0x0; cqv < cpJ['count']; ++cqv) {
                var cqw = cpM['randFloat'](cpJ['speed'][0x0], cpJ['speed'][0x1]),
                    cqX = cpP + cpM['randFloat'](cpJ['spread'][0x0], cpJ['spread'][0x1]),
                    crn = cpQ + cpM['randFloat'](cpJ['spread'][0x0], cpJ['spread'][0x1]);
                this['add'](cpX, cpK, cpN, cpO, cqw * Math['sin'](cqX) * Math['cos'](crn), cqw * Math['sin'](crn), cqw * Math['cos'](cqX) * Math['cos'](crn), cpM['randFloat'](cpJ['scale'][0x0], cpJ['scale'][0x1]), cpJ['life'] ? cpM['randInt'](cpJ['life'][0x0], cpJ['life'][0x1]) : 0x0, cpJ['grav'], cpJ['blending'], null, cpJ['src']);
            }
            cpJ['hole'] && this['add'](0x1, cpK, cpN, cpO, 0x0, 0x0, 0x0, cpM['randFloat'](0.4, 0x1), 0x1388, 0x0, cpL['SubtractiveBlending']);
        }
    }, this['add'] = function(cpJ, cpM, cpN, cpO, cpP, cpQ, cpX, cqv, cqw, cqX, cqY, crz, crA) {
        cpK = null;
        for (var crB = 0x0; crB < this['particles']['length']; ++crB)
            if (!this['particles'][crB]['visible'] && !this['particles'][crB]['static']) {
                cpK = this['particles'][crB];
                break;
            } cpK || (cpK = new cpL['Sprite'](), this['particles']['push'](cpK), cpI['scene']['add'](cpK)), this['setMaterial'](cpK, crA || cpJ, cqY, !0x0), cpK['visible'] = !0x0, cpK['init'](cpM, cpN, cpO, cpP, cpQ, cpX, cqv, cqw, cqX, crz);
    }, this['setMaterial'] = function(cpJ, cpK, cpN, cpO) {
        cpJ['material'] = cpI['getMat']('particles/' + cpK, {
            'mat': cpL['SpriteMaterial'],
            'depthWrite': !0x1,
            'blending': cpN || cpL['NormalBlending'],
            'rotation': cpO ? cqX[cpM['randInt'](0x0, 0x2)] : 0x0
        });
    }, this['physObj'] = function(cpJ, cpL, cpM, cpN, cpO, cpP, cpQ, cpX, cqX, cqY, crQ) {
        if (0x0 == cpI['useDepthMap'] || '0' == cpI['useDepthMap']) {
            cpK = null;
            for (var crR = 0x0; crR < this['physObjs']['length']; ++crR)
                if (!this['physObjs'][crR]['mesh']['visible']) {
                    cpK = this['physObjs'][crR];
                    break;
                } cpK || (cpK = new cqw(cpI), this['physObjs']['push'](cpK), cpI['scene']['add'](cpK['mesh'])), cpK['sid'] = null == crQ ? null : crQ, cpK['mesh']['visible'] = !0x0, cpK['init'](cpJ, cpL, cpM, cpN, cpO, cpP, cqY || cqv[cpX], cqX), cpQ && this['showTrails'] && this['addTrail'](cpK);
        }
    }, this['disablePhys'] = function(cpI) {
        for (var cpJ = 0x0; cpJ < this['physObjs']['length']; ++cpJ) this['physObjs'][cpJ]['sid'] == cpI && (this['physObjs'][cpJ]['mesh']['visible'] = !0x1);
    }, this['update'] = function(cpI, cpJ) {
        if (cpJ && cpJ['active'])
            for (var cpK = 0x0; cpK < this['areas']['length']; ++cpK) this['areas'][cpK]['f'] && (this['areas'][cpK]['x'] = cpJ['x'], this['areas'][cpK]['y'] = cpJ['y'], this['areas'][cpK]['z'] = cpJ['z']);
        for (cpK = 0x0; cpK < this['trails']['length']; ++cpK) this['trails'][cpK]['update'](cpI);
        for (cpK = 0x0; cpK < this['particles']['length']; ++cpK) this['particles'][cpK]['update'](cpI, this['active'], cpJ);
        for (cpK = 0x0; cpK < this['physObjs']['length']; ++cpK) this['physObjs'][cpK]['update'](cpI);
        this['ExplosionManager']['update'](cpI);
    }, this['reset'] = function() {
        this['particles']['length'] = 0x0, this['trails']['length'] = 0x0, this['physObjs']['length'] = 0x0, this['areas']['length'] = 0x0;
    };
};
