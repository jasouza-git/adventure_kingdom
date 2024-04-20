import { entities_type } from "../types";
import { algo } from "../algorithms";

let required_files:string[] = [
    // Menu
    'Rise_of_the_Aswang_King.png',
    // Background
    'Housesv2.png', 'mountainsprite.png', 'moonSprite.png', 'Cloudsv1 (1).png', 'Game Over.png',
    // Platforms
    'Flowers.png', 'Bgitems.png', 'Blocksv2.png', 'Treesv2.png', 'Lava.png',
    // Entities
    'Dog.png', 'Cat (1).png', 'Aswang KingV2.png', 'Arrow.png', 'Shooterv2.png', 'TakeoutSalt.png',
    // Objects
    'Vine.png', 'Tripwire2Correct.png', 'pressure.png', 'Aswang Essencecorrected.png', 'checkpoint.png',
    // Player
    'Mcpartsv3.png', 'Heart.png', 'sfx/walk_dirt.mp3', 'sfx/vines.mp3',
    // Poisonous Plants
    'Lagablab, bubble and random vegetation.png', 'Atropa Belladona and Lagablab.png',
    // Aswangs
    'White Ladyv3.png', 'Tikbalangv2.png', 'Tiyanakv2.png', 'Mananangalv3.png',
    // Weapon icons
    'Asin pouch.png', 'Sword.png', 'CrossIcon.png', 'Protection2.png',
    // SFX
    'sfx/Dying.mp3', 'sfx/arrow hit.mp3', 'sfx/gameover.mp3', 'sfx/arrow shoot.mp3', 'sfx/sword attack 1.mp3', 'sfx/sword attack 2.mp3',
    'sfx/pressure plate activated.mp3', 'sfx/blab_drop.mp3', 'sfx/asin throw (temporary) .mp3', 'sfx/Picked Up Something Good.mp3',
    // Fonts
    'arcade.ttf',
    // Aswangs sfx
    'sfx/mananangal sound.mp3',
    'sfx/Aswang King 1.mp3', 'sfx/Aswang King 2.mp3', 'sfx/Aswang King 3.mp3', 'sfx/Aswang King 4.mp3', 'sfx/Final Boss Enraged BG song (LOOP) .mp3',
];

let entities:entities_type = {
    pinoy: {
        default: {
            x:160, y:0, m:[0,0], hitbox:[], nocollide:[],
            crouch: false, // Is character crouching?
            jumping: false,// Is character jumping?
            fright: true,  // Is character facing right?
            camera: 0,     // Camera on player offset, if undefined then no set
            swing: false,  // Is character swinging sword?
            swinging: 0,   // Current swining position (0->1), and now it's still indicated the attack of asins.
            plswing: false,// Already played the swing audio?
            interact:true, // Physics entities interacts
            dead: -1,      // Level of deadness (-1 Not dead, 0->1 Dying)
            ground: -1,    // Collider character is on
            lives: [3,3],  // Lives [A,B] meaning A lives left out of B lives
            poisoned: -1,       // Indicate the pinoy is poisoned or not
            speed_rate: 1,      // 0.0 - 1.0, indicate the speed reduce amount
            in_area_time: 0,    // Indicate the time pinoy stand in the poisonous area or touched by the poisonous plants
            points: 0,     // Accumulatd points
            highscore: 0,  // Highscore
            max_x: 0,      // Maximum distance traveled by the player
            canclimb:false,// Player can climb?
            climb: -1,     // Climbing (-1 not climbing, 1 hanging, 0->2 climbing animation)
            cur_weapon: 0,  // the weapon pinoy current use
            body_t: 3000,
            cur_body_t: 0,
            ondeath: ()=>{},
            weapons: [      // all weapons the pinoy has. sword, asin and cross protection
                {name: "sword", durability: 1000000, attack_range: [20, 29], asset_name: 'Sword.png',},     // no limited durability, but small range attack
                {name: "asin", durability: 20, attack_range: [168, 29], asset_name: 'Asin pouch.png'},      // limited durability, but large range attack
                {name: "cross", durability: 6, attack_range: [0, 0], asset_name: 'CrossIcon.png'},          // limited durability, used to block damage and poison, no damange for aswang.
            ],
        },
        update: (d, o, t, dt) => {
            let c = n => [n%6, Math.floor(n/6)];
            let leg = [0,0], body = [0,0];
            let weap = d.weapons[d.cur_weapon];
            if (d.cur_body_t > 0) {
                d.dead = -1;
                d.poisoned = -1;
                d.cur_body_t -= dt;
            }
            if (d.dead == -1) {
                // Hitbox
                d.hitbox = [ 15,
                    d.x+12, d.y,
                    8, 29
                ];

                if (!d.swing) {
                    d.lockedFright = d.fright;
                    d.lockedHitbox = d.hitbox;
                }
                
                // Max X for points
                if (d.x > d.max_x) d.max_x = d.x;

                // Movement
                if (!d.canclimb) d.climb = -1;
                if (d.climb == -1) {
                    d.fright = d.m[0] > 0 ? true : d.m[0] < 0 ? false : d.fright;
                    let cols = algo.physics(dt, d, o);
                    if (d.crouch && !d.jumping) cols.forEach(c => {
                        if (c[1]==2 && o.interacts[c[0]].dropoff) d.nocollide.push(c[0]);
                    });
                    else d.nocollide = [];
                }
                d.canclimb = false;

                // Kill if hit out of screen
                if (d.y >= o.h-32) {
                    d.dead = 0;
                    return;
                }
                
                // Camera follow player
                if (d.camera != undefined) {
                    o.camera[0] += (d.x+d.camera-o.w/2-o.camera[0])*dt/100;
                }

                // Weapons
                if (d.swing && d.dead == -1) {
                    if (!d.plswing) {
                        if (d.cur_weapon == 0) o.play(`sfx/sword attack ${Math.round(Math.random()+1)}.mp3`, true, 0.3);
                        else if (d.cur_weapon == 1) o.play('sfx/asin throw (temporary) .mp3', true);
                    }
                    d.plswing = true;
                    d.swinging += (1-d.swinging)*dt/100;
                    if (d.swinging > 0.9) d.swing = false;
                } else {
                    d.swinging -= d.swinging*dt/100;
                    d.plswing = false;
                }

                let s = Math.round(d.swinging*2.4);
                let v = d.swinging * 3.4;

                // Weapon swap
                if (d.swing && s == 0 && d.cur_weapon == 1) weap.durability -= 1;
                if (weap.durability == 0) {
                    d.cur_weapon = (d.cur_weapon + 1) % d.weapons.length;
                    return;
                }

                if (d.cur_weapon == 0) {
                    // Sword attack
                    if (s > 0) d.hitbox.push(...offsetRectWithFright(d.hitbox, [0, d.hitbox[3], 0, weap.attack_range[0], weap.attack_range[1]], d.fright));
                } else if (d.cur_weapon == 1) {
                    // Asin attack effect
                    if (d.swing) {
                        let hb = offsetRectWithFright(d.lockedHitbox, [0 , (weap.attack_range[0] - d.lockedHitbox[3]) * (v - 0.6) / 2.8, 0, 16, 32], d.lockedFright);
                        d.hitbox.push(...hb);
                        let vr = Math.round(v);
                        let ps = [96, 132, 175];
                        o.sprites('TakeoutSalt.png', [0, 0], hb.slice(1, 3).concat([ps[vr], 0, 16, 32]));
                    }
                }
                
                //console.log(d.climb);
                leg = c(
                    d.climb != -1 ? Math.round(d.climb)+38 :
                    d.ground == -1 ? 8 :
                    d.crouch ? 7 :
                    Math.abs(d.m[0]) > 0.5 ? 1+Math.floor(t/50)%6 :
                    0
                );
                body = c(
                    d.climb != -1 ? Math.round(d.climb)+36 :
                    s > 0 ? 
                    d.cur_weapon == 0 ? 27 + s :
                    d.cur_weapon == 1 ? 45 + s :
                    s == 1 ? 30 + s : 28 + s :
                    d.ground == -1 ? 26 :
                    d.crouch ? 25 :
                    Math.abs(d.m[0]) > 0.5 ? 13+Math.floor(t/50)%12 :
                    12
                );
            } 

            if (d.cur_body_t <= 0) {
                // Poison
                if (d.in_area_time >= 3000) {
                    d.dead = 0;
                    d.poisoned = -1
                } else if (d.in_area_time >= 2000) {
                    d.poisoned = 1;
                }
                if (d.poisoned >= 0 && d.poison_duration > 0) {
                    if (d.weapons[2].durability > 0) {
                        d.weapons[2].durability --;
                        d.cur_body_t = d.body_t;
                        d.poisoned = -1;
                        if (d.weapons[2].durability == 0) {
                            d.c_shield_break_t = 1000;
                        }
                    } else {
                        d.poison_duration -= dt;
                        d.speed_rate *= 1 - (0.25 * d.poison_duration / 100000)
                        if (d.speed_rate <= 0.2) d.speed_rate = 0.2;
                    }
                } else {
                    d.poisoned = -1;
                    d.poison_duration = 0;
                    d.speed_rate = 1;
                    d.in_area_time = 0;
                }

                if (d.dead == 0) {
                    if (d.weapons[2].durability > 0) {
                        d.weapons[2].durability --;
                        d.cur_body_t = d.body_t;
                        d.dead = -1;
                        if (d.weapons[2].durability == 0) {
                            d.c_shield_break_t = 1000;
                        }
                    } else {
                        d.lives[0]--;
                        o.play('sfx/Dying.mp3', true);
                    }
                }
            }

            if (d.dead != -1) {
                d.poisoned = -1;
                d.speed_rate = 1;
                d.hitbox = [ 15,
                    d.x+12, o.h,
                    8, 29
                ];
                //d.y = o.h-33;
                leg = c(9);
                body = c(27);
                d.dead += (1-d.dead)*dt/300;
                if (d.dead > 0.99) {
                    d.dead = -1;
                    d.ondeath();
                    /*d.x = 130;
                    d.y = 195*/
                    d.m = [0,0];
                    d.fright = true;
                }
            }
            let r = 1;
            if (d.cur_body_t > 0) r = Math.floor(t / 150 % 2);
            if (d.c_shield_break_t > 0) d.c_shield_break_t -= dt;
            if (r == 1) {
                // console.log(r);
                let u = d.weapons[2].durability > Math.floor(6 / 1.5) ? 2 :
                        d.weapons[2].durability > Math.floor(6 / 2) ? 1 : 
                        d.weapons[2].durability > 0 ? 0 : 
                        d.c_shield_break_t > 500 ? -1 :
                        d.c_shield_break_t > 0 ? -2 : -3;
                o.sprites('Mcpartsv3.png', [d.x, d.dead == -1 ? d.y : d.dead < 0.5 ? d.y-10*Math.sin(d.dead*Math.PI) : o.h+22-Math.sin(d.dead*Math.PI)*(o.h-d.y+32)],
                    // Leg
                    [0, 0, 32*leg[0], 32*leg[1], 32, 32, 1-d.fright],
                    // Body 
                    [0, d.crouch ? 2 : 0, 32*body[0] , 32*body[1], 32, 32, 1-d.fright]
                );
                o.sprites('Protection2.png', [d.x, d.y], [0, -1.5, 64 + 32 * u, 0, 32, 32]);
            }
            if (d.cur_weapon != 0) {
                let duras: number[][] = [];
                let cx = 1;
                for (let i = 0; i < weap.durability; i ++) {
                    duras.push([cx, 20, 68, 67, 9, 9, 0, 0, 0, 0, 0, 0])
                    if (cx > 320) break;
                    cx += 11;
                }
                o.sprites(weap.asset_name, [], [10, 214, 0, 0, 16, 16, 0, 0, 0, 0, 0, 0]);
                o.sprites('Lagablab, bubble and random vegetation.png', [0, 0], ...duras);
            }
            if (d.poisoned == 0 || d.poisoned == 1) o.sprites('Lagablab, bubble and random vegetation.png', [d.x + 6, d.y + 10], d.poisoned == 0 ? [0, 0, 37, 13, 21, 17] : [0, 0, 69, 13, 21, 17])
            
        }
    },
    background: {
        default: {
            day: 1,
            night: false,
            house: false,
            data: 0,
        },
        update: (d, o, t, dt) => {
            // Sky
            if (d.night) d.day -= d.day*dt/500;
            else d.day += (1-d.day)*dt/500;
            let g = o.btx.createLinearGradient(0, 0, 0, o.h);
            let h = 5;
            g.addColorStop(0, `rgb(0,${140*d.day},${240*d.day})`); // rgb(0,140,240) -> rgb(0,0,0)
            g.addColorStop(1, `rgb(${107-25*d.day},${210*d.day+5},${250*d.day+5})`); // rgb(82, 215, 255) -> rgb(107,5,5)
            o.btx.fillStyle = g;
            o.btx.fillRect(0,0,o.w,o.h);

            // Moon
            let a = t/10000%(1.2*Math.PI)+0.9*Math.PI
            o.btx.globalAlpha = 1-d.day;
            o.sprites('moonSprite.png', [o.w/2+Math.cos(a)*o.w/4, 3*o.h/4+Math.sin(a)*o.h/4],
                [0, 0, 4, 35, 24, 23, 0, 0, 0, 0, 0, 0, 0]
            );
            o.btx.globalAlpha = 1;
            
            // Clouds
            o.sprites('Cloudsv1 (1).png', [],
                [0, 16, 4, 20, 16, 16, 0, 0, 0, 0, 0, 0],
                [16,16, 20,20, 16, 16],
                [32,16, 36+4,20, 16, 16],
                [16, 0, 20, 4, 16, 16]
            );

            // Mountains
            o.btx.fillStyle = ['#23348A','#9A8625','#5BA200'][Math.round(d.day*2)];
            o.btx.fillRect(0,o.h-8*h,o.w,h*8);
            for (var y = 0; y < h; y++) {
                for (var x = 0; x < o.w/16+4; x++) {
                    if (Math.pow(algo.rand(x+y*y+1),(h-y)*0.5) > 0.5) o.sprites('mountainsprite.png', [],
                        [algo.mod(x*16-o.camera[0]*y/h/10+64,o.w+64)-64, o.h-20-(h-y)*8, 0, Math.round(2-d.day*2)*32, 64, 32, 0, 0, 0, 0, 0, 0, 1]
                    );
                }
            }
            //o.draw('', {img:'normal bg.png'});
            //o.draw('', {img:'dark bg.png', alpha: d.dark});
            //for (var x = -5; x < 7; x++) o.sprites(d.data>>(x+5)&1 ? 'bg normal (no clouds) .png' : 'bg normal (w clouds) .png', [], [64*x, 0, 0, 0, 64, 240, 0, 0, 0, 0, 0, 0.1]);
            //if (d.house) o.sprites('Housesv2.png', [], [0, 100, 126, 0, 128, 128]);
        },
        create: (o, arg) => {
            let d = 0;
            for (var x = 0; x < 10; x++) {
                if (Math.random() < 0.5) d += 1<<x;
            }
            return {
                data: d,
                ...arg
            }
        }
    },
    pet: {
        default: {x:0, y:0, m:[0,0], animal:0, jumping: false, ground:-1, nocollide:['pinoy'], hitbox:[]},
        update: (d, o, t, dt) => {
            // Hitbox
            if (!d.follow) return;
            d.hitbox = [ 15,
                d.x, d.y,
                26, 15
            ];
            // Follow AI
            if (o.player != undefined && o.player.dead == -1) {
                d.m[0] = Math.abs(o.player.x+(o.player.x>d.x?-15:15)-d.x)<15?0:o.player.x>d.x?7:-7;//(o.player.x+(o.player.x>d.x?-10:10)-d.x)/10;
                if (Math.abs(o.player.y-d.y) > o.h || Math.abs(o.player.x-d.x) > o.w) {
                    d.x = o.player.x;
                    d.y = o.player.y;
                }
                // Jump
                if (o.interacts[o.player.ground] != undefined) {
                    if (o.player.ground != -1 && o.interacts[o.player.ground].y < d.y && !d.jumping) {
                        d.m[1] = 20;//16;
                        d.jumping = true;
                    } else if (o.player.ground != -1 && d.ground != -1 && o.interacts[o.player.ground].y > d.y+16) {
                        d.nocollide.push(d.ground);
                    }
                }
            } else d.m[0] = 0;
                
            // Movement
            d.fright = d.m[0] > 0 ? true : d.m[0] < 0 ? false : d.fright;
            algo.physics(dt, d, o);
            if (d.ground != -1) {
                d.jumping = false;
                d.nocollide.splice(1);
                if (Math.abs(d.m[0]) > 1) o.play('sfx/walk_dirt.mp3', false, 0.5);
            }
            
            // Render
            let x = (Math.abs(d.m[0])>0.15?1+Math.floor(t/100)%2:0);
            if (d.animal == 0) o.sprites('Dog.png', [d.x, d.y], 
                [0, 0, x*32+3, 8, 26, 15, 1-d.fright]
            );
            else if (d.animal == 1) o.sprites('Cat (1).png', [d.x, d.y], 
                [0, 0, x*16, 0, 16, 16, 1-d.fright]
            );
        }
    },
    arrow: {
        default: {x:0, y:0, m:[0,0], a:0, nocollide:['pinoy'], ground:-1, hitbox:[], parent:undefined, duration: 3000},
        update: (d, o, t, dt) => {
            // Arrow expires
            if (d.duration <= 0) return;
            // Arrow hitbox
            d.hitbox = [15,
                d.x, d.y,
                8, 5
            ];
            // Gravity and collisions
            algo.physics(dt, d, o);
            // Player hits arrow
            if (algo.rectint(d.hitbox, o.player.hitbox.slice(5))) {
                d.duration = 0;
                return;
            }
            // Arrow hits player
            if (Math.hypot(d.m[0],d.m[1]) > 1 && algo.rectint(d.hitbox, o.player.hitbox) && o.player.dead == -1) {
                o.player.dead = 0;
                o.play('sfx/arrow hit.mp3', true);
            }
            // Arrow is in air or ground
            if (d.ground == -1) d.a += (Math.atan2(d.m[1], -d.m[0])-d.a)*dt/200;
            else {
                d.m = [0, 0];
                d.duration -= dt;
            }

            o.sprites('Arrow.png', [d.x, d.y],
                [0, 0, 0, 0, 8, 5, 0, 0, d.a, 4, 3]
            );
            /*if (o.player.hitbox.slice(5).length == 5) {
                printLog(d.hitbox, o.player.hitbox.slice(5), 326);
                if (o.player && algo.rectint(d.hitbox, o.player.hitbox.slice(5))) d.duration = 0;
            }*/
        },
        create: (o, arg) => {
            return {
                m: [5-10*Math.random(), 5-10*Math.random()],
                ...arg
            }
        }
    },
    plat: {
        default: {x:0, y:0, w:0, h:0, hitbox:[], dropoff:false, interact:true, col:1, mode:0, clip:undefined},
        update: (d, o, t, dt) => {
            let bs:number[][] = [];
            // [[x, y, x_offset_in_asset, y_offset_in_asset, asset_width, asset_height], ...]
            d.hitbox = [ d.col,
                d.x, d.y,
                d.w*16, d.h*16
            ];
            if (d.mode == 3) {
                let v = Math.floor((t / 250) % 2);
                for (let x = 0; x < d.w; x += 2) {
                    bs.push([x * 16, 0, (v == 0 ? 0 : 34), 0, 16, 16]);
                    bs.push([(x + 1) * 16, 0, (v == 0 ? 16 : 50), 0, 16, 16]);
                }
                //printLog(d.hitbox, o.player.hitbox, 351);
                if (algo.rectint(d.hitbox, o.player.hitbox)) {
                    o.player.weapons[2].durability = 0;
                    o.player.cur_body_t = -1;
                    o.player.dead = 0;
                }
                o.sprites('Lava.png', [d.x, d.y], ...bs);
            } else {
                for (let y = 0; y < d.h*2; y++) {
                    for (let x = 0; x < d.w*2; x++) {
                        let a = [
                            8*x, 8*y,
                            x == 0 ? 23 : x+1 == d.w*2 ? 31 : 27,
                            (y == 0 ? 22 : y+1 == d.h*2 ? 34 : 30)+[0,64,128][d.mode],
                            8, 8
                        ];
                        if (d.clip != undefined) {
                            if (y == 0 && d.clip[0].indexOf(x>>1) != -1) a[3] += 8;
                            if (x == 0 && d.clip[1].indexOf(y>>1) != -1) a[2] += 4;
                            if (x+1 == d.w*2 && d.clip[2].indexOf(y>>1) != -1) a[2] -= 4;
                            if (y+1 == d.h*2 && d.clip[3].indexOf(x>>1) != -1) a[3] -= 4;
                        }
                        bs.push(a);
                    }
                }
                for (let x = 0; x < d.w; x++) {
                    if (d.clip != undefined && d.clip[0].indexOf(x) != -1) continue;
                    // Dead Tree (5%)
                    if (d.data[x]&32) {
                        if (d.mode == 0) o.sprites('Treesv2.png', [d.x, d.y], [32*x, -64, 0, 64, 64, 64]);
                        //else if(d.mode == 1) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 96, 96, 32, 32]);
                        else if (d.mode == 2) o.sprites('Treesv2.png', [d.x, d.y], [32*x, -64, 64, 64, 64, 64]);
                    }
                    // Special (10%)
                    if (d.data[x]&16) {
                        if (d.mode == 0) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 0, 0, 32, 32]);
                        else if (d.mode == 1) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 0, 64, 32, 32]);
                        else if (d.mode == 2) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 32, 0, 32, 32]);
                    }
                    // Bush (10%)
                    // if (d.data[x]&8) {
                    //     if (d.mode == 0) o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], [32*x,-32,0,0,32,32]);
                    //     else if(d.mode == 1) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 0, 128, 32, 32]);
                    //     else if(d.mode == 2) o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], [32*x,-32,0,64,32,32]);
                    // }
                    // // Big grass (20%)
                    // if (d.data[x]&4) {
                    //     if (d.mode == 0) o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], [32*x,-32,32,0,32,32]);
                    //     else if(d.mode == 1) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 32, 32, 32, 32]);
                    //     else if(d.mode == 2) o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], [32*x,-32,64,0,32,32]);
                    // }
                    // Tree (10%)
                    if (d.data[x]&2) {
                        if (d.mode == 0) o.sprites('Treesv2.png', [d.x, d.y], [32*x, -64, 64*(Math.floor(t/500)%2), 0, 64, 64]);
                        else if(d.mode == 1) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 96, 96, 32, 32]);
                        else if (d.mode == 2) o.sprites('Treesv2.png', [d.x, d.y], [32*x, -64, 128+64*(Math.floor(t/500)%2), 0, 64, 64]);
                    }
                    // Grass (50%)
                    if (d.data[x]&1) {
                        if (d.mode == 0) o.sprites('Flowers.png', [d.x, d.y], [32*x,-32,0,0,32,32]);
                        else if(d.mode == 1) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 64, 32, 32, 32]);
                        //else if(d.mode == 2) 
                    }
                }
                o.sprites('Blocksv2.png', [d.x, d.y], ...bs);
            }
            
        },
        create: (o, arg) => {
            let w = arg.w || 0;
            let d:number[] = [];
            for (let i = 0; i < w>>1; i++) d.push(
                // Grass
                (Math.random() < 0.7 ? 1 : 0) +
                // Tree
                (Math.random() < 0.1 ? 2 : 0) +
                // Big Grass
                // (Math.random() < 0.2 ? 4 : 0) +
                // // Bush
                // (Math.random() < 0.1 ? 8 : 0) +
                // Special
                (Math.random() < 0.05 ? 16: 0) +
                // Dead tree
                (Math.random() < 0.05? 32: 0)
            );
            return {
                data: d,
                ...arg
            }
        }
    },
    setting: {
        default: {seed:0, width: 0, data:[]},
        update: (d, o, t, dt) => {
            // Flowers
            for (let i = 0; i < d.data.length>>1; i++) {
                if (d.data[i] > 0.5)
                    o.sprites('Flowers.png', [32*i, 190],
                        [0,0,0,0,32,32]
                    );
            }
            // Objects
            for (let i = 0; i < d.data.length>>1; i++) {
                let p = d.data[i+(d.data.length>>1)];
                if (p > 0.5) {
                    let n = Math.floor(2*(p-0.5)*17);
                    o.sprites('Bgitems.png', [32*i+5-20*(p-0.5), 190+10*(p-0.5)],
                        [0,0,32*(n%4),32*Math.floor(n/4),32,32]
                    );
                }
            }
        },
        create: (o, arg) => {
            let seed = Number(new Date())
            let w = 20;
            return {
                seed: seed,
                data: algo.prng(seed, w*2, 0),
                width: w,
                ...arg
            }
        }
    },
    menu: {
        default: {house:false, over:false, bind:[], points:0},
        update: (d, o, t, dt) => {
            if (d.over) {
                if (d.over_notinit == undefined) {
                    o.play('sfx/gameover.mp3', true);
                    d.over_notinit = true;
                }
                // Fade
                o.btx.globalAlpha = Math.max(0.001, 0.05*(1-dt/1000));
                // Game over
                o.sprites('Game Over.png', [], [0, 0, 0, 0, 320, 240, 0, 0, 0, 0, 0, 0]);
                if (o.player != undefined) {
                    let p = algo.score(o.player);
                    o.btx.fillStyle = '#fff';
                    o.btx.strokeStyle = '#000';
                    o.btx.font = `10px arcade`;
                    o.btx.textAlign = 'center';
                    o.btx.textBaseline = 'middle';
                    o.btx.fillText('Score', o.w/4, 3*o.h/4);
                    o.btx.fillText('Highscore', 3*o.w/4, 3*o.h/4);
                    if (p > o.player.highscore) {
                        o.btx.fillStyle = '#ff0';
                        o.btx.fillText('! NEW !', 3*o.w/4, 3*o.h/4-20);
                        o.btx.fillStyle = '#fff';
                    }
                    o.btx.font = `15px arcade`;
                    o.btx.fillText(String(p), o.w/4, 3*o.h/4+20);
                    o.btx.fillText(String(p > o.player.highscore ? p : o.player.highscore), 3*o.w/4, 3*o.h/4+20);
                    o.btx.globalAlpha = 1;
                }
                return;
            } else delete d.over_notinit;
            if (d.house) o.sprites('Housesv2.png', [], [0, 100, 126, 0, 128, 128]);
            o.sprites('Rise_of_the_Aswang_King.png', [0, 0],
                [0, 0, 0, 0, 256, 144]
            );
            
            // Display player details
            if (o.player != undefined) {
                // Hearts
                for(let i = 0; i < o.player.lives[1]; i++) o.sprites('Heart.png', [], [2+i*18, 2, i < o.player.lives[0] ? 0 : 16, 0, 16, 16, 0, 0, 0, 0, 0, 0]);
                // Point
                let p = algo.score(o.player);
                o.btx.fillStyle = '#fff';
                o.btx.strokeStyle = '#000';
                o.btx.font = `10px arcade`;
                o.btx.textAlign = 'end';
                o.btx.textBaseline = 'top';
                o.btx.fillText(String(p), o.w-2, 2);
                // Plus points
                if (o.player.points != d.points) {
                    d.bind.push(o.entity('points_gained', {x:o.player.x, y:o.player.y, point:o.player.points-d.points}));
                    d.points = o.player.points;
                }
            }
            // Remove expired points
            for(let i = 0; i < d.bind.length; i++) {
                if (d.bind[i].duration <= 0) {
                    d.bind.splice(i,1);
                    i--;
                }
            }
        }
    },
    points_gained: {
        default: {x:0, y:0, point:0, duration: 1000},
        update: (d, o, t, dt) => {
            o.btx.fillStyle = '#0f0';
            o.btx.strokeStyle = '#000';
            o.btx.font = `8px arcade`;
            o.btx.textAlign = 'center';
            o.btx.textBaseline = 'middle';
            o.btx.fillText('+'+String(d.point), d.x-o.camera[0], d.y-10*Math.sin((1-d.duration/1000)*Math.PI/2));
            d.duration -= dt;
        }
    },
    mananangal: {
        default: {x:0, y:0, t:0, m:[0,0], hitbox:[],
            follow:undefined,
            nogravity:true,
            nocollide:['plat'],
            chase: {
                type: 'pinoy',
                speed: 10,
                min: 4,
            },
            dead: -1,
            pn: 0,
            speed: 5,
            target: false,
            fright: true,
            nofollow: false
        },
        update: (d, o, t, dt) => {
            if (d.removed) return;
            d.follow = o.player;
            // Dead
            if (d.dead != -1) {
                o.player.points += d.ess;
                d.hitbox = [];
                d.dead += (1-d.dead)*dt/30;
                if (d.dead > 0.99) {
                    d.dead = -1;
                    d.removed = true;
                    return;
                }
            } else {
                d.hitbox = [0,
                    d.x, d.y+8,
                    32, 24,
                            0,
                    d.x+(d.fright?0:-64), d.y,
                    d.nofollow ? 0 : 64+32, 40
                ];
                algo.physics(dt, d, o);
                d.fright = d.m[0] > 0 ? true : d.m[0] < 0 ? false : d.fright;

                let center = false;
                // AI
                // Should follow path?
                if (!d.target && d.p != undefined) {
                    // Find vector to current point (d.pn) given magnitude and angle
                    let v = d.pn == 0 ? [Math.hypot(d.p[0]-d.x, d.p[1]-d.y), Math.atan2(d.y-d.p[1], d.p[0]-d.x)]
                                    : [Math.hypot(d.p[2]-d.x, d.p[3]-d.y), Math.atan2(d.y-d.p[3], d.p[2]-d.x)];
                    // Switch current point if close enough
                    if (v[0] < 10) d.pn = 1-d.pn;
                    // Absolute vector using angle
                    d.m = [Math.cos(v[1])*d.speed/2, Math.sin(v[1])*d.speed/2];
                    // If player enters detection range of the aswang's second hitbox (d.hitbox.slice(0,5))
                    printLog(d.hitbox.slice(5), o.player.hitbox, 537);
                    if (algo.rectint(o.player.hitbox, d.hitbox.slice(5))) {
                        o.play('sfx/mananangal sound.mp3', true);
                        d.target = true;
                    }
                } else if (o.player != undefined) {
                    // Get hypotenus and angle to player
                    let h = Math.hypot(o.player.x - d.x, o.player.y - d.y);
                    let a = Math.atan2(d.y-o.player.y, o.player.x-d.x);
                    // Chase player if far enough else stay
                    if (h > 200) d.target = false;
                    else if (h > 20) d.m = [Math.cos(a)*d.speed, Math.sin(a)*d.speed];
                    else d.m = [0, 0];
                }
                let v = Math.min(Math.hypot(d.p[0]-d.x, d.p[1]-d.y), Math.hypot(d.p[2]-d.x, d.p[3]-d.y));
                if (v > 100 && (Math.min(d.p[0],d.p[2]) > d.x || Math.max(d.p[0],d.p[2]) < d.x)) {
                    d.target = false;
                    d.nofollow = true;
                } else if(v < 50) d.nofollow = false;
                //console.log(d.hitbox.slice(0,5),o.player.hitbox.slice(5));
                if (o.player.hitbox.slice(5).length == 5) {
                    //printLog(d.hitbox.slice(0, 5), o.player.hitbox.slice(5), 553);
                    if (algo.rectint(d.hitbox.slice(0,5),o.player.hitbox.slice(5))) d.dead = 0;
                }
                //printLog(d.hitbox, d.follow.hitbox, 556);
                if (algo.rectint(d.hitbox,d.follow.hitbox)) d.follow.dead = 0;
            }
            
            let dd = d.dead == -1 ? 0 : Math.round(d.dead*2);
            let dr = d.dead == -1 ? 1 : 1-d.dead;
            let c = [
                // Body
                [0, 0, dd*32, 0, 32, 32, 1-d.fright],
                // Wing
                [0, 1, dd == 0 ? 32*3 : (dd-1)*32, dd == 0 ? 0 : 32, 32, 32, 1-d.fright, 0, dr*Math.sin(t/100)*0.5+(d.fright ? -0.5 : 0.5), d.fright ? 11 : 20, 19]
            ] ;
            let tng = Math.floor(d.t*4);
            if (tng > 0) c.push([d.m[0] < 0 ? -7 : 7, 8, Math.floor(t/100)%3*32, 32*3, 32, 32, 1-d.fright, 0, 0]);
            o.sprites('Mananangalv3.png', [d.x, d.y+Math.sin(t/200)*0.5*dr], ...c);
        }
    },
    shooter: {
        default: {x:0, y:0, f:0, a:0, shoot:0, cooldowntmp:0, cooldown: 0, bind:[], speed:0, collide:[], s:10},
        update: (d, o, t, dt) => {
            let ofs = 0;
            if (d.shoot > 0) {
                /*d.cooldowntmp -= dt;
                //console.log(d.cooldowntmp);
                if (d.colldowntmp < 1000) ofs = 2;
                if (d.cooldowntmp <= 0) {*/
                    o.play('sfx/arrow shoot.mp3', true);
                    d.bind.push(o.entity('arrow', {x:d.x-Math.cos(d.a)*5, y:d.y+Math.sin(d.a)*5, m:[d.s*Math.cos(d.a),d.s*Math.sin(d.a)], parent:d, a:-d.a+Math.PI}));
                    d.shoot--;
                /*    d.cooldowntmp = d.cooldown;
                }*/
            }
            for (var i = 0; i < d.bind.length; i++) {
                if (d.bind[i].duration <= 0) {
                    d.bind.splice(i,1);
                    i--;
                }
            }
            o.sprites('Shooterv2.png', [], [d.x-6, d.y-6, 32*ofs, 0, 13, 12, Math.PI/2 < d.a && d.a < 3*Math.PI/2 ? 1 : 0, 0, Math.PI/2 < d.a && d.a < 3*Math.PI/2 ? Math.PI-d.a : -d.a, 6, 6])
        }
    },
    vine: {
        default: {x:0, y:0, h:0},
        update: (d, o, t, dt) => {
            d.hitbox = [0,
                d.x,d.y,
                8, d.h
            ]
            let a:number[][] = [];
            // x, y, x_offset_in_asset, y_offset_in_asset, asset_width, asset_height
            for(var i = 0; i < Math.floor(d.h/24); i++) a.push([0, 24*i, 0, 0, 7, 24]);
            if (d.h%24 != 0) a.push([0, 24*i, 0, 0, 7, d.h%24])
            a.push([2, d.h, 0, 32, 3, 3]);
            o.sprites('Vine.png', [d.x, d.y], ...a);
            //printLog(d.hitbox, o.player.hitbox, 608);
            if (o.player != undefined && algo.rectint(d.hitbox, o.player.hitbox)) o.player.canclimb = true;
        }
    },
    wire: {
        default: {x:0, y:0, h:10, triggered: false,
            follow:undefined
        },
        update: (d, o, t, dt) => {
            d.hitbox = [0,
                d.x, d.y,
                4, 14+d.h
            ];
            //printLog(d.hitbox, o.player.hitbox, 625);
            if (o.player != undefined && algo.rectint(d.hitbox, o.player.hitbox)) {
                if (!d.triggered) d.bind.forEach(s => {
                    s.shoot = 1;
                });
                d.triggered = true;
            } else {
                d.triggered = false;
            }
            let a:number[][] = [[0,0,0,0,3,7],[0,7+d.h,0,9,3,7]];
            for(var i = 0; i < Math.floor(d.h/16); i++) a.push([2,7+16*i,15,0,1,16]);
            if (d.h%16 != 0) a.push([2,7+16*i,15,0,1,d.h%16]);
            o.sprites('Tripwire2Correct.png', [d.x,d.y], ...a);
        }
    },
    pressure_plate: {
        default: {x:0, y:0, w:10,
            triggered: false, // Is currently triggered?
            pltrigger: false  // Played trigger audio?
        },
        update: (d, o, t, dt) => {
            d.hitbox = [0,
                d.x, d.y,
                4+d.w, 2
            ];
            let a:number[][] = [[0,0,0,0,2,2],[2+d.w,0,2,0,2,2]];
            for(var i = 0; i < Math.floor(d.w/16); i++) a.push([2+16*i,0,0,2,16,2]);
            if (d.w%16 != 0) a.push([2+16*i,0,0,2,d.w%16,2]);
            //printLog(d.hitbox, o.player.hitbox, 652);
            if (algo.rectint(d.hitbox, o.player.hitbox)) {
                if (!d.triggered) d.bind.forEach(s => {
                    s.shoot = 1;
                });
                d.triggered = true;
            } else d.triggered = false;
            if (d.triggered && !d.pltrigger) {
                o.play('sfx/pressure plate activated.mp3', true);
                d.pltrigger = true;
            } else if (!d.triggered) d.pltrigger = false;
            o.sprites('pressure.png', [d.x,d.y+(d.triggered?1:0)], ...a);
        }
    },
    atropa_belladonna: {
        default: {x: 0, y: 0},
        update: (d, o, t, dt) => {
            d.hitbox = [0,
                d.x, d.y,
                22, 22
            ]
            //printLog(d.hitbox, o.player.hitbox, 668);
            // console.log(t, dt);
            // console.log(o.player, o.player.hitbox)
            if (algo.rectint(d.hitbox, o.player.hitbox)) {
                o.player.poisoned = 0;
                o.player.poison_duration = 5000;
                o.player.in_area_time += dt;
            }
            o.sprites('Atropa Belladona and Lagablab.png', [d.x, d.y], [0, 0, 4, 8, 25, 24])
        }
    },
    lagablab: {
        default: {x: 0, y: 0, cooldowntmp: 0, cooldown: 3000, n: 3, bind:[], s:10, min_a: 0, max_a: Math.PI * 0.5},
        update(d, o, t, dt) {
            let ofs = 0;
            d.cooldowntmp -= dt;
            if (d.colldowntmp < 1000) ofs = 2;
            if (d.cooldowntmp <= 0) {
                // if (d.bind.length > d.n * 3) {
                //     d.bind = d.bind.slice(d.bind.length - d.n * 2, d.bind.length - 1);
                // }
                d.bind = [];
                for (let i = 0; i < d.n; i ++) {
                    let a: number = d.min_a + Math.random() * (d.max_a - d.min_a);
                    d.bind.push(o.entity('blab', {x:d.x-Math.cos(a)*5, y:d.y+Math.sin(a)*5, m:[d.s*Math.cos(a),d.s*Math.sin(a)], parent:d, n: d.n}));
                }
                d.cooldowntmp = d.cooldown;
            }
            o.sprites('Atropa Belladona and Lagablab.png', [d.x, d.y], [0, 0, 32, 16, 32, 16])
        },
    },
    blab: {
        default: {x:0, y:0, m:[0,0], nocollide:[], ground:-1, hitbox:[], parent:undefined, duration: 3000, bind:[], area_w: 2},
        update: (d, o, t, dt) => {
            if (d.duration <= 0) {
                d.hitbox = [];
                return;
            }
            d.hitbox = [15,
                d.x, d.y,
                9, 9
            ];
            algo.physics(dt, d, o);
            if (Math.hypot(d.m[0],d.m[1]) > 1 && algo.rectint(d.hitbox, o.player.hitbox) && o.player.dead == -1) {
                o.player.poisoned = 0;
                o.player.poison_duration = 5000;
                d.in_area_time += dt;
                d.duration = -1;
                d.bind.splice();
                return;
            } else {
                if (d.ground == -1) d.a += (Math.atan2(d.m[1], -d.m[0])-d.a)*dt/200;
                else {
                    d.m = [0, 0];
                    d.duration -= dt;
                }
                let v = Math.floor((t / 250) % 2);
                
                if (d.m[0] == 0 && d.m[1] == 0) {
                    d.duration = 0;
                    d.bind = [];
                    let px = d.x - 30 * d.area_w / 2 + 4;
                    d.bind.push(o.entity('poisoned_area', {x: px, y: d.y + 5, w: 30 * d.area_w, duration: 3000, parent:d}));
                    if (o.player != undefined) o.play('sfx/blab_drop.mp3', true, Math.exp(-Math.abs(px - o.player.x)/100));
                }
                o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], [0, 0, (v == 0 ? 36 : 68), 67, 9, 9])
            }
        },
    },
    poisoned_area: {
        default: {x: 0, y: 0, w: 0, duration: 6000, parent:undefined},
        update: (d, o, t, dt) => {
            if (d.duration <= 0) {
                d.hitbox = [];
                return;
            }
            d.hitbox = [0,
                d.x, d.y,
                d.w, 10
            ]
            if (algo.rectint(d.hitbox, o.player.hitbox)) {
                o.player.poisoned = 0;
                o.player.poison_duration = 5000;
                o.player.in_area_time += dt;
            }
            let bs:number[][] = [];
            for (let x = 0; x < d.w; x += 30) {
                bs.push([x, 0, 33, 51, 30, 5]);
            }
            d.duration -= dt;
            o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], ...bs);
        },
    },
    essence: {
        default: {x: 0, y: 0, claimed: false, ess: 50},
        update: (d, o, t, dt) => {
            if (d.claimed) return;
            d.hitbox = [ 0,
                d.x, d.y,
                8, 8
            ];
            if (algo.rectint(o.player.hitbox, d.hitbox)) {
                d.hitbox = [];
                o.player.points += d.ess;
                d.claimed = true;
                o.play('sfx/Picked Up Something Good.mp3', true);
            }
            o.sprites('Aswang Essencecorrected.png', [d.x, d.y], [0, 0, Math.floor(t / 500 % 2) * 8, 0, 8, 8]);
        }
    },
    // checkpoint: {
    //     default: {x: 0, y: 0},
    //     update: (d, o, t, dt) => {
    //         o.sprites('Aswang Essencecorrected.png', [d.x, d.y], [0, 0, 1 * 8, 0, 8, 8]);
    //     }
    // },
    white_lady: {
        default: {x:0, y:0, m:[0,0], animal:0, jumping: false, ground:-1, nocollide:['pinoy'], hitbox:[], s: 4, dead: -1, removed: false},
        update: (d, o, t, dt) => {
            if (d.removed) return;
            let hitboxSize = [21, 27];
            let detectSize = [150, 70];
            let actionR = [-50, -20, 300, 150];
            let dead_time = 1000;
            let asset_name = 'White Ladyv3.png';
            let origins = [[8, 2], [40, 2], [72, 2]];
            let sizes = [[21, 27], [21, 27], [21, 27]];
            let dead_origins = [[72, 34], [8, 66]];
            let dead_sizes = [[21, 27], [21, 27]];
            aswang(d, o, t, dt, hitboxSize, detectSize, actionR, dead_time, asset_name, origins, sizes, dead_origins, dead_sizes, false);
        }
    },
    tikbalang: {
        default: {x:0, y:0, m:[0,0], animal:0, jumping: false, ground:-1, nocollide:['pinoy'], hitbox:[], s: 6, dead: -1, removed: false},
        update: (d, o, t, dt) => {
            if (d.removed) return;
            let hitboxSize = [17, 32];
            let detectSize = [150, 70];
            let actionR = [-50, -20, 300, 150];
            let dead_time = 1000;
            let asset_name = 'Tikbalangv2.png';
            let origins = [[8, 0], [35, 0], [72, 0]];
            let sizes = [[17, 32], [22, 31], [17, 32]];
            let dead_origins = [[7, 33], [39, 33]];
            let dead_sizes = [[18, 31], [18, 31]];
            aswang(d, o, t, dt, hitboxSize, detectSize, actionR, dead_time, asset_name, origins, sizes, dead_origins, dead_sizes, false);
        }
    },
    tiyanak: {
        default: {x:0, y:0, m:[0,0], animal:0, jumping: false, ground:-1, nocollide:['pinoy'], hitbox:[], s: 10, dead: -1, removed: false},
        update: (d, o, t, dt) => {
            if (d.removed) return;
            let hitboxSize = [10, 14];
            let detectSize = [100, 30];
            let actionR = [0, 0, 150, 50];
            let dead_time = 1000;
            let asset_name = 'Tiyanakv2.png';
            let origins = [[2, 2], [18, 3], [34, 2], [50, 2], [66, 3]];
            let sizes = [[10, 14], [10, 13], [11, 14], [10, 14], [10, 13]];
            let dead_origins = [[1, 18], [17, 18]];
            let dead_sizes = [[14, 14], [13, 14]];
            aswang(d, o, t, dt, hitboxSize, detectSize, actionR, dead_time, asset_name, origins, sizes, dead_origins, dead_sizes, true);
        }
    },
    text: {
        default: {x: 10, y: 20, z:10, text:'', color: '#FFF'},
        update: (d, o, t, dt) => {
            o.btx.font = `${d.z*o.z}px arcade`;
            o.btx.fillText(d.text, d.x-o.camera[0], d.y-o.camera[1]);
        }
    },
    checkpoint: {
        default: {x:0, y: 195} ,
        update: (d, o, t, dt) => {
            o.sprites('checkpoint.png', [d.x,d.y], [0,35,Math.floor(t/100)%3*34, 0, 32, 32]);
        }
    },
    king: {
        default: {x:0, y:100, m:[0, 0], status: 0, attack_method: 0, collide:['pinoy'], follow: undefined, speed: 0.7, 

            cooldown: 5000, cur_cooldown: 1000,
            blab_n: 5, blab_z: 0, bind: [],
            charging_vector: [0, 0], prepare_vector:[0, 0], charge_s: 20, prepare_s: -0.25, cur_charge_t: 0, prepare_t: 120, cur_prepare_t: 120, charging: false,
            drop_prepare_s: -0.25, drop_pt: 200, cur_drop_pt: 200, drop_s: 30, drop_charge: false,
            attackBox: [], lives: [30, 30], protect_t: 500, cur_protect_t: 500, healing: 2,
            hit_t: 2000, cur_hit_t: 2000, full_attack_n: 4, cur_attack_n: 4, aswang_n: 3, dying_t: 6000, cur_dying_t: 6000, dying: false, dead: -1,
            
            bodyOrigins: [[[96, 0], [133, 0]], [[97, 52], [134, 52]], [[170, 0], [207, 0]], [[171, 52], [209, 52]]],
            leftWingOrigins: [[[97, 108]], [[167, 108]], [[97, 134]], [[167, 134]]],
            rightWingOrigins: [[[132, 108]], [[202, 108]], [[132, 134]], [[202, 134]]],
            headOrigins: [[[0, 146], [13, 146], [0, 164]], [[13, 164], [0, 182], [13, 182]], [[26, 146], [39, 146], [26, 164]], [[39, 164], [26, 182], [39, 182]]],
            leftHandOrigins: [[[0, 0], [7, 21], [0, 45]], [[48, 0], [55, 21], [48, 45]], [[48, 72], [55, 93], [48, 117]], [[0, 72], [7, 93], [0, 117]]],
            rightHandOrigins: [[[23, 0], [24, 21], [24, 45]], [[71, 0], [72, 21], [72, 45]], [[71, 72], [72, 93], [72, 117]], [[23, 72], [24, 93], [24, 117]]],
            bodySize: [[37, 52], [37, 52]],
            wingSize: [[35, 18]],
            headSize: [[13, 18], [13, 18], [13, 18]],
            handSize: [[23, 21], [17, 23], [24, 27]],
            handStatus: 0,
            headStatus: 0,
            fre: 0,
            aswangs: [
                ['white_lady', {x:20557, y:20, p:[20224, 192, 20891 ,192], ess:200}],
		        ['tiyanak', {x:20563, y:20, p:[20224, 208, 20902 ,208], ess:200}],
		        ['tikbalang', {x:20559, y:20, p:[20224, 192, 20895 ,192], ess:200}],
            ]
        },
        update: (d, o, t, dt) => {
            if (d.dead == 0) return;
            if (!d.dying) {
                if (o.player && Math.hypot(o.player.x-d.x, o.player.y-d.y) < 300)o.play('sfx/Final Boss Enraged BG song (LOOP) .mp3');
                d.hitbox = [15,
                    d.x, d.y,
                    37, 65 
                ]
                if (d.cur_protect_t <= 0) {
                    if (o.player.hitbox.slice(5).length == 5 && algo.rectint(d.hitbox, o.player.hitbox.slice(5))) {
                        d.lives[1] -= 1;
                        console.log(d.lives[1]);
                        d.cur_protect_t = d.protect_t;
                        d.cur_hit_t = d.hit_t;
                    }
                } else d.cur_protect_t -= dt;

                if (d.charging) {
                    if (d.cur_prepare_t > 0) {
                        d.cur_prepare_t -= 1;
                        d.x += d.prepare_vector[0];
                        d.y += d.prepare_vector[1];
                    } else if (d.cur_charge_t > 0) {
                        o.play(`sfx/Aswang King ${Math.round(Math.random()*3)+1}.mp3`, true);
                        d.cur_charge_t -= 1;
                        d.x += d.charging_vector[0];
                        d.y += d.charging_vector[1];
                        if (d.drop_charge) {
                            d.attackBox = offsetRectWithFright(d.hitbox, [0, -100, -20, 200 + d.hitbox[3], 30 + d.hitbox[4]], true);
                            if (d.y + d.hitbox[4] >= 216) d.y = 240 - 16 * 1 - d.hitbox[4];
                        } else {
                            d.attackBox = offsetRectWithFright(d.hitbox, [0, -20, -20, 40 + d.hitbox[3], 40 + d.hitbox[4]], true);
                        }
                    } else {
                        if (d.y <= 8) d.y = 16 * 3;
                        if (d.y + d.hitbox[4] >= 232) d.y = 240 - 16 * 3 - d.hitbox[4];
                        d.drop_charge = false;
                        d.charging = false;
                        d.attackBox = [];
                    }
                }
                d.hitbox = d.hitbox.concat(d.attackBox);
                if (d.follow != undefined) {
                    if (algo.rectint(d.attackBox, d.follow.hitbox)) d.follow.dead = 0;
                    let fire = false;
                    d.cur_cooldown -= dt;
                    if (d.cur_cooldown <= 0) {
                        fire = true;
                        d.cur_cooldown = d.cooldown;
                    }
                    let fright = d.follow.x >= d.x;
                    let attackRange = offsetRectWithFright(d.hitbox, [0, -100, -20, 200 + d.hitbox[3], 60 + d.hitbox[4]], fright);
                    let is_above = (d.follow.y + d.follow.hitbox[4]) < attackRange[2];
                    let is_under = (d.follow.y) > (attackRange[2] + attackRange[4]);
                    let is_x_exist = (d.follow.x + d.follow.hitbox[3]) >= attackRange[1] && (d.follow.x) <= (attackRange[1] + attackRange[3]);
                    if (is_x_exist) {
                        if (is_under) d.attack_method = 2;
                        else d.attack_method = 1;
                    } else {
                        if (is_above) d.attack_method = 1;
                        else d.attack_method = 0;
                    }
                    if (fire) {
                        if (d.lives[1] <= d.lives[0] / 4 && d.cur_attack_n >= d.full_attack_n) {
                            d.cur_attack_n = 0;
                            d.cur_cooldown = d.cooldown * 2;
                            d.bind = [];
                            d.lives[1] += d.healing;
                            for (let i = 0; i < d.aswang_n; i += 1) {
                                let v = Math.floor(Math.random() * 3);
                                let curAswang = d.aswangs[v];
                                let p = Math.floor(curAswang[1].p[0] + (Math.random() * (curAswang[1].p[2] - curAswang[1].p[0])));
                                curAswang[1].x = p;
                                d.bind.push(o.entity(curAswang[0], curAswang[1]));
                            }
                        } else if (d.attack_method == 0) { // "Blab Long Range Attack"
                            let mousePoint = [d.x + d.hitbox[3] / 2 - 5, d.y + 8];
                            let max_s = 22;
                            let min_s = 12;
                            let step = ((max_s - min_s) / (d.blab_n - 1));
                            max_s = d.blab_z == 1 ? max_s - step / 2 : max_s;
                            min_s = d.blab_z == 1 ? min_s - step / 2 : min_s;
                            let a = fright ? 1/4 * Math.PI : 3/4 * Math.PI ;
                            // d.headStatus = 1;
                            d.bind = [];
                            for (let s = min_s; s <= max_s; s += step) {
                                d.bind.push(o.entity('blab', {x:mousePoint[0]-Math.cos(a)*5, y:mousePoint[1]+Math.sin(a)*5, m:[s*Math.cos(a),s*Math.sin(a)], area_w: 1, parent:d, n: 3}));
                            }
                            d.blab_z = d.blab_z == 1 ? 0 : 1;
                        } else if (d.attack_method == 1) { // "Fast Charge"
                            let followerPoint = [d.follow.x + d.follow.hitbox[3] / 2, d.follow.y + d.follow.hitbox[4] / 2];
                            let kingPoint = [d.x + d.hitbox[3] / 2, d.y + d.hitbox[4] / 2];
                            let x_off = followerPoint[0] - kingPoint[0];
                            let y_off = followerPoint[1] - kingPoint[1];
                            let theta = Math.atan(y_off / x_off);
                            let dis = Math.hypot(x_off, y_off);
                            d.charging = true;
                            d.charging_target = followerPoint;
                            d.charging_vector = [(fright ? d.charge_s : -d.charge_s) * Math.cos(theta), (fright ? d.charge_s : -d.charge_s) * Math.sin(theta)];
                            d.prepare_vector  = [(fright ? d.prepare_s : -d.prepare_s) * Math.cos(theta), (fright ? d.prepare_s : -d.prepare_s) * Math.sin(theta)];
                            d.cur_prepare_t = d.prepare_t;
                            d.cur_charge_t = Math.ceil(dis / d.charge_s) + 5;
                        } else if (d.attack_method == 2) { // "Heavy Attack"
                            // d.headStatus = 0;
                            //o.play(`sfx/Aswang King ${Math.round(Math.random())+1}.mp3`, true);
                            d.charging = true;
                            d.charging_vector = [0, d.drop_s];
                            d.prepare_vector  = [0, d.drop_prepare_s];
                            d.cur_prepare_t = d.prepare_t;
                            d.cur_charge_t = Math.floor((224 - (d.y + d.hitbox[4])) / d.charge_s);
                            d.drop_charge = true;
                        }
                        d.cur_attack_n += 1;
                    } else if (d.charging == false) {
                        let distance_range = offsetRectWithFright(attackRange, [0, 40, -40, -80 + attackRange[3], 60 + attackRange[4]], true);
                        if (algo.rectint(d.follow.hitbox, distance_range)) {
                            d.x += fright ? -d.speed * 0.6 : d.speed * 0.6;
                            d.y += -d.speed * 0.6;
                        } else {
                            let followerPoint = [d.follow.x + d.follow.hitbox[3] / 2, d.follow.y + d.follow.hitbox[4] / 2];
                            let kingPoint = [d.x + d.hitbox[3] / 2, d.y + d.hitbox[4] / 2];
                            let x_off = followerPoint[0] - kingPoint[0];
                            let y_off = followerPoint[1] - kingPoint[1];
                            let theta = Math.atan(y_off / x_off);
                            d.x += (fright ? d.speed : -d.speed) * Math.cos(theta);
                            d.y += (fright ? d.speed : -d.speed) * Math.sin(theta);
                        }
                        d.hitbox = d.hitbox.concat(distance_range);
                    }
                    d.hitbox = d.hitbox.concat(attackRange);
                } else {
                    let detect_range = offsetRectWithFright(d.hitbox, [0, -300, -200, 600 + d.hitbox[3], 400 + d.hitbox[4]], true);
                    d.hitbox = d.hitbox.concat(detect_range);
                    if (algo.rectint(o.player.hitbox, detect_range)) d.follow = o.player;
                }

                if (d.lives[1] > d.lives[0] / 2) {
                    d.headStatus = 0;
                    d.status = 0;
                } else if (d.lives[1] > d.lives[0] / 4) {
                    d.headStatus = 1;
                    d.status = 1;
                } else if (d.lives[1] > d.lives[0] / 6) {
                    d.headStatus = 1;
                    d.status = 1;
                } else if (d.lives[1] == 0) {
                    o.player.points += d.ess;
                    d.cur_dying_t = d.dying_t;
                    d.dying = true;
                    d.headStatus = 2;
                    d.status = 3;
                    for (let i = 0; i < d.bind.length; i ++) {
                        d.bind[i].dead = 0;
                    }
                } else {
                    d.headStatus = 2;
                    d.status = Math.floor(t / (50 + 500 / (Math.floor(d.lives[0] / 5) - d.lives[1])) % 2) + 1;
                }
    
                d.handStatus = d.charging ? 1 : 2;
    
                if (d.cur_hit_t >= 0) {
                    d.cur_hit_t -= dt;
                    if (d.cur_hit_t > d.hit_t / 1.25) {
                        d.headStatus = 1;
                        d.handStatus = 0;
                        d.status = 2;
                    } else {
                        d.headStatus = 1;
                    }
                }
                
                d.fre = Math.sin(t / 200);
            } else {
                d.hitbox = [];
                d.cur_dying_t -= dt;
                if (d.cur_dying_t > d.dying_t * 0.6) {
                    d.status = 2;
                    d.fre = Math.sin(t / 200);
                } else if (d.cur_dying_t > d.dying_t * 0.3) {
                    d.status = 3;
                } else if (d.cur_dying_t > 0) {
                    d.status = 3;
                    d.y += 3;
                } else {
                    d.bind = [];
                    d.status = 3;
                    d.dead = 0;
                }
            }
            let wing_a_1 = d.fre + 30 / 180 * Math.PI;
            let wing_a_2 = d.fre + -30 / 180 * Math.PI;
            let wing_a_3 = d.fre - 60 / 180 * Math.PI;   
            let bodyStatus = Math.floor(t / 1000 % 2);
            o.sprites('Aswang KingV2.png', [d.x, d.y],
                // Left wings
                [-28, 5 + d.fre, d.leftWingOrigins[d.status][0][0], d.leftWingOrigins[d.status][0][1], d.wingSize[0][0], d.wingSize[0][1], 0, 0, wing_a_1, d.wingSize[0][0], d.wingSize[0][1]],
                [-33, 10 + d.fre, d.leftWingOrigins[d.status][0][0], d.leftWingOrigins[d.status][0][1], d.wingSize[0][0], d.wingSize[0][1], 0, 0, wing_a_2, d.wingSize[0][0], d.wingSize[0][1]],
                [-28, 15 + d.fre, d.leftWingOrigins[d.status][0][0], d.leftWingOrigins[d.status][0][1], d.wingSize[0][0], d.wingSize[0][1], 0, 0, wing_a_3, d.wingSize[0][0], d.wingSize[0][1]],
                // Right wings
                [33, 5 + d.fre, d.rightWingOrigins[d.status][0][0], d.rightWingOrigins[d.status][0][1], d.wingSize[0][0], d.wingSize[0][1], 0, 0, -wing_a_1, 0, d.wingSize[0][1]],
                [38, 10 + d.fre, d.rightWingOrigins[d.status][0][0], d.rightWingOrigins[d.status][0][1], d.wingSize[0][0], d.wingSize[0][1], 0, 0, -wing_a_2, 0, d.wingSize[0][1]],
                [33, 15 + d.fre, d.rightWingOrigins[d.status][0][0], d.rightWingOrigins[d.status][0][1], d.wingSize[0][0], d.wingSize[0][1], 0, 0, -wing_a_3, 0, d.wingSize[0][1]],
                // Body
                [0, 13 + d.fre, d.bodyOrigins[d.status][bodyStatus][0], d.bodyOrigins[d.status][bodyStatus][1], d.bodySize[bodyStatus][0], d.bodySize[bodyStatus][1], 0, 0, 0, 0],
                // Head
                [13, 1 + d.fre * 2, d.headOrigins[d.status][d.headStatus][0], d.headOrigins[d.status][d.headStatus][1], d.headSize[d.headStatus][0], d.headSize[d.headStatus][1], 0, 0, 0, 0],
                // Left hand
                [d.handStatus == 1 ? -18 : -25 , d.handStatus ? 12 : 12 + d.fre * 2, d.leftHandOrigins[d.status][d.handStatus][0], d.leftHandOrigins[d.status][d.handStatus][1], d.handSize[d.handStatus][0], d.handSize[d.handStatus][1], 0, 0, (d.handStatus == 1) ? (8 * 180 / Math.PI) :(-0.4-d.fre * 0.2), d.handSize[d.handStatus][0], d.handSize[d.handStatus][1]],
                [d.handStatus == 1 ? -14 : -21 , d.handStatus ? 25 : 25 + d.fre * 2, d.leftHandOrigins[d.status][d.handStatus][0], d.leftHandOrigins[d.status][d.handStatus][1], d.handSize[d.handStatus][0], d.handSize[d.handStatus][1], 0, 0, (d.handStatus == 1) ? (8 * 180 / Math.PI) :(-0.4-d.fre * 0.2), d.handSize[d.handStatus][0], d.handSize[d.handStatus][1]],
                // Right hand
                [d.handStatus == 1 ? 37 : 37, d.handStatus ? 12 : 12 + d.fre * 2, d.rightHandOrigins[d.status][d.handStatus][0], d.rightHandOrigins[d.status][d.handStatus][1], d.handSize[d.handStatus][0], d.handSize[d.handStatus][1], 0, 0, (d.handStatus == 1) ? -(8 * 180 / Math.PI) : (0.4 + d.fre * 0.2), 0, d.handSize[d.handStatus][1]],
                [d.handStatus == 1 ? 33 : 33, d.handStatus ? 25 : 25 + d.fre * 2, d.rightHandOrigins[d.status][d.handStatus][0], d.rightHandOrigins[d.status][d.handStatus][1], d.handSize[d.handStatus][0], d.handSize[d.handStatus][1], 0, 0, (d.handStatus == 1) ? -(8 * 180 / Math.PI) : (0.4 + d.fre * 0.2), 0, d.handSize[d.handStatus][1]],
            )
        }
    },
};

function aswang(d, o, t, dt, hitboxSize, detectSize, actionR, dead_time, asset_name, origins, sizes, dead_origins, dead_sizes, fright_reverse) {
    if (d.dead != -1) {
        d.hitbox = [];
        d.timer -= dt;
        let v = (d.timer > dead_time / 2) ? 0 : 1;
        o.sprites(asset_name, [d.x, d.y], [0, 0, dead_origins[v][0], dead_origins[v][1], dead_sizes[v][0], dead_sizes[v][1], 1- (fright_reverse ? !d.fright : d.fright)]);
        if (d.timer <= 0) d.removed = true;
        return;
    } else {
        // Hitbox
        d.timer = dead_time;
        d.hitbox = [ 15,
            d.x, d.y,
            hitboxSize[0], hitboxSize[1],
        ];
        // Follow AI
        if (d.follow != undefined && d.follow.dead == -1) {
            let dist = Math.hypot(d.x - d.follow.x, d.y - d.follow.y);
            printLog(d.actionRange, d.follow.hitbox, 833);
            if (!algo.rectint(d.actionRange, d.follow.hitbox)) d.follow = undefined;
            else d.m[0] = (d.follow.x == d.x) ? 0 : ((d.follow.x > d.x) ? d.s : -d.s);
            printLog(d.hitbox, o.player.hitbox, 836);
            if (algo.rectint(d.hitbox, o.player.hitbox)) o.player.dead = 0;
            
            if (o.interacts[o.player.ground] != undefined) {
                if (o.player.ground != -1 && o.interacts[o.player.ground].y < d.y && !d.jumping) {
                    d.m[1] = 20;//16;
                    d.jumping = true;
                }
            }
        } else {
            // patrol
            if (d.m[0] == 0) d.m[0] = -d.s/2;
            if (d.x <= d.p[0]) d.m[0] = d.s/2;
            else if (d.x >= d.p[2]) d.m[0] = -d.s/2;
        }
        // Movement
        d.fright = d.m[0] > 0 ? true : d.m[0] < 0 ? false : d.fright;
        d.detectBox = [
            0,
            d.fright ? d.x : d.x - (detectSize[0] - d.hitbox[3]),d.y - (detectSize[1] - d.hitbox[4]), 
            detectSize[0], detectSize[1],
        ];
        d.actionRange = [
            0,
            d.fright ? d.x + actionR[0] : d.x - actionR[0] - (actionR[2] - d.hitbox[3]),d.y - actionR[1] - (actionR[3] - d.hitbox[4]), 
            actionR[2], actionR[3]
        ]
        d.hitbox = d.hitbox.concat(d.detectBox).concat(d.actionRange);
        
        printLog(d.detectBox, o.player.hitbox, 858);
        if (algo.rectint(d.detectBox, o.player.hitbox)) d.follow = o.player;
        if (o.player.hitbox.slice(5).length == 5) {
            printLog(d.hitbox.slice(0,5),o.player.hitbox.slice(5), 861);
            if (algo.rectint(d.hitbox.slice(0,5),o.player.hitbox.slice(5))) {
                d.dead = 0;
                o.player.points += d.ess;
                return;
            }
        }
        algo.physics(dt, d, o);
        if (d.ground != -1) {
            d.nocollide.splice(1);
            d.jumping = false;
        }
        // Render
        let v = (Math.abs(d.m[0])>0.15?1+Math.floor(t/100)%(origins.length - 1):0);
        o.sprites(asset_name, [d.x, d.y], [0, 0, origins[v][0], origins[v][1], sizes[v][0], sizes[v][1], 1- (fright_reverse ? !d.fright : d.fright)]);
    }
}

function printLog(A, B, ln) {
    if (A.length == 0 && B.length == 0) console.log(ln + ": A and B in" );
    else if (A.length == 0) console.log(ln + ": A");
    else if (B.length == 0) console.log(ln + ": B");
}

function offsetRectWithFright(frame, arr, fright) {
    let res = [
        arr[0],
        fright ? frame[1] + arr[1] : frame[1] - arr[1] - (arr[3] - frame[3]),frame[2] - arr[2] - (arr[4] - frame[4]), 
        arr[3], arr[4]
    ];
    return res;
}

export {entities, required_files};