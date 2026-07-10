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

// === Pause State ===
let paused = false;
let pause_sel = 0;          // 0=RESUME, 1=CONTROLS, 2=MAIN MENU
let pause_cooldown = 0;
let pause_sub = -1;         // -1=pause menu, 0=controls screen
let pause_items = ['RESUME', 'CONTROLS', 'MAIN MENU'];

// Helper: draw readable controls screen on the canvas
function drawControlsScreen(btx:any, w:number, h:number, t:number) {
    // Dark background
    btx.fillStyle = '#0A0A2A';
    btx.fillRect(0, 0, w, h);

    // Title
    btx.font = '12px arcade';
    btx.textAlign = 'center';
    btx.textBaseline = 'top';
    btx.fillStyle = '#FFD700';
    btx.fillText('CONTROLS', w / 2, 10);

    // Separator line
    btx.fillStyle = '#8B6914';
    btx.fillRect(40, 28, w - 80, 2);

    // Controls list
    let controls = [
        ['MOVEMENT',    ''],
        ['  WALK',      'A / D  or  LEFT / RIGHT'],
        ['  JUMP',      'SPACE  or  UP'],
        ['  CROUCH',    'S  or  DOWN'],
        ['  CLIMB',     'W / S  on vines'],
        ['',            ''],
        ['COMBAT',      ''],
        ['  ATTACK',    'J'],
        ['  SWAP WEAPON', 'R  or  1 / 2 / 3'],
        ['  SHIELD',    'E  (toggle on/off)'],
        ['',            ''],
        ['CAMERA',      'U / I / O'],
        ['PAUSE',       'ESC  or  P'],
    ];

    let startY = 36;
    for (let i = 0; i < controls.length; i++) {
        let y = startY + i * 14;
        let entry = controls[i];
        if (entry[1] == '' && entry[0] != '') {
            // Section header
            btx.font = '7px arcade';
            btx.fillStyle = '#FFD700';
            btx.textAlign = 'left';
            btx.fillText(entry[0], 20, y);
        } else if (entry[0] != '') {
            // Action name
            btx.font = '6px arcade';
            btx.fillStyle = '#CCCCCC';
            btx.textAlign = 'left';
            btx.fillText(entry[0], 20, y);
            // Key binding
            btx.fillStyle = '#66CCFF';
            btx.textAlign = 'right';
            btx.fillText(entry[1], w - 20, y);
        }
    }

    // Footer
    btx.font = '6px arcade';
    btx.textAlign = 'center';
    btx.textBaseline = 'bottom';
    btx.fillStyle = '#FFD700';
    let blink = Math.floor(t / 500) % 2 == 0;
    if (blink) btx.fillText('PRESS ENTER OR ESC TO GO BACK', w / 2, h - 12);
}

// Helper: draw a thick multi-piece pixel-art cloud (matching the in-game style)
function drawThickCloud(btx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number) {
    // Left bottom slice (4, 20)
    btx.drawImage(img, 4, 20, 16, 16, Math.floor(x), Math.floor(y + 16), 16, 16);
    // Middle bottom slice (20, 20)
    btx.drawImage(img, 20, 20, 16, 16, Math.floor(x + 16), Math.floor(y + 16), 16, 16);
    // Right bottom slice (40, 20)
    btx.drawImage(img, 40, 20, 16, 16, Math.floor(x + 32), Math.floor(y + 16), 16, 16);
    // Top middle slice (20, 4)
    btx.drawImage(img, 20, 4, 16, 16, Math.floor(x + 16), Math.floor(y), 16, 16);
}

main.scene('main_menu', (t, dt) => {
    menu_cooldown -= dt;

    // === Draw animated sky background ===
    let g = main.btx.createLinearGradient(0, 0, 0, main.h);
    g.addColorStop(0, 'rgb(0,140,240)');
    g.addColorStop(1, 'rgb(82,215,255)');
    main.btx.fillStyle = g;
    main.btx.fillRect(0, 0, main.w, main.h);

    // Clouds - smooth scrolling with parallax using in-game thick clouds
    let cloudImg = main.loaded['Cloudsv1 (1).png'] as HTMLImageElement;

    // Cloud layer 1 (back, slow) - small height, slow speed
    let c1x = ((t / 50) % (main.w + 48)) - 48;
    drawThickCloud(main.btx, cloudImg, c1x, 8);

    // Cloud layer 2 (mid, medium speed) - offset start, medium height/speed
    let c2x = (((t / 35) + 160) % (main.w + 48)) - 48;
    drawThickCloud(main.btx, cloudImg, c2x, 22);

    // Cloud layer 3 (front, faster) - offset start, lower height, faster speed
    let c3x = (((t / 25) + 80) % (main.w + 48)) - 48;
    drawThickCloud(main.btx, cloudImg, c3x, 40);

    // === Sub-screens ===
    if (menu_sub == 0) {
        // Controls screen (text-based, readable)
        drawControlsScreen(main.btx, main.w, main.h, t);
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

    // === Title logo (scaled down to match pixel density) ===
    // Original is 256x144, scale to ~154x86 (0.6x) for better pixel consistency
    let logoW = 154, logoH = 86;
    let logoX = (main.w - logoW) / 2;
    main.btx.drawImage(main.loaded['Rise_of_the_Aswang_King.png'] as HTMLImageElement,
        0, 0, 256, 144,  // source: full image
        Math.floor(logoX), 12, logoW, logoH);

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
    main.btx.fillStyle = '#FFFFFF';
    main.btx.fillText('USE W/S OR ARROWS TO NAVIGATE  -  ENTER TO SELECT', main.w / 2, main.h - 10);

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

    // === Pause toggle ===
    main.on('Escape', e => {
        if (e.init) {
            if (pause_sub == 0) { pause_sub = -1; pause_cooldown = 300; }
            else { paused = !paused; pause_sel = 0; pause_sub = -1; pause_cooldown = 300; }
        }
    });
    main.on('p,P', e => {
        if (e.init && pause_sub == -1) { paused = !paused; pause_sel = 0; pause_sub = -1; pause_cooldown = 300; }
    });

    // === Pause Menu ===
    if (paused) {
        pause_cooldown -= dt;

        // Controls sub-screen within pause
        if (pause_sub == 0) {
            drawControlsScreen(main.btx, main.w, main.h, t);
            main.on('Enter', e => { if (e.init) { pause_sub = -1; pause_cooldown = 300; } });
            return;
        }

        // Dim overlay
        main.btx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        main.btx.fillRect(0, 0, main.w, main.h);

        // Pause title
        main.btx.font = '14px arcade';
        main.btx.textAlign = 'center';
        main.btx.textBaseline = 'top';
        main.btx.fillStyle = '#FFD700';
        main.btx.fillText('PAUSED', main.w / 2, 60);

        // Pause menu board
        let pBoardX = 90, pBoardY = 85, pBoardW = 140, pBoardH = 100;
        main.btx.fillStyle = 'rgba(139, 105, 20, 0.85)';
        main.btx.fillRect(pBoardX, pBoardY, pBoardW, pBoardH);
        main.btx.strokeStyle = '#5C3A0A';
        main.btx.lineWidth = 2;
        main.btx.strokeRect(pBoardX, pBoardY, pBoardW, pBoardH);
        main.btx.strokeStyle = '#D4A830';
        main.btx.lineWidth = 1;
        main.btx.strokeRect(pBoardX + 3, pBoardY + 3, pBoardW - 6, pBoardH - 6);

        // Pause menu items
        for (let i = 0; i < pause_items.length; i++) {
            let itemY = pBoardY + 18 + i * 26;
            let selected = (i == pause_sel);

            if (selected) {
                main.btx.fillStyle = 'rgba(255, 215, 0, 0.2)';
                main.btx.fillRect(pBoardX + 6, itemY - 4, pBoardW - 12, 18);
            }
            if (selected && Math.floor(t / 400) % 2 == 0) {
                main.btx.font = '9px arcade';
                main.btx.fillStyle = '#FFD700';
                main.btx.textAlign = 'right';
                main.btx.textBaseline = 'top';
                main.btx.fillText('>', pBoardX + 18, itemY);
            }
            main.btx.font = '9px arcade';
            main.btx.textAlign = 'center';
            main.btx.textBaseline = 'top';
            main.btx.fillStyle = selected ? '#FFFFFF' : '#C8A840';
            main.btx.fillText(pause_items[i], main.w / 2, itemY);
        }

        // Navigation
        main.on('w,W,ArrowUp', e => {
            if (e.init && pause_cooldown <= 0) {
                pause_sel = (pause_sel - 1 + pause_items.length) % pause_items.length;
                pause_cooldown = 150;
            }
        });
        main.on('s,S,ArrowDown', e => {
            if (e.init && pause_cooldown <= 0) {
                pause_sel = (pause_sel + 1) % pause_items.length;
                pause_cooldown = 150;
            }
        });
        main.on('Enter', e => {
            if (e.init && pause_cooldown <= 0) {
                pause_cooldown = 300;
                if (pause_sel == 0) {
                    // RESUME
                    paused = false;
                } else if (pause_sel == 1) {
                    // CONTROLS
                    pause_sub = 0;
                } else if (pause_sel == 2) {
                    // MAIN MENU
                    paused = false;
                    menu_sel = 0;
                    menu_sub = -1;
                    main.scene('main_menu');
                }
            }
        });
        return;
    }
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

// === Mobile Controls Overlay ===
const mobileStyle = document.createElement('style');
mobileStyle.innerHTML = `
    #mobile-controls-container {
        display: none;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        pointer-events: none;
        user-select: none;
        -webkit-user-select: none;
    }
    .mobile-btn {
        position: absolute;
        width: 46px;
        height: 46px;
        background: rgba(26, 10, 10, 0.4);
        border: 2px solid #8B6914;
        border-radius: 50%;
        color: #FFFFFF;
        font-family: 'arcade', monospace;
        font-size: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: auto;
        box-shadow: 0 0 8px rgba(0,0,0,0.5), inset 0 0 4px rgba(212, 168, 48, 0.2);
        transition: background 0.1s, border-color 0.1s, transform 0.05s;
        touch-action: none;
    }
    .mobile-btn:active {
        background: rgba(212, 168, 48, 0.7);
        border-color: #FFD700;
        box-shadow: 0 0 12px #FFD700, inset 0 0 4px rgba(255, 255, 255, 0.5);
        transform: scale(0.95);
    }
    
    /* D-PAD (Left Side) */
    #btn-left { left: 15px; bottom: 55px; }
    #btn-right { left: 85px; bottom: 55px; }
    #btn-up { left: 50px; bottom: 95px; }
    #btn-down { left: 50px; bottom: 15px; }
    
    /* Actions (Right Side) */
    #btn-jump { right: 15px; bottom: 55px; width: 50px; height: 50px; font-size: 10px; font-weight: bold; border-color: #FFD700; }
    #btn-attack { right: 75px; bottom: 55px; }
    #btn-swap { right: 75px; bottom: 110px; width: 40px; height: 40px; }
    #btn-shield { right: 20px; bottom: 115px; width: 40px; height: 40px; }
    
    /* Utilities (Top Side) */
    #btn-pause { right: 15px; top: 15px; width: 56px; height: 26px; border-radius: 4px; font-size: 8px; }
    #btn-enter { left: 50%; transform: translateX(-50%); top: 15px; width: 70px; height: 26px; border-radius: 4px; font-size: 8px; }
`;
document.head.appendChild(mobileStyle);

const mobileContainer = document.createElement('div');
mobileContainer.id = 'mobile-controls-container';
mobileContainer.innerHTML = `
    <!-- D-PAD -->
    <div id="btn-up" class="mobile-btn">UP</div>
    <div id="btn-left" class="mobile-btn">LEFT</div>
    <div id="btn-right" class="mobile-btn">RIGHT</div>
    <div id="btn-down" class="mobile-btn">DOWN</div>

    <!-- Action Buttons -->
    <div id="btn-jump" class="mobile-btn">JUMP</div>
    <div id="btn-attack" class="mobile-btn">ATK</div>
    <div id="btn-swap" class="mobile-btn">SWAP</div>
    <div id="btn-shield" class="mobile-btn">SHLD</div>

    <!-- Utility Buttons -->
    <div id="btn-pause" class="mobile-btn">PAUSE</div>
    <div id="btn-enter" class="mobile-btn">SELECT</div>
`;
document.body.appendChild(mobileContainer);

// Map virtual button IDs to game keys checked by engine.on()
const mobileKeyMap: { [id: string]: string } = {
    'btn-up': 'ArrowUp',
    'btn-down': 'ArrowDown',
    'btn-left': 'ArrowLeft',
    'btn-right': 'ArrowRight',
    'btn-jump': ' ',
    'btn-attack': 'j',
    'btn-swap': 'r',
    'btn-shield': 'e',
    'btn-pause': 'Escape',
    'btn-enter': 'Enter'
};

function setupMobileButton(id: string, key: string) {
    const btn = document.getElementById(id);
    if (!btn) return;
    
    const press = (e: Event) => {
        e.preventDefault();
        if (!main.evented[key]) {
            main.evented[key] = { init: true };
        }
    };
    
    const release = (e: Event) => {
        e.preventDefault();
        delete main.evented[key];
    };
    
    btn.addEventListener('touchstart', press, { passive: false });
    btn.addEventListener('touchend', release, { passive: false });
    btn.addEventListener('touchcancel', release, { passive: false });
    
    // Fallback mouse events for emulation/testing
    btn.addEventListener('mousedown', press);
    btn.addEventListener('mouseup', release);
    btn.addEventListener('mouseleave', release);
}

Object.keys(mobileKeyMap).forEach(id => setupMobileButton(id, mobileKeyMap[id]));

// Check touch support on load or show on first touch
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    const cnt = document.getElementById('mobile-controls-container');
    if (cnt) cnt.style.display = 'block';
} else {
    window.addEventListener('touchstart', function onFirstTouch() {
        const cnt = document.getElementById('mobile-controls-container');
        if (cnt) cnt.style.display = 'block';
        window.removeEventListener('touchstart', onFirstTouch);
    }, { passive: true });
}