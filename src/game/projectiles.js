var cy4 = require("./util.js"),
    cy5 = require("./config.js"),
    cy6 = function() {
        this['init'] = function(cy1, cy2, cy3, cy4, cy5, cy6, cyd, cye) {
            this['x'] = cy1, this['y'] = cy2, this['z'] = cy3, cy4 -= Math['PI'], this['xD'] = cy4, this['yD'] = cy5, this['spd'] = cy6['spd'], this['range'] = cy6['range'], this['dmg'] = cy6['dmg'], this['owner'] = cyd, this['weaponId'] = cye['weaponId'], this['weapon'] = cye['weapon'], this['skipMove'] = !0x0, this['expl'] = cy6['explode'], this['xS'] = this['spd'] * Math['sin'](cy4) * Math['cos'](cy5), this['zS'] = this['spd'] * Math['cos'](cy4) * Math['cos'](cy5), this['yS'] = this['spd'] * Math['sin'](cy5), this['active'] = !0x0;
        }, this['update'] = function(cy1) {
            this['active'] && (this['skipMove'] ? this['skipMove'] = !0x1 : (this['x'] += this['xS'] * cy1, this['z'] += this['zS'] * cy1, this['y'] += this['yS'] * cy1, this['range'] -= this['spd'] * cy1, 0x0 >= this['range'] && (this['active'] = !0x1)));
        };
    };
module['exports'] = function(cy1, cy2) {
    var cyi, cyj, cyk = cy2 ? {} : require("three"),
        cyl = [];
    this['projectiles'] = [], this['types'] = [{
        'mat': cyk['MeshBasicMaterial'],
        'color': 0xffffdb,
        'explode': 0x23,
        'dmg': 0x3c,
        'spd': 0.5,
        'scale': 1.4,
        'length': 0xa,
        'range': 0x258
    }, {
        'mat': cyk['MeshBasicMaterial'],
        'color': 0xffffdb,
        'dmg': 0xc8,
        'spd': 0.68,
        'scale': 0.7,
        'length': 0xa,
        'range': 0x3e8
    }], this['update'] = function(cy3) {
        for (var cy6 = 0x0; cy6 < this['projectiles']['length']; ++cy6)
            if ((cyi = this['projectiles'][cy6])['active']) {
                if (cyi['update'](cy3), cyi['active']) {
                    cyl['length'] = 0x0;
                    for (var cyk = 0x1 / (cyi['spd'] * cy3 * Math['sin'](cyi['xD']) * Math['cos'](cyi['yD'])), cyp = 0x1 / (cyi['spd'] * cy3 * Math['cos'](cyi['xD']) * Math['cos'](cyi['yD'])), cyq = 0x1 / (cyi['spd'] * cy3 * Math['sin'](cyi['yD'])), cyr = 0x0; cyr < cy1['map']['manager']['objects']['length']; ++cyr) !(cyj = cy1['map']['manager']['objects'][cyr])['noShoot'] && cyj['active'] && (tmpDst = cy4['lineInRect'](cyi['x'], cyi['z'], cyi['y'], cyk, cyp, cyq, cyj['x'] - cyj['width'], cyj['z'] - cyj['length'], cyj['y'] - cyj['height'], cyj['x'] + cyj['width'], cyj['z'] + cyj['length'], cyj['y'] + cyj['height']), tmpDst && 0x1 >= tmpDst && cyl['push']({
                        'obj': cyj,
                        'dst': tmpDst
                    }));
                    for (cyr = 0x0; cyr < cy1['players']['list']['length']; ++cyr)(cyj = cy1['players']['list'][cyr])['active'] && cyj != cyi['owner'] && (tmpDst = cy4['lineInRect'](cyi['x'], cyi['z'], cyi['y'], cyk, cyp, cyq, cyj['x'] - cyj['scale'] - cy5['hitBoxPad'], cyj['z'] - cyj['scale'] - cy5['hitBoxPad'], cyj['y'], cyj['x'] + cyj['scale'] + cy5['hitBoxPad'], cyj['z'] + cyj['scale'] + cy5['hitBoxPad'], cyj['y'] + cyj['height'] + cy5['hitBoxPad']), tmpDst && 0x1 >= tmpDst && cyl['push']({
                        'plr': !0x0,
                        'obj': cyj,
                        'dst': tmpDst
                    }));
                    var cys = cy1['map']['terrain'];
                    if (cys) {
                        var cyt = cys['raycast'](cyi['x'], -cyi['z'], cyi['y'], 0x1 / cyk, -0x1 / cyp, 0x1 / cyq);
                        if (cyt) {
                            let cy1 = cy4['getD3D'](cyi['x'], cyi['y'], cyi['z'], cyt['x'], cyt['z'], -cyt['y']);
                            cyl['push']({
                                'dst': cy1 / cyi['range']
                            });
                        }
                    }
                    cyl['length'] && (cyl['sort'](cy4['orderByNum']), cyl[0x0] && (cy2 && !cy1['waitTimers'] && cyl[0x0]['obj'] && cyl[0x0]['obj']['health'] && !cyl[0x0]['plr'] && (cyl[0x0]['obj']['health'] -= cyi['dmg'], cy2['send'](cyi['owner']['id'], '4'), 0x0 >= cyl[0x0]['obj']['health'] && (cyl[0x0]['obj']['active'] = !0x1, cyl[0x0]['obj']['health'] = 0x0, cyl[0x0]['obj']['destroyedBy'] = cyi['owner'], cy1['destObjs']['push'](cyl[0x0]['obj']['uid']), cy2['broadcast']('game' + cy1['sid'], 'do', cyl[0x0]['obj']['uid']), cyl[0x0]['obj'] && cyl[0x0]['obj']['onDestroy'] && cy1['onTrigger'](cyi['owner'], cyl[0x0]['obj'])), cyl[0x0]['obj'] && (cyl[0x0]['obj']['onShoot'] || cyl[0x0]['obj']['onDamage']) && cy1['onTrigger'](cyi['owner'], cyl[0x0]['obj'])), cyl[0x0]['obj'] && cyl[0x0]['plr'] && cy1['players']['changeHealth'](cyl[0x0]['obj'], cyi['owner'], cyi['dmg']) && cy1['players']['kill'](cyl[0x0]['obj'], cyi['owner'], {
                        'weaponId': cyi['weaponId'],
                        'weapon': cyi['weapon']
                    }), cyi['x'] += cyl[0x0]['dst'] * (cyi['xS'] * cy3), cyi['y'] += cyl[0x0]['dst'] * (cyi['yS'] * cy3), cyi['z'] += cyl[0x0]['dst'] * (cyi['zS'] * cy3)), cyi['active'] = !0x1);
                }
                if (!cyi['active']) {
                    cyi['expl'] && cy1['explosion'](cyi['x'], cyi['y'], cyi['z'], cyi['expl'], cyi['dmg'], cyi['owner'], {
                        'weaponId': cyi['weaponId'],
                        'weapon': cyi['weapon']
                    });
                    for (cyr = 0x0; cyr < cy1['players']['list']['length']; ++cyr) cy2['send'](cy1['players']['list'][cyr]['id'], 'pre', cyi['sid']);
                }
            }
    }, this['init'] = function(cy3, cy4, cy5, cyj, cyk, cyl, cyB, cyC) {
        cy3 = cy3['round'](0x1), cy4 = cy4['round'](0x1), cy5 = cy5['round'](0x1), cyj = cyj['round'](0x3), cyk = cyk['round'](0x3), cyi = null;
        for (var cyD = 0x0; cyD < this['projectiles']['length']; ++cyD)
            if (!this['projectiles'][cyD]['active']) {
                cyi = this['projectiles'][cyD];
                break;
            } if (cyi || ((cyi = new cy6())['sid'] = this['projectiles']['length'], this['projectiles']['push'](cyi)), cyi['init'](cy3, cy4, cy5, cyj, cyk, this['types'][cyl], cyB, cyC), cy2)
            for (cyD = 0x0; cyD < cy1['players']['list']['length']; ++cyD)(cy1['players']['list'][cyD]['active'] || cy1['players']['list'][cyD]['spectating']) && cy2['send'](cy1['players']['list'][cyD]['id'], 'pr', cy3, cy4, cy5, cyj, cyk, cyl, cyi['sid']);
    };
};
