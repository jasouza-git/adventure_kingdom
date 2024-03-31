var entities = {
    pinoy: {
        default: {x:0, y:0, f:0, d:0, g: 1, m:[0,0]},
        render: (d,o) => {
            o.sprite('MC.png',
                d.x, d.y,
                Math.abs(d.m[1]) > 1 ? d.f%3%2*32 : Math.abs(d.m[0]) > 1 ? (2+d.f)%3*32             : d.f%2*32,
                Math.abs(d.m[1]) > 1 ? 64         : Math.abs(d.m[0]) > 1 ? Math.floor((2+d.f)/3)*32 : 0, 
            32, 32, d.m[0] < 0);
        },
        run: (d, dt) => {
            d.x += d.m[0]*dt/50;
            d.m[0] -= d.m[0]*dt/50;
            d.y -= d.m[1]*dt/100;
            if(!d.g) d.m[1] -= ((d.m[1] > 1 ? 10 : 20)+d.m[1])*dt/100;
            if(d.y > 200) {
                d.g = 1;
                d.y = 200;
                d.m[1] = 0;
            }
            return d;
        }
    },
    aswang: {
        default: {x:0, y:0, f:0},
        render: (d,o) => {
            o.sprite('Aswang.png', d.x, d.y, d.f%2*32, Math.floor(d.f/2)*32, 32, 32);
        }
    },
    title: {
        default: {x:0, y:0},
        render: (d,o) => {
            o.sprite('Rise_of_the_Aswang_King.png', d.x, d.y, 0, 0, 256, 144);
        }
    }
};