import {engine} from "./engine.ts";

let main = new engine({
    z:10, w:160, h:120
});
main.load('sprites.png');
main.scene('menu', (t, dt) => {
});
main.render();