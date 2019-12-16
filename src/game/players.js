var c74;
try {
    window && (c74 = require("three"));
} catch (c75) {}
var c76 = function(c71, c72, c73, c74, c76, c7c) {
    var c7d;
    this['id'] = c71, this['sentTo'] = [], this['inputs'] = [], this['spins'] = [], this['stateHistory'] = [], this['weaponMeshes'] = [], this['weaponGeos'] = {}, this['legMeshes'] = [], this['armMeshes'] = [], this['lastInput'] = [], this['lastDeltas'] = [], this['reloads'] = [], this['ammos'] = [], this['ping'] = 0x0, this['pings'] = [], this['avgSpn'] = 0x0, this['score'] = 0x0, this['scoreObjs'] = {}, this['checkPoint'] = null, this['checkPointList'] = [], this['lstDrs'] = [], this['convs'] = 0x0, this['timer'] = null, this['gameTimer'] = null, this['classScores'] = {}, this['kills'] = 0x0, this['deaths'] = 0x0, this['assists'] = 0x0, this['melees'] = 0x0, this['setbacks'] = 0x0, this['caps'] = 0x0, this['deathStreak'] = 0x0, this['level'] = 0x0, this['lives'] = c7c['waitTimers'] && c7c['config'] && (c7c['config']['lives'] || c7c['mode']['lives']) || 0x0, this['deltaAdd'] = 0x0, this['deltaDiv'] = 0x1, this['sprayIndex'] = 0x0, this['hatIndex'] = -0x1, this['backIndex'] = -0x1, this['meleeIndex'] = -0x1, this['skinColIndex'] = -0x1, this['attachIndex'] = 0x0, this['lastSpray'] = 0x0, this['lastInteract'] = 0x0, this['lastPicked'] = [], this['playTime'] = 0x0, this['sCount'] = 0x0, this['streaks'] = {}, this['deathInfo'] = {}, this['ELO'] = 0x0, this['weaponTier'] = 0x0, this['inputLock'] = !0x1, this['init'] = function(c71, c72, c73, c74, c7c, c7d) {
        this['x'] = c71, this['y'] = c72, this['z'] = c73, this['stepSrc'] = null, this['name'] = c74 || 'unknown', this['xVel'] = 0x0, this['yVel'] = 0x0, this['zVel'] = 0x0, this['lastInObj'] = 0x0, this['renderMinimal'] = !0x1, this['spins']['length'] = 0x0, this['noMovTimer'] = 0x0, this['noMovT'] = 0x0, this['xDire'] = 0x0, this['yDire'] = 0x0, this['hitTimer'] = 0x0, this['ticker'] = 0x0, this['spread'] = 0x0, this['spreadPlus'] = 0x0, this['aimVal'] = 0x1, this['aimDir'] = 0x0, this['aimTime'] = 0x0, this['streak'] = 0x0, this['killStreak'] = 0x0, this['realKillStreak'] = 0x0, this['lastKill'] = 0x0, this['stateHistory']['length'] = 0x0, this['lastInput']['length'] = 0x0, this['swapTweenA'] = 0x0, this['dmgReceived'] = {}, this['landBobY'] = 0x0, this['landBobYR'] = 0x0, this['jumpBobY'] = 0x0, this['slideTimer'] = 0x0, this['canSlide'] = !0x0, this['leanAnimX'] = 0x0, this['leanAnimY'] = 0x0, this['leanAnimZ'] = 0x0, this['bobAnimZ'] = 0x0, this['bobAnimY'] = 0x0, this['idleAnim'] = 0x0, this['inspecting'] = !0x1, this['inspectX'] = !0x1, this['stepVal'] = 0x0, this['stepChase'] = 0x0, this['stepDir'] = 0x1, this['stepDirR'] = 0x1, this['reward'] = 0x0, this['recoilAnim'] = 0x0, this['recoilAnimY'] = 0x0, this['recoilForce'] = 0x0, this['recoilTweenY'] = 0x0, this['recoilTweenYM'] = 0x0, this['recoilTweenZ'] = 0x0, this['burstCount'] = 0x0, this['jumpRot'] = 0x0, this['jumpRotM'] = 0x0, this['slideLegV'] = 0x0, this['recoilX'] = 0x0, this['recoilZ'] = 0x0, this['crouchVal'] = 0x0, this['onGround'] = !0x0, this['onLadder'] = !0x1, this['terrainSlipping'] = !0x1, this['rampFix'] = null, this['didJump'] = !0x1, this['jumpCooldown'] = 0x0, this['didShoot'] = !0x1, this['lodActive'] = !0x1, this['locked'] = !0x1, this['latestData'] = !0x1, this['airTime'] = 0x0, this['height'] = c76['ahnMyEEY'], this['headScale'] = c76['cameraHeight'], this['scale'] = c76['ByVdmGMS'], this['active'] = !0x0, this['interpolate'] = !0x1, this['isYou'] = c7c, this['sentTo']['length'] = 0x0, this['inputSN'] = 0x0, this['inputs']['length'] = 0x0, this['weaponIndex'] = 0x0, this['swapTime'] = 0x0, this['recon'] = !0x1, this['cnBSeen'] = !0x1, this['meleeAnim'] = {}, this['isHacker'] = c7d, this['customLoadout'] = null, this['isHidden'] = !0x1, this['lastPicked']['length'] = 0x0, this['propID'] = 0x0, this['weaponTier'] = 0x0, this['inObject'] = null, this['inputFreq'] = 0x0;
    }, this['setClass'] = function(c71, c72, c74, c7c) {
        c7c || (c71['config'] && 0x0 > c71['config']['classes']['indexOf'](c72) && (c72 != c71['config']['classes'][0x0] && (this['skins'] = [-0x1, -0x1]), c72 = c71['config']['classes'][0x0]), c71['mode'] && (c71['mode']['noWeap'] && (c72 = 0x9), c71['mode']['teamClass'] && c71['mode']['teamClass'][this['team']] && (c72 = c71['mode']['teamClass'][this['team']], this['skins'] = [-0x1, -0x1]))), (null == c72 || null == c72) && (c72 = c71['classes']['length'] - 0x1), this['classIndex'] = c72, this['reloads']['length'] = 0x0, this['ammos']['length'] = 0x0, this['loadout'] = [c71['classes'][c72]['loadout'][0x0]], !!c71['config'] && c71['config']['noSecondary'] || (c71['classes'][c72]['secondary'] ? c73['isNumber'](c74) && this['loadout']['push'](c74) : this['secIndex'] = null), 0x0 > this['loadout']['indexOf'](0xc) && this['loadout']['push'](0xc), this['speed'] = c71['classes'][c72]['speed'] || 0x1;
        for (var c7d = 0x0; c7d < this['loadout']['length']; ++c7d) this['reloads']['push'](0x0), this['ammos']['push'](c71['weapons'][this['loadout'][c7d]]['ammo']);
        this['reloadTimer'] = 0x0, this['regenDelay'] = c71['classes'][c72]['regenDelay'] || c76['regenDelay'], this['maxHealth'] = c71['classes'][c72]['health'] * (c71['config'] && c71['config']['healthMlt'] || 0x1), this['health'] = this['maxHealth'], this['hpChase'] = 0x1, this['regen'] = c71['mode'] && c71['mode']['noRegen'] ? 0x0 : c71['classes'][c72]['regen'] || c76['regenVal'];
    }, this['updateLoadout'] = function(c71, c74, c76 = !0x0, c7c, c7d) {
        this['weaponIndex'] = c74, this['reloads']['length'] = 0x0, this['ammos']['length'] = 0x0, this['loadout'] = [c7c], this['skins'] = [-0x1, -0x1], c73['isNumber'](c7d) && this['loadout']['push'](c7d), c73['isNumber'](c7d) && (this['secIndex'] = c7d), 0x0 > this['loadout']['indexOf'](0xc) && this['loadout']['push'](0xc);
        for (var c7u = 0x0; c7u < this['loadout']['length']; ++c7u) this['reloads']['push'](0x0), this['ammos']['push'](c71['weapons'][this['loadout'][c7u]]['ammo']);
        this['customLoadout'] = [...this['loadout']], c76 && this['active'] && c72['regenMeshes'](this);
    }, this['resetInputs'] = function() {
        this['inputs']['length'] = 0x0;
    }, this['procInputs'] = function(c71, c7c, c7x, c7y) {
        this['recon'] = c7x;
        var c7z = Math['max'](0x0, Math['min'](c71[0x1], c76['dltMx'])) / this['deltaDiv'];
        this['inputSN'] = c71[0x0];
        var c7A = c73['getAngleDst'](c71[0x2], this['xDire']);
        c72['saveSpin'](this, c7A);
        var c7B = !c7x && this['isYou'];
        if (c7B && (this['leanAnimX'] -= c7A * c76['leanSens'], this['leanAnimX'] = c73['limit'](this['leanAnimX'], c76['leanMax']), this['leanAnimY'] -= c73['getAngleDst'](c71[0x3], this['yDire']) * c76['leanSens'], this['leanAnimY'] = c73['limit'](this['leanAnimY'], c76['leanMax']), this['leanAnimX'] && (this['leanAnimX'] *= Math['pow'](c76['leanPull'], c7z)), this['leanAnimY'] && (this['leanAnimY'] *= Math['pow'](c76['leanPull'], c7z)), this['leanAnimZ'] && (this['leanAnimZ'] *= Math['pow'](c76['leanPullZ'], c7z)), this['bobAnimZ'] && (this['bobAnimZ'] *= Math['pow'](c76['bobPullZ'], c7z)), this['bobAnimY'] && (this['bobAnimY'] *= Math['pow'](c76['bobPullY'], c7z)), this['recoilX'] && (this['recoilX'] *= Math['pow'](c76['leanPull'], c7z)), this['recoilZ'] && (this['recoilZ'] *= Math['pow'](c76['leanPull'], c7z)), this['inspecting'] && this['inspectX'] < Math['PI'] / 2.8 && (this['inspectX'] += 0.1 * (Math['PI'] / 2.8 - this['inspectX']))), this['xDire'] = (c71[0x2] || 0x0)['round'](0x3), this['yDire'] = (c71[0x3] || 0x0)['round'](0x3), this['yDire'] > Math['PI'] / 0x2 ? this['yDire'] = Math['PI'] / 0x2 : this['yDire'] < -Math['PI'] / 0x2 && (this['yDire'] = -Math['PI'] / 0x2), !c7y) {
            if (0x2 == c71[0xb] ? c72['swapMelee'](this, c7x) : 0x1 == c71[0xb] ? c72['swapSecondary'](this, c7x) : 0x3 == c71[0xb] ? c72['swapWeapon'](this, null, null, void 0x0, 0x0, c7x) : c71[0xa] && c72['swapWeapon'](this, c71[0xa], !0x1, void 0x0, void 0x0, c7x), c7x || (this['recoilForce'] && (this['recoilAnim'] += this['recoilForce'] * c7z, this['recoilAnimY'] += this['recoilForce'] * (this['weapon']['recoilY'] || 0x1) * (0x1 - 0.3 * this['crouchVal']) * c7z, this['recoilForce'] *= Math['pow'](this['weapon']['recoverF'], c7z)), this['recoilAnim'] && (this['recoilAnim'] *= Math['pow'](this['weapon']['recover'], c7z)), this['recoilAnimY'] && (this['recoilAnimY'] *= Math['pow'](this['weapon']['recoverY'] || this['weapon']['recover'], c7z))), this['oldX'] = this['x'], this['oldY'] = this['y'], this['oldZ'] = this['z'], this['weapon']['zoom'] && 'prop' != this['team'] && (!this['weapon']['noAim'] || 0x0 < this['swapTime'])) {
                var c7C = 0x0 >= this['reloadTimer'] && 0x0 >= this['swapTime'];
                c71[0x6] && 0x0 < this['aimVal'] && c7C ? (c72['cancelInspect'](this), this['aimDir'] = 0x0, this['aimVal'] -= 0x1 / (this['weapon']['aimSpeed'] / c7z), 0x0 >= this['aimVal'] && (this['aimVal'] = 0x0, this['isYou'] && !c7x && c72['toggleAim'](this, 0x1)), this['isYou'] && !c7x && !this['weapon']['scope'] && c72['updateAim'](this, 0x1 - this['aimVal'])) : (!c7C || !c71[0x6] && 0x1 > this['aimVal']) && (this['aimDir'] = 0x1, !this['aimVal'] && this['isYou'] && !c7x && c72['toggleAim'](this, 0x0), this['aimVal'] += 0x1 / (this['weapon']['aimSpeed'] / c7z), 0x1 <= this['aimVal'] && (this['aimVal'] = 0x1), this['isYou'] && !c7x && !this['weapon']['scope'] && c72['updateAim'](this, 0x1 - this['aimVal'])), 0x0 == this['aimVal'] ? this['aimTime'] += c7z : this['aimTime'] = 0x0;
            }
            c71[0x8] && 0x1 > this['crouchVal'] && !this['onLadder'] ? (this['crouchVal'] += c76['crouchSpeed'] * c7z, 0x1 <= this['crouchVal'] && (this['crouchVal'] = 0x1), this['onGround'] ? c7B && (this['bobAnimY'] -= 1.4 * c76['crouchAnim'] * c7z) : this['y'] += c76['crouchSpeed'] * c7z) : !c71[0x8] && 0x0 < this['crouchVal'] && (this['crouchVal'] -= c76['crouchSpeed'] * c7z, 0x0 >= this['crouchVal'] && (this['crouchVal'] = 0x0), this['onGround'] ? c7B && (this['bobAnimY'] += c76['crouchAnim'] * c7z) : this['y'] -= c76['crouchSpeed'] * c7z), this['crouchVal'] && (this['crouchVal'] = this['crouchVal']['round'](0x3)), c72['updateHeight'](this);
            var c7D, c7E = this['onGround'] || this['onLadder'];
            c7D = c7E ? (this['terrainSlipping'] ? c76['slippingSpeed'] : c76['playerSpeed']) * this['speed'] : c76['airSpeed'], c7D *= this['aimVal'] ? 0x1 : c76['aimSlow'], c7D *= c7c['mode']['spdMlt'] && c7c['mode']['spdMlt'][this['team']] || 0x1, c7D *= this['crouchVal'] ? c76['crouchSlow'] : 0x1, c7D *= this['weapon']['spdMlt'] * c7z;
            var c7F = 0x0;
            if (c7F = this['onLadder'] ? c76['ladderDecel'] : this['terrainSlipping'] ? c76['terrainSlipDecel'] : this['onTerrain'] ? c76['terrainDecel'] : this['onGround'] ? c76['groundDecel'] : c76['airDecel'], 0.5 >= this['crouchVal'] && (this['canSlide'] = !0x0), this['onGround'] && this['crouchVal'] || (this['slideTimer'] = 0x0), this['slideTimer'])
                if (this['slideTimer'] -= c7z, 0x0 >= this['slideTimer']) this['slideTimer'] = 0x0;
                else {
                    c7D *= 0.25, c7F = this['onTerrain'] ? c76['terrainSlideDecel'] : c76['slideDecel'];
                    var c7G = c73['getDistance'](this['xVel'], this['zVel'], 0x0, 0x0),
                        c7H = c73['getDir'](0x0, 0x0, this['xVel'], this['zVel']),
                        c7I = c73['getDir'](Math['sin'](this['xDire']), Math['cos'](this['xDire']), 0x0, 0x0),
                        c7J = 0.03 * c73['getAngleDst'](c7I, c7H);
                    this['xVel'] = c7G * Math['cos'](c7H + Math['PI'] - c7J), this['zVel'] = c7G * Math['sin'](c7H + Math['PI'] - c7J);
                } this['jumpCooldown'] = Math['max'](this['jumpCooldown'] - c7z, 0x0), this['onGround'] && 0x0 >= this['jumpCooldown'] && c72['tryJump'](this, c71[0x7]), c7E || (this['yVel'] -= c7z * (c76['gravity'] * (c7c['config'] ? c7c['config']['gravMlt'] : 0x1)));
            var c7K = c76['movDirs'][c71[0x4]];
            if (c7K != Math['PI'] && 0x0 != c7K && c7K != Math['PI'] / 0x2 && c7K != -Math['PI'] / 0x2 && (c7D *= c7c['config'] ? c7c['config']['strafeSpd'] : 0x1), void 0x0 !== c7K && (this['xVel'] += c7D * Math['cos'](c7K - this['xDire']), this['zVel'] += c7D * Math['sin'](c7K - this['xDire'])), this['xVel'] && (this['x'] += this['xVel'] * c7z, this['xVel'] *= Math['pow'](c7F, c7z), this['xVel'] = c73['cropVal'](this['xVel'], c76['decelMin'])), this['yVel'] && (this['y'] += this['yVel'] * c7z, this['yVel'] *= Math['pow'](c7F, c7z)), this['zVel'] && (this['z'] += this['zVel'] * c7z, this['zVel'] *= Math['pow'](c7F, c7z), this['zVel'] = c73['cropVal'](this['zVel'], c76['decelMin'])), !c7x) {
                this['xVel'] || this['yVel'] || this['zVel'] ? this['noMovT'] = 0x0 : this['noMovT'] += c7z;
                var c7L = 'stalk' == this['team'] && 0x12c <= this['noMovT'];
                this['isHidden'] != c7L && (this['isHidden'] = c7L, this['isYou'] && (hiddenMsg['style']['display'] = this['isHidden'] ? 'block' : 'none'));
            }
            'prop' == this['team'] && c71[0x5] && c72['pickProp'](this);
            var c7M = this['onGround'] && !this['didJump'],
                c7N = !0x1;
            this['onGround'] = !0x1, this['onLadder'] = !0x1;
            for (var c7O = !0x1, c7P = 'Pickup', c7Q = !0x1, c7R = 0x0; c7R < c7c['map']['manager']['objects']['length']; ++c7R)
                if (((c7d = c7c['map']['manager']['objects'][c7R])['active'] || !c7d['active'] && c7d['closeable']) && c7d['tRadius'] && this['collides'](c7d, c7d['tRadius']) && (c7d['gate'] ? !c7d['noMsg'] && (c7Q = !0x1, c7O = !0x0, c7P = (!c7d['active'] && c7d['closeable'] ? 'Close' : 'Open') + ' gate' + (0x0 == c7d['scoreP'] ? '' : ' <span style=\'color:' + (this['score'] >= c7d['scoreP'] ? c74['interactPopup']['enough'] : c74['interactPopup']['notEnough']) + '\'>[' + (c7d['scoreP'] || 0x0) + ']</span>')) : c7d['bank'] && (c7O = !0x0, c7P = '<span style=\'color:' + c74['interactPopup']['notEnough'] + '\'>[' + c73['commaFormatNum'](c7d['deposited'] || 0x0) + ']</span>', c7Q = [c7d['depositAmnt'], c7d['withdrawAmnt']])), c7d['active'] && this['collides'](c7d))
                    if (c7d['onEnter'] && this['inObject'] != c7d['sid']) c7c['onTrigger'](this, c7d), this['inObject'] = c7d['sid'];
                    else if (c7d['score']) this['scoreObjs'][c7d['sid']] || (this['scoreObjs'][c7d['sid']] = 0x1, c72['score'](this, c7d['scoreP']));
            else if (c7d['teleporter']) c7c['checkTeleport'](this, c7d);
            else if (c7d['checkpoint']) c7c['setCheckPoint'](this, c7d);
            else if (c73['isNumber'](c7d['pickup']) && 'inf' != this['team']) c7d['noMsg'] || (c7O = !0x0, c7Q = !0x1, c7P = 'Pickup weapon' + (0x0 == c7d['scoreP'] ? '' : ' <span style=\'color:' + (this['score'] >= c7d['scoreP'] ? c74['interactPopup']['enough'] : c74['interactPopup']['notEnough']) + '\'>[' + (c7d['scoreP'] || 0x0) + ']</span>'));
            else if (c7d['flag']) c7c['pickupFlag'](this, c7d);
            else if (c7d['trigger']) this['flag'] && c7d['team'] == this['team'] && c7d['flagObj'] && !c7d['flagObj']['carrier'] && c7d['flagObj']['x'] == c7d['flagObj']['orgX'] && c7d['flagObj']['y'] == c7d['flagObj']['orgY'] && c7d['flagObj']['z'] == c7d['flagObj']['orgZ'] && c7c['capFlag'](this, this['flag']);
            else if (c7d['kill']) this['flag'] && (c7c['resetFlag'](this['flag']), this['flag'] = null), c72['hasServer'] && c72['kill'](this);
            else if (c7d['ladder']) {
                if (this['y'] < c7d['y'] + c7d['height'] && 0x0 == this['crouchVal'] && (this['yVel'] = 0x0, this['onLadder'] = !0x0, this['onTerrain'] = !0x1, this['stepSrc'] = null, void 0x0 !== c7K)) {
                    var c7S = (Math['abs'](c73['getAngleDst'](c7d['dir'], c7K - this['xDire'])) - Math['PI'] / 0x2) / (Math['PI'] / 0x2);
                    0x0 < c7S && (this['y'] += c76['ladderSpeed'] * this['weapon']['spdMlt'] * c7z * c7S, this['y'] <= c7d['y'] - c7d['height'] ? this['y'] = c7d['y'] - c7d['height'] : this['y'] >= c7d['y'] + c7d['height'] && (this['y'] = c7d['y'] + c7d['height']));
                }
            } else if (c7d['ramp']) {
                if (this['y'] < c7d['y'] + c7d['height']) {
                    var c7T = Math['max'](0x0, Math['min'](0x1, c73['progressOnLine'](c7d['ramp']['sX'], c7d['ramp']['sZ'], c7d['ramp']['eX'], c7d['ramp']['eZ'], this['x'] + this['scale'] * Math['cos'](c7d['dir']), this['z'] + this['scale'] * Math['sin'](c7d['dir'])))),
                        c7U = c7d['y'] - c7d['height'] + 0x2 * c7d['height'] * c7T;
                    if (this['y'] <= c7U || c7M)
                        if (c7d['boost']) {
                            this['y'] = c7U;
                            var c7V = c7d['boost'] * c76['boosterSpd'] * c7z;
                            this['xVel'] += c7V * Math['sin'](-c7d['dir'] + Math['PI'] / 0x2) * Math['cos'](c7d['boostDr']), this['zVel'] += c7V * Math['cos'](-c7d['dir'] + Math['PI'] / 0x2) * Math['cos'](c7d['boostDr']), this['yVel'] += c7V * Math['sin'](c7d['boostDr']);
                        } else this['oldY'] > this['y'] && c72['resetStep'](this, c7x), this['y'] = c7U, this['yVel'] = 0x0, this['onGround'] = !0x0, this['onTerrain'] = !0x1, c7N = !0x0, this['rampFix'] = c7d['y'] - c7d['height'] + 0x2 * c7d['height'] * Math['round'](c7T);
                }
            } else !c7d['isBorder'] && this['y'] < c7d['y'] + c7d['height'] && c7d['y'] + c7d['height'] - this['y'] <= c76['climbHeight'] && this['oldY'] < c7d['y'] + c7d['height'] && c7M ? (this['y'] += 0.3 * (c7d['y'] + c7d['height'] - this['y']), this['onGround'] = !0x0, this['onTerrain'] = !0x1) : this['oldY'] >= c7d['y'] + c7d['height'] + (c7d['isBorder'] ? c76['borderH'] : 0x0) ? (this['stepSrc'] = c7d['stepSrc'], this['oldY'] > this['y'] && c72['resetStep'](this, c7x), this['y'] = c7d['y'] + c7d['height'] + (c7d['isBorder'] ? c76['borderH'] : 0x0), this['yVel'] = 0x0, this['onGround'] = !0x0, this['onTerrain'] = !0x1) : this['oldX'] - this['scale'] >= c7d['x'] + c7d['width'] - 0.00001 ? (this['x'] = c7d['x'] + c7d['width'] + this['scale'], this['xVel'] = 0x0) : this['oldX'] + this['scale'] <= c7d['x'] - c7d['width'] + 0.00001 ? (this['x'] = c7d['x'] - c7d['width'] - this['scale'], this['xVel'] = 0x0) : this['oldZ'] - this['scale'] >= c7d['z'] + c7d['length'] - 0.00001 ? (this['z'] = c7d['z'] + c7d['length'] + this['scale'], this['zVel'] = 0x0) : this['oldZ'] + this['scale'] <= c7d['z'] - c7d['length'] + 0.00001 ? (this['z'] = c7d['z'] - c7d['length'] - this['scale'], this['zVel'] = 0x0) : this['oldY'] + this['height'] <= c7d['y'] - c7d['height'] && (this['y'] = c7d['y'] - c7d['height'] - this['height'], this['yVel'] = 0x0);
            else c7d['sid'] == this['inObject'] && (this['inObject'] = null);
            !this['didJump'] && null != this['rampFix'] && Math['abs'](this['y'] - this['rampFix']) <= c76['climbHeight'] ? !c7N && (this['y'] = this['rampFix'], this['onGround'] = !0x0, this['yVel'] = 0x0, this['rampFix'] = null) : this['rampFix'] = null;
            var c7W = c7c['map']['terrain'];
            if (c7W) {
                var c7X = c7W['raycast'](this['x'], -this['z'], 0x2710, 0x0, 0x0, -0x4e20, !0x0);
                if (c7X) {
                    var c7Y = c7X['z'];
                    if (this['y'] <= c7Y && (this['oldY'] > this['y'] && c72['resetStep'](this, c7x), this['onTerrain'] = !0x0), this['onTerrain']) {
                        this['onGround'] = !0x0;
                        var c7Z = c7W['_raycastNormal'];
                        c7Z['set'](c7Z['x'], c7Z['z'], -c7Z['y']), this['y'] = c7Y;
                        var c80 = c7Z['x'],
                            c81 = -0x1 + c7Z['y'],
                            c82 = c7Z['z'],
                            c83 = Math['sqrt'](c80 * c80 + c81 * c81 + c82 * c82);
                        if (this['terrainSlipping'] = c83 > c76['terrainSlideThreshold'], this['terrainSlipping'] = !0x1, this['terrainSlipping']) c83 *= c76['gravity'] * (c7c['config'] ? c7c['config']['gravMlt'] : 0x1) * c76['terrainGravityMlt'] * c7z, this['xVel'] += c80 * c83, this['yVel'] += c81 * c83, this['zVel'] += c82 * c83;
                        else this['yVel'] = 0x0, this['jumpCooldown'] = 0x0;
                    }
                }
                this['onTerrain'] || (this['terrainSlipping'] = !0x1);
            }
            if (this['onGround'] ? this['airTime'] = 0x0 : this['airTime'] += c7z, !c7x && 'prop' != this['team']) {
                var c84 = c73['getD3D'](this['oldX'], this['oldY'], this['oldZ'], this['x'], this['y'], this['z']);
                if (this['isYou'] && (this['onLadder'] && (c84 *= 1.4), c73['getDir'](this['oldX'], this['oldZ'], this['x'], this['z']), this['bobAnimZ'] += c73['getDistance'](this['oldX'], this['oldZ'], this['x'], this['z']) * c76['bobMltZ'], this['bobAnimY'] -= (this['oldY'] - this['y']) * c76['bobMltY'], c7E && void 0x0 !== c7K ? (c72['playerStep'](this, c84), this['leanAnimZ'] -= c84 * c76['leanMltZ'] * (this['weapon']['zLnM'] || 0x1) * Math['cos'](c7K)) : this['stepVal'] *= Math['pow'](c76['stepPull'], c7z), this['stepChase'] != this['stepVal'] && (this['stepChase'] += 0.15 * (this['stepVal'] - this['stepChase']))), this['spreadPlus'] += c84 * c76['spreadMove'] + Math['abs'](this['oldY'] - this['y']) * c76['spreadFall'], this['spreadPlus'] *= Math['pow'](c76['spreadRecover'], c7z), this['spread'] = Math['max'](this['weapon']['minSpread'] || 0x0, (this['weapon']['spread'] - this['weapon']['spread'] * c76['crouchSpread'] * this['crouchVal'] + this['recoilAnim'] * (this['weapon']['spreadInc'] || 0x1) * c76['spreadMlt'] + this['spreadPlus']) * this['aimVal']), c71[0x9] && c72['reload'](this), 0x0 < this['reloadTimer']) {
                    var c85 = this['reloadTimer'];
                    this['reloadTimer'] -= c7z, this['isYou'] && c85 >= this['weapon']['reload'] / 0x2 && this['reloadTimer'] < this['weapon']['reload'] / 0x2 && c72['endReload'](this['weapon']), 0x0 >= this['reloadTimer'] && (this['reloadTimer'] = 0x0, this['didShoot'] = !0x1, this['ammos'][this['weaponIndex']] = this['weapon']['ammo'], c72['updatePlayerAmmo'](this));
                }
                0x0 < this['swapTime'] && (this['swapTime'] -= c7z, 0x0 > this['swapTime'] && (this['swapTime'] = 0x0));
                for (c7R = 0x0; c7R < this['reloads']['length']; ++c7R) 0x0 < this['reloads'][c7R] && (this['reloads'][c7R] -= c7z, 0x0 > this['reloads'][c7R] && (this['reloads'][c7R] = 0x0));
                if (this['weapon']) {
                    var c86 = this['burstCount'] || !this['weapon']['nAuto'] && c71[0x5];
                    this['didShoot'] && !c71[0x5] && (this['didShoot'] = !0x1), !this['didShoot'] && c71[0x5] && (c86 = !0x0), c86 && 0x0 >= this['reloads'][this['weaponIndex']] && 0x0 >= this['swapTime'] && 0x0 >= this['reloadTimer'] && (this['noMovTimer'] = 0x0, this['weapon']['melee'] ? c72['melee'](this) : 0x0 < this['ammos'][this['weaponIndex']] ? c72['shoot'](this, c71) : c72['reload'](this));
                }
            }
            c7x && c71['velObj'] && (this['xVel'] -= c71['velObj']['x'], this['zVel'] -= c71['velObj']['y'], this['yVel'] -= c71['velObj']['z'], this['onGround'] = !0x1), c72['playerCollisions'](this), c72['updateInteract'](this, c7O, c7P, c7Q);
        }
    }, this['collides'] = function(c71, c72) {
        return this['x'] - this['scale'] < c71['x'] + (c71['width'] + (c72 || 0x0)) && this['x'] + this['scale'] > c71['x'] - (c71['width'] + (c72 || 0x0)) && this['z'] - this['scale'] < c71['z'] + (c71['length'] + (c72 || 0x0)) && this['z'] + this['scale'] > c71['z'] - (c71['length'] + (c72 || 0x0)) && this['y'] <= c71['y'] + c71['height'] + (c71['isBorder'] ? c76['borderH'] : 0x0) && this['y'] + this['height'] >= c71['y'] - c71['height'];
    }, this['getStateConst'] = function() {
        return this['ping'] * (this['lagComp'] || 0x1);
    }, this['update'] = function(c71, c74) {
        if (this['active']) {
            if (this['inputs']['length']) {
                for (var c7c = 0x0; c7c < this['inputs']['length']; ++c7c) this['procInputs'](this['inputs'][c7c], c71);
                this['resetInputs']();
            }
            if (this['idleAnim'] += c76['idleAnimS'] * c74, this['hpChase'] > this['health'] / this['maxHealth'] ? (this['hpChase'] -= 0.0002 * c74, 0x0 >= this['hpChase'] && (this['hpChase'] = 0x0)) : this['hpChase'] = this['health'] / this['maxHealth'], this['interpolate']) {
                this['dt'] += c74;
                var c7d = Math['min'](1.6, this['dt'] / (c76['serverSendRate'] * c76['interpolation']));
                c7d /= c71['config'] ? c71['config']['deltaMlt'] : 0x1, this['oldX'] = this['x'], this['oldY'] = this['y'], this['oldZ'] = this['z'], this['x'] = this['x1'] + (this['x2'] - this['x1']) * c7d, this['y'] = this['y1'] + (this['y2'] - this['y1']) * c7d, this['z'] = this['z1'] + (this['z2'] - this['z1']) * c7d, this['onGround'] && c72['playerStep'](this, c73['getDistance'](this['oldX'], this['oldZ'], this['x'], this['z'])), this['xDire'] = Math['lerpAngle'](this['xDir2'], this['xDir1'], Math['min'](0x1, c7d)), this['yDire'] = Math['lerpAngle'](this['yDir2'], this['yDir1'], Math['min'](0x1, c7d));
            }
        }
    }, this['resetMeleeAnim'] = function() {
        this['meleeAnim']['armT'] = 0x0, this['meleeAnim']['armM'] = 0x0, this['meleeAnim']['armE'] = 0x0, this['meleeAnim']['weaR'] = 0x0, this['meleeAnim']['weaM'] = 0x0, this['meleeAnim']['armY'] = 0x0, this['meleeAnim']['armR'] = 0x0, this['meleeAnim']['lArm'] = 0x0, this['meleeAnim']['flipW'] = 0x0;
    }, this['reset'] = function() {
        this['checkPoint'] = null, this['checkPointList']['length'] = 0x0, this['weaponTier'] = 0x0, this['customLoadout'] = null, this['lastPicked']['length'] = 0x0, this['inObject'] = null;
    };
};
module['exports']['Player'] = c76, module['exports']['manager'] = function(c71, c72, c8f, c8g, c8h, c8i, c8j, c8k) {
    this['list'] = [];
    var c8l, c8m, c8n, c8o = require("./78.js");
    this['hasServer'] = c8k ? 0x1 : 0x0, this['setTeam'] = function(c72) {
        if (!c71['waitTimers'] && c71['mode']['convTeam']) c72['team'] = c71['mode']['convTeam'];
        else if (c71['mode']['startTeam']) c72['team'] = c71['mode']['startTeam'];
        else if (c71['mode']['friendly']) c72['team'] = 0x1;
        else if (c71['mode']['clanWar']) c72['team'] = c72['account'] && c72['account']['clan'] ? c72['account']['clan'] : 0x1;
        else if (!c72['team'] && c71['mode']['teams'] && !c72['spectating']) {
            for (var c73 = 0x0, c74 = 0x0, c76 = 0x0; c76 < this['list']['length']; ++c76) this['list'][c76]['spectating'] || (this['list'][c76]['team'] == (c71['mode']['teamNs'] ? c71['mode']['teamNs'][0x0] : 0x1) && c73++, this['list'][c76]['team'] == (c71['mode']['teamNs'] ? c71['mode']['teamNs'][0x1] : 0x2) && c74++);
            c72['team'] = c73 >= c74 ? 0x2 : 0x1, c71['mode']['teamNs'] && (c72['team'] = c71['mode']['teamNs'][c72['team'] - 0x1]);
        }
    }, this['update'] = function(c73) {
        for (var c74 = 0x0; c74 < this['list']['length']; ++c74) this['list'][c74]['active'] && (this['list'][c74]['update'](c71, c73), c8k && (this['tickPlayer'](this['list'][c74], c73), this['storeState'](this['list'][c74]), this['list'][c74]['y'] <= c71['map']['deathY'] && (this['list'][c74]['flag'] && (c71['resetFlag'](this['list'][c74]['flag']), this['list'][c74]['flag'] = null), this['kill'](this['list'][c74]))), c72 && (this['updateMsh'](this['list'][c74]), this['updateHeight'](this['list'][c74])));
    }, this['playerCollisions'] = function(c72) {
        if (c8k && c71['mode']['convTeam'] && !c71['waitTimers'])
            for (var c73 = 0x0; c73 < this['list']['length']; ++c73)
                if (c72['active'] && this['list'][c73]['active'] && c72['team'] == c71['mode']['convTeam'] && c72['team'] != this['list'][c73]['team']) {
                    var c74 = c8j['ahnMyEEY'] / 0x2;
                    c8h['getD3D'](c72['x'], c72['y'] + c74, c72['z'], this['list'][c73]['x'], this['list'][c73]['y'] + c74, this['list'][c73]['z']) <= 2.4 * c74 && (c8k['broadcast']('game' + c71['sid'], 'ac', c72['sid'], this['list'][c73]['sid'], c71['mode']['convWord']), this['score'](c72, 0x64), c72['convs']++, c71['updateTeam'](this['list'][c73], c72['team']), c71['mode']['killConv'] && this['kill'](this['list'][c73], null, null, !0x0), c71['gameTimer'] && (c71['gameTimer'] += 0x2710));
                }
    }, this['activeCount'] = function() {
        for (var c71 = 0x0, c72 = 0x0; c72 < this['list']['length']; ++c72) this['list'][c72]['active'] && c71++;
        return c71;
    }, this['forcePos'] = function() {
        for (var c71 = 0x0; c71 < this['list']['length']; ++c71) this['list'][c71]['forcePos'] = !0x0, this['list'][c71]['objInstances'] && (this['list'][c71]['objInstances']['visible'] = !0x1, this['list'][c71]['cnBSeen'] = !0x1);
    }, this['saveSpin'] = function(c71, c72) {
        c8k && (c71['spins']['unshift'](c72), c71['spins']['length'] > c8j['spinTimer'] / c8j['serverTickRate'] && (c71['spins']['length'] = Math['round'](c8j['spinTimer'] / c8j['serverTickRate'])));
    }, this['getSpin'] = function(c71) {
        for (var c72 = 0x0, c73 = 0x0; c73 < c71['spins']['length']; ++c73) c72 += c71['spins'][c73];
        return Math['abs'](c72 * (0xb4 / Math['PI']));
    }, this['storeState'] = function(c72) {
        c72['stateHistory']['unshift']({
            'time': c71['now'],
            'x': c72['x'],
            'y': c72['y'],
            'z': c72['z']
        });
        for (var c73 = c72['stateHistory']['length'] - 0x1; 0x0 <= c73; --c73) c71['now'] - c72['stateHistory'][c73]['time'] >= c8j['stateHistory'] && c72['stateHistory']['splice'](c73, 0x1);
    }, this['fetchState'] = function(c72, c73) {
        for (var c74 = c71['now'] - (c73 + c8j['serverSendRate'] * c8j['interpolation']), c76 = 0x0; c76 < c72['stateHistory']['length']; ++c76)
            if (c72['stateHistory'][c76]['time'] <= c74) return c72['stateHistory'][c76];
        return c72['stateHistory'][c72['stateHistory']['length'] - 0x1];
    }, this['updateMsh'] = function(c73, c74) {
        if (c73['objInstances']) {
            var c76 = c73['weapon']['animWhileAim'] ? 0x1 : c73['aimVal'],
                c8f = (0x1 - (0x1 - c8j['aimAnimMlt']) * (0x1 - c73['aimVal'])) * c8j['animMult'] * c72['weaponBob'],
                c8g = 0x1 - 0.8 * c73['crouchVal'],
                c8h = (0x1 - (0x1 - c73['aimVal'])) * c8j['animMult'],
                c8i = (0x1 - (0x1 - c73['aimVal']) * (c73['weapon']['recoilYMA'] || 0x1)) * c8j['animMult'];
            c73['isYou'] || (c8h = 0x0);
            var c8k = 0x1 - (c73['weapon']['recoilZM'] || 0.5) * (0x1 - c76),
                c8l = (0x1 - (c73['weapon']['zRot'] || 0.3) * (0x1 - c76)) * (c73['weapon']['zRM'] || 0x1) * c72['weaponBob'],
                c8m = 0x1 - (c73['weapon']['jYMlt'] || 0x1) * (0x1 - c76),
                c8n = 0x1 - 0.45 * (0x1 - c76),
                c8o = 0.9 * c73['bobAnimY'] * c8m * c72['weaponBob'] * c8h,
                c8Y = c73['landBobY'] * (c73['weapon']['landBob'] || 0x1) * 0.6 * (0x1 - 0.75 * (0x1 - c76)) * c72['weaponBob'];
            c73['landBobYR'] != c8Y && (c73['landBobYR'] += 0.1 * (c8Y - c73['landBobYR']));
            var c8Z = c73['landBobY'] * (c73['weapon']['landBob'] || 0x1) * 0.1,
                c90 = 0x1 - 0.5 * c73['crouchVal'],
                c91 = (c73['crouchVal'], c73['jumpRot'] * c90 * c8h * c72['weaponBob']);
            c73['jumpRotM'] != c91 && (c73['jumpRotM'] += 0.08 * (c91 - c73['jumpRotM']));
            var c92 = c73['jumpBobY'] * (c73['weapon']['jumpYM'] || 0x1) * c8h * c90 * c72['weaponBob'],
                c93 = 0x1 - 0.89 * (0x1 - c76),
                c94 = 0x1 - (c73['weapon']['aimRecMlt'] || 0x1) * (0x1 - c76),
                c95 = c74 ? 0.05 : c8j['stepAnim'],
                c96 = Math['sin'](c73['stepVal']) * c95,
                c97 = Math['cos'](0x2 * c73['stepVal']) / 0x2 * c95,
                c98 = -Math['sin'](c73['stepChase']) * c95,
                c99 = -Math['cos'](0x2 * c73['stepChase']) / 0x2 * c95,
                c9a = c71['config']['thirdPerson'] ? 0x0 : 0x1 - c73['aimVal'],
                c9b = 0.5 * (0.5 >= c9a ? c9a : 0.5 - (c9a - 0.5)),
                c9c = c73['swapTime'] / c73['weapon']['swapTime'],
                c9d = c73['weapon']['xOff'] * (c73['isYou'] ? c72['weaponOffX'] : 0x1),
                c9e = c73['weapon']['yOff'] * (c73['isYou'] ? c72['weaponOffY'] : 0x1),
                c9f = c73['weapon']['zOff'] * (c73['isYou'] ? c72['weaponOffZ'] : 0x1),
                c9g = 0x0;
            0x0 < c73['reloadTimer'] && (c9g = 0.5 < (c9g = 0x1 - c73['reloadTimer'] / c73['weapon']['reload']) ? 0.5 - (c9g - 0.5) : c9g);
            var c9h = 1.75 * (0x1 - 0.88 * (0x1 - c73['aimVal'])) * c72['weaponBob'];
            c72['moveMesh'](c73['objInstances'], c73['x'], c73['y'] + (c73['isYou'] && !c71['config']['thirdPerson'] ? 0x0 : Math['abs'](3.5 * c96)), c73['z']), 'prop' != c73['team'] && c72['rotateMesh'](c73['objInstances'], c73['xDire'] + (c73['isYou'] ? c71['config']['thirdPerson'] ? 0.5 * -c96 : 0x0 : 0x2 * -c96)), c97 -= c97 * (c73['crouchVal'] * c8j['crouchAnimMlt']), c96 -= c96 * (c73['crouchVal'] * c8j['crouchAnimMlt']);
            for (var c9i = 0x0; c9i < c73['legMeshes']['length']; ++c9i) c72['lowSpec'] ? c73['legMeshes'][c9i]['visible'] = !0x1 : c73['legMeshes'][c9i]['rotation']['x'] = c96 * (0x1 == c9i || 0x3 == c9i ? 0x1 : -0x1) * 0x7 + (0x1 < c9i ? -0.6 : 0x0);
            for (c9i = 0x0; c9i < c73['armMeshes']['length']; ++c9i) - (c73[(0x0 == c9i ? 'l' : 'r') + 'HndTweenA'] || 0x0), c73['armMeshes'][c9i]['position']['z'] = c96 * (c9i ? -0x1 : 0x1), c73['armMeshes'][c9i]['rotation']['x'] = c73['armMeshes'][c9i]['xR'] || 0x0, c73['armMeshes'][c9i]['rotation']['y'] = c73['armMeshes'][c9i]['yR'] || 0x0, c73['armMeshes'][c9i]['position']['x'] = c73['armMeshes'][c9i]['xP'] || 0x0, c73['armMeshes'][c9i]['position']['y'] = c73['armMeshes'][c9i]['yP'] || 0x0, 0x1 == c9i ? (c73['armMeshes'][0x1]['rotation']['z'] = c73['armMeshes'][c9i]['zR'] + 0.12 * c73['crouchVal'] + -0x1 * c99 + 0.2 * c73['jumpBobY'], c73['meleeAnim'] && c73['weaponGeos'][c73['weaponIndex']] && (c73['armMeshes'][0x1]['rotation']['z'] += (c73['meleeAnim']['armR'] || 0x0) * c8h, c73['armMeshes'][0x1]['rotation']['y'] += (c73['meleeAnim']['armT'] || 0x0) * c8h, c73['armMeshes'][0x1]['position']['x'] += (c73['meleeAnim']['armM'] || 0x0) * c8h, c73['armMeshes'][0x1]['position']['z'] += (c73['meleeAnim']['armE'] || 0x0) * c8h, c73['armMeshes'][0x1]['position']['y'] += (c73['meleeAnim']['armY'] || 0x0) * c8h, c73['weaponGeos'][c73['weaponIndex']] && (c73['weaponGeos'][c73['weaponIndex']]['rotation']['z'] = c73['weaponGeos'][c73['weaponIndex']]['zR'] + (c73['meleeAnim']['weaR'] || 0x0), c73['weaponGeos'][c73['weaponIndex']]['position']['x'] = c73['weaponGeos'][c73['weaponIndex']]['xP'] + (c73['meleeAnim']['weaM'] || 0x0), c73['weaponGeos'][c73['weaponIndex']]['rotation']['y'] = c73['weaponGeos'][c73['weaponIndex']]['yR'] + (c73['meleeAnim']['flipW'] || 0x0)))) : c73['meleeAnim'] && c73['weaponGeos'][c73['weaponIndex']] && (c73['armMeshes'][0x0]['position']['z'] += c73['meleeAnim']['lArm'] || 0x0, c73['armMeshes'][0x0]['rotation']['y'] += 0.1 * (c73['meleeAnim']['lArm'] || 0x0), c73['armMeshes'][0x0]['position']['x'] -= 0.3 * (c73['meleeAnim']['lArm'] || 0x0));
            var c9j = null != c73['weapon']['attach'] && c71['attach'][c73['attachIndex']] ? c71['attach'][c73['attachIndex']] : null,
                c9k = c9j && c9j['aimOffY'] || 0x0;
            c73['weaponMeshes'][c73['weaponIndex']] && c73['weaponMeshes'][c73['weaponIndex']]['flapMesh'] && c73['weapon']['flap'] && (fRot = 0x3 * c99 + 2.8 * c73['recoilAnim'] - c73['leanAnimZ'] - 0x3 * c73['leanAnimX'] - 1.8 * c73['landBobYR'] + c8o + 0.1 * c73['crouchVal'], c72['rotateMesh'](c73['weaponMeshes'][c73['weaponIndex']]['flapMesh'], c73['weapon']['flap']['rot'] * c73['swapTweenA'] + fRot, null, null));
            var c9l = c71['config']['thirdPerson'] ? 0.4 : 0x1;
            c72['rotateMesh'](c73['upperBody'], c9g * (-0x1 * c9l), -0.2 * c8o + +c8Z + c9g * (-2.8 * c9l) + c73['yDire'] * (c73['isYou'] && !c71['config']['thirdPerson'] ? 0x1 : 0.5) + (-Math['PI'] / 0x4 * c9c + c73['recoilAnimY'] * c8j['recoilMlt']) + (c73['weapon']['yRot'] || 0x0)), c72['moveMesh'](c73['upperBody'], 0x0, c73['recoilAnimY'] * ((c73['weapon']['recoilYM'] || 0.3) * c8i) + (c73['height'] - c8j['cameraHeight'] - c8j['legHeight']), 0x0), c72['rotateMesh'](c73['weaponMeshes'][c73['weaponIndex']], c73['inspectX'] + 0.2 * c73['jumpRotM'] + c73['recoilX'] * c93 + c73['leanAnimX'] * c8n * c72['weaponLean'] * (c73['weapon']['leanMlt'] || 0x1) + (0.16 * -c98 * c8h * c8g + 0.2 * c73['leanAnimZ']) * c8f, -Math['cos'](c73['idleAnim']) * c90 * 0.01 * c9h + (c73['weapon']['rotOff'] || 0x0) * c8h - 0.25 * (c73['swapTweenR'] || 0x0) * c8h + 0.6 * -c73['landBobYR'] + c73['recoilTweenY'] * c94 + c73['leanAnimY'] * c8n * c72['weaponLean'] * (c73['weapon']['leanMlt'] || 0x1) + -0.9 * c99 * c8f, c91 + c9b + c73['recoilX'] * c93 + (c73['swapTweenR'] || 0x0) * c8h * 0.1 + c73['leanAnimZ'] * c8l + -c73['inspectX'] * (c73['weapon']['inspectR'] || 0x0) + ((c73['weapon']['cLean'] || 0x0) * c73['crouchVal'] * c8h + 0x0 * -c98) * c8f), c72['moveMesh'](c73['weaponMeshes'][c73['weaponIndex']], -c73['jumpRotM'] * c8h * 1.3 + -c73['inspectX'] * (c73['weapon']['inspectM'] || 0x0) + (0.35 * c73['leanAnimZ'] - (c73['weapon']['cRot'] || 0x0) * c73['crouchVal'] * c8h + 0.5 * c96 * c8g * c8h) * c73['aimVal'] * c8f + c9d - (c9d - c73['weapon']['xOrg']) * c9a, 0.02 * Math['sin'](c73['idleAnim']) * c9h + c73['recoilTweenYM'] * c94 + c92 + 0.7 * c8Y - 1.5 * c8o + (0.85 * c97 - (c73['weapon']['cDrop'] || 0x0) * c73['crouchVal'] * c8h) * c8f + c9e - (c9e - c73['weapon']['yOrg'] + c9k) * c9a, c9f - (c9f - c73['weapon']['zOrg']) * c9a + c73['bobAnimZ'] * c8f + c73['recoilAnim'] * (c73['weapon']['recoilZ'] || 0x0) * c8k);
        }
    }, this['updateHeight'] = function(c73) {
        var c74 = c8j['crouchDst'] * c73['crouchVal'];
        if (!c72 || c73['isYou'] && !c71['config']['thirdPerson']) c73['height'] = c8j['ahnMyEEY'] - c74;
        else {
            var c76 = c8j['crouchLean'] * c73['crouchVal'];
            c72['rotateMesh'](c73['lowerBody'], 0x0, c76 + 0.5 * c73['yDire'], 0x0), c73['upperBody'] && (c73['upperBody']['rotation']['x'] -= c76), c72['moveMesh'](c73['lowerBody'], 0x0, c8j['legHeight'] - c74, 0x0);
            for (var c8f = 0x0; 0x4 > c8f; ++c8f) c73['legMeshes'][c8f] && !c72['lowSpec'] && (c73['legMeshes'][c8f]['visible'] = 0x1 >= c8f ? !c73['crouchVal'] : !!c73['crouchVal']);
        }
    }, this['generateMeshes'] = function(c73, c76, c8f = !0x1) {
        var c8h = c71['classes'][c73['classIndex']]['colors'],
            c8k = c8h[0x0];
        c8j['skinColors'][c73['skinColIndex']] && (c8k = c8j['skinColors'][c73['skinColIndex']]);
        var c8l = c71['config']['thirdPerson'] || !c76,
            c8m = c72['genObj3D'](0x0, 0x0, 0x0);
        if (c73['objInstances'] = c72['genObj3D'](c73['x'], c73['y'], c73['z']), c73['objInstances']['add'](c8m), 'inf' == c73['team'] ? (c8k = c8i['modeSpecific']['infected']['skin'], c73['hatIndex'] = 0x7a) : 'stalk' == c73['team'] && (c73['backIndex'] = -0x1, c73['hatIndex'] = -0x1, c73['meleeIndex'] = -0x1, c8k = c8i['modeSpecific']['stalker']['skin'], c8h = c8i['modeSpecific']['stalker']['body']), 'prop' == c73['team']) {
            var c8n = c8j['propsH'][c73['propID']];
            c72['loadMesh']({
                'src': c8n + '_0'
            }, 0x0, c8j[c8n + 'Scale'] + (c8j['propsCPY'][c8n] || 0x0), 0x0, 0x0, c8j[c8n + 'Scale'], c73['objInstances'], !0x1);
        } else {
            if (c73['lowerBody'] = c72['genObj3D'](0x0, c8j['legHeight'], 0x0), c8l && c73['lowerBody']['add'](c72['genBody'](c8h[0x1], c8h[0x2], c8h[0x4], c8k, c73['isYou'])), c73['upperBody'] = c72['genObj3D'](0x0, 0x0, 0x0), c73['lowerBody']['add'](c73['upperBody']), 0x0 <= c73['backIndex'] && c8l && (c73['backMesh'] = c72['genObj3D'](0x0, (c8j['ahnMyEEY'] - c8j['legHeight'] - c8j['headScale']) / 0x2 - (c71['store']['skins'][c73['backIndex']]['sitOff'] || 0x0), -(c71['store']['skins'][c73['backIndex']]['sitOffZ'] || 0x0)), c73['lowerBody']['add'](c73['backMesh']), c72['loadMesh']({
                    'src': 'body/body_' + c71['store']['skins'][c73['backIndex']]['id'],
                    'texSrc': c71['store']['skins'][c73['backIndex']]['tex'] ? 'body/body_' + c71['store']['skins'][c73['backIndex']]['id'] + '_' + c71['store']['skins'][c73['backIndex']]['tex'] : null,
                    'glowText': c71['store']['skins'][c73['backIndex']]['glow'],
                    'emissive': c71['store']['skins'][c73['backIndex']]['glow'] ? 0xffffff : null,
                    'noGreen': !0x0
                }, 0x0, 0x0, 0x0, Math['PI'] / 0x2, 2.1 * (c71['store']['skins'][c73['backIndex']]['sclMlt'] || 0x1), c73['backMesh'])), 0x0 <= c73['hatIndex'] && c8l && (c73['hatMesh'] = c72['genObj3D'](0x0, c8j['ahnMyEEY'] - c8j['legHeight'] - (c71['store']['skins'][c73['hatIndex']]['sitOff'] || 0x0), -(c71['store']['skins'][c73['hatIndex']]['sitOffZ'] || 0x0)), c73['lowerBody']['add'](c73['hatMesh']), c72['loadMesh']({
                    'src': 'hats/hat_' + c71['store']['skins'][c73['hatIndex']]['id'],
                    'texSrc': c71['store']['skins'][c73['hatIndex']]['tex'] ? 'hats/hat_' + c71['store']['skins'][c73['hatIndex']]['id'] + '_' + c71['store']['skins'][c73['hatIndex']]['tex'] : null,
                    'glowText': c71['store']['skins'][c73['hatIndex']]['glow'],
                    'emissive': c71['store']['skins'][c73['hatIndex']]['glow'] ? 0xffffff : null,
                    'noGreen': !0x0
                }, 0x0, 0x0, 0x0, Math['PI'] / 0x2, 2.1 * (c71['store']['skins'][c73['hatIndex']]['sclMlt'] || 0x1), c73['hatMesh'])), c8l)
                for (var c8o = 0x0; 0x4 > c8o; ++c8o) c73['legMeshes']['push'](c72['genLeg'](0x1 == c8o || 0x3 == c8o, c8h[0x2], c8h[0x3], 0x1 < c8o)), 0x2 <= c8o && c72['rotateMesh'](c73['legMeshes'][c8o], 0x2 == c8o ? -Math['PI'] / 0x6 : Math['PI'] / 0x8, 0x0, 0x0), c73['legMeshes'][c8o]['visible'] = 0x1 >= c8o, c8m['add'](c73['legMeshes'][c8o]);
            for (c8o = 0x0; c8o < c73['ammos']['length']; ++c8o) {
                var c9z = c72['genObj3D'](0x0, 0x0, 0x0),
                    c9A = c71['weapons'][c73['loadout'][c8o]],
                    c9B = null != c9A['attach'] && c71['attach'][c73['attachIndex']] ? c71['attach'][c73['attachIndex']] : null;
                if (c76 && c9A['ammo']) {
                    c9z['muzzles'] = [], c9z['casings'] = [];
                    for (var c9C = 0x0; 0x2 > c9C; ++c9C)(!c9C || c9A['akimbo']) && (c9z['muzzles']['push'](new c74['Sprite']()), c9z['muzzles'][c9C]['visible'] = !0x1, c9z['muzzles'][c9C]['static'] = !0x0, c8g['particles']['push'](c9z['muzzles'][c9C]), c9z['add'](c9z['muzzles'][c9C]), c9z['casings']['push'](c72['genObj3D'](c9C ? 0x2 * -c9A['xOff'] : 0x0, c9A['caseYOff'] || 0x0, c9A['caseZOff'] || 0x0)), c9z['add'](c9z['casings'][c9C]));
                    c9z['muzzleFlash'] = c72['genObj3D'](0x0, 0.4, 0x0), c9z['muzzles'][0x0]['add'](c9z['muzzleFlash']);
                }
                if (c9A['src'] || !c73['isYou']) c9z['add'](c72['genArms'](c9A, c8h[0x1], c8h[0x5], c8k, null, !c8l));
                else {
                    var c9D;
                    for (c9C = 0x0; 0x2 > c9C; ++c9C) c9D = c72['genArms'](c9A, c8h[0x1], c8h[0x5], c8k, c9C + 0x1, !c8l), c9z['add'](c9D), c73['armMeshes']['push'](c9D);
                }
                if (c73['weaponMeshes']['push'](c9z), c73['weaponMeshes'][c8o]['visible'] = !0x1, c73['upperBody']['add'](c73['weaponMeshes'][c8o]), c9A['melee'] && (c73['isYou'] || 'inf' != c73['team'])) {
                    var c9E = c71['store']['skins'][c73['meleeIndex']] || {};
                    c73['weaponGeos'][c8o] = c72['loadMesh']({
                        'src': 'melee/melee_' + (c9E['id'] || 0x0),
                        'texSrc': 'stalk' == c73['team'] ? 'melee/melee_0_5' : c9E['tex'] ? 'melee/melee_' + (c9E['id'] || 0x0) + '_' + c9E['tex'] : '',
                        'glowText': c9E['glow'],
                        'emissive': c9E['glow'] ? 0xffffff : null,
                        'pulsT': c9E['pulsT'],
                        'frames': c9E['frames'],
                        'frameT': c9E['frameT'],
                        'tFilter': c74['LinearFilter'],
                        'mat': c8f || c73['isYou'] ? c74['MeshPhongMaterial'] : null,
                        'noGreen': !0x0,
                        'uv2': !0x0,
                        'specular': 0x292929,
                        'shininess': 0x64
                    }, c73['isYou'] ? 0.9 : 1.7, c73['isYou'] ? -0.95 : -0.4, c73['isYou'] ? 0.72 : 1.2, [-Math['PI'] / 3.5, c73['isYou'] ? 0.3 : Math['PI'] / 0x2, -0.9 * Math['PI']], c9E['sclMlt'] || 0.9, c73['armMeshes'][0x1] ? c73['armMeshes'][0x1] : c73['weaponMeshes'][c8o]), c73['armMeshes'][0x1] && (c73['armMeshes'][0x1]['yR'] = c73['armMeshes'][0x1]['rotation']['y'], c73['isYou'] ? (c73['armMeshes'][0x1]['zR'] = c73['armMeshes'][0x1]['rotation']['z'] = -0.3, c73['armMeshes'][0x1]['xR'] = c73['armMeshes'][0x1]['rotation']['x'] = -0.4, c73['armMeshes'][0x1]['xP'] = c73['armMeshes'][0x1]['position']['x'] = 0.4, c73['armMeshes'][0x1]['yP'] = c73['armMeshes'][0x1]['position']['y'] = 0.3) : (c73['armMeshes'][0x1]['zR'] = c73['armMeshes'][0x1]['rotation']['z'] = 0.3, c73['armMeshes'][0x1]['yP'] = c73['armMeshes'][0x1]['position']['y'] = -0.4, c73['armMeshes'][0x1]['xR'] = c73['armMeshes'][0x1]['rotation']['x'], c73['armMeshes'][0x1]['xP'] = c73['armMeshes'][0x1]['position']['x'] = -0.2), c73['armMeshes'][0x0]['xP'] = c73['armMeshes'][0x0]['position']['x'] = 0.3, c73['armMeshes'][0x0]['yP'] = c73['armMeshes'][0x0]['position']['y'] = -0.5, c73['armMeshes'][0x0]['zR'] = c73['armMeshes'][0x0]['rotation']['z'] = -0.4, c73['armMeshes'][0x0]['yR'] = c73['armMeshes'][0x0]['rotation']['y']);
                }
                if (c9A['src']) {
                    var c9F = c71['store']['skins'][c73['skins'][c8o]] || {},
                        c9G = 0x0 <= c73['skins'][c8o] && (c9F['glow'] || c9F['sameGlow']);
                    for (c9C = 0x0; 0x2 > c9C; ++c9C)(!c9C || c9A['akimbo']) && c72['loadMesh']({
                        'src': 'weapons/' + c9A['src'] + (null == c9F['mid'] ? '' : '_' + c9F['mid']),
                        'texSrc': null == c9F['mid'] ? c9F['tex'] ? c9F['tex'] : 0x0 <= c73['skins'][c8o] ? 'weapons/skins/' + c9A['src'] + '_' + c9F['id'] : null : c9F['midT'],
                        'tFilter': c74['LinearFilter'],
                        'mat': c8f || c73['isYou'] ? c74['MeshPhongMaterial'] : null,
                        'movT': c9F['movT'],
                        'movD': c9F['movD'],
                        'pulsT': c9F['pulsT'],
                        'frames': c9F['frames'],
                        'frameT': c9F['frameT'],
                        'sameGlow': c9F['sameGlow'],
                        'glowText': c9G,
                        'noGreen': !0x0,
                        'uv2': !0x0,
                        'ao': c76 && !c9A['noAo'],
                        'shininess': c9F['shine'] || c9A['shine'] || 0x3c,
                        'specular': 0x292929,
                        'transparent': c9A['seeThrough'],
                        'emissive': c9A['transp'] || c9G ? 0xffffff : null
                    }, 0x1 == c9C ? -0x2 * c9A['xOff'] : 0x0, c9F['yOff'] || 0x0, c9F['zOff'] || 0x0, Math['PI'] / 0x2, c9F['mScl'] || c9A['scale'], c73['weaponMeshes'][c8o]);
                }
                c76 && c9A['flap'] && c72['sniperFlap'] && (c73['weaponMeshes'][c8o]['flapMesh'] = c72['loadMesh']({
                    'src': 'attach/' + c9A['flap']['src'],
                    'tFilter': c74['LinearFilter'],
                    'noGreen': !0x0,
                    'mat': c74['MeshPhongMaterial'],
                    'shininess': 0x3c,
                    'transparent': !0x0
                }, c9A['flap']['xOff'], c9A['flap']['yOff'], c9A['flap']['zOff'], Math['PI'] / 0x2, c9A['flap']['scl'], c73['weaponMeshes'][c8o])), c9B && (c76 || c8f) && c72['loadMesh']({
                    'src': 'attach/' + c9B['src'],
                    'tFilter': c74['LinearFilter'],
                    'noGreen': !0x0,
                    'mat': c73['isYou'] ? c74['MeshPhongMaterial'] : null,
                    'specular': 0x292929,
                    'shininess': 0x3c,
                    'transparent': !0x0
                }, 0x0, -(c9A['yOrg'] || 0x0) + (c9A['attachYOff'] || 0x0), -(c9A['attachZOff'] || 0x0), Math['PI'] / 0x2, c9B['scale'], c73['weaponMeshes'][c8o]);
            }
            c8m['add'](c73['lowerBody']), c76 && c73['objInstances']['traverse'](function(c71) {
                c71['layers']['set'](0x1);
            });
        }
        return c73['objInstances'];
    }, this['pickProp'] = function(c72) {
        if (c8k && c72 && c72['active'] && (!c72['lastPropPick'] || 0xc8 <= c71['now'] - c72['lastPropPick'])) {
            c72['lastPropPick'] = c71['now'];
            var c73 = c72['xDire'],
                c74 = c72['yDire'];
            cba['length'] = 0x0;
            for (var c76, c8f = 0x0, c8g = 0x1 / (0x19 * Math['sin'](c73 + Math['PI']) * Math['cos'](c74)), c8i = 0x1 / (0x19 * Math['cos'](c73 + Math['PI']) * Math['cos'](c74)), c8l = 0x1 / (0x19 * Math['sin'](c74)), c8m = c72['y'] + c72['height'] - c8j['cameraHeight'], c8n = 0x0; c8n < c71['map']['manager']['objects']['length']; ++c8n)(c76 = c71['map']['manager']['objects'][c8n])['active'] && c76['propID'] && !c76['noShoot'] && ((c8f = c8h['lineInRect'](c72['x'], c72['z'], c8m, c8g, c8i, c8l, c76['x'] - c76['width'], c76['z'] - c76['length'], c76['y'] - c76['height'], c76['x'] + c76['width'], c76['z'] + c76['length'], c76['y'] + c76['height'])) && 0x1 >= c8f && cba['push']({
                'obj': c76,
                'dst': c8f
            }));
            cba['length'] && (cba['sort'](c8h['orderByDst']), cba[0x0] && cba[0x0]['obj'] && this['updateProp'](c72, c8j['propsH']['indexOf'](cba[0x0]['obj']['propID'])));
        }
    }, this['updateProp'] = function(c72, c73, c74) {
        if (c72 && c72['active']) {
            null != c73 && (c72['propID'] = c73);
            var c76 = c8j[c8j['propsH'][c73] + 'Scale'],
                c8f = c8j['propsCP'][c8j['propsH'][c73]] || 0x0;
            c72['height'] = c76 + c8f, c72['scale'] = c76 + c8f, c74 && this['regenMeshes'](c72), c8k && c8k['broadcast']('game' + c71['sid'], 'up', c72['sid'], c73);
        }
    }, this['regenMeshes'] = function(c71) {
        c71['objInstances'] && this['disposeMesh'](c71, !0x0), c72 && c72['add'](this['generateMeshes'](c71, c71['isYou'])), this['swapWeapon'](c71, 0x0, !0x0);
    }, this['hideAll'] = function() {
        for (var c71 = 0x0; c71 < this['list']['length']; ++c71) this['list'][c71]['active'] && this['list'][c71]['objInstances'] && (this['list'][c71]['forcePos'] = !this['list'][c71]['latestData'], this['list'][c71]['latestData'] = !0x1, this['list'][c71]['isYou'] || (this['list'][c71]['objInstances']['visible'] = !0x1));
    }, this['clear'] = function() {
        if (c72)
            for (var c71 = 0x0; c71 < this['list']['length']; ++c71) this['disposeMesh'](this['list'][c71]);
        this['list']['length'] = 0x0;
    }, this['toggleLOD'] = function(c71, c72) {
        c71['latestData'] && (c71['objInstances'] && (c71['objInstances']['visible'] = c72), c71['lodActive'] = !c72);
    }, this['disposeMesh'] = function(c71) {
        c72['remove'](c71['objInstances']), c71['objInstances'] = null, c71['hatMesh'] = null, c71['backMesh'] = null, c71['weaponMeshes']['length'] = 0x0, c71['weaponGeos'] = {}, c71['armMeshes']['length'] = 0x0, c71['legMeshes']['length'] = 0x0;
    }, this['add'] = function(c73, c74, c8f, c8g, c8l, c8m, c8n, c8o, cab, cac, cad, cae, caf, cag, cah, cai, caj, cak, cal) {
        for (var cam, can = 0x0; can < this['list']['length']; ++can)
            if (this['list'][can]['id'] == c73) {
                cam = this['list'][can];
                break;
            } return cam ? (cam['weaponMeshes']['length'] = 0x0, cam['weaponGeos'] = {}, cam['legMeshes']['length'] = 0x0, cam['armMeshes']['length'] = 0x0) : ((cam = new c76(c73, this, c8h, c8i, c8j, c71))['sid'] = c74 || c8h['generateSID'](this['list']), this['list']['push'](cam)), c8m || (c8m = 'Guest_' + cam['sid']), cam['init'](c8f, c8g, c8l, c8m, caj, cak), c8k && null != c71['mode'] && this['setTeam'](cam), cai && (cam['team'] = cai), cam['skins'] = c8o || [-0x1, -0x1], cam['hatIndex'] = cab, cam['backIndex'] = cac, cam['meleeIndex'] = cad, cam['skinColIndex'] = cae, cam['attachIndex'] = caf, cam['secIndex'] = cag, cam['setClass'](c71, c8n, cag, !!c72), !cal && c71['mode']['startingLoadout'] && (cal = c71['mode']['startingLoadout']), cal && cam['updateLoadout'](c71, cam['weaponIndex'], !0x1, ...cal), c72 && c72['add'](this['generateMeshes'](cam, caj)), 'prop' == cam['team'] && this['updateProp'](cam, cah || 0x0, !0x0), this['swapWeapon'](cam, 0x0, !0x0), 'undefined' != typeof window && 'updateWindow' in window && window['updateWindow'](0x17), cam;
    }, this['remove'] = function(c72) {
        var c73 = this['indexBySid'](c72);
        if (0x0 <= c73) {
            c8k && this['list'][c73] && (c71['dropFlag'](this['list'][c73]['flag']), this['dropWeapon'](this['list'][c73], !0x0));
            var c74 = this['list'][c73]['id'];
            if (this['list'][c73]['objInstances'] && this['disposeMesh'](this['list'][c73]), this['list']['splice'](c73, 0x1), c8k) {
                for (var c76 = this['list']['length'] - 0x1; 0x0 <= c76; --c76) 0x0 <= (c73 = this['list'][c76]['sentTo']['indexOf'](c74)) && this['list'][c76]['sentTo']['splice'](c73, 0x1);
                c8k['broadcast']('game' + c71['sid'], '2', c72), this['syncLeaders']();
            }
            'undefined' != typeof window && 'updateWindow' in window && window['updateWindow'](0x17);
        }
    };
    var cas = [0x0, 0x1, 0x2];
    this['getStepSound'] = function() {
        var c71 = c8h['randInt'](0x0, cas['length'] - 0x1),
            c72 = cas[c71];
        return cas['splice'](c71, 0x1), 0x0 >= cas['length'] && cas['push'](0x0, 0x1, 0x2), c72;
    }, this['playerStep'] = function(c72, c73, c74) {
        if (c73 && (!c72['isYou'] && c72['crouchVal'] && (c73 *= 1.6), c72['stepVal'] += c73 * c8j['stepMlt'] * c72['stepDir'], c72['stepVal'] >= Math['PI'] / 0x2 && 0x1 == c72['stepDir'] || c72['stepVal'] <= -Math['PI'] / 0x2 && -0x1 == c72['stepDir'])) {
            if (c8f && !c74 && 'stalk' != c72['team']) {
                var c76 = c8h['randFloat'](0.15, 0.25) * (0x1 > c72['crouchVal'] ? 0x1 : c72['isYou'] ? 0.5 : 0x0),
                    c8g = (0x1 > c72['crouchVal'] ? 0x1 : 0.8) * c8h['randFloat'](0.8, 1.2),
                    c8i = c72['stepSrc'] ? '_' + c72['stepSrc'] : '';
                c72['isYou'] ? c8f['play']('step_' + this['getStepSound']() + c8i, c76, !0x1, c8g) : c76 && c71['playerSound']('step_' + c8h['randInt'](0x0, 0x2) + c8i, 0x0, c76, c72, c8g, 0xb4);
            }
            c72['stepDir'] *= -0x1;
        }
    }, this['resetStep'] = function(c72, c73) {
        if (!c73 && c72['isYou'] && c72['yVel'] && (c72['jumpTween'] && c72['jumpTween']['stop'](), c72['landTween'] && c72['landTween']['stop'](), c72['landTween'] = new TWEEN['Tween'](c72)['to']({
                'landBobY': 0x6 * c72['yVel'],
                'jumpBobY': 0x0
            }, 0x64)['easing'](TWEEN['Easing']['Linear']['None'])['onComplete'](function() {
                c72['landTween'] = new TWEEN['Tween'](c72)['to']({
                    'landBobY': 0x0
                }, 0x44c)['easing'](TWEEN['Easing']['Elastic']['Out'])['start']();
            })['start']()), c8f && !c73 && c72['yVel'] && 'stalk' != c72['team'] && (c72['stepSrc'] && c72['stepSrc'], c8f['play']('step_' + this['getStepSound'](), 0.7, !0x1, c8h['randFloat'](0.9, 1.2)), c72['isYou'] && c72['crouchVal'] && c71['config']['canSlide'] && c72['canSlide'] && c8f['play']('slide_0', 0.35, !0x1, c8h['randFloat'](0.9, 1.1))), c71['config']['canSlide'] && c72['crouchVal'] && c72['canSlide']) {
            c72['canSlide'] = !0x1, c72['slideTimer'] = c8j['slideTime'] * c72['crouchVal'];
            var c74 = this['onTerrain'] ? c8j['playerTerrainSlideVelMlt'] : c8j['playerSlideVelMlt'];
            c72['xVel'] *= c74, c72['zVel'] *= c74;
        }
    }, this['tryJump'] = function(c72, c73) {
        c71['config'] && c71['config']['autoJump'] && c73 ? this['jump'](c72) : (c72['didJump'] && !c73 && (c72['didJump'] = !0x1), !c72['didJump'] && c73 && this['jump'](c72));
    }, this['jump'] = function(c72) {
        c72['jumpCooldown'] = c72['terrainSlipping'] ? c8j['playerSlippingJumpCooldown'] : 0x0, c72['didJump'] = !0x0, c72['onTerrain'] = !0x1;
        var c73 = c8j['jumpVel'] * (c71['config'] ? c71['config']['jumpMlt'] : 0x1),
            c74 = c8j['jumpPush'] * (c71['config'] ? c71['config']['jumpMlt'] : 0x1);
        c72['yVel'] += (c73 - c73 * (c8j['crouchJump'] * c72['crouchVal'])) * c72['weapon']['spdMlt'] * (c72['aimVal'] ? 0x1 : c8j['aimJumpSlow']);
        var c76 = c8h['getDistance'](0x0, 0x0, c72['xVel'], c72['zVel']);
        if (c72['xVel'] -= c74 * c76 * Math['sin'](c72['xDire']), c72['zVel'] -= c74 * c76 * Math['cos'](c72['xDire']), c8f && !c72['recon'] && c72['isYou']) {
            c72['landTween'] && c72['landTween']['stop'](), c72['landTween'] = new TWEEN['Tween'](c72)['to']({
                'landBobY': 0x0
            }, 0x64)['easing'](TWEEN['Easing']['Linear']['None'])['start'](), c72['jumpTween'] && c72['jumpTween']['stop'](), c72['jumpTween'] = new TWEEN['Tween'](c72)['to']({
                'jumpBobY': 0.22
            }, 0x1f4)['easing'](TWEEN['Easing']['Back']['Out'])['start']();
            var c8g = c8h['randFloat'](0.12, 0.15);
            new TWEEN['Tween'](c72)['to']({
                'jumpRot': [c8g, 0x0]
            }, 0x384)['easing'](TWEEN['Easing']['Back']['Out'])['start']();
            c8f['play']('jump_' + c8h['randInt'](0x0, 0x1), 0.04, !0x1, c8h['randFloat'](0.9, 0x1));
        }
    }, this['updateAim'] = function(c71, c73) {
        c72['zoom'](0x1 + (c71['weapon']['zoom'] - 0x1) * c73);
    }, this['toggleAim'] = function(c73, c74) {
        if (c8f && !c73['recon'] && c8f['play']('aim_' + c74, 0.1), c74 && 'prop' != c73['team'] || this['resetAim'](), c73['weapon']['scope'] && c73['weaponMeshes'] && c73['weaponMeshes'][c73['weaponIndex']] && (c72['zoom'](c74 ? c73['weapon']['zoom'] : 0x1), c73['weaponMeshes'][c73['weaponIndex']]['visible'] = !this['isWeaponHidden'](c73, c73['weaponIndex']) && !c74, aimRecticle['style']['opacity'] = c74 ? 0x1 : 0x0), null != c73['weapon']['attach'] && c71['attach'][c73['attachIndex']] ? c71['attach'][c73['attachIndex']] : null) {
            aimDot['style']['opacity'] = c74 ? 0x1 : 0x0;
            var c76 = c71['store']['skins'][c73['skins'][c73['weaponIndex']]],
                c8g = c8h['assetsUrl']('/textures/dots/' + (c76 && c76['dot'] || 'dot_0') + '.png');
            aimDot['src'] == c8g || c72['customADS']['length'] || (aimDot['src'] = c8g);
        }
        c72['hideADS'] && (c73['weaponMeshes'][c73['weaponIndex']]['visible'] = !c74 && !this['isWeaponHidden'](c73, c73['weaponIndex']));
    }, this['resetAim'] = function() {
        c72['zoom'](0x1), aimRecticle['style']['opacity'] = 0x0, aimDot['style']['opacity'] = 0x0;
    }, this['isWeaponHidden'] = function(c72, c73) {
        var c74 = c72['loadout'][c73];
        return !(!c71['weapons'][c74]['melee'] || !c71['hideWeapon'][0x2]) || (!(!c71['weapons'][c74]['secondary'] || !c71['hideWeapon'][0x1]) || !(c71['weapons'][c74]['melee'] || c71['weapons'][c74]['secondary'] || !c71['hideWeapon'][0x0]));
    }, this['reload'] = function(c71) {
        !c71['reloadTimer'] && c71['ammos'][c71['weaponIndex']] < c71['weapon']['ammo'] && (c8f && c8f['play']('reload_1', 0.25), c71['reloadTimer'] = c71['weapon']['reload'], c71['burstCount'] = 0x0, c71['isYou'] && this['cancelInspect'](c71));
    }, this['endReload'] = function(c71) {
        c8f && c8f['play']('reload_2' + (c71['custReload'] || ''), 0.25);
    }, this['updatePlayerAmmo'] = function(c71) {
        c71['isYou'] && (ammoDisplay['style']['display'] = 'inline-block', ammoVal['innerHTML'] = (c71['ammos'][c71['weaponIndex']] || (c71['weapon']['melee'] ? '-' : 0x0)) + ' <span id=\'ammoMax\'> | ' + (c71['weapon']['ammo'] || '-') + '</span>', 0x0 >= c71['ammos'][c71['weaponIndex']] ? (reloadMsg['innerHTML'] = '[R] Reload', reloadMsg['style']['display'] = 'block') : reloadMsg['style']['display'] = 'none');
    }, this['cancelInspect'] = function(c71) {
        c71['inspecting'] = !0x1, c71['inspectX'] = 0x0;
    }, this['wInspect'] = function(c71) {
        c71['inspecting'] ? this['cancelInspect'](c71) : !c71['weapon']['nInsp'] && !c71['inspecting'] && 0x1 == c71['aimVal'] && !c71['reloadTimer'] && (c71['inspecting'] = !0x0);
    }, this['melee'] = function(c72) {
        if (c72['reloads'][c72['weaponIndex']] = c72['weapon']['rate'], c72['didShoot'] = !0x0, c72['isYou']) {
            if (c71['controls'] && c71['controls']['vibration'] && c71['controls']['gamepad']['_connected'] && c71['controls']['gamepad']['rumble'](c72['weapon']['rumbleDur'] || 0xc8, c72['weapon']['rumble'] || 0.5), c72['weapon']['anim']) {
                var c73 = c71['store']['skins'][c72['meleeIndex']] || {};
                c72['weapon']['anim'](c72, TWEEN, c73['animInd'] || 0x1);
            }
            c72['weapon']['sounds'] && c8f['play'](c72['weapon']['sounds'][c8h['randInt'](0x0, c72['weapon']['sounds']['length'] - 0x1)], 0.1, !0x1, c8h['randFloat'](0.9, 1.1));
        }
        var c74 = c72['xDire'],
            c76 = c72['yDire'];
        cba['length'] = 0x0;
        for (var c8g = 0x0, c8i = 0x1 / (c72['weapon']['range'] * Math['sin'](c74 + Math['PI']) * Math['cos'](c76)), c8l = 0x1 / (c72['weapon']['range'] * Math['cos'](c74 + Math['PI']) * Math['cos'](c76)), c8n = 0x1 / (c72['weapon']['range'] * Math['sin'](c76)), c8o = c72['y'] + c72['height'] - c8j['cameraHeight'], cas = 0x0; cas < c71['map']['manager']['objects']['length']; ++cas)(c8m = c71['map']['manager']['objects'][cas])['active'] && !c8m['noShoot'] && ((c8g = c8h['lineInRect'](c72['x'], c72['z'], c8o, c8i, c8l, c8n, c8m['x'] - c8m['width'], c8m['z'] - c8m['length'], c8m['y'] - c8m['height'], c8m['x'] + c8m['width'], c8m['z'] + c8m['length'], c8m['y'] + c8m['height'])) && 0x1 >= c8g && cba['push']({
            'obj': c8m,
            'dst': c8g
        }));
        if (c8k)
            for (cas = 0x0; cas < this['list']['length']; ++cas) this['list'][cas]['active'] && c72 != this['list'][cas] && (!c72['team'] || c72['team'] != this['list'][cas]['team']) && ((c8m = this['fetchState'](this['list'][cas], c72['getStateConst']())) && ((c8g = c8h['lineInRect'](c72['x'], c72['z'], c8o, c8i, c8l, c8n, c8m['x'] - this['list'][cas]['scale'] - c71['config']['hitBoxPad'], c8m['z'] - this['list'][cas]['scale'] - c71['config']['hitBoxPad'], c8m['y'], c8m['x'] + this['list'][cas]['scale'] + c71['config']['hitBoxPad'], c8m['z'] + this['list'][cas]['scale'] + c71['config']['hitBoxPad'], c8m['y'] + this['list'][cas]['height'] + c71['config']['hitBoxPad'])) && 0x1 >= c8g && cba['push']({
                'player': !0x0,
                'obj': this['list'][cas],
                'dst': c8g
            })));
        c72['weapon']['range'];
        if (cba['length']) {
            cba['sort'](c8h['orderByDst']);
            var cb9 = c72['weapon']['dmg'];
            for (cas = 0x0; cas < cba['length'] && (c8m = cba[cas], c72['weapon']['range'] * c8m['dst'], c8k) && (c8k && !c71['waitTimers'] && c8m['obj'] && c8m['obj']['health'] && !c8m['player'] && (c8k['send'](c72['id'], '4'), c8m['obj']['health'] -= cb9, 0x0 >= c8m['obj']['health'] && (c8m['obj']['active'] = !0x1, c8m['obj']['health'] = 0x0, c8m['obj']['destroyedBy'] = c72, c71['destObjs']['push'](c8m['obj']['uid']), c8k['broadcast']('game' + c71['sid'], 'do', c8m['obj']['uid']), c8m['obj'] && c8m['obj']['onDestroy'] && c71['onTrigger'](c72, c8m['obj']))), c8k && 'seek' == c72['team'] && !c8m['player'] && c8m['obj'] && c8m['obj']['propID'] && this['changeHealth'](c72, null, 0xa) && this['kill'](c72, null, {}), c8m['obj'] && (c8m['obj']['onMelee'] || c8m['obj']['onDamage']) && c71['onTrigger'](c72, c8m['obj']), c8m['player'] || c8m['obj'] && c8m['obj']['dummy']) && (c71['mode'] && c71['mode']['onMelee'] && c71['mode']['onMelee'](c71, c72, c8m['obj']) && (cb9 = c8m['obj']['health'] || cb9), this['changeHealth'](c8m['obj'], c72, cb9) && (c72 && (c72['melees']++, c8k && c71['incStat']('mk', c72)), this['kill'](c8m['obj'], c72, {
                    'weaponId': c71['weapons']['findIndexBySrc'](c72['weapon']['src']),
                    'weapon': c72['weapon']
                })), !(0x0 >= (cb9 -= null == c72['weapon']['pierce'] ? cb9 : c72['weapon']['dmg'] * c8j['materialDens']['flesh'] * c72['weapon']['pierce']))); ++cas);
        }
    };
    var cba = [];
    this['shoot'] = function(c73, c74) {
        var c76 = !0x1;
        if (c8k && c71['incStat']('s', c73), c71['config']['noReload'] || c73['ammos'][c73['weaponIndex']]--, c73['didShoot'] = !0x0, c73['burstCount'] ? c73['burstCount']-- : c73['burstCount'] = c73['weapon']['burst'] ? c73['weapon']['burst']['c'] - 0x1 : 0x0, c73['reloads'][c73['weaponIndex']] = c73['burstCount'] && c73['weapon']['burst'] ? c73['weapon']['burst']['r'] : c73['weapon']['rate'], this['updatePlayerAmmo'](c73), c71['playSound']) {
            var c8i = c73['ammos'][c73['weaponIndex']] / c71['weapons'][c73['loadout'][c73['weaponIndex']]]['ammo'],
                c8l = c71['store']['skins'][c73['skins'][c73['weaponIndex']]],
                c8n = c73['weapon']['sound'] + (c8l && null != c8l['mid'] ? '_' + c8l['mid'] : '');
            c73['isYou'] && 0.25 >= c8i && !c73['weapon']['nRing'] ? c71['playSound'](c8n, 0.85, c73, !0x1, c8h['randFloat'](0.9, 0x1) + 0.15 * (0x1 - c8i / 0.25)) : c71['playSound'](c8n, 0.85, c73, !0x1, c8h['randFloat'](0.9, 0x1));
        }
        if (c73['recoilForce'] += c73['weapon']['recoil'], c73['isYou']) {
            c71['controls'] && c71['controls']['vibration'] && c71['controls']['gamepad']['_connected'] && c71['controls']['gamepad']['rumble'](c73['weapon']['rumbleDur'] || 0xc8, c73['weapon']['rumble'] || 0.5);
            var c8o = c8h['randInt'](0x0, 0x1) ? -c73['weapon']['recoilR'] : c73['weapon']['recoilR'];
            c73['recoilX'] += c8o, c73['recoilZ'] += c8o, c73['recoilTween'] && c73['recoilTween']['stop']();
            var cas = c73['weapon']['recoilAnim'] && c73['weapon']['recoilAnim']['time'] || c73['weapon']['rate'];
            0x0 == c73['aimVal'] && c73['weapon']['recoilAnim'] && c73['weapon']['recoilAnim']['aimTime'] && (cas = c73['weapon']['recoilAnim']['aimTime']), c73['recoilTween'] = new TWEEN['Tween'](c73)['to'](c73['weapon']['recoilAnim'] || {}, 0.15 * cas)['easing'](TWEEN['Easing']['Linear']['None'])['onComplete'](function() {
                c73['recoilTween'] = new TWEEN['Tween'](c73)['to']({
                    'recoilTweenY': 0x0,
                    'recoilTweenYM': 0x0,
                    'recoilTweenZ': 0x0
                }, 0.95 * cas)['easing'](TWEEN['Easing']['Back']['Out'])['start']();
            })['start'](), this['cancelInspect'](c73);
        }
        if (c73['isYou'] && !this['isWeaponHidden'](c73, c73['weaponIndex'])) {
            var cbj = c73['weaponMeshes'][c73['weaponIndex']],
                cbk = 0x0 == c73['aimVal'] && c73['weapon']['scope'];
            if (c8g['showMuzzle'] && !c73['weapon']['nMuz'] && (0x0 == c72['useDepthMap'] || '0' == c72['useDepthMap'])) {
                for (var cbl = 0x0; cbl < cbj['muzzles']['length']; ++cbl) cbj['muzzles'][cbl]['visible'] = !0x0, c8g['setMaterial'](cbj['muzzles'][cbl], c73['weapon']['muzID'] || 0x2, 0x1, !0x0), cbj['muzzles'][cbl]['init'](cbl ? -0x2 * c73['weapon']['xOff'] : 0x0, c73['weapon']['muzOffY'] || 0x0, -c73['weapon']['muzOff'], 0x0, 0x0, 0x0, 0x4 * (c73['weapon']['muzMlt'] || 0x1), 0x1);
                if (!cbk)(cbX = c73['weaponMeshes'][c73['weaponIndex']]['muzzles'][0x0]['getWorldPosition']()['clone']())['project'](c72['camera']), cbX['x'] = (cbX['x'] + 0x1) / 0x2, cbX['y'] = (cbX['y'] + 0x1) / 0x2, c72['flash'](cbX['x'], cbX['y']);
            }
            if (!c73['weapon']['nCase'] && c8g['active'])
                for (cbl = 0x0; cbl < c73['weaponMeshes'][c73['weaponIndex']]['casings']['length']; ++cbl)
                    if (cbX = c73['weaponMeshes'][c73['weaponIndex']]['casings'][cbl]['getWorldPosition'](), c8f && 0x190 < c71['now'] - (c73['lastShell'] || 0x0) && (c73['lastShell'] = c71['now'], c8f['play3D']('case_' + c8h['randInt'](0x0, 0x1), cbX['x'], cbX['y'], cbX['z'], 0.65, c8h['randFloat'](0.8, 1.3))), !cbk) {
                        var cbm = c8h['randInt'](0x0, 0x1) ? 1.4 : 0.8;
                        c8g['physObj'](cbX['x'], cbX['y'], cbX['z'], c73['xDire'] - Math['PI'] / 0x2 * (cbl ? -0x1 : 0x1), Math['PI'] / 0x5 * c8h['randFloat'](0.75, 1.2) * cbm, 0x19, !0x1, c73['weapon']['caseInd'] || 0x1, c73);
                    }
        }
        if (null != c73['weapon']['projectile'] && c8k) {
            var cbn = (c73['spread'] + (c73['weapon']['innac'] || 0x0)) * c8j['spreadAdj'],
                cbo = c73['xDire'] + c8h['randFloat'](-cbn, cbn),
                cbp = c73['yDire'] + c73['recoilAnimY'] * c8j['recoilMlt'] + c8h['randFloat'](-cbn, cbn);
            c71['projectiles']['init'](c73['x'], c73['y'] + c73['height'] - c8j['cameraHeight'], c73['z'], cbo, cbp, c73['weapon']['projectile'], c73, {
                'weaponId': c71['weapons']['findIndexBySrc'](c73['weapon']['src']),
                'weapon': c73['weapon']
            });
        }
        if (null == c73['weapon']['projectile'] || c73['weapon']['physPow'])
            for (var cbq = 0x0, cbr = c73['weapon']['physPow'] ? -0x1 : 0x0; cbr < (null == c73['weapon']['shots'] ? 0x1 : c73['weapon']['shots']); ++cbr) {
                cbo = 0x0, cbp = 0x0;
                if (c73['weapon']['cSpread'] && 0x0 <= cbr) {
                    var cbs = c8h['randFloat'](0.14, 0.19);
                    cbo = c73['xDire'] + c73['weapon']['cSpread'][cbq] * cbs, cbp = c73['yDire'] + c73['weapon']['cSpread'][cbq + 0x1] * cbs, cbq += 0x2;
                } else {
                    cbn = 0x0 <= cbr ? (c73['spread'] + (c73['weapon']['innac'] || 0x0)) * c8j['spreadAdj'] : 0x0;
                    cbo = c73['xDire'] + c8h['randFloat'](-cbn, cbn), cbp = c73['yDire'] + c8h['randFloat'](-cbn, cbn);
                }
                cbp += c73['recoilAnimY'] * c8j['recoilMlt'];
                var cbt = c73['weapon']['range'];
                0x0 > cbr && (cbt = c73['weapon']['physRang']), cba['length'] = 0x0;
                for (var cbu = 0x0, cbv = 0x1 / (cbt * Math['sin'](cbo + Math['PI']) * Math['cos'](cbp)), cbw = 0x1 / (cbt * Math['cos'](cbo + Math['PI']) * Math['cos'](cbp)), cbx = 0x1 / (cbt * Math['sin'](cbp)), cby = c73['y'] + c73['height'] - c8j['cameraHeight'], cbz = 0x0; cbz < c71['map']['manager']['objects']['length']; ++cbz)(c8m = c71['map']['manager']['objects'][cbz])['active'] && !c8m['noShoot'] && ((cbu = c8h['lineInRect'](c73['x'], c73['z'], cby, cbv, cbw, cbx, c8m['x'] - c8m['width'], c8m['z'] - c8m['length'], c8m['y'] - c8m['height'], c8m['x'] + c8m['width'], c8m['z'] + c8m['length'], c8m['y'] + c8m['height'])) && 0x1 >= cbu && cba['push']({
                    'obj': c8m,
                    'dst': cbu
                }));
                if (c8k && 0x0 <= cbr)
                    for (cbz = 0x0; cbz < this['list']['length']; ++cbz) this['list'][cbz]['active'] && c73 != this['list'][cbz] && (!c73['team'] || c73['team'] != this['list'][cbz]['team']) && ((c8m = this['fetchState'](this['list'][cbz], c73['getStateConst']())) && ((cbu = c8h['lineInRect'](c73['x'], c73['z'], cby, cbv, cbw, cbx, c8m['x'] - this['list'][cbz]['scale'] - c71['config']['hitBoxPad'], c8m['z'] - this['list'][cbz]['scale'] - c71['config']['hitBoxPad'], c8m['y'], c8m['x'] + this['list'][cbz]['scale'] + c71['config']['hitBoxPad'], c8m['z'] + this['list'][cbz]['scale'] + c71['config']['hitBoxPad'], c8m['y'] + this['list'][cbz]['height'] + c71['config']['hitBoxPad'])) && 0x1 >= cbu && cba['push']({
                        'player': !0x0,
                        'obj': this['list'][cbz],
                        'dst': cbu
                    })));
                var cbA = c71['map']['terrain'];
                if (cbA) {
                    var cbB = cbA['raycast'](c73['x'], -c73['z'], cby, 0x1 / cbv, -0x1 / cbw, 0x1 / cbx);
                    if (cbB) {
                        let c71 = c8h['getD3D'](c73['x'], cby, c73['z'], cbB['x'], cbB['z'], -cbB['y']);
                        cba['push']({
                            'terrain': !0x0,
                            'dst': c71 / cbt
                        });
                    }
                }
                var cbD = cbt;
                if (cba['length']) {
                    cba['sort'](c8h['orderByDst']);
                    var cbE = c73['weapon']['dmg'],
                        cbF = !0x1;
                    for (cbz = 0x0; cbz < cba['length']; ++cbz) {
                        if (cbD = cbt * (c8m = cba[cbz])['dst'], 0x0 > cbr) {
                            var cbG = (0x1 - c8m['dst']) * (c73['weapon']['physPow'] * (c71['config'] ? c71['config']['impulseMlt'] : 0x1)),
                                cbH = cbG * Math['sin'](cbo + Math['PI']) * Math['cos'](cbp);
                            c73['xVel'] -= cbH;
                            var cbI = cbG * Math['cos'](cbo + Math['PI']) * Math['cos'](cbp);
                            c73['zVel'] -= cbI;
                            var cbJ = cbG * Math['sin'](cbp);
                            c73['yVel'] -= cbJ, c73['onGround'] = !0x1, c8k || (c74['velObj'] = {
                                'x': cbH,
                                'y': cbI,
                                'z': cbJ
                            });
                            break;
                        }
                        if (!c8k) break;
                        var cbK = c73['weapon']['dropStart'] || 0x0,
                            cbL = Math['min'](0x1, 0x1 - (0x1 - c8m['dst']) * cbt / (cbt - cbK)),
                            cbM = cbE - c73['weapon']['dmgDrop'] * cbL,
                            cbN = !0x1,
                            cbO = !0x1;
                        if (c8m['player']) {
                            var cbP = cby + cbD * Math['sin'](cbp);
                            cbN = c8m['obj']['y'] + c8m['obj']['height'] - cbP < c8j['headScale'], cbO = c8m['obj']['y'] + c8j['legHeight'] > cbP, cbM *= cbN && !c73['weapon']['noHeadShot'] ? 1.5 : 0x1, cbM *= cbO ? 0.5 : 0x1, cbN || !c71['config'] || !c71['config']['headshotOnly'] || (cbM = 0x0);
                        }
                        if (c8k && !c71['waitTimers'] && c8m['obj'] && c8m['obj']['health'] && !c8m['player'] && (c8m['obj']['health'] -= cbM, c8k['send'](c73['id'], '4'), 0x0 >= c8m['obj']['health'] && (c8m['obj']['active'] = !0x1, c8m['obj']['health'] = 0x0, c8m['obj']['destroyedBy'] = c73, c71['destObjs']['push'](c8m['obj']['uid']), c8k['broadcast']('game' + c71['sid'], 'do', c8m['obj']['uid']), c8m['obj'] && c8m['obj']['onDestroy'] && c71['onTrigger'](c73, c8m['obj']))), c8k && 'seek' == c73['team'] && !c8m['player'] && c8m['obj'] && c8m['obj']['propID'] && this['changeHealth'](c73, null, 0xa) && this['kill'](c73, null, {}), c8m['obj'] && (c8m['obj']['onShoot'] || c8m['obj']['onDamage']) && c71['onTrigger'](c73, c8m['obj']), c8m['player'] || c8m['obj'] && c8m['obj']['dummy']) {
                            if (c8m['player'] && (c76 = !0x0), this['changeHealth'](c8m['obj'], c73, cbM, null, cbN)) {
                                var cbQ = {
                                    'dst': c8m['dst'],
                                    'headShot': cbN,
                                    'wallbang': cbF,
                                    'weaponId': c71['weapons']['findIndexBySrc'](c73['weapon']['src']),
                                    'weapon': c73['weapon']
                                };
                                this['kill'](c8m['obj'], c73, cbQ);
                            }
                            cbE -= null == c73['weapon']['pierce'] ? cbE : c73['weapon']['dmg'] * c8j['materialDens']['flesh'] * c73['weapon']['pierce'];
                        } else {
                            if (!c8m['obj'] || !c8m['obj']['penetrable']) break;
                            cbF = !0x0, cbE -= null == c73['weapon']['pierce'] ? cbE : c73['weapon']['dmg'] * c8j['materialDens']['default'] * c73['weapon']['pierce'];
                        }
                        if (0x0 >= cbE) break;
                    }
                }
                if (!(0x0 > cbr)) {
                    cbD -= 0.12;
                    var cbR = c73['x'] + cbD * Math['sin'](cbo + Math['PI']) * Math['cos'](cbp),
                        cbS = (cbP = cby + cbD * Math['sin'](cbp), c73['z'] + cbD * Math['cos'](cbo + Math['PI']) * Math['cos'](cbp)),
                        cbT = 0x0,
                        cbU = 0x0;
                    if (cba['length'] && (c8m['terrain'] ? cbU = Math['PI'] / 0x2 : cbP >= c8m['obj']['y'] + c8m['obj']['height'] ? cbU = Math['PI'] / 0x2 : cbP <= c8m['obj']['y'] - c8m['obj']['height'] ? cbU = -Math['PI'] / 0x2 : cbR <= c8m['obj']['x'] - c8m['obj']['width'] ? cbT = -Math['PI'] / 0x2 : cbR >= c8m['obj']['x'] + c8m['obj']['width'] ? cbT = Math['PI'] / 0x2 : cbS <= c8m['obj']['z'] - c8m['obj']['length'] && (cbT = Math['PI']), !c8k && c8g['effect'](cbR, cbP, cbS, cbT, cbU, 0x0)), c8k) {
                        var cbV = c73['weapon'] && c73['weapon']['trail'] ? 0x1 : 0x0;
                        for (cbz = 0x0; cbz < this['list']['length']; ++cbz)(this['list'][cbz]['active'] || this['list'][cbz]['spectating']) && this['list'][cbz] != c73 && (cba['length'] && !c8m['player'] ? c8k['send'](this['list'][cbz]['id'], '9', c73['sid'], Math['round'](cbR), Math['round'](cbP), Math['round'](cbS), cbT['round'](0x1), cbU['round'](0x1), cbV) : c8k['send'](this['list'][cbz]['id'], '9', c73['sid'], Math['round'](cbR), Math['round'](cbP), Math['round'](cbS), void 0x0, void 0x0, cbV));
                    }
                    if (c73['isYou'] && cbD >= c8j['tracerMinDst']) {
                        var cbW = c8h['randInt'](0x0, c73['weaponMeshes'][c73['weaponIndex']]['muzzles']['length'] - 0x1),
                            cbX = c73['weaponMeshes'][c73['weaponIndex']]['muzzles'][cbW]['getWorldPosition'](),
                            cbY = c73['weapon'] && c73['weapon']['scope'] && 0x0 == c73['aimVal'] ? 0x7 : 0x0,
                            cbZ = cbX['x'] - cbY * Math['sin'](cbo + Math['PI']) * Math['cos'](cbp),
                            cc0 = cbX['y'] - cbY * Math['sin'](cbp),
                            cc1 = cbX['z'] - cbY * Math['cos'](cbo + Math['PI']) * Math['cos'](cbp);
                        c8h['getD3D'](cbZ, cc0, cc1, cbR, cbP, cbS), cbT = c8h['getDir'](cc1, cbZ, cbS, cbR), cbU = c8h['getDir'](c8h['getDistance'](cbZ, cc1, cbR, cbS), cbP, 0x0, cc0);
                        c8g['physObj'](cbZ, cc0, cc1, cbT, cbU, Math['min'](cbD + cbY, c8j['tracerMaxDst']), c73['weapon'] && c73['weapon']['trail'], 0x0, c73);
                    }
                }
            }
        c76 && c8k && c71['incStat']('h', c73);
    }, this['spray'] = function(c72) {
        if (c71['now'] - c72['lastSpray'] >= c8j['sprayTimer']) {
            cba['length'] = 0x0;
            for (var c73 = 0x0, c74 = 0x1 / (c8j['sprayRange'] * Math['sin'](c72['xDire'] + Math['PI']) * Math['cos'](c72['yDire'])), c76 = 0x1 / (c8j['sprayRange'] * Math['cos'](c72['xDire'] + Math['PI']) * Math['cos'](c72['yDire'])), c8f = 0x1 / (c8j['sprayRange'] * Math['sin'](c72['yDire'])), c8g = 0x0; c8g < c71['map']['manager']['objects']['length']; ++c8g)(c8m = c71['map']['manager']['objects'][c8g])['noShoot'] || c8m['noVis'] || (c73 = c8h['lineInRect'](c72['x'], c72['z'], c72['y'] + c72['height'] - c8j['cameraHeight'], c74, c76, c8f, c8m['x'] - c8m['width'], c8m['z'] - c8m['length'], c8m['y'] - c8m['height'], c8m['x'] + c8m['width'], c8m['z'] + c8m['length'], c8m['y'] + c8m['height'])) && 0x1 >= c73 && cba['push']({
                'obj': c8m,
                'dst': c73
            });
            if (cba['length'] && (cba['sort'](c8h['orderByDst']), c8m = cba[0x0]['obj'])) {
                var c8i = c8j['sprayRange'] * cba[0x0]['dst'] - 0.1,
                    c8l = c72['y'] + c72['height'] - c8j['cameraHeight'] + c8i * Math['sin'](c72['yDire']),
                    c8n = c72['x'] + c8i * Math['sin'](c72['xDire'] + Math['PI']) * Math['cos'](c72['yDire']),
                    c8o = c72['z'] + c8i * Math['cos'](c72['xDire'] + Math['PI']) * Math['cos'](c72['yDire']),
                    cas = 0x0,
                    ccd = 0x0;
                c8l >= c8m['y'] + c8m['height'] ? ccd = -0x5a : c8l <= c8m['y'] - c8m['height'] ? ccd = 0x5a : c8n <= c8m['x'] - c8m['width'] ? cas = -0x5a : c8n >= c8m['x'] + c8m['width'] ? cas = 0x5a : c8o <= c8m['z'] - c8m['length'] && (cas = 0xb4);
                var cce = c8j['sprayScale'] / 0x2;
                if (ccd) {
                    if (c8m['width'] < cce || c8m['length'] < cce) return;
                    c8o - cce < c8m['z'] - c8m['length'] ? c8o = c8m['z'] - c8m['length'] + cce : c8o + cce > c8m['z'] + c8m['length'] && (c8o = c8m['z'] + c8m['length'] - cce), c8n - cce < c8m['x'] - c8m['width'] ? c8n = c8m['x'] - c8m['width'] + cce : c8n + cce > c8m['x'] + c8m['width'] && (c8n = c8m['x'] + c8m['width'] - cce);
                } else {
                    if (c8m['height'] < cce) return;
                    if (0x5a == cas || -0x5a == cas) {
                        if (c8m['length'] < cce) return;
                        c8o - cce < c8m['z'] - c8m['length'] ? c8o = c8m['z'] - c8m['length'] + cce : c8o + cce > c8m['z'] + c8m['length'] && (c8o = c8m['z'] + c8m['length'] - cce);
                    } else {
                        if (c8m['width'] < cce) return;
                        c8n - cce < c8m['x'] - c8m['width'] ? c8n = c8m['x'] - c8m['width'] + cce : c8n + cce > c8m['x'] + c8m['width'] && (c8n = c8m['x'] + c8m['width'] - cce);
                    }
                    c8l + cce > c8m['y'] + c8m['height'] && (c8l = c8m['y'] + c8m['height'] - cce);
                }
                c72['lastSpray'] = c71['now'], c71['playSound'] && c71['playSound']('spray', 0.4, c72, !0x0), c8k['broadcast']('game' + c71['sid'], 'sp', c72['sid'], c72['sprayIndex'], c8n['round'](0x2), c8l['round'](0x2), c8o['round'](0x2), cas, ccd);
            }
        }
    }, this['interact'] = function(c72, c73) {
        if (c71['now'] - c72['lastInteract'] >= c8j['interactTimer']) {
            if (c72['lastInteract'] = c71['now'], !c73) {
                if ('inf' != c72['team'])
                    for (var c74 = 0x0; c74 < c71['map']['manager']['pickups']['length']; ++c74)
                        if (null != (c8l = c71['map']['manager']['pickups'][c74])['pickup'] && c72['collides'](c8l) && -0x1 == c72['loadout']['indexOf'](c8l['pickup']) && c72['score'] >= c8l['scoreP']) {
                            if (c71['weapons'][c72['loadout'][0x0]] && c71['weapons'][c72['loadout'][0x0]]['melee'] && 0x1 == c72['loadout']['length']) c8m = void 0x0, c72['loadout'][0x0] = c8l['pickup'], c72['weaponIndex'] = 0x0, c8l['pickupRep'] && null == c8m && this['addPicked'](c72, c8l['pickup']);
                            else if (c71['weapons'][c8l['pickup']]['type']) c71['weapons'][c72['loadout'][0x0]]['type'] ? (c8m = c72['loadout'][0x0], c72['loadout'][0x0] = c8l['pickup'], c72['weaponIndex'] = 0x0) : !c71['weapons'][c72['loadout'][0x0]]['type'] && (c8m = c71['weapons'][c72['loadout'][0x1]] && c71['weapons'][c72['loadout'][0x1]]['melee'] ? void 0x0 : c72['loadout'][0x1], c72['loadout'][0x1] = c8l['pickup'], c72['weaponIndex'] = 0x1), this['removePicked'](c72, c8m), c8l['pickupRep'] && null == c8m && this['addPicked'](c72, c8l['pickup']);
                            else if (!c71['weapons'][c8l['pickup']]['type']) {
                                c8m = c71['weapons'][c72['loadout'][0x0]] && c71['weapons'][c72['loadout'][0x0]]['melee'] ? void 0x0 : c72['loadout'][0x0];
                                var c76 = !0x1;
                                c71['weapons'][c72['loadout'][0x0]]['type'] ? (c72['loadout']['splice'](0x0, 0x0, c8l['pickup']), c71['weapons'][c72['loadout'][0x1]] && c71['weapons'][c72['loadout'][0x1]]['melee'] && (c72['loadout']['length'] = 0x1), c8m = void 0x0) : !c71['weapons'][c72['loadout'][0x0]]['type'] && (!(c71['weapons'][c72['loadout'][0x0]] && c71['weapons'][c72['loadout'][0x0]]['melee']) && (c76 = this['removePicked'](c72, c72['loadout'][0x0])), c72['loadout'][0x0] = c8l['pickup']), c8l['pickupRep'] && (null == c8m || c76) && this['addPicked'](c72, c8l['pickup']), c72['weaponIndex'] = 0x0;
                            }
                            c8l['pickupRep'] && (c8l['pickup'] = c8m), c8k['broadcast']('game' + c71['sid'], 'inat', c72['sid'], c72['loadout'], c72['weaponIndex'], c8l['uid'], c8l['pickupRep'] ? c8m : c8l['pickup']), c72['updateLoadout'](c71, c72['weaponIndex'], !0x0, ...c72['loadout']), 0x0 == c8l['scoreP'] || c8l['method'] || (c8k['send'](c72['id'], 'am', ['Purchased', null]), this['score'](c72, -c8l['scoreP']));
                            break;
                        } for (c74 = 0x0; c74 < c71['map']['manager']['gates']['length']; ++c74)
                    if (((c8l = c71['map']['manager']['gates'][c74])['active'] || !c8l['active'] && c8l['closeable']) && c72['collides'](c8l, c8l['tRadius']) && c72['score'] >= c8l['scoreP']) {
                        0x0 != c8l['scoreP'] && (c8k['send'](c72['id'], 'am', [c8l['method'] ? 'Unlocked' : 'Purchased', null]), !c8l['method'] && this['score'](c72, -c8l['scoreP'])), c8k['broadcast']('game' + c71['sid'], 'gte', c8l['uid'], !c8l['active'] && c8l['closeable']), c8l['active'] = !c8l['active'];
                        break;
                    }
            }
            for (c74 = 0x0; c74 < c71['map']['manager']['banks']['length']; ++c74)
                if ((c8l = c71['map']['manager']['banks'][c74])['active'] && c72['collides'](c8l, c8l['tRadius'])) {
                    0x0 != c8l['deposited'] && c73 ? c8l['withdrawAmnt'] && c8l['deposited'] > c8l['withdrawAmnt'] ? (c8l['deposited'] -= c8l['withdrawAmnt'], this['score'](c72, c8l['withdrawAmnt'])) : (this['score'](c72, c8l['deposited']), c8l['deposited'] = 0x0) : 0x0 != c72['score'] && !c73 && (c8l['depositAmnt'] && c72['score'] > c8l['depositAmnt'] ? (c8l['deposited'] += c8l['depositAmnt'], this['score'](c72, -c8l['depositAmnt'])) : (c8l['deposited'] += c72['score'], this['score'](c72, -c72['score']))), c8k['broadcast']('game' + c71['sid'], 'bnk', c8l['uid'], c8l['deposited']);
                    break;
                }
        }
    }, this['findEmptyPickup'] = function() {
        for (var c72, c73 = 0x0; c73 < c71['map']['manager']['pickups']['length']; ++c73)
            if ((c72 = c71['map']['manager']['pickups'][c73])['pickupRep'] && null == c72['pickup']) return c72['uid'];
        return null;
    }, this['addPicked'] = function(c71, c72) {
        -0x1 == c71['lastPicked']['indexOf'](c72) && c71['lastPicked']['push'](c72);
    }, this['removePicked'] = function(c71, c72) {
        var c73 = c71['lastPicked']['indexOf'](c72);
        return -0x1 < c73 && c71['lastPicked']['splice'](c73, 0x1), -0x1 < c73;
    }, this['dropWeapon'] = function(c72, c73) {
        if (c71['map']['manager']['pickups']['length']) {
            var c74, c76 = c72['weaponIndex'],
                c8f = c72['loadout'][c76],
                c8g = [c72['x'] + c8h['randInt'](-0x5, 0x5), c72['y'] + 0x1, c72['z'] + c8h['randInt'](-0x5, 0x5)];
            if (c73) {
                for (var c8i = 0x0; c8i < c72['loadout']['length']; c8i++) c8f = c72['loadout'][c8i], (c74 = this['findEmptyPickup']()) && -0x1 < c72['lastPicked']['indexOf'](c8f) && !c71['weapons'][c8f]['melee'] && (c8g = [c72['x'] + c8h['randInt'](-0x5, 0x5), c72['y'] + 0x1, c72['z'] + c8h['randInt'](-0x5, 0x5)], c71['updatePickup'](c74, c8f, null, c8g), c8k['broadcast']('game' + c71['sid'], 'inat', -0x1, null, null, c74, c8f, !0x0, c8g));
                c72['lastPicked']['length'] = 0x0;
            } else if (!c71['weapons'][c8f]['melee']) {
                var c8j = (c74 = this['findEmptyPickup']()) && -0x1 < c72['lastPicked']['indexOf'](c8f);
                c8j && (this['removePicked'](c72, c8f), c71['updatePickup'](c74, c8f, null, c8g)), c72['loadout'] = 0x1 == c72['loadout']['length'] ? [] : [c72['loadout'][c76 ? 0x0 : 0x1]], c72['weaponIndex'] = 0x0, c8k['broadcast']('game' + c71['sid'], 'inat', c72['sid'], c72['loadout'], c72['weaponIndex'], c74, c8f, c8j, c8g), c72['updateLoadout'](c71, c72['weaponIndex'], !0x0, ...c72['loadout']);
            }
        }
    }, this['updateInteract'] = function(c72, c73, c74 = 'Pickup weapon', c76) {
        if ((c71['map']['manager']['pickups']['length'] || c71['map']['manager']['gates']['length'] || c71['map']['manager']['banks']['length']) && c72['isYou']) {
            inner = c76 ? c74 + '<div style=\'color: #fff;margin-top:-30px;\'>Press <span style=\'color:' + c8i['interactPopup']['key'] + '\'>[' + c8h['getKeyName'](c71['controls']['interactKey']) + ']</span> to Deposit - ' + (c76[0x0] || 'All') + '</div><div style=\'color: #fff;margin-top:-30px;\'>Press <span style=\'color:' + c8i['interactPopup']['key'] + '\'>[' + c8h['getKeyName'](c71['controls']['interactSecKey']) + ']</span> to Withdraw - ' + (c76[0x1] || 'All') + '</div>' : 'Press <span style=\"color:' + c8i['interactPopup']['key'] + '\">[' + c8h['getKeyName'](c71['controls']['interactKey']) + ']</span> to ' + c74;
            var c8f = c73 ? 'block' : 'none';
            interactMsg['innerHTML'] != inner && (interactMsg['innerHTML'] = inner), interactMsg['style']['display'] != c8f && (interactMsg['style']['display'] = c8f);
        }
    };
    var ccD = [];
    this['syncLeaders'] = function() {
        var c72 = c71['mode']['leaderStat'] || 'score';
        c8n = c71['mode']['killSort'] ? this['list']['slice']()['sort'](c8h['orderByKills']) : this['list']['slice']()['sort'](c8h['orderByScore']), ccD['length'] = 0x0;
        for (var c73 = 0x0, c74 = 0x0, c76 = 0x0; c76 < c8n['length']; ++c76) c8n[c76]['spectating'] ? c74++ : 0xa > c73 && (c73++, ccD['push'](c8n[c76]['sid'], c8n[c76]['account'] ? c8n[c76]['account']['name'] : c8n[c76]['name'], c8n[c76]['team'], c71['mode']['killSort'] ? c8n[c76]['kills'] : c8j['endForm'][c72] ? c8j['endForm'][c72](c8n[c76][c72], c71, c8n[c76]) : c8n[c76][c72], c8n[c76]['account'] ? c8n[c76]['account']['clan'] : 0x0, c8n[c76]['account'] ? c8n[c76]['account']['featured'] : 0x0));
        c8k['broadcast']('game' + c71['sid'], '7', ccD, c74);
    }, this['saveClassScores'] = function(c72) {
        if (c72['classScores'])
            for (var c73 = 0x0; c73 < c71['config']['classes']['length']; ++c73) c72['classScores'][c73] && (c72['account']['stats']['c' + c73] || (c72['account']['stats']['c' + c73] = 0x0), c72['account']['stats']['c' + c73] += c72['classScores'][c73]);
    }, this['score'] = function(c72, c73, c74) {
        c8k && (c72['score'] += c73, null == c71['host'] && 0x32c8 < c72['score'] && (c72['score'] = 0x32c8, c73 = 0x0), c8k['send'](c72['id'], '5', c73), this['syncLeaders'](), null == c71['host'] && (!c72['classScores'][c72['classIndex']] && (c72['classScores'][c72['classIndex']] = 0x0), c72['classScores'][c72['classIndex']] += c73), c71['mode']['teams'] && c72['team'] && c71['teams'] && !c71['mode']['noScoreC'] && (!c74 || !c71['mode']['objective']) && (c71['teams'][c72['team']] ? c71['teams'][c72['team']] += c73 : c71['teams'][c72['team']] = c73, c8k['broadcast']('game' + c71['sid'], 'ts', c72['team'], c71['teams'][c72['team']])));
    }, this['tickPlayer'] = function(c71, c72) {
        c71['playTime'] += c72, 0x0 < c71['hitTimer'] && (c71['hitTimer'] -= c72), c71['ticker'] -= c72, 0x0 >= c71['ticker'] && (c71['ticker'] = 0x1f4, 0x0 >= c71['hitTimer'] && !c71['challMode'] && this['changeHealth'](c71, null, -c71['maxHealth'] * (c71['regen'] || 0x0)));
    }, this['changeHealth'] = function(c72, c73, c74, c76, c8f) {
        if ((!c71['waitTimers'] || c71['waitTimers'][0x0]['canDMG']) && !(0x0 > c74 && c72['health'] == c72['maxHealth']) && (c73 && c73['account'] && c73['account']['hack'] && c74 && (c74 *= 0.2), c73 && 0.1 <= c73['avgSpn'] && (c74 *= 0.2), c73 && c73['isHacker'] && (c74 *= 0.1), c73 && c73['lastHack'] && 0x190 >= c71['now'] - c73['lastHack'] && (c74 *= 0.2), !(!c76 && c72['team'] && c73 && c72['team'] == c73['team'] && 0x0 < c74))) {
            if (c73 && c73 != c72 && 0x0 < c74 && c8k['send'](c73['id'], '4', c72['sid'], Math['round'](c74), c8f), c72['dummy']) return !0x0;
            0x0 < c74 && (c72['hitTimer'] = c72['regenDelay'] || 0x0), c72['health'] -= c74, c72['health'] = Math['max'](Math['min'](c72['maxHealth'], c72['health']), 0x0), c73 ? (c8k['send'](c72['id'], 'h', Math['ceil'](c72['health']), null, Math['round'](c73['x']), Math['round'](c73['z'])), c73 != c72 && (c72['dmgReceived'][c73['id']] ? (c72['dmgReceived'][c73['id']]['val'] += c74, c72['dmgReceived'][c73['id']]['time'] = c71['now']) : c72['dmgReceived'][c73['id']] = {
                'time': c71['now'],
                'val': c74
            })) : c8k['send'](c72['id'], 'h', Math['ceil'](c72['health']));
            for (var c8g = 0x0; c8g < this['list']['length']; ++c8g) this['list'][c8g] != c72 && c8k['send'](this['list'][c8g]['id'], 'h', Math['ceil'](c72['health']), c72['sid']);
            return 0x0 >= c72['health'];
        }
    }, this['changePosition'] = function(c71, c72, c73, c74, c76) {
        c71['x'] = c71['oldX'] = c72, c71['y'] = c71['oldY'] = c73, c71['z'] = c71['oldZ'] = c74, c76 && (c71['lastX'] = c72, c71['lastY'] = c73, c71['lastZ'] = c74, c71['stepVal'] = 0x0, c71['xVel'] = 0x0, c71['yVel'] = 0x0, c71['zVel'] = 0x0);
    }, this['swapMelee'] = function(c71, c72) {
        0x1 >= c71['ammos']['length'] || (c71['weaponIndex'] == c71['ammos']['length'] - 0x1 ? this['swapWeapon'](c71, 0x1, !0x1, void 0x0, void 0x0, c72) : this['swapWeapon'](c71, null, null, void 0x0, c71['ammos']['length'] - 0x1, c72));
    }, this['swapSecondary'] = function(c72, c73) {
        if (!(0x1 >= c72['ammos']['length']))
            for (var c74, c76 = 0x0; c76 < c72['ammos']['length']; ++c76) c74 = c72['loadout'][c76], c71['weapons'][c74] && c71['weapons'][c74]['secondary'] && (c72['weaponIndex'] == c76 ? this['swapWeapon'](c72, null, null, void 0x0, 0x0, c73) : this['swapWeapon'](c72, null, null, void 0x0, c76, c73));
    }, this['swapWeapon'] = function(c73, c74, c76, c8f, c8g, c8i) {
        if (!(0x1 >= c73['ammos']['length'] && c74 || c8f > c73['ammos']['length'])) {
            var c8j = c73['weaponIndex'];
            if (c74 && (0x1 != c74 && -0x1 != c74 && (c74 = 0x0), c73['weaponIndex'] += c74, 0x1 == c74 ? c73['weaponIndex'] > c73['ammos']['length'] - 0x2 && (c73['weaponIndex'] = 0x0) : 0x0 > c73['weaponIndex'] ? c73['weaponIndex'] = Math['min'](c73['ammos']['length'] - 0x1, 0x2) : c73['weaponIndex'] = 0x0), null != c8f && (c73['weaponIndex'] = c8f), null != c8g && (c73['weaponIndex'] = c8g), (null != c74 || null != c8g) && (c8j != c73['weaponIndex'] || c76) && (c73['reloadTimer'] = 0x0, c73['didShoot'] = !0x1, c73['burstCount'] = 0x0), c73['weapon'] = c71['weapons'][c73['loadout'][c73['weaponIndex']]], c73['weapon'] || (c73['weapon'] = c71['weapons'][c73['loadout'][0x0]], c73['weapon'] && (c73['weaponIndex'] = 0x0)), c72 && (c8j != c73['weaponIndex'] || c76)) {
                this['cancelInspect'](c73);
                for (var c8k = 0x0; c8k < c73['weaponMeshes']['length']; ++c8k) c73['weaponMeshes'][c8k]['visible'] = !0x1;
                c73['weaponMeshes'][c73['weaponIndex']] && (c73['weaponMeshes'][c73['weaponIndex']]['visible'] = !this['isWeaponHidden'](c73, c73['weaponIndex']) || !c73['isYou']);
            }
            if (null == c8f && c73['weapon'] && (!c72 || c73['isYou']) && (c73['isYou'] && c8j == c73['weaponIndex'] || c8i || (c73['swapTime'] = c73['weapon']['swapTime']), c73['isYou'] && (c8j != c73['weaponIndex'] || c76))) {
                var c8l, c8m = '';
                for (c8k = 0x0; c8k < c73['ammos']['length']; ++c8k) c8l = c8k == c73['weaponIndex'], c71['weapons'][c73['loadout'][c8k]]['icon'] && (c8m += '<div class=\'weaponItem\'>' + (0x0 < c8k ? '<div class=\'weapKey\'>' + (c71['weapons'][c73['loadout'][c8k]]['melee'] ? '[' + c8h['getKeyName'](c71['controls']['meleeKey']) + ']' : '[' + c8h['getKeyName'](c71['controls']['swapKey']) + ']') + '</div>' : '') + '<img style=\'opacity:' + (c8l ? 0x1 : 0.7) + (c8k ? ';margin-right:25px' : '') + '\' class=\'weaponIcon\' src=\'' + c8h['assetsUrl']((c71['weapons'][c73['loadout'][c8k]]['melee'] ? '/textures/melee/icon_' + (c71['store']['skins'][c73['meleeIndex']] && c71['store']['skins'][c73['meleeIndex']]['id'] || 0x0) : '/textures/weapons/' + c71['weapons'][c73['loadout'][c8k]]['icon']) + '.png') + '\' /></div>');
                c8i || (c73['swapTween'] && c73['swapTween']['stop'](), c73['swapTweenA'] = 0.5, c73['swapTween'] = new TWEEN['Tween'](c73)['to']({
                    'swapTweenA': 0x1
                }, 0x4b0)['easing'](TWEEN['Easing']['Elastic']['Out'])['start'](), c8j != c73['weaponIndex'] && 0x1 == c73['aimVal'] && (c73['swapTweenAnim'] && c73['swapTweenAnim']['stop'](), c73['swapTweenR'] = c73['weapon']['swapWiggle'] || 0.6, c73['swapTweenAnim'] = new TWEEN['Tween'](c73)['to']({
                    'swapTweenR': 0x0
                }, c73['weapon']['swapTime'] + 0xdc)['easing'](TWEEN['Easing']['Back']['InOut'])['start']()), c8j != c73['weaponIndex'] && 0x1 == c73['aimVal'] && (c73['meleeAnim']['anim'] && c73['meleeAnim']['anim']['stop'](), c73['resetMeleeAnim'](), c73['meleeAnim']['armR'] = 0.15, c73['weapon']['melee'] && (c73['meleeAnim']['anim'] = new TWEEN['Tween'](c73['meleeAnim'])['to']({
                    'armR': 0x0
                }, 0x2bc)['easing'](TWEEN['Easing']['Back']['InOut'])['start']()))), weaponDisplay['innerHTML'] = c8m, this['updatePlayerAmmo'](c73);
            }
        }
    }, this['taunt'] = function(c72, c73) {
        c72 && c72['active'] && c8j['taunts'][c73] && (!c72['lastTaunt'] || 0x0 <= c71['now'] - c72['lastTaunt']) && (c72['lastTaunt'] = c71['now'] + c8j['taunts'][c73]['tm'], c71['playSound'](c8j['taunts'][c73]['id'], 0.3, c72, !0x0, c8h['randFloat'](0.9, 0x1)));
    }, this['checkStreak'] = function(c72) {
        for (var c73 = 0x0; c73 < c71['streaks']['length']; ++c73) c72['realKillStreak'] == c71['streaks'][c73]['kills'] && this['addStreak'](c72, c73);
        c72['realKillStreak'] >= c71['maxStreak'] && (c72['realKillStreak'] = 0x0);
    }, this['useStreak'] = function(c72, c73) {
        c72['streaks'][c73] && c72['streaks'][c73]['streak']['activate'](c71, c72) && (0x1 < c72['streaks'][c73]['cnt'] ? c72['streaks'][c73]['cnt']-- : c72['streaks'][c73] = null, c8k['send'](c72['id'], 'st', c73, c72['streaks'][c73] && c72['streaks'][c73]['cnt'] || 0x0));
    }, this['addStreak'] = function(c72, c73) {
        c72['streaks'][c73] ? c72['streaks'][c73]['cnt']++ : c72['streaks'][c73] = {
            'cnt': 0x1,
            'streak': c71['streaks'][c73]
        }, c8k['send'](c72['id'], 'st', c73, c72['streaks'][c73]['cnt']);
    }, this['kill'] = function(c72, c73, c74, c76, c8f) {
        if (c72['dummy'] || c72['active']) {
            var c8g = !0x1;
            if (c72['dummy'] || (c72['active'] = !0x1, c72['isYou'] && this['toggleAim'](c72, 0x0), c72['objInstances'] && this['disposeMesh'](c72)), c8k) {
                var c8h, c8i = 0x0;
                if (c72['deaths']++, c72['deathInfo']['doer'] = c73, c72['deathInfo']['time'] = c71['now'], c71['mode']['noStreaks'] || c71['config']['noStreaks'] || c72['deathStreak']++, c72['lives'] && !c71['waitTimers'] && (c72['lives']--, c8k['send'](c72['id'], 'lv', c72['lives'])), c71['kills']++, c73 && c73 != c72 && (!c72['dummy'] && c73['kills']++, !(c71['mode']['noStreaks'] || c71['config']['noStreaks']) && (c73['streak']++, c73['killStreak']++, c73['realKillStreak']++, c73['deathStreak'] = 0x0, this['checkStreak'](c73), 0x0 == c73['killStreak'] % 0x5 && (c8i = c73['killStreak']), c71['now'] - c73['lastKill'] >= c8j['feedTimer'] && (c73['streak'] = 0x0)), c73['lastKill'] = c71['now'], !c8f && c71['config']['killRewards'] && !c71['mode']['noKillRewards'] && ((c8h = c8o['reward'](this, c73, c72, c74, c71)) && c8k['send'](c73['id'], '6', c8h, c74['headShot'] ? 0x1 : 0x0, c73['kills']), this['score'](c73, c8o['getScore'](c8h), !0x0), c8g = !0x0), c71['players']['dropWeapon'](c72, !0x0)), c74 && c74['weapon'] && delete c74['weapon'], !c72['dummy'])
                    for (var c8l = 0x0; c8l < this['list']['length']; ++c8l) !c71['mode']['noAssists'] && c72['dmgReceived'][this['list'][c8l]['id']] && c73 != this['list'][c8l] && c72['dmgReceived'][this['list'][c8l]['id']]['val'] >= c8j['assistMin'] && c71['now'] - c72['dmgReceived'][this['list'][c8l]['id']]['time'] <= c8j['assistTime'] && (this['list'][c8l]['assists']++, this['score'](this['list'][c8l], c8j['assistScore'], !0x0), c8k['send'](this['list'][c8l]['id'], '10'), c8g = !0x0), this['list'][c8l] == c72 ? c8k['send'](c72['id'], '3', c72['sid'], c72['deaths'], c73 ? c73['sid'] : 0x0, [c73 ? null == c74['weaponId'] ? c73['loadout'][c73['weaponIndex']] : c74['weaponId'] : -0x1, c8h ? c8o['getScore'](c8h) : 0x0, c73 && c73['account'] && c73['account']['stats']['c' + c73['classIndex']] ? c73['account']['stats']['c' + c73['classIndex']] : 0x0], c74, c76) : c8k['send'](this['list'][c8l]['id'], '3', c72['sid'], c72['deaths'], c73 ? c73['sid'] : 0x0, null, c74, c76);
                c71['mode']['onKill'] && c71['mode']['onKill'](c71, c8k, c72, c73, c74), c8i && c8k['broadcast']('game' + c71['sid'], 'kst', c73['sid'], c8i);
            }
            c8k && !c8g && this['syncLeaders']();
        }
    }, this['indexBySid'] = function(c71) {
        for (var c72 = 0x0; c72 < this['list']['length']; ++c72)
            if (this['list'][c72]['sid'] == c71) return c72;
        return -0x1;
    }, this['findBySid'] = function(c71) {
        for (var c72 = 0x0; c72 < this['list']['length']; ++c72)
            if (this['list'][c72]['sid'] === c71) return this['list'][c72];
        return null;
    };
};
