import { entities_type } from "../types";
import { algo } from "../algorithms";

let required_files:string[] = [
    'Rise_of_the_Aswang_King.png',
    'Flowers.png', 'Bgitems.png', 'Blocks.png',
    'dark bg.png', 'normal bg.png', 'normal clouds.png',
    'Dog.png', 'Cat (1).png', 'Aswang King.png', 'Arrow.png',
    'Mcparts.png'
];
let entities:entities_type = {
    // Pinoy Entitiy
    pinoy: {
        default: {
            x:0, y:100, m:[0,0], hitbox:[], collide:[], nocollide:[],
            isdead: false, // Is character dead?
            crouch: false, // Is character crouching?
            ground: false, // Is character standing on ground?
            jumping: false,// Is character jumping?
            fright: true,  // Is character facing right?
            camera: true,  // Is camera on character?
            swing: false,  // Is character swinging sword?
            swinging: 0,   // Current swining position (0->1)
        },
        update: (d, o, t, dt) => {
            d.fright = d.m[0] > 0 ? true : d.m[0] < 0 ? false : d.fright;
            let cols = algo.physics(dt, d);
            if (d.crouch && !d.jumping) cols.forEach(c => {
                    if (c[1]==2) d.nocollide.push(c[0]);
                });
            else d.nocollide = [];
            
            // Camera
            if (d.camera) {
                o.camera[0] = d.x-o.w/2;
            }

            // Sword
            if (d.swing) {
                d.swinging += (1-d.swinging)*dt/100;
                if (d.swinging > 0.9) d.swing = false;
            } else d.swinging -= d.swinging*dt/100;
            let s = Math.round(d.swinging*2.4);

            let c = n => [n%6, Math.floor(n/6)];


            let leg = c(1+Math.floor(t/50)%6);
            let body = c(13+Math.floor(t/50)%12);
            o.sprites('Mcparts.png', [d.x, d.y],
                // Leg
                [   0, 0,
                    !d.ground ? 64 : d.crouch ? 32 : Math.abs(d.m[0]) > 0.5 ? 32*leg[0] : 0,
                    !d.ground || d.crouch ? 32 : Math.abs(d.m[0]) > 0.5 ? 32*leg[1] : 0,
                    32, 32,
                    d.fright ? 0 : 1
                ],
                // Body
                [   0, d.crouch ? 2 : 0,
                    s > 0 ? 32*(4+s-1) : !d.ground ? 64 : d.crouch ? 32 : Math.abs(d.m[0]) > 0.5 ? 32*body[0] : 0,
                    s > 0 ? 32*4 : !d.ground || d.crouch ? 32*4 : Math.abs(d.m[0]) > 0.5 ? 32*body[1] : 64,
                    32, 32,
                    d.fright ? 0 : 1
                ]
            );

            // Hitbox
            d.hitbox = [ 15,
                d.x+7, d.y,
                16, 29
            ];
        }
    },
    // Background Entity
    background: {
        default: {
            darkmode: false,
            dark: 0
        },
        update: (d, o, t, dt) => {
            if (d.darkmode) d.dark += (1-d.dark)*dt/1000;
            else d.dark -= d.dark*dt/1000;
            o.draw('', {img:'normal bg.png'});
            o.draw('', {img:'dark bg.png', alpha: d.dark});
        }
    },
    dog: {
        default: {x:0, y:220, running:true},
        update: (d, o, t, dt) => {
            o.sprites('Dog.png', [d.x, d.y], 
                [0, 0, (d.running?1+Math.floor(t/100)%2:0)*32+3, 8, (38+14)/2, 15]
            );
        }
    },
    cat: {
        default: {x:0, y:220, running:true},
        update: (d, o, t, dt) => {
            o.sprites('Cat (1).png', [d.x, d.y],
                [0, 0, (d.running?1+Math.floor(t/100)%2:0)*16, 0, 16, 16]
            )
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
                if (d.data[x] > 0.5)
                    o.sprites('Flowers.png', [d.x, d.y],
                        [32*x,-32,0,0,32,32]
                    );
            }
            o.sprites('Blocks.png', [d.x, d.y], ...bs);
            d.hitbox = [ 1,
                d.x, d.y,
                d.w*16, d.h*16
            ];
        },
        create: (o, arg) => {
            let seed = Number(new Date())
            let w = arg.w || 0;
            let d:number[] = [];
            for (let i = 0; i < w>>1; i++) d.push(Math.random());
            return {
                seed: seed,
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
    }
};

export {entities, required_files};