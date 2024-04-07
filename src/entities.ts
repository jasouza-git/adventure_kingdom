import {entities_type} from "./types.ts";
import {algo} from "./algorithms.ts";

let entities:entities_type = {
    // Pinoy Entitiy
    pinoy: {
        default: {x:0, y:0, f:0, g: 1, m:[0,0]},
        update: (d, o, t, dt) => {
            d.m[0] -= d.m[0]*dt/50;
            //d.y -= d.m[1]*dt/100;
            if(!d.g) d.m[1] -= ((d.m[1] > 1 ? 10 : 20)+d.m[1])*dt/100;
            if(d.y > 200) {
                d.g = 1;
                d.y = 200;
                d.m[1] = 0;
            }
            o.sprite('MC.png',
                d.x, d.y,
                Math.abs(d.m[1]) > 0.5 ? d.f%3%2*32 : Math.abs(d.m[0]) > 0.5 ? (2+d.f)%3*32             : d.f%2*32,
                Math.abs(d.m[1]) > 0.5 ? 64         : Math.abs(d.m[0]) > 0.5 ? Math.floor((2+d.f)/3)*32 : 0, 
            32, 32, d.m[0] < 0);
        }
    },
    // Knight 
    knight: {
        default: {x:0, y:0,
            m: [0,-9],          // Momentum Vector
            player: 0,          // Player Number (0,1)
            right: true,        // Facing Right?
            crouched: false,    // Is crouching?
            on_ground: false,   // Is on ground?
            jumping: false,     // Is jumping?
            on_camera: true,    // Is focused on camera?
            c: 0,               // Crouchyness
            sword: 0,           // Sword [-1:No Sword, 0->1:Swinging Sword]
            w:0, // From 0 - 90
            s: [
                0, // Hair [red, blue]
                0, // Head [normal, duck]
                0, // Neck [normal, bend]
                0, // Walking animation [4 frames]
                0, // Hand swing [2 frames]
            ],
            hitbox: [], collide: []
        },
        update: (d, o, t, dt) => {
            //algo.physics(d, {})
            // Movement
            d.c += (d.crouched||d.sword>0.1?dt/100:0)-d.c*dt/100;
            d.x += d.m[0]*dt/60*(2-d.c)/2;
            if(!d.on_ground) d.y -= algo.gravity(d.m, dt);
            d.on_ground = algo.collide(d, d.m[1] > 0 || (d.crouched && d.c > 0.9 && !d.jumping) ? 1 : 4);
            if(d.on_ground) d.m[1] = -9;
            d.right = d.m[0] == 0 ? d.right : d.m[0] > 0;
            var c = d.m[0] < 0 || !d.right ? 1 : 0;
            
            // Animation
            d.w = (d.w+Math.min(Math.abs(d.m[0]),1)*dt+50*Math.sin(d.w/240*Math.PI)*(d.w<120?-1:1)/(100*Math.abs(d.m[0])+1))%240;
            let s = [
                (Math.sin((d.w-60)/120*Math.PI)+1)/2,       // Neck Bendyness [0->1]
                (d.w/60)%4,                                 // Walking Animation [4 Frames]
                Math.sin((d.w/120)%2*Math.PI/2)*2*(1-2*c),  // Hand Swinging [2 Frames]
                (1-Math.cos(t/500))*0.25                    // Breathing [0->0.25]
            ];

            
            // Camera focus
            if (d.on_camera) {
                o.camera[0] = d.x-o.w/2;
                o.camera[1] = Math.min(0, d.y-o.h/2);
            }

            // Render
            let parts = [
                // Hair
                [7*c, s[0]*1.8+2*d.c*d.c-(1-Math.abs(d.m[1])/9)+s[3],                                      32+4*d.player, 0, 4, 5, c],
                // Leg Left
                [6-c*5+(1-Math.abs(d.m[1])/9-s[1])*(1-2*c), 14,                                                 36, 20, 4, 3],
                // Leg Right
                [2+c*3-(1-Math.abs(d.m[1])/9-s[1])*(1-2*c), 14-Math.min(s[1]*(4-s[1])/3,1)                      ],
                // Hand Left
                [8-s[2]-c*8+d.c-2*d.c*c, 10+d.c*d.c-d.c, 33, 20, 3, 3, c, 0, 0],
                // Body
                [2, 11+d.c*0.5,                                                                            34, 17, 7, 3],
                // Hand Right
                [s[2]+c*8-d.c+2*d.c*c, 10+d.c*d.c-d.c,   33, 20, 3, 3],
                // Chest
                [0, 6+s[0]*0.7+d.c+s[3]/2,                                                                        32, 12, 11, 5],
                // Head
                [2, 1+s[0]+2*d.c-(1-Math.abs(d.m[1])/9)+s[3],                                                   32+6*Math.round(d.c), 5, 7, 7]
            ];
            // Sword
            if (d.sword != -1) {
                if (d.sword < 0.5) parts.splice(3, 0, [(c ? -3 : 10)-s[2]+d.c-2*d.c*c, 5, 45, 5, 4, 7, c, 0, d.sword*2, c?3:0, 6]);
                else parts.splice(8, 0, [(c ? -9 : 0)+d.c-2*d.c*c, 7+d.c+s[3]/2, 49, 5, 20, 8]);
                d.sword -= d.sword*dt/100;
            }

            o.sprites('sprites.png', [d.x, d.y],
                ...parts
            );

            // Hitbox
            d.hitbox = [ 15,
                d.x, d.y,
                11, 16
            ]
        }
    },
    // Dirt Entity
    dirt: {
        default: {x: 0, y: 0, w: 0, h: 0, hitbox:[]},
        update: (d, o, t, dt) => {
            for (var i = 0; i < d.w; i++) for (var j = 0; j < d.h; j++)
                o.sprite('sprites.png',
                    d.x+i*8,d.y+j*8,
                    i==0?0:i+1>=d.w?8:4,
                    j==0?0:j+1>=d.h?12:8,
                    8, 8
                );
        },
        create: (o, a) => {
            return {hitbox: [1, a.x+4, a.y, a.w*8-8, 8], ...a};
        }
    },
    liquid: {
        default: {x:0, y:0, w:0, h:0, lava: false},
        update: (d, o, t, dt) => {
            var f = Math.floor(t/200*(d.lava?1:1.5))%4;
            for (var i = 0; i < d.w; i++) for (var j = 1; j < d.h*2-1; j++)
                o.sprite('sprites.png',
                    d.x+i*8, d.y+4*j,
                    (i+f+j)%2*8+(d.lava?16:0), 35+Math.floor((i+f+j)/2)%2*8,
                    8, 8
                )
        }
    },
    eud: { // Entity of Ups and Downs
        default: {x:0, y:0, w:0, h:0, seed:0, s: 0, t:0, hp:0},
        update: (d, o, t, dt) => {
            if (d.t == 0) {
                d.x += d.s*dt/1000;
                if (d.x > o.w) d.x = -d.w*8;
            }
            algo.cdr_it(d.seed, d.w, (p, h, x, e) => {
                let m = Math.abs(2*p-3)==1?4:0;
                for (var j = 0; j < h+d.hp; j++)
                    o.sprite('sprites.png',
                        d.x+x*8, d.y-j*8-8,
                        8, 63-8-(j==0?0:1)+d.t*12,
                        8, 8
                    );
                o.sprite('sprites.png',
                    d.x+x*8, d.y-(h+d.hp)*8+(m==4?5:0)-8,
                    [16,8,8,0][p], 55-m-(m==0?1:0)+d.t*12+(e?1:0),
                    8, 8-(m==4?5:0)
                );
            });
        },
        create: (o, arg) => {
            let w = arg != undefined && arg.w ? arg.w : Math.floor(Math.random()*12)+2;
            let h = 0;
            let s = algo.cdr(w-2);
            algo.cdr_it(s, w, (p, ht) => h = Math.max(ht, h));
            let x = Math.floor(Math.pow(Math.random(),3)*(o.w/o.z+w*8))-w*4;
            let y = Math.floor(Math.pow(Math.random(),3)*(o.h/o.z-h*24))+(h+1)*8;
            return {
                x: x,
                y: y,
                w: w,
                h: h+1,
                seed: s,
                s: Math.random()*5+1,
                ...arg
            };
        }
    }
}
export {entities};