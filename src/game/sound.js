module.exports = function(cpa, cpb) {
    var cpe;
    this.sounds = [];
    this.listener = {};
    this.rate = 1;
    this.setVolume = function(cpa) {
        Howler.volume(cpa);
    };
    this.getSound = function(cpa, cpb) {
        var cpi = cpa + (cpb || '') + (window.activeHacker ? 'hckd' : '');
        (cpe = this.sounds[cpi]) || (cpe = new Howl({
            'src': '.././sound/' + (window.activeHacker ? 'fart_0' : cpa) + '.mp3'
        }), this.sounds[cpi] = cpe);
    };
    this.play = function(cpa, cpb, cpl, cpm) {
        if (this.getSound(cpa), this.rate && (!cpl || !cpe.isPlaying)) {
            cpe.isPlaying = !0x0;
            var cpn = cpe.play();
            cpe.volume(cpb || 0x1, cpn);
            cpe.loop(cpl, cpn);
            cpe.rate((cpm || 0x1) * this.rate, cpn);
        }
    };
    this.stop = function(cpa) {
        this.getSound(cpa);
        if (cpe) {
            cpe.isPlaying = false;
            cpe.stop();
        }
    };
    this.play3Dv = function(cpp, cpq, cpr, cps, cpt, cpu, cpv, cpw) {
        var cpx = 1 - cpa.getD3D(cpq, cpr, cps, cpw.x, cpw.y, cpw.z) / cpt;
        if (0.1 < cpx) {
            this.getSound(cpp, '3dv');
            var cpy = cpe.play();
            cpu = (cpu || 1) * cpx * cpb.otherSoundMlt;
            cpe.volume(cpu, cpy);
            cpe.rate(cpv || 1, cpy);
        }
    };
    this.play3D = function(cpa, cpA, cpB, cpC, cpD, cpE, cpF, cpG) {
        this.getSound(cpa, '3d');
        var cpH = cpe['play']();
        0.05 < (cpD = (cpD || 1) * cpb['otherSoundMlt']) && (cpe['volume'](cpD, cpH), cpe['rate'](cpE || 0x1, cpH), cpe['pos'](cpA, cpB, cpC, cpH), cpe['pannerAttr']({
            'refDistance': cpF || 0x19,
            'rolloffFactor': cpG || 0x1
        }, cpH));
    };
};
