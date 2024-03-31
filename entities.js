var entities = {
    pinoy: {
        default: {x:0, y:0, f:0},
        render: (d,o) => {
            o.sprite("MC.png", d.x, d.y, d.f%2*32, Math.floor(d.f/2)*32, 32, 32);
        }
    },
    aswang: {
        default: {x:0, y:0, f:0},
        render: (d,o) => {
            o.sprite('Aswang.png', d.x, d.y, d.f%2*32, Math.floor(d.f/2)*32, 32, 32);
        }
    }
};