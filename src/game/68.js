var c2V, c2W, c2X = 0x0,
    c2Y = function(c2S) {
        this['sid'] = c2X++, this['uid'] = c2S['uid'], this['width'] = c2S['w'], this['length'] = c2S['l'], this['height'] = c2S['h'], this['active'] = !c2S['startClosed'], this['x'] = c2S['x'], this['orgX'] = this['x'], this['y'] = c2S['y'], this['orgY'] = this['y'], this['z'] = c2S['z'], this['orgZ'] = this['z'], this['dir'] = c2S['d'], this['src'] = c2S['src'], this['ramp'] = c2S['ramp'], this['ladder'] = c2S['ladder'], this['jumpPad'] = c2S['jumpPad'], this['noShoot'] = c2S['noShoot'], this['stepSrc'] = c2S['s'], this['score'] = c2S['score'], this['scoreP'] = c2S['scoreP'], this['kill'] = c2S['kill'], this['dummy'] = c2S['dummy'], this['noVis'] = c2S['noVis'], this['complexMesh'] = c2S['complexMesh'], this['penetrable'] = c2S['penetrable'], this['health'] = c2S['health'], this['startHealth'] = c2S['health'], this['transparent'] = c2S['transparent'], this['boost'] = c2S['boost'], this['boostDr'] = c2S['boostDr'], this['aoMlt'] = c2S['aoM'], this['team'] = c2S['team'], this['flag'] = c2S['flag'], this['trigger'] = c2S['trigger'], this['pickup'] = c2S['pickup'], this['orgPickup'] = c2S['orgPickup'], this['pickupRep'] = c2S['pickupRep'], this['meshRef'] = c2S['meshRef'], this['checkpoint'] = c2S['checkpoint'], this['singleUse'] = c2S['singleUse'], this['isBorder'] = c2S['isBorder'], this['node'] = c2S['node'], this['channel'] = c2S['channel'], this['teleporter'] = c2S['teleporter'], this['telCooldown'] = 0x0, this['propID'] = c2S['propID'], this['telStopMo'] = c2S['momentum'], this['noAmb'] = c2S['noAmb'], this['tRadius'] = c2S['tRadius'], this['gate'] = c2S['gate'], this['noMsg'] = c2S['noMsg'], this['method'] = c2S['method'], this['closeable'] = c2S['closeable'], this['startClosed'] = c2S['startClosed'], this['triggerEvent'] = c2S['event'], this['triggerAction'] = c2S['action'], this['triggerConstant'] = c2S['constant'], c2S['eventN'] && (this[c2S['eventN']] = !0x0), this['classIndx'] = c2S['classIndx'], c2S['respawnT'] = 0x0 != c2S['respawnT'] && 0x64 > c2S['respawnT'] ? 0x64 : c2S['respawnT'], this['respawnT'] = c2S['respawnT'], this['respawnR'] = c2S['respawnR'], this['respawnTStart'] = c2S['respawnT'], this['canRespawn'] = !(!c2S['respawnR'] && !c2S['respawnT']), this['skill'] = c2S['skill'], this['hpMlt'] = c2S['hpMlt'], this['destroyedBy'] = null, this['interface'] = c2S['interface'], this['interfaceT'] = c2S['interfaceT'], this['deposited'] = 0x0, this['withdrawAmnt'] = c2S['withdraw'], this['depositAmnt'] = c2S['deposit'], this['bank'] = c2S['bank'];
    };
module['exports']['manager'] = function(c2S, c2T, c2X) {
    var c33, c34;
    c2S && (c2V = require("./38.js")['prefabs'], c2W = require("three")), this['aoOpac'] = 0x0, this['objects'] = [], this['objectives'] = [], this['flags'] = [], this['pickups'] = [], this['gates'] = [], this['banks'] = [], this['interfaces'] = [], this['teleporters'] = [], this['collision'] = function(c2S, c2T, c2U) {
        return c2S['x'] - c2S['width'] - c2U <= c2T['x'] + c2T['width'] && c2S['x'] + c2S['width'] + c2U >= c2T['x'] - c2T['width'] && c2S['z'] - c2S['length'] - c2U <= c2T['z'] + c2T['length'] && c2S['z'] + c2S['length'] + c2U >= c2T['z'] - c2T['length'] && c2S['y'] - c2S['height'] - c2U <= c2T['y'] + c2T['height'] && c2S['y'] + c2S['height'] + c2U >= c2T['y'] - c2T['height'];
    }, this['checkPos'] = function(c2S, c2U, c2V, c2W, c2X) {
        for (var c2Y = 0x0; c2Y < this['objects']['length']; ++c2Y)
            if (this['objects'][c2Y] != c2W && this['objects'][c2Y] != c2X && !this['objects'][c2Y]['ramp'] && c2T['pointInBox3D'](c2S, c2U, c2V, this['objects'][c2Y])) return !0x1;
        return !0x0;
    }, this['findByUid'] = function(c2S, c2T) {
        c33 = c2T || this['objects'];
        for (var c2U = 0x0; c2U < c33['length']; ++c2U)
            if (c33[c2U]['uid'] === c2S) return c33[c2U];
        return null;
    }, this['findBySid'] = function(c2S, c2T) {
        c33 = c2T || this['objects'];
        for (var c2U = 0x0; c2U < c33['length']; ++c2U)
            if (c33[c2U]['sid'] === c2S) return c33[c2U];
        return null;
    }, this['addCylinder'] = function(c2T, c2U, c2V, c2W, c2X, c2Y) {
        c2S && (c2Y['shadows'] = !0x0, c2S['addCylinder'](c2T, c2U, c2V, c2W, c2X, c2Y));
    }, this['getZoneDat'] = function(c2S, c2T) {
        return {
            'src': 'zone_r',
            'texSrc': 'zone_' + (c2T && c2S == c2T['team'] ? 'b' : 'r'),
            'noGroup': !0x0,
            'mat': c2W['MeshBasicMaterial'],
            'transparent': !0x0,
            'depthWrite': !0x1,
            'side': 0x2
        };
    }, this['getFlagDat'] = function(c2S, c2T) {
        var c2U = c2T && c2S == c2T['team'] ? '1' : '0';
        return {
            'src': 'crystal_0',
            'texSrc': 'crystal_' + c2U,
            'noGroup': !0x0,
            'noShadow': !0x0,
            'noFog': !0x0,
            'emissive': '0' == c2U ? 0x853434 : 0x428a9d
        };
    }, this['addFlag'] = function(c2T, c2U, c2V, c2W) {
        var c33 = null;
        c2S && ((c33 = c2S['loadMesh'](this['getFlagDat'](c2W), c2T, c2U + c2X['flagOff'], c2V, 0x0, c2X['flagScale'], c2S['scene']))['layers']['set'](0x2), c33['zoneMesh'] = c2S['addCube'](c2T, c2U, c2V, c2X['flagZoneS'], c2X['flagZoneH'], c2X['flagZoneS'], [0x1, 0x1, 0x0, 0x0, 0x1, 0x1], this['getZoneDat'](c2W)));
        var c34 = new c2Y({
            'uid': this['objects']['length'],
            'meshRef': c33,
            'x': c2T,
            'z': c2V,
            'y': c2U + c2X['flagScale'] / 0x2 + c2X['flagOff'],
            'w': c2X['flagScale'],
            'l': c2X['flagScale'],
            'h': c2X['flagScale'] / 0x2,
            'team': c2W,
            'flag': !0x0,
            'noShoot': !0x0,
            'complexMesh': !0x0
        });
        this['flags']['push'](c34), this['objects']['push'](c34);
        var c3B = new c2Y({
            'x': c2T,
            'z': c2V,
            'y': c2U + c2X['flagZoneH'] / 0x2,
            'w': c2X['flagZoneS'] / 0x2,
            'l': c2X['flagZoneS'] / 0x2,
            'h': c2X['flagZoneH'] / 0x2,
            'team': c2W,
            'trigger': !0x0,
            'noShoot': !0x0,
            'complexMesh': !0x0
        });
        c3B['flagObj'] = c34, this['objects']['push'](c3B);
    }, this['addWeapon'] = function(c2T, c2U, c2V, c33, c34, c3H, c3I) {
        c33 = c33 || {};
        var c3J = null;
        c2S && ((c3J = c2S['loadMesh']({
            'src': 'weapons/' + c33['weapon']['src'],
            'texSrc': 'weapons/' + c33['weapon']['src'],
            'tFilter': c2W['LinearFilter'],
            'noGroup': !0x0,
            'uv2': !0x0,
            'noShadow': !0x0,
            'shininess': c33['weapon']['shine'] || 0x3c,
            'specular': 0x292929,
            'transparent': c33['weapon']['seeThrough'],
            'emissive': c33['weapon']['transp'] ? 0xffffff : null
        }, c2T, c2U + c2X['pickupOff'], c2V, 0x0, c33['weapon']['scale'], c2S['scene']))['rotateY'](c34 || 0x0), c3J['rotateX']((c3H || 0x0) - Math['PI'] / 0x2), c3J['rotateZ'](c3I || 0x0));
        var c3K = new c2Y({
            'uid': this['objects']['length'],
            'meshRef': c3J,
            'x': c2T,
            'z': c2V,
            'y': c2U + c2X['pickupZoneH'] / 0x2,
            'w': c2X['pickupZoneX'],
            'l': c2X['pickupZoneZ'],
            'h': 0x2 * c2X['pickupZoneH'],
            'pickup': c33['weaponId'],
            'pickupRep': !c33['noRep'],
            'orgPickup': c33['weaponId'],
            'scoreP': c33['scoreP'],
            'noMsg': c33['noMsg'],
            'method': c33['method'],
            'trigger': !0x0,
            'noShoot': !0x0,
            'complexMesh': !0x0
        });
        this['pickups']['push'](c3K), this['objects']['push'](c3K);
    }, this['addObjective'] = function(c2T, c2U, c2V, c2X, c2Y, c33) {
        var c34;
        c2S && ((c34 = c2S['addCube'](c2T, c2U, c2V, c2X, c33, c2Y, [0x1, 0x1, 0x0, 0x0, 0x1, 0x1], {
            'src': 'objective_0',
            'noGroup': !0x0,
            'mat': c2W['MeshBasicMaterial'],
            'transparent': !0x0,
            'depthWrite': !0x1,
            'side': 0x2
        }))['visible'] = !0x1), this['objectives']['push']({
            'x': c2T,
            'z': c2V,
            'y': c2U + c33 / 0x2,
            'mesh': c34,
            'width': c2X / 0x2,
            'length': c2Y / 0x2,
            'height': c33 / 0x2
        });
    }, this['addDeathZone'] = function(c2S, c2T, c2U, c2V, c2W, c2X) {
        this['objects']['push'](new c2Y({
            'x': c2S,
            'z': c2U,
            'y': c2T + c2X / 0x2,
            'w': c2V / 0x2,
            'l': c2W / 0x2,
            'h': c2X / 0x2,
            'kill': !0x0,
            'noShoot': !0x0,
            'complexMesh': !0x0
        }));
    }, this['addScoreZone'] = function(c2S, c2T, c2U, c2V, c2W, c2X, c33) {
        this['objects']['push'](new c2Y({
            'x': c2S,
            'z': c2U,
            'y': c2T + c2X / 0x2,
            'w': c2V / 0x2,
            'l': c2W / 0x2,
            'h': c2X / 0x2,
            'score': !0x0,
            'scoreP': c33,
            'noShoot': !0x0,
            'complexMesh': !0x0
        }));
    }, this['addCheckPoint'] = function(c2S, c2T, c2U, c2V, c2W, c2X, c33, c34) {
        this['objects']['push'](new c2Y({
            'x': c2S,
            'z': c2U,
            'y': c2T + c2X / 0x2,
            'w': c2V / 0x2,
            'l': c2W / 0x2,
            'h': c2X / 0x2,
            'd': parseInt(c34) || 0x0,
            'checkpoint': !0x0,
            'singleUse': c33,
            'noShoot': !0x0,
            'complexMesh': !0x0
        }));
    }, this['addTeleporter'] = function(c2S, c2T, c2U, c2V, c2W, c2X, c33, c34, c4l) {
        var c4m = new c2Y({
            'uid': this['objects']['length'],
            'x': c2S,
            'z': c2U,
            'y': c2T + c2X / 0x2,
            'w': c2V / 0x2,
            'l': c2W / 0x2,
            'h': c2X / 0x2,
            'teleporter': !0x0,
            'channel': c33 || 0x0,
            'node': c34 || 0x0,
            'momentum': c4l,
            'noShoot': !0x0,
            'complexMesh': !0x0
        });
        this['objects']['push'](c4m), this['teleporters']['push'](c4m);
    }, this['addGrass'] = function(c2T, c2U, c2V, c2X, c2Y, c33, c34) {
        c34 = c34 || {}, c2S && !c34['noVis'] && (c34['side'] = c2W['DoubleSide'], c34['transparent'] = !0x0, c34['alphaTest'] = 0.2, c34['vertexColors'] = c2W['VertexColors'], c34['shadowsR'] = !0x0, c34['noGroup'] = !!c34['health'], c2S['addGrass'](c2T, c2U, c2V, c2X, c2Y, c33, c34));
    }, this['addLadder'] = function(c2U, c2V, c34, c4x, c4y, c4z, c4A, c4B) {
        var c4C = c2X['ladderScale'],
            c4D = c2X['ladderScale'];
        if (0x0 == c4y || c4y == Math['PI'] ? c4D = c2X['ladderWidth'] : c4C = c2X['ladderWidth'], c33 = new c2Y({
                'ladder': !0x0,
                'complexMesh': !0x0,
                'noShoot': !0x0,
                'd': c4y,
                'x': c2U + c2X['ladderScale'] * Math['cos'](c4y),
                'z': c34 + c2X['ladderScale'] * Math['sin'](c4y),
                'y': c2V,
                'w': c4C,
                'l': c4D,
                'h': c4x
            }), this['objects']['push'](c33), c2S && !c4z) {
            var c4E = {
                'src': c4A || 'floor_0',
                'vertexColors': c2W['VertexColors'],
                'colr': c4B,
                'scale': 0.02,
                'amb': c2X['ambientVal'],
                'shadows': !0x0
            };
            c2S['addCube'](c33['x'] + c2X['ladderWidth'] * Math['sin'](c4y), c33['y'], c33['z'] + c2X['ladderWidth'] * Math['cos'](c4y), 0x2 * c2X['ladderScale'], c4x + 0x2, 0x2 * c2X['ladderScale'], [0x1, 0x1, 0x1, 0x1, 0x1, 0x1], c4E), c2S['addCube'](c33['x'] - c2X['ladderWidth'] * Math['sin'](c4y), c33['y'], c33['z'] - c2X['ladderWidth'] * Math['cos'](c4y), 0x2 * c2X['ladderScale'], c4x + 0x2, 0x2 * c2X['ladderScale'], [0x1, 0x1, 0x1, 0x1, 0x1, 0x1], c4E);
            for (var c4F = Math['floor'](c4x / 0x6), c4G = 0x0; c4G < c4F; ++c4G) c4E['dark'] = 0.6 + c4G / c4F * 0.4, c2S['addPlane'](c33['x'], c2V + 0x6 * (c4G + 0x1) + c2T['randFloat'](-0x1, 0x1), c33['z'], c2X['ladderWidth'], c2X['ladderScale'], c4E, -c4y + Math['PI'] / 0x2, Math['PI'] / 0x2, c2T['randFloat'](-0.1, 0.1));
        }
    }, this['addRamp'] = function(c2T, c2U, c2V, c33, c34, c4M, c4N, c4O, c4P, c4Q, c4R, c4S, c4T, c4U, c4V, c4W) {
        var c4X = 0x0 != c4N && c4N != Math['PI'],
            c4Y = (c4X ? c4M : c33) / 0x2,
            c4Z = Math['sqrt'](c34 * c34 + c4M * c4M),
            c50 = Math['asin'](c34 / c4Z);
        if (this['objects']['push'](new c2Y({
                'x': c2T,
                'z': c2V,
                'y': c2U + c34 / 0x2,
                'w': c33 / 0x2,
                'l': c4M / 0x2,
                'h': c34 / 0x2,
                'd': c4N,
                'noShoot': !0x0,
                'complexMesh': !0x0,
                'boostDr': c4O ? c50 : null,
                'boost': c4O || null,
                'ramp': {
                    'sX': c2T - c4Y * Math['cos'](c4N),
                    'sZ': c2V - c4Y * Math['sin'](c4N),
                    'eX': c2T + c4Y * Math['cos'](c4N),
                    'eZ': c2V + c4Y * Math['sin'](c4N)
                },
                'noAmb': c4V
            })), c2S && !c4Q) {
            var c51 = {
                'src': c4P || 'default',
                'vertexColors': c2W['VertexColors'],
                'colr': c4R,
                'scale': 0x1,
                'shadowsR': !0x0,
                'side': c2W['DoubleSide'],
                'movT': c4T,
                'movD': c4U,
                'emissive': c4W
            };
            if (c51['transparent'] = 'link_0' == c51['src'], 'link_0' == c51['src'] && (c51['depthWrite'] = !0x0, c51['alphaTest'] = c51['transparent'] ? 0.02 : 0x0), c2S['addRamp'](c2T, c2U, c2V, c4X ? c33 : c4M, c34, (c4X ? c4M : c33) / 0x2, c4N, c51), !c4V) {
                c2U += c2X['ambOff'];
                var c52 = (c4X ? c33 : c4M) / 0x2 - c4S;
                c4X ? c33 = 0x2 * c4S : c4M = 0x2 * c4S;
                for (var c53, c54 = 0x0; 0x2 > c54; ++c54) c53 = c54 ? 0x1 : -0x1, c2S['addRamp'](c2T + c52 * c53 * Math['cos'](c4N + Math['PI'] / 0x2), c2U, c2V + c52 * c53 * Math['sin'](c4N + Math['PI'] / 0x2), c4X ? c33 : c4M, c34, (c4X ? c4M : c33) / 0x2, c4N, {
                    'src': 'ambient_1',
                    'euler': 'ZYX',
                    'depthWrite': !0x1,
                    'transparent': !0x0,
                    'side': c2W['DoubleSide']
                }, c54 ? 0x0 : Math['PI']);
            }
        }
    }, this['addGate'] = function(c2T, c2U, c2V, c2X, c33, c34, c5b) {
        (c5b = c5b || {})['src'] = c5b['src'] || 'wall_0';
        var c5c = new c2Y({
            'x': c2T,
            'z': c2V,
            'y': c2U + c34 / 0x2,
            'w': c2X / 0x2,
            'l': c33 / 0x2,
            'h': c34 / 0x2,
            'uid': this['objects']['length'],
            'src': c5b['src'],
            'noVis': c5b['noVis'],
            'noAmb': c5b['noAmb'],
            'transparent': c5b['transparent'],
            'penetrable': c5b['penetrable'],
            'isBorder': c5b['isBorder'],
            'complexMesh': c5b['xR'] || c5b['yR'] || c5b['zR'] || 'link_0' == c5b['src'],
            'ter': !0x0,
            'tRadius': 0x7,
            'gate': !0x0,
            'scoreP': c5b['scoreP'],
            'noMsg': c5b['noMsg'],
            'method': c5b['method'],
            'closeable': c5b['closeable'],
            'startClosed': c5b['startClosed'] && c5b['closeable'],
            'interface': c5b['interface']
        });
        if (c5b['interface'] && this['interfaces']['push'](c5c['uid']), c2S && !c5b['noVis']) {
            c5b['transparent'] = 'link_0' == c5b['src'] || 0x1 != c5b['opacity'], 'link_0' == c5b['src'] && (c5b['depthWrite'] = 0x1 == c5b['opacity'], c5b['alphaTest'] = c5b['transparent'] ? 0.02 : 0x0), c5b['vertexColors'] = c2W['VertexColors'], c5b['scale'] = null == c5b['scale'] ? 0x1 : c5b['scale'], c5b['shadows'] = !c5b['shadowsR'] && 0x1 == c5b['opacity'], c5b['noGroup'] = !0x0;
            var c5d = c2S['addCube'](c2T, c2U, c2V, c2X, c34, c33, [0x1, 0x1, 0x1, 0x1, 0x1, 0x1], c5b);
            c5c['meshRef'] = c5d;
        }
        this['objects']['push'](c5c), this['gates']['push'](c5c);
    }, this['addBank'] = function(c2T, c2U, c2V, c2X, c33, c34, c5k) {
        (c5k = c5k || {})['src'] = c5k['src'] || 'wall_0';
        var c5l = new c2Y({
            'x': c2T,
            'z': c2V,
            'y': c2U + c34 / 0x2,
            'w': c2X / 0x2,
            'l': c33 / 0x2,
            'h': c34 / 0x2,
            'uid': this['objects']['length'],
            'src': c5k['src'],
            'noVis': c5k['noVis'],
            'noAmb': c5k['noAmb'],
            'transparent': c5k['transparent'],
            'penetrable': c5k['penetrable'],
            'isBorder': c5k['isBorder'],
            'complexMesh': c5k['xR'] || c5k['yR'] || c5k['zR'] || 'link_0' == c5k['src'],
            'ter': !0x0,
            'tRadius': 0x7,
            'bank': !0x0,
            'interface': c5k['interface'],
            'withdraw': Math['abs'](c5k['withdraw']),
            'deposit': Math['abs'](c5k['deposit'])
        });
        c5k['interface'] && this['interfaces']['push'](c5l['uid']), c2S && !c5k['noVis'] && (c5k['transparent'] = 'link_0' == c5k['src'] || 0x1 != c5k['opacity'], 'link_0' == c5k['src'] && (c5k['depthWrite'] = 0x1 == c5k['opacity'], c5k['alphaTest'] = c5k['transparent'] ? 0.02 : 0x0), c5k['vertexColors'] = c2W['VertexColors'], c5k['scale'] = null == c5k['scale'] ? 0x1 : c5k['scale'], c5k['shadows'] = !c5k['shadowsR'] && 0x1 == c5k['opacity'], c2S['addCube'](c2T, c2U, c2V, c2X, c34, c33, [0x1, 0x1, 0x1, 0x1, 0x1, 0x1], c5k)), this['objects']['push'](c5l), this['banks']['push'](c5l);
    }, this['addTrigger'] = function(c2T, c2U, c2V, c2X, c33, c34, c5s) {
        (c5s = c5s || {})['src'] = c5s['src'] || 'wall_0';
        var c5t = new c2Y({
            'x': c2T,
            'z': c2V,
            'y': c2U + c34 / 0x2,
            'w': c2X / 0x2,
            'l': c33 / 0x2,
            'h': c34 / 0x2,
            'uid': this['objects']['length'],
            'src': c5s['src'],
            'noVis': c5s['noVis'],
            'noAmb': c5s['noAmb'],
            'health': c5s['health'],
            'respawnT': c5s['respawnT'],
            'respawnR': c5s['respawnR'],
            'transparent': c5s['transparent'],
            'complexMesh': c5s['xR'] || c5s['yR'] || c5s['zR'] || 'link_0' == c5s['src'],
            'ter': !0x0,
            'constant': c5s['constant'],
            'eventN': c5s['eventN'],
            'event': c5s['event'],
            'action': c5s['action'],
            'interface': c5s['interface'],
            'interfaceT': c5s['interfaceT']
        });
        if (c5s['interface'] && this['interfaces']['push'](c5t['uid']), c2S && !c5s['noVis']) {
            c5s['transparent'] = 'link_0' == c5s['src'] || 0x1 != c5s['opacity'], 'link_0' == c5s['src'] && (c5s['depthWrite'] = 0x1 == c5s['opacity'], c5s['alphaTest'] = c5s['transparent'] ? 0.02 : 0x0), c5s['vertexColors'] = c2W['VertexColors'], c5s['scale'] = null == c5s['scale'] ? 0x1 : c5s['scale'], c5s['shadows'] = !c5s['shadowsR'] && 0x1 == c5s['opacity'], c5s['noGroup'] = !!c5s['health'];
            var c5u = c2S['addCube'](c2T, c2U, c2V, c2X, c34, c33, [0x1, 0x1, 0x1, 0x1, 0x1, 0x1], c5s);
            c5s['health'] && !c5s['noCol'] && (c5t['meshRef'] = c5u);
        }
        this['objects']['push'](c5t);
    }, this['addAI'] = function(c2S, c2T, c2U, c2V, c2W) {
        c2V = c2V || {};
        var c2X = new c2Y({
            'x': c2S,
            'z': c2U,
            'y': c2T + h / 0x2,
            'w': 0x5,
            'l': 0x5,
            'h': 0xa,
            'd': c2W,
            'uid': this['objects']['length'],
            'classIndx': c2V['classIndx'],
            'respawnT': c2V['respawnT'],
            'respawnR': c2V['respawnR'],
            'skill': c2V['skill'],
            'hpMlt': c2V['hpMlt']
        });
        this['objects']['push'](c2X);
    }, this['addLightCone'] = function(c2T, c2U, c2V, c2X, c2Y, c33, c34) {
        (c34 = c34 || {})['src'] = 'lightcone_0', c2S && !c34['noVis'] && (c34['depthWrite'] = !0x1, c34['scale'] = null == c34['scale'] ? 0x1 : c34['scale'], c34['shadows'] = !0x1, c34['side'] = c2W['DoubleSide'], c34['blending'] = c2W['AdditiveBlending'], c34['mat'] = c2W['MeshBasicMaterial'], c34['vertexColors'] = c2W['VertexColors'], c2S['addCone'](c2T, c2U, c2V, c2X, c33, c2Y, c34));
    }, this['addBlock'] = function(c2T, c2U, c2V, c2X, c33, c34, c5O, c5P) {
        if ((c5P = c5P || {})['src'] = c5P['src'] || 'wall_0', c5P['noCol'] || this['objects']['push'](new c2Y({
                'x': c2T,
                'z': c2V,
                'y': c2U + c34 / 0x2,
                'w': c2X / 0x2,
                'l': c33 / 0x2,
                'h': c34 / 0x2,
                'uid': this['objects']['length'],
                's': c5P['sound'],
                'src': c5P['src'],
                'noVis': c5P['noVis'],
                'noAmb': c5P['noAmb'],
                'health': c5P['health'],
                'respawnT': c5P['respawnT'],
                'respawnR': c5P['respawnR'],
                'transparent': c5P['transparent'],
                'penetrable': c5P['penetrable'],
                'isBorder': c5P['isBorder'],
                'complexMesh': c5P['xR'] || c5P['yR'] || c5P['zR'] || 'link_0' == c5P['src'],
                'ter': !0x0,
                'trigger': c5P['trig'],
                'interface': c5P['interface']
            })), c5P['interface'] && this['interfaces']['push'](this['objects']['length'] - 0x1), c2S && !c5P['noVis']) {
            c5P['transparent'] = 'link_0' == c5P['src'] || 0x1 != c5P['opacity'], 'link_0' == c5P['src'] && (c5P['depthWrite'] = 0x1 == c5P['opacity'], c5P['alphaTest'] = c5P['transparent'] ? 0.02 : 0x0), c5P['vertexColors'] = c2W['VertexColors'], c5P['scale'] = null == c5P['scale'] ? 0x1 : c5P['scale'], c5P['shadows'] = !c5P['shadowsR'] && 0x1 == c5P['opacity'], c5P['noGroup'] = !!c5P['health'];
            var c5Q = c2S['addCube'](c2T, c2U, c2V, c2X, c34, c33, c5O, c5P);
            c5P['health'] && !c5P['noCol'] && (this['objects'][this['objects']['length'] - 0x1]['meshRef'] = c5Q);
        }
    }, this['addCanvas'] = function(c2U, c2V, c2X, c2Y, c33, c34, c5X, c5Y, c5Z) {
        c34 = c34 || {}, c2S && (c34['canvas'] = c2T['createCanvasText'](0x2 * c33, 0x2 * c2Y, c34['text'] || 'Hello World', c34['fontSize'] || 0xa, c34['fcolr'] || '#000', c34['bcolr'] || '#fff', c34['noBVis'], c34['tAlign'] || 0x0), c34['transparent'] = !0x0, c34['depthWrite'] = !0x0, c34['alphaTest'] = 0.02, c34['side'] = c2W['DoubleSide'], c2S['addPlane'](c2U, c2V, c2X, c33, c2Y, c34, c5X, (c5Y || 0x0) + Math['PI'] / 0x2, c5Z));
    }, this['addMesh'] = function(c2U, c33, c34, c63, c64, c65, c66, c67) {
        if (c33 += c65, (c67 = c67 || {})['noCol'] || this['objects']['push'](new c2Y({
                'complexMesh': !!c2V && c2V[c67['src']['toUpperCase']()]['complex'],
                'aoM': c2V && c2V[c67['src']['toUpperCase']()]['aoMlt'] || 0x0,
                'propID': 0x0 <= c2X['propsH']['indexOf'](c67['src']) ? c67['src'] : null,
                'x': c2U,
                'z': c34,
                'y': c33,
                'w': c64,
                'l': c66,
                'h': c65,
                'uid': this['objects']['length'],
                'ter': !0x0,
                'noVis': c67['noVis'],
                'noAmb': c67['noAmb'],
                'health': c67['health'],
                'respawnT': c67['respawnT'],
                'respawnR': c67['respawnR']
            })), c2V && c2V[c67['src']['toUpperCase']()]['transparent'] && (c33 += c2T['randFloat'](-0.01, 0.01)), c2S && !c67['noVis']) {
            var c68 = c2S['loadMesh']({
                'src': c67['src'] + '_0',
                'emissive': c2V[c67['src']['toUpperCase']()]['emiss'] ? 0xffffff : null,
                'side': c2V[c67['src']['toUpperCase']()]['doubleSide'] ? c2W['DoubleSide'] : c2W['FrontSide'],
                'transparent': c2V[c67['src']['toUpperCase']()]['transparent'],
                'shadows': c2V[c67['src']['toUpperCase']()]['castShadow'],
                'shadowsR': c2V[c67['src']['toUpperCase']()]['receiveShadow'],
                'vertexColors': c2W['VertexColors'],
                'color': c67['colr'] || 0xffffff,
                'noGroup': !!c67['health']
            }, c2U, c33, c34, c63, c2X[c67['src'] + 'Scale'], c2S['scene'], !c67['health']);
            c67['health'] && !c67['noCol'] && (this['objects'][this['objects']['length'] - 0x1]['meshRef'] = c68);
        }
    };
    var c69 = [];
    this['addNoisePlanes'] = function() {
        for (var c2T = 0x0; c2T < c69['length']; ++c2T) c69[c2T][0x5]['objects'] = this['objects'], c2S['addPlane'](...c69[c2T]);
        c69['length'] = 0x0;
    }, this['addPlane'] = function(c2T, c2U, c2V, c2X, c33, c34, c6h, c6i, c6j) {
        if ((c34 = c34 || {})['noCol'] || this['objects']['push'](new c2Y({
                'x': c2T,
                'z': c2V,
                'y': c2U,
                'w': c33,
                'l': c2X,
                'h': 0x0,
                's': c34['sound'],
                'health': c34['health'],
                'respawnT': c34['respawnT'],
                'respawnR': c34['respawnR'],
                'transparent': c34['transparent'],
                'penetrable': c34['penetrable'],
                'noVis': c34['noVis'],
                'noAmb': c34['noAmb']
            })), c2S && !c34['noVis']) {
            c34['transparent'] = !0x0, c34['side'] = c2W['DoubleSide'], c34['vertexColors'] = c2W['VertexColors'], c34['noise'] && (c34['pinEdges'] = !0x0, c34['margin'] = 0x5, c34['tilesX'] = Math['round'](c33 / 0x5), c34['tilesZ'] = Math['round'](c2X / 0x5));
            var c6k = [c2T, c2U, c2V, c33, c2X, c34, c6h, (c6i || 0x0) + Math['PI'] / 0x2, c6j];
            if (!c34['noise']) return c2S['addPlane'](...c6k);
            c69['push'](c6k);
        }
    }, this['pointInObjs'] = function(c2S, c2U, c2V) {
        for (var c2W = 0x0; c2W < this['objects']['length']; ++c2W)
            if (!(c33 = this['objects'][c2W])['noVis'] && !c33['complexMesh'] && !c33['health'] && 0x0 > c2U['indexOf'](c33['sid']) && c2T['pointInBox3D'](c2S[0x0], c2S[0x1], c2S[0x2], c33, c2V || 0x0)) return !0x0;
        return !0x1;
    }, this['setMaxAO'] = function(c2S, c2T, c2U) {
        c2S['maxAOS'] = c2S['maxAOS'] || {}, c2S['maxAOS'][c2T['sid']] = Math['max'](c2U, c2S['maxAOS'][c2T['sid']] || 0x0), c2T['maxAOS'] = c2T['maxAOS'] || {}, c2T['maxAOS'][c2S['sid']] = Math['max'](c2U, c2T['maxAOS'][c2S['sid']] || 0x0);
    }, this['aosToAdd'] = {}, this['addAmbient'] = function(c2S, c2U, c2V, c2W, c2Y, c33, c34, c69, c6A, c6B, c6C) {
        var c6D = !c6B;
        if (c6B)
            for (var c6E = 0x0; c6E < c6B['length']; ++c6E)
                if (c2T['pointInBox3D'](c2S, c2U, c2V, c6B[c6E], 0x2 * c2X['ambOff'])) {
                    c6D = !0x0;
                    break;
                } if (c6D)
            if (c6B) {
                var c6F = c6B[0x0]['sid'] + '-' + c6B[0x1]['sid'];
                this['aosToAdd'][c6F] || (this['aosToAdd'][c6F] = []), this['aosToAdd'][c6F]['push']({
                    'vals': [c2S, c2U, c2V, c2W, c2Y, c33, c34 + c2X['ambOff'], c69 + c2X['ambOff'], c6A],
                    'group': c6C
                });
            } else this['addPlane'](c2S, c2U, c2V, c34, c69, {
                'src': 'ambient_' + (c6A || 0x0),
                'euler': 'ZYX',
                'depthWrite': !0x1,
                'noCol': !0x0
            }, c2W, c2Y, c33);
    };
    var c6G = [
        ['g6-1-2', 'g4-1-2'],
        ['g5-1-2', 'g4-0-1'],
        ['g6-0-1', 'g3-1-2'],
        ['g5-0-1', 'g3-0-1'],
        ['g6-0-3', 'g2-0-3'],
        ['g5-0-3', 'g2-1-1'],
        ['g6-1-1', 'g1-0-3'],
        ['g5-1-1', 'g1-1-1'],
        ['g6-0-2', 'g1-1-0'],
        ['g5-0-2', 'g1-0-2'],
        ['g6-1-0', 'g2-1-0'],
        ['g5-1-0', 'g2-0-2'],
        ['g4-0-2', 'g1-0-0'],
        ['g3-0-2', 'g1-1-3'],
        ['g4-1-0', 'g2-0-0'],
        ['g3-1-0', 'g2-1-3'],
        ['g4-0-3', 'g2-1-2'],
        ['g3-0-3', 'g2-0-1'],
        ['g4-1-1', 'g1-1-2'],
        ['g3-1-1', 'g1-0-1'],
        ['g6-1-3', 'g3-0-0'],
        ['g5-1-3', 'g3-1-3'],
        ['g6-0-0', 'g4-0-0'],
        ['g5-0-0', 'g4-1-3']
    ];
    this['groupsMatch'] = function(c2S, c2T) {
        for (var c2U = 0x0; c2U < c6G['length']; ++c2U)
            if (0x0 <= c6G[c2U]['indexOf'](c2S) && 0x0 <= c6G[c2U]['indexOf'](c2T)) return !0x0;
        return !0x1;
    }, this['clearAOGroup'] = function(c2S) {
        for (var c2T = c2S['length'] - 0x1; 0x0 <= c2T; --c2T) {
            c33 = c2S[c2T];
            for (var c2U = c2S['length'] - 0x1; 0x0 <= c2U; --c2U)
                if (c34 = c2S[c2U], !c33['dontAdd'] && !c34['dontAdd'] && c33 != c34 && this['groupsMatch'](c33['group'], c34['group'])) {
                    c33['vals'][0x6] + c33['vals'][0x7] >= c34['vals'][0x6] + c34['vals'][0x7] ? c34['dontAdd'] = !0x0 : c33['dontAdd'] = !0x0;
                    break;
                }
        }
    }, this['addPendingAOs'] = function() {
        for (var c2S in this['aosToAdd'])
            if (this['aosToAdd']['hasOwnProperty'](c2S)) {
                this['clearAOGroup'](this['aosToAdd'][c2S]);
                for (var c2T = 0x0; c2T < this['aosToAdd'][c2S]['length']; ++c2T) this['aosToAdd'][c2S][c2T]['dontAdd'] || this['addAmbient'](...this['aosToAdd'][c2S][c2T]['vals']);
            } this['aosToAdd'] = {};
    }, this['limitAmb'] = function(c2S, c2U, c2V, c2W, c2X, c2Y, c33) {
        var c34 = [c2T['cdv'][c2W]],
            c69 = [c2T['cdv'][c2X]];
        return c2S = c2V == -Math['PI'] / 0x2 || c2V == Math['PI'] + Math['PI'] / 0x2 ? Math['min'](c2S, (c2U[c2X] - Math['min'](c2Y[c2X] - c2Y[c69], c33[c2X] - c33[c69])) / 0x2) : c2V == Math['PI'] / 0x2 ? Math['min'](c2S, (Math['max'](c2Y[c2X] + c2Y[c69], c33[c2X] + c33[c69]) - c2U[c2X]) / 0x2) : 0x0 == c2V ? Math['min'](c2S, (Math['max'](c2Y[c2W] + c2Y[c34], c33[c2W] + c33[c34]) - c2U[c2W]) / 0x2) : Math['min'](c2S, (c2U[c2W] - Math['min'](c2Y[c2W] - c2Y[c34], c33[c2W] - c33[c34])) / 0x2);
    }, this['resetAll'] = function() {
        this['aosToAdd'] = {};
        for (var c2T = 0x0; c2T < this['objects']['length']; ++c2T) this['objects'][c2T]['active'] = !this['objects'][c2T]['startClosed'], this['objects'][c2T]['startHealth'] && (this['objects'][c2T]['health'] = this['objects'][c2T]['startHealth']), this['objects'][c2T]['meshRef'] && (this['objects'][c2T]['meshRef']['visible'] = !this['objects'][c2T]['startClosed']);
        c2S && c2S['updateShadowMap']();
    }, this['removeAll'] = function() {
        this['objects']['length'] = 0x0, this['objectives']['length'] = 0x0, this['flags']['length'] = 0x0, this['pickups']['length'] = 0x0, this['teleporters']['length'] = 0x0;
    };
};
