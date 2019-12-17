(function(ctb) {
    var cte = require("./55.js"),
        ctf = require("./util.js"),
        ctg = require("./color.js"),
        cth = require("./config.js"),
        cti = require("./56.js"),
        ctj = require("./version.js"),
        ctk = 0x0;
    module.exports.validConfig = function(cta) {
        if (cta['modes'])
            for (var ctb = 0; ctb < cta['modes']['length']; ++ctb)
                if (!cte['modes'][cta['modes'][ctb]]) return 'Invalid Mode in Config.';
        if (cta['classes'])
            for (ctb = 0; ctb < cta['classes']['length']; ++ctb)
                if (!cti[cta['classes'][ctb]]) return 'Invalid Class in Config.';
        if (cta['settings']) {
            var ctc = 0;
            for (var ctg in cta['settings'])
                if (cta['settings']['hasOwnProperty'](ctg)) {
                    var ctj = cta['settings'][ctg],
                        ctk = -1;
                    for (ctb = 0; ctb < cth['serverConfig']['length']; ++ctb)
                        if (cth['serverConfig'][ctb]['varN'] == ctg) {
                            ctk = ctb;
                            break;
                        } if (0x0 > ctk) return 'Invalid Setting in Config.';
                    var ctr = cth['serverConfig'][ctk];
                    if (!ctr['input'] && !ctr['bool']) {
                        if (!ctf['isNumber'](ctj)) return 'Invalid Config Value.';
                        if (ctj > (ctr['maxF'] || ctr['max']) || ctj < ctr['min']) return 'Config Value out of Range.';
                    }
                    if (++ctc > cth['serverConfig']['length'] + 0x1) return 'Settings Mismatch.';
                }
        }
        return null;
    };
    module.exports.validMap = function(cta, ctb) {
        if (!ctf['isString'](cta['name']) || !cta['name']['replace'](/\s/g, '')['length']) return 'Missing map name.';
        if (-0x1 !== cta['name']['indexOf']('<') || -0x1 !== cta['name']['indexOf']('>')) return 'Illegal characters in map name.';
        if (0x10 < cta['name']['length']) return 'Map name too long.';
        if (!ctf['isArray'](cta['spawns']) || !cta['spawns']['length']) return 'Missing spawn points.';
        if (cta['spawns']['length'] > cth['spawnLimit']) return 'Too many spawn points.';
        for (var ctc, cte = 0x0; cte < cta['spawns']['length']; ++cte) {
            if (ctc = cta['spawns'][cte], !ctf['isArray'](ctc) || !ctc['length'] || 0x3 > ctc['length'] || 0x6 < ctc['length']) return 'Spawn point error.';
            for (var ctg = 0x0; ctg < ctc['length']; ++ctg) {
                if (0x3 > ctg && !ctf['isNumber'](ctc[ctg])) return 'Spawn point error.';
                if (0x3 == ctg && null == ctc[ctg] && 0x1 == ctc[ctg] && 0x2 == ctc[ctg]) return 'Spawn team error.';
            }
        }
        if (!ctf['isArray'](cta['objects']) || !cta['objects']['length']) return 'Missing objects.';
        if (cta['objects']['length'] > (ctb ? cth['objectLimitF'] : cth['objectLimit'])) return 'Map exceeds object limit.';
        var cti, ctj = 0x0;
        for (cte = 0x0; cte < cta['objects']['length']; ++cte) {
            if (0x1e == (cti = cta['objects'][cte])['i']) {
                if (ctj++, null != cti['st'] && 'string' != typeof cti['st']) return 'Object sign text error.';
                if ((cti['st'] || '')['length'] > cth['signTextLimit']) return 'Object sign text to long.';
                if (ctj > cth['signLimit']) return 'Too many signs.';
                if (cti['sf'] && cti['sf'] > cth['signFontMax'] || cti['sf'] && cti['sf'] < cth['signFontMin']) return 'Object sign font error.';
            }
            if (!ctf['isArray'](cti['s']) || 0x3 != cti['s']['length'] || !ctf['arrayInts'](cti['s'])) return 'Object scale error.';
            if (!ctf['isArray'](cti['p']) || 0x3 != cti['p']['length'] || !ctf['arrayInts'](cti['p'])) return 'Object position error.';
            if (ctf['isArray'](cti['r'])) {
                if (0x3 != cti['r']['length'] || !ctf['arrayInts'](cti['r'])) return 'Object rotation value error.';
            } else if (null != cti['r']) return 'Object rotation error.';
            if (null != cti['d'] && !ctf['isNumber'](cti['d'])) return 'Object direction error.';
            cti['col'] = !!cti['col'];
        }
        return null;
    }, module['exports']['obj'] = function(ctz, ctA, ctB, ctC, ctD, ctE, ctF, ctG, ctH, ctI) {
        this['isCustom'] = ctz, this['isPrimary'] = 0x0 == ctA, this['sid'] = ctk++, this['gameInstance'] = null, this['connectedClients'] = 0x0, this['password'] = void 0x0, this['pendingGameId'] = null, this['gameClosed'] = !0x1, this['map'] = new cte['manager'](ctC, ctE, ctf, cth), this['store'] = require("./store.js"), this['attach'] = require("./attach.js"), this['weapons'] = require("./weapons.js"), this['classes'] = cti, this['streaks'] = require("./streaks.js"), this['maxStreak'] = this['streaks']['sort']((cta, ctb) => cta['kills'] < ctb['kills'] ? 0x1 : ctb['kills'] < cta['kills'] ? -0x1 : 0x0)[0x0]['kills'], this['sprays'] = require("./sprays.js"), this['triggers'] = require("./triggers.js"), this['projectiles'] = new(require("./projectiles.js"))(this, ctF), this['controls'] = null, this['players'] = new(require("./players.js"))['manager'](this, ctC, ctD, ctE, ctf, ctg, cth, ctF), this['endData'] = {
            'ed': [],
            'vo': null,
            'mts': []
        }, this['endTimer'] = 0x0, this['endIndex'] = null, this['banList'] = [], this['destObjs'] = [], this['hideWeapon'] = [!0x1, !0x1, !0x1], this['voteToKick'] = null, this['voteInitiators'] = [];
        var ctL, ctM, ctN, ctO = this,
            ctP = null;
        this['applyConfig'] = function(cta, ctb, ctc, cte) {
            cta = cta || {}, this['config'] = {};
            for (var ctg, cti = 0x0; cti < cth['serverConfig']['length']; ++cti)
                if ((ctg = cth['serverConfig'][cti])['bool']) this['config'][ctg['varN']] = null == cta[ctg['varN']] ? ctg['def'] : !!cta[ctg['varN']];
                else if (ctg['input']) {
                var ctj = cta[ctg['varN']];
                ctf['isString'](ctj) || (ctj = ctg['def']), this['config'][ctg['varN']] = ctf['sanitizeStr'](ctj), 0x10 < ctj['length'] && (ctj = ctj['substring'](0x0, 0x10));
            } else {
                ctj = cta[ctg['varN']];
                ctf['isNumber'](ctj) || (ctj = ctg['def']), this['config'][ctg['varN']] = ctf['limitMM'](ctj, ctg['min'], ctb && ctg['maxF'] || ctg['max']);
            }
            if (this['config']['maps'] = cta['maps'], !ctf['isArray'](this['config']['maps']) || !this['config']['maps']['length'] || this['config']['maps']['length'] > this['map']['maps']['length']) {
                this['config']['maps'] = [];
                for (cti = 0x0; cti < this['map']['maps']['length']; cti++) this['config']['maps']['push'](cti);
            } else
                for (cti = 0x0; cti < this['config']['maps']['length']; cti++)
                    if (!this['map']['maps'][this['config']['maps'][cti]]) {
                        this['config']['maps'] = [0x0];
                        break;
                    } if (this['config']['modes'] = cta['modes'], !ctf['isArray'](this['config']['modes']) || !this['config']['modes']['length'] || this['config']['modes']['length'] > this['map']['modes']['length']) this['config']['modes'] = null;
            else
                for (cti = 0x0; cti < this['config']['modes']['length']; cti++)
                    if (!this['map']['modes'][this['config']['modes'][cti]]) {
                        this['config']['modes'] = null;
                        break;
                    } var ctk = !0x1;
            if (this['config']['classes'] = cta['classes'], !ctf['isArray'](this['config']['classes']) || !this['config']['classes']['length'] || this['config']['classes']['length'] > this['classes']['length']) ctk = !0x0;
            else
                for (cti = 0x0; cti < this['config']['classes']['length']; cti++)
                    if (!this['classes'][this['config']['classes'][cti]]) {
                        ctk = !0x0;
                        break;
                    } if (ctk) {
                this['config']['classes'] = [];
                for (cti = 0x0; cti < this['classes']['length']; cti++)(!this['classes'][cti]['hide'] || this['isCustom']) && this['config']['classes']['push'](cti);
            }
            this['config']['isFromQueue'] = cta['isFromQueue'] || cte;
        }, this['applyConfig'](), this['getInfo'] = function() {
            return this['mode']['alias'] + '_' + this['map']['maps'][this['mapIndex']]['name'];
        }, this['customMap'] = function(ctb, ctc, cte, ctf, ctg) {
            if (ctb) try {
                var cti = JSON['parse'](ctb);
                if (ctF && (this['customMapData'] = {
                        'data': ctb,
                        'id': ctc,
                        'featured': ctf,
                        'creator': cte
                    }), !ctg) {
                    var ctj = module['exports']['validMap'](cti, ctf);
                    if (ctj) return ctj;
                }
                for (var ctk = 0x0; ctk < cti['objects']['length']; ++ctk) {
                    if (cti['objects'][ctk]['i'] = cth['prefabIDS'][cti['objects'][ctk]['i'] || cti['objects'][ctk]['id'] || 0x0], !cti['objects'][ctk]['i']) return 'Object ID error.';
                    if (cti['objects'][ctk]['t'] = cth['textureIDS'][cti['objects'][ctk]['t'] || 0x0], !cti['objects'][ctk]['t']) return 'Object Texture error.';
                }
                cti['creator'] = cte, this['map']['setMaps']([cti]), this['config']['maps'] = [0x0];
            } catch (cu6) {
                return 'Map error occured.';
            }
        }, this['playSound'] = function(cta, ctb, ctc, cte, ctf) {
            if (ctb)
                if (ctD) ctD['play'](cta, ctb, !0x1, ctf);
                else
                    for (var ctg = 0x0; ctg < this['players']['list']['length']; ++ctg)((ctL = this['players']['list'][ctg])['active'] || ctL['spectating']) && (ctc != ctL || cte) && ctF['send'](ctL['id'], 's', cta, ctc['sid'], ctb);
        }, this['playerSound'] = function(cta, ctb, ctc, cte, ctg, cth) {
            var cti = cte || this['players']['findBySid'](ctb),
                ctj = Howler['pos']();
            cti && !(cth && cth < ctf['getD3D'](cti['x'], cti['y'], cti['z'], ctj[0x0], ctj[0x1], ctj[0x2])) && ctD['play3D'](cta, cti['x'], cti['y'], cti['z'], ctc || 0x1, ctg);
        }, this['triggerImgSound'] = function(cta, ctb, ctc) {
            ctF ? ctF['send'](ctc['id'], 'is', cta, ctb) : (cta && ctD['play'](cta, 0x1), ctb && imgFlash && (imgFlash['style']['display'] = 'block', imgFlash['style']['opacity'] = 0x1, imgFlash['style']['backgroundImage'] = 'url(\'https://assets.krunker.io/textures/' + ctb + '.png\')'));
        }, this['moveObj'] = function(cta, ctb, ctc, cte) {
            cta['x'] = ctb, cta['y'] = ctc, cta['z'] = cte, cta['meshRef'] && cta['meshRef']['position']['set'](ctb, ctc, cte);
        }, this['explosion'] = function(cta, ctb, ctc, cte, ctg, cth, cti) {
            for (var ctj = 0x0; ctj < this['players']['list']['length']; ++ctj)
                if (((ctL = this['players']['list'][ctj])['active'] || ctL['spectating']) && (ctF['send'](ctL['id'], 'ex', Math['round'](cta), Math['round'](ctb), Math['round'](ctc), Math['round'](cte)), ctL['active'])) {
                    var ctk = ctf['getD3D'](cta, ctb, ctc, ctL['x'], ctL['y'], ctL['z']),
                        ctz = 0x1 - ctk / cte;
                    0x0 < ctz && this['players']['changeHealth'](ctL, cth, ctg * ctz * (ctL == cth ? 0.2 : 0x1), cth == ctL) && this['players']['kill'](ctL, cth, {
                        'dst': ctk,
                        'weaponId': cti['weaponId'],
                        'weapon': cti['weapon']
                    });
                }
        };
        var cuC = [];
        this['getSpawnPoint'] = function(cta, ctb, ctc) {
            if (ctc) return this['map']['spawns'][0x0];
            cuC['length'] = 0x0;
            for (var cte, ctg = 0x0; ctg < this['map']['spawns']['length']; ++ctg) {
                this['map']['spawns'][ctg]['dst'] = 0x0;
                for (var cti = 0x0; cti < this['players']['list']['length']; ++cti)(ctL = this['players']['list'][cti]) && ctL['active'] && ctL != ctb && (!cta || ctL['team'] != cta) && !this['canSee'](ctL, this['map']['spawns'][ctg]['x'], this['map']['spawns'][ctg]['y'] + cth['ahnMyEEY'], this['map']['spawns'][ctg]['z']) && (this['map']['spawns'][ctg]['dst']++, 0x0);
            }
            this['map']['spawns']['sort'](ctf['orderByDst']), cte = this['map']['spawns'][0x0]['dst'];
            for (ctg = 0x0; ctg < this['map']['spawns']['length']; ++ctg)
                if (this['map']['spawns'][ctg]['dst'] == cte) {
                    this['map']['spawns'][ctg]['dst'] = 0x0;
                    for (cti = 0x0; cti < this['players']['list']['length']; ++cti)(ctL = this['players']['list'][cti])['active'] && ctL != ctb && (!cta || ctL['team'] != cta) && (this['map']['spawns'][ctg]['dst'] += ctf['getD3D'](this['map']['spawns'][ctg]['x'], this['map']['spawns'][ctg]['y'], this['map']['spawns'][ctg]['z'], ctL['x'], ctL['y'], ctL['z']));
                    (cta && this['map']['spawns'][ctg]['team'] == cta || !this['map']['spawns'][ctg]['team']) && cuC['push'](this['map']['spawns'][ctg]);
                } return cuC['sort'](ctf['orderByDst']), cuC['reverse'](), cuC[0x0] || this['map']['spawns'][0x0];
        }, this['canSee'] = function(cta, ctb, ctc, cte, ctg) {
            if (!cta) return !0x1;
            ctg = ctg || 0x0;
            for (var cti, ctj = ctf['getD3D'](cta['x'], cta['y'], cta['z'], ctb, ctc, cte), ctk = ctf['getDir'](cta['z'], cta['x'], cte, ctb), ctz = ctf['getDir'](ctf['getDistance'](cta['x'], cta['z'], ctb, cte), ctc, 0x0, cta['y']), ctA = 0x1 / (ctj * Math['sin'](ctk - Math['PI']) * Math['cos'](ctz)), ctB = 0x1 / (ctj * Math['cos'](ctk - Math['PI']) * Math['cos'](ctz)), ctC = 0x1 / (ctj * Math['sin'](ctz)), ctD = cta['y'] + cta['height'] - cth['cameraHeight'], ctE = 0x0; ctE < this['map']['manager']['objects']['length']; ++ctE)
                if (!(cti = this['map']['manager']['objects'][ctE])['noShoot'] && cti['active'] && !cti['transparent']) {
                    var ctF = ctf['lineInRect'](cta['x'], cta['z'], ctD, ctA, ctB, ctC, cti['x'] - Math['max'](0x0, cti['width'] - ctg), cti['z'] - Math['max'](0x0, cti['length'] - ctg), cti['y'] - Math['max'](0x0, cti['height'] - ctg), cti['x'] + Math['max'](0x0, cti['width'] - ctg), cti['z'] + Math['max'](0x0, cti['length'] - ctg), cti['y'] + Math['max'](0x0, cti['height'] - ctg));
                    if (ctF && 0x1 > ctF) return ctF;
                } var ctG = this['map']['terrain'];
            if (ctG) {
                var ctH = ctG['raycast'](cta['x'], -cta['z'], ctD, 0x1 / ctA, -0x1 / ctB, 0x1 / ctC);
                if (ctH) return ctf['getD3D'](cta['x'], cta['y'], cta['z'], ctH['x'], ctH['z'], -ctH['y']);
            }
            return null;
        }, this['updateAccounts'] = function() {
            for (var cta = [], ctb = 0x0; ctb < this['players']['list']['length']; ++ctb)(ctL = this['players']['list'][ctb])['account'] && !ctL['account']['hack'] && (ctL['account']['timePlayed'] += ctL['playTime'] || 0x0, this['players']['saveClassScores'](ctL), null == this['host'] && !(this['mode'] && this['mode']['noReward']) && (ctL['account']['games']++, ctL['account']['kills'] += ctL['kills'], ctL['account']['deaths'] += ctL['deaths'], ctL['account']['score'] += ctL['score'], ctL['didWin'] && ctL['account']['wins']++, cta['push'](ctL)), ctF['send'](ctL['id'], 'ua', ctL['account']['getData']()));
            cta['length'] && this['saveRewards'](cta);
        }, this['updateELO'] = function() {
            var cta = !0x0;
            for (var ctb of this['players']['list'])
                if (ctb['account'] && ctb['didWin']) {
                    cta = !0x1;
                    break;
                } var ctc = {};
            for (var ctb of this['players']['list'])
                if (!(!ctb['account'] || ctb['account']['hack'] || ctb['account']['level'] < cth['minRankedLevel'])) {
                    ctc[cte = ctb['team'] || ctb['id']] || (ctc[cte] = {
                        'eloAvg': 0x0,
                        'playerCount': 0x0
                    }), ctc[cte]['eloAvg'] += ctb['account'][this['queueConfig']['accountKey']], ctc[cte]['playerCount'] += 0x1;
                } for (var cte in ctc) ctc[cte]['eloAvg'] /= ctc[cte]['playerCount'];
            var ctf = cth['eloK'];
            for (var ctb of this['players']['list'])
                if (!(!ctb['account'] || ctb['account']['hack'] || ctb['account']['level'] < cth['minRankedLevel'])) {
                    cte = ctb['team'] || ctb['id'];
                    var ctg = null;
                    for (var cti in ctc) cti != cte && (ctg = ctc[cti]['eloAvg']);
                    if (null != ctg) {
                        var ctj = 0x1 / (0x1 + Math['pow'](0xa, (ctg - ctb['account'][this['queueConfig']['accountKey']]) / 0x190)),
                            ctk = ctb['didWin'] ? 0x1 : 0x0;
                        ctb['ELO'] = cta ? 0x0 : ctf * (ctk - ctj), ctb['account'][this['queueConfig']['accountKey']] += ctb['ELO'] || 0x0, 0x0 > ctb['account'][this['queueConfig']['accountKey']] && (ctb['account'][this['queueConfig']['accountKey']] = 0x0), ctB['call'](0x36, [ctb['account']['id'], ctb['account'][this['queueConfig']['accountKey']], this['queueConfig']['teamSize']], function() {});
                    }
                }
        }, this['saveRewards'] = function(cta) {
            for (var ctb = '', ctc = 0x0; ctc < cta['length']; ++ctc) cta[ctc] && cta[ctc]['account'] && cta[ctc]['reward'] && (ctb += (ctb['length'] ? ',' : '') + cta[ctc]['account']['id'] + ',' + cta[ctc]['reward']);
            ctb['length'] && ctB['call'](0x14, [ctb], function(ctb, ctc) {
                if (ctc && ctc[0x0] && ctc[0x0][0x0] && (ctc = ctc[0x0][0x0]['result'])) try {
                    ctc = ctc['split'](',');
                    for (var cte, ctf = 0x0; ctf < ctc['length']; ++ctf)(cte = parseInt(ctc[ctf])) && cta[ctf] && (cta[ctf]['account']['funds'] = cte, ctF['send'](cta[ctf]['id'], 'uf', cte));
                } catch (cvk) {}
            });
        }, this['incStat'] = function(cta, ctb) {
            ctb && ctb['account'] && null == this['host'] && (!ctb['account']['stats'][cta] && (ctb['account']['stats'][cta] = 0x0), ctb['account']['stats'][cta]++);
        }, this['checkLeave'] = function(cta) {
            !cta || cta['account'] && this['mode'] && this['mode']['isRanked'] && !this['endTimer'] && (cta['account']['stats']['abR'] = Date['now'](), cta['account'][this['queueConfig']['accountKey']] -= 0x10, 0x0 > cta['account'][this['queueConfig']['accountKey']] && (cta['account'][this['queueConfig']['accountKey']] = 0x0), ctB['call'](0x36, [cta['account']['id'], cta['account'][this['queueConfig']['accountKey']], this['queueConfig']['teamSize']], function() {}));
        }, this['savePlayerData'] = function(cta, ctb) {
            if (ctB && cta['account']) {
                if (null == this['host']) {
                    var ctc = 0x0,
                        cte = 0x0,
                        ctf = 0x0;
                    for (var ctg in cth['regionIND'])
                        if (ctg == ctb) {
                            ctc = cth['regionIND'][ctg];
                            break;
                        } if (ctc)
                        for (var cti = 0x1; 0x5 > cti; ++cti) ctc == cti && (!cta['account']['stats']['r' + cti] && (cta['account']['stats']['r' + cti] = 0x0), cta['account']['stats']['r' + cti]++), cta['account']['stats']['r' + cti] && cta['account']['stats']['r' + cti] >= ctf && (ctf = cta['account']['stats']['r' + cti], cte = cti);
                    cte && (cta['account']['regionInd'] = cte);
                }
                var ctj = cta['account'];
                ctj && ctB['call'](0x2, [ctj['id'], ctj['kills'], ctj['wins'], ctj['games'], ctj['deaths'], ctj['score'], ctj['clan'], ctj['timePlayed'], JSON['stringify'](ctj['stats']), ctj['regionInd']]);
            }
        }, this['lockPlayer'] = function(cta, ctb) {
            cta['locked'] = ctb, ctF['send'](cta['id'], 'lock', ctb);
        }, this['lockMove'] = function(cta) {
            ctO['moveLock'] = !!cta, ctF && ctF['broadcast']('game' + ctO['sid'], 'lm', cta ? 0x1 : 0x0);
        }, this['updateTeam'] = function(cta, ctb) {
            cta['team'] = ctb;
            for (var ctc = 0x0; ctc < cta['sentTo']['length']; ++ctc) ctF['send'](cta['sentTo'][ctc], 'tm', cta['sid'], ctb);
            this['players']['syncLeaders']();
        }, this['startNuke'] = function(cta) {
            this['nukeTimer'] = 0x2710, this['nukePlayer'] = cta, ctF['broadcast']('game' + this['sid'], 'n', 0x0);
        };
        var cvD = [];
        this['infectRandom'] = function() {
            cvD['length'] = 0x0;
            for (var cta = 0x0; cta < this['players']['list']['length']; ++cta) this['players']['list'][cta]['active'] && cvD['push'](cta);
            var ctb = 0x1;
            0xe <= cvD['length'] ? ctb = 0x3 : 0x8 <= cvD['length'] && (ctb = 0x2);
            var ctc;
            for (cta = 0x0; cta < ctb; ++cta) ctc = ctf['randInt'](0x0, cvD['length'] - 0x1), (ctL = this['players']['list'][cvD[ctc]]) && (this['updateTeam'](ctL, 'inf'), this['players']['kill'](ctL, null, null, !0x0), ctF['broadcast']('game' + this['sid'], 'ac', ctL['sid'], null, 'got infected')), cvD['splice'](ctc, 0x1);
        }, this['pickSimon'] = function() {
            cvD['length'] = 0x0;
            for (var cta = null, ctb = 0x0; ctb < this['players']['list']['length']; ++ctb)
                if (this['players']['list'][ctb]['active']) {
                    if (this['host'] == this['players']['list'][ctb]['id']) {
                        cta = this['players']['list'][ctb];
                        break;
                    }
                    cvD['push'](ctb);
                } cta || (cta = this['players']['list'][cvD[ctf['randInt'](0x0, cvD['length'] - 0x1)]]), cta && (this['updateTeam'](cta, 'simon'), cta['maxHealth'] = 0x1388, cta['health'] = cta['maxHealth'], ctF['send'](cta['id'], 'h', cta['health']));
        }, this['pickStalker'] = function() {
            cvD['length'] = 0x0;
            for (var cta = 0x0; cta < this['players']['list']['length']; ++cta) this['players']['list'][cta]['active'] && cvD['push'](cta);
            (ctL = this['players']['list'][cvD[ctf['randInt'](0x0, cvD['length'] - 0x1)]]) && (this['updateTeam'](ctL, 'stalk'), ctL['maxHealth'] = 0x190, ctL['health'] = ctL['maxHealth'], ctL['regen'] = 0x0, ctF['send'](ctL['id'], 'h', ctL['health']), ctL['updateLoadout'](this, 0x0, !0x0, 0xc), ctF['broadcast']('game' + this['sid'], 'inat', ctL['sid'], [0xc], 0x0, void 0x0, void 0x0, !0x1));
        }, this['pickBoss'] = function() {
            cvD['length'] = 0x0;
            for (var cta = 0x0; cta < this['players']['list']['length']; ++cta) this['players']['list'][cta]['active'] && cvD['push'](cta);
            (ctL = this['players']['list'][cvD[ctf['randInt'](0x0, cvD['length'] - 0x1)]]) && (this['updateTeam'](ctL, 'boss'), ctL['maxHealth'] = 0x2710, ctL['health'] = ctL['maxHealth'], ctL['regen'] = 0x0, ctF['send'](ctL['id'], 'h', ctL['health']));
        }, this['lockSeekers'] = function() {
            for (var cta = 0x0; cta < this['players']['list']['length']; ++cta) this['players']['list'][cta]['active'] && 'seek' == this['players']['list'][cta]['team'] && this['lockPlayer'](this['players']['list'][cta], !0x0);
        }, this['pickSeeker'] = function() {
            cvD['length'] = 0x0;
            for (var cta = 0x0; cta < this['players']['list']['length']; ++cta) this['players']['list'][cta]['active'] && cvD['push'](cta);
            (ctL = this['players']['list'][cvD[ctf['randInt'](0x0, cvD['length'] - 0x1)]]) && (this['updateTeam'](ctL, 'seek'), this['lockPlayer'](ctL, !0x0));
        }, this['releaseSeeker'] = function() {
            for (var cta = 0x0; cta < this['players']['list']['length']; ++cta) 'seek' == (ctL = this['players']['list'][cta])['team'] && this['lockPlayer'](ctL, !0x1);
        }, this['destroyObj'] = function(cta) {
            for (var ctb = 0x0; ctb < ctO['map']['manager']['objects']['length']; ++ctb)
                if ((ctL = ctO['map']['manager']['objects'][ctb])['uid'] == cta) {
                    ctL['active'] = !0x1, ctL['meshRef'] && (ctL['meshRef']['visible'] = !0x1), ctC && ctC['updateShadowMap']();
                    break;
                }
        }, this['respawnObj'] = function(cta) {
            for (var ctb = 0x0; ctb < ctO['map']['manager']['objects']['length']; ++ctb)
                if ((ctL = ctO['map']['manager']['objects'][ctb])['uid'] == cta) {
                    ctO['destObjs']['splice'](ctO['destObjs']['indexOf'](ctL['uid']), 0x1), ctL['active'] = !0x0, null != ctL['health'] && (ctL['health'] = ctL['startHealth']), ctL['meshRef'] && (ctL['meshRef']['visible'] = !0x0), ctC && ctC['updateShadowMap']();
                    break;
                }
        }, this['capFlag'] = function(cta, ctb) {
            ctF && (cta['caps']++, cta['flag'] = null, this['teams'][cta['team']] ? this['teams'][cta['team']]++ : this['teams'][cta['team']] = 0x1, ctF['broadcast']('game' + this['sid'], 'ts', cta['team'], this['teams'][cta['team']]), ctF['broadcast']('game' + ctO['sid'], 'ac', cta['sid'], null, 'captured the Flag'), ctF['send'](cta['id'], 'am', ['Capture', 0x96]), this['players']['score'](cta, 0x96), this['resetFlag'](ctb));
        }, this['updateFlagCol'] = function(cta, ctb) {
            ctb && ctb['team'] && cta['teamCol'] != ctb['team'] && cta['meshRef'] && (cta['teamCol'] = ctb['team'], cta['meshRef']['material'] = ctC['getMat']('crystal_0', ctO['map']['manager']['getFlagDat'](cta['team'], ctb)), cta['meshRef']['zoneMesh']['material'] = ctC['getMat']('zone_r', ctO['map']['manager']['getZoneDat'](cta['team'], ctb)));
        }, this['updateFlags'] = function(cta, ctb) {
            if (ctO['mode'] && ctO['mode']['flags']) {
                for (var ctc = !0x1, cte = !0x1, ctf = 0x0; ctf < ctO['map']['manager']['flags']['length']; ++ctf)(ctL = ctO['map']['manager']['flags'][ctf])['meshRef'] && (cta && ctO['updateFlagCol'](ctL, cta), ctL['carrier'] ? (cta && ctL['team'] == cta['team'] && (cte = !0x0), cta && ctL['carrier'] == cta['sid'] && (ctc = !0x0), (ctM = ctO['players']['findBySid'](ctL['carrier'])) && ctC['moveMesh'](ctL['meshRef'], ctM['x'], ctM['y'] + cth['flagHOff'], ctM['z'])) : ctC['moveMesh'](ctL['meshRef'], ctL['x'], ctL['y'], ctL['z']), ctL['bobAnimY'] = (ctL['bobAnimY'] || 0x0) + 0.003 * ctb, ctL['meshRef']['position']['y'] += Math['cos'](ctL['bobAnimY']), ctL['meshRef']['rotation']['y'] += 0.002 * ctb);
                cte && ctc ? gameMessage['innerHTML'] != cth['flagMsgRC'] && (gameMessage['innerHTML'] = cth['flagMsgRC']) : cte ? gameMessage['innerHTML'] != cth['flagMsgE'] && (gameMessage['innerHTML'] = cth['flagMsgE']) : ctc ? gameMessage['innerHTML'] != cth['flagMsg'] && (gameMessage['innerHTML'] = cth['flagMsg']) : '' != gameMessage['innerHTML'] && (gameMessage['innerHTML'] = ''), specGMessage['innerHTML'] = gameMessage['innerHTML'];
            }
        }, this['updateFlag'] = function(cta, ctb, ctc, cte, ctf) {
            for (var ctg = 0x0; ctg < ctO['map']['manager']['flags']['length']; ++ctg)
                if ((ctL = ctO['map']['manager']['flags'][ctg])['uid'] == cta) {
                    ctL['carrier'] = ctf, ctO['moveObj'](ctL, ctb, ctc, cte);
                    break;
                }
        }, this['dropFlag'] = function(cta) {
            if (ctF && cta && cta['carrier']) {
                var ctb = this['players']['findBySid'](cta['carrier']);
                this['updateCarrier'](cta), ctb ? (ctF['broadcast']('game' + ctO['sid'], 'ac', ctb['sid'], null, 'dropped the Flag'), ctb['flag'] = null, this['updateObjPos'](cta, ctb['x'], ctb['y'] + cth['flagOff'], ctb['z'])) : this['updateObjPos'](cta, cta['orgX'], cta['orgY'], cta['orgZ']);
            }
        }, this['pickupFlag'] = function(cta, ctb) {
            ctF && ctO['mode'] && ctO['mode']['flags'] && !ctb['carrier'] && (cta['team'] == ctb['team'] ? (ctb['x'] != ctb['orgX'] || ctb['y'] != ctb['orgY'] || ctb['z'] != ctb['orgZ']) && (ctF['broadcast']('game' + ctO['sid'], 'ac', cta['sid'], null, 'returned the Flag'), ctF['send'](cta['id'], 'am', ['Return', 0x32]), this['players']['score'](cta, 0x32), this['resetFlag'](ctb)) : !cta['flag'] && (ctF['send'](cta['id'], 'am', ['Pickup', 0x14]), this['players']['score'](cta, 0x14), this['updateCarrier'](ctb, cta), ctF['broadcast']('game' + ctO['sid'], 'ac', cta['sid'], null, 'got the Flag')));
        }, this['syncFlag'] = function(cta) {
            ctF['broadcast']('game' + ctO['sid'], 'ufl', cta['uid'], cta['x']['round'](0x1), cta['y']['round'](0x1), cta['z']['round'](0x1), cta['carrier'] || 0x0);
        }, this['updateCarrier'] = function(cta, ctb) {
            cta['carrier'] = ctb ? ctb['sid'] : 0x0, ctb && (ctb['flag'] = cta), this['syncFlag'](cta);
        }, this['resetFlags'] = function() {
            for (var cta = 0x0; cta < ctO['map']['manager']['flags']['length']; ++cta)
                if ((ctL = ctO['map']['manager']['flags'][cta])['carrier'] = 0x0, ctL['x'] = ctL['orgX'], ctL['y'] = ctL['orgY'], ctL['z'] = ctL['orgZ'], ctL['meshRef']) {
                    var ctb = !(!ctO['mode'] || !ctO['mode']['flags']);
                    ctL['meshRef']['visible'] = ctb, ctL['meshRef']['zoneMesh']['visible'] = ctb;
                }
        }, this['resetFlag'] = function(cta) {
            this['updateObjPos'](cta, cta['orgX'], cta['orgY'], cta['orgZ']), this['updateCarrier'](cta);
        }, this['updatePickup'] = function(cta, ctb, ctc, cte) {
            if (ctL = this['map']['manager']['findByUid'](cta, this['map']['manager']['pickups'])) {
                if (ctC) {
                    ctM = ctL['meshRef'];
                    var ctf = cte || [ctM['position']['x'], ctM['position']['y'], ctM['position']['z']];
                    ctC['scene']['remove'](ctL['meshRef']), ctL['meshRef'] = ctC['loadMesh']({
                        'src': 'weapons/' + this['weapons'][ctb || 0x0]['src'],
                        'texSrc': 'weapons/' + this['weapons'][ctb || 0x0]['src'],
                        'noGroup': !0x0,
                        'noShadow': !0x0,
                        'transparent': !0x0,
                        'noFog': !0x0
                    }, ...ctf, 0x0, this['weapons'][ctb || 0x0]['scale'], ctC['scene']), ctL['meshRef']['rotation']['copy'](ctM['rotation']['clone']()), ctL['meshRef']['visible'] = null != ctb;
                }
                ctL['x'] = cte ? cte[0x0] : ctL['orgX'], ctL['y'] = cte ? cte[0x1] : ctL['orgY'], ctL['z'] = cte ? cte[0x2] : ctL['orgZ'], ctc && (ctL['orgPickup'] = ctc), ctL['pickup'] = ctb;
            }
        }, this['resetPickups'] = function() {
            for (var cta = 0x0; cta < ctO['map']['manager']['pickups']['length']; ++cta)(ctL = ctO['map']['manager']['pickups'][cta])['pickup'] = ctL['orgPickup'], ctL['x'] = ctL['orgX'], ctL['y'] = ctL['orgY'], ctL['z'] = ctL['orgZ'], ctC && (ctM = ctL['meshRef'], ctC['scene']['remove'](ctL['meshRef']), ctL['meshRef'] = ctC['loadMesh']({
                'src': 'weapons/' + ctO['weapons'][ctL['pickup']]['src'],
                'texSrc': 'weapons/' + ctO['weapons'][ctL['pickup']]['src'],
                'noGroup': !0x0,
                'noShadow': !0x0,
                'transparent': !0x0,
                'noFog': !0x0
            }, ctL['x'], ctL['y'] - cth['pickupZoneH'] / 0x2 + cth['pickupOff'], ctL['z'], 0x0, ctO['weapons'][ctL['pickup']]['scale'], ctC['scene']), ctL['meshRef']['rotation']['copy'](ctM['rotation']['clone']()), ctL['meshRef']['visible'] = !0x0);
        }, this['increaseWeapon'] = function(cta, ctb) {
            (ctL = null == ctb['weaponId'] ? [ctb['weaponId']] : [...cta['loadout']])['length'] = 0x1, cta['weaponTier']++, ctL[0x0] = cta['weaponTier'] >= this['mode']['weaponOrder']['length'] ? this['mode']['weaponOrder'][this['mode']['weaponOrder']['length'] - 0x1] : this['mode']['weaponOrder'][cta['weaponTier']], ctF['broadcast']('game' + this['sid'], 'inat', cta['sid'], ctL, 0x0, void 0x0, void 0x0, !0x1), cta['updateLoadout'](this, 0x0, !0x0, ...ctL);
        }, this['decreaseWeapon'] = function(cta) {
            (ctL = [...cta['loadout']])['length'] = 0x1, cta['weaponTier']--, 0x0 > cta['weaponTier'] ? cta['weaponTier'] = 0x0 : cta['setbacks']++, ctL[0x0] = this['mode']['weaponOrder'][cta['weaponTier']], ctF['broadcast']('game' + this['sid'], 'inat', cta['sid'], ctL, 0x0, void 0x0, void 0x0, !0x1), cta['updateLoadout'](this, 0x0, !0x0, ...ctL);
        }, this['updateGate'] = function(cta, ctb) {
            for (var ctc = 0x0; ctc < ctO['map']['manager']['gates']['length']; ++ctc)
                if ((ctL = ctO['map']['manager']['gates'][ctc])['uid'] == cta) {
                    ctL['active'] = ctb, ctL['meshRef'] && (ctL['meshRef']['visible'] = ctb), ctC && ctC['updateShadowMap']();
                    break;
                }
        }, this['resetGates'] = function() {
            for (var cta = 0x0; cta < ctO['map']['manager']['gates']['length']; ++cta)(ctL = ctO['map']['manager']['gates'][cta])['active'] = !ctL['startClosed'], ctL['meshRef'] && (ctL['meshRef']['visible'] = ctL['active']);
        }, this['updateBank'] = function(cta, ctb) {
            for (var ctc = 0x0; ctc < ctO['map']['manager']['banks']['length']; ++ctc)
                if ((ctL = ctO['map']['manager']['banks'][ctc])['uid'] == cta) {
                    ctL['deposited'] = ctb;
                    break;
                }
        }, this['resetBanks'] = function() {
            for (var cta = 0x0; cta < ctO['map']['manager']['banks']['length']; ++cta)(ctL = ctO['map']['manager']['banks'][cta])['deposited'] = 0x0;
        }, this['updateObjPos'] = function(cta, ctb, ctc, cte) {
            cta['x'] = ctb, cta['y'] = ctc, cta['z'] = cte, this['syncFlag'](cta);
        }, this['updateZone'] = function(cta) {
            ctO['map']['zone']['update'](cta);
        }, this['resetZone'] = function() {
            ctO['map']['zone'] && ctO['map']['zone']['reset']();
        }, this['setObjective'] = function(cta) {
            try {
                ctO['activeObjective'] = cta;
                for (var ctb = 0x0; ctb < ctO['map']['manager']['objectives']['length']; ++ctb) ctO['map']['manager']['objectives'][ctb]['mesh']['visible'] = cta == ctb;
            } catch (cwF) {}
        }, this['nextObjective'] = function(cta, ctb) {
            if (this['activeObjective']++, this['activeObjective'] >= this['map']['manager']['objectives']['length'] && (this['activeObjective'] = 0x0), ctF['broadcast']('game' + this['sid'], 'obj', this['activeObjective']), 0x1 < this['map']['manager']['objectives']['length']) {
                var ctc = {
                    'time': 0xea60 - (cta || 0x0),
                    'contTime': !0x0,
                    'canDMG': !0x0,
                    'msg': 'next objective ',
                    'trigger': function(cta, ctb) {
                        cta['nextObjective'](ctb);
                    }
                };
                ctb && this['waitTimers'] ? this['waitTimers']['push'](ctc) : this['waitTimers'] = [ctc];
            }
        }, this['setCheckPoint'] = function(cta, ctb) {
            if (ctL = {
                    'x': ctb['x'],
                    'y': ctb['y'],
                    'z': ctb['z'],
                    'dir': ctb['dir']
                }, ctM = Object['values'](ctL)['join'](','), !cta['checkPoint'] || Object['entries'](cta['checkPoint'])['toString']() !== Object['entries'](ctL)['toString']()) {
                if (ctb['singleUse']) {
                    if (cta['checkPointList']['includes'](ctM)) return;
                    cta['checkPointList']['push'](ctM);
                }
                cta['checkPoint'] = ctL, ctF && ctF['send'](cta['id'], 'chp');
            }
        }, this['checkTeleport'] = function(cta, ctb) {
            if (!(0x1 == ctb['node'] || 0x0 < ctb['telCooldown'])) {
                for (var ctc = [], cte = 0x0; cte < this['map']['manager']['teleporters']['length']; ++cte)(ctL = this['map']['manager']['teleporters'][cte])['channel'] == ctb['channel'] && 0x0 < ctL['node'] && ctb['uid'] != ctL['uid'] && ctc['push'](ctL);
                if (ctc['length']) {
                    var ctf = ctc[0x0];
                    ctf && (0x2 == ctf['node'] && (ctf['telCooldown'] = 0x7d0), ctO['players']['changePosition'](cta, ctf['x'], ctf['y'] - ctf['height'], ctf['z'], ctf['telStopMo']));
                }
            }
        }, this['updateTeleporters'] = function(cta) {
            if (ctO['map']['manager']['teleporters']['length'])
                for (var ctb = 0x0; ctb < ctO['map']['manager']['teleporters']['length']; ++ctb)(ctL = ctO['map']['manager']['teleporters'][ctb])['telCooldown'] -= cta, 0x0 >= ctL['telCooldown'] && (ctL['telCooldown'] = 0x0);
        }, this['updateDetructables'] = function(cta) {
            if (ctF && this['destObjs']['length'])
                for (var ctb = 0x0; ctb < this['map']['manager']['objects']['length']; ++ctb) ctL = this['map']['manager']['objects'][ctb], -0x1 < (ctM = ctO['destObjs']['indexOf'](ctL['uid'])) && ctL['canRespawn'] && (!ctL['respawnT'] && ctL['respawnR'] && (ctL['respawnT'] = ctf['randInt'](0x1, 0x1388)), ctL['respawnT'] -= cta, 0x0 >= ctL['respawnT'] && (this['destObjs']['splice'](ctM, 0x1), ctL['active'] = !0x0, ctL['respawnT'] = ctL['respawnR'] ? 0x0 : ctL['respawnTStart'], null != ctL['health'] && (ctL['health'] = ctL['startHealth']), ctF['broadcast']('game' + this['sid'], 'ro', ctL['uid']), ctL && ctL['onRespawn'] && ctL['destroyedBy'] && this['onTrigger'](ctL['destroyedBy'], ctL), ctL['destroyedBy'] = null));
        }, this['updateUI'] = function() {
            killCount['style']['display'] = this['mode']['friendly'] ? 'none' : 'inline-block';
        }, this['instanceConfig'] = function() {}, this['voteMatch'] = function(cta, ctb) {
            this['endData']['vo'] && (this['endData']['vo'][cta] = this['endData']['vo'][cta] == ctb ? null : ctb, ctF['broadcast']('game' + this['sid'], 'mv', this['endData']['vo'], this['endData']['mts']));
        };
        var cwY = [];
        this['init'] = function(cta, ctg, cti) {
            this['players']['clear']();
            this['teams'] = {};
            cwY['length'] = 0x0;
            var ctk = null;
            if (this['endData']['mts']['length']) {
                for (var ctz = 0x0; ctz < this['endData']['mts']['length']; ++ctz)
                    if (0x0, cwY[ctz] = 0x0, this['endData']['vo'])
                        for (var ctA in this['endData']['vo']) this['endData']['vo']['hasOwnProperty'](ctA) && this['endData']['mts'][ctz] == this['endData']['vo'][ctA] && cwY[ctz]++;
                var ctB = 0x0;
                for (ctz = 0x0; ctz < cwY['length']; ++ctz) cwY[ctz] > ctB && (ctB = cwY[ctz], ctk = this['endData']['mts'][ctz]);
                0x0 == ctB && (ctk = this['endData']['mts'][0x0] || null);
            }
            if (null != ctk) {
                var ctC = ctk['split'](',');
                this['modeIndex'] = parseInt(ctC[0x0]), this['mapIndex'] = parseInt(ctC[0x1]);
            } else {
                this['modeIndex'] = null == ctg ? this['config']['modes'] ? this['config']['modes'][ctf['randInt'](0x0, this['config']['modes']['length'] - 0x1)] : ctf['randInt'](0x0, 0x3) : ctg;
                this['mapIndex'] = null == cta ? this['config']['maps'][ctf['randInt'](0x0, this['config']['maps']['length'] - 0x1)] : cta;
            }
            this['destObjs']['length'] = 0x0;
            this['mode'] = cte['modes'][this['modeIndex']];
            this['map']['generate'](this['mapIndex'], this['mode'], cti);
            this['resetFlags']();
            this['resetPickups']();
            this['resetGates']();
            this['resetBanks']();
            this['resetZone']();
            this['minPlayers'] = this['config']['minPlayers'] || this['mode']['minPlayers'];
            !this['minPlayers'] && (this['config']['lives'] || this['mode']['lives'] || 0x0) && (this['minPlayers'] = 0x2);
            this['voteToKick'] = null;
            this['voteInitiators']['length'] = 0x0;
            this['needAllTimer'] = 0xc350;
            this['zoneTimer'] = 0x0;
            this['nukeTimer'] = 0x0;
            this['objectiveTimer'] = 0x0;
            this['activeObjective'] = null;
            this['gameTimer'] = null == this['mode']['gameTime'] ? 0xea60 * this['config']['gameTime'] : this['mode']['gameTime'];
            this['lastTimer'] = 0x0;
            this['lastTimerW'] = 0x0;
            this['lastTimerNA'] = 0x0;
            this['waitTimers'] = null;
            if (this['mode']['waitTimers']) {
                this['waitTimers'] = [];
                for (ctz = 0x0; ctz < this['mode']['waitTimers']['length']; ++ctz) this['waitTimers']['push']({
                    'time': this['mode']['waitTimers'][ctz]['time'],
                    'trigger': this['mode']['waitTimers'][ctz]['trigger'],
                    'noJoin': this['mode']['waitTimers'][ctz]['noJoin'],
                    'msg': this['mode']['waitTimers'][ctz]['msg']
                });
            } else(this['config']['lives'] || this['mode']['lives']) && (this['waitTimers'] = [{
                'time': 0x4e20,
                'msg': 'match starts in ',
                'trigger': function(cta) {
                    for (var ctb = 0x0; ctb < cta['players']['list']['length']; ++ctb) cta['players']['list'][ctb]['spectating'] && (cta['players']['list'][ctb]['lives'] = 0x0);
                }
            }]);
            if (this['config']['warmupTime'] && (this['lockMove'](!0x0), !this['waitTimers'] && (this['waitTimers'] = []), this['waitTimers']['unshift']({
                    'time': 0xea60 * this['config']['warmupTime'],
                    'msg': 'warmup ends ',
                    'trigger': function(cta) {
                        cta['lockMove'](!0x1);
                    }
                })), this['condition'] = this['mode']['condition'] ? [...this['mode']['condition']] : null, (this['config']['lives'] || this['mode']['lives']) && (!this['condition'] && (this['condition'] = [], this['mode']['teams'] ? this['condition']['push'](function(cta) {
                    for (var ctb = 0x0, ctc = 0x0, cte = 0x0; cte < cta['players']['list']['length']; ++cte) 0x0 < cta['players']['list'][cte]['lives'] && (0x1 == cta['players']['list'][cte]['team'] ? ctb++ : ctc++);
                    return 0x1 <= ctb && 0x1 <= ctc;
                }) : this['condition']['push'](function(cta) {
                    for (var ctb = 0x0, ctc = 0x0; ctc < cta['players']['list']['length']; ++ctc) 0x0 < cta['players']['list'][ctc]['lives'] && ctb++;
                    return 0x1 < ctb;
                })), !this['winCondition'] && (this['mode']['teams'] ? this['winCondition'] = function(cta) {
                    for (var ctb = 0x0; ctb < cta['players']['list']['length']; ++ctb)
                        if (cta['players']['list'][ctb]['team'] && 0x0 < cta['players']['list'][ctb]['lives']) return cta['players']['list'][ctb]['team'];
                    return 0x1;
                } : this['winCondition'] = function(cta) {
                    for (var ctb = 0x0; ctb < cta['players']['list']['length']; ++ctb)
                        if (0x0 < cta['players']['list'][ctb]['lives']) return cta['players']['list'][ctb];
                    return null;
                })), this['scoreLimit'] = this['config']['scoreLimit'] || this['mode']['scoreLimit'] || 0x0, this['scoreLimit'] && (!this['condition'] && (this['condition'] = []), this['mode']['teams'] ? this['condition']['push'](function(cta) {
                    for (var ctb = 0x0; ctb < cta['teams']; ++ctb)
                        if (cta['teams'][ctb] >= cta['scoreLimit']) return 0x0;
                    return 0x1;
                }) : this['condition']['push'](function(cta) {
                    for (var ctb = 0x0; ctb < cta['players']['list']['length']; ++ctb)
                        if (cta['players']['list'][ctb]['score'] >= cta['scoreLimit']) return 0x0;
                    return 0x1;
                })), this['kills'] = 0x0, ctF && this['mode']['gameStart'] && this['mode']['gameStart'](this), ctD) {
                ctD['rate'] = 0x1;
                var ctE = this['mode']['ambInd'] || this['map']['maps'][this['mapIndex']]['ambInd'] || 0x1;
                (ctE = parseInt(ctE)) != ctP && (null != ctP && ctD['stop']('ambient_' + ctP), ctP = ctE, ctD['play']('ambient_' + ctE, 0.12, !0x0, 0x1));
            }
            if (ctG) {
                let cta = {
                    'mC': this['maxPlayers'],
                    'pv': this['private'],
                    'sk': !this['isCustom'],
                    'pgi': this['pendingGameId'],
                    'data': {
                        'cs': this['isCustom'],
                        'i': this['getInfo'](),
                        'v': ctj
                    }
                };
                if (this['gameInstance']) this['gameInstance']['update'](cta);
                else if (this['gameInstance'] = ctG['createGame'](ctH, cta), ctF && !cth['isProd']) {
                    var ctI = require("./79.js"),
                        ctL = require("./79.js"),
                        ctM = ctI['join'](ctb['cwd'](), 'version.json');
                    ctL['watchFile'](ctM, {
                        'interval': 0x64
                    }, () => {
                        cta['data']['v'] = ctj = JSON['parse'](ctL['readFileSync'](ctM, 'utf8')), this['gameInstance']['update'](cta);
                    });
                }
            }
        }, this['leaveGame'] = function(cta) {
            var ctb = this['host'] == cta;
            (this['config']['isFromQueue'] ? 0x0 >= this['connectedClients'] : ctb) ? this['destroyGame'](ctb): this['mode'] && this['mode']['needAll'] && this['endGame'](0x3);
        }, this['startQueuedGame'] = function() {
            this['config']['isFromQueue'];
        }, this['getTeamScores'] = function() {
            var cta = null;
            return this['mode'] && this['mode']['teams'] && this['teams'] && (cta = [
                [0x1, this['teams'][0x1] || 0x0],
                [0x2, this['teams'][0x2] || 0x0]
            ]), cta;
        }, this['getSyncData'] = function() {
            for (var cta = [], ctb = [], ctc = [], cte = [], ctf = 0x0; ctf < this['map']['manager']['flags']['length']; ++ctf) ctL = this['map']['manager']['flags'][ctf], cta['push']([ctL['uid'], ctL['x']['round'](0x1), ctL['y']['round'](0x1), ctL['z']['round'](0x1), ctL['carrier'] || 0x0]);
            for (ctf = 0x0; ctf < this['map']['manager']['pickups']['length']; ++ctf) ctL = this['map']['manager']['pickups'][ctf], ctb['push']([ctL['uid'], ctL['pickup'], ctL['orgPickup'] || 0x0, [ctL['x'], ctL['y'], ctL['z']]]);
            for (ctf = 0x0; ctf < this['map']['manager']['gates']['length']; ++ctf) ctL = this['map']['manager']['gates'][ctf], ctc['push']([ctL['uid'], ctL['active']]);
            for (ctf = 0x0; ctf < this['map']['manager']['banks']['length']; ++ctf) ctL = this['map']['manager']['banks'][ctf], cte['push']([ctL['uid'], ctL['deposited']]);
            return {
                'dest': this['destObjs']['length'] ? this['destObjs'] : 0x0,
                'flg': cta['length'] ? cta : 0x0,
                'pkups': ctb['length'] ? ctb : 0x0,
                'gates': ctc['length'] ? ctc : 0x0,
                'banks': cte['length'] ? cte : 0x0,
                'zone': this['map']['zone'] ? this['map']['zone']['scale'] : 0x0,
                'lck': this['moveLock'] ? 0x1 : 0x0
            };
        }, this['onTrigger'] = function(cta, ctb) {
            ctF && this['triggers']['actions'][ctb['triggerAction']] && this['triggers']['actions'][ctb['triggerAction']]['execute'](this, ctF, cta, ctb);
        }, this['endGame'] = function(cta) {
            if (this['endTimer'] = this['mode']['infEndTimer'] ? 'inf' : cth['endTimer'], this['endIndex'] = null == cta ? null : cta, this['waitTimers'] = null, this['mode']['endSort'] ? this['players']['list']['sort'](this['mode']['endSort']) : this['players']['list']['sort'](ctf['orderByScore']), null != this['endIndex']) this['winner'] = null;
            else if (this['mode']['winCondition']) this['winner'] = this['mode']['winCondition'](this);
            else if (this['mode']['teams'] && this['teams']) {
                var ctb = 0x0,
                    ctc = null;
                for (var cte in this['teams']) this['teams']['hasOwnProperty'](cte) && this['teams'][cte] >= ctb && (ctb = this['teams'][cte], ctc = cte);
                this['winner'] = 0x0 == ctb ? null : ctc;
            } else this['winner'] = this['players']['list'][0x0];
            for (var ctg = 0x0; ctg < this['players']['list']['length']; ++ctg)(ctL = this['players']['list'][ctg])['didWin'] = ctL['team'] && ctL['team'] == this['winner'] || ctL == this['winner'];
            if (this['mode']['isRanked'] && this['updateELO'](), null == this['host'] && null == this['endIndex'])
                for (ctg = 0x0; ctg < this['players']['list']['length']; ++ctg)
                    if ((ctL = this['players']['list'][ctg])['reward'] = 0x0, ctL['account'] && !ctL['account']['hack']) {
                        var cti = ctL['score'] * (this['mode']['rewardMlt'] || 0x1);
                        ctL['reward'] = Math['min'](0x1e, Math['floor'](cti / 0x64)), ctL['challMode'] && (ctL['reward'] = Math['floor'](1.5 * ctL['reward']));
                    } this['endData']['ed']['length'] = 0x0;
            var ctj = this['mode']['endStats'] || cth['endStats'];
            for (ctg = 0x0; ctg < this['players']['list']['length']; ++ctg)
                for (var ctk = 0x0; ctk < ctj['length']; ++ctk) this['endData']['ed']['push'](cth['endForm'][ctj[ctk]] ? cth['endForm'][ctj[ctk]](this['players']['list'][ctg][ctj[ctk]], this, this['players']['list'][ctg]) : this['players']['list'][ctg][ctj[ctk]]);
            this['endData']['vo'] = {}, this['endData']['tms'] = this['getTeamScores']();
            let ctz = this['config'] ? this['config']['modes'] || this['map']['rotationModes'] : null,
                ctA = this['config']['maps'] || this['map']['rotationMaps'];
            this['endData']['mts']['length'] = 0x0;
            for (var ctB = 0x0, ctC = -0x1 < ctz['indexOf'](0x0); 0x4 > this['endData']['mts']['length'];) {
                let cta = 0x0 == ctB && ctC ? 0x0 : ctz ? ctz[ctf['randInt'](0x0, ctz['length'] - 0x1)] : ctf['randInt'](0x0, 0x3),
                    ctb = ctA[ctf['randInt'](0x0, ctA['length'] - 0x1)];
                if (0x0 > this['endData']['mts']['indexOf'](cta + ',' + ctb) && this['endData']['mts']['push'](cta + ',' + ctb), 0x14 < ++ctB) break;
            }
            for (ctg = 0x0; ctg < this['players']['list']['length']; ++ctg)(ctL = this['players']['list'][ctg])['reset'](), ctL['account'] && (ctL['account']['playedMatch'] = !0x0), ctF['send'](ctL['id'], 'end', !0x1, ctL['didWin'], this['endData'], ctL['account'] && ctL['account']['playedMatch']);
            this['updateAccounts'](), this['players']['clear']();
        }, this['update'] = function(cta, ctb, ctc) {
            if (this['now'] = ctb, ctF) {
                var cte = !0x0;
                if (0x0 < this['endTimer'] ? (cte = !0x1, this['endTimer'] -= cta, 0x0 >= this['endTimer'] ? (this['init'](), this['endTimer'] = 0x0, ctF['broadcast']('game' + this['sid'], 'init', this['mapIndex'], this['modeIndex'], this['getTeamScores'](), this['activeObjective'], this['host'], this['config'], 0x0, this['customMapData'] ? 0x1 : null, this['getSyncData']()), this['isPrimary'] && ctf['restartIfNeeded'](ctF)) : (ctN = ctf['getTime'](this['endTimer'])) != this['lastTimer'] && (this['lastTimer'] = ctN, ctF['broadcast']('game' + this['sid'], 't', ctN, 0x1))) : 'inf' == this['endTimer'] ? this['endTimer'] != this['lastTimer'] && (this['lastTimer'] = this['endTimer'], ctF['broadcast']('game' + this['sid'], 't', 'inf', this['endIndex'] || 0x2)) : this['waitTimers'] && (cte = !0x1, !this['waitTimers'][0x0]['contTime'] && this['minPlayers'] && this['players']['activeCount']() < this['minPlayers'] ? this['mode']['needAll'] ? (this['needAllTimer'] -= cta, 0x0 >= this['needAllTimer'] ? this['endGame'](0x3) : (ctN = ctf['getTime'](this['needAllTimer'])) != this['lastTimerNA'] && (this['lastTimerNA'] = ctN, ctF['broadcast']('game' + this['sid'], 'gmsg', 'wt', ctN))) : ctF['broadcast']('game' + this['sid'], 'gmsg', 'wt') : (this['waitTimers'][0x0]['time'] -= cta, 0x0 >= this['waitTimers'][0x0]['time'] ? (this['waitTimers'][0x0]['trigger'] && this['waitTimers'][0x0]['trigger'](this, -this['waitTimers'][0x0]['time']), 0x0 >= this['waitTimers'][0x0]['time'] && (this['waitTimers']['splice'](0x0, 0x1), !this['waitTimers']['length'] && (this['waitTimers'] = null, ctF['broadcast']('game' + this['sid'], 'gmsg')))) : (ctN = ctf['getTime'](this['waitTimers'][0x0]['time'])) != this['lastTimerW'] && (this['lastTimerW'] = ctN, ctF['broadcast']('game' + this['sid'], 'gmsg', this['waitTimers'][0x0]['msg'] + ctN)))), 0x0 >= this['endTimer'] && (cte || this['waitTimers'] && this['waitTimers'][0x0]['contTime'])) {
                    if (this['condition'])
                        for (var ctg = 0x0; ctg < this['condition']['length']; ctg++)
                            if (!this['condition'][ctg](this)) {
                                this['gameTimer'] = 'skip';
                                break;
                            }
                    'skip' != this['gameTimer'] && this['mode']['timed'] ? (this['gameTimer'] += cta, (ctN = ctf['getTime'](this['gameTimer'], this['mode']['showMS'])) != this['lastTimer'] && (this['lastTimer'] = ctN, ctF['broadcast']('game' + this['sid'], 't', ctN))) : (0x0 < this['gameTimer'] || 'skip' == this['gameTimer']) && ('skip' != this['gameTimer'] && (this['gameTimer'] -= cta), 'skip' == this['gameTimer'] || 0x0 >= this['gameTimer'] ? (this['gameTimer'] = 0x0, this['endGame']()) : (ctN = ctf['getTime'](this['gameTimer'], this['mode']['showMS'])) != this['lastTimer'] && (this['lastTimer'] = ctN, ctF['broadcast']('game' + this['sid'], 't', ctN)));
                }
                if (0x0 >= this['endTimer'] && this['nukeTimer'] && (this['nukeTimer'] -= cta, 0x0 >= this['nukeTimer'] && (this['nukeTimer'] = 0x0, ctF['broadcast']('game' + this['sid'], 'n', 0x1), this['nukePlayer']))) {
                    var cth = 0x0;
                    for (ctg = 0x0; ctg < this['players']['list']['length']; ++ctg)(ctL = this['players']['list'][ctg])['active'] && ctL != this['nukePlayer'] && (!ctL['team'] || this['nukePlayer']['team'] != ctL['team']) && (cth += 0x32, this['players']['kill'](ctL, this['nukePlayer'], {
                        'streak': 0x0
                    }, !0x1, !0x0));
                    cth && (ctF['send'](this['nukePlayer']['id'], '6', ['Nuke', cth], 0x0, this['nukePlayer']['kills'], cth / 0x32), ctF['send'](this['nukePlayer']['id'], '4'), this['players']['score'](this['nukePlayer'], cth));
                }
                this['voteToKick'] && (this['voteToKick']['timer'] -= cta, 0x0 >= this['voteToKick']['timer'] && (this['voteToKick'] = null, ctF['broadcast']('game' + this['sid'], 'vk', null)));
            }
            if (this['players']['update'](cta * this['config']['deltaMlt']), this['updateTeleporters'](cta), this['updateDetructables'](cta), ctF && this['mode']['objective'] && this['map']['manager']['objectives']['length'] && this['waitTimers'] && this['waitTimers'][0x0]['contTime'] && (this['objectiveTimer'] -= cta, 0x0 >= this['objectiveTimer'])) {
                this['objectiveTimer'] = 0x5dc;
                for (ctg = 0x0; ctg < this['map']['manager']['objectives']['length']; ++ctg)
                    if (ctL = this['map']['manager']['objectives'][ctg], ctg == this['activeObjective'])
                        for (var cti = 0x0; cti < this['players']['list']['length']; ++cti)(ctM = this['players']['list'][cti])['active'] && ctM['collides'](ctL) && this['players']['score'](ctM, 0xa);
            }
            if (this['map']['zone'])
                if (!ctF || this['waitTimers']) this['map']['zone']['animate'](cta);
                else if (this['zoneTimer'] -= cta, 0x0 >= this['zoneTimer']) {
                this['zoneTimer'] = 0x3e8, this['map']['zone']['shrink'](), ctF['broadcast']('game' + this['sid'], 'zn', this['map']['zone']['scale']);
                for (cti = 0x0; cti < this['players']['list']['length']; ++cti)(ctM = this['players']['list'][cti])['active'] && 'inf' != ctM['team'] && this['map']['zone']['isOutside'](ctM) && this['players']['changeHealth'](ctM, null, 0xa) && this['players']['kill'](ctM, null, {});
            }
            this['projectiles']['update'](cta * this['config']['deltaMlt']), ctE && ctE['update'](cta * this['config']['deltaMlt'], ctc), ctC && ctC['render'](cta * this['config']['deltaMlt']);
        }, this['destroyGame'] = function() {
            ctF['broadcast']('game' + this['sid'], 'error', 'Host ended game'), ctF['clearRoom']('game' + this['sid']), this['gameInstance']['destroy']();
            var cta = ctI['indexOf'](this);
            0x0 <= cta && ctI['splice'](cta, 0x1);
        }, this['validateAccountName'] = function(cta) {
            return !this['validAccountNames'] || !!cta && -0x1 != this['validAccountNames']['indexOf'](cta);
        };
    };
}.call(this, require("process")));
