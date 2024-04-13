import {algo} from "../algorithms.ts";
import {required_files} from "./entities.ts";
import {engine} from "../engine.ts";
import {level, level_collide} from "./levels.ts";

// Set gravity, game, levels, player, and player collisions
algo.gravity = 20;
let main = new engine({z:4, w:320, h:240, load: required_files});
let lv = level(main);
let player = main.entity('pinoy', {y:195});
let menu = main.entity('menu');
let collides = level_collide(lv);
let king = main.entity('arrow');

player.collide = collides[0];
lv[0][4].follow = player;


// Level Scene
main.scene('level', (t, dt) => {
    if (dt > 100) return;
    //main.play('song/1st Temp BG Song (New Area).mp3');

    // Layers
    main.add(lv[0], player, menu, king);

    // Developer Tools
    if(main.on('x')) lv[0][0].darkmode = !lv[0][0].darkmode;
    main.on('z', e => {
        if(e.init) main.sprite_boxed = main.hitbox_boxed = main.rotate_boxed = !main.sprite_boxed;
    });
    main.on('h', e => {
        if(e.init) main.hitbox_boxed = !main.hitbox_boxed;
    });

    // Player Controls
    main.on('Enter', e => {
        if(e.init && player.swinging < 0.1) player.swing = true;
    });
    if(main.on('w, ,ArrowUp') && player.ground != -1) {
        player.m[1] = 20;
        /*player.crouch = player.jumping = true;
        player.m[0] = 0;*/
    } else if (main.on('s,ArrowDown')) {
        player.crouch = true;
        player.m[0] = 0;
    } else if (player.crouch) {
        player.crouch = player.jumping = false;
    } else if(main.on('d,ArrowRight')) player.m[0] = 8;
    else if(main.on('a,ArrowLeft')) player.m[0] = -8;
    else player.m[0] = 0;
});
main.render();