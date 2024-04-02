import {engine} from "./engine.ts";
let main:engine = new engine();
main.load('MC.png');
main.scene('menu', (dt0, dt1)=>{
    main.draw('pinoy', {d:dt0/1000,m:[1,0]});
    console.log(dt0);
});
main.render();