import {engine} from "./engine.ts";

let main = new engine(640, 480);
let player = main.entity('knight');
main.z = 4;
main.load('MC.png', 'sprites.png');
main.scene('menu', (dt0, dt1)=>{
    main.ctx.clearRect(0, 0, main.w*main.z, main.h*main.z);
    dt0 *= 1.6;
    main.draw('knight', {x:(dt0/50)%100, y:60, s:[0,0,(Math.sin(dt0/50)+1)/2,(dt0/50)%4,(dt0/150)%2]});
    main.draw('dirt', {y:76,w:14,h:2});
    main.add(player);
});
main.render();