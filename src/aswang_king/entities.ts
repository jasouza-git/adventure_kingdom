import { entities_type } from "../types";
import { algo } from "../algorithms";

let required_files:string[] = [
    // Menu
    'Rise_of_the_Aswang_King.png',
    // Background
    'dark bg.png', 'normal bg.png', 'normal clouds.png', 'Housesv2.png',
    // Platforms
    'Flowers.png', 'Bgitems.png', 'Blocks.png', 'Trees.png', 'Lagablab, bubble and random vegetation.png',
    // Entities
    'Dog.png', 'Cat (1).png', 'Aswang King.png', 'Arrow.png', 'Mananangalv3.png',
    // Player
    'Mcparts.png',
    // Music
    'song/1st Temp BG Song (New Area).mp3'
];
let entities:entities_type = {
    // Pinoy Entitiy
    pinoy: {
        default: {
            x:0, y:0, m:[0,0], hitbox:[], collide:[], nocollide:[],
            isdead: false, // Is character dead?
            crouch: false, // Is character crouching?
            jumping: false,// Is character jumping?
            fright: true,  // Is character facing right?
            camera: true,  // Is camera on character?
            swing: false,  // Is character swinging sword?
            swinging: 0,   // Current swining position (0->1)
            dead: -1,      // Level of deadness (-1 Not dead, 0->1 Dying)
            ground: -1,    // Collider character is on
        },
        update: (d, o, t, dt) => {
            // Hitbox
            d.hitbox = [ 15,
                d.x+12, d.y,
                8, 29
            ];

            // Movement
            if (d.dead == -1) {
                d.fright = d.m[0] > 0 ? true : d.m[0] < 0 ? false : d.fright;
                let cols = algo.physics(dt, d);
                if (d.crouch && !d.jumping) cols.forEach(c => {
                    if (c[1]==2) d.nocollide.push(c[0]);
                });
                else d.nocollide = [];
            }
            if (d.y >= o.h-32) d.dead = 0;
            
            // Camera
            if (d.camera) {
                o.camera[0] = d.x-o.w/2;
            }

            // Sword
            if (d.swing && d.dead == -1) {
                d.swinging += (1-d.swinging)*dt/100;
                if (d.swinging > 0.9) d.swing = false;
            } else d.swinging -= d.swinging*dt/100;
            let s = Math.round(d.swinging*2.4);

            // Rendering
            let c = n => [n%6, Math.floor(n/6)];
            let leg = c(
                d.ground == -1 ? 8 :
                d.crouch ? 7 :
                Math.abs(d.m[0]) > 0.5 ? 1+Math.floor(t/50)%6 :
                0
            );
            let body = c(
                s > 0 ? 27+s :
                d.ground == -1 ? 26 :
                d.crouch ? 25 :
                Math.abs(d.m[0]) > 0.5 ? 13+Math.floor(t/50)%12 :
                12
            );
            if (d.dead != -1) {
                d.y = o.h-33;
                leg = c(9);
                body = c(27);
                d.dead += (1-d.dead)*dt/200;
            }
            o.sprites('Mcparts.png', [d.x, d.y-(d.dead == -1 ? 0 : 21*Math.sin(1.32*(d.dead*d.dead+0.133)*Math.PI)-11)],
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
            house: false
        },
        update: (d, o, t, dt) => {
            if (d.darkmode) d.dark += (1-d.dark)*dt/1000;
            else d.dark -= d.dark*dt/1000;
            o.draw('', {img:'normal bg.png'});
            o.draw('', {img:'dark bg.png', alpha: d.dark});
            if (d.house) o.sprites('Housesv2.png', [], [-150, 100, 126, 0, 128, 128]);
        }
    },
    pet: {
        default: {x:0, y:0, m:[0,0], animal:0, jumping: false, ground:-1, collide:[], nocollide:[], hitbox:[]},
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
                if (d.follow.ground != -1 && d.follow.collide[d.follow.ground].y < d.y && !d.jumping) {
                    d.m[1] = 20;//16;
                    d.jumping = true;
                } else if (d.follow.ground != -1 && d.ground != -1 && d.follow.collide[d.follow.ground].y > d.y+16) {
                    d.nocollide = [d.ground];
                }
            }
            // Movement
            d.fright = d.m[0] > 0 ? true : d.m[0] < 0 ? false : d.fright;
            algo.physics(dt, d);
            if (d.ground != -1) {
                d.jumping = false;
                d.nocollide = [];
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
        default: {x:0, y:0, m:[0,0], a:0},
        update: (d, o, t, dt) => {
            if (d.y < 220) {
                d.x += d.m[0]*dt/50;
                //d.y -= algo.gravity(d.m, dt);
                d.a += (Math.atan2(d.m[1], -d.m[0])-d.a)*dt/200;
            }
            o.sprites('Arrow.png', [d.x, d.y],
                [0, 0, 0, 0, 8, 5, 0, 0, d.a, 4, 3]
            );
        },
        create: (o, arg) => {
            return {
                m: [5-10*Math.random(), 5-10*Math.random()],
                ...arg
            }
        }
    },
    plat: {
        default: {x:0, y:0, w:0, h:0, hitbox:[]},
        update: (d, o, t, dt) => {
            let bs:number[][] = [];
            for (let y = 0; y < d.h*2; y++) {
                for (let x = 0; x < d.w*2; x++) {
                    bs.push([
                        8*x, 8*y,
                        x == 0 ? 23 : x+1 == d.w*2 ? 31 : 27,
                        y == 0 ? 22 : y+1 == d.h*2 ? 34 : 30,
                        8, 8
                    ]);
                }
            }
            for (let x = 0; x < d.w; x++) {
                if (d.data[x]&8) o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], [32*x,-32,0,0,32,32]);
                if (d.data[x]&4) o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], [32*x,-32,32,0,32,32]);
                if (d.data[x]&2) o.sprites('Trees.png', [d.x, d.y], [32*x, -64, 0, 0, 64, 64]);
                if (d.data[x]&1) o.sprites('Flowers.png', [d.x, d.y], [32*x,-32,0,0,32,32]);
            }
            o.sprites('Blocks.png', [d.x, d.y], ...bs);
            d.hitbox = [ 1,
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
                (Math.random() < 0.1 ? 8 : 0) 
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
        default: {x:0, y:0, t:0},
        update: (d, o, t, dt) => {
            let c = [
                // Body
                [0, 0, 0, 0, 32, 32],
                // Wing
                [0, 1, 32*3, 0, 32, 32, 0, 0, Math.sin(t/100)*0.5-0.5, 11, 19]
            ];
            let tng = Math.floor(d.t*4);
            if (tng > 0) c.push([7, 8, Math.floor(t/100)%3*32, 32*3, 32, 32, 0, 0, 0]);
            o.sprites('Mananangalv3.png', [d.x, d.y+Math.sin(t/200)*0.5], ...c);
        }
    }
};

export {entities, required_files};