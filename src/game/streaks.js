module['exports'] = [{
    'name': 'Nuke',
    'kills': 0x19,
    'activate': function(crZ, cs0) {
        return !crZ['nukeTimer'] && (crZ['incStat']('n', cs0), crZ['startNuke'](cs0), !0x0);
    }
}];