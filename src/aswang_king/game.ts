import { algo } from "../algorithms.ts";
import { required_files } from "./entities.ts";
import { engine } from "../engine.ts";
import { plts, level } from "./levels.ts";

// Video element (created on demand)
let v: HTMLVideoElement | null = null;

// Media
let bg_song_fade_to = 0, bg_song = [1, 0, 0], bg_songs = ['song/1st Temp BG Song (New Area).mp3', 'song/2nd Temp BG Song (Starting & Slow Pace) .mp3', 'song/3rd Temp BG Song.mp3'];

// Set gravity, game, levels, player, and player collisions
algo.gravity = 20;
let main = new engine({ z: 1, w: 320, h: 240, load: [...required_files, ...bg_songs], camera: [-160, 0] });
main.dom.style.filter = 'contrast(1.1)';
// Dialog & Shop System variables
let active_dialogue: any[] | null = null;
let dialogue_index = 0;
let dialogue_cooldown = 0;
let dialogue_post_callback: (() => void) | null = null;
let active_shop: any | null = null;
let shop_sel = 0;
let shop_cooldown = 0;
let ending_active = false;
let king_defeated = false;
let partner_spawned = false;

// Leaderboard & Name tracking variables
let current_player_name = "";
let player_record: any = null;
let level_sel = 0;

// startLevel helper function
function startLevel(level_num: number, use_checkpoint: boolean = false) {
    platforms = setupPlatforms();
    lv = level(main);
    adjustLevelEssenceCount(lv);

    player.cur_body_t = player.body_t;
    player.lives = [3, 3];
    player.player_lives = 3;
    player.points = 0;
    player.total_essence = 0;
    player.farthest_checkpoint_x = -1;
    if (player.weapons) {
        player.weapons[0].durability = 1000000;
        player.weapons[1].durability = 0;
        player.weapons[2].durability = 0;
        player.cur_weapon = 0;
    }

    let checkpoint = (player_record && player_record.saved_checkpoint && player_record.saved_checkpoint.level === level_num) ? player_record.saved_checkpoint : null;

    if (use_checkpoint && checkpoint) {
        player.lives = [checkpoint.lives[0], checkpoint.lives[1]];
        player.player_lives = checkpoint.player_lives;
        player.points = checkpoint.points;
        player.total_essence = checkpoint.total_essence;
        player.farthest_checkpoint_x = checkpoint.x;
        if (player.weapons && checkpoint.weapons) {
            player.weapons[0].durability = checkpoint.weapons[0].durability;
            player.weapons[1].durability = checkpoint.weapons[1].durability;
            player.weapons[2].durability = checkpoint.weapons[2].durability;
            player.cur_weapon = checkpoint.cur_weapon;
        }
        player.x = checkpoint.x;
        player.y = checkpoint.y;
    } else {
        if (level_num === 1) {
            player.x = 30;
            player.y = 195;
        } else if (level_num === 2) {
            player.x = 8032;
            player.y = 160;
        } else if (level_num === 3) {
            player.x = 16048;
            player.y = 160;
        } else if (level_num === 4) {
            player.x = 20064;
            player.y = 112;
        }
    }
    player.max_x = player.x;

    // Save initial progress at start of the level
    if (current_player_name) {
        player_record.saved_checkpoint = {
            level: level_num,
            x: player.x,
            y: player.y,
            lives: [player.lives[0], player.lives[1]],
            player_lives: player.player_lives,
            points: player.points,
            total_essence: player.total_essence,
            weapons: [
                { durability: player.weapons[0].durability },
                { durability: player.weapons[1].durability },
                { durability: player.weapons[2].durability }
            ],
            cur_weapon: player.cur_weapon
        };
        localStorage.setItem('aswang_leaderboard_' + current_player_name, JSON.stringify(player_record));
    }

    // Clear menus and state
    menu_sub = -1;
    paused = false;
    cheat_menu_open = false;
    current_level = level_num;
    level_title_timer = 3000;
    level_title_text = level_num === 4 ? "BOSS LEVEL" : "LEVEL " + level_num;

    // Reset boss tracking
    king_defeated = false;
    partner_spawned = false;
    ending_active = false;

    main.scene('level');
}

// Helper: setup platforms and automatically spawn health plants & shop components next to checkpoints
function setupPlatforms() {
    let p = plts(main);
    p.forEach((section, index) => {
        let itemsToAdd: any[] = [];
        section.forEach(entity => {
            if (entity['__type__'] == 'checkpoint') {
                itemsToAdd.push(main.entity('health_plant', { x: entity.x + 8, y: entity.y + 48 }));

                let findGround = (x: number) => {
                    let groundY = entity.y + 64; // default fallback
                    for (let item of section) {
                        if (item['__type__'] === 'plat') {
                            let itemX = item.x;
                            let itemW = (item.w || 1) * 16;
                            if (x >= itemX && x < itemX + itemW) {
                                if (item.y >= entity.y && item.y < groundY + 16) {
                                    groundY = item.y;
                                }
                            }
                        }
                    }
                    return groundY;
                };

                // Spawn shop next to Level 2 and Level 3 start checkpoints, and the Boss checkpoint
                if (entity.x === 8032 || entity.x === 16048 || entity.x === 20064) {
                    let boardX = entity.x + 15;
                    let npc1X = entity.x + 100;
                    let npc2X = entity.x + 50;

                    let boardY = findGround(boardX) - 29;
                    let npc2Y = findGround(npc2X) - 29; // Albularyo height is now 32, stands on ground

                    itemsToAdd.push(main.entity('merchant_board', { x: boardX, y: boardY }));

                    if (entity.x === 8032) {
                        // Level 2 Start: Mysterious Person + Albularyo
                        let npc1Y = findGround(npc1X) - 29; // Mysterious Person height is now 32
                        itemsToAdd.push(main.entity('mysterious_person', { x: npc1X, y: npc1Y }));
                        itemsToAdd.push(main.entity('albularyo', { x: npc2X, y: npc2Y }));
                    } else if (entity.x === 16048) {
                        // Level 3 Start: Wandering Hunter + Albularyo
                        let npc1Y = findGround(npc1X) - 29; // Wandering Hunter height is 32
                        itemsToAdd.push(main.entity('wandering_hunter', { x: npc1X, y: npc1Y }));
                        itemsToAdd.push(main.entity('albularyo', { x: npc2X, y: npc2Y }));
                    } else if (entity.x === 20064) {
                        // Boss Checkpoint: Priest + Albularyo
                        let npc1Y = findGround(npc1X) - 24; // Priest lower on the ground
                        itemsToAdd.push(main.entity('priest', { x: npc1X, y: npc1Y + 9 }));
                        itemsToAdd.push(main.entity('albularyo', { x: npc2X, y: npc2Y }));
                    }
                }
            }
        });
        section.push(...itemsToAdd);
    });
    return p;
}

// Adjust essence counts per level to match target counts exactly: Lvl 1: 500, Lvl 2: 600, Lvl 3: 300
function adjustLevelEssenceCount(sections: any[][]) {
    let lvl1Essences: any[] = [];
    let lvl2Essences: any[] = [];
    let lvl3Essences: any[] = [];

    sections.forEach(sec => {
        sec.forEach(e => {
            if (e['__type__'] === 'essence') {
                let x = e.x || 0;
                if (x < 8000) {
                    lvl1Essences.push({ entity: e, section: sec });
                } else if (x < 16000) {
                    lvl2Essences.push({ entity: e, section: sec });
                } else {
                    lvl3Essences.push({ entity: e, section: sec });
                }
            }
        });
    });

    if (lvl1Essences.length < 500 && lvl1Essences.length > 0) {
        let needed = 500 - lvl1Essences.length;
        for (let i = 0; i < needed; i++) {
            let ref = lvl1Essences[i % lvl1Essences.length];
            let clone = main.entity('essence', { x: ref.entity.x + 8, y: ref.entity.y, ess: ref.entity.ess });
            ref.section.push(clone);
        }
    }

    if (lvl2Essences.length > 600) {
        let toRemove = lvl2Essences.length - 600;
        for (let i = 0; i < toRemove; i++) {
            let item = lvl2Essences[i];
            let idx = item.section.indexOf(item.entity);
            if (idx > -1) {
                item.section.splice(idx, 1);
            }
        }
    }

    if (lvl3Essences.length < 300 && lvl3Essences.length > 0) {
        let needed = 300 - lvl3Essences.length;
        for (let i = 0; i < needed; i++) {
            let ref = lvl3Essences[i % lvl3Essences.length];
            let clone = main.entity('essence', { x: ref.entity.x + 8, y: ref.entity.y, ess: ref.entity.ess });
            ref.section.push(clone);
        }
    }
}

let platforms = setupPlatforms();
let lv = level(main);
adjustLevelEssenceCount(lv);
let bg = main.entity('background', { house: true });
let player = main.entity('pinoy', { x: /*20200/*/0, y: 195 });
main.player = player;
let menu = main.entity('menu', { house: true });
let pet = main.entity('pet', { x: 15, y: 209, animal: 0, follow: player });
let off = 0;

// Level title tracking
let current_level = 0;
let level_title_timer = 0;
let level_title_text = "";

// Cheat Menu tracking
let cheat_menu_open = false;
let cheat_sel = 0;
let cheat_cooldown = 0;
let cheat_items = [
    'TELEPORT LEVEL 1',
    'TELEPORT LEVEL 2',
    'TELEPORT LEVEL 3',
    'TELEPORT BOSS LEVEL',
    'HEAL 5 HEARTS',
    'SET HP TO 1',
    'ONE HIT BOSS',
    'RESTORE WEAPONS',
    'CLOSE CHEATS'
];

player.ondeath = () => {
    player.player_lives--;
    if (player.player_lives <= 0) {
        player.lives[0] = -1;
        return;
    }
    player.lives[0] = player.lives[1];

    let minSection = 0;
    if (current_level === 2) minSection = Math.floor(8000 / 480);
    else if (current_level === 3) minSection = Math.floor(16000 / 480);
    else if (current_level === 4) minSection = Math.floor(20000 / 480);

    for (let i = Math.floor(player.max_x / 480); i >= minSection; i--) {
        if (i >= platforms.length) continue;
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
    if (current_level === 2) {
        player.x = 8032;
        player.y = 160;
    } else if (current_level === 3) {
        player.x = 16048;
        player.y = 160;
    } else if (current_level === 4) {
        player.x = 20064;
        player.y = 112;
    } else {
        player.x = 30;
        player.y = 195;
    }
};

// === Main Menu Scene ===
let menu_sel = 0;           // 0=START GAME, 1=CONTROLS, 2=CREDITS
let menu_sub = -1;          // -1=main menu, 0=controls screen, 1=credits screen, 2=level selector, 3=leaderboard, 5=profile selector
let menu_cooldown = 0;      // input cooldown to prevent rapid navigation
let menu_items = ['START GAME', 'CONTROLS', 'LEADERBOARDS'];
let saved_profiles: string[] = [];
let profile_sel = 0;

// === Pause State ===
let paused = false;
let pause_sel = 0;          // 0=RESUME, 1=CONTROLS, 2=MAIN MENU
let pause_cooldown = 0;
let pause_sub = -1;         // -1=pause menu, 0=controls screen
let pause_items = ['RESUME', 'CONTROLS', 'MAIN MENU'];

// Helper: draw readable controls screen on the canvas
function drawControlsScreen(btx: any, w: number, h: number, t: number) {
    // Dark background
    btx.fillStyle = '#0A0A2A';
    btx.fillRect(0, 0, w, h);

    // Title
    btx.font = '12px arcade';
    btx.textAlign = 'center';
    btx.textBaseline = 'top';
    btx.fillStyle = '#FFD700';
    btx.fillText('CONTROLS', w / 2, 6);

    // Separator line
    btx.fillStyle = '#8B6914';
    btx.fillRect(20, 22, w - 40, 2);

    // Column headers
    btx.font = '6px arcade';
    btx.textBaseline = 'top';
    btx.fillStyle = '#66CCFF';
    btx.textAlign = 'center';
    btx.fillText('KEYBOARD', w / 2 - 40, 27);
    btx.fillStyle = '#FF9966';
    btx.fillText('CONTROLLER', w / 2 + 50, 27);

    // Controls list: [action, keyboard key, controller key]
    let controls: string[][] = [
        ['MOVEMENT', '', ''],
        ['  WALK', 'A/D  ARROWS', 'L-STICK / D-PAD'],
        ['  JUMP', 'SPACE  UP', 'B BUTTON'],
        ['  CROUCH', 'S  DOWN', 'D-PAD DOWN'],
        ['  CLIMB', 'W/S ON VINES', 'L-STICK / D-PAD'],
        ['', '', ''],
        ['COMBAT', '', ''],
        ['  ATTACK', 'J', 'A BUTTON'],
        ['  SWAP WEAPON', 'R  or 1/2/3', 'X BUTTON'],
        ['  SHIELD', 'E (TOGGLE)', 'Y BUTTON'],
        ['', '', ''],
        ['SYSTEM', '', ''],
        ['  PAUSE', 'ESC / P', 'START'],
        ['  DEV CHEATS', '- KEY', 'SELECT'],
        ['  CAMERA', 'U / I / O', 'R-STICK'],
        ['  CONFIRM', 'ENTER', 'A BUTTON'],
    ];

    let startY = 38;
    for (let i = 0; i < controls.length; i++) {
        let y = startY + i * 12;
        let entry = controls[i];
        if (entry[1] == '' && entry[2] == '' && entry[0] != '') {
            // Section header
            btx.font = '6px arcade';
            btx.fillStyle = '#FFD700';
            btx.textAlign = 'left';
            btx.fillText(entry[0], 10, y);
        } else if (entry[0] != '') {
            // Action name (left)
            btx.font = '5px arcade';
            btx.fillStyle = '#CCCCCC';
            btx.textAlign = 'left';
            btx.fillText(entry[0], 10, y);
            // Keyboard key (center-left)
            btx.fillStyle = '#66CCFF';
            btx.textAlign = 'center';
            btx.fillText(entry[1], w / 2 - 40, y);
            // Controller key (center-right)
            btx.fillStyle = '#FF9966';
            btx.textAlign = 'center';
            btx.fillText(entry[2], w / 2 + 50, y);
        }
    }

    // Footer
    btx.font = '6px arcade';
    btx.textAlign = 'center';
    btx.textBaseline = 'bottom';
    btx.fillStyle = '#FFD700';
    let blink = Math.floor(t / 500) % 2 == 0;
    if (blink) btx.fillText('PRESS ENTER / A TO GO BACK', w / 2, h - 8);
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
        main.on('Enter,gp_1', e => { if (e.init) { menu_sub = -1; menu_cooldown = 300; } });
        main.on('Escape,gp_2', e => { if (e.init) { menu_sub = -1; menu_cooldown = 300; } });
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
        main.on('Enter,gp_1', e => { if (e.init) { menu_sub = -1; menu_cooldown = 300; } });
        main.on('Escape,gp_2', e => { if (e.init) { menu_sub = -1; menu_cooldown = 300; } });
        return;
    }
    if (menu_sub == 3) {
        // Leaderboard screen
        main.btx.fillStyle = '#0F0B1E';
        main.btx.fillRect(0, 0, main.w, main.h);

        main.btx.font = '14px arcade';
        main.btx.textAlign = 'center';
        main.btx.fillStyle = '#FFD700';
        main.btx.fillText('LEADERBOARDS', main.w / 2, 20);

        main.btx.font = '7px arcade';
        main.btx.fillStyle = '#C8A840';
        main.btx.textAlign = 'left';
        main.btx.fillText('RANK  NAME          SCORE   LEVEL', 35, 45);

        main.btx.fillStyle = '#8B6914';
        main.btx.fillRect(30, 55, main.w - 60, 2);

        let leaderboard = JSON.parse(localStorage.getItem('aswang_global_leaderboard') || '[]');
        main.btx.font = '7px arcade';
        main.btx.fillStyle = '#FFFFFF';

        for (let i = 0; i < 7; i++) {
            let y = 68 + i * 18;
            if (i < leaderboard.length) {
                let entry = leaderboard[i];
                let rankStr = (i + 1) + ".   ";
                let nameStr = (entry.name + "               ").substring(0, 13);
                let scoreStr = ("     " + entry.score).slice(-5);
                let lvStr = "    Lvl " + entry.maxLevel;
                main.btx.fillText(rankStr + nameStr + scoreStr + lvStr, 35, y);
            } else {
                main.btx.fillStyle = '#444444';
                main.btx.fillText((i + 1) + ".   ---           -----   ---", 35, y);
                main.btx.fillStyle = '#FFFFFF';
            }
        }

        main.btx.font = '6px arcade';
        main.btx.textAlign = 'center';
        main.btx.fillStyle = '#FFD700';
        let blink = Math.floor(t / 500) % 2 === 0;
        if (blink) {
            main.btx.fillText('PRESS ENTER TO GO BACK', main.w / 2, main.h - 12);
        }

        main.on('Enter,gp_1', e => { if (e.init) { menu_sub = -1; menu_cooldown = 300; } });
        main.on('Escape,gp_2', e => { if (e.init) { menu_sub = -1; menu_cooldown = 300; } });
        return;
    }
    if (menu_sub == 2) {
        // Level selection screen
        main.btx.fillStyle = '#0A0A1A';
        main.btx.fillRect(0, 0, main.w, main.h);

        main.btx.font = '12px arcade';
        main.btx.textAlign = 'center';
        main.btx.fillStyle = '#FFD700';
        main.btx.fillText('CHOOSE LEVEL', main.w / 2, 30);

        let maxLvl = player_record ? player_record.maxLevel : 1;

        let lv_items = [
            'LEVEL 1: FINDING CLUES',
            'LEVEL 2: THE DARK FOREST',
            'LEVEL 3: THE FINAL CONFRONTATION',
            'BOSS LEVEL: THE FINAL BATTLE',
            'BACK'
        ];

        for (let i = 0; i < lv_items.length; i++) {
            let itemY = 65 + i * 24;
            let selected = (i === level_sel);
            let locked = false;
            if (i < 4) {
                let requiredLvl = i === 3 ? 3 : (i + 1);
                locked = (requiredLvl > maxLvl);
            }

            if (selected) {
                main.btx.fillStyle = 'rgba(212, 168, 48, 0.2)';
                main.btx.fillRect(20, itemY - 4, main.w - 40, 16);
            }
            if (selected && Math.floor(t / 400) % 2 === 0) {
                main.btx.font = '9px arcade';
                main.btx.fillStyle = '#FFD700';
                main.btx.textAlign = 'right';
                main.btx.textBaseline = 'top';
                main.btx.fillText('>', 40, itemY);
            }

            main.btx.font = '8px arcade';
            main.btx.textAlign = 'center';
            main.btx.textBaseline = 'top';
            if (locked) {
                main.btx.fillStyle = '#555555';
                main.btx.fillText('LOCKED', main.w / 2, itemY);
            } else {
                main.btx.fillStyle = selected ? '#FFFFFF' : '#888888';
                main.btx.fillText(lv_items[i], main.w / 2, itemY);
            }
        }

        main.on('w,W,ArrowUp,gp_n', e => {
            if (e.init && menu_cooldown <= 0) {
                level_sel = (level_sel - 1 + lv_items.length) % lv_items.length;
                menu_cooldown = 150;
            }
        });
        main.on('s,S,ArrowDown,gp_s', e => {
            if (e.init && menu_cooldown <= 0) {
                level_sel = (level_sel + 1) % lv_items.length;
                menu_cooldown = 150;
            }
        });
        main.on('Enter,gp_1', e => {
            if (e.init && menu_cooldown <= 0) {
                menu_cooldown = 300;
                if (level_sel === 4) {
                    menu_sub = -1;
                } else {
                    let requiredLvl = level_sel === 3 ? 3 : (level_sel + 1);
                    let locked = (requiredLvl > maxLvl);
                    if (!locked) {
                        startLevel(level_sel + 1);
                    }
                }
            }
        });
        main.on('Escape,gp_2', e => { if (e.init) { menu_sub = -1; menu_cooldown = 300; } });
        return;
    }
    if (menu_sub == 4) {
        // Draw Name Entry Screen
        main.btx.fillStyle = '#0A0A1A';
        main.btx.fillRect(0, 0, main.w, main.h);

        main.btx.font = '12px arcade';
        main.btx.textAlign = 'center';
        main.btx.fillStyle = '#FFD700';
        main.btx.fillText('ENTER YOUR NAME', main.w / 2, 60);

        // Draw input box
        let boxX = 60, boxY = 90, boxW = 200, boxH = 24;
        main.btx.fillStyle = 'rgba(139, 105, 20, 0.3)';
        main.btx.fillRect(boxX, boxY, boxW, boxH);
        main.btx.strokeStyle = '#D4A830';
        main.btx.lineWidth = 1.5;
        main.btx.strokeRect(boxX, boxY, boxW, boxH);

        // Draw current name text
        main.btx.font = '10px arcade';
        main.btx.textAlign = 'left';
        main.btx.textBaseline = 'middle';
        main.btx.fillStyle = '#FFFFFF';

        let displayName = current_player_name;
        let blink = Math.floor(t / 400) % 2 === 0;
        if (blink) displayName += '_';

        main.btx.fillText(displayName, boxX + 10, boxY + boxH / 2);

        // Draw instructions
        main.btx.font = '5px arcade';
        main.btx.textAlign = 'center';
        main.btx.fillStyle = '#AAAAAA';
        main.btx.fillText('USE KEYBOARD TO TYPE  -  MAX 12 CHARACTERS', main.w / 2, 140);
        main.btx.fillText('PRESS ENTER TO CONFIRM  -  ESC TO BACK', main.w / 2, 155);

        // Handle input events
        Object.keys(main.evented).forEach(key => {
            let ev = main.evented[key];
            if (ev.init) {
                ev.init = false; // consume event

                if (key === 'Backspace') {
                    if (current_player_name.length > 0) {
                        current_player_name = current_player_name.slice(0, -1);
                    }
                } else if (key === 'Enter') {
                    if (current_player_name.trim().length > 0) {
                        let record = JSON.parse(localStorage.getItem('aswang_leaderboard_' + current_player_name) || '{"maxLevel": 1, "highScore": 0}');
                        player_record = record;
                        menu_cooldown = 300;
                        if (record.maxLevel > 1) {
                            menu_sub = 2; // Level Selector
                            level_sel = 0;
                        } else {
                            startLevel(1);
                            main.scene('into');
                        }
                    }
                } else if (key === 'Escape') {
                    menu_sub = -1;
                    menu_cooldown = 300;
                } else if (key.length === 1 && current_player_name.length < 12) {
                    if (/^[a-zA-Z0-9 ]$/.test(key)) {
                        current_player_name += key;
                    }
                }
            }
        });
        return;
    }

    if (menu_sub == 5) {
        // Profile selection screen
        main.btx.fillStyle = '#0A0A1A';
        main.btx.fillRect(0, 0, main.w, main.h);

        main.btx.font = '12px arcade';
        main.btx.textAlign = 'center';
        main.btx.fillStyle = '#FFD700';
        main.btx.fillText('SELECT PROFILE', main.w / 2, 30);

        let items = [...saved_profiles, 'NEW PROFILE', 'BACK'];

        for (let i = 0; i < items.length; i++) {
            let itemY = 65 + i * 20;
            let selected = (i === profile_sel);

            if (selected) {
                main.btx.fillStyle = 'rgba(212, 168, 48, 0.2)';
                main.btx.fillRect(20, itemY - 4, main.w - 40, 16);
            }
            if (selected && Math.floor(t / 400) % 2 === 0) {
                main.btx.font = '9px arcade';
                main.btx.fillStyle = '#FFD700';
                main.btx.textAlign = 'right';
                main.btx.textBaseline = 'top';
                main.btx.fillText('>', 40, itemY);
            }

            main.btx.font = '8px arcade';
            main.btx.textAlign = 'center';
            main.btx.textBaseline = 'top';
            main.btx.fillStyle = selected ? '#FFFFFF' : '#888888';
            main.btx.fillText(items[i], main.w / 2, itemY);
        }

        main.on('w,W,ArrowUp,gp_n', e => {
            if (e.init && menu_cooldown <= 0) {
                profile_sel = (profile_sel - 1 + items.length) % items.length;
                menu_cooldown = 150;
            }
        });
        main.on('s,S,ArrowDown,gp_s', e => {
            if (e.init && menu_cooldown <= 0) {
                profile_sel = (profile_sel + 1) % items.length;
                menu_cooldown = 150;
            }
        });
        main.on('Enter,gp_1', e => {
            if (e.init && menu_cooldown <= 0) {
                menu_cooldown = 300;
                if (profile_sel === items.length - 1) {
                    // BACK
                    menu_sub = -1;
                } else if (profile_sel === items.length - 2) {
                    // NEW PROFILE
                    current_player_name = "";
                    menu_sub = 4;
                } else {
                    // Loaded existing profile
                    current_player_name = items[profile_sel];
                    let record = JSON.parse(localStorage.getItem('aswang_leaderboard_' + current_player_name) || '{"maxLevel": 1, "highScore": 0}');
                    player_record = record;
                    
                    if (record.saved_checkpoint) {
                        startLevel(record.saved_checkpoint.level, true);
                    } else if (record.maxLevel > 1) {
                        menu_sub = 2; // Level Selector
                        level_sel = 0;
                    } else {
                        startLevel(1);
                        main.scene('into');
                    }
                }
            }
        });
        main.on('Escape,gp_2', e => { if (e.init) { menu_sub = -1; menu_cooldown = 300; } });
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
    main.btx.fillText('W/S  ARROWS  D-PAD TO NAVIGATE  -  ENTER / A TO SELECT', main.w / 2, main.h - 10);

    // === Navigation input ===
    main.on('w,W,ArrowUp,gp_n', e => {
        if (e.init && menu_cooldown <= 0) {
            menu_sel = (menu_sel - 1 + menu_items.length) % menu_items.length;
            menu_cooldown = 150;
        }
    });
    main.on('s,S,ArrowDown,gp_s', e => {
        if (e.init && menu_cooldown <= 0) {
            menu_sel = (menu_sel + 1) % menu_items.length;
            menu_cooldown = 150;
        }
    });
    main.on('Enter,gp_1', e => {
        if (e.init && menu_cooldown <= 0) {
            menu_cooldown = 300;
            if (menu_sel == 0) {
                saved_profiles = [];
                for (let i = 0; i < localStorage.length; i++) {
                    let key = localStorage.key(i);
                    if (key && key.startsWith('aswang_leaderboard_')) {
                        saved_profiles.push(key.substring('aswang_leaderboard_'.length));
                    }
                }
                if (saved_profiles.length > 0) {
                    menu_sub = 5; // Profile Selection Screen
                    profile_sel = 0;
                } else {
                    current_player_name = "";
                    menu_sub = 4; // Name Entry Screen
                }
            } else if (menu_sel == 1) {
                menu_sub = 0; // Controls
            } else if (menu_sel == 2) {
                menu_sub = 3; // Leaderboards
            }
        }
    });
});

// === Intro Scene ===
let load_level = () => {
    if (v && v.parentNode) document.body.removeChild(v);
    main.scene('level');
};
main.scene('into', (t, dt) => {
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

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    let words = text.split(' ');
    let lines: string[] = [];
    let currentLine = '';

    for (let word of words) {
        let testLine = currentLine ? currentLine + ' ' + word : word;
        let metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) {
        lines.push(currentLine);
    }
    return lines;
}

// Level Scene
main.scene('level', (t, dt) => {
    if (dt > 100) return;

    // Decrement level title timer
    if (level_title_timer > 0) {
        level_title_timer -= dt;
    }

    let drawLevelTitle = () => {
        if (level_title_timer > 0) {
            let alpha = 1;
            if (level_title_timer > 2500) {
                alpha = (3000 - level_title_timer) / 500;
            } else if (level_title_timer < 1000) {
                alpha = level_title_timer / 1000;
            }

            main.btx.save();
            main.btx.globalAlpha = alpha;

            // Banner background
            main.btx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            main.btx.fillRect(0, main.h / 2 - 25, main.w, 40);

            // Golden borders
            main.btx.fillStyle = '#FFD700';
            main.btx.fillRect(0, main.h / 2 - 25, main.w, 2);
            main.btx.fillRect(0, main.h / 2 + 13, main.w, 2);

            // Title text
            main.btx.font = '16px arcade';
            main.btx.textAlign = 'center';
            main.btx.textBaseline = 'middle';

            // Drop shadow
            main.btx.fillStyle = '#000000';
            main.btx.fillText(level_title_text, main.w / 2 + 1, main.h / 2 - 5 + 1);

            // Main text
            main.btx.fillStyle = '#FFD700';
            main.btx.fillText(level_title_text, main.w / 2, main.h / 2 - 5);

            // Subtitle
            main.btx.font = '6px arcade';
            let subtitle = "";
            let active_lv = current_level;
            if (active_lv === 1) subtitle = "FINDING CLUES";
            else if (active_lv === 2) subtitle = "THE DARK FOREST";
            else if (active_lv === 3) subtitle = "THE FINAL CONFRONTATION";

            main.btx.fillStyle = '#FFFFFF';
            main.btx.fillText(subtitle, main.w / 2, main.h / 2 + 7);

            main.btx.restore();
        }
    };

    // === Dialogue Overlay ===
    if (active_dialogue !== null) {
        dialogue_cooldown -= dt;

        main.btx.save();

        // Draw level label first (so it's layered behind the dialogue box and appears below it)
        drawLevelTitle();

        // Draw dialog box at bottom of screen
        main.btx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        main.btx.fillRect(10, main.h - 60, main.w - 20, 50);

        main.btx.strokeStyle = '#D4A830';
        main.btx.lineWidth = 1.5;
        main.btx.strokeRect(10, main.h - 60, main.w - 20, 50);

        let current_line = active_dialogue[dialogue_index];

        // Speaker name
        main.btx.font = '8px arcade';
        main.btx.fillStyle = '#FFD700';
        main.btx.textAlign = 'left';
        main.btx.fillText(current_line.speaker, 20, main.h - 50);

        // Dialog text (wrapped)
        main.btx.font = '6px arcade';
        main.btx.fillStyle = '#FFFFFF';
        let lines = wrapText(main.btx, current_line.text, main.w - 40);
        lines.forEach((line, idx) => {
            main.btx.fillText(line, 20, main.h - 38 + idx * 8);
        });

        // Press Enter hint
        main.btx.font = '5px arcade';
        main.btx.fillStyle = '#AAAAAA';
        main.btx.textAlign = 'right';
        main.btx.fillText('PRESS ENTER', main.w - 20, main.h - 18);

        main.btx.restore();

        player.m[0] = 0;

        main.on('Enter', e => {
            if (e.init && dialogue_cooldown <= 0) {
                dialogue_cooldown = 200;
                dialogue_index++;
                if (dialogue_index >= active_dialogue.length) {
                    let postCallback = dialogue_post_callback;
                    active_dialogue = null;
                    dialogue_post_callback = null;
                    if (postCallback) postCallback();
                }
            }
        });
        return;
    }

    // === Shop Overlay ===
    if (active_shop !== null) {
        shop_cooldown -= dt;

        main.btx.save();

        // Dim screen background slightly
        main.btx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        main.btx.fillRect(0, 0, main.w, main.h);

        // Shop board
        let sBoardX = 40, sBoardY = 50, sBoardW = 240, sBoardH = 140;
        main.btx.fillStyle = 'rgba(20, 15, 10, 0.95)';
        main.btx.fillRect(sBoardX, sBoardY, sBoardW, sBoardH);
        main.btx.strokeStyle = '#8B6914';
        main.btx.lineWidth = 2;
        main.btx.strokeRect(sBoardX, sBoardY, sBoardW, sBoardH);
        main.btx.strokeStyle = '#D4A830';
        main.btx.lineWidth = 1;
        main.btx.strokeRect(sBoardX + 3, sBoardY + 3, sBoardW - 6, sBoardH - 6);

        // Shop Title
        main.btx.font = '10px arcade';
        main.btx.textAlign = 'center';
        main.btx.fillStyle = '#FFD700';
        main.btx.fillText('ALBULARYO SHOP', main.w / 2, sBoardY + 12);

        // Currency display
        main.btx.font = '6px arcade';
        main.btx.fillStyle = '#FFFFFF';
        main.btx.fillText('YOUR ESSENCE: ' + player.points, main.w / 2, sBoardY + 24);

        // Split Layout: Left Menu, Right Preview
        let menuX = sBoardX + 12;
        let previewCenterX = sBoardX + 175;

        let shop_items = [
            'AGUA BENDITA',
            'SALT POUCH',
            'HEALING FOOD',
            'EXIT SHOP'
        ];

        // Draw Menu Items
        for (let i = 0; i < shop_items.length; i++) {
            let itemY = sBoardY + 40 + i * 22;
            let selected = (i === shop_sel);

            if (selected) {
                main.btx.fillStyle = 'rgba(212, 168, 48, 0.2)';
                main.btx.fillRect(menuX - 4, itemY - 4, 110, 16);
            }
            if (selected && Math.floor(t / 400) % 2 === 0) {
                main.btx.font = '8px arcade';
                main.btx.fillStyle = '#FFD700';
                main.btx.textAlign = 'left';
                main.btx.textBaseline = 'top';
                main.btx.fillText('>', menuX, itemY);
            }
            main.btx.font = '7px arcade';
            main.btx.textAlign = 'left';
            main.btx.textBaseline = 'top';
            main.btx.fillStyle = selected ? '#FFFFFF' : '#888888';
            main.btx.fillText(shop_items[i], menuX + 10, itemY);
        }

        // Draw Highlighted Item Preview on the Right
        if (shop_sel >= 0 && shop_sel < 3) {
            // Draw Icon Box
            let boxSize = 32;
            let boxX = previewCenterX - boxSize / 2;
            let boxY = sBoardY + 40;
            main.sprites('Icon Box.png', [boxX, boxY, 2, 2], [0, 0, 0, 0, 16, 16]);

            // Draw Item Icon inside box
            let iconAsset = '';
            if (shop_sel === 0) iconAsset = 'CrossIcon.png';
            else if (shop_sel === 1) iconAsset = 'Asin Pouch.png';
            else if (shop_sel === 2) iconAsset = 'Food Icon Chicken and Rice.png';

            if (iconAsset) {
                main.sprites(iconAsset, [boxX + 8, boxY + 8], [0, 0, 0, 0, 16, 16]);
            }

            // Draw Price
            let cost = (shop_sel === 0 || shop_sel === 2) ? 3 : 2;
            main.btx.font = '7px arcade';
            main.btx.textAlign = 'center';
            main.btx.fillStyle = '#FFD700';
            main.btx.fillText(cost + ' ESSENCE', previewCenterX, boxY + 42);

            // Draw Description
            main.btx.font = '5px arcade';
            main.btx.fillStyle = '#CCCCCC';
            let descLines: string[] = [];
            if (shop_sel === 0) {
                descLines = ['5 CHARGES', 'CROSS SHIELD'];
            } else if (shop_sel === 1) {
                descLines = ['10 CHARGES', 'ASIN AMMO'];
            } else if (shop_sel === 2) {
                descLines = ['RECOVERY OF', '+2 HEARTS'];
            }

            descLines.forEach((line, idx) => {
                main.btx.fillText(line, previewCenterX, boxY + 54 + idx * 7);
            });
        } else if (shop_sel === 3) {
            // Draw Exit Sign
            main.btx.font = '6px arcade';
            main.btx.textAlign = 'center';
            main.btx.fillStyle = '#FF5555';
            main.btx.fillText('EXIT TO FOREST', previewCenterX, sBoardY + 70);
        }

        // Draw Button Guide at the bottom of the board (shortened to prevent overflow)
        main.btx.font = '5px arcade';
        main.btx.textAlign = 'center';
        main.btx.fillStyle = '#888888';
        main.btx.fillText('W/S OR ARROWS: CHOOSE  -  ENTER: BUY', main.w / 2, sBoardY + sBoardH - 8);

        main.btx.restore();

        player.m[0] = 0;

        main.on('w,W,ArrowUp', e => {
            if (e.init && shop_cooldown <= 0) {
                shop_sel = (shop_sel - 1 + shop_items.length) % shop_items.length;
                shop_cooldown = 150;
            }
        });
        main.on('s,S,ArrowDown', e => {
            if (e.init && shop_cooldown <= 0) {
                shop_sel = (shop_sel + 1) % shop_items.length;
                shop_cooldown = 150;
            }
        });

        main.on('Enter', e => {
            if (e.init && shop_cooldown <= 0) {
                shop_cooldown = 300;
                if (shop_sel === 3) {
                    active_shop.npc.claimed = true;
                    active_shop = null;
                } else {
                    let cost = (shop_sel === 0 || shop_sel === 2) ? 3 : 2;
                    if (player.points >= cost) {
                        player.points -= cost;
                        if (shop_sel === 0) {
                            player.weapons[2].durability += 5;
                        } else if (shop_sel === 1) {
                            player.weapons[1].durability += 10;
                        } else if (shop_sel === 2) {
                            player.lives[0] = Math.min(player.lives[0] + 2, player.lives[1]);
                        }
                        main.play('sfx/Picked Up Something Good.mp3', true);
                    } else {
                        let npcName = active_shop.npc['__type__'] === 'albularyo' ? 'ALBULARYO' : 'NPC';
                        let npcRef = active_shop.npc;
                        active_shop = null;
                        active_dialogue = [
                            { speaker: npcName, text: "You do not have enough Aswang Essence." }
                        ];
                        dialogue_index = 0;
                        dialogue_cooldown = 300;
                        dialogue_post_callback = () => {
                            active_shop = { npc: npcRef };
                            shop_sel = 0;
                            shop_cooldown = 300;
                        };
                    }
                }
            }
        });
        return;
    }

    // === Ending Overlay ===
    if (ending_active) {
        main.btx.save();
        main.btx.fillStyle = '#000000';
        main.btx.fillRect(0, 0, main.w, main.h);

        // Draw You Win background image
        main.sprites('You Win.png', [], [0, 0, 0, 0, 320, 240, 0, 0, 0, 0, 0, 0]);

        // Draw Victory Subtitles at the top (sky area) with a clear outline
        let drawOutlinedText = (text: string, x: number, y: number, color: string, font: string) => {
            main.btx.font = font;
            main.btx.textAlign = 'center';
            main.btx.strokeStyle = '#000000';
            main.btx.lineWidth = 3;
            main.btx.strokeText(text, x, y);
            main.btx.fillStyle = color;
            main.btx.fillText(text, x, y);
        };

        drawOutlinedText('YOU DEFEATED THE ASWANG KING', main.w / 2, 35, '#FFFFFF', '8px arcade');
        drawOutlinedText('AND SAVED YOUR PARTNER!', main.w / 2, 48, '#FFFFFF', '8px arcade');

        let p = algo.score(player);
        drawOutlinedText('FINAL SCORE: ' + p, main.w / 2, 145, '#FFD700', '8px arcade');

        let blink = Math.floor(t / 500) % 2 === 0;
        if (blink) {
            drawOutlinedText('PRESS ENTER TO RETURN TO MENU', main.w / 2, 190, '#FFFFFF', '6px arcade');
        }

        main.btx.restore();

        main.on('Enter', e => {
            if (e.init) {
                if (current_player_name) {
                    if (player_record && player_record.maxLevel < 3) {
                        player_record.maxLevel = 3;
                    }
                    if (p > player_record.highScore) {
                        player_record.highScore = p;
                    }
                    localStorage.setItem('aswang_leaderboard_' + current_player_name, JSON.stringify(player_record));

                    let leaderboard = JSON.parse(localStorage.getItem('aswang_global_leaderboard') || '[]');
                    leaderboard = leaderboard.filter(el => el.name !== current_player_name);
                    leaderboard.push({ name: current_player_name, score: p, maxLevel: player_record.maxLevel });
                    leaderboard.sort((a, b) => b.score - a.score);
                    localStorage.setItem('aswang_global_leaderboard', JSON.stringify(leaderboard.slice(0, 10)));
                }

                ending_active = false;
                king_defeated = false;
                partner_spawned = false;
                menu_sel = 0;
                menu_sub = 1;
                window.location.reload();
            }
        });
        return;
    }

    // === Check Aswang King Death ===
    if (current_level === 3 && !king_defeated) {
        let king_entity = null;
        let l = Math.floor(player.x / 480);
        for (var n = -2; n <= 2; n++) {
            if (l + n >= 0 && l + n < lv.length) {
                let section = lv[l + n];
                for (let j = 0; j < section.length; j++) {
                    if (section[j]['__type__'] === 'king') {
                        king_entity = section[j];
                        break;
                    }
                }
            }
        }
        if (king_entity && (king_entity.dead !== -1 || king_entity.removed)) {
            king_defeated = true;
        }
    }

    if (king_defeated && !partner_spawned) {
        partner_spawned = true;
        platforms[42].push(main.entity('mc_partner', { x: 20555, y: 125 }));
    }

    // === Pause toggle ===
    main.on('Escape', e => {
        if (e.init) {
            if (cheat_menu_open) { cheat_menu_open = false; cheat_cooldown = 300; }
            else if (pause_sub == 0) { pause_sub = -1; pause_cooldown = 300; }
            else { paused = !paused; pause_sel = 0; pause_sub = -1; pause_cooldown = 300; }
        }
    });
    main.on('p,P,gp_start', e => {
        if (e.init && pause_sub == -1) { paused = !paused; pause_sel = 0; pause_sub = -1; pause_cooldown = 300; }
    });

    // === Cheat Menu ===
    main.on('-,_,gp_select', e => {
        if (e.init) {
            cheat_menu_open = !cheat_menu_open;
            cheat_sel = 0;
            cheat_cooldown = 300;
        }
    });

    if (cheat_menu_open) {
        cheat_cooldown -= dt;

        // Dim overlay
        main.btx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        main.btx.fillRect(0, 0, main.w, main.h);

        // Title
        main.btx.font = '14px arcade';
        main.btx.textAlign = 'center';
        main.btx.textBaseline = 'top';
        main.btx.fillStyle = '#FF3333';
        main.btx.fillText('DEV CHEATS', main.w / 2, 40);

        // Board frame
        let cBoardX = 50, cBoardY = 58, cBoardW = 220, cBoardH = 170;
        main.btx.fillStyle = 'rgba(26, 10, 10, 0.9)';
        main.btx.fillRect(cBoardX, cBoardY, cBoardW, cBoardH);
        main.btx.strokeStyle = '#8B0000';
        main.btx.lineWidth = 2;
        main.btx.strokeRect(cBoardX, cBoardY, cBoardW, cBoardH);
        main.btx.strokeStyle = '#FF3333';
        main.btx.lineWidth = 1;
        main.btx.strokeRect(cBoardX + 3, cBoardY + 3, cBoardW - 6, cBoardH - 6);

        // Menu items
        for (let i = 0; i < cheat_items.length; i++) {
            let itemY = cBoardY + 12 + i * 17;
            let selected = (i == cheat_sel);

            if (selected) {
                main.btx.fillStyle = 'rgba(255, 51, 51, 0.2)';
                main.btx.fillRect(cBoardX + 6, itemY - 3, cBoardW - 12, 14);
            }
            if (selected && Math.floor(t / 400) % 2 == 0) {
                main.btx.font = '8px arcade';
                main.btx.fillStyle = '#FF3333';
                main.btx.textAlign = 'right';
                main.btx.textBaseline = 'top';
                main.btx.fillText('>', cBoardX + 18, itemY);
            }
            main.btx.font = '8px arcade';
            main.btx.textAlign = 'center';
            main.btx.textBaseline = 'top';
            main.btx.fillStyle = selected ? '#FFFFFF' : '#888888';
            main.btx.fillText(cheat_items[i], main.w / 2, itemY);
        }

        // Navigation
        main.on('w,W,ArrowUp,gp_n', e => {
            if (e.init && cheat_cooldown <= 0) {
                cheat_sel = (cheat_sel - 1 + cheat_items.length) % cheat_items.length;
                cheat_cooldown = 150;
            }
        });
        main.on('s,S,ArrowDown,gp_s', e => {
            if (e.init && cheat_cooldown <= 0) {
                cheat_sel = (cheat_sel + 1) % cheat_items.length;
                cheat_cooldown = 150;
            }
        });
        main.on('Enter,gp_1', e => {
            if (e.init && cheat_cooldown <= 0) {
                cheat_cooldown = 300;
                if (cheat_sel == 0) {
                    player.x = 30;
                    player.y = 195;
                    player.max_x = 30;
                    player.farthest_checkpoint_x = -1;
                    player.lives[0] = player.lives[1];
                    cheat_menu_open = false;
                    main.play('sfx/Picked Up Something Good.mp3', true);
                } else if (cheat_sel == 1) {
                    player.x = 8032;
                    player.y = 160;
                    player.max_x = 8032;
                    player.farthest_checkpoint_x = -1;
                    player.lives[0] = player.lives[1];
                    cheat_menu_open = false;
                    main.play('sfx/Picked Up Something Good.mp3', true);
                } else if (cheat_sel == 2) {
                    player.x = 16048;
                    player.y = 160;
                    player.max_x = 16048;
                    player.farthest_checkpoint_x = -1;
                    player.lives[0] = player.lives[1];
                    cheat_menu_open = false;
                    main.play('sfx/Picked Up Something Good.mp3', true);
                } else if (cheat_sel == 3) {
                    player.x = 20064;
                    player.y = 112;
                    player.max_x = 20064;
                    player.farthest_checkpoint_x = -1;
                    player.lives[0] = player.lives[1];
                    cheat_menu_open = false;
                    main.play('sfx/Picked Up Something Good.mp3', true);
                } else if (cheat_sel == 4) {
                    player.lives[0] = Math.min(player.lives[0] + 5, player.lives[1]);
                    cheat_menu_open = false;
                    main.play('sfx/Picked Up Something Good.mp3', true);
                } else if (cheat_sel == 5) {
                    player.lives[0] = 1;
                    cheat_menu_open = false;
                    main.play('sfx/Picked Up Something Good.mp3', true);
                } else if (cheat_sel == 6) {
                    for (let i = 0; i < platforms.length; i++) {
                        let section = platforms[i];
                        if (!section) continue;
                        for (let j = 0; j < section.length; j++) {
                            if (section[j]['__type__'] === 'king') {
                                section[j].lives[1] = 1;
                            }
                        }
                    }
                    cheat_menu_open = false;
                    main.play('sfx/Picked Up Something Good.mp3', true);
                } else if (cheat_sel == 7) {
                    player.weapons[1].durability = 10;
                    player.weapons[2].durability = 5;
                    cheat_menu_open = false;
                    main.play('sfx/Picked Up Something Good.mp3', true);
                } else if (cheat_sel == 8) {
                    cheat_menu_open = false;
                }
            }
        });
        return;
    }

    // === Pause Menu ===
    if (paused) {
        pause_cooldown -= dt;

        // Controls sub-screen within pause
        if (pause_sub == 0) {
            drawControlsScreen(main.btx, main.w, main.h, t);
            main.on('Enter,gp_1', e => { if (e.init) { pause_sub = -1; pause_cooldown = 300; } });
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
        main.on('w,W,ArrowUp,gp_n', e => {
            if (e.init && pause_cooldown <= 0) {
                pause_sel = (pause_sel - 1 + pause_items.length) % pause_items.length;
                pause_cooldown = 150;
            }
        });
        main.on('s,S,ArrowDown,gp_s', e => {
            if (e.init && pause_cooldown <= 0) {
                pause_sel = (pause_sel + 1) % pause_items.length;
                pause_cooldown = 150;
            }
        });
        main.on('Enter,gp_1', e => {
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
    off = player.dead == -1 ? 0 : Math.floor(Math.sin(player.dead * Math.PI) * 3);

    if (player.player_lives <= 0) {
        menu.over = true;
        main.add(menu);
        main.on('Enter', e => {
            if (e.init) {
                player.highscore = algo.score(player);
                player.points = 0;
                menu.over = false;
                player.lives = [3, 3];
                player.player_lives = 3;
                player.max_x = player.x = 30;
                player.y = 195;
                player.farthest_checkpoint_x = -1;
                player.dead = -1;
                player.m = [0, 0];
                player.climb = player.poisoned = -1;
                player.canclimb = false;
                bg.night = false;
                bg.day = 1;
                player.total_essence = 0;
                main.camera = [-160, 0];
                if (player.weapons) {
                    player.weapons[0].durability = 1000000;
                    player.weapons[1].durability = 0;
                    player.weapons[2].durability = 0;
                    player.cur_weapon = 0;
                }
                platforms = setupPlatforms();
                lv = level(main);
                adjustLevelEssenceCount(lv);
                current_level = 0;
                king_defeated = false;
                partner_spawned = false;
                ending_active = false;
                menu_sel = 0;
                menu_sub = -1;
                main.scene('main_menu');
            }
        });
        return;
    } else menu.over = false;

    // Layers
    main.add(bg);
    let l = Math.floor(player.x / 480);
    for (var n = -2; n <= 2; n++) {
        if (l + n >= 0 && l + n < platforms.length) main.add(platforms[l + n]);
    }
    if (player.canclimb && main.on('w,W,s,S,ArrowUp,ArrowDown')) { player.climb = 1; player.m = [0, 0] }
    main.add(menu, pet, main.player);
    // Render checkpoints on top of grass blocks (after player layer)
    for (var n = -2; n <= 2; n++) {
        if (l + n >= 0 && l + n < platforms.length) {
            let sec = platforms[l + n];
            for (let j = 0; j < sec.length; j++) {
                if (sec[j]['__type__'] === 'checkpoint') main.add(sec[j]);
            }
        }
    }
    for (var n = -2; n <= 2; n++) {
        if (l + n >= 0 && l + n < lv.length) main.add(lv[l + n]);
    }

    // Music
    if (player.ground != -1 && player.ground < main.interacts.length && [0, 1, 2].indexOf(main.interacts[player.ground].mode) != -1) {
        bg_song_fade_to = main.interacts[player.ground].mode;
    }
    for (var i = 0; i < bg_song.length; i++) {
        bg_song[i] += (i == bg_song_fade_to ? 1 - bg_song[i] : -bg_song[i]) * dt / 1000;
        main.play(bg_songs[i], false, bg_song[i]);
    }


    // Developer Tools
    if (main.on('x')) lv[0][0].darkmode = !lv[0][0].darkmode;
    main.on('z', e => {
        if (e.init) main.sprite_boxed = main.hitbox_boxed = main.rotate_boxed = !main.sprite_boxed;
    });
    main.on('h', e => {
        if (e.init) main.hitbox_boxed = !main.hitbox_boxed;
    });

    // Background
    if (player.ground != -1) {
        let o = main.interacts[player.ground];
        bg.night = o['__type__'] == 'plat' && o.mode != 0;
    }

    // Player Controls
    main.on('gp_j0', e => {
        player.camera = e.x * 100;
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
        if (e.init && player.swinging < 0.1) player.swing = true;
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
        if (main.on(' ,ArrowUp,gp_2')) {
            player.m[1] = 20 * (player.poisoned >= 0 ? 0.75 : 1);
            player.climb = -1;
        } else if (main.on('d,D,ArrowRight,gp_e,a,A,ArrowLeft,gp_w')) {
            player.climb = (Math.sin(t / 200) + 1) / 2;
            if (main.on('d,D,ArrowRight,gp_e')) player.x += dt / 10;
            else player.x -= dt / 10;
        } else if (main.on('w,W,gp_n,s,S,gp_s,ArrowUp,ArrowDown')) {
            main.play('sfx/vines.mp3', false, 0.5);
            player.climb = (Math.sin(t / 100) + 1) / 2;
            player.y += (main.on('w,W,gp_n,ArrowUp') ? -1 : 1) * dt / 10;
        } else player.climb = 0;
        player.climing = true;
    }

    if (main.on(' ,ArrowUp,gp_2') && player.ground != -1) {
        player.m[1] = 20 * (!player.protection && player.poisoned >= 0 ? 0.75 : 1);
    } else if (main.on('s,S,ArrowDown,gp_s')) {
        player.crouch = true;
        player.m[0] = 0;
    } else if (player.crouch) {
        player.crouch = player.jumping = false;
    } else if (main.on('d,D,ArrowRight,gp_e')) player.m[0] = 8 * player.speed_rate;
    else if (main.on('a,A,ArrowLeft,gp_w')) player.m[0] = -8 * player.speed_rate;
    else player.m[0] = 0;

    // === Level Title Overlay ===
    let active_lv = 1;
    if (player.x >= 16000) {
        active_lv = 3;
    } else if (player.x >= 8000) {
        active_lv = 2;
    }

    if (current_level !== active_lv) {
        current_level = active_lv;
        level_title_timer = 3000;
        level_title_text = "LEVEL " + active_lv;

        // Update level unlocks in leaderboard
        if (current_player_name) {
            let record = JSON.parse(localStorage.getItem('aswang_leaderboard_' + current_player_name) || '{"maxLevel": 1, "highScore": 0}');
            if (active_lv > record.maxLevel) {
                record.maxLevel = active_lv;
                localStorage.setItem('aswang_leaderboard_' + current_player_name, JSON.stringify(record));
                player_record = record;
            }
        }
    }

    drawLevelTitle();

    // Reset

});
main.render();

main.filter = d => {
    var w = main.w * main.z;
    var h = main.h * main.z;
    var t = ((new Date()).getTime() - main.time_init.getTime()) * 10;
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var p = (x + y * w) * 4;
            var o = 255 - 255 * Math.max(Math.hypot(x - w / 2, y - h / 2) - 7 * w / 20, 0) / Math.min(w, h);
            if (y % 2 == 0) o *= (w * y / 2 + x - t) * 0.000001 % 0.02 + 0.98;
            if (off != 0) {
                d.data[p + 1] = d.data[p + 1 + off * 4];
                d.data[p + 3] = d.data[p + 3 + off * 4];
            }
            d.data[p + 3] = Math.floor(o);
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

// Expose objects to global window scope for console debugging
(window as any).player = player;
(window as any).main = main;
(window as any).platforms = platforms;