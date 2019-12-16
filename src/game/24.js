var brq = require("three");
const brr = require("./config.js");
require("./util.js");
var brs = {};
module['exports']['getColor'] = function(brn, bro) {
    var brp = brn + '-' + (bro || ''),
        brr = brs[brp];
    return brr || (brr = new brq['Color'](brn), bro && brr['multiplyScalar'](bro), brs[brp] = brr), brr;
}, module['exports']['colorize'] = function(bro, brp, brq) {
    brp = brq || module['exports']['getColor'](brp);
    for (var brr = 0x0; brr < bro['faces']['length']; ++brr) bro['faces'][brr]['vertexColors'][0x0] = brp, bro['faces'][brr]['vertexColors'][0x1] = brp, bro['faces'][brr]['vertexColors'][0x2] = brp;
};
var brB, brC = function(brn, bro, brp, brr) {
        for (var brs, brB = new brq['Vector2'](bro, brp)['multiplyScalar'](brr || 0x1), brC = 0x0; brC < brn['faceVertexUvs']['length']; brC++) {
            brs = brn['faceVertexUvs'][brC];
            for (var brD = 0x0; brD < brs['length']; brD++)
                for (var brE, brF = 0x0; 0x3 > brF; brF++)(brE = brs[brD][brF]['multiply'](brB))['x'] = 0.5 + brE['x'] - brB['x'] / 0x2;
        }
    },
    brD = function(brn, bro, brp, brq, brr, brs) {
        return brn >= brp - brr && brn <= brp + brr && bro >= brq - brs && bro <= brq + brs;
    },
    brE = [],
    brF = ['a', 'b', 'c', 'd'];
module['exports']['generatePlane'] = function(bro, brp, brs, brZ, bs0, bs1) {
    bro *= brs['ratio'] || 0x1;
    var bs2 = (brs['scale'] ? bro + '_' + brp + '_' : '') + (brs['scale'] || '') + (brs['tilesX'] || '') + (brs['tilesZ'] || '') + (brs['noise'] ? brZ + '_' + bs0 + '_' + bs1 : '') + (null == brs['colr'] ? '' : brs['colr']) + (brs['dark'] || '');
    if (!(brB = brE[bs2])) {
        if (brB = new brq['PlaneGeometry'](0x1, 0x1, brs['tilesX'] || 0x1, brs['tilesZ'] || 0x1), brs['noise']) {
            for (var bs3 = {}, bs4 = brs['margin'] || 0x0, bs5 = 0x0; bs5 < brB['vertices']['length']; ++bs5) {
                var bs6 = brB['vertices'][bs5]['x'],
                    bs7 = brB['vertices'][bs5]['y'];
                if (!brs['pinEdges'] || -0.5 != bs6 && 0.5 != bs6 && -0.5 != bs7 && 0.5 != bs7)
                    if (brs['objects']) {
                        for (var bs8 = 0x0; bs8 < brs['objects']['length']; ++bs8)
                            if (brs['objects'][bs8]['y'] - brs['objects'][bs8]['height'] <= bs0 + 0.1 && brs['objects'][bs8]['y'] + brs['objects'][bs8]['height'] > bs0 + brs['noise'] && brD(bs1 + -bs7 * bro * 0x2, brZ + bs6 * brp * 0x2, brs['objects'][bs8]['z'], brs['objects'][bs8]['x'], brs['objects'][bs8]['length'] + bs4, brs['objects'][bs8]['width'] + bs4)) {
                                brB['vertices'][bs5]['z'] = Math['random']() * brs['noise'] + 0x1, bs3[bs5] = module['exports']['getColor'](brs['colr'], 0.6);
                                break;
                            }
                    } else brB['vertices'][bs5]['z'] = Math['random']() * brs['noise'];
                bs3[bs5] || (bs3[bs5] = module['exports']['getColor'](brs['colr']));
            }
            for (bs5 = 0x0; bs5 < brB['faces']['length']; bs5++) {
                for (var bs9 = brB['faces'][bs5], bsa = 0x0, bsb = 0x0; 0x3 > bsb; bsb++) bs9['vertexColors'][bsb] = bs3[bs9[brF[bsb]]], 0x0 >= brB['vertices'][bs9[brF[bsb]]]['z'] && bsa++;
                0x3 <= bsa && delete brB['faces'][bs5];
            }
            brB['faces'] = brB['faces']['filter'](function(brn) {
                return brn;
            }), brB['elementsNeedUpdate'] = !0x0;
        } else module['exports']['colorize'](brB, null, module['exports']['getColor'](brs['colr'] || 0xffffff, brs['dark'] || 0x1));
        brs['scale'] && brC(brB, brp / brr['worldUV'], bro / brr['worldUV'], brs['scale']), brB['computeVertexNormals'](), brE[bs2] = brB;
    }
    return brB;
};
var bsd = [];
module['exports']['generateCube'] = function(bro, brp, brs, brD, brE) {
    bro = bro || [0x1, 0x1, 0x1, 0x1, 0x1, 0x1], brE['flipp'] = (brp > brs || brD > brs) && 'floor_0' == brE['src'], brE['flippW'] = brp > brD && 'floor_0' == brE['src'];
    for (var brF = (brE['scale'] ? brp + '_' + brs + '_' + brD + '_' : '') + (null == brE['colr'] ? '' : brE['colr']) + (brE['scale'] || '') + (brE['flippW'] ? 'flw' : 'fnw') + (brE['flipp'] ? 'fl' : 'fn') + (brE['amb'] || '') + (brE['fAmb'] || '') + (brE['useScale'] || ''), bsk = 0x0; bsk < bro['length']; ++bsk) brF += '_' + bro[bsk];
    if (!(brB = bsd[brF])) {
        brE['colr'] = null == brE['colr'] ? 0xffffff : brE['colr'];
        var bsl = module['exports']['getColor'](brE['colr']),
            bsm = brE['amb'] ? module['exports']['getColor'](brE['colr'], brE['amb']) : bsl;
        if (brE['fAmb']) {
            var bsn = bsl;
            bsl = bsm, bsm = bsn;
        }
        brB = new brq['Geometry']();
        var bso, bsp = [];
        bro[0x0] && ((bso = new brq['PlaneGeometry'](0x1, 0x1))['rotateY'](Math['PI'] / 0x2), brE['flipp'] && bso['rotateX'](Math['PI'] / 0x2), bso['translate'](0.5, 0.5, 0x0), bso['faces'][0x0]['vertexColors'] = [bsl, bsm, bsl], bso['faces'][0x1]['vertexColors'] = [bsm, bsm, bsl], brE['scale'] && brC(bso, (brE['flipp'] ? brs : brD) / brr['worldUV'], (brE['flipp'] ? brD : brs) / brr['worldUV'], brE['scale']), bsp['push'](bso)), bro[0x1] && ((bso = new brq['PlaneGeometry'](0x1, 0x1))['rotateY'](-Math['PI'] / 0x2), brE['flipp'] && bso['rotateX'](Math['PI'] / 0x2), bso['translate'](-0.5, 0.5, 0x0), bso['faces'][0x0]['vertexColors'] = [bsl, bsm, bsl], bso['faces'][0x1]['vertexColors'] = [bsm, bsm, bsl], brE['scale'] && brC(bso, (brE['flipp'] ? brs : brD) / brr['worldUV'], (brE['flipp'] ? brD : brs) / brr['worldUV'], brE['scale']), bsp['push'](bso)), bro[0x2] && ((bso = new brq['PlaneGeometry'](0x1, 0x1))['rotateX'](-Math['PI'] / 0x2), brE['flippW'] && bso['rotateY'](Math['PI'] / 0x2), bso['translate'](0x0, 0x1, 0x0), bso['faces'][0x0]['vertexColors'] = [bsl, bsl, bsl], bso['faces'][0x1]['vertexColors'] = [bsl, bsl, bsl], brE['scale'] && brC(bso, (brE['flippW'] ? brD : brp) / brr['worldUV'], (brE['flippW'] ? brp : brD) / brr['worldUV'], brE['scale']), bsp['push'](bso)), bro[0x3] && ((bso = new brq['PlaneGeometry'](0x1, 0x1))['rotateX'](Math['PI'] / 0x2), brE['flippW'] && bso['rotateY'](Math['PI'] / 0x2), bso['translate'](0x0, 0x0, 0x0), bso['faces'][0x0]['vertexColors'] = [bsm, bsm, bsm], bso['faces'][0x1]['vertexColors'] = [bsm, bsm, bsm], brE['scale'] && brC(bso, (brE['flippW'] ? brD : brp) / brr['worldUV'], (brE['flippW'] ? brp : brD) / brr['worldUV'], brE['scale']), bsp['push'](bso)), bro[0x4] && (bso = new brq['PlaneGeometry'](0x1, 0x1), brE['flipp'] && bso['rotateZ'](Math['PI'] / 0x2), bso['translate'](0x0, 0.5, 0.5), bso['faces'][0x0]['vertexColors'] = [bsl, bsm, bsl], bso['faces'][0x1]['vertexColors'] = [bsm, bsm, bsl], brE['scale'] && brC(bso, (brE['flipp'] ? brs : brp) / brr['worldUV'], (brE['flipp'] ? brp : brs) / brr['worldUV'], brE['scale']), bsp['push'](bso)), bro[0x5] && ((bso = new brq['PlaneGeometry'](0x1, 0x1))['rotateY'](Math['PI']), brE['flipp'] && bso['rotateZ'](Math['PI'] / 0x2), bso['translate'](0x0, 0.5, -0.5), bso['faces'][0x0]['vertexColors'] = [bsl, bsm, bsl], bso['faces'][0x1]['vertexColors'] = [bsm, bsm, bsl], brE['scale'] && brC(bso, (brE['flipp'] ? brs : brp) / brr['worldUV'], (brE['flipp'] ? brp : brs) / brr['worldUV'], brE['scale']), bsp['push'](bso));
        for (bsk = 0x0; bsk < bsp['length']; bsk++) brB['merge'](bsp[bsk], new brq['Matrix4']());
        brE && brE['useScale'] && (brB['scale'](brp, brs, brD), brB['translate'](0x0, -brs / 0x2, 0x0)), bsd[brF] = brB;
    }
    return brB;
};
var bsq = [];
module['exports']['generateCone'] = function(bro, brp, brr, brs) {
    var brC = (brs['scale'] ? bro + '_' + brp + '_' + brr + '_' : '') + (brs['scale'] || '') + (brs['useScale'] || '') + (null == brs['colr'] ? '' : brs['colr']) + (brs['dark'] || '');
    return (brB = bsq[brC]) || (brB = new brq['ConeGeometry'](Math['min'](bro, brr) / 0x2, brp, 0xc, 0xc, !0x0), brs && !brs['useScale'] && brB['translate'](0x0, brp / 0x2, 0x0), module['exports']['colorize'](brB, null, module['exports']['getColor'](brs['colr'] || 0xffffff, brs['dark'] || 0x1)), bsq[brC] = brB), brB;
};
