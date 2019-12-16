var cVx = require("./92.js"),
    cVy = module['exports'];
cVy['active'] = true;
cVy['menu2'] = 'rcY';
var cVz = true;
cVy['isMobile'] = !0x1;
cVy['toggleMenu'] = function(cVu) {
    menuHolder['style']['display'] = cVu ? 'block' : 'none', speakerDisplay['style']['display'] = cVu ? 'none' : 'block', chatHolder['style']['bottom'] = (cVu ? 0x14 : 0x8c) + 'px', voiceDisplay['style']['bottom'] = (cVu ? 0x12 : 0x87) + 'px', supportMapCreator['style']['display'] = 'none', cVy['toggleMenuHider'](cVu), cVu && (endUI['style']['display'] = 'none', instructionHolder['style']['display'] = 'block', 'block' != windowHolder['style']['display'] && (baseLinks['style']['display'] = 'block')), cVy['active'] = !0x0;
};
cVy['hideUI'] = function() {
    cVy['toggleMenu'](!0x1), inGameUI['style']['display'] = 'none', overlay['style']['display'] = 'none', vignette['style']['display'] = 'none', spectateUI['style']['display'] = 'none', aimRecticle['style']['display'] = 'none', instructionHolder['style']['display'] = 'none', baseLinks['style']['display'] = 'none', chatHolder['style']['bottom'] = '20px', voiceDisplay['style']['bottom'] = '18px', speakerDisplay['style']['right'] = '20px', purchaseHolder['style']['display'] = 'none', consentBlock['style']['display'] = 'none', cVy['active'] = !0x1;
};
cVy['hideDiscon'] = function() {
    chatHolder['style']['display'] = 'none', voiceDisplay['style']['display'] = 'none', speakerDisplay['style']['display'] = 'none', purchaseHolder['style']['display'] = 'none';
};
cVy['showEndScreen'] = function() {
    endTable['style']['display'] = 'none', matchVoteHolder['style']['display'] = 'none', teamTotal0['style']['display'] = 'none', teamTotal1['style']['display'] = 'none', endUI['style']['display'] = null, cVy['hideUI']();
};
cVy['toggleWindow'] = function(cVu) {
    supportMapCreator['style']['display'] = 'none', windowHolder['style']['display'] = cVu ? 'block' : 'none', baseLinks['style']['display'] = cVu ? 'none' : 'block', cVy['updatePlayInstructions']();
};
cVy['toggleMenuHider'] = function(cVu) {
    menuHider['style']['display'] = cVu ? 'block' : 'none', uiBase['classList']['toggle']('onMenu', cVu), gameNameHolder['style']['display'] = cVu ? null : 'none', spectButton['style']['display'] = cVz && cVu ? null : 'none', supportMapCreator['style']['display'] = 'none', cVu && (spinUI['style']['display'] = 'none', respinUI['style']['display'] = 'none');
};
cVy['setShowSpect'] = function(cVu) {
    cVz = cVu, spectButton['style']['display'] = cVu ? null : 'none';
};
cVy['setShowSelTeam'] = function(cVu) {
    teamSelector['style']['display'] = cVu ? 'block' : 'none';
};
cVy['showError'] = function(cVu) {
    cVy['toggleMenu'](!0x0), instructions['innerHTML'] = cVu;
};
cVy['toggleGameUI'] = function(cVu) {
    var cVv = cVu && !window['spectating'];
    spectateUI['style']['display'] = window['spectating'] && cVu ? 'block' : 'none', window['spectating'] && (propInstruct['style']['display'] = 'none'), mobileUI['style']['display'] = cVu && cVy['isMobile'] ? 'block' : 'none', gameMessage['style']['display'] = cVv ? 'block' : 'none', topLeftHolder['style']['display'] = cVv ? 'block' : 'none', topRight['style']['display'] = cVu ? 'block' : 'none', reloadMsg['style']['display'] = cVv ? 'block' : 'none', bottomLeftHolder['style']['display'] = cVv ? 'block' : 'none', weaponDisplay['style']['display'] = cVv ? 'block' : 'none', bottomRight['style']['display'] = cVv ? 'block' : 'none', killCardHolder['style']['display'] = cVu ? 'none' : 'block', speakerDisplay['style']['right'] = (cVu ? 0x17c : 0x14) + 'px', chatHolder['style']['bottom'] = (cVv ? 0x8c : 0x14) + 'px', voiceDisplay['style']['bottom'] = (cVv ? 0x87 : 0x12) + 'px', overlay['style']['display'] = cVv ? 'block' : 'none', vignette['style']['display'] = cVv ? 'block' : 'none', uiBase['classList']['toggle']('onGame', cVu);
};
cVy['toggleControlUI'] = function(cVu) {
    window['loading'] && (cVu = !0x1), spectateUI['style']['display'] = window['spectating'] && cVu && !cVy['hideGameUI'] ? 'block' : 'none', inGameUI['style']['display'] = cVu && cVy['active'] && !cVy['hideGameUI'] ? 'block' : 'none', mobileUI['style']['display'] = cVu && cVy['active'] && cVy['isMobile'] ? 'block' : 'none', overlay['style']['display'] = cVu && cVy['active'] && !cVy['hideGameUI'] ? 'block' : 'none', vignette['style']['display'] = cVu && cVy['active'] && !cVy['hideGameUI'] ? 'block' : 'none', aimRecticle['style']['display'] = cVu && cVy['active'] ? 'block' : 'none', instructionHolder['style']['display'] = !cVu && cVy['active'] ? 'block' : 'none', aHolder['style']['display'] = cVu ? 'none' : 'block', toggleAd(!cVu), infoHolder['style']['display'] = cVu ? 'none' : null, chatHolder['style']['bottom'] = (cVu && !window['spectating'] && 'block' == bottomLeftHolder['style']['display'] ? 0x8c : 0x14) + 'px', voiceDisplay['style']['bottom'] = (cVu && !window['spectating'] && 'block' == bottomLeftHolder['style']['display'] ? 0x87 : 0x12) + 'px', speakerDisplay['style']['display'] = cVu && cVy['active'] ? 'block' : 'none', endUI['style']['display'] && (menuHolder['style']['display'] = cVu ? 'none' : 'block', cVy['toggleMenuHider'](!cVu));
};
cVy['updateCrosshair'] = function(cVu, cVv) {
    cVx['crosshairOpacity'] = cVv, cVx['crosshairScale'] = cVu;
};
