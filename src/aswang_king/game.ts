import {algo} from "../algorithms.ts";
import {required_files} from "./entities.ts";
import {engine} from "../engine.ts";
import {level, level_collide} from "./levels.ts";

// Set gravity, game, levels, player, and player collisions
algo.gravity = 20;
let main = new engine({z:1, w:320, h:240, load: required_files, camera:[-160,0]});
main.dom.style.filter = 'contrast(1.1)';
let lv = level(main);
let player = main.entity('pinoy', {y:195});
let menu = main.entity('menu');
let collides = level_collide(lv);
let pet = main.entity('pet', {x:15,y:209,animal:0});
let king = main.entity('king');

pet.collide = player.collide = collides[0];
pet.follow = player;


// Level Scene
main.scene('level', (t, dt) => {
    if (dt > 100) return;
    //main.play('song/1st Temp BG Song (New Area).mp3');

    // Layers
    main.add(lv[0], pet, player, menu, king);

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
    if(main.on('w,W, ,ArrowUp') && player.ground != -1) {
        player.m[1] = 20;
    } else if (main.on('s,S,ArrowDown')) {
        player.crouch = true;
        player.m[0] = 0;
    } else if (player.crouch) {
        player.crouch = player.jumping = false;
    } else if(main.on('d,D,ArrowRight')) player.m[0] = 8;
    else if(main.on('a,A,ArrowLeft')) player.m[0] = -8;
    else player.m[0] = 0;
});
main.render();


main.filter = d => {
    var w = main.w*main.z;
    var h = main.h*main.z;
    var t = ((new Date()).getTime()-main.time_init.getTime())*10;
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var p = (x+y*w)*4;
            var o = 255-555*Math.max(Math.hypot(x-w/2, y-h/2)-7*w/20,0)/Math.min(w,h);
            if (y % 2 == 0) o *= (w*y/2+x-t)*0.000001%0.02 + 0.98;// ? 1 : 0.96;
            d.data[p+3] = Math.floor(o);
        }
    }
    return d;
}