const bTb = require("./color.js"),
    bTc = require("three"),
    bTd = new bTc['MeshBasicMaterial']({
        'color': 0xffffff,
        'flatShading': !0x1,
        'vertexColors': bTc['VertexColors'],
        'side': bTc['BackSide']
    }),
    bTe = 0x20,
    bTf = !0x0,
    bTg = 'y',
    bTh = [{
        'stp': 0x0,
        'col': null
    }, {
        'stp': 0.5,
        'col': null
    }, {
        'stp': 0x1,
        'col': null
    }];
class bTi extends bTc['Object3D'] {
    static['fromConfig'](bT8) {
        return new bTi(bT8['skyDomeCol0'], bT8['skyDomeCol1'], bT8['skyDomeCol2']);
    }
    constructor(bT8, bT9, bTa) {
        super(), bTh[0x0]['col'] = new bTc['Color'](bT8 || bTb['skyDome'][0x0]), bTh[0x1]['col'] = new bTc['Color'](bT9 || bTb['skyDome'][0x1]), bTh[0x2]['col'] = new bTc['Color'](bTa || bTb['skyDome'][0x2]);
        let bTi = new bTc['SphereGeometry'](0x32, bTe, bTe);
        bTi['computeBoundingBox']();
        let bTo = bTi['boundingBox'],
            bTp = new bTc['Vector3']()['subVectors'](bTo['max'], bTo['min']),
            bTq = ['a', 'b', 'c'],
            bTr = new bTc['Vector3'](),
            bTs = 0x0;
        for (let bT8, bT9 = 0x0; bT9 < bTh['length'] - 0x1; bT9++) {
            bT8 = bTh[bT9 + 0x1]['stp'] - bTh[bT9]['stp'];
            for (let bTa, bTb = 0x0; bTb < bTi['faces']['length']; bTb++) {
                bTa = bTi['faces'][bTb];
                for (var bTx = 0x0; 0x3 > bTx; bTx++) bTs = bTr['subVectors'](bTi['vertices'][bTa[bTq[bTx]]], bTo['min'])['divide'](bTp)[bTg], bTf && (bTs = 0x1 - bTs), bTs >= bTh[bT9]['stp'] && bTs <= bTh[bT9 + 0x1]['stp'] && (bTa['vertexColors'][bTx] = bTh[bT9]['col']['clone']()['lerp'](bTh[bT9 + 0x1]['col'], (bTs - bTh[bT9]['stp']) / bT8));
            }
        }
        bTi['computeVertexNormals'](!0x0), bTi['computeFaceNormals'](), this['baseMesh'] = new bTc['Mesh'](bTi, bTd), this['baseMesh']['doubleSided'] = !0x1, this['add'](this['baseMesh']);
    }
}
module['exports'] = bTi;
