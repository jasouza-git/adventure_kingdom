var entities = {
    pinoy: {
        default: { x: 0, y: 0, f: 0, g: 1, m: [0, 0] },
        render: function (d, o) {
            o.sprite('MC.png', d.x, d.y, Math.abs(d.m[1]) > 0.5 ? d.f % 3 % 2 * 32 : Math.abs(d.m[0]) > 0.5 ? (2 + d.f) % 3 * 32 : d.f % 2 * 32, Math.abs(d.m[1]) > 0.5 ? 64 : Math.abs(d.m[0]) > 0.5 ? Math.floor((2 + d.f) / 3) * 32 : 0, 32, 32, d.m[0] < 0);
        },
        run: function (d, dt) {
            d.m[0] -= d.m[0] * dt / 50;
            if (!d.g)
                d.m[1] -= ((d.m[1] > 1 ? 10 : 20) + d.m[1]) * dt / 100;
            if (d.y > 200) {
                d.g = 1;
                d.y = 200;
                d.m[1] = 0;
            }
            return d;
        }
    }
};
var engine = (function () {
    function engine(w, h, dom) {
        this.fps = 30;
        this.loaded = {};
        this.evented = {};
        this.events = {};
        this.scenes = {};
        this.active_scene = '';
        this.path = '';
        this.dom = dom ? dom : document.createElement('canvas');
        this.w = w ? w : 320;
        this.h = h ? h : 240;
        this.dom.setAttribute('width', String(this.w));
        this.dom.setAttribute('height', String(this.h));
        this.z = this.w / 320;
        this.ctx = this.dom.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
    }
    engine.prototype.loadcheck = function (percent) {
        var _this = this;
        this.ctx.fillRect(this.w * 0.25 + 2 * this.z, this.h * 0.45 + 2 * this.z, percent * (this.w * 0.5 - 4 * this.z), percent * (this.h * 0.1 - 4 * this.z));
        if (percent < 1)
            return;
        var check = function () {
            for (var i = 0; i < Object.keys(_this.loaded).length; i++)
                if (Object.keys(_this.loaded)[i].slice(-4) == '.ttf' && !document.fonts.check("20px ".concat(Object.keys(_this.loaded)[i].slice(0, -4)))) {
                    setTimeout(check, 10);
                    return;
                }
            _this.start_loop();
        };
        check();
    };
    engine.prototype.load = function () {
        var _this = this;
        var files = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            files[_i] = arguments[_i];
        }
        var loaded = [];
        this.ctx.lineWidth = this.z / 2;
        this.ctx.strokeStyle = this.ctx.fillStyle = '#FFFFFF';
        this.ctx.strokeRect(this.w * 0.25, this.h * 0.45, this.w * 0.5, this.h * 0.1);
        files.forEach(function (file, i) {
            if (file.slice(-4) == '.png') {
                _this.loaded[file] = new Image();
                _this.loaded[file].src = '/asset/' + file;
                _this.loaded[file].onload = function () {
                    loaded[i] = 4;
                    _this.loadcheck(loaded.reduce(function (pre, cur) { return pre + cur; }) / files.length / 4);
                };
            }
            else if (file.slice(-4) == '.ttf') {
                loaded[i] = 0;
                _this.loaded[file] = '';
                var h_1 = new XMLHttpRequest();
                h_1.open('GET', '/asset/' + file);
                h_1.responseType = 'blob';
                h_1.onreadystatechange = function () {
                    loaded[i] = h_1.readyState;
                    _this.loadcheck(loaded.reduce(function (pre, cur) { return pre + cur; }) / files.length / 4);
                    if (h_1.readyState != 4 || h_1.status != 200)
                        return;
                    _this.loaded[file] = URL.createObjectURL(h_1.response);
                    var d = document.createElement('h1');
                    d.style.font = "20px ".concat(file.slice(0, -4));
                    d.innerHTML = file.slice(0, -4);
                    var s = document.createElement('style');
                    s.innerHTML += "@font-face {font-family:\"".concat(file.slice(0, -4), "\";src:url(\"").concat(_this.loaded[file], "\") format(\"truetype\");}");
                    document.head.appendChild(s);
                    document.body.appendChild(d);
                };
            }
        });
    };
    engine.prototype.check_event = function (event, action) {
        var events = event.split(',');
        var index = -1;
        for (var i = 0; i < Object.keys(this.evented).length; i++) {
            if (events.indexOf(Object.keys(this.evented)[i]) != -1) {
                index = i;
                break;
            }
        }
        if (index != -1)
            action(this.evented[index]);
    };
    engine.prototype.loop = function () {
        var _this = this;
        var now = new Date();
        if (this.active_scene.length != 0) {
            this.path = this.active_scene;
            this.scenes[this.active_scene](now.getTime() - this.time_init.getTime(), now.getTime() - this.time_last.getTime());
            this.path = '';
        }
        Object.keys(this.events).forEach(function (e) { return _this.events[e].forEach(function (a) { return _this.check_event(e, a); }); });
    };
    engine.prototype.start_loop = function () {
        this.time_init = new Date();
        this.time_last = new Date();
        this.looper = setInterval(this.loop.bind(this), 1000 / this.fps);
    };
    engine.prototype.stop_loop = function () {
        clearInterval(this.looper);
    };
    engine.prototype.scene = function (id, scene) {
        if (scene == undefined || this.active_scene.length == 0)
            this.active_scene = id;
        if (scene != undefined)
            this.scenes[id] = scene;
    };
    engine.prototype.on = function (event, action) {
        if (this.path.length == 0) {
            if (!this.events.hasOwnProperty(event))
                this.events[event] = [];
            this.events[event].push(action);
        }
        else
            this.check_event(event, action);
    };
    engine.prototype.sprite = function (img, x, y, cx, cy, cw, ch, fx, fy) {
        if (!this.loaded.hasOwnProperty(img))
            throw "Error: File ".concat(img, " is not loaded");
        if (fx || fy) {
            this.ctx.save();
            this.ctx.scale(-1, 1);
        }
        this.ctx.drawImage(this.loaded[img], cx, cy, cw, ch, this.z * (fx ? -cw - x : x), this.z * (fy ? -ch - y : y), cw * this.z, ch * this.z);
        if (fx || fy)
            this.ctx.restore();
    };
    engine.prototype.draw = function (type, data) {
        if (data == undefined)
            data = {};
        if (entities != undefined && entities.hasOwnProperty(type)) {
            data = {...entities[type].default, ...data}
            if (entities[type].hasOwnProperty('render'))
                entities[type].render(data, this);
            return;
        }
    };
    engine.prototype.render = function (p) {
        var _this = this;
        if (p == undefined)
            p = document.body;
        p.appendChild(this.dom);
        p.addEventListener('keydown', function (key) { return _this.evented[key.key] = { alt: key.altKey, ctrl: key.ctrlKey }; });
        p.addEventListener('keyup', function (key) { return delete _this.evented[key.key]; });
    };
    ;
    return engine;
}());
var main = new engine();
main.load('MC.png');
main.scene('menu', function (dt0, dt1) {
    main.draw('pinoy', { d: dt0 / 1000, m: [1, 0] });
    console.log(dt0);
});
main.render();
