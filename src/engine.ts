import {loadedfile_type, action_type, scene_type} from "./types.ts";
import {entities} from "./entities.ts";
class engine {
    public dom:HTMLCanvasElement;                                       // Canvas
    public ctx:CanvasRenderingContext2D;                                // Context
    public w:number;                                                    // Width
    public h:number;                                                    // Height
    public z:number;                                                    // Size of 1 pixel
    public fps:number = 30;                                             // Frames per second
    public constructor(pixel?:number, width?:number, height?:number, dom?:HTMLCanvasElement) {
        // Initalize Canvas
        this.z = pixel || 1;
        this.dom = dom || document.createElement('canvas'); 
        this.w = width || 320;
        this.h = height || 240;
        this.dom.setAttribute('width', String(this.w*this.z));
        this.dom.setAttribute('height', String(this.h*this.z));
        this.ctx = this.dom.getContext('2d') as CanvasRenderingContext2D;
        this.ctx.imageSmoothingEnabled = false;
    }

    // Loader
    private loaded:{[index:string]:loadedfile_type} = {};               // Loaded data in cache
    private loadcheck(percent:number):void {                            // Check if finished loading
        this.ctx.fillRect((this.w*0.25+2)*this.z, (this.h*0.45+2)*this.z, percent*(this.w*0.5-4)*this.z, percent*(this.h*0.1-4)*this.z);
        if (percent < 1) return;
        var check = ()=>{
            for(var i = 0; i < Object.keys(this.loaded).length; i++)
                if(Object.keys(this.loaded)[i].slice(-4) == '.ttf' && !document.fonts.check(`20px ${Object.keys(this.loaded)[i].slice(0,-4)}`)) {
                    setTimeout(check, 10);
                    return;
                }
            this.start_loop();
        };
        check();
    }
    public load(...files:string[]):void {                               // Load files
        let loaded : number[] = [];

        // Loading Menu
        this.ctx.lineWidth = this.z;
        this.ctx.strokeStyle = this.ctx.fillStyle = '#FFFFFF';
        this.ctx.strokeRect(this.w*this.z*0.25, this.h*this.z*0.45, this.w*this.z*0.5, this.h*this.z*0.1);

        // Loading Files
        files.forEach((file:string, i:number)=>{
            if(file.slice(-4) == '.png') {
                this.loaded[file] = new Image();
                (this.loaded[file] as HTMLImageElement).src = '/asset/'+file;
                (this.loaded[file] as HTMLImageElement).onload = ()=>{
                    loaded[i] = 4;
                    this.loadcheck(loaded.reduce((pre:number, cur:number)=>pre+cur)/files.length/4);
                };
            } else if(file.slice(-4) == '.ttf') {
                loaded[i] = 0;
                this.loaded[file] = '';
                let h : XMLHttpRequest = new XMLHttpRequest();
                h.open('GET', '/asset/'+file);
                h.responseType = 'blob';
                h.onreadystatechange = () => {
                    loaded[i] = h.readyState;
                    this.loadcheck(loaded.reduce((pre:number, cur:number)=>pre+cur)/files.length/4);
                    if (h.readyState != 4 || h.status != 200) return;
                    this.loaded[file] = URL.createObjectURL(h.response);
                    
                    var d : HTMLHeadElement = document.createElement('h1');
                    d.style.font = `20px ${file.slice(0,-4)}`;
                    d.innerHTML = file.slice(0,-4)
                    var s : HTMLStyleElement = document.createElement('style');
                    s.innerHTML += `@font-face {font-family:"${file.slice(0,-4)}";src:url("${this.loaded[file]}") format("truetype");}`;
                    document.head.appendChild(s);
                    document.body.appendChild(d);
                }
            }
        });
    }

    // Render
    private looper:number;                                              // Interval to loop
    private evented:{[event:string]:any} = {};                          // Recorded events
    private events:{[event:string]:action_type[]} = {};                 // Global event listeners
    private scenes:{[scene:string]:scene_type} = {};                    // Scenes
    private active_scene:string = '';                                   // Active Scene
    private path:string = '';                                           // Current path of action (scene)
    private time_init:Date;                                             // Time since first frame
    private time_last:Date;                                             // Time since last frame
    private check_event(event:string, action?:action_type) : boolean {             // Check if event occured then active action
        let events:string[] = event.split(',');
        let index:number = -1;
        for (let i = 0; i < Object.keys(this.evented).length; i++) {
            if (events.indexOf(Object.keys(this.evented)[i]) != -1) {
                index = i;
                break;
            }
        }
        if (index != -1 && action != undefined) action(this.evented[index]);
        return index != -1;
    }
    private loop():void {                                               // Loop interval to trigger event check and scene
        let now:Date = new Date();
        if (this.active_scene.length != 0) {
            this.path = this.active_scene;
            this.scenes[this.active_scene](now.getTime() - this.time_init.getTime(), now.getTime() - this.time_last.getTime());
            this.path = '';
        }
        Object.keys(this.events).forEach(e => this.events[e].forEach(a => this.check_event(e, a)));
        this.time_last = new Date();
    }
    public start_loop():void {                                          // Start looper
        this.time_init = new Date();
        this.time_last = new Date();
        this.looper = setInterval(this.loop.bind(this), 1000/this.fps);
    }
    public stop_loop():void {                                           // Stop looper
        clearInterval(this.looper);
    }
    public scene(id:string, scene?:scene_type) {                        // Set/Activate scene
        if (scene == undefined || this.active_scene.length == 0) this.active_scene = id;
        if (scene != undefined) this.scenes[id] = scene;
    }
    public on(event:string, action?:action_type) : boolean {                       // Set/Activate event
        if (this.path.length == 0) {
            if(action == undefined) throw `Error: Action in "engine.on" must be decleared if not inside scene`;
            if(!this.events.hasOwnProperty(event)) this.events[event] = [];
            this.events[event].push(action);
            return false;
        } else return this.check_event(event, action);
    }

    // Drawing
    public sprite_boxed:boolean = false;
    public hitbox_boxed:boolean = false;
    public sprite(img:string,
        x:number,y:number,
        cx:number,cy:number,cw:number,ch:number,
        fx?:boolean,fy?:boolean) {                                      // Draw Sprite
        if(!this.loaded.hasOwnProperty(img)) throw `Error: File ${img} is not loaded`;
        if(fx || fy) {
            this.ctx.save();
            this.ctx.scale(-1, 1);
        }
        this.ctx.drawImage(
            this.loaded[img] as HTMLImageElement,
            cx,cy,cw,ch,
            Math.round(this.z*(fx? -cw-x : x)),
            Math.round(this.z*(fy? -ch-y : y)),
            cw*this.z,
            ch*this.z
        );
        if (fx || fy) this.ctx.restore();
        if (this.sprite_boxed) {
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = '#FF0000';
            this.ctx.strokeRect(
                Math.floor(this.z*(fx? -cw-x : x)),
                Math.floor(this.z*(fy? -ch-y : y)),
                cw*this.z,
                ch*this.z
            );
        }
    }
    public draw(type:string, data?:{[prop:string]:any}) {
        if (data == undefined) data = {};
        if (entities != undefined && entities.hasOwnProperty(type)) {
            data = {...entities[type].default, ...data};
            // @ts-ignore
            if (entities[type].hasOwnProperty('update')) entities[type].update(data, this, 0, 0);
            return;
        }
    }
    public render(p?:HTMLElement) {
        if (p == undefined) p = document.body;
        p.appendChild(this.dom);
        p.addEventListener('keydown', key=>this.evented[key.key] = {alt:key.altKey, ctrl:key.ctrlKey});
        p.addEventListener('keyup', key=>delete this.evented[key.key]);
    };

    // Entity
    public entity(type:string, ...arg:any) : {[index:string]:any} {
        if (!entities.hasOwnProperty(type)) throw `Error: No such entity "${type}"`;
        let out = {};
        // @ts-ignore
        if (entities[type].hasOwnProperty('create')) out = entities[type].create(this, ...arg);
        else out = arg[0];
        out = {'__type__':type, ...entities[type].default, ...out};
        return out;
    }
    public entities(type:string, len:number, ...arg:any) : {[index:string]:any}[] {
        let out:{[index:string]:any}[] = [];
        for (let i = 0; i < len; i++) out.push(this.entity(type, ...arg));
        return out;
    }
    private add_single(entity:{[index:string]:any}) {
        if (!entities.hasOwnProperty(entity['__type__'])) throw `Error: No such entity "${entity['__type__']}"`;
        // @ts-ignore
        entities[entity['__type__']].update(entity, this, (new Date()).getTime()-this.time_init.getTime(), (new Date()).getTime()-this.time_last.getTime());
        if (this.hitbox_boxed && entity.hitbox) {
            this.ctx.lineWidth = 1;
            // @ts-ignore
            for (let i = 0; i < entity.hitbox.length; i += 5) {
                this.ctx.strokeStyle = '#FFFF00';
                this.ctx.strokeRect(
                    entity.hitbox[i+1]*this.z, entity.hitbox[i+2]*this.z,
                    entity.hitbox[i+3]*this.z, entity.hitbox[i+4]*this.z
                );
                this.ctx.strokeStyle = '#FF0000';
                this.ctx.beginPath();
                this.ctx.moveTo(entity.hitbox[i+1]*this.z, entity.hitbox[i+2]*this.z);
                // @ts-ignore
                for (let j = 0; j < 4; j++) this.ctx[entity.hitbox[i]>>>j&1 ? 'lineTo' : 'moveTo']((entity.hitbox[i+1]+entity.hitbox[i+3]*(j<2?1:0))*this.z, (entity.hitbox[i+2]+entity.hitbox[i+4]*(j==1||j==2?1:0))*this.z);
                this.ctx.stroke();
            }
        }
    }
    public add(...entities:({[index:string]:any}|{[index:string]:any}[])[]) {
        entities.forEach(entity => {
            if (Array.isArray(entity)) {
                entity.forEach(e=>this.add_single(e));
            } else this.add_single(entity);
        });
    }
    /*
    public collide(entity:{[index:string]:any}, collider:{[index:string]:any}, d?:number):boolean {
        d = d || 15;

    }*/
    public physics(entity:{[index:string]:any}, d?:number):boolean {
        let collide:boolean = false;
        d = d == undefined ? 15 : d;
        //console.log((d&4)==4)
        entity.collide.forEach(collider => {
            // @ts-ignore
            if (entity.hitbox[0]&4 && collider.hitbox[0]&1 && (d&4) == 4 &&
                entity.hitbox[2]+entity.hitbox[4] >= collider.hitbox[2] &&
                entity.hitbox[2]+entity.hitbox[4] < collider.hitbox[2]+collider.hitbox[4] &&
                entity.hitbox[1] < collider.hitbox[1]+collider.hitbox[3] &&
                entity.hitbox[1]+entity.hitbox[3] > collider.hitbox[1]
            ){
                entity.hitbox[2] = entity.y = collider.hitbox[2]-entity.hitbox[4];
                collide=true;
            }
        });
        return collide;
    }
}
export {engine};