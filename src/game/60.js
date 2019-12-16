const bWV = require("./color.js");
const bWW = require("three");
const bWX = require("./util.js");
const bWY = 0x20;
var bWZ, bX0;
const bX1 = true;
const bX2 = 'y';
const bX3 = [{
          'stp': 0x0,
          'col': null
      }, {
          'stp': 0.5,
          'col': null
      }, {
          'stp': 0x1,
          'col': null
      }];
const bX4 = 2.5;
const bX5 = 1000;
class bX6 extends bWW['Object3D'] {
    static['fromConfig'](bWS, bWT) {
        return new bX6(bWS['zoneSize'], bWS['zoneSpeed'], bWS['zoneCol0'], bWS['zoneCol1'], bWS['zoneCol2'], bWT);
    }
    constructor(bWS, bWT, bWU, bX5, bX6, bXe) {
        if (super(), this['_size'] = bWS || 0x32, this['_shrink'] = bX4 * (bWT || 0x1), bXe) {
            bWZ || (bWZ = new bWW['TextureLoader']()['load'](bWX['assetsUrl']('/textures/zone_0.png'), bWS => {
                bWS['wrapS'] = bWW['RepeatWrapping'], bWS['wrapT'] = bWW['RepeatWrapping'], bWS['minFilter'] = bWW['NearestFilter'], bWS['magFilter'] = bWW['NearestFilter'], bWS['repeat']['set'](0x14, 0x14), bWS['needsUpdate'] = !0x0;
            })), bX0 || (bX0 = new bWW['MeshBasicMaterial']({
                'color': 0xffffff,
                'depthWrite': !0x1,
                'flatShading': !0x1,
                'map': bWZ,
                'vertexColors': bWW['VertexColors'],
                'side': bWW['DoubleSide'],
                'transparent': !0x0,
                'opacity': 0.5
            })), bX3[0x0]['col'] = new bWW['Color'](bWU || bWV['zones']['BR'][0x0]), bX3[0x1]['col'] = new bWW['Color'](bX5 || bWV['zone']['BR'][0x1]), bX3[0x2]['col'] = new bWW['Color'](bX6 || bWV['zone']['BR'][0x2]);
            let bWS = new bWW['SphereGeometry'](0x1, bWY, bWY);
            bWS['computeBoundingBox']();
            let bWT = bWS['boundingBox'],
                bX4 = new bWW['Vector3']()['subVectors'](bWT['max'], bWT['min']),
                bXe = ['a', 'b', 'c'],
                bXk = new bWW['Vector3'](),
                bXl = 0x0;
            for (let bWU, bWV = 0x0; bWV < bX3['length'] - 0x1; bWV++) {
                bWU = bX3[bWV + 0x1]['stp'] - bX3[bWV]['stp'];
                for (let bWW, bWX = 0x0; bWX < bWS['faces']['length']; bWX++) {
                    bWW = bWS['faces'][bWX];
                    for (var bXq = 0x0; 0x3 > bXq; bXq++) bXl = bXk['subVectors'](bWS['vertices'][bWW[bXe[bXq]]], bWT['min'])['divide'](bX4)[bX2], bX1 && (bXl = 0x1 - bXl), bXl >= bX3[bWV]['stp'] && bXl <= bX3[bWV + 0x1]['stp'] && (bWW['vertexColors'][bXq] = bX3[bWV]['col']['clone']()['lerp'](bX3[bWV + 0x1]['col'], (bXl - bX3[bWV]['stp']) / bWU));
                }
            }
            bWS['computeVertexNormals'](!0x0), bWS['computeFaceNormals'](), this['baseMesh'] = new bWW['Mesh'](bWS, bX0);
        }
        this['reset'](), bXe && this['add'](this['baseMesh']);
    } ['shrink']() {
        0x0 >= this['scale']['x'] ? this['visible'] = !0x1 : (this['scale']['x'] -= this['_shrink'], this['scale']['z'] -= this['_shrink']);
    } ['animate'](bWS) {
        this['baseMesh'] && this['baseMesh']['material']['map'] && (this['baseMesh']['material']['map']['offset']['y'] += 0.00003 * bWS);
    } ['update'](bWS) {
        this['scale']['set'](bWS['x'], bX5, bWS['z']), 0x0 >= this['scale']['x'] && (this['visible'] = !0x1);
    } ['reset']() {
        this['scale']['set'](this['_size'], bX5, this['_size']), this['visible'] = !0x0;
    } ['isOutside'](bWS) {
        return bWX['getDistance'](bWS['x'], bWS['z'], this['position']['x'], this['position']['z']) > this['scale']['x'];
    }
}
module['exports'] = bX6;
