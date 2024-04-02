import {engine} from "./engine.ts";
let main:engine = new engine();
main.scene('menu', (dt0, dt1)=>{
    main.draw('pinoy');
});
main.render();