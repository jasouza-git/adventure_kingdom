import {loadedfile_type, action_type, scene_type, entities_type} from "./types.ts";

/*#*/ let entities:entities_type = {};
class engine {
    private buf:HTMLCanvasElement = document.createElement('canvas');   // Buffer Canvas
    public btx:CanvasRenderingContext2D;                                // Buffer Context
    public dom:HTMLCanvasElement;                                       // Canvas
    public ctx:CanvasRenderingContext2D;                                // Context
    public w:number;                                                    // Width
    public h:number;                                                    // Height
    public z:number;                                                    // Size of 1 pixel
    public fps:number = 60;                                             // Frames per second
    public camera:number[] = [0, 0];
    public constructor(args?) {
        // Initalize Canvas
        args = args === undefined ? {} : args;
        Object.keys(args).forEach(key => {
            if (key == 'load') return;
            this[key] = args[key];
        });
        this.dom = document.createElement('canvas');
        if (args.dom) this.dom = args.dom;
        this.w = args.w || 320;
        this.h = args.h || 240;
        this.dom.setAttribute('width', String(this.w*this.z));
        this.dom.setAttribute('height', String(this.h*this.z));
        this.buf.setAttribute('width', String(this.w*this.z));
        this.buf.setAttribute('height', String(this.h*this.z));
        this.ctx = this.dom.getContext('2d') as CanvasRenderingContext2D;
        this.btx = this.buf.getContext('2d') as CanvasRenderingContext2D;
        this.ctx.imageSmoothingEnabled = false;
        this.btx.imageSmoothingEnabled = false;
        if (Object.keys(args).indexOf('load') != -1) this.load(...args['load']);
    }

    // Loader
    public loaded:{[index:string]:loadedfile_type} = {};               // Loaded data in cache
    private loadcheck(percent:number):void {                            // Check if finished loading
        this.ctx.fillRect((this.w*0.25+2)*this.z, (this.h*0.45+2)*this.z, percent*(this.w*0.5-4)*this.z, (this.h*0.1-4)*this.z);
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
        this.ctx.strokeRect(Math.floor(this.w*this.z*0.25),
                            Math.floor(this.h*this.z*0.45),
                            Math.floor(this.w*this.z*0.5),
                            Math.floor(this.h*this.z*0.1));

        // Loading Files
        files.forEach((file:string, i:number)=>{
            let ext = file.slice(-4);
            if(ext == '.png') {
                this.loaded[file] = new Image();
                (this.loaded[file] as HTMLImageElement).src = file;
                (this.loaded[file] as HTMLImageElement).onload = ()=>{
                    loaded[i] = 4;
                    this.loadcheck(loaded.reduce((pre:number, cur:number)=>pre+cur)/files.length/4);
                };
            } else if(ext == '.ttf' || ext == '.mp3') {
                loaded[i] = 0;
                this.loaded[file] = '';
                let h = new XMLHttpRequest();
                h.open('GET', file);
                h.responseType = 'blob';
                h.onreadystatechange = () => {
                    loaded[i] = h.readyState;
                    this.loadcheck(loaded.reduce((pre:number, cur:number)=>pre+cur)/files.length/4);
                    if (h.readyState != 4 || h.status != 200) return;
                    //console.log('GOT',file);
                    this.loaded[file] = URL.createObjectURL(h.response);
                    if (ext == '.ttf') {
                        var d : HTMLHeadElement = document.createElement('h1');
                        d.style.font = `20px ${file.slice(0,-4)}`;
                        d.innerHTML = file.slice(0,-4)
                        var s : HTMLStyleElement = document.createElement('style');
                        s.innerHTML += `@font-face {font-family:"${file.slice(0,-4)}";src:url("${this.loaded[file]}") format("truetype");}`;
                        document.head.appendChild(s);
                        document.body.appendChild(d);
                    }
                };
                h.send();
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
    public time_init:Date;                                             // Time since first frame
    private time_last:Date;                                             // Time since last frame
    private audios:{[key:string]:HTMLAudioElement} = {}; // Current playing audios
    private check_event(event:string, action?:action_type) : boolean {             // Check if event occured then active action
        let events:string[] = event.split(',');
        let index:number = -1;
        for (let i = 0; i < Object.keys(this.evented).length; i++) {
            if (events.indexOf(Object.keys(this.evented)[i]) != -1) {
                index = i;
                break;
            }
        }
        if (index != -1 && action != undefined) {
            action(this.evented[Object.keys(this.evented)[index]]);
            this.evented[Object.keys(this.evented)[index]]['init'] = false;
        }return index != -1;
    }
    private gp:Gamepad|null;
    public filter:undefined|((d:ImageData)=>ImageData) = undefined;
    private loop():void {                                               // Loop interval to trigger event check and scene
        let now:Date = new Date();
        this.interacts = [];
        if (this.active_scene.length != 0) {
            Object.keys(this.audios).forEach(audio => {
                if (!this.audios[audio].hasAttribute('single'))
                    this.audios[audio].removeAttribute('active');
            });
            this.path = this.active_scene;
            this.scenes[this.active_scene](now.getTime() - this.time_init.getTime(), now.getTime() - this.time_last.getTime());
            this.path = '';
            Object.keys(this.audios).forEach(audio => {
                if (this.audios[audio].hasAttribute('single')) return;
                if (this.audios[audio].hasAttribute('active'))
                    this.audios[audio].play();
                else
                    this.audios[audio].pause();
            });
        }
        Object.keys(this.events).forEach(e => {
            this.events[e].forEach(a => this.check_event(e, a));
            if (this.events[e].hasOwnProperty('init')) this.events[e]['init'] = false;
        });
        let gp = navigator.getGamepads()[0];
        if (gp != null) {
            this.evented['gp_j0'] = {init:this.evented['gp_j0']==undefined, x:gp.axes[0], y:gp.axes[1]};
            this.evented['gp_j1'] = {init:this.evented['gp_j1']==undefined, x:gp.axes[2], y:gp.axes[5]};
            if (Math.abs(gp.axes[9]+0.43)<0.1) this.evented['gp_e'] = this.evented['gp_e'] == undefined ? {init:true} : {init:false};
            else delete this.evented['gp_e'];
            if (Math.abs(gp.axes[9]-0.71)<0.1) this.evented['gp_w'] =  this.evented['gp_w'] == undefined ? {init:true} : {init:false};
            else delete this.evented['gp_w'];
            if (Math.abs(gp.axes[9]-0.14)<0.1) this.evented['gp_s'] =  this.evented['gp_s'] == undefined ? {init:true} : {init:false};
            else delete this.evented['gp_s'];
            if (Math.abs(gp.axes[9]+1) < 0.1)  this.evented['gp_n'] =  this.evented['gp_n'] == undefined ? {init:true} : {init:false};
            else delete this.evented['gp_n'];
            if (gp.buttons[0].value == 1) this.evented['gp_1'] = this.evented['gp_1'] == undefined ? {init:true} : {init:false};
            else delete this.evented['gp_1'];
            if (gp.buttons[1].value == 1) this.evented['gp_2'] = this.evented['gp_2'] == undefined ? {init:true} : {init:false};
            else delete this.evented['gp_2'];
            if (gp.buttons[2].value == 1) this.evented['gp_3'] = this.evented['gp_3'] == undefined ? {init:true} : {init:false};
            else delete this.evented['gp_3'];
            if (gp.buttons[3].value == 1) this.evented['gp_4'] = this.evented['gp_4'] == undefined ? {init:true} : {init:false};
            else delete this.evented['gp_4'];
        } else {
            delete this.evented['gp_j0'];
            delete this.evented['gp_j1'];
        }
        this.time_last = new Date();
        this.ctx.drawImage(this.buf, 0, 0);
        if (this.filter != undefined) {
            this.ctx.putImageData(this.filter(this.ctx.getImageData(0,0, this.w*this.z, this.h*this.z)), 0, 0);
        }
    }
    public start_loop():void {                                          // Start looper
        this.time_init = new Date();
        this.time_last = new Date();
        this.looper = window.setInterval(this.loop.bind(this), 1000/this.fps);
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
        }
        return this.check_event(event, action);
    }
    public play(audio:string, single?:boolean, volume?:number) {
        if (single) {
            var id = audio+String(Number(new Date()));
            this.audios[id] = new Audio();
            this.audios[id].src = this.loaded[audio] as string;
            if (volume != undefined) this.audios[id].volume = parseFloat(String(volume));
            this.audios[id].play();
            this.audios[id].setAttribute('single','');
            this.audios[id].onended = () => delete this.audios[id];
        } else {
            
            if (!this.audios[audio]) {
                this.audios[audio] = new Audio();
                this.audios[audio].loop = true;
                this.audios[audio].src = this.loaded[audio] as string;
            }
            if (volume != undefined) this.audios[audio].volume = parseFloat(String(volume));
            this.audios[audio].setAttribute('active','');
        }
    }

    // Drawing
    public sprite_boxed:boolean = false;
    public hitbox_boxed:boolean = false;
    public rotate_boxed:boolean = false;
    public sprite(img:string,
        x:number,y:number,
        cx:number,cy:number,cw:number,ch:number,
        fx?:boolean,fy?:boolean) {                                      // Draw Sprite
        if(!this.loaded.hasOwnProperty(img)) throw `Error: File ${img} is not loaded`;
        if(fx || fy) {
            this.btx.save();
            this.btx.scale(-1, 1);
        }
        this.btx.drawImage(
            this.loaded[img] as HTMLImageElement,
            cx,cy,cw,ch,
            Math.round((fx ? -cw-x+this.camera[0] : x-this.camera[0])*this.z),
            Math.round((fy ? -ch-y+this.camera[1] : y-this.camera[1])*this.z),
            cw*this.z,
            ch*this.z
        );
        if (fx || fy) this.btx.restore();
        if (this.sprite_boxed) {
            this.btx.lineWidth = 1;
            this.btx.strokeStyle = '#FF0000';
            this.btx.strokeRect(
                Math.round((fx ? -cw-x+this.camera[0] : x-this.camera[0])*this.z),
                Math.round((fy ? -ch-y+this.camera[1] : y-this.camera[1])*this.z),
                cw*this.z,
                ch*this.z
            );
        }
    }
    public sprites(img:string, pos:number[], ...args:any[]) {
        if(!this.loaded.hasOwnProperty(img)) throw `Error: File ${img} is not loaded`;
        // x, y, cx, cy, cw, ch, fx, fy, ra, rx, ry, px, py
        pos = [pos[0]||0, pos[1]||0, pos[2]||1, pos[3]||1];
        let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1];
        args.forEach(arg => {
            data = arg = [...arg, ...data.slice(arg.length)];
            arg[0] += pos[0];
            arg[1] += pos[1];
            if (arg[6] || arg[7] || arg[8]) this.btx.save();
            if (arg[6] || arg[7]) this.btx.scale(-1, 1);
            
            if(arg[8]) {
                let rp = [(arg[0]+arg[9]-this.camera[0]*arg[11])*this.z*(1-2*arg[6]), (arg[1]+arg[10]-this.camera[1])*this.z*(1-2*arg[7])];
                this.btx.translate(rp[0], rp[1]);
                this.btx.rotate(arg[8]*(1-2*arg[6]));
                this.btx.translate(-rp[0], -rp[1]);
                if (this.rotate_boxed) {
                    this.btx.lineWidth = 1;
                    this.btx.strokeStyle = '#f00';
                    this.btx.beginPath();
                    this.btx.arc(rp[0], rp[1], 4*this.z, 0, Math.PI*2);
                    this.btx.moveTo(rp[0], rp[1]-5*this.z);
                    this.btx.lineTo(rp[0], rp[1]+5*this.z);
                    this.btx.moveTo(rp[0]-5*this.z, rp[1]);
                    this.btx.lineTo(rp[0]+5*this.z, rp[1]);
                    this.btx.stroke();
                }
            }
            let dime = [
                Math.round((arg[6] ? -arg[4]-arg[0]+this.camera[0]*arg[11] : arg[0]-this.camera[0]*arg[11])*this.z),
                Math.round((arg[7] ? -arg[5]-arg[1]+this.camera[1] : arg[1]-this.camera[1])*this.z),
                arg[4]*this.z*pos[2],
                arg[5]*this.z*pos[3]
            ];
            this.btx.drawImage(
                this.loaded[img] as HTMLImageElement,
                data[2], data[3], data[4], data[5],
                dime[0], dime[1], dime[2], dime[3]
            );
            if (this.sprite_boxed) {
                this.btx.globalAlpha = 1;
                this.btx.lineWidth = 1;
                this.btx.strokeStyle = '#FF0000';
                this.btx.strokeRect(
                    dime[0], dime[1], dime[2], dime[3]
                );
            }
            if (arg[6] || arg[7] || arg[8]) this.btx.restore();
        });
    }
    public draw(type:string, data?:{[prop:string]:any}) {
        if (data == undefined) data = {};
        if (type == '') {
            data = {x:0, y:0, w:this.w, h:this.h, color: '#ffffff', alpha:1, img:'', ...data};
            this.btx.globalAlpha = data.alpha;
            if (data.img == '') {
                this.btx.fillStyle = data.color;
                this.btx.fillRect(data.x*this.z, data.y*this.z, data.w*this.z, data.h*this.z);
            } else {
                this.btx.drawImage(this.loaded[data.img] as HTMLImageElement, data.x*this.z, data.y*this.z, data.w*this.z, data.h*this.z);
            }
            this.btx.globalAlpha = 1;
        } else if (entities != undefined && entities.hasOwnProperty(type)) {
            data = {...entities[type].default, ...data};
            // @ts-ignore
            if (entities[type].hasOwnProperty('update')) entities[type].update(data, this, 0, 0);
            return;
        }
    }
    public render(p?:HTMLElement) {
        if (p == undefined) p = document.body;
        p.appendChild(this.dom);
        p.addEventListener('keydown', key=>this.evented[key.key] = {init:this.evented[key.key] == undefined, alt:key.altKey, ctrl:key.ctrlKey});
        p.addEventListener('keyup', key=>delete this.evented[key.key]);
    };

    // Entity
    public player:any;
    public interacts:{[index:string]:any}[] = [];
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
        if (entity['interact']) this.interacts.push(entity);
        // if (this.player != undefined && this.player.hitbox.length < 5 && this.player.dead != 0) {
        //     this.player.hitbox = [ 15,
        //         this.player.x+12, this.player.y,
        //         8, 29
        //     ];
        // }
        // @ts-ignore
        entities[entity['__type__']].update(entity, this, (new Date()).getTime()-this.time_init.getTime(), (new Date()).getTime()-this.time_last.getTime());
        // console.log(entity);
        if (this.hitbox_boxed && entity.hitbox) {
            this.btx.lineWidth = 1;
            // @ts-ignore
            for (let i = 0; i < entity.hitbox.length; i += 5) {
                this.btx.strokeStyle = '#FFFF00';
                this.btx.strokeRect(
                    (entity.hitbox[i+1]-this.camera[0])*this.z, (entity.hitbox[i+2]-this.camera[1])*this.z,
                    entity.hitbox[i+3]*this.z, entity.hitbox[i+4]*this.z
                );
                this.btx.strokeStyle = '#FF0000';
                this.btx.beginPath();
                this.btx.moveTo((entity.hitbox[i+1]-this.camera[0])*this.z, (entity.hitbox[i+2]-this.camera[1])*this.z);
                // @ts-ignore
                for (let j = 0; j < 4; j++) this.btx[entity.hitbox[i]>>>j&1 ? 'lineTo' : 'moveTo']((entity.hitbox[i+1]+entity.hitbox[i+3]*(j<2?1:0)-this.camera[0])*this.z, (entity.hitbox[i+2]+entity.hitbox[i+4]*(j==1||j==2?1:0)-this.camera[1])*this.z);
                this.btx.stroke();
            }
        }
        if (entity['bind'] != undefined) this.add(entity['bind']);
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

    }
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
    }*/
}
export {engine};