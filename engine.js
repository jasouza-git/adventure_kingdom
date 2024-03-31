function game(w = 320, h = 240, dom){
    // DOCUMENT
    this.dom = dom == undefined ? document.createElement('canvas') : dom;
    this.dom.setAttribute('width', w);
    this.dom.setAttribute('height', h);
    
    
    // CONTEXT
    this.ctx = this.dom.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.w = w;
    this.h = h;
    this.z = 2*w/640;
    this.fps = 30;

    // LOADER
    this.load = {
        todo: [], data: [], done: [],
        get: x=>this.load.data[this.load.todo.indexOf(x)],
        files: (...todo) => {
            this.load.todo = todo;
            this.load.check();
            this.load.todo.forEach((x, i) => {
                this.load.done.push(0);
                if (x.endsWith('.png')) {
                    this.load.data[i] = new Image();
                    this.load.data[i].src = 'asset/'+x;
                    this.load.data[i].onload = ()=>this.load.check(i,4);
                } else if(x.endsWith('.ttf')) {
                    this.load.data[i] = [x.slice(0,-4), ''];
                    var h = new XMLHttpRequest();
                    h.open('GET', 'asset/'+x, true);
                    h.responseType = 'blob';
                    h.onreadystatechange = () => {
                        this.load.check(i, h.readyState);
                        if (h.readyState != 4 || h.status != 200) return;
                        this.load.data[i][1] = URL.createObjectURL(h.response);
                        var d = document.createElement('h1');
                        d.style.font = `20px ${this.load.data[i][0]}`;
                        d.innerHTML = this.load.data[i][0];
                        var s = document.createElement('style');
                        s.innerHTML += `@font-face {font-family:"${this.load.data[i][0]}";src:url("${this.load.data[i][1]}") format("truetype");}`;
                        document.head.appendChild(s);
                        document.body.appendChild(d);
                    };
                    h.send();
                }
            });
        },
        check: (i,v) => {
            if (i != undefined) this.load.done[i] = v;
            else {
                this.ctx.lineWidth = this.z;
                this.ctx.strokeStyle = this.ctx.fillStyle = '#FFFFFF';
                this.ctx.strokeRect(this.w*0.25, this.h*0.45, this.w*0.5, this.h*0.1);
            }
            var load = this.load.done.length == 0 ? 0 : this.load.done.reduce((a,b)=>a+b)/this.load.todo.length/4;
            this.ctx.fillRect(this.w*0.25+2*this.z, this.h*0.45+2*this.z, load*(this.w*0.5-4*this.z), load*(this.h*0.1-4*this.z));
            if (load < 1) return;
            var check = ()=>{
                for(var i = 0; i < this.load.todo.length; i++)
                    if(this.load.todo[i].endsWith('.ttf') && !document.fonts.check(`20px ${this.load.data[i][0]}`)) {
                        setTimeout(check, 10);
                        return;
                    }
                this.time = new Date();
                this.looper = setInterval(this.loop, 1000/this.fps);
            };
            check();
        },
    };

    // Scene
    this.scenes = {};
    this.active_scene = undefined;
    this.scene = (id, scene) => {
        if (scene == undefined || this.active_scene == undefined) this.active_scene = id;
        if (scene != undefined) this.scenes[id] = scene;
    };

    // Loop
    this.time = new Date();
    this.timenew = new Date();
    this.looper = undefined;
    this.loop = () => {
        if (this.active_scene != undefined) this.scenes[this.active_scene]((new Date()) - this.time, (new Date()) - this.timenew);
        Object.keys(this.keydown).forEach(k => {
            if (this.events.hasOwnProperty(k)) this.events[k](this.keydown[k]);
        });
        this.timenew = new Date();
    };

    // Event
    this.events = {};
    this.keydown = {};
    this.on = function(e, f) {
        this.events[e] = f;
    };
    
    // Entity
    this.entity = (t, d={}) => {
        if (!entities.hasOwnProperty(t)) throw `No such entity "${t}"`;
        var data = {...entities[t].default, ...d};
        data.run = ()=>{
            data = entities[t].run(data);
            this.draw(t, ...data);
        };
        return data;
    };

    // Renderer
    this.sprite = (img,x,y,cx,cy,cw,ch,fx,fy) => {
        if(fx || fy) {
            this.ctx.save();
            //this.ctx.translate(this.w, 0);
            this.ctx.scale(-1, 1);
        }
        this.ctx.drawImage(
            this.load.get(img),
            cx,cy,cw,ch,
            this.z*(fx? -cw-x : x),//-(fx ? cw*this.z:0),
            this.z*(fy? -ch-y : y),
            cw*this.z,
            ch*this.z
        );
        if(fx || fy) this.ctx.restore();
        //this.ctx.strokeStyle='red';this.lineWidth=0.5;this.ctx.strokeRect(x*this.z,y*this.z,cw*this.z,ch*this.z);
    };
    this.draw = (type, data={}) => {
        if (entities != undefined && entities.hasOwnProperty(type)) {
            data = {...entities[type].default, ...data};
            entities[type].render(data, this);
            return;
        }
        if (type == 'menu') {
            // Background
            this.ctx.lineWidth = this.w/160;
            this.ctx.fillStyle = '#8ED5F5';
            this.ctx.fillRect(0, 0, this.w, this.h);
        } else if (type == 'title') {
        } else if (type == 'dirt') {
            data = {x:0,y:0,w:0,h:0,s:10,...data};
            for (var i = 0; i < data.w; i++) for (var j = 0; j < data.h; j++)
                this.sprite(
                    data.x+i*8,data.y+j*8,
                    i==0?0:i+1>=data.w?8:4,
                    j==0?0:j+1>=data.h?12:8,
                    8, 8
                );
        } else if (type == 'cloud') {
            data = {x:0,y:0,n:0b110101,...data};
            var h = 0, x = 1;
            this.sprite(data.x,data.y,0,56,8,8);
            while(h > 0){
                var m = data.n&3;
                if (m == 1 || m == 2) h++;
                else if (m == 0) h--;
                for(var y = 0; y < h; y++)
                    this.sprite(data.x+8*x,data.y-8*y,8,56-(y>0?1:0),8,8);
                this.sprite(data.x+8*x,data.y-8*h,m==1||m==2?0:m==3?8:16,m==3?48:55,8,8);
                x++;
                data.n = data.n>>2;
            }
            this.sprite(data.x+8*x,data.y,8,55-7,8,8);
        } else if (type == 'player') {
            data = {x:0,y:0,p:0,a:0,...data};
            // Tail
            this.sprite(data.x,data.y,27+data.p*4,0,4,5);
            // Head
            this.sprite(data.x,data.y+1,16,0,11,9);
            // Body
            this.sprite(data.x,data.y+9,16,9+data.a*7,11,7);
            // Foot
            //this.sprite(data.x,data.y,31,18,6,7,1,13);
        } else if (type == 'frog') {
            this.sprite(data.x,data.y,16,0,14,8);
        }
    }
    this.render = p => {
        if (p == undefined) p = document.body;
        p.appendChild(this.dom);

        p.addEventListener('keydown', key=>this.keydown[key.key] = {alt:key.altKey, ctrl:key.ctrlKey});
        p.addEventListener('keyup', key=>delete this.keydown[key.key]);
        /*p.addEventListener('keypress', key=>{
            if (this.events.hasOwnProperty(key.key)) this.events[key.key]();
        })*/
    };
}