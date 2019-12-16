async function load() {
    if (typeof TextEncoder == "undefined" || typeof TextDecoder == "undefined") {
        return void gameError("Your browser is not supported.");
    }
    const bindings = require("./bindings.js");
    const code = require("./wasmcode.js");
    await bindings.default(code);
    await bindings.initiate();
}

load().catch(e => {
    console.error("Game loader error:", e)
    gameError("Failed to load game.");
})

function gameError(text) {
    instructionHolder.style.display = "block";
    instructionHolder.style.pointerEvents = "all";

    instructions.innerHTML = "<div style='color: rgba(255, 255, 255, 0.6)'>" + text + "</div><div style='margin-top:10px;font-size:20px;color:rgba(255,255,255,0.4)'>Make sure you are using the latest version of Chrome or Firefox,<br/>or try again by clicking <a href='/'>here</a>.</div>";
}
