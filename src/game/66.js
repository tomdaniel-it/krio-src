var bZW;
! function() {
    'use strict';

    function bZX(bZT) {
        var bZU;
        bZU = 'function' == typeof bZT ? bZT : bZT ? c07(bZT) : Math['random'], this['p'] = c01(bZU), this['perm'] = new Uint8Array(0x200), this['permMod12'] = new Uint8Array(0x200);
        for (var bZV = 0x0; 0x200 > bZV; bZV++) this['perm'][bZV] = this['p'][0xff & bZV], this['permMod12'][bZV] = this['perm'][bZV] % 0xc;
    }

    function c01(bZT) {
        var bZU, bZV = new Uint8Array(0x100);
        for (bZU = 0x0; 0x100 > bZU; bZU++) bZV[bZU] = bZU;
        for (bZU = 0x0; 0xff > bZU; bZU++) {
            var bZW = bZU + ~~(bZT() * (0x100 - bZU)),
                bZX = bZV[bZU];
            bZV[bZU] = bZV[bZW], bZV[bZW] = bZX;
        }
        return bZV;
    }

    function c07() {
        var bZT = 0x0,
            bZU = 0x0,
            bZV = 0x0,
            bZW = 0x1,
            bZX = function() {
                var bZT = 0xefc8249d;
                return function(bZU) {
                    bZU = bZU['toString']();
                    for (var bZV = 0x0; bZV < bZU['length']; bZV++) {
                        var bZW = 0.02519603282416938 * (bZT += bZU['charCodeAt'](bZV));
                        bZW -= bZT = bZW >>> 0x0, bZT = (bZW *= bZT) >>> 0x0, bZT += 0x100000000 * (bZW -= bZT);
                    }
                    return 2.3283064365386963e-10 * (bZT >>> 0x0);
                };
            }();
        bZT = bZX(' '), bZU = bZX(' '), bZV = bZX(' ');
        for (var c01 = 0x0; c01 < arguments['length']; c01++) 0x0 > (bZT -= bZX(arguments[c01])) && (bZT += 0x1), 0x0 > (bZU -= bZX(arguments[c01])) && (bZU += 0x1), 0x0 > (bZV -= bZX(arguments[c01])) && (bZV += 0x1);
        return bZX = null,
            function() {
                var bZX = 0x1fea77 * bZT + 2.3283064365386963e-10 * bZW;
                return bZT = bZU, bZU = bZV, bZV = bZX - (bZW = 0x0 | bZX);
            };
    }
    var c0j = 0.5 * (Math['sqrt'](0x3) - 0x1),
        c0k = (0x3 - Math['sqrt'](0x3)) / 0x6,
        c0l = 0x1 / 0x6,
        c0m = (Math['sqrt'](0x5) - 0x1) / 0x4,
        c0n = (0x5 - Math['sqrt'](0x5)) / 0x14;
    bZX['prototype'] = {
        'grad3': new Float32Array([0x1, 0x1, 0x0, -0x1, 0x1, 0x0, 0x1, -0x1, 0x0, -0x1, -0x1, 0x0, 0x1, 0x0, 0x1, -0x1, 0x0, 0x1, 0x1, 0x0, -0x1, -0x1, 0x0, -0x1, 0x0, 0x1, 0x1, 0x0, -0x1, 0x1, 0x0, 0x1, -0x1, 0x0, -0x1, -0x1]),
        'grad4': new Float32Array([0x0, 0x1, 0x1, 0x1, 0x0, 0x1, 0x1, -0x1, 0x0, 0x1, -0x1, 0x1, 0x0, 0x1, -0x1, -0x1, 0x0, -0x1, 0x1, 0x1, 0x0, -0x1, 0x1, -0x1, 0x0, -0x1, -0x1, 0x1, 0x0, -0x1, -0x1, -0x1, 0x1, 0x0, 0x1, 0x1, 0x1, 0x0, 0x1, -0x1, 0x1, 0x0, -0x1, 0x1, 0x1, 0x0, -0x1, -0x1, -0x1, 0x0, 0x1, 0x1, -0x1, 0x0, 0x1, -0x1, -0x1, 0x0, -0x1, 0x1, -0x1, 0x0, -0x1, -0x1, 0x1, 0x1, 0x0, 0x1, 0x1, 0x1, 0x0, -0x1, 0x1, -0x1, 0x0, 0x1, 0x1, -0x1, 0x0, -0x1, -0x1, 0x1, 0x0, 0x1, -0x1, 0x1, 0x0, -0x1, -0x1, -0x1, 0x0, 0x1, -0x1, -0x1, 0x0, -0x1, 0x1, 0x1, 0x1, 0x0, 0x1, 0x1, -0x1, 0x0, 0x1, -0x1, 0x1, 0x0, 0x1, -0x1, -0x1, 0x0, -0x1, 0x1, 0x1, 0x0, -0x1, 0x1, -0x1, 0x0, -0x1, -0x1, 0x1, 0x0, -0x1, -0x1, -0x1, 0x0]),
        'noise2D': function(bZT, bZU) {
            var bZV, bZW, bZX = this['permMod12'],
                c01 = this['perm'],
                c07 = this['grad3'],
                c0l = 0x0,
                c0m = 0x0,
                c0n = 0x0,
                c0y = (bZT + bZU) * c0j,
                c0z = Math['floor'](bZT + c0y),
                c0A = Math['floor'](bZU + c0y),
                c0B = (c0z + c0A) * c0k,
                c0C = bZT - (c0z - c0B),
                c0D = bZU - (c0A - c0B);
            c0C > c0D ? (bZV = 0x1, bZW = 0x0) : (bZV = 0x0, bZW = 0x1);
            var c0E = c0C - bZV + c0k,
                c0F = c0D - bZW + c0k,
                c0G = c0C - 0x1 + 0x2 * c0k,
                c0H = c0D - 0x1 + 0x2 * c0k,
                c0I = 0xff & c0z,
                c0J = 0xff & c0A,
                c0K = 0.5 - c0C * c0C - c0D * c0D;
            if (0x0 <= c0K) {
                var c0L = 0x3 * bZX[c0I + c01[c0J]];
                c0l = (c0K *= c0K) * c0K * (c07[c0L] * c0C + c07[c0L + 0x1] * c0D);
            }
            var c0M = 0.5 - c0E * c0E - c0F * c0F;
            if (0x0 <= c0M) {
                var c0N = 0x3 * bZX[c0I + bZV + c01[c0J + bZW]];
                c0m = (c0M *= c0M) * c0M * (c07[c0N] * c0E + c07[c0N + 0x1] * c0F);
            }
            var c0O = 0.5 - c0G * c0G - c0H * c0H;
            if (0x0 <= c0O) {
                var c0P = 0x3 * bZX[c0I + 0x1 + c01[c0J + 0x1]];
                c0n = (c0O *= c0O) * c0O * (c07[c0P] * c0G + c07[c0P + 0x1] * c0H);
            }
            return 0x46 * (c0l + c0m + c0n);
        },
        'noise3D': function(bZT, bZU, bZV) {
            var bZW, bZX, c01, c07, c0j, c0k, c0m, c0n, c11, c12, c13 = this['permMod12'],
                c14 = this['perm'],
                c15 = this['grad3'],
                c16 = (bZT + bZU + bZV) * (0x1 / 0x3),
                c17 = Math['floor'](bZT + c16),
                c18 = Math['floor'](bZU + c16),
                c19 = Math['floor'](bZV + c16),
                c1a = (c17 + c18 + c19) * c0l,
                c1b = bZT - (c17 - c1a),
                c1c = bZU - (c18 - c1a),
                c1d = bZV - (c19 - c1a);
            c1b >= c1c ? c1c >= c1d ? (c0j = 0x1, c0k = 0x0, c0m = 0x0, c0n = 0x1, c11 = 0x1, c12 = 0x0) : c1b >= c1d ? (c0j = 0x1, c0k = 0x0, c0m = 0x0, c0n = 0x1, c11 = 0x0, c12 = 0x1) : (c0j = 0x0, c0k = 0x0, c0m = 0x1, c0n = 0x1, c11 = 0x0, c12 = 0x1) : c1c < c1d ? (c0j = 0x0, c0k = 0x0, c0m = 0x1, c0n = 0x0, c11 = 0x1, c12 = 0x1) : c1b < c1d ? (c0j = 0x0, c0k = 0x1, c0m = 0x0, c0n = 0x0, c11 = 0x1, c12 = 0x1) : (c0j = 0x0, c0k = 0x1, c0m = 0x0, c0n = 0x1, c11 = 0x1, c12 = 0x0);
            var c1e = c1b - c0j + c0l,
                c1f = c1c - c0k + c0l,
                c1g = c1d - c0m + c0l,
                c1h = c1b - c0n + 0x2 * c0l,
                c1i = c1c - c11 + 0x2 * c0l,
                c1j = c1d - c12 + 0x2 * c0l,
                c1k = c1b - 0x1 + 0.5,
                c1l = c1c - 0x1 + 0.5,
                c1m = c1d - 0x1 + 0.5,
                c1n = 0xff & c17,
                c1o = 0xff & c18,
                c1p = 0xff & c19,
                c1q = 0.6 - c1b * c1b - c1c * c1c - c1d * c1d;
            if (0x0 > c1q) bZW = 0x0;
            else {
                var c1r = 0x3 * c13[c1n + c14[c1o + c14[c1p]]];
                bZW = (c1q *= c1q) * c1q * (c15[c1r] * c1b + c15[c1r + 0x1] * c1c + c15[c1r + 0x2] * c1d);
            }
            var c1s = 0.6 - c1e * c1e - c1f * c1f - c1g * c1g;
            if (0x0 > c1s) bZX = 0x0;
            else {
                var c1t = 0x3 * c13[c1n + c0j + c14[c1o + c0k + c14[c1p + c0m]]];
                bZX = (c1s *= c1s) * c1s * (c15[c1t] * c1e + c15[c1t + 0x1] * c1f + c15[c1t + 0x2] * c1g);
            }
            var c1u = 0.6 - c1h * c1h - c1i * c1i - c1j * c1j;
            if (0x0 > c1u) c01 = 0x0;
            else {
                var c1v = 0x3 * c13[c1n + c0n + c14[c1o + c11 + c14[c1p + c12]]];
                c01 = (c1u *= c1u) * c1u * (c15[c1v] * c1h + c15[c1v + 0x1] * c1i + c15[c1v + 0x2] * c1j);
            }
            var c1w = 0.6 - c1k * c1k - c1l * c1l - c1m * c1m;
            if (0x0 > c1w) c07 = 0x0;
            else {
                var c1x = 0x3 * c13[c1n + 0x1 + c14[c1o + 0x1 + c14[c1p + 0x1]]];
                c07 = (c1w *= c1w) * c1w * (c15[c1x] * c1k + c15[c1x + 0x1] * c1l + c15[c1x + 0x2] * c1m);
            }
            return 0x20 * (bZW + bZX + c01 + c07);
        },
        'noise4D': function(bZT, bZU, bZV, bZW) {
            var bZX, c01, c07, c0j, c0k, c0l, c1I, c1J, c1K, c1L, c1M, c1N, c1O, c1P, c1Q, c1R, c1S, c1T = this['perm'],
                c1U = this['grad4'],
                c1V = (bZT + bZU + bZV + bZW) * c0m,
                c1W = Math['floor'](bZT + c1V),
                c1X = Math['floor'](bZU + c1V),
                c1Y = Math['floor'](bZV + c1V),
                c1Z = Math['floor'](bZW + c1V),
                c20 = (c1W + c1X + c1Y + c1Z) * c0n,
                c21 = bZT - (c1W - c20),
                c22 = bZU - (c1X - c20),
                c23 = bZV - (c1Y - c20),
                c24 = bZW - (c1Z - c20),
                c25 = 0x0,
                c26 = 0x0,
                c27 = 0x0,
                c28 = 0x0;
            c21 > c22 ? c25++ : c26++, c21 > c23 ? c25++ : c27++, c21 > c24 ? c25++ : c28++, c22 > c23 ? c26++ : c27++, c22 > c24 ? c26++ : c28++, c23 > c24 ? c27++ : c28++;
            var c29 = c21 - (c0l = 0x3 <= c25 ? 0x1 : 0x0) + c0n,
                c2a = c22 - (c1I = 0x3 <= c26 ? 0x1 : 0x0) + c0n,
                c2b = c23 - (c1J = 0x3 <= c27 ? 0x1 : 0x0) + c0n,
                c2c = c24 - (c1K = 0x3 <= c28 ? 0x1 : 0x0) + c0n,
                c2d = c21 - (c1L = 0x2 <= c25 ? 0x1 : 0x0) + 0x2 * c0n,
                c2e = c22 - (c1M = 0x2 <= c26 ? 0x1 : 0x0) + 0x2 * c0n,
                c2f = c23 - (c1N = 0x2 <= c27 ? 0x1 : 0x0) + 0x2 * c0n,
                c2g = c24 - (c1O = 0x2 <= c28 ? 0x1 : 0x0) + 0x2 * c0n,
                c2h = c21 - (c1P = 0x1 <= c25 ? 0x1 : 0x0) + 0x3 * c0n,
                c2i = c22 - (c1Q = 0x1 <= c26 ? 0x1 : 0x0) + 0x3 * c0n,
                c2j = c23 - (c1R = 0x1 <= c27 ? 0x1 : 0x0) + 0x3 * c0n,
                c2k = c24 - (c1S = 0x1 <= c28 ? 0x1 : 0x0) + 0x3 * c0n,
                c2l = c21 - 0x1 + 0x4 * c0n,
                c2m = c22 - 0x1 + 0x4 * c0n,
                c2n = c23 - 0x1 + 0x4 * c0n,
                c2o = c24 - 0x1 + 0x4 * c0n,
                c2p = 0xff & c1W,
                c2q = 0xff & c1X,
                c2r = 0xff & c1Y,
                c2s = 0xff & c1Z,
                c2t = 0.6 - c21 * c21 - c22 * c22 - c23 * c23 - c24 * c24;
            if (0x0 > c2t) bZX = 0x0;
            else {
                var c2u = c1T[c2p + c1T[c2q + c1T[c2r + c1T[c2s]]]] % 0x20 * 0x4;
                bZX = (c2t *= c2t) * c2t * (c1U[c2u] * c21 + c1U[c2u + 0x1] * c22 + c1U[c2u + 0x2] * c23 + c1U[c2u + 0x3] * c24);
            }
            var c2v = 0.6 - c29 * c29 - c2a * c2a - c2b * c2b - c2c * c2c;
            if (0x0 > c2v) c01 = 0x0;
            else {
                var c2w = c1T[c2p + c0l + c1T[c2q + c1I + c1T[c2r + c1J + c1T[c2s + c1K]]]] % 0x20 * 0x4;
                c01 = (c2v *= c2v) * c2v * (c1U[c2w] * c29 + c1U[c2w + 0x1] * c2a + c1U[c2w + 0x2] * c2b + c1U[c2w + 0x3] * c2c);
            }
            var c2x = 0.6 - c2d * c2d - c2e * c2e - c2f * c2f - c2g * c2g;
            if (0x0 > c2x) c07 = 0x0;
            else {
                var c2y = c1T[c2p + c1L + c1T[c2q + c1M + c1T[c2r + c1N + c1T[c2s + c1O]]]] % 0x20 * 0x4;
                c07 = (c2x *= c2x) * c2x * (c1U[c2y] * c2d + c1U[c2y + 0x1] * c2e + c1U[c2y + 0x2] * c2f + c1U[c2y + 0x3] * c2g);
            }
            var c2z = 0.6 - c2h * c2h - c2i * c2i - c2j * c2j - c2k * c2k;
            if (0x0 > c2z) c0j = 0x0;
            else {
                var c2A = c1T[c2p + c1P + c1T[c2q + c1Q + c1T[c2r + c1R + c1T[c2s + c1S]]]] % 0x20 * 0x4;
                c0j = (c2z *= c2z) * c2z * (c1U[c2A] * c2h + c1U[c2A + 0x1] * c2i + c1U[c2A + 0x2] * c2j + c1U[c2A + 0x3] * c2k);
            }
            var c2B = 0.6 - c2l * c2l - c2m * c2m - c2n * c2n - c2o * c2o;
            if (0x0 > c2B) c0k = 0x0;
            else {
                var c2C = c1T[c2p + 0x1 + c1T[c2q + 0x1 + c1T[c2r + 0x1 + c1T[c2s + 0x1]]]] % 0x20 * 0x4;
                c0k = (c2B *= c2B) * c2B * (c1U[c2C] * c2l + c1U[c2C + 0x1] * c2m + c1U[c2C + 0x2] * c2n + c1U[c2C + 0x3] * c2o);
            }
            return 0x1b * (bZX + c01 + c07 + c0j + c0k);
        }
    }, bZX['_buildPermutationTable'] = c01, void 0x0 !== (bZW = function() {
        return bZX;
    } ['call'](exports, require, exports, module)) && (module['exports'] = bZW), exports['SimplexNoise'] = bZX, module['exports'] = bZX;
}();