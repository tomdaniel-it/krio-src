# krio-src
Unpacked / partially reverse engineered code for krunker.io. May be buggy or broken, but I tested it and it seems to work.
This could be useful if you want to patch the game to add some kind of hack instead of injecting code.

## Building
    npm install
    npm run build
The compiled game is in `public`. You can run a server there. Note however that the domain needs to be `krunker.io` otherwise the official server will reject connections and the game will attempt to use beta servers (?).

## Notes
`src/loader` - the bindings for a wasm module that loads the game. This has code that generates tokens which are used when matchmaking / connecting to servers.
`src/game` - the main game code. A lot of it is not reversed fully (e.g. the file names are numbers, the contents have many chained assignments with comma operators, etc.)

Some information on the game:
The object `__LOADER__sharedObj`, the function `__LOADER__calcGameValidationCode`, the promise `__LOADER__mmValidationTokenPromise`, and the value `'###PVT###'` (replaced with an integer) are used to communicate between the game and the loader.
- `__LOADER__sharedObj`: allows the loader to send messages to the server via `obj.r()` (perhaps if it detects some kind of hack). Also has `obj.k` which is checked by the game and if set it sends a `rt` message to the server; this again could be if it detects hacks.
- `__LOADER__calcGameValidationCode`: Called with the socket object (in `proto/socket.js`), an integer sent by the server, and the `'###PVT###'` value (also an integer).
- `__LOADER__mmValidationTokenPromise`: Resolved to obtain a token used when matchmaking.

All of the `__LOADER__` values are replaced by the loader with random text strings and these are used as arguments to a function which the code is wrapped in and called.

The game itself is compiled and xored with 0xf7 (value might change?) and placed into `pkg/krnker.[build].vries`.

The protocol of the game is a messagepack object plus a null byte and a validation byte (`ahNum`) which is calculated with `((last_value + 0x409) & 0xff)`. The format of the messagepack object is `["name", ["arg1", "arg2"]]`. This is all sent over a websocket.
