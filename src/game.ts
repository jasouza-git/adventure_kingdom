import {engine} from "./engine.ts";

let main = new engine(640, 480);
let player = main.entity('knight');
let water = main.entity('liquid', {x:13*8, y:76, w:6, h:2, lava:true})
player.y = 60;
main.z = 4;
main.load('MC.png', 'sprites.png');
main.scene('menu', (t, dt)=>{
    main.ctx.clearRect(0, 0, main.w*main.z, main.h*main.z);
    //main.draw('knight', {x:(dt0/31)%100, y:60, s:[0,0,(Math.sin(dt0/31)+1)/2,(dt0/31)%4,(dt0/93)%2]});
    main.add(water);
    main.draw('dirt', {y:76,w:14,h:2});
    main.add(player);
    //if(main.on('w')) player.crouch = true;
    //else player.m[1] -= player.m[1]*dt/100;
    if(main.on('d')) player.m[0] += (1.5-player.m[0])*dt/100;
    else if(main.on('a')) player.m[0] -= (1.5+player.m[0])*dt/100;
    else player.m[0] -= player.m[0]*dt/100;
    console.log(player.m);
});
main.render();