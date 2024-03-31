var main = new game(1280, 920);
main.load.files('sprites.png', 'MC.png', 'Aswang.png');
main.scene('menu', (t,d) => {
    d('menu');
    d('pinoy', {f:Math.floor(t/100)%4});
    d('aswang', {x:32,f:Math.floor(t/200)%4});
});
main.render();