import {algo} from "../algorithms.ts";
import {required_files} from "./entities.ts";
import {engine} from "../engine.ts";
import {plts, level} from "./levels.ts";

// Video element (created on demand)
let v:HTMLVideoElement|null = null;

// Media
let bg_song_fade_to = 0, bg_song = [1,0,0],  bg_songs = ['song/1st Temp BG Song (New Area).mp3', 'song/2nd Temp BG Song (Starting & Slow Pace) .mp3', 'song/3rd Temp BG Song.mp3'];

// Set gravity, game, levels, player, and player collisions
algo.gravity = 20;
let main = new engine({z:1, w:320, h:240, load: [...required_files, ...bg_songs], camera:[-160,0]});
main.dom.style.filter = 'contrast(1.1)';
let platforms = plts(main);
let lv = level(main);
let bg = main.entity('background', {house:true});
let player = main.entity('pinoy', {x: /*20200/*/0, y:195});
main.player = player;
let menu = main.entity('menu', {house:true});
let pet = main.entity('pet', {x:15, y:209, animal:0, follow:player});
let off = 0;

player.ondeath = () => {
    for (let i = Math.floor(player.x/480); i > 0; i--) {
        let l = platforms[i];
        for (let j = 0; j < l.length; j++) {
            if (l[j]['__type__'] == 'checkpoint') {
                player.cur_body_t = player.body_t;
                player.x = l[j].x;
                player.y = l[j].y;
                return;
            }
        }
    }
    player.cur_body_t = player.body_t;
    player.x = 130;
    player.y = 195;
};

// === Main Menu Scene ===
let menu_sel = 0;           // 0=START GAME, 1=CONTROLS, 2=CREDITS
let menu_sub = -1;          // -1=main menu, 0=controls screen, 1=credits screen
let menu_cooldown = 0;      // input cooldown to prevent rapid navigation
let menu_items = ['START GAME', 'CONTROLS', 'CREDITS'];

main.scene('main_menu', (t, dt) => {
    menu_cooldown -= dt;

    // === Draw animated sky background ===
    let g = main.btx.createLinearGradient(0, 0, 0, main.h);
    g.addColorStop(0, 'rgb(0,140,240)');
    g.addColorStop(1, 'rgb(82,215,255)');
    main.btx.fillStyle = g;
    main.btx.fillRect(0, 0, main.w, main.h);

    // Clouds decoration
    main.sprites('Cloudsv1 (1).png', [],
        [Math.floor(t/80) % main.w, 16, 4, 20, 16, 16, 0, 0, 0, 0, 0, 0],
        [(Math.floor(t/80) + 120) % main.w, 8, 20, 4, 16, 16, 0, 0, 0, 0, 0, 0],
        [(Math.floor(t/80) + 220) % main.w, 20, 36, 20, 16, 16, 0, 0, 0, 0, 0, 0]
    );

    // === Sub-screens ===
    if (menu_sub == 0) {
        // Controls screen
        main.sprites('Controls.png', [], [0, 0, 0, 0, 320, 240, 0, 0, 0, 0, 0, 0]);
        main.btx.font = '8px arcade';
        main.btx.textAlign = 'center';
        main.btx.textBaseline = 'bottom';
        main.btx.fillStyle = '#FFD700';
        main.btx.fillText('PRESS ENTER TO GO BACK', main.w / 2, main.h - 8);
        main.on('Enter', e => { if (e.init) { menu_sub = -1; menu_cooldown = 300; } });
        main.on('Escape', e => { if (e.init) { menu_sub = -1; menu_cooldown = 300; } });
        return;
    }
    if (menu_sub == 1) {
        // Credits screen
        main.btx.fillStyle = '#000';
        main.btx.fillRect(0, 0, main.w, main.h);
        main.sprites('credits.png', [], [0, 20, 0, 0, 320, 240, 0, 0, 0, 0, 0, 0]);
        main.btx.font = '8px arcade';
        main.btx.textAlign = 'center';
        main.btx.textBaseline = 'bottom';
        main.btx.fillStyle = '#FFD700';
        main.btx.fillText('PRESS ENTER TO GO BACK', main.w / 2, main.h - 8);
        main.on('Enter', e => { if (e.init) { menu_sub = -1; menu_cooldown = 300; } });
        main.on('Escape', e => { if (e.init) { menu_sub = -1; menu_cooldown = 300; } });
        return;
    }

    // === Title logo ===
    main.sprites('Rise_of_the_Aswang_King.png', [0, 0],
        [32, 20, 0, 0, 256, 144, 0, 0, 0, 0, 0, 0]
    );

    // === Menu board (using Menu.png frame) ===
    // Board background
    let boardX = 80, boardY = 110, boardW = 160, boardH = 100;
    main.btx.fillStyle = 'rgba(139, 105, 20, 0.85)';
    main.btx.fillRect(boardX, boardY, boardW, boardH);
    // Board border
    main.btx.strokeStyle = '#5C3A0A';
    main.btx.lineWidth = 2;
    main.btx.strokeRect(boardX, boardY, boardW, boardH);
    // Inner border highlight
    main.btx.strokeStyle = '#D4A830';
    main.btx.lineWidth = 1;
    main.btx.strokeRect(boardX + 3, boardY + 3, boardW - 6, boardH - 6);

    // === Menu items ===
    for (let i = 0; i < menu_items.length; i++) {
        let itemY = boardY + 22 + i * 26;
        let selected = (i == menu_sel);

        // Highlight bar for selected item
        if (selected) {
            main.btx.fillStyle = 'rgba(255, 215, 0, 0.2)';
            main.btx.fillRect(boardX + 8, itemY - 4, boardW - 16, 18);
        }

        // Blinking cursor
        if (selected && Math.floor(t / 400) % 2 == 0) {
            main.btx.font = '10px arcade';
            main.btx.fillStyle = '#FFD700';
            main.btx.textAlign = 'right';
            main.btx.textBaseline = 'top';
            main.btx.fillText('>', boardX + 22, itemY);
        }

        // Item text
        main.btx.font = '10px arcade';
        main.btx.textAlign = 'center';
        main.btx.textBaseline = 'top';
        main.btx.fillStyle = selected ? '#FFFFFF' : '#C8A840';
        main.btx.fillText(menu_items[i], main.w / 2, itemY);
    }

    // === Footer hint ===
    main.btx.font = '5px arcade';
    main.btx.textAlign = 'center';
    main.btx.textBaseline = 'bottom';
    main.btx.fillStyle = '#888';
    main.btx.fillText('USE W/S OR ARROWS TO NAVIGATE  -  ENTER TO SELECT', main.w / 2, main.h - 4);

    // === Navigation input ===
    main.on('w,W,ArrowUp', e => {
        if (e.init && menu_cooldown <= 0) {
            menu_sel = (menu_sel - 1 + menu_items.length) % menu_items.length;
            menu_cooldown = 150;
        }
    });
    main.on('s,S,ArrowDown', e => {
        if (e.init && menu_cooldown <= 0) {
            menu_sel = (menu_sel + 1) % menu_items.length;
            menu_cooldown = 150;
        }
    });
    main.on('Enter', e => {
        if (e.init && menu_cooldown <= 0) {
            menu_cooldown = 300;
            if (menu_sel == 0) {
                // START GAME -> play intro video
                main.scene('into');
            } else if (menu_sel == 1) {
                menu_sub = 0; // Controls
            } else if (menu_sel == 2) {
                menu_sub = 1; // Credits
            }
        }
    });
});

// === Intro Scene ===
let load_level = ()=>{
    if (v && v.parentNode) document.body.removeChild(v);
    main.scene('level');
};
main.scene('into', (t,dt) => {
    if (!v) {
        v = document.createElement('video');
        v.src = 'Aswang King Final Game Story(480p).mp4';
        v.setAttribute('style', 'position:fixed;left:0;top:0;width:100%;height:100%;z-index:2');
        document.body.appendChild(v);
        v.play();
        v.addEventListener('ended', load_level);
    }
    main.on('Enter', e => {
        if (e.init) load_level();
    });
});

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
    main.on('e,E,gp_4', e => {
        if (e.init) player.protection = !player.protection;
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
        player.m[1] = 20 * (!player.protection && player.poisoned >= 0 ? 0.75 : 1);
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