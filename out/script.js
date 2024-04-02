var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
System.register("types", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("entities", [], function (exports_2, context_2) {
    "use strict";
    var entities;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            entities = {
                // Pinoy Entitiy
                pinoy: {
                    default: { x: 0, y: 0, f: 0, g: 1, m: [0, 0] },
                    render: function (d, o) {
                        o.sprite('MC.png', d.x, d.y, Math.abs(d.m[1]) > 0.5 ? d.f % 3 % 2 * 32 : Math.abs(d.m[0]) > 0.5 ? (2 + d.f) % 3 * 32 : d.f % 2 * 32, Math.abs(d.m[1]) > 0.5 ? 64 : Math.abs(d.m[0]) > 0.5 ? Math.floor((2 + d.f) / 3) * 32 : 0, 32, 32, d.m[0] < 0);
                    },
                    run: function (d, dt) {
                        //d.x += d.m[0]*dt/50;
                        d.m[0] -= d.m[0] * dt / 50;
                        //d.y -= d.m[1]*dt/100;
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
            exports_2("entities", entities);
        }
    };
});
System.register("engine", ["entities"], function (exports_3, context_3) {
    "use strict";
    var entities_ts_1, engine;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (entities_ts_1_1) {
                entities_ts_1 = entities_ts_1_1;
            }
        ],
        execute: function () {
            engine = /** @class */ (function () {
                function engine(w, h, dom) {
                    this.fps = 30; // Frames per second
                    // Loader
                    this.loaded = {}; // Loaded data in cache
                    this.active_scene = ''; // Active Scene
                    this.path = ''; // Current path of action (scene)
                    // Initalize Canvas
                    this.dom = dom ? dom : document.createElement('canvas');
                    this.w = w ? w : 320;
                    this.h = h ? h : 240;
                    this.z = w ? w / 320 : 2;
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
                    // Loading Menu
                    this.ctx.lineWidth = this.z;
                    this.ctx.strokeStyle = this.ctx.fillStyle = '#FFFFFF';
                    this.ctx.strokeRect(this.w * 0.25, this.h * 0.45, this.w * 0.5, this.h * 0.1);
                    // Loading Files
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
                    this.looper = setInterval(this.loop, 1000 / this.fps);
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
                // Drawing
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
                    if (entities_ts_1.entities != undefined && entities_ts_1.entities.hasOwnProperty(type)) {
                        data = __assign(__assign({}, entities_ts_1.entities[type].default), data);
                        // @ts-ignore
                        if (entities_ts_1.entities[type].hasOwnProperty('render'))
                            entities_ts_1.entities[type].render(data, this);
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
            exports_3("engine", engine);
        }
    };
});
System.register("game", ["engine"], function (exports_4, context_4) {
    "use strict";
    var engine_ts_1, main;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (engine_ts_1_1) {
                engine_ts_1 = engine_ts_1_1;
            }
        ],
        execute: function () {
            main = new engine_ts_1.engine();
            main.scene('menu', function (dt0, dt1) {
                main.draw('pinoy');
            });
            main.render();
        }
    };
});
