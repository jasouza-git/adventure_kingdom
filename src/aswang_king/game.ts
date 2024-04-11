import {algo} from "../algorithms.ts";
import {required_files} from "./entities.ts";
import {engine} from "../engine.ts";
import {level} from "./levels.ts";

// Set gravity, game, levels, player, and player collisions
algo.gravity = 20;
let main = new engine({z:4, w:320, h:240, load: required_files});
let lv = level(main);
let player = main.entity('pinoy');
player.collide = [...lv[0].slice(1)];

// Level Scene
main.scene('main', (t, dt) => {
    main.add(lv[0], player);

    if(main.on('x')) lv[0][0].darkmode = !lv[0][0].darkmode;
    main.on('z', e => {
        if(e.init) main.sprite_boxed = main.hitbox_boxed = main.rotate_boxed = !main.sprite_boxed;
    });

    if(main.on('w, ,ArrowUp') && player.ground) {
        player.crouch = true;
        player.m[0] = 0;
    } else if (player.crouch) {
        player.m[1] = 20;
        player.crouch = false;
    }
    
    else if(main.on('d,ArrowRight')) player.m[0] = 8;
    else if(main.on('a,ArrowLeft')) player.m[0] = -8;
    else player.m[0] = 0;
});
main.render();