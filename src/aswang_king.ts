import {engine} from "./engine.ts";
import {algo} from "./algorithms.ts";
import {entities} from "./entities.ts";

// @ts-ignore
entities = {
    ...entities,
    // Pinoy Entitiy
    pinoy: {
        default: {
            x:0, y:200, m:[0,0],
            isdead: false, // Is character dead?
            crouch: false, // Is character crouching?
            ground: false, // Is character standing on ground?
            fright: true,  // Is character facing right?
            camera: true,  // Is camera on character?
        },
        update: (d, o, t, dt) => {
            d.fright = d.m[0] > 0 ? true : d.m[0] < 0 ? false : d.fright;
            d.x += d.m[0]*dt/10;
            d.y -= d.m[1]*dt/50;
            // Temporary Ground
            if(d.y >= 200) {
                d.ground = true;
                d.y = 200;
                d.m[1] = 0;
            } else {
                d.ground = false;
                d.y -= algo.gravity(d.m, dt);
            }
            
            // Camera
            if (d.camera) {
                o.camera[0] = d.x-o.w/2;
            }

            o.sprites('McCombinedNew2.png', [d.x, d.y],
                [ 0, 0,
                    !d.ground ? 32*15 : d.crouch ? 32*14: Math.abs(d.m[0]) > 0.5 ? 32*(2+Math.floor(t/75)%12) : 32*Math.floor(t/100)%2, 0,
                    32, 32,
                    d.fright ? 0 : 1
                ]
            );
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
    }
};

let debug = false;
let main = new engine({
    z:4, w:320, h:240, sprite_boxed:debug, rotate_boxed: debug
});
let back = main.entity('background', {darkmode:true, dark:1});
let player = main.entity('pinoy');
let pet = [main.entity('dog'), main.entity('cat', {x:32})];
let king = main.entity('king');

main.load(
    'dark bg.png', 'normal bg.png', 'normal clouds.png', 
    'Dog.png', 'Cat (1).png', 'Aswang King.png',
    'McCombinedNew2.png'
);
main.scene('menu', (t, dt) => {
    main.add(back, player, pet, king);

    if(main.on('x')) back.darkmode = !back.darkmode;

    if(main.on('w, ,ArrowUp') && player.ground) {
        player.crouch = true;
        player.m[0] = 0;
    } else if (player.crouch) {
        player.m[1] = 10;
        player.crouch = false;
    }
    
    else if(main.on('d,ArrowRight')) player.m[0] = 1;
    else if(main.on('a,ArrowLeft')) player.m[0] = -1;
    else player.m[0] = 0;
});
main.render();