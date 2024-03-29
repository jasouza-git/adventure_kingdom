function game(dom, w = 320, h = 240){
    // DOCUMENT
    dom.setAttribute('width', w); dom.setAttribute('height', h);
    this.dom = dom;
    
    // CONTEXT
    this.ctx = dom.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.w = w;
    this.h = h;
    this.z = 2;
    this.fps = 30;


    // LOADER
    // NOTE! this.loader.todo[0] must be the spritesheet for this.sprite to work
    this.loader = {
        todo: ['sprites.png'],
        data: [], done: [],
        get: x=>this.loader.data[this.loader.todo.indexOf(x)],
        go: () => {
            // Loading Window
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = this.ctx.fillStyle = '#FFFFFF';
            this.ctx.strokeRect(this.w*0.25, this.h*0.45, this.w*0.5, this.h*0.1);
            // Load each todos
            this.loader.todo.forEach((x, i) => {
                this.loader.done.push(0);
                if (x.endsWith('.png')) {
                    this.loader.data[i] = new Image();
                    this.loader.data[i].src = 'asset/'+x;
                    this.loader.data[i].onload = ()=>this.loader.loaded(i,4);
                } else if(x.endsWith('.ttf')) {
                    this.loader.data[i] = [x.slice(0,-4), ''];
                    var h = new XMLHttpRequest();
                    h.open('GET', 'asset/'+x, true);
                    h.responseType = 'blob';
                    h.onreadystatechange = () => {
                        this.loader.loaded(i, h.readyState);
                        if (h.readyState != 4 || h.status != 200) return;
                        this.loader.data[i][1] = URL.createObjectURL(h.response);
                        var d = document.createElement('h1');
                        d.style.font = `20px ${this.loader.data[i][0]}`;
                        d.innerHTML = this.loader.data[i][0];
                        var s = document.createElement('style');
                        s.innerHTML += `@font-face {font-family:"${this.loader.data[i][0]}";src:url("${this.loader.data[i][1]}") format("truetype");}`;
                        document.head.appendChild(s);
                        document.body.appendChild(d);
                    };
                    h.send();
                }
            })
        },
        loaded: (i,v) => {
            if (i != undefined) this.loader.done[i] = v;
            if (this.loader.done.reduce((a,b)=>a+b) != this.loader.todo.length*4) return;
            var check = ()=>{
                for(var i = 0; i < this.loader.todo.length; i++)
                    if(this.loader.todo[i].endsWith('.ttf') && !document.fonts.check(`20px ${this.loader.data[i][0]}`)) {
                        setTimeout(check, 10);
                        return;
                    }
                this.draw('menu');
            };
            check();
        }
    };
    // Sprite Renderer
    this.sprite = function(x,y,cx,cy,cw,ch,dx=0,dy=0){
        this.ctx.drawImage(
            this.loader.data[0],
            cx,cy,cw,ch,
            x+this.z*dx,
            y+this.z*dy,
            this.z*cw,
            this.z*ch
        );
        //this.ctx.strokeStyle='red';this.lineWidth=0.5;this.ctx.strokeRect(x+this.z*dx,y+this.z*dy,cw*this.z,ch*this.z);
    };

    // Render Drawing
    this.draw = function(type, data={}){
        if (type == 'menu') {
            // Background
            this.ctx.lineWidth = this.w/160;
            this.ctx.fillStyle = '#8ED5F5';
            this.ctx.fillRect(0, 0, this.w, this.h);
            //this.draw('cloud', {x:this.w*0.25, y:this.h*0.25, w:this.w*0.25, r:this.w*0.05});
            //this.draw('cloud', {x:this.w*0.35, y:this.h*0.35, w:this.w*0.15, r:this.w*0.05});
            this.draw('ground', {x:this.w*0.15, y:this.h*0.6, w:5, h:3});
            this.draw('ground', {x:this.w*0.25, y:this.h*0.7, w:4, h:3});
            this.draw('title', {x:this.w*0.5, y:this.h*0.25});
            this.draw('player', {x:this.w*0.5, y:this.h*0.5, p:1})
            this.draw('cloud', {x:this.w*0.6, y:this.h*0.5, w:3, h:2});
            this.draw('frog', {x:this.w*0.6, y:this.h*0.6, w:3, h:2});
        } else if (type == 'title') {
        } else if (type == 'ground') {
            data = {x:0,y:0,w:0,h:0,s:10,...data};
            for (var i = 0; i < data.w; i++) for (var j = 0; j < data.h; j++)
                this.sprite(
                    data.x,data.y,
                    i==0?0:i+1>=data.w?8:4,
                    j==0?0:j+1>=data.h?12:8,
                    8, 8,
                    i*8, j*8
                );
        } else if (type == 'cloud') {
            this.sprite(data.x,data.y,0,56,8,8);
            this.sprite(data.x,data.y,8,56,8,8,8,0);
            this.sprite(data.x,data.y,8,56,8,8,16,0);
            this.sprite(data.x,data.y,8,56,8,8,24,0);
            this.sprite(data.x,data.y,16,56,8,8,32,0);


            this.sprite(data.x,data.y,0,55,8,8,8,-8);
            this.sprite(data.x,data.y,16,55,8,8,16,-8);
            this.sprite(data.x,data.y,8,55-7,8,8,24,-8);
        } else if (type == 'player') {
            data = {x:0,y:0,p:0,...data};
            // Tail
            this.sprite(data.x,data.y,30+data.p*4,0,4,5,-2,-1);
            // Head
            this.sprite(data.x,data.y,30,5,7,7);
            // Body
            this.sprite(data.x,data.y,29,12,9,6,-1,7);
            // Foot
            this.sprite(data.x,data.y,31,18,6,7,1,13);
        } else if (type == 'frog') {
            this.sprite(data.x,data.y,16,0,14,8);
        }
    }
}

var game = new game(document.getElementById("game"));//, 1280, 960);
game.loader.go();