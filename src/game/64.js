module['exports'] = function(bXB) {
    return function() {
        function bXC() {
            var bXB = {
                'objects': [],
                'object': {},
                'vertices': [],
                'normals': [],
                'colors': [],
                'uvs': [],
                'materialLibraries': [],
                'startObject': function(bXB, bXC) {
                    if (this['object'] && !0x1 === this['object']['fromDeclaration']) return this['object']['name'] = bXB, void(this['object']['fromDeclaration'] = !0x1 !== bXC);
                    var bXI = this['object'] && 'function' == typeof this['object']['currentMaterial'] ? this['object']['currentMaterial']() : void 0x0;
                    if (this['object'] && 'function' == typeof this['object']['_finalize'] && this['object']['_finalize'](!0x0), this['object'] = {
                            'name': bXB || '',
                            'fromDeclaration': !0x1 !== bXC,
                            'geometry': {
                                'vertices': [],
                                'normals': [],
                                'colors': [],
                                'uvs': []
                            },
                            'materials': [],
                            'smooth': !0x0,
                            'startMaterial': function(bXB, bXC) {
                                var bXI = this['_finalize'](!0x1);
                                bXI && (bXI['inherited'] || 0x0 >= bXI['groupCount']) && this['materials']['splice'](bXI['index'], 0x1);
                                var bXM = {
                                    'index': this['materials']['length'],
                                    'name': bXB || '',
                                    'mtllib': Array['isArray'](bXC) && 0x0 < bXC['length'] ? bXC[bXC['length'] - 0x1] : '',
                                    'smooth': void 0x0 === bXI ? this['smooth'] : bXI['smooth'],
                                    'groupStart': void 0x0 === bXI ? 0x0 : bXI['groupEnd'],
                                    'groupEnd': -0x1,
                                    'groupCount': -0x1,
                                    'inherited': !0x1,
                                    'clone': function(bXB) {
                                        var bXC = {
                                            'index': 'number' == typeof bXB ? bXB : this['index'],
                                            'name': this['name'],
                                            'mtllib': this['mtllib'],
                                            'smooth': this['smooth'],
                                            'groupStart': 0x0,
                                            'groupEnd': -0x1,
                                            'groupCount': -0x1,
                                            'inherited': !0x1
                                        };
                                        return bXC['clone'] = this['clone']['bind'](bXC), bXC;
                                    }
                                };
                                return this['materials']['push'](bXM), bXM;
                            },
                            'currentMaterial': function() {
                                return 0x0 < this['materials']['length'] ? this['materials'][this['materials']['length'] - 0x1] : void 0x0;
                            },
                            '_finalize': function(bXB) {
                                var bXC = this['currentMaterial']();
                                if (bXC && -0x1 === bXC['groupEnd'] && (bXC['groupEnd'] = this['geometry']['vertices']['length'] / 0x3, bXC['groupCount'] = bXC['groupEnd'] - bXC['groupStart'], bXC['inherited'] = !0x1), bXB && 0x1 < this['materials']['length'])
                                    for (var bXI = this['materials']['length'] - 0x1; 0x0 <= bXI; bXI--) 0x0 >= this['materials'][bXI]['groupCount'] && this['materials']['splice'](bXI, 0x1);
                                return bXB && 0x0 === this['materials']['length'] && this['materials']['push']({
                                    'name': '',
                                    'smooth': this['smooth']
                                }), bXC;
                            }
                        }, bXI && bXI['name'] && 'function' == typeof bXI['clone']) {
                        var bXS = bXI['clone'](0x0);
                        bXS['inherited'] = !0x0, this['object']['materials']['push'](bXS);
                    }
                    this['objects']['push'](this['object']);
                },
                'finalize': function() {
                    this['object'] && 'function' == typeof this['object']['_finalize'] && this['object']['_finalize'](!0x0);
                },
                'parseVertexIndex': function(bXB, bXC) {
                    var bXV = parseInt(bXB, 0xa);
                    return 0x3 * (0x0 <= bXV ? bXV - 0x1 : bXV + bXC / 0x3);
                },
                'parseNormalIndex': function(bXB, bXC) {
                    var bXY = parseInt(bXB, 0xa);
                    return 0x3 * (0x0 <= bXY ? bXY - 0x1 : bXY + bXC / 0x3);
                },
                'parseUVIndex': function(bXB, bXC) {
                    var bY1 = parseInt(bXB, 0xa);
                    return 0x2 * (0x0 <= bY1 ? bY1 - 0x1 : bY1 + bXC / 0x2);
                },
                'addVertex': function(bXB, bXC, bY4) {
                    var bY5 = this['vertices'],
                        bY6 = this['object']['geometry']['vertices'];
                    bY6['push'](bY5[bXB + 0x0], bY5[bXB + 0x1], bY5[bXB + 0x2]), bY6['push'](bY5[bXC + 0x0], bY5[bXC + 0x1], bY5[bXC + 0x2]), bY6['push'](bY5[bY4 + 0x0], bY5[bY4 + 0x1], bY5[bY4 + 0x2]);
                },
                'addVertexPoint': function(bXB) {
                    var bXC = this['vertices'];
                    this['object']['geometry']['vertices']['push'](bXC[bXB + 0x0], bXC[bXB + 0x1], bXC[bXB + 0x2]);
                },
                'addVertexLine': function(bXB) {
                    var bXC = this['vertices'];
                    this['object']['geometry']['vertices']['push'](bXC[bXB + 0x0], bXC[bXB + 0x1], bXC[bXB + 0x2]);
                },
                'addNormal': function(bXB, bXC, bYd) {
                    var bYe = this['normals'],
                        bYf = this['object']['geometry']['normals'];
                    bYf['push'](bYe[bXB + 0x0], bYe[bXB + 0x1], bYe[bXB + 0x2]), bYf['push'](bYe[bXC + 0x0], bYe[bXC + 0x1], bYe[bXC + 0x2]), bYf['push'](bYe[bYd + 0x0], bYe[bYd + 0x1], bYe[bYd + 0x2]);
                },
                'addColor': function(bXB, bXC, bYi) {
                    var bYj = this['colors'],
                        bYk = this['object']['geometry']['colors'];
                    bYk['push'](bYj[bXB + 0x0], bYj[bXB + 0x1], bYj[bXB + 0x2]), bYk['push'](bYj[bXC + 0x0], bYj[bXC + 0x1], bYj[bXC + 0x2]), bYk['push'](bYj[bYi + 0x0], bYj[bYi + 0x1], bYj[bYi + 0x2]);
                },
                'addUV': function(bXB, bXC, bYn) {
                    var bYo = this['uvs'],
                        bYp = this['object']['geometry']['uvs'];
                    bYp['push'](bYo[bXB + 0x0], bYo[bXB + 0x1]), bYp['push'](bYo[bXC + 0x0], bYo[bXC + 0x1]), bYp['push'](bYo[bYn + 0x0], bYo[bYn + 0x1]);
                },
                'addUVLine': function(bXB) {
                    var bXC = this['uvs'];
                    this['object']['geometry']['uvs']['push'](bXC[bXB + 0x0], bXC[bXB + 0x1]);
                },
                'addFace': function(bXB, bXC, bYu, bYv, bYw, bYx, bYy, bYz, bYA) {
                    var bYB = this['vertices']['length'],
                        bYC = this['parseVertexIndex'](bXB, bYB),
                        bYD = this['parseVertexIndex'](bXC, bYB),
                        bYE = this['parseVertexIndex'](bYu, bYB);
                    if (this['addVertex'](bYC, bYD, bYE), void 0x0 !== bYv && '' !== bYv) {
                        var bYF = this['uvs']['length'];
                        bYC = this['parseUVIndex'](bYv, bYF), bYD = this['parseUVIndex'](bYw, bYF), bYE = this['parseUVIndex'](bYx, bYF), this['addUV'](bYC, bYD, bYE);
                    }
                    if (void 0x0 !== bYy && '' !== bYy) {
                        var bYG = this['normals']['length'];
                        bYC = this['parseNormalIndex'](bYy, bYG), bYD = bYy === bYz ? bYC : this['parseNormalIndex'](bYz, bYG), bYE = bYy === bYA ? bYC : this['parseNormalIndex'](bYA, bYG), this['addNormal'](bYC, bYD, bYE);
                    }
                    0x0 < this['colors']['length'] && this['addColor'](bYC, bYD, bYE);
                },
                'addPointGeometry': function(bXB) {
                    this['object']['geometry']['type'] = 'Points';
                    for (var bXC = this['vertices']['length'], bYJ = 0x0, bYK = bXB['length']; bYJ < bYK; bYJ++) this['addVertexPoint'](this['parseVertexIndex'](bXB[bYJ], bXC));
                },
                'addLineGeometry': function(bXB, bXC) {
                    this['object']['geometry']['type'] = 'Line';
                    for (var bYN = this['vertices']['length'], bYO = this['uvs']['length'], bYP = 0x0, bYQ = bXB['length']; bYP < bYQ; bYP++) this['addVertexLine'](this['parseVertexIndex'](bXB[bYP], bYN));
                    var bYR = 0x0;
                    for (bYQ = bXC['length']; bYR < bYQ; bYR++) this['addUVLine'](this['parseUVIndex'](bXC[bYR], bYO));
                }
            };
            return bXB['startObject']('', !0x1), bXB;
        }

        function bYS(bXC) {
            this['manager'] = void 0x0 === bXC ? bXB['DefaultLoadingManager'] : bXC, this['materials'] = null;
        }
        var bYU = /^[og]\s*(.+)?/,
            bYV = /^mtllib /,
            bYW = /^usemtl /;
        return bYS['prototype'] = {
            'constructor': bYS,
            'load': function(bXC, bYS, bYU, bYV) {
                var bYW = this,
                    bZ2 = new bXB['FileLoader'](bYW['manager']);
                bZ2['setPath'](this['path']), bZ2['load'](bXC, function(bXB) {
                    bYS(bYW['parse'](bXB));
                }, bYU, bYV);
            },
            'setPath': function(bXB) {
                return this['path'] = bXB, this;
            },
            'setMaterials': function(bXB) {
                return this['materials'] = bXB, this;
            },
            'parse': function(bYS) {
                console['time']('OBJLoader');
                var bZ7 = new bXC(); - 0x1 !== bYS['indexOf']('\x0d\x0a') && (bYS = bYS['replace'](/\r\n/g, '\x0a')), -0x1 !== bYS['indexOf']('\\\x0a') && (bYS = bYS['replace'](/\\\n/g, ''));
                for (var bZ8 = bYS['split']('\x0a'), bZ9 = '', bZa = '', bZb = [], bZc = 'function' == typeof '' ['trimLeft'], bZd = 0x0, bZe = bZ8['length']; bZd < bZe; bZd++)
                    if (bZ9 = bZ8[bZd], 0x0 !== (bZ9 = bZc ? bZ9['trimLeft']() : bZ9['trim']())['length'] && '#' !== (bZa = bZ9['charAt'](0x0)))
                        if ('v' === bZa) {
                            var bZf = bZ9['split'](/\s+/);
                            switch (bZf[0x0]) {
                                case 'v':
                                    bZ7['vertices']['push'](parseFloat(bZf[0x1]), parseFloat(bZf[0x2]), parseFloat(bZf[0x3])), 0x7 <= bZf['length'] && bZ7['colors']['push'](parseFloat(bZf[0x4]), parseFloat(bZf[0x5]), parseFloat(bZf[0x6]));
                                    break;
                                case 'vn':
                                    bZ7['normals']['push'](parseFloat(bZf[0x1]), parseFloat(bZf[0x2]), parseFloat(bZf[0x3]));
                                    break;
                                case 'vt':
                                    bZ7['uvs']['push'](parseFloat(bZf[0x1]), parseFloat(bZf[0x2]));
                            }
                        } else if ('f' === bZa) {
                    for (var bZg, bZh = bZ9['substr'](0x1)['trim']()['split'](/\s+/), bZi = [], bZj = 0x0, bZk = bZh['length']; bZj < bZk; bZj++)
                        if (0x0 < (bZg = bZh[bZj])['length']) {
                            var bZl = bZg['split']('/');
                            bZi['push'](bZl);
                        } var bZm = bZi[0x0];
                    for (bZj = 0x1, bZk = bZi['length'] - 0x1; bZj < bZk; bZj++) {
                        var bZn = bZi[bZj],
                            bZo = bZi[bZj + 0x1];
                        bZ7['addFace'](bZm[0x0], bZn[0x0], bZo[0x0], bZm[0x1], bZn[0x1], bZo[0x1], bZm[0x2], bZn[0x2], bZo[0x2]);
                    }
                } else if ('l' === bZa) {
                    var bZp = bZ9['substring'](0x1)['trim']()['split'](' '),
                        bZq = [],
                        bZr = [];
                    if (-0x1 === bZ9['indexOf']('/')) bZq = bZp;
                    else
                        for (var bZs, bZt = 0x0, bZu = bZp['length']; bZt < bZu; bZt++) '' !== (bZs = bZp[bZt]['split']('/'))[0x0] && bZq['push'](bZs[0x0]), '' !== bZs[0x1] && bZr['push'](bZs[0x1]);
                    bZ7['addLineGeometry'](bZq, bZr);
                } else if ('p' === bZa) {
                    var bZv = bZ9['substr'](0x1)['trim']()['split'](' ');
                    bZ7['addPointGeometry'](bZv);
                } else if (null !== (bZb = bYU['exec'](bZ9))) {
                    var bZw = (' ' + bZb[0x0]['substr'](0x1)['trim']())['substr'](0x1);
                    bZ7['startObject'](bZw);
                } else if (bYW['test'](bZ9)) bZ7['object']['startMaterial'](bZ9['substring'](0x7)['trim'](), bZ7['materialLibraries']);
                else if (bYV['test'](bZ9)) bZ7['materialLibraries']['push'](bZ9['substring'](0x7)['trim']());
                else {
                    if ('s' !== bZa) {
                        if (' ' === bZ9) continue;
                        throw new Error('THREE.OBJLoader: Unexpected line: \"' + bZ9 + '\"');
                    }
                    if (0x1 < (bZb = bZ9['split'](' '))['length']) {
                        var bZx = bZb[0x1]['trim']()['toLowerCase']();
                        bZ7['object']['smooth'] = '0' !== bZx && 'off' !== bZx;
                    } else bZ7['object']['smooth'] = !0x0;
                    (bZL = bZ7['object']['currentMaterial']()) && (bZL['smooth'] = bZ7['object']['smooth']);
                }
                bZ7['finalize']();
                var bZy = new bXB['Group']();
                bZy['materialLibraries'] = []['concat'](bZ7['materialLibraries']);
                for (bZd = 0x0, bZe = bZ7['objects']['length']; bZd < bZe; bZd++) {
                    var bZz = bZ7['objects'][bZd],
                        bZA = bZz['geometry'],
                        bZB = bZz['materials'],
                        bZC = 'Line' === bZA['type'],
                        bZD = 'Points' === bZA['type'],
                        bZE = !0x1;
                    if (0x0 !== bZA['vertices']['length']) {
                        var bZF, bZG = new bXB['BufferGeometry']();
                        bZG['addAttribute']('position', new bXB['Float32BufferAttribute'](bZA['vertices'], 0x3)), 0x0 < bZA['normals']['length'] ? bZG['addAttribute']('normal', new bXB['Float32BufferAttribute'](bZA['normals'], 0x3)) : bZG['computeVertexNormals'](), 0x0 < bZA['colors']['length'] && (bZE = !0x0, bZG['addAttribute']('color', new bXB['Float32BufferAttribute'](bZA['colors'], 0x3))), 0x0 < bZA['uvs']['length'] && bZG['addAttribute']('uv', new bXB['Float32BufferAttribute'](bZA['uvs'], 0x2));
                        for (var bZH = [], bZI = 0x0, bZJ = bZB['length']; bZI < bZJ; bZI++) {
                            var bZK = bZB[bZI],
                                bZL = void 0x0;
                            if (null !== this['materials'])
                                if (bZL = this['materials']['create'](bZK['name']), !bZC || !bZL || bZL instanceof bXB['LineBasicMaterial']) {
                                    if (bZD && bZL && !(bZL instanceof bXB['PointsMaterial'])) {
                                        var bZM = new bXB['PointsMaterial']({
                                            'size': 0xa,
                                            'sizeAttenuation': !0x1
                                        });
                                        bZN['copy'](bZL), bZL = bZM;
                                    }
                                } else {
                                    var bZN = new bXB['LineBasicMaterial']();
                                    bZN['copy'](bZL), bZN['lights'] = !0x1, bZL = bZN;
                                } bZL || ((bZL = bZC ? new bXB['LineBasicMaterial']() : bZD ? new bXB['PointsMaterial']({
                                'size': 0x1,
                                'sizeAttenuation': !0x1
                            }) : new bXB['MeshPhongMaterial']())['name'] = bZK['name']), bZL['flatShading'] = !bZK['smooth'], bZL['vertexColors'] = bZE ? bXB['VertexColors'] : bXB['NoColors'], bZH['push'](bZL);
                        }
                        if (0x1 < bZH['length']) {
                            for (bZI = 0x0, bZJ = bZB['length']; bZI < bZJ; bZI++) bZK = bZB[bZI], bZG['addGroup'](bZK['groupStart'], bZK['groupCount'], bZI);
                            bZF = bZC ? new bXB['LineSegments'](bZG, bZH) : bZD ? new bXB['Points'](bZG, bZH) : new bXB['Mesh'](bZG, bZH);
                        } else bZF = bZC ? new bXB['LineSegments'](bZG, bZH[0x0]) : bZD ? new bXB['Points'](bZG, bZH[0x0]) : new bXB['Mesh'](bZG, bZH[0x0]);
                        bZF['name'] = bZz['name'], bZy['add'](bZF);
                    }
                }
                return console['timeEnd']('OBJLoader'), bZy;
            }
        }, bYS;
    }();
};