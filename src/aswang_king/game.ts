import {algo} from "../algorithms.ts";
import {required_files} from "./entities.ts";
import {engine} from "../engine.ts";
import {level} from "./levels.ts";

// Set gravity, game, levels, player, and player collisions
algo.gravity = 20;
let main = new engine({z:1, w:320, h:240, load: required_files, camera:[-160,0]});
main.dom.style.filter = 'contrast(1.1)';
let lv = level(main);
let bg = main.entity('background', {house:true});
let player = main.entity('pinoy', {x: 16000, y:195});
main.player = player;
let menu = main.entity('menu');
let pet = main.entity('pet', {x:15, y:209, animal:0, follow:player});
let off = 0;

// Level Scene
main.scene('level', (t, dt) => {
    if (dt > 100) return;
    //main.play('song/1st Temp BG Song (New Area).mp3');


    off = player.dead == -1 ? 0 : Math.floor(Math.sin(player.dead*Math.PI)*3);

    // Layers
    main.add(bg);
    let l = Math.floor(player.x/480);
    main.add(lv[l]);
    if (l-2 >= 0) main.add(lv[l-2]);
    if (l-1 >= 0) main.add(lv[l-1]);
    if (l+1 < lv.length) main.add(lv[l+1]);
    if (l+2 < lv.length) main.add(lv[l+2]);
    main.add(pet, menu, player);

    // Developer Tools
    if(main.on('x')) lv[0][0].darkmode = !lv[0][0].darkmode;
    main.on('z', e => {
        if(e.init) main.sprite_boxed = main.hitbox_boxed = main.rotate_boxed = !main.sprite_boxed;
    });
    main.on('h', e => {
        if(e.init) main.hitbox_boxed = !main.hitbox_boxed;
    });

    // Player Controls
    main.on('gp_j0', e => {
        player.camera = e.x*100;
    });
    main.on('u,U', e => {
        player.camera = -100;
    });
    main.on('i,I', e => {
        player.camera = 0;
    });
    main.on('o,O', e => {
        player.camera = 100;
    });
    main.on('j,J,gp_1', e => {
        if(e.init && player.swinging < 0.1) player.swing = true;
    });
    
    if(main.on('w,W, ,ArrowUp,gp_2') && player.ground != -1) {
        player.m[1] = 20 * (player.poisoned >= 0 ? 0.75 : 1);
    } else if (main.on('s,S,ArrowDown,gp_s')) {
        player.crouch = true;
        player.m[0] = 0;
    } else if (player.crouch) {
        player.crouch = player.jumping = false;
    } else if(main.on('d,D,ArrowRight,gp_e')) player.m[0] = 8 * player.speed_rate;
    else if(main.on('a,A,ArrowLeft,gp_w')) player.m[0] = -8 * player.speed_rate;
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
            var o = 255-255*Math.max(Math.hypot(x-w/2, y-h/2)-7*w/20,0)/Math.min(w,h);
            if (y % 2 == 0) o *= (w*y/2+x-t)*0.000001%0.02 + 0.98;
            if (off != 0) {
                d.data[p+1] = d.data[p+1+off*4];
                d.data[p+3] = d.data[p+3+off*4];
            }
            d.data[p+3] = Math.floor(o);
        }
    }
    return d;
}