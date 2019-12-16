var cs7 = ['Double Kill', 'Triple Kill', 'Quad Kill', 'Multi Kill', 'Mega Kill', 'Ultra Kill', 'Super Kill'],
    cs8 = [];
module['exports']['reward'] = function(cs5, cs6, csb, csc, csd) {
    cs8['length'] = 0x0;
    var cse = null == csc['weapon'] ? cs6['weapon'] : csc['weapon'];
    if (csd['mode']['weaponOrder']) cse['melee'] ? cs8['push']('Humiliation', null) : cs8['push']('Promotion', 0x1);
    else {
        0x1 >= csd['kills'] && cs8['push']('First Blood', 0x19), cse['melee'] ? cs8['push']('Execution', 0x96) : (cse['kill'] ? cs8['push'](cse['kill'][0x0], cse['kill'][0x1]) : cse['scope'] && 0x1 == cs6['aimVal'] ? cs8['push']('No Scope', 0x64) : !cse['scope'] || 0x0 == cs6['aimVal'] && 0xb4 < cs6['aimTime'] || 0x1 == cs6['aimDir'] ? cs8['push']('', 0x32) : cs8['push']('Quick Scope', 0x4b), cs5['getSpin'](cs6), csc['headShot'] && cs8['push']('Headshot', 0x32), csc['wallbang'] && cs8['push']('Wallbang', 0x19), !cse['scope'] && 0xc8 < csc['dst'] * cse['range'] && cs8['push']('Longshot', 0x19)), csb['flag'] && cs8['push']('Snatched', 0x32), cs6['health'] <= 0.2 * cs6['maxHealth'] && cs6['active'] && cs8['push']('Close Call', 0x14), 0x3 <= cs6['deathStreak'] && cs8['push']('Comeback', 0x19), 0xa <= csb['killStreak'] ? cs8['push']('Buzzkill', 0x19) : 0x5 <= csb['killStreak'] && cs8['push']('Buzzkill', 0xa), 0x0 < cs6['slideTimer'] && cs8['push']('Driftkill', 0x32), 0x190 <= cs6['airTime'] && cs8['push']('Mid Air', 0x19);
        for (var csf = cs7['length'] - 0x1; 0x0 <= csf; --csf)
            if (cs6['streak'] > csf) {
                cs8['push'](cs7[csf], 0x32 * (csf + 0x1));
                break;
            }
    }
    return cs8['length'] ? cs8 : null;
}, module['exports']['getScore'] = function(cs5) {
    var cs6 = null;
    if (cs5)
        for (var cs7 = 0x1; cs7 < cs5['length']; cs7 += 0x2) cs5[cs7] && (cs6 += cs5[cs7]);
    return cs6;
};