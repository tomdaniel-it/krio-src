module['exports']['easing'] = {
    'linear': function(c2D) {
        return c2D;
    },
    'easeInQuad': function(c2D) {
        return c2D * c2D;
    },
    'easeOutQuad': function(c2D) {
        return c2D * (0x2 - c2D);
    },
    'easeInOutQuad': function(c2D) {
        return 0.5 > c2D ? 0x2 * c2D * c2D : (0x4 - 0x2 * c2D) * c2D - 0x1;
    },
    'easeInCubic': function(c2D) {
        return c2D * c2D * c2D;
    },
    'easeOutCubic': function(c2D) {
        return --c2D * c2D * c2D + 0x1;
    },
    'easeInOutCubic': function(c2D) {
        return 0.5 > c2D ? 0x4 * c2D * c2D * c2D : (c2D - 0x1) * (0x2 * c2D - 0x2) * (0x2 * c2D - 0x2) + 0x1;
    },
    'easeInQuart': function(c2D) {
        return c2D * c2D * c2D * c2D;
    },
    'easeOutQuart': function(c2D) {
        return 0x1 - --c2D * c2D * c2D * c2D;
    },
    'easeInOutQuart': function(c2D) {
        return 0.5 > c2D ? 0x8 * c2D * c2D * c2D * c2D : 0x1 - 0x8 * --c2D * c2D * c2D * c2D;
    },
    'easeInQuint': function(c2D) {
        return c2D * c2D * c2D * c2D * c2D;
    },
    'easeOutQuint': function(c2D) {
        return 0x1 + --c2D * c2D * c2D * c2D * c2D;
    },
    'easeInOutQuint': function(c2D) {
        return 0.5 > c2D ? 0x10 * c2D * c2D * c2D * c2D * c2D : 0x1 + 0x10 * --c2D * c2D * c2D * c2D * c2D;
    }
};