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
        default: {x:0, y:0, f: 0, m:[0,-9], right: true, crouch: false, on_ground: false, jumping: false,
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
        render: (d, o, t, dt) => {
            var c = d.m[0] < 0 || !d.right ? 1 : 0;
            // Hair
            o.sprite('sprites.png', d.x+7*c, d.y+d.s[2]*1.8+2*d.s[1]*d.s[1]-(1-Math.abs(d.m[1])/9), 32+4*d.s[0], 0, 4, 5, c==1);
            // Leg Left
            o.sprite('sprites.png', d.x+6-d.s[3]*(1-2*c)-c*5+(1-Math.abs(d.m[1])/9)*(1-2*c), d.y+14, 36, 20, 4, 3, c==1);
            // Leg Right
            o.sprite('sprites.png', d.x+2+d.s[3]*(1-2*c)+c*3-(1-Math.abs(d.m[1])/9)*(1-2*c), d.y+14-Math.min(d.s[3]*(4-d.s[3])/3,1), 36, 20, 4, 3, c==1);
            // Hand Left
            o.sprite('sprites.png', d.x+8-Math.sin(d.s[4]*Math.PI/2)*2*(1-2*c)-c*8+d.s[1]-2*d.s[1]*c, d.y+10+d.s[1]*d.s[1]-d.s[1], 33, 20, 3, 3);
            // Body
            o.sprite('sprites.png', d.x+2, d.y+11+d.s[1]*0.5, 34, 17, 7, 3, c==1);
            // Hand Right
            o.sprite('sprites.png', d.x+Math.sin(d.s[4]*Math.PI/2)*2*(1-2*c)+c*8-d.s[1]+2*d.s[1]*c, d.y+10+d.s[1]*d.s[1]-d.s[1], 33, 20, 3, 3);
            // Chest
            o.sprite('sprites.png', d.x, d.y+6+d.s[2]*0.7+d.s[1], 32, 12, 11, 5, c==1);
            // Head
            o.sprite('sprites.png', d.x+2, d.y+1+d.s[2]+2*d.s[1]-(1-Math.abs(d.m[1])/9), 32+6*Math.round(d.s[1]), 5, 7, 7, c==1);
        },
        update: (d, o, t, dt) => {
            // Movement
            var dfx = 50*Math.sin(d.w/240*Math.PI) * (d.w < 120 ? -1 : 1) / (100*Math.abs(d.m[0]) + 1);
            d.w = (d.w+Math.min(Math.abs(d.m[0]),1)*dt+dfx)%240;
            d.s = [
                0,
                d.crouch,
                (Math.sin((d.w-60)/120*Math.PI)+1)/2,
                (d.w/60)%4,
                (d.w/120)%2
            ];
            d.x += d.m[0]*dt/60*(2-d.s[1])/2;
            d.on_ground = o.physics(d, d.m[1] > 0 || (d.s[1] > 0.5 && !d.jumping) ? 1 : 4)
            if(!d.on_ground) d.y -= algo.gravity(d.m, dt);
            //o.physics(d, d.m[1] > 0 ? 1 : 4)

            //d.y = Math.min(d.y, 88);
            d.right = d.m[0] == 0 ? d.right : d.m[0] > 0;
            
            var c = d.m[0] < 0 || !d.right ? 1 : 0;
            // Hair
            o.sprite('sprites.png', d.x+7*c, d.y+d.s[2]*1.8+2*d.s[1]*d.s[1]-(1-Math.abs(d.m[1])/9), 32+4*d.s[0], 0, 4, 5, c==1);
            // Leg Left
            o.sprite('sprites.png', d.x+6-d.s[3]*(1-2*c)-c*5+(1-Math.abs(d.m[1])/9)*(1-2*c), d.y+14, 36, 20, 4, 3, c==1);
            // Leg Right
            o.sprite('sprites.png', d.x+2+d.s[3]*(1-2*c)+c*3-(1-Math.abs(d.m[1])/9)*(1-2*c), d.y+14-Math.min(d.s[3]*(4-d.s[3])/3,1), 36, 20, 4, 3, c==1);
            // Hand Left
            o.sprite('sprites.png', d.x+8-Math.sin(d.s[4]*Math.PI/2)*2*(1-2*c)-c*8+d.s[1]-2*d.s[1]*c, d.y+10+d.s[1]*d.s[1]-d.s[1], 33, 20, 3, 3);
            // Body
            o.sprite('sprites.png', d.x+2, d.y+11+d.s[1]*0.5, 34, 17, 7, 3, c==1);
            // Hand Right
            o.sprite('sprites.png', d.x+Math.sin(d.s[4]*Math.PI/2)*2*(1-2*c)+c*8-d.s[1]+2*d.s[1]*c, d.y+10+d.s[1]*d.s[1]-d.s[1], 33, 20, 3, 3);
            // Chest
            o.sprite('sprites.png', d.x, d.y+6+d.s[2]*0.7+d.s[1], 32, 12, 11, 5, c==1);
            // Head
            o.sprite('sprites.png', d.x+2, d.y+1+d.s[2]+2*d.s[1]-(1-Math.abs(d.m[1])/9), 32+6*Math.round(d.s[1]), 5, 7, 7, c==1);

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