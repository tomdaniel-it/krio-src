const bTB = require("three"),
    bTC = (require("./util.js"), require("./66.js")),
    bTD = require("./67.js")['easing'];
let bTE, bTF = 'undefined' != typeof location;
bTF && (bTE = new bTB['StrippedLambertMaterial']({
    'color': 0x8c8c8c,
    'flatShading': !0x1,
    'vertexColors': bTB['VertexColors']
}));
const bTG = {
        'GRASS': 0x0,
        'MOUNTAIN': 0x1
    },
    bTH = Object['keys'](bTG)['length'],
    bTI = {
        [bTG['GRASS']]: [0x38, 0xe2, 0x66],
        [bTG['MOUNTAIN']]: [0xa0, 0xa0, 0xa0]
    },
    bTJ = {
        'DIRT': [0x8c, 0x68, 0x35],
        'GRASS': [0x9b, 0xba, 0x2e],
        'MOUNTAIN': [0xa0, 0xa0, 0xa0]
    },
    bTK = bTy => bTy['replace'](/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (bTy, bTz, bTA, bTB) => '#' + bTz + bTz + bTA + bTA + bTB + bTB)['substring'](0x1)['match'](/.{2}/g)['map'](bTy => parseInt(bTy, 0x10)),
    bTL = 0x3c,
    bTM = 0x3;
class bTT extends bTB['Object3D'] {
    static['fromConfig'](bTy) {
        return new bTT(bTy['terrainSeed'], bTy['terrainWidth'], bTy['terrainHeight'], bTy['sizeMlt'], bTy['terrainMntMlt'], bTy['terrainDrtCol'], bTy['terrainGrsCol'], bTy['terrainMntCol']);
    }
    constructor(bTy, bTz, bTA, bTD, bTG, bTI, bTT, bU2) {
        super(), bTD = bTM, this['sizeMlt'] = bTD, this['sizeX'] = bTz, this['sizeY'] = bTA, this['edgeSize'] = 0x1f4, this['mntMlt'] = bTG, bTJ['DIRT'] = bTK(bTI), bTJ['MOUNTAIN'] = bTK(bU2), bTJ['GRASS'] = bTK(bTT), this['simplex'] = new bTC(bTy);
        let bU3 = Math['floor'](bTz / bTL),
            bU4 = Math['floor'](bTA / bTL);
        this['xSegmentCount'] = bU3, this['ySegmentCount'] = bU4;
        let bU5 = bTz / bU3,
            bU6 = bTA / bU4;
        this['xSegmentSize'] = bU5, this['ySegmentSize'] = bU6;
        let bU7 = new bTB['BufferGeometry'](),
            bU8 = bU3 * bU4 * 0x6,
            bU9 = new bTB['BufferAttribute'](new Float32Array(0x3 * bU8), 0x3);
        bU7['addAttribute']('position', bU9);
        let bUa = new bTB['BufferAttribute'](new Uint8Array(0x3 * bU8), 0x3, !0x0);
        bU7['addAttribute']('color', bUa), this['vertPositions'] = bU9, this['terrainPoints'] = (bU3 + 0x1) * (bU4 + 0x1), this['terrainHeights'] = new Float32Array(this['terrainPoints']), this['terrainBiomes'] = new Float32Array(this['terrainPoints'] * bTH);
        for (let bTy = 0x0; bTy < bU3 + 0x1; bTy++)
            for (let bTB = 0x0; bTB < bU4 + 0x1; bTB++) {
                let bTC = bTy + bTB * (bU3 + 0x1),
                    bTD = this['_vertPos'](bTy, bU5, bTz),
                    bTE = this['_vertPos'](bTB, bU6, bTA),
                    [bTF, bTG] = this['evaluate'](bTD, bTE);
                this['terrainHeights'][bTC] = bTF, this['terrainBiomes']['set'](bTG, bTC * bTH);
            }
        for (let bTy = 0x0; bTy < bU3; bTy++)
            for (let bTB = 0x0; bTB < bU4; bTB++) {
                let bTC = 0x6 * (bTy + bTB * bU3),
                    bTD = this['_vertPos'](bTy, bU5, bTz),
                    bTE = this['_vertPos'](bTB, bU6, bTA),
                    bTF = [bTD, bTE, this['terrainHeight'](bTy, bTB)],
                    bTG = [bTD + bU5, bTE, this['terrainHeight'](bTy + 0x1, bTB)],
                    bTH = [bTD + bU5, bTE + bU6, this['terrainHeight'](bTy + 0x1, bTB + 0x1)],
                    bTI = [bTD, bTE + bU6, this['terrainHeight'](bTy, bTB + 0x1)],
                    bTJ = this['calcAOWeight'](bTy, bTB),
                    bTK = this['calcAOWeight'](bTy + 0x1, bTB),
                    bTL = this['calcAOWeight'](bTy + 0x1, bTB + 0x1),
                    bTM = this['calcAOWeight'](bTy, bTB + 0x1);
                bU9['setXYZ'](bTC, ...bTF), bU9['setXYZ'](bTC + 0x1, ...bTG), bU9['setXYZ'](bTC + 0x2, ...bTH), bU9['setXYZ'](bTC + 0x3, ...bTH), bU9['setXYZ'](bTC + 0x4, ...bTI), bU9['setXYZ'](bTC + 0x5, ...bTF);
                let bTT = this['_centroid3D'](bTF, bTG, bTH),
                    bU2 = this['_centroid3D'](bTH, bTI, bTF),
                    bU4 = this['_normal3D'](bTF, bTG, bTH),
                    bU7 = this['_normal3D'](bTH, bTI, bTF),
                    bU8 = this['terrainBiomeAt'](bTT),
                    bUA = this['terrainBiomeAt'](bU2),
                    bUB = this['evaluateColor'](bTT, bU4, bU8),
                    bUC = this['evaluateColor'](bU2, bU7, bUA);
                bUa['setXYZ'](bTC, ...this['_weightColor'](bUB, bTJ)), bUa['setXYZ'](bTC + 0x1, ...this['_weightColor'](bUB, bTK)), bUa['setXYZ'](bTC + 0x2, ...this['_weightColor'](bUB, bTL)), bUa['setXYZ'](bTC + 0x3, ...this['_weightColor'](bUC, bTL)), bUa['setXYZ'](bTC + 0x4, ...this['_weightColor'](bUC, bTM)), bUa['setXYZ'](bTC + 0x5, ...this['_weightColor'](bUC, bTJ));
            }
        bTF && (bU7['computeVertexNormals'](!0x0), bU7['computeFaceNormals'](), this['baseMesh'] = new bTB['Mesh'](bU7, bTE), this['baseMesh']['receiveShadow'] = !0x0, this['baseMesh']['scale']['set'](bTD, bTD, 0x1), this['add'](this['baseMesh'])), this['_raycastRay'] = new bTB['Ray'](), this['_raycastTriA'] = new bTB['Vector3'](), this['_raycastTriB'] = new bTB['Vector3'](), this['_raycastTriC'] = new bTB['Vector3'](), this['_raycastTriangle'] = new bTB['Triangle'](), this['_raycastNormal'] = new bTB['Vector3'](), this['_raycastTarget'] = new bTB['Vector3'](), this['_raycastClosestTarget'] = new bTB['Vector3']();
    } ['terrainIndex'](bTy, bTz) {
        let bTA = bTy + bTz * (this['xSegmentCount'] + 0x1);
        return 0x0 > bTA || bTA >= this['terrainHeights']['length'] ? 0x0 : bTA;
    } ['terrainHeight'](bTy, bTz) {
        return this['terrainHeights'][this['terrainIndex'](bTy, bTz)];
    } ['terrainBiome'](bTy, bTz) {
        let bTA = this['terrainIndex'](bTy, bTz) * bTH;
        return this['terrainBiomes']['slice'](bTA, bTA + bTH);
    } ['terrainBiomeAt'](bTy, bTz) {
        let bTA = Math['floor'](bTy / this['xSegmentSize']),
            bTB = Math['ceil'](bTy / this['xSegmentSize']),
            bTC = Math['floor'](bTz / this['ySegmentSize']),
            bTD = Math['ceil'](bTz / this['ySegmentSize']);
        return (this['terrainBiome'](bTA, bTC) + this['terrainBiome'](bTB, bTC) + this['terrainBiome'](bTA, bTD) + this['terrainBiome'](bTB, bTD)) / 0x4;
    } ['calcAOWeight'](bTy, bTz) {
        let bTA = this['_vertPos'](bTy, this['xSegmentSize'], this['sizeX']),
            bTB = this['_vertPos'](bTz, this['ySegmentSize'], this['sizeY']),
            bTC = this['_topAngleOnTerrain'](bTA - this['xSegmentSize'], this['terrainHeight'](bTy - 0x1, bTz), bTA, this['terrainHeight'](bTy, bTz), bTA + this['xSegmentSize'], this['terrainHeight'](bTy + 0x1, bTz)),
            bTD = this['_topAngleOnTerrain'](bTB - this['xSegmentSize'], this['terrainHeight'](bTy, bTz - 0x1), bTB, this['terrainHeight'](bTy, bTz), bTB + this['ySegmentSize'], this['terrainHeight'](bTy, bTz + 0x1)),
            bTE = Math['PI'],
            bTF = 0x1 - (0x1 - Math['max'](bTE - bTC, 0x0) / bTE) * (0x1 - Math['max'](bTE - bTD, 0x0) / bTE);
        return 0.5 <= bTF ? bTF = 0.65 : 0.2 <= bTF ? bTF = 0.3 : 0.1 <= bTF && (bTF = 0.25), bTF;
    } ['_worldToLocal'](bTy, bTz, bTA) {
        return (bTy + bTz / 0x2) / bTA;
    } ['raycast'](bTy, bTz, bTA, bTB, bTC, bTD, bTE = !0x1) {
        bTy /= this['sizeMlt'], bTz /= this['sizeMlt'], bTB /= this['sizeMlt'], bTC /= this['sizeMlt'];
        let bTF = Math['sqrt'](bTB * bTB + bTC * bTC + bTD * bTD);
        this['_raycastRay']['origin']['set'](bTy, bTz, bTA), this['_raycastRay']['direction']['set'](bTB, bTC, bTD);
        let bTG, bTH, bTI, bTJ = this['_worldToLocal'](bTy, this['sizeX'], this['xSegmentSize']),
            bTK = this['_worldToLocal'](bTz, this['sizeY'], this['ySegmentSize']),
            bTL = bTJ + bTB / this['xSegmentSize'],
            bTM = bTK + bTC / this['ySegmentSize'],
            bTT = Math['abs'](bTL - bTJ),
            bVi = Math['abs'](bTM - bTK),
            bVj = Math['floor'](bTJ),
            bVk = Math['floor'](bTK),
            bVl = 0x1;
        for (0x0 == bTT ? (bTG = 0x0, bTI = Number['POSITIVE_INFINITY']) : bTL > bTJ ? (bTG = 0x1, bVl += Math['floor'](bTL) - bVj, bTI = (Math['floor'](bTJ) + 0x1 - bTJ) * bVi) : (bTG = -0x1, bVl += bVj - Math['floor'](bTL), bTI = (bTJ - Math['floor'](bTJ)) * bVi), 0x0 == bVi ? (bTH = 0x0, bTI -= Number['POSITIVE_INFINITY']) : bTM > bTK ? (bTH = 0x1, bVl += Math['floor'](bTM) - bVk, bTI -= (Math['floor'](bTK) + 0x1 - bTK) * bTT) : (bTH = -0x1, bVl += bVk - Math['floor'](bTM), bTI -= (bTK - Math['floor'](bTK)) * bTT); 0x0 < bVl; bVl--) {
            if (this['_raycastVisit'](bVj, bVk, bTy, bTz, bTA, bTB, bTC, bTD, bTF, bTE)) {
                let bTy = this['_raycastClosestTarget'];
                return bTy['x'] *= this['sizeMlt'], bTy['y'] *= this['sizeMlt'], bTy;
            }
            0x0 < bTI ? (bVk += bTH, bTI -= bTT) : (bVj += bTG, bTI += bVi);
        }
    } ['_raycastVisit'](bTy, bTz, bTA, bTB, bTC, bTD, bTE, bTF, bTG, bTH) {
        let bTI = bTy + bTz * this['xSegmentCount'],
            bTJ = Number['POSITIVE_INFINITY'],
            bTK = !0x1;
        for (let bTy, bTz = 0x0; 0x2 > bTz; bTz++) {
            bTy = 0x6 * bTI + 0x3 * bTz, this['_raycastTriA']['set'](this['vertPositions']['getX'](bTy), this['vertPositions']['getY'](bTy), this['vertPositions']['getZ'](bTy)), this['_raycastTriB']['set'](this['vertPositions']['getX'](bTy + 0x1), this['vertPositions']['getY'](bTy + 0x1), this['vertPositions']['getZ'](bTy + 0x1)), this['_raycastTriC']['set'](this['vertPositions']['getX'](bTy + 0x2), this['vertPositions']['getY'](bTy + 0x2), this['vertPositions']['getZ'](bTy + 0x2));
            let bTA = this['_raycastRay']['intersectTriangle'](this['_raycastTriA'], this['_raycastTriB'], this['_raycastTriC'], !0x0, this['_raycastTarget']);
            if (bTA) {
                let bTy = bTA['distanceTo'](this['_raycastRay']['origin']);
                bTy < bTJ && bTy < bTG && (bTJ = bTy, bTK = !0x0, this['_raycastClosestTarget']['copy'](bTA), this['_raycastTriangle']['set'](this['_raycastTriA'], this['_raycastTriB'], this['_raycastTriC']));
            }
        }
        return bTH && bTK && this['_raycastTriangle']['getNormal'](this['_raycastNormal']), bTK;
    } ['evaluate'](bTy, bTz) {
        let bTA = 0x0;
        this['sampleIndex'] = 0x0;
        let bTB = [];
        for (let bTA = 0x0; bTA < bTH; bTA++) bTB['push'](this['_sample'](bTy, bTz, 0x514));
        let bTC = bTB['reduce']((bTy, bTz) => bTy + bTz, 0x0);
        bTB = (bTB = bTB['map']((bTy, bTz) => [bTz, bTy / bTC]))['sort']((bTy, bTz) => bTz[0x1] - bTy[0x1]);
        let bTD = {},
            [bTE, bTF] = bTB[0x0];
        bTD[bTE] = this['_easeTerrain'](bTF / (bTF + bTB[0x1][0x1]));
        for (let bTy = 0x1; bTy < bTB['length']; bTy++) {
            let [bTz, bTA] = bTB[bTy];
            bTD[bTz] = this['_easeTerrain'](bTA / (bTF + bTA));
        }
        let bTI = this['_sample'](bTy, bTz, 0x12c);
        bTA += 0x19 * (bTI = Math['floor'](0x3 * bTI) / 0x3) * bTD[bTG['GRASS']] * this['sizeMlt'];
        let bTJ = 0.4 + 0.3 * this['_sample'](bTy, bTz, 0xc8);
        bTA += (0x1 - 0x2 * Math['abs'](bTJ - this['_sample'](bTy, bTz, 0x1f4))) * (0.4 + 1.4 * this['_sample'](bTy, bTz, 0x190)) * (0xdc * this['mntMlt']) * bTD[bTG['MOUNTAIN']] * this['sizeMlt'];
        let bTK = this['_calcEdgeFade'](bTy, this['sizeX']) * this['_calcEdgeFade'](bTz, this['sizeY']);
        return bTA *= bTK, bTA += 0x7d0 * (bTK - 0x1), (Math['abs'](bTy) >= this['sizeX'] / 0x2 || Math['abs'](bTz) >= this['sizeY'] / 0x2) && (bTA = -0x3e8), [bTA, bTD];
    } ['evaluateColor'](bTy, bTz, bTA) {
        let bTB, bTC = bTy[0x2],
            bTD = Math['atan2'](Math['abs'](bTz[0x0]), Math['abs'](bTz[0x2])),
            bTE = Math['atan2'](Math['abs'](bTz[0x1]), Math['abs'](bTz[0x2]));
        return bTB = 0.85 >= (0x1 - bTD / (0x2 * Math['PI'])) * (0x1 - bTE / (0x2 * Math['PI'])) ? bTJ['MOUNTAIN'] : 0x64 < bTC ? bTJ['MOUNTAIN'] : 0x5 < bTC ? bTJ['GRASS'] : bTJ['DIRT'];
    } ['_sample'](bTy, bTz, bTA) {
        return this['sampleIndex']++, this['simplex']['noise3D'](bTy / bTA, bTz / bTA, 0x2710 * this['sampleIndex']) / 0x2 + 0.5;
    } ['_easeTerrain'](bTy) {
        return bTD['easeInOutQuint'](bTD['easeInOutQuint'](bTy));
    } ['_calcEdgeFade'](bTy, bTz) {
        if (Math['abs'](bTy) >= bTz / 0x2) return 0x0;
        let bTA = (Math['abs'](bTy) - bTz / 0x2 + this['edgeSize']) / this['edgeSize'];
        return bTA = 0x1 - Math['max'](bTA, 0x0), bTD['easeOutQuint'](bTA);
    } ['_blendColors'](bTy) {
        let bTz = Object['values'](bTy)['reduce']((bTy, bTz) => bTy + bTz, 0x0),
            bTA = [0x0, 0x0, 0x0];
        for (let bTB in bTy) {
            let bTC = bTI[bTB],
                bTD = bTy[bTB] / bTz;
            for (let bTy = 0x0; 0x3 > bTy; bTy++) bTA[bTy] += bTC[bTy] * bTD;
        }
        return bTA;
    } ['_vertPos'](bTy, bTz, bTA) {
        return bTy * bTz - bTA / 0x2;
    } ['_avgPos'](bTy, bTz) {
        return [(bTy[0x0] + bTz[0x0]) / 0x2, (bTy[0x1] + bTz[0x1]) / 0x2, (bTy[0x2] + bTz[0x2]) / 0x2];
    } ['_centroid3D'](bTy, bTz, bTA) {
        return [(bTy[0x0] + bTz[0x0] + bTA[0x0]) / 0x3, (bTy[0x1] + bTz[0x1] + bTA[0x1]) / 0x3, (bTy[0x2] + bTz[0x2] + bTA[0x2]) / 0x3];
    } ['_normal3D'](bTy, bTz, bTA) {
        let bTB = bTA[0x0] - bTz[0x0],
            bTC = bTA[0x1] - bTz[0x1],
            bTD = bTA[0x2] - bTz[0x2],
            bTE = bTy[0x0] - bTz[0x0],
            bTF = bTy[0x1] - bTz[0x1],
            bTG = bTy[0x2] - bTz[0x2],
            bTH = bTC * bTG - bTD * bTF,
            bTI = bTD * bTE - bTB * bTG,
            bTJ = bTB * bTF - bTC * bTE,
            bTK = Math['sqrt'](bTH * bTH + bTI * bTI + bTJ + bTJ);
        return [bTH / bTK, bTI / bTK, bTJ / bTK];
    } ['_topAngleOnTerrain'](bTy, bTz, bTA, bTB, bTC, bTD) {
        let bTE = Math['atan2'](bTz - bTB, bTy - bTA),
            bTF = Math['atan2'](bTD - bTB, bTC - bTA);
        return 0x0 > bTE && (bTE += 0x2 * Math['PI']), bTE - bTF;
    } ['_weightColor'](bTy, bTz) {
        return bTy['map'](bTy => bTy * (0x1 - bTz));
    }
}
module['exports'] = bTT;
