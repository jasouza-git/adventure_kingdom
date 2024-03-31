var main = new game(1280, 920);
//var py = main.entity('player');
var pinoy = {x:0, y:200, m:[0,0], g:1};
main.load.files('sprites.png', 'MC.png', 'Aswang.png', 'Rise_of_the_Aswang_King.png');
main.scene('menu', (t,d) => {
    main.draw('menu');
    pinoy = entities.pinoy.run(pinoy, d);
    main.draw('pinoy', {...pinoy, f:Math.floor(t/200)%4});
    main.draw('aswang', {x:32, y:200, f:Math.floor(t/200)%4});
    main.draw('title');
});
main.on('d', () => pinoy.m[0] = Math.max(pinoy.m[0]+2, 8));
main.on('a', () => pinoy.m[0] = Math.min(pinoy.m[0]-2, -8));
main.on('w', () => {
    if(pinoy.g) {
        pinoy.m[1] = 70;
        pinoy.g = 0;
    }
});
//main.on('s', () => pinoy.m[1] = Math.min(pinoy.m[1]-5, -10));
main.render();