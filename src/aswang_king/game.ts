import {algo} from "../algorithms.ts";
import {required_files} from "./entities.ts";
import {engine} from "../engine.ts";
import {plts, level} from "./levels.ts";

// Intro
let v = document.createElement('video');
v.src = 'Aswang King Final Game Story(480p).mp4';
v.setAttribute('autoplay','true');
v.setAttribute('style', 'position:fixed;left:0;top:0;width:100%;height:100%;z-index:2');
document.body.appendChild(v);

// Media
let bg_song_fade_to = 0, bg_song = [1,0,0],  bg_songs = ['song/1st Temp BG Song (New Area).mp3', 'song/2nd Temp BG Song (Starting & Slow Pace) .mp3', 'song/3rd Temp BG Song.mp3'];

// Set gravity, game, levels, player, and player collisions
algo.gravity = 20;
let main = new engine({z:1, w:320, h:240, load: [...required_files, ...bg_songs], camera:[-160,0]});
main.dom.style.filter = 'contrast(1.1)';
let platforms = plts(main);
let lv = level(main);
let bg = main.entity('background', {house:true});
let player = main.entity('pinoy', {x: 20200/*/160/*/, y:/*195*/60});
main.player = player;
let menu = main.entity('menu', {house:true});
let pet = main.entity('pet', {x:15, y:209, animal:0, follow:player});
let off = 0;

player.ondeath = () => {
    for (let i = Math.floor(player.x/480); i > 0; i--) {
        let l = platforms[i];
        for (let j = 0; j < l.length; j++) {
            if (l[j]['__type__'] == 'checkpoint') {
                player.x = l[j].x;
                player.y = l[j].y;
                return;
            }
        }
    }
    player.x = 130;
    player.y = 195;
};

// Intro Scene
let load_level = ()=>{
    document.body.removeChild(v);
    main.scene('level');
};
main.scene('into', (t,dt) => {
    v.play();
    main.on('Enter', load_level);
});
v.addEventListener('ended', load_level);

// Level Scene
main.scene('level', (t, dt) => {
    if (dt > 100) return;

    // Dead glitch filter
    off = player.dead == -1 ? 0 : Math.floor(Math.sin(player.dead*Math.PI)*3);

    if (player.lives[0] < 0) {
        menu.over = true;
        main.add(menu);
        main.on('Enter', e => {
            if (e.init) {
                player.highscore = algo.score(player);
                player.points = 0;
                menu.over = false;
                player.lives = [3, 3];
                player.max_x = player.x = 160;
                player.y = 195;
                player.climb = player.poisoned = -1;
                player.canclimb = false;
                bg.night = false;
                bg.day = 1;
                platforms = plts(main);
                lv = level(main);
            }
        });
        return;
    } else menu.over = false;

    // Layers
    main.add(bg);
    let l = Math.floor(player.x/480);
    for (var n = -2; n <= 2; n++) {
        if (l+n >= 0 && l+n < platforms.length) main.add(platforms[l+n]);
    }
    if (player.canclimb && main.on('w,W,s,S')) {player.climb = 1; player.m = [0,0]}
    main.add(menu, pet, main.player);
    for (var n = -2; n <= 2; n++) {
        if (l+n >= 0 && l+n < lv.length) main.add(lv[l+n]);
    }

    // Music
    if (player.ground != -1 && player.ground < main.interacts.length && [0,1,2].indexOf(main.interacts[player.ground].mode) != -1) {
        bg_song_fade_to = main.interacts[player.ground].mode;
    }
    for (var i = 0; i < bg_song.length; i++) {
        bg_song[i] += (i == bg_song_fade_to ? 1-bg_song[i] : -bg_song[i])*dt/1000;
        main.play(bg_songs[i], false, bg_song[i]);
    }
    

    // Developer Tools
    if(main.on('x')) lv[0][0].darkmode = !lv[0][0].darkmode;
    main.on('z', e => {
        if(e.init) main.sprite_boxed = main.hitbox_boxed = main.rotate_boxed = !main.sprite_boxed;
    });
    main.on('h', e => {
        if(e.init) main.hitbox_boxed = !main.hitbox_boxed;
    });
    main.on('g', e => {
        if(e.init) player.points += 10;
    });

    // Background
    if (player.ground != -1) {
        let o = main.interacts[player.ground];
        bg.night = o['__type__'] == 'plat' && o.mode != 0;
    }

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
    main.on('r,R,gp_3', e => {
        if (e.init) player.cur_weapon = (player.cur_weapon + 1) % player.weapons.length
    });
    main.on('1', e => {
        if (e.init) player.cur_weapon = 0
    });
    main.on('2', e => {
        if (e.init) player.cur_weapon = 1
    });
    main.on('3', e => {
        if (e.init) player.cur_weapon = 2
    });
    
    if (player.climb != -1) {
        if(main.on(' ,ArrowUp,gp_2')) {
            player.m[1] = 20 * (player.poisoned >= 0 ? 0.75 : 1);
            player.climb = -1;
        } else if (main.on('d,D,ArrowRight,gp_e,a,A,ArrowLeft,gp_w')) {
            player.climb = (Math.sin(t/200)+1)/2;
            if (main.on('d,D,ArrowRight,gp_e')) player.x += dt/10;
            else player.x -= dt/10;
        } else if (main.on('w,W,gp_n,s,S,gp_s')) {
            main.play('sfx/vines.mp3', false, 0.5);
            player.climb = (Math.sin(t/100)+1)/2;
            player.y += (main.on('w,W,gp_n')?-1:1)*dt/10;
        } else player.climb = 0;
        player.climing = true;
    }

    if(main.on(' ,ArrowUp,gp_2') && player.ground != -1) {
        player.m[1] = 20 * (player.poisoned >= 0 ? 0.75 : 1);
    } else if (main.on('s,S,ArrowDown,gp_s')) {
        player.crouch = true;
        player.m[0] = 0;
    } else if (player.crouch) {
        player.crouch = player.jumping = false;
    } else if(main.on('d,D,ArrowRight,gp_e')) player.m[0] = 8 * player.speed_rate;
    else if(main.on('a,A,ArrowLeft,gp_w')) player.m[0] = -8 * player.speed_rate;
    else player.m[0] = 0;

    // Reset
    
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