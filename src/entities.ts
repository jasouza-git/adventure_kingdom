import {entities_type} from "./types.ts";
let entities:entities_type = {
    // Pinoy Entitiy
    pinoy: {
        default: {x:0, y:0, f:0, g: 1, m:[0,0]},
        update: (d, dt, o) => {
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
        default: {x:0, y:0, f: 0, s: [
            0, // Hair [red, blue]
            0, // Head [normal, duck]
            0, // Neck [normal, bend]
            0, // Walking animation [4 frames]
            0, // Hand swing [2 frames]
        ]},
        update: (d, dt, o) => {
            // Hair
            o.sprite('sprites.png', d.x, d.y+d.s[2]*1.2, 32+4*d.s[0], 0, 4, 5);
            // Leg Left
            o.sprite('sprites.png', d.x+6-d.s[3], d.y+14, 36, 20, 4, 3);
            // Leg Right
            o.sprite('sprites.png', d.x+2+d.s[3], d.y+14-Math.min(d.s[3]*(4-d.s[3])/3,1), 36, 20, 4, 3);
            // Hand Left
            o.sprite('sprites.png', d.x+8-Math.sin(d.s[4]*Math.PI/2)*2, d.y+10, 33, 20, 3, 3);
            // Body
            o.sprite('sprites.png', d.x+2, d.y+11, 34, 17, 7, 3);
            // Hand Right
            o.sprite('sprites.png', d.x+Math.sin(d.s[4]*Math.PI/2)*2, d.y+10, 33, 20, 3, 3);
            // Chest
            o.sprite('sprites.png', d.x, d.y+6+d.s[2]*0.7, 32, 12, 11, 5);
            // Head
            o.sprite('sprites.png', d.x+2, d.y+1+d.s[2], 32+6*d.s[1], 5, 7, 7);
        }
    },
    // Dirt Entity
    dirt: {
        default: {x: 0, y: 0, w: 0, h: 0},
        update: (d, dt, o) => {
            for (var i = 0; i < d.w; i++) for (var j = 0; j < d.h; j++)
                o.sprite('sprites.png',
                    d.x+i*8,d.y+j*8,
                    i==0?0:i+1>=d.w?8:4,
                    j==0?0:j+1>=d.h?12:8,
                    8, 8
                );
        }
    }
}
export {entities};