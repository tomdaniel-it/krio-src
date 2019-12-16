(function(bdX) {
    module['exports']['isNode'] = void 0x0 !== bdX && void 0x0 !== bdX['release'] && -0x1 !== bdX['release']['name']['search'](/node|io.js/);
    module['exports']['isProd'] = module['exports']['isNode'] ? !!bdX['env']['IS_PROD'] : '127.0.0.1' !== location['hostname'] && 'localhost' !== location['hostname'] && !location['hostname']['startsWith']('192.168.');
    module['exports']['enableHttps'] = module['exports']['isProd'] || !module['exports']['isNode'] && 'true' == localStorage['__FORCE_HTTPS__'];
    module['exports']['serverTickRate'] = 0x3e8 / 0x1e;
    module['exports']['serverSendRate'] = 0x64;
    module['exports']['clientSendRate'] = 0x3e8 / 0x1e;
    module['exports']['dltMx'] = Math['round'](0x3e8 / 0x1e);
    module['exports']['streamUpdate'] = 0x2710;
    module['exports']['maxPlayers'] = 0x8;
    module['exports']['serverSpread'] = 0x3;
    module['exports']['minServerSpace'] = 0x3;
    module['exports']['gamesPerServer'] = 0x3;
    module['exports']['serverBrowserRate'] = 0x2710;
    module['exports']['maxPlayersTotal'] = module['exports']['maxPlayers'] * module['exports']['gamesPerServer'] + 0x28;
    module['exports']['kickTimer'] = 0x15f90;
    if (module.exports.isNode) {
        module.exports.matchmakerURL = module.exports.isProd ?
            ('krunker_prod' == bdX.env.VULTR_SCHEME ? 'https://matchmaker.krunker.io' : 'https://matchmaker_beta.krunker.io')
            : 'http://127.0.0.1:5050';
        module.exports.apiURL = module.exports.isProd ?
            ('krunker_prod' == bdX.env.VULTR_SCHEME || 'krunker_social' == bdX.env.VULTR_SCHEME ? 'https://api.krunker.io' : 'https://api_beta.krunker.io')
            : 'http://127.0.0.1:5060';
    } else {
        module.exports.matchmakerURL = module.exports.isProd ?
            ('krunker.io' == location.hostname ? 'https://matchmaker.krunker.io' : 'https://matchmaker_beta.krunker.io')
            : localStorage.__MM_URL__ || 'http://127.0.0.1:5050';
        module.exports.apiURL = module.exports.isProd ?
            ('krunker.io' == location.hostname ? 'https://api.krunker.io' : 'https://api_beta.krunker.io')
            : localStorage.__API_URL__ || 'http://127.0.0.1:5060';
    }
    module['exports']['needsRestart'] = !0x1;
    module['exports']['useLooseClient'] = !0x1;
    module['exports']['currentSeason'] = 0x1;
    module['exports']['rewardTime'] = 0x1499700;
    module['exports']['rewardMinLvl'] = 0xf;
    module['exports']['regionIND'] = {
        'sgp': 0x2,
        'jb-hnd': 0x2,
        'us-nj': 0x4,
        'us-fl': 0x4,
        'us-ca-sv': 0x4,
        'au-syd': 0x1,
        'de-fra': 0x3
    }, module['exports']['compRegions'] = [{
        'name': 'EU',
        'icon': 'eu',
        'data': [{
            'name': 'KRUNKEUR',
            'prize': 0x578,
            'roster': ['VoKUS', 'ronics', 'AlexDoubleU', 'Nitrahh']
        }, {
            'name': 'UUED GUMMID',
            'prize': 0x258,
            'roster': ['kiiturii', 'WasabiS', 'xXNONUTTERXx', 'BLNCR']
        }, {
            'name': 'Nine',
            'prize': 0x0,
            'roster': ['Chupacabra', 'The_Zionist', 'Tatsuu', 'ZR1']
        }, {
            'name': 'DOOM',
            'prize': 0x0,
            'roster': ['Viiper', 'Jbusom', 'Tahha', 'kari:D']
        }, {
            'name': 'OxicPoonTang',
            'prize': 0x0,
            'roster': ['cato818', 'Amuu123', 'Darebydare', 'Fortysevens']
        }]
    }, {
        'name': 'NA',
        'icon': 'na',
        'data': [{
            'name': 'nV',
            'prize': 0x578,
            'roster': ['RandomExport', 'Rickabonkers', 'Kouka', 'TaylorFerguson']
        }, {
            'name': 'BAKA',
            'prize': 0x258,
            'roster': ['4tapp', 'Gxngu', '魔42', 'Friendlies']
        }, {
            'name': 'Krunky Boys',
            'prize': 0x0,
            'roster': ['bububoosh', 'GGkns', 'chazzychaz', 'ev0xge0']
        }, {
            'name': 'RIP Theta',
            'prize': 0x0,
            'roster': ['UB_Caboose', 'Applechase', 'Predixtions', 'Visuall']
        }, {
            'name': 'Nine NA',
            'prize': 0x0,
            'roster': ['Aoqii', 'Keyown', 'TristanTu', 'Byto']
        }]
    }, {
        'name': 'OCE',
        'icon': 'oce',
        'data': [{
            'name': 'Lore',
            'prize': 0x578,
            'roster': ['Mosswi', 'Agent_Chicken', 'Stazza', 'ShiraishiEZ']
        }, {
            'name': 'Omen',
            'prize': 0x258,
            'roster': ['Equinoxian', 'iiBazza', 'vEternity', 'Equaus']
        }, {
            'name': 'Tokgang',
            'prize': 0x0,
            'roster': ['caL_Tv', 'gymgoer31', 'maxmillion', 'peepoglad']
        }, {
            'name': 'Lore v2',
            'prize': 0x0,
            'roster': ['ZaneAU', 'JamemesG', 'riderrr', '*Void']
        }, {
            'name': 'EXLE',
            'prize': 0x0,
            'roster': ['Tatti123', 'Kurocchi', 'F24CTAL', '-Gaze']
        }]
    }], module['exports']['eloK'] = 0x20, module['exports']['queues'] = [{
        'id': 'r1v1',
        'name': 'windows.ranked.mode.r1v1',
        'key': 'elo'
    }, {
        'id': 'r2v2',
        'name': 'windows.ranked.mode.r2v2',
        'defaultQueue': !0x0,
        'key': 'elo2'
    }, {
        'id': 'r4v4',
        'name': 'windows.ranked.mode.r4v4',
        'key': 'elo4'
    }], module['exports']['minRankedLevel'] = 0x14, module['exports']['rankedCooldown'] = 0x36ee80, module['exports']['endTimer'] = 0x61a8, module['exports']['endAnim'] = 0x1388, module['exports']['voteKickReq'] = 0x4, module['exports']['voteKickMaxLvl'] = 0xa, module['exports']['voteKickTimer'] = 0x88b8, module['exports']['thrdPZ'] = 0xe, module['exports']['thrdPX'] = 0x5, module['exports']['serverConfig'] = [{
        'name': 'Players',
        'varN': 'maxPlayers',
        'def': 0x2,
        'max': 0xa,
        'maxF': 0x10,
        'min': 0x1,
        'step': 0x1
    }, {
        'name': 'Min Players',
        'varN': 'minPlayers',
        'def': 0x0,
        'max': 0xa,
        'maxF': 0x10,
        'min': 0x0,
        'step': 0x1
    }, {
        'name': 'Lives',
        'varN': 'lives',
        'def': 0x0,
        'max': 0xa,
        'min': 0x0,
        'step': 0x1
    }, {
        'name': 'Minutes',
        'varN': 'gameTime',
        'def': 0x4,
        'max': 0x3c,
        'min': 0x0,
        'step': 0x1
    }, {
        'name': 'Warmup',
        'varN': 'warmupTime',
        'def': 0x0,
        'max': 0x4,
        'min': 0x0,
        'step': 0.1
    }, {
        'name': 'Score Limit',
        'varN': 'scoreLimit',
        'def': 0x0,
        'max': 0x2710,
        'min': 0x0,
        'step': 0x64
    }, {
        'name': 'Gravity',
        'varN': 'gravMlt',
        'dontChange': !0x0,
        'def': 0x1,
        'max': 0x2,
        'min': 0.1,
        'step': 0.1
    }, {
        'name': 'Jump Force',
        'varN': 'jumpMlt',
        'dontChange': !0x0,
        'def': 0x1,
        'max': 0x3,
        'min': 0.1,
        'step': 0.1
    }, {
        'name': 'Hitbox Scale',
        'varN': 'hitBoxPad',
        'dontChange': !0x0,
        'def': 0x1,
        'max': 0x1,
        'min': 0x0,
        'step': 0.1
    }, {
        'name': 'Time Scale',
        'varN': 'deltaMlt',
        'dontChange': !0x0,
        'def': 0x1,
        'max': 1.5,
        'min': 0.1,
        'step': 0.1
    }, {
        'name': 'Strafe Speed',
        'varN': 'strafeSpd',
        'dontChange': !0x0,
        'def': 1.2,
        'max': 0x2,
        'min': 0x1,
        'step': 0.1
    }, {
        'name': 'Health Multiplier',
        'varN': 'healthMlt',
        'dontChange': !0x0,
        'def': 0x1,
        'max': 0x3,
        'min': 0.1,
        'step': 0.1
    }, {
        'name': 'Weapon Impulse',
        'varN': 'impulseMlt',
        'dontChange': !0x0,
        'def': 0x1,
        'max': 0x3,
        'min': 0x0,
        'step': 0.1
    }, {
        'name': 'Team 1 Name',
        'varN': 'nameTeam1',
        'def': 'Team 1',
        'hideE': !0x0,
        'input': !0x0
    }, {
        'name': 'Team 2 Name',
        'varN': 'nameTeam2',
        'def': 'Team 2',
        'hideE': !0x0,
        'input': !0x0
    }, {
        'name': 'Select Team',
        'varN': 'selTeam',
        'def': !0x1,
        'bool': !0x0
    }, {
        'name': 'Spectating',
        'varN': 'allowSpect',
        'def': !0x0,
        'bool': !0x0
    }, {
        'name': 'Kill Rewards',
        'varN': 'killRewards',
        'dontChange': !0x0,
        'def': !0x0,
        'bool': !0x0
    }, {
        'name': 'Headshots Only',
        'varN': 'headshotOnly',
        'dontChange': !0x0,
        'def': !0x1,
        'bool': !0x0
    }, {
        'name': 'No Secondaries',
        'varN': 'noSecondary',
        'dontChange': !0x0,
        'def': !0x1,
        'bool': !0x0
    }, {
        'name': 'Disable Streaks',
        'varN': 'noStreaks',
        'dontChange': !0x0,
        'def': !0x1,
        'bool': !0x0
    }, {
        'name': 'Sliding',
        'varN': 'canSlide',
        'def': !0x0,
        'bool': !0x0
    }, {
        'name': 'Auto Jump',
        'varN': 'autoJump',
        'def': !0x1,
        'bool': !0x0
    }, {
        'name': '3rd Person',
        'varN': 'thirdPerson',
        'def': !0x1,
        'bool': !0x0
    }, {
        'name': 'Hide Nametags',
        'varN': 'nameTags',
        'def': !0x1,
        'bool': !0x0
    }], module['exports']['prefabIDS'] = ['CUBE', 'CRATE', 'BARREL', 'LADDER', 'PLANE', 'SPAWN_POINT', 'CAMERA_POSITION', 'VEHICLE', 'STACK', 'RAMP', 'SCORE_ZONE', 'BILLBOARD', 'DEATH_ZONE', 'PARTICLES', 'OBJECTIVE', 'TREE', 'CONE', 'CONTAINER', 'GRASS', 'CONTAINERR', 'ACIDBARREL', 'DOOR', 'WINDOW', 'FLAG', 'GATE', 'CHECK_POINT', 'WEAPON_PICKUP', 'TELEPORTER', 'TEDDY', 'TRIGGER', 'SIGN', 'DEPOSIT_BOX', 'LIGHT_CONE'], module['exports']['textureIDS'] = ['WALL', 'DIRT', 'FLOOR', 'GRID', 'GREY', 'DEFAULT', 'ROOF', 'FLAG', 'GRASS', 'CHECK', 'LINES', 'BRICK', 'LINK'], module['exports']['objectLimit'] = 0xdac, module['exports']['objectLimitF'] = 0x1770, module['exports']['spawnLimit'] = 0x14, module['exports']['billboardCnt'] = 0x5, module['exports']['signLimit'] = 0x14, module['exports']['signTextLimit'] = 0x5dc, module['exports']['signFontMax'] = 0x78, module['exports']['signFontMin'] = 0xa, module['exports']['followURLS'] = ['https://www.instagram.com/sidney.devries/', 'https://www.instagram.com/sidney.devries/', 'https://www.instagram.com/sidney.devries/', 'https://www.instagram.com/sidney.devries/', 'https://www.instagram.com/sidney.devries/', 'https://www.instagram.com/sidney.devries/', 'https://www.instagram.com/vincent.de.vries/'], module['exports']['gravity'] = 0.00015, module['exports']['deathY'] = -0x64, module['exports']['skyScale'] = 0x4650, module['exports']['shadowDst'] = 0x4b0, module['exports']['shadowRes'] = 0x400, module['exports']['shadowOff'] = 0.004, module['exports']['lightDistance'] = 0x1f4, module['exports']['cornerPad'] = 0x1, module['exports']['cornerScl'] = 2.5, module['exports']['cornerH'] = 0x7, module['exports']['wallH'] = 0x5, module['exports']['wallW'] = 0.8, module['exports']['propsH'] = ['crate', 'barrel', 'cone', 'stack', 'acidbarrel', 'teddy'], module['exports']['propsCPY'] = {
        'teddy': -0x3
    }, module['exports']['propsCP'] = {
        'barrel': -0x1,
        'teddy': -3.6,
        'cone': -0x2
    }, module['exports']['crateScale'] = 0x6, module['exports']['stackScale'] = 0x6, module['exports']['teddyScale'] = 0x6, module['exports']['barrelScale'] = 0x4, module['exports']['acidbarrelScale'] = module['exports']['barrelScale'], module['exports']['treeScale'] = 0xa, module['exports']['doorScale'] = 0x5, module['exports']['windowScale'] = 0x6, module['exports']['coneScale'] = 0x4, module['exports']['containerScale'] = 0x7, module['exports']['containerrScale'] = module['exports']['containerScale'], module['exports']['grassScale'] = 0x20, module['exports']['vehicleScale'] = 0x14, module['exports']['barrelMlt'] = 0x1, module['exports']['ladderWidth'] = 3.2, module['exports']['ladderScale'] = 0.5, module['exports']['terrainGrid'] = 0x8, module['exports']['maxTerrainS'] = 0xfa0, module['exports']['otherSoundMlt'] = 0.55, module['exports']['maxParticles'] = 0x64, module['exports']['explosionRange'] = 0xc8, module['exports']['particleDist'] = 0x28, module['exports']['chatMaxLength'] = 0x46, module['exports']['chatInterval'] = 0x320, module['exports']['voiceChatInterval'] = 0x7d0, module['exports']['voiceChatMaxLength'] = 0.65, module['exports']['voiceRate'] = 0x1f4, module['exports']['voiceDelay'] = 0xc8, module['exports']['movDirs'] = [];
    for (var bdY = 0x0; 0x8 > bdY; ++bdY) module['exports']['movDirs']['push'](-Math['PI'] + (bdY + 0x1) * Math['PI'] / 0x4);
    module['exports']['interpolation'] = 1.1, module['exports']['stateHistory'] = 0x3e8, module['exports']['syncFreq'] = 0x3e8, module['exports']['pingCount'] = 0xa, module['exports']['mouseSens'] = 0.0024, module['exports']['camChaseTrn'] = 0.0022, module['exports']['camChaseSpd'] = 0.0012, module['exports']['camChaseSen'] = 0.2, module['exports']['camChaseDst'] = 0x18, module['exports']['specMinD'] = 0xa, module['exports']['specMaxD'] = 0xa0, module['exports']['menuCamDist'] = 0xc8, module['exports']['menuCamAngle'] = -0.5, module['exports']['menuCamSpeed'] = 0.1, module['exports']['idleAnimS'] = 0.0015, module['exports']['animMult'] = 1.2, module['exports']['leanPull'] = 0.99, module['exports']['leanSens'] = 0.05, module['exports']['leanMax'] = 0.16, module['exports']['leanPullZ'] = 0.99, module['exports']['leanMltZ'] = 0.03, module['exports']['bobMltY'] = 0.024, module['exports']['bobMltZ'] = 0.02, module['exports']['bobPullY'] = 0.985, module['exports']['bobPullZ'] = 0.99, module['exports']['landPull'] = 0.994, module['exports']['landPullV'] = 0.985, module['exports']['landOff'] = 0.15, module['exports']['aimAnimMlt'] = 0.18, module['exports']['aimSlow'] = 0.55, module['exports']['aimJumpSlow'] = 0.85, module['exports']['stepAnim'] = 0.075, module['exports']['stepMlt'] = 0.25, module['exports']['stepPull'] = 0.995, module['exports']['hpSegments'] = 0x7, module['exports']['maxHealth'] = 0x64, module['exports']['passiveInc'] = 0x1f4, module['exports']['cameraHeight'] = 1.5, module['exports']['playerSpeed'] = 0.00042, module['exports']['slippingSpeed'] = 0.0003, module['exports']['ladderSpeed'] = 0.035, module['exports']['ladderDecel'] = 0.97, module['exports']['slideDecel'] = 0.999, module['exports']['slideTime'] = 0x15e, module['exports']['terrainSlideDecel'] = 0.9996, module['exports']['groundDecel'] = 0.99, module['exports']['terrainDecel'] = 0.99, module['exports']['terrainSlipDecel'] = 0.99, module['exports']['airSpeed'] = 0.000047, module['exports']['airDecel'] = 0.9996, module['exports']['jumpVel'] = 0.072, module['exports']['jumpPush'] = 0.1, module['exports']['decelMin'] = 0.0001, module['exports']['climbHeight'] = 0x3, module['exports']['wpnSpin'] = 0.018, module['exports']['terrainSlideThreshold'] = 1.2, module['exports']['terrainGravityMlt'] = 1.85, module['exports']['playerSlideVelMlt'] = 1.2, module['exports']['playerTerrainSlideVelMlt'] = 0.4, module['exports']['playerSlippingJumpCooldown'] = 0x1f4, module['exports']['materialDens'] = {
        'flesh': 0.2,
        'default': 0.5
    }, module['exports']['nameOffset'] = 0.6, module['exports']['nameOffsetHat'] = 0.8, module['exports']['maxNameLength'] = 0xe, module['exports']['maxPassLength'] = 0x10, module['exports']['ahnMyEEY'] = 0xb, module['exports']['chestWidth'] = 2.6, module['exports']['chestScale'] = 1.3, module['exports']['armScale'] = 1.3, module['exports']['legScale'] = 1.3, module['exports']['uArmLength'] = 2.7, module['exports']['armInset'] = -0.1, module['exports']['lArmLength'] = 2.7, module['exports']['headScale'] = 0x2, module['exports']['armOff'] = -0.8, module['exports']['legHeight'] = 4.2, module['exports']['ByVdmGMS'] = (0x2 * module['exports']['armScale'] + module['exports']['chestWidth'] + module['exports']['armInset']) / 0x2, module['exports']['hitBoxPad'] = 0x1, module['exports']['tracerMinDst'] = 0x14, module['exports']['tracerMaxDst'] = 0x1f4, module['exports']['tracerChance'] = 0x1, module['exports']['crouchLean'] = -0.1 * Math['PI'], module['exports']['crouchDst'] = 0x3, module['exports']['crouchSlow'] = 0.3, module['exports']['crouchSpeed'] = 0.007, module['exports']['crouchJump'] = 0.25, module['exports']['crouchSpread'] = 0.55, module['exports']['crouchAnim'] = 0.0008, module['exports']['crouchAnimMlt'] = 0.5, module['exports']['spreadMove'] = 0x19, module['exports']['spreadFall'] = 0x1e, module['exports']['spreadRecover'] = 0.985, module['exports']['spreadAdj'] = 0.00063, module['exports']['spreadMlt'] = 0xf0, module['exports']['recoilMlt'] = 0.3, module['exports']['flagMsg'] = 'You have the Flag', module['exports']['flagMsgE'] = 'Enemy has your Flag', module['exports']['flagMsgRC'] = 'Enemy has your Flag', module['exports']['flagZoneS'] = 0x18, module['exports']['flagZoneH'] = 0x24, module['exports']['flagScale'] = 0xc, module['exports']['flagOff'] = 0x6, module['exports']['flagHOff'] = 0xf, module['exports']['interactTimer'] = 0x64, module['exports']['pickupZoneX'] = 0xc, module['exports']['pickupZoneZ'] = 0x4, module['exports']['pickupZoneH'] = 0x2, module['exports']['pickupScale'] = 0x6, module['exports']['pickupOff'] = 0x1, module['exports']['maxLevel'] = 0x66, module['exports']['maxELOLevel'] = 0x8, module['exports']['assistTime'] = 0x1388, module['exports']['assistScore'] = 0x19, module['exports']['assistMin'] = 0x14, module['exports']['medalAnim'] = 0x3e8, module['exports']['medalDelay'] = 0x384, module['exports']['scoreStreak'] = 0x7d0, module['exports']['feedTimer'] = 0x7d0, module['exports']['spinTimer'] = 0x708, module['exports']['endStats'] = ['sid', 'name', 'score', 'kills', 'deaths', 'reward'], module['exports']['endForm'] = {
        'reward': function(bdW) {
            return bdW ? '<span style=\'color:#F8C55C\'>+' + bdW + '</span> KR' : 'NONE';
        },
        'ELO': function(bdW, bdX, bdY) {
            return '<span style=\'color:#F8C55C\'><span style=\'color:rgba(255, 255, 255, 0.7);\'>' + bdY['account'][bdX['queueConfig']['accountKey']]['round'](0x1) + '</span> ' + (0x0 <= bdY['ELO'] ? '+' : '-') + Math['abs'](bdY['ELO']['round'](0x1)) + '</span>';
        },
        'time': function(bdW, bdX, bdY) {
            return bdY['timer'] || 'DNF';
        },
        'infected': function(bdW, bdX, bdY) {
            return bdY['convs'];
        },
        'found': function(bdW, bdX, bdY) {
            return bdY['convs'];
        },
        'weapon': function(bdW, bdX, bdY) {
            return bdY['weaponTier'];
        }
    }, module['exports']['hitLife'] = 0x7d0, module['exports']['regenDelay'] = 0x1388, module['exports']['regenVal'] = 0.1, module['exports']['sprayTimer'] = 0x3e8, module['exports']['sprayRange'] = 0x19, module['exports']['sprayScale'] = 0xf, module['exports']['deathDelay'] = 0xaf0, module['exports']['deathFollowD'] = 0x64, module['exports']['suicides'] = ['uninstall life', 'toaster bath', 'alt f4', 'not alive', 'neck rope', 'scooter ankle', 'death.exe'], module['exports']['taunts'] = [{
        'id': 'taunt_0',
        'tm': 0x1f4
    }, {
        'id': 'taunt_1',
        'tm': 0x3e8
    }, {
        'id': 'taunt_2',
        'tm': 0x8fc
    }, {
        'id': 'taunt_3',
        'tm': 0xc80
    }], module['exports']['fov'] = 0x46, module['exports']['viewDist'] = 0x7d0, module['exports']['nameVisRate'] = 0xc8, module['exports']['worldUV'] = 0x3c, module['exports']['ambientVal'] = 0.5, module['exports']['ambD'] = 0x2, module['exports']['ambMlt'] = 0xf, module['exports']['ambOff'] = 0.09, module['exports']['ambScale'] = 0xa, module['exports']['ambDiv'] = 0x14, module['exports']['ambSFactor'] = 0x1, module['exports']['ambBleed'] = 0x0, module['exports']['boosterSpd'] = 0.002, module['exports']['borderH'] = 0x3e8, module['exports']['soundScapes'] = {
        'Default': 0x1,
        'City': 0x2,
        'Desert': 0x3,
        'Market': 0x4,
        'Scary': 0x5
    }, module['exports']['mapTabs'] = [{
        'n': 'Popular',
        'cache': !0x0,
        'c': 0x1b,
        't': 'recent'
    }, {
        'n': 'New',
        'cache': !0x0,
        'c': 0x1b,
        't': 'initialdate'
    }, {
        'n': 'My Maps',
        'c': 0x1b,
        'sendID': !0x0,
        't': 'votes'
    }, {
        'n': 'Search',
        'search': !0x0,
        't': 'votes'
    }], module['exports']['modTabs'] = [{
        'n': 'Hot',
        'cache': !0x0,
        'c': 0x1b,
        't': 'recent'
    }, {
        'n': 'New',
        'cache': !0x0,
        'c': 0x1b,
        't': 'initialdate'
    }, {
        'n': 'My Mods',
        'c': 0x1b,
        'sendID': !0x0,
        't': 'votes'
    }, {
        'n': 'Search',
        'search': !0x0,
        't': 'votes'
    }], module['exports']['saleMax'] = 0x989680, module['exports']['saleGrace'] = 0x493e0, module['exports']['marketMinLVl'] = 0x14, module['exports']['giftMax'] = 0x989680, module['exports']['giftMin'] = 0xa, module['exports']['giftMinLVl'] = 0x1e, module['exports']['verClans'] = ['DEV', 'FaZe', 'Lore', 'nV', 'Oxic', 'Verb', 'Omen', 'ロリ幼女', 'VOID', 'JBP', 'PHIL', 'TIMP', '24/7', 'g59', 'GLXY', 'MMOK', 'ODTY'], module['exports']['rankVar'] = 0.03, module['exports']['eloPer'] = 0x50, module['exports']['newDataInterval'] = 0x1d4c0, module['exports']['socials'] = ['leaders', 'profile', 'maps', 'tourney', 'market', 'itemsales', 'clan'], module['exports']['marketQueries'] = {
        'market': {
            'btn': 'Info',
            'checkItem': function(bdW) {
                return !!bdW['funds'];
            }
        },
        'inventory': {
            'btn': 'List to Sell',
            'checkItem': function(bdW) {
                return !bdW['funds'] && bdW['cnt'];
            }
        },
        'sales': {
            'btn': 'Unlist',
            'checkItem': function(bdW) {
                return !!bdW['funds'];
            }
        }
    }, module['exports']['leaderQueries'] = ['player_score', 'player_elo', 'player_elo2', 'player_elo4', 'player_kills', 'player_wins', 'player_timeplayed', 'player_funds', 'player_clan'], module['exports']['leaderCal'] = {
        'player_score': function(bdX) {
            var bdY = Math['max'](0x1, Math['floor'](module['exports']['rankVar'] * Math['sqrt'](bdX)));
            return '<span class=\'floatR\'><img src=\'./img/levels/' + Math['max'](Math['min'](module['exports']['maxLevel'] - 0x1, bdY['roundToNearest'](0x2) - 0x1), 0x0) + '.png\' class=\'rnkIcon\'>' + bdY + '</span>';
        },
        'player_elo': function(bdX) {
            return '<span class=\'floatR\'><img src=\'./img/ranks/icon_' + Math['max'](Math['min'](module['exports']['maxELOLevel'], Math['floor']((bdX || 0x0) / module['exports']['eloPer'])), 0x0) + '.png\' class=\'rnkIconR\'>' + (bdX || 0x0) + '</span>';
        },
        'player_elo2': function(bdX) {
            return '<span class=\'floatR\'><img src=\'./img/ranks/icon_' + Math['max'](Math['min'](module['exports']['maxELOLevel'], Math['floor']((bdX || 0x0) / module['exports']['eloPer'])), 0x0) + '.png\' class=\'rnkIconR\'>' + (bdX || 0x0) + '</span>';
        },
        'player_elo4': function(bdX) {
            return '<span class=\'floatR\'><img src=\'./img/ranks/icon_' + Math['max'](Math['min'](module['exports']['maxELOLevel'], Math['floor']((bdX || 0x0) / module['exports']['eloPer'])), 0x0) + '.png\' class=\'rnkIconR\'>' + (bdX || 0x0) + '</span>';
        },
        'player_kills': function(bdW) {
            return bdW + '<span class=\'lName\'> kills</span>';
        },
        'player_wins': function(bdW) {
            return bdW + '<span class=\'lName\'> wins</span>';
        },
        'player_funds': function(bdW) {
            return '<span style=\'color:rgba(0,0,0,0.4)\'>' + bdW['toString']()['replace'](/\B(?=(\d{3})+(?!\d))/g, ',') + '</span> KR';
        },
        'player_timeplayed': function(bdW) {
            var bdX = bdW / 0x3e8 / 0x3c,
                bdY = parseInt(bdX % 0x3c);
            bdX /= 0x3c;
            var bev = parseInt(bdX % 0x18);
            bdX /= 0x18;
            var bew = parseInt(bdX);
            return (bew ? bew + 'd ' : '') + (bev ? bev + 'h ' : '') + (bdY || 0x0) + 'm ';
        }
    }, module['exports']['socialRegions'] = ['All Regions', 'Oceania', 'Asia', 'Europe', 'Americas'], module['exports']['regionGroups'] = [{
        'name': 'Oceania',
        'regions': ['au-syd', 'sgp']
    }, {
        'name': 'Asia',
        'regions': ['jb-hnd']
    }, {
        'name': 'Europe',
        'regions': ['nl-ams', 'gb-lon', 'de-fra', 'fr-par']
    }, {
        'name': 'Americas',
        'regions': ['us-nj', 'us-il', 'us-tx', 'us-wa', 'us-ca-la', 'us-ga', 'us-ca-sv', 'us-fl']
    }], module['exports']['regionNames'] = {
        'local': 'Local',
        'us-nj': 'New York',
        'us-il': 'Chicago',
        'us-tx': 'Dallas',
        'us-wa': 'Seattle',
        'us-ca-la': 'Los Angeles',
        'us-ga': 'Atlanta',
        'nl-ams': 'Amsterdam',
        'gb-lon': 'London',
        'de-fra': 'Frankfurt',
        'us-ca-sv': 'Silicon Valley',
        'au-syd': 'Sydney',
        'fr-par': 'Paris',
        'jb-hnd': 'Tokyo',
        'us-fl': 'Miami',
        'sgp': 'Singapore'
    }, module['exports']['langNames'] = {
        'en': 'English',
        'es': 'Spanish',
        'de': 'German',
        'kr': 'Korean'
    }, module['exports']['skinColors'] = [0x805c4a, 0xa77860, 0xd38d6f, 0xcc997e, 0xedbfa6], module['exports']['customRatios'] = ['Native', '800x600', '1024x768', '1280x960', '1280x1024', '1440x1080', '1656x1080'], module['exports']['reportOptions'] = ['Hacking', 'Exploiting', 'Market Manipulation', 'Harassment', 'Other'];
} ['call'](this, require("process")));
