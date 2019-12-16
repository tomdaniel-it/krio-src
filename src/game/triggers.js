var bDw, bDx;
module['exports']['events'] = ['onShoot', 'onMelee', 'onDamage', 'onEnter', 'onDestroy', 'onRespawn'], module['exports']['actions'] = [{
    'name': 'Give Player Score',
    'execute': function(bDu, bDv, bDw, bDx) {
        bDu['players']['score'](bDw, bDx['triggerConstant'] || 0x1);
    }
}, {
    'name': 'Kill Player',
    'execute': function(bDu, bDv, bDw) {
        bDu['players']['kill'](bDw);
    }
}, {
    'name': 'Respawn Player',
    'execute': function(bDu, bDv, bDw) {
        var bDx = bDu['getSpawnPoint'](bDw['team'], bDw);
        bDw['x'] = bDx['x'], bDw['y'] = bDx['y'], bDw['z'] = bDx['z'];
    }
}, {
    'name': 'Change Player Health',
    'execute': function(bDu, bDv, bDw, bDx) {
        bDu['players']['changeHealth'](bDw, null, -(bDx['triggerConstant'] || 0x0), !0x0) && bDu['players']['kill'](bDw, null, {});
    }
}, {
    'name': 'Destroy Interface',
    'execute': function(bDu, bDv, bDw, bDQ) {
        for (var bDR = 0x0; bDR < bDu['map']['manager']['interfaces']['length']; ++bDR)(bDx = bDu['map']['manager']['objects'][bDu['map']['manager']['interfaces'][bDR]])['sid'] != bDQ['sid'] && bDx['health'] && bDx['interface'] != bDQ['interface'] && bDx['interface'] == bDQ['interfaceT'] && (bDx['active'] = !0x1, bDx['health'] = 0x0, bDx['destroyedBy'] = bDw, bDu['destObjs']['push'](bDx['uid']), bDv['broadcast']('game' + bDu['sid'], 'do', bDx['uid']), (bDx['onDestroy'] || bDx['onDamage']) && bDu['onTrigger'](bDw, bDx));
    }
}, {
    'name': 'Toggle Interface Gate',
    'execute': function(bDu, bDv, bDw, bDV) {
        for (var bDW = 0x0; bDW < bDu['map']['manager']['interfaces']['length']; ++bDW)(bDx = bDu['map']['manager']['objects'][bDu['map']['manager']['interfaces'][bDW]])['sid'] != bDV['sid'] && bDx['gate'] && bDx['interface'] != bDV['interface'] && bDx['interface'] == bDV['interfaceT'] && (bDx['active'] = !bDx['active'], bDv['broadcast']('game' + bDu['sid'], 'gte', bDx['uid'], bDx['active']));
    }
}, {
    'name': 'Change Interface Health',
    'execute': function(bDu, bDv, bDw, bE0) {
        for (var bE1 = 0x0; bE1 < bDu['map']['manager']['interfaces']['length']; ++bE1)(bDx = bDu['map']['manager']['objects'][bDu['map']['manager']['interfaces'][bE1]])['sid'] != bE0['sid'] && bDx['health'] && bDx['interface'] != bE0['interface'] && bDx['interface'] == bE0['interfaceT'] && (bDx['health'] -= -(bE0['triggerConstant'] || 0x0), 0x0 >= bDx['health'] && (bDx['active'] = !0x1, bDx['health'] = 0x0, bDx['destroyedBy'] = bDw, bDu['destObjs']['push'](bDx['uid']), bDv['broadcast']('game' + bDu['sid'], 'do', bDx['uid']), bDx && bDx['onDestroy'] && bDu['onTrigger'](bDw, bDx)), bDx && bDx['onDamage'] && bDu['onTrigger'](bDw, bDx));
    }
}, {
    'name': 'Teleport To Interface',
    'execute': function(bDu, bDv, bDw, bE5) {
        for (var bE6 = 0x0; bE6 < bDu['map']['manager']['interfaces']['length']; ++bE6)(bDx = bDu['map']['manager']['objects'][bDu['map']['manager']['interfaces'][bE6]])['sid'] != bE5['sid'] && bDx['interface'] != bE5['interface'] && bDx['interface'] == bE5['interfaceT'] && bDu['players']['changePosition'](bDw, bDx['x'], bDx['y'] - bDx['height'], bDx['z'], !0x0);
    }
}, {
    'name': 'Change Interface Deposit Box Amount',
    'execute': function(bDu, bDv, bDw, bEa) {
        for (var bEb = 0x0; bEb < bDu['map']['manager']['interfaces']['length']; ++bEb)(bDx = bDu['map']['manager']['objects'][bDu['map']['manager']['interfaces'][bEb]])['sid'] != bEa['sid'] && bDx['interface'] != bEa['interface'] && bDx['interface'] == bEa['interfaceT'] && bDx['bank'] && (bDx['deposited'] += bEa['triggerConstant'] || 0x0, bDv['broadcast']('game' + bDu['sid'], 'bnk', bDx['uid'], bDx['deposited']));
    }
}, {
    'name': 'Kill Opposing Team',
    'execute': function(bDu, bDv, bDx) {
        for (var bEf = 0x0; bEf < bDu['players']['list']['length']; ++bEf)(bDw = bDu['players']['list'][bEf])['active'] && bDw != bDx && (!bDw['team'] || bDx['team'] != bDw['team']) && bDu['players']['kill'](bDw, null, null, !0x0);
    }
}, {
    'name': 'Respawn Opposing Team',
    'execute': function(bDu, bDv, bDx) {
        for (var bEj = 0x0; bEj < bDu['players']['list']['length']; ++bEj)
            if ((bDw = bDu['players']['list'][bEj])['active'] && bDw != bDx && (!bDw['team'] || bDx['team'] != bDw['team'])) {
                var bEk = bDu['getSpawnPoint'](bDw['team'], bDw);
                bDw['x'] = bEk['x'], bDw['y'] = bEk['y'], bDw['z'] = bEk['z'];
            }
    }
}];