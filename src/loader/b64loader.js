"use strict";

// Convert a base64 string to an ArrayBuffer.
module.exports = function(A) {
    if (typeof window != "undefined" && typeof window.atob == "function") {
        var dec = window.atob(A);
    } else {
        var dec = Buffer.from(A, "base64").toString("binary");
    }
    var arr = new Uint8Array(dec.length);
    for (var i = 0; i < dec.length; i++) {
        arr[i] = dec.charCodeAt(i);
    }
    return arr.buffer;
}
