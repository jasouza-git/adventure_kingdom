import { entities_type } from "../types";
import { algo } from "../algorithms";

let required_files:string[] = [
    // Menu
    'Rise_of_the_Aswang_King.png',
    // Background
    'Housesv2.png', 'bg normal (no clouds) .png', 'bg normal (w clouds) .png',
    // Platforms
    'Flowers.png', 'Bgitems.png', 'Blocks.png', 'Treesv2.png', 'Lagablab, bubble and random vegetation.png',
    // Entities
    'Dog.png', 'Cat (1).png', 'Aswang King.png', 'Arrow.png', 'Mananangalv3.png', 'Shooterv2.png',
    // Objects
    'Vine.png', 'Tripwire2Correct.png', 'pressure.png',
    // Player
    'Mcparts.png',
    // Music
    'song/1st Temp BG Song (New Area).mp3'
];
let entities:entities_type = {
    // Pinoy Entitiy
    pinoy: {
        default: {
            x:0, y:0, m:[0,0], hitbox:[], nocollide:[],
            crouch: false, // Is character crouching?
            jumping: false,// Is character jumping?
            fright: true,  // Is character facing right?
            camera: 0,     // Camera on player offset, if undefined then no set
            swing: false,  // Is character swinging sword?
            interact:true, // Physics entities interacts
            swinging: 0,   // Current swining position (0->1)
            dead: -1,      // Level of deadness (-1 Not dead, 0->1 Dying)
            ground: -1,    // Collider character is on
            lives: 3
        },
        update: (d, o, t, dt) => {
            let c = n => [n%6, Math.floor(n/6)];
            let leg = [0,0], body = [0,0];
            if (d.dead == -1) {
                // Hitbox
                d.hitbox = [ 15,
                    d.x+12, d.y,
                    8, 29
                ];

                // Movement
                d.fright = d.m[0] > 0 ? true : d.m[0] < 0 ? false : d.fright;
                let cols = algo.physics(dt, d, o);
                if (d.crouch && !d.jumping) cols.forEach(c => {
                    if (c[1]==2 && o.interacts[c[0]].dropoff) d.nocollide.push(c[0]);
                });
                else d.nocollide = [];
                if (d.y >= o.h-32) d.dead = 0;
                
                // Camera
                if (d.camera != undefined) {
                    //o.camera[0] = d.x-o.w/2;
                    o.camera[0] += (d.x+d.camera-o.w/2-o.camera[0])*dt/100;
                }

                // Sword
                if (d.swing && d.dead == -1) {
                    d.swinging += (1-d.swinging)*dt/100;
                    if (d.swinging > 0.9) d.swing = false;
                } else d.swinging -= d.swinging*dt/100;
                let s = Math.round(d.swinging*2.4);
                if (s > 0) d.hitbox.push(0,
                    d.x+(d.fright?20:-4), d.y,
                    16, 29
                );


                leg = c(
                    d.ground == -1 ? 8 :
                    d.crouch ? 7 :
                    Math.abs(d.m[0]) > 0.5 ? 1+Math.floor(t/50)%6 :
                    0
                );
                body = c(
                    s > 0 ? 27+s :
                    d.ground == -1 ? 26 :
                    d.crouch ? 25 :
                    Math.abs(d.m[0]) > 0.5 ? 13+Math.floor(t/50)%12 :
                    12
                );
            } 
            if (d.dead != -1) {
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
                    d.x = 0;
                    d.y = 195;
                    d.m = [0,0];
                    d.fright = true;
                }
            }

            // Rendering
            o.sprites('Mcparts.png', [d.x, d.dead == -1 ? d.y : d.dead < 0.5 ? d.y-10*Math.sin(d.dead*Math.PI) : o.h+22-Math.sin(d.dead*Math.PI)*(o.h-d.y+32)],
                // Leg
                [0, 0, 32*leg[0], 32*leg[1], 32, 32, 1-d.fright],
                // Body
                [0, d.crouch ? 2 : 0, 32*body[0] , 32*body[1], 32, 32, 1-d.fright]
            );

        }
    },
    // Background Entity
    background: {
        default: {
            darkmode: false,
            dark: 0,
            house: false,
            data: 0,
        },
        update: (d, o, t, dt) => {
            if (d.darkmode) d.dark += (1-d.dark)*dt/1000;
            else d.dark -= d.dark*dt/1000;
            //o.draw('', {img:'normal bg.png'});
            //o.draw('', {img:'dark bg.png', alpha: d.dark});
            for (var x = -5; x < 7; x++) o.sprites(d.data>>(x+5)&1 ? 'bg normal (no clouds) .png' : 'bg normal (w clouds) .png', [], [64*x, 0, 0, 0, 64, 240, 0, 0, 0, 0, 0, 0.1]);
            if (d.house) o.sprites('Housesv2.png', [], [-150, 100, 126, 0, 128, 128]);
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
            d.hitbox = [ 15,
                d.x, d.y,
                26, 15
            ];
            // Follow AI
            if (d.follow != undefined && d.follow.dead == -1) {
                d.m[0] = Math.abs(d.follow.x+(d.follow.x>d.x?-15:15)-d.x)<15?0:d.follow.x>d.x?7:-7;//(d.follow.x+(d.follow.x>d.x?-10:10)-d.x)/10;
                if (Math.abs(d.follow.y-d.y) > o.h) {
                    d.x = d.follow.x;
                    d.y = d.follow.y;
                }
                // Jump
                if (d.follow.ground != -1 && o.interacts[d.follow.ground].y < d.y && !d.jumping) {
                    d.m[1] = 20;//16;
                    d.jumping = true;
                } else if (d.follow.ground != -1 && d.ground != -1 && o.interacts[d.follow.ground].y > d.y+16) {
                    d.nocollide.push(d.ground);
                }
            } else d.m[0] = 0;
                
            // Movement
            d.fright = d.m[0] > 0 ? true : d.m[0] < 0 ? false : d.fright;
            algo.physics(dt, d, o);
            if (d.ground != -1) {
                d.jumping = false;
                d.nocollide.splice(1);
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
    king: {
        default: {x:0, y:100,
            wing_angle: 0
        },
        update: (d, o, t, dt) => {
            d.wing_angle = Math.sin(t/150);
            o.sprites('Aswang King.png', [d.x, d.y],
                // Right wing
                [61, 1+Math.sin(t/200), 35, 0, 35, 18, 0, 0, -d.wing_angle, 0, 18],
                // Left wing
                [0, Math.sin(t/200), 0, 0, 35, 18, 0, 0, d.wing_angle, 35],
                // Left hand
                [1, 24+Math.sin(t/200)/2, 0, 18, 23, 21, 0, 0, 0],
                // Right hand
                [66, 24+Math.sin(t/200)/2, 23, 18, 23, 21],
                // Body
                [28, 13+Math.sin(t/200), 0, 39, 37, 52],
                // Head
                [41, 1+Math.sin(t/200)*2, 70, 0, 13, 18],
            )
        }
    },
    arrow: {
        default: {x:0, y:0, m:[0,0], a:0, nocollide:[], ground:-1, hitbox:[], parent:undefined, duration: 3000},
        update: (d, o, t, dt) => {
            if (d.duration <= 0) return;
            let col = algo.physics(dt, d, o);
            if (d.m[0]*d.m[0]+d.m[1]*d.m[1] > 1) col.forEach(c => {
                if (o.interacts[c[0]]['__type__'] == 'pinoy' && o.interacts[c[0]].dead == -1) o.interacts[c[0]].dead = 0;
            });
            if (d.ground == -1) d.a += (Math.atan2(d.m[1], -d.m[0])-d.a)*dt/200;
            else {
                d.m = [0, 0];
                d.duration -= dt;
            }


            o.sprites('Arrow.png', [d.x, d.y],
                [0, 0, 0, 0, 8, 5, 0, 0, d.a, 4, 3]
            );
            d.hitbox = [15,
                d.x, d.y,
                8, 5
            ];
            if (o.player && algo.rectint(d.hitbox, o.player.hitbox.slice(5))) d.duration = 0;
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
                if (d.data[x]&8) {
                    if (d.mode == 0) o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], [32*x,-32,0,0,32,32]);
                    else if(d.mode == 1) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 0, 128, 32, 32]);
                    else if(d.mode == 2) o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], [32*x,-32,0,64,32,32]);
                }
                // Big grass (20%)
                if (d.data[x]&4) {
                    if (d.mode == 0) o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], [32*x,-32,32,0,32,32]);
                    else if(d.mode == 1) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 32, 32, 32, 32]);
                    else if(d.mode == 2) o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], [32*x,-32,64,0,32,32]);
                }
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
            o.sprites('Blocks.png', [d.x, d.y], ...bs);
            d.hitbox = [ d.col,
                d.x, d.y,
                d.w*16, d.h*16
            ];
        },
        create: (o, arg) => {
            let w = arg.w || 0;
            let d:number[] = [];
            for (let i = 0; i < w>>1; i++) d.push(
                // Grass
                (Math.random() < 0.5 ? 1 : 0) +
                // Tree
                (Math.random() < 0.1 ? 2 : 0) +
                // Big Grass
                (Math.random() < 0.2 ? 4 : 0) +
                // Bush
                (Math.random() < 0.1 ? 8 : 0) +
                // Special
                (Math.random() < 0.1 ? 16: 0) +
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
        default: {},
        update: (d, o, t, dt) => {
            o.sprites('Rise_of_the_Aswang_King.png', [-128, 0],
                [0, 0, 0, 0, 256, 144]
            )
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

            // Dead
            if (d.dead != -1) {
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
                if (!d.target && d.p != undefined) {
                    let v = d.pn == 0 ? [Math.hypot(d.p[0]-d.x, d.p[1]-d.y), Math.atan2(d.y-d.p[1], d.p[0]-d.x)]
                                    : [Math.hypot(d.p[2]-d.x, d.p[3]-d.y), Math.atan2(d.y-d.p[3], d.p[2]-d.x)];
                    if (v[0] < 10) d.pn = 1-d.pn;
                    d.v = v;
                    d.m = [Math.cos(v[1])*d.speed/2, Math.sin(v[1])*d.speed/2];
                    if (algo.rectint(d.follow.hitbox, d.hitbox.slice(5))) d.target = true;
                    if (Math.abs(Math.cos(v[1])) < 0.2) center = true;
                    //o.sprites('Mananangalv3.png', [p[0], p[1]+Math.sin(t/200)*0.5], [0, 0, 0, 0, 32, 32, d.m[0] < 0]);
                } else if (d.follow != undefined) {
                    let h = Math.hypot(d.follow.x - d.x, d.follow.y - d.y);
                    let a = Math.atan2(d.y-d.follow.y, d.follow.x-d.x);
                    if (h > 20) d.m = [Math.cos(a)*d.speed, Math.sin(a)*d.speed];
                    else d.m = [0, 0];
                    if (Math.abs(d.follow.x - d.x) < 10) center = true;
                    
                    
                    //d.m = [(d.follow.x - d.x)/80, -(d.follow.y - d.y)/80];
                    //if (Math.hypot(d.follow.x - d.x, d.follow.y - d.y) < 30) d.t = 1;
                    //else d.t = 0;
                }
                
                let v = Math.min(Math.hypot(d.p[0]-d.x, d.p[1]-d.y), Math.hypot(d.p[2]-d.x, d.p[3]-d.y));
                if (v > 100 && (Math.min(d.p[0],d.p[2]) > d.x || Math.max(d.p[0],d.p[2]) < d.x)) {
                    d.target = false;
                    d.nofollow = true;
                } else if(v < 50) d.nofollow = false;
                //console.log(d.hitbox.slice(0,5),d.follow.hitbox.slice(5));
                if (algo.rectint(d.hitbox.slice(0,5),d.follow.hitbox.slice(5))) d.dead = 0;
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
        default: {x:0, y:0, f:0, a:0, shoot:0, cooldowntmp:0, cooldown: 1000, bind:[], speed:0, collide:[], s:10},
        update: (d, o, t, dt) => {
            let ofs = 0;
            if (d.shoot > 0) {
                d.cooldowntmp -= dt;
                //console.log(d.cooldowntmp);
                if (d.colldowntmp < 1000) ofs = 2;
                if (d.cooldowntmp <= 0) {
                    d.bind.push(o.entity('arrow', {x:d.x-Math.cos(d.a)*5, y:d.y+Math.sin(d.a)*5, m:[d.s*Math.cos(d.a),d.s*Math.sin(d.a)], parent:d, a:-d.a+Math.PI}));
                    d.shoot--;
                    d.cooldowntmp = d.cooldown;
                }
            }
            o.sprites('Shooterv2.png', [], [d.x-6, d.y-6, 32*ofs, 0, 13, 12, Math.PI/2 < d.a && d.a < 3*Math.PI/2 ? 1 : 0, 0, Math.PI/2 < d.a && d.a < 3*Math.PI/2 ? Math.PI-d.a : -d.a, 6, 6])
        }
    },
    vine: {
        default: {x:0, y:0, h:0},
        update: (d, o, t, dt) => {
            let a:number[][] = [];
            for(var i = 0; i < Math.floor(d.h/24); i++) a.push([0, 24*i, 0, 0, 7, 24]);
            if (d.h%24 != 0) a.push([0, 24*i, 0, 0, 7, d.h%24])
            a.push([2, d.h, 0, 32, 3, 3]);
            o.sprites('Vine.png', [d.x, d.y], ...a);
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
            if (d.follow == undefined) {
                o.interacts.forEach(e => {
                    if (e['__type__'] == 'pinoy') d.follow = e;
                });
            }
            let off:number = 0;
            if (d.follow != undefined && algo.rectint(d.hitbox, d.follow.hitbox)) {
                if (!d.triggered) d.bind.forEach(s => {
                    s.shoot = 1;
                    s.cooldown = 0;
                });
                d.triggered = true;
                off = 1;
            } else {
                d.triggered = false;
                off = 0;
            }
            let a:number[][] = [[0,0,0,0,3,7],[0,7+d.h,0,9,3,7]];
            for(var i = 0; i < Math.floor(d.h/16); i++) a.push([2,7+16*i,15,0,1,16]);
            if (d.h%16 != 0) a.push([2,7+16*i,15,0,1,d.h%16]);
            o.sprites('Tripwire2Correct.png', [d.x,d.y+off*10], ...a);
        }
    },
    pressure_plate: {
        default: {x:0, y:0, w:10, triggered: false,
            follow:undefined
        },
        update: (d, o, t, dt) => {
            d.hitbox = [0,
                d.x, d.y,
                4+d.w, 2
            ];
            if (d.follow == undefined) {
                o.interacts.forEach(e => {
                    if (e['__type__'] == 'pinoy') d.follow = e;
                });
            }
            let a:number[][] = [[0,0,0,0,2,2],[2+d.w,0,2,0,2,2]];
            for(var i = 0; i < Math.floor(d.w/16); i++) a.push([2+16*i,0,0,2,16,2]);
            if (d.w%16 != 0) a.push([2+16*i,0,0,2,d.w%16,2]);
            if (d.follow != undefined && algo.rectint(d.hitbox, d.follow.hitbox)) {
                if (!d.triggered) d.bind.forEach(s => {
                    s.shoot = 1;
                    s.cooldown = 0;
                });
                d.triggered = true;
            } else d.triggered = false;
            o.sprites('pressure.png', [d.x,d.y], ...a);
        }
    }
};

export {entities, required_files};