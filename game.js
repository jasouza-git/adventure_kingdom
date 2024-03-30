function game(dom, w = 320, h = 240){
    // DOCUMENT
    dom.setAttribute('width', w); dom.setAttribute('height', h);
    this.dom = dom;
    
    // CONTEXT
    this.ctx = dom.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.w = w;
    this.h = h;
    this.z = 2*w/320;
    this.fps = 30;


    // LOADER
    // NOTE! this.loader.todo[0] must be the spritesheet for this.sprite to work
    this.loader = {
        todo: ['sprites.png'],
        data: [], done: [],
        time: new Date(),
        get: x=>this.loader.data[this.loader.todo.indexOf(x)],
        go: () => {
            // Load each todos
            this.loader.check();
            this.loader.todo.forEach((x, i) => {
                this.loader.done.push(0);
                if (x.endsWith('.png')) {
                    this.loader.data[i] = new Image();
                    this.loader.data[i].src = 'asset/'+x;
                    this.loader.data[i].onload = ()=>this.loader.check(i,4);
                } else if(x.endsWith('.ttf')) {
                    this.loader.data[i] = [x.slice(0,-4), ''];
                    var h = new XMLHttpRequest();
                    h.open('GET', 'asset/'+x, true);
                    h.responseType = 'blob';
                    h.onreadystatechange = () => {
                        this.loader.check(i, h.readyState);
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
        check: (i,v) => {
            if (i != undefined) this.loader.done[i] = v;
            else {
                this.ctx.lineWidth = this.z;
                this.ctx.strokeStyle = this.ctx.fillStyle = '#FFFFFF';
                this.ctx.strokeRect(this.w*0.25, this.h*0.45, this.w*0.5, this.h*0.1);
            }
            var load = this.loader.done.length == 0 ? 0 : this.loader.done.reduce((a,b)=>a+b)/this.loader.todo.length/4;
            this.ctx.fillRect(this.w*0.25+2*this.z, this.h*0.45+2*this.z, load*(this.w*0.5-4*this.z), load*(this.h*0.1-4*this.z));
            if (load < 1) return;
            var check = ()=>{
                for(var i = 0; i < this.loader.todo.length; i++)
                    if(this.loader.todo[i].endsWith('.ttf') && !document.fonts.check(`20px ${this.loader.data[i][0]}`)) {
                        setTimeout(check, 10);
                        return;
                    }
                this.loader.time = new Date();
                this.loader.loop = setInterval(()=>this.loader.main((new Date())-this.loader.time), 1000/this.fps);
            };
            check();
        },
        main: t => {},
        endloop: ()=>clearInterval(this.loader.loop)
    };
    // Sprite Renderer
    this.sprite = function(x,y,cx,cy,cw,ch){
        this.ctx.drawImage(
            this.loader.data[0],
            cx,cy,cw,ch,
            x*this.z,
            y*this.z,
            cw*this.z,
            ch*this.z
        );
        //this.ctx.strokeStyle='red';this.lineWidth=0.5;this.ctx.strokeRect(x*this.z,y*this.z,cw*this.z,ch*this.z);
    };

    // Render Drawing
    this.draw = function(type, data={}){
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
}

var game = new game(document.getElementById("game"), 1280, 960);
game.loader.go();
game.loader.main = t =>{
    var A = Math.floor(t/500)%5;
    game.draw('menu');
    game.draw('dirt', {x:16,y:32,w:16,h:3});
    game.draw('player', {x:0, y:0+(A==3?1:0), p:1, a:A});
    game.draw('cloud', {x:0,y:32});
    game.loader.endloop();
};