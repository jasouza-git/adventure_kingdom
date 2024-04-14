import {algo} from "../algorithms.ts";
import {required_files} from "./entities.ts";
import {engine} from "../engine.ts";

let main = new engine({z:10, w:160, h:120});
let player = main.entity('knight', {y:0});
let clouds = main.entities('eud', Math.random()*10);
let back = main.entities('eud', 5, {x:-8*3,y:main.h,w:main.w/8+4,t:1,hp:Math.floor(Math.random()*3+2)})
let water = main.entity('liquid', {x:13*8, y:104, w:7, h:2, lava:false})
let dirts = [
    main.entity('dirt', {x:0,y:104,w:14,h:2}),
    main.entity('dirt', {x: 13*8-5*8, y:104-8*3, w:12, h:5}),
    main.entity('dirt', {x:10*8,y:104-12*3,w:3,h:9})
];
dirts[2].hitbox[0] = 15;
player.collide = dirts;
main.load(...required_files);
main.scene('menu', (t, dt) => {
    if (dt > 100) return;
    main.draw('', {color: 'skyblue'});
    main.add(clouds, back);
    main.draw('', {alpha:0.2, color:'#dddddd'});

    main.add(dirts[2], dirts[1], water, dirts[0], player);

    if(player.sword < 0.01) main.on('Enter', e=> {
        if (e.init) player.sword = 1;
    });
    main.on('z', e=> {
        if (e.init) main.hitbox_boxed = main.sprite_boxed = main.rotate_boxed = !main.sprite_boxed;
    });
    main.on('h', e=> {
        if (e.init) main.hitbox_boxed = !main.hitbox_boxed;
    });
    if (main.on('w, ,ArrowUp')) {
        player.crouched = true;
        player.jumping = true;
    } else if (main.on('s,ArrowDown')) {
        player.crouched = true;
        player.jumping = false;
    } else {
        if (player.crouched && player.ground != -1 && player.jumping) player.m[1] = 12;
        player.crouched = player.jumping = false;
    }
    if(main.on('d,ArrowRight')) player.m[0] += (3-player.m[0])*dt/300;
    else if(main.on('a,ArrowLeft')) player.m[0] -= (3+player.m[0])*dt/300;
    else player.m[0] -= player.m[0]*dt/100;
});
main.render();