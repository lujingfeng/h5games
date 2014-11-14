createjs.DisplayObject.prototype.setS = function(a) {
    this.mouseEnabled = !1;
    return this.set(a)
};
createjs.DisplayObject.prototype.setC = function(a) {
    try {
        this.set({
            regX: .5 * this.getBounds().width,
            regY: .5 * this.getBounds().height
        })
    } catch (b) {}
    return this.set(a)
};
createjs.DisplayObject.prototype.setSC = function(a) {
    this.mouseEnabled = !1;
    return this.setC(a)
};
createjs.DisplayObject.prototype.fade = function(a, b, c) {
    this.alpha = a;
    createjs.Tween.get(this).to({
        alpha: b
    }, c);
    return this
};
createjs.DisplayObject.prototype.addTo = function(a) {
    a.addChild(this);
    this.parentLayer = a;
    return this
};
createjs.DisplayObject.prototype.removeFrom = function(a) {
    _.isUndefined(a) ? this.parentLayer.removeChild(this) : a.removeChild(this);
    return this
};
createjs.DisplayObject.prototype.setAsButton = function(a, b) {
    this.mouseEnabled = !0;
    var c = this.on("click", function(d) {
        Sound.play("clickSound");
        createjs.Tween.get(d.currentTarget).to({
            scaleX: .8,
            scaleY: .8
        }, 100).to({
            scaleX: 1,
            scaleY: 1
        }, 200).call(a, [d.currentTarget], b)
    }, b);
    b instanceof Screen && b.registerListener(this, "click", a, b, c, !0)
};
createjs.DisplayObject.prototype.hitTestRect = function(a, b) {
    if (InRange(a - this.x + this.regX, 0, this.getBounds().width) && InRange(b - this.y + this.regY, 0, this.getBounds().height)) return !0
};
createjs.Container.prototype.addChilds = function(a) {
    for (var b = 0; b < a.length; ++b) this.addChild(a[b]);
    return this
};
createjs.Tween.prototype.removeAfter = function() {
    this.call(function() {
        this.removeFrom()
    }, [], this._target);
    return this
};
Object.size = function(a) {
    var b = 0,
        c;
    for (c in a) a.hasOwnProperty(c) && b++;
    return b
};

function fixDoubleClickAndroid() {
    -1 < navigator.userAgent.indexOf("Android") && !(-1 < navigator.userAgent.indexOf("Chrome")) && stage.enableDOMEvents(!1)
}

function extend(a, b) {
    var c = function() {};
    c.prototype = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.superclass = b.prototype
}

function Log(a) {
    debug && console.log(a)
}
var Rad2Grad = 180 / Math.PI,
    Grad2Rad = Math.PI / 180;

function Limit(a, b, c) {
    return a < b ? b : a > c ? c : a
}

function Distance(a, b, c, d) {
    return Math.sqrt((a - c) * (a - c) + (b - d) * (b - d))
}

function InRange(a, b, c) {
    return a >= b && a <= c
}

function InRect(a, b, c, d, e, f) {
    return InRange(a, c, c + e) && InRange(b, d, d + f)
}

function ValueSign(a) {
    return 0 < a ? 1 : 0 > a ? -1 : 0
}

function GetAngle(a, b, c, d) {
    for (a = Math.atan2(d - b, c - a) * Rad2Grad; 0 > a;) a += 360;
    return a
}

function checkIntersect(a, b, c, d, e, f, g, h) {
    return a >= e + g || a + c <= e || b >= f + h || b + d <= f ? !1 : !0
}
var RadialBar = function(a, b, c, d, e, f) {
    this.initialize();
    this.thickness = f;
    this.color = e;
    this.radius = d;
    this.strokeStyle = "round";
    this.setBounds(0, 0, 2 * d, 2 * d);
    this.setSC({
        x: b,
        y: c
    });
    this.shadow = new createjs.Shadow(e, 0, 0, 1);
    a.addChild(this)
};
extend(RadialBar, createjs.Shape);
RadialBar.prototype.update = function(a) {
    this.graphics.clear().setStrokeStyle(this.thickness, this.strokeStyle);
    this.graphics.beginStroke(this.color).arc(this.radius, this.radius, this.radius, .5 * -Math.PI, 2 * Math.PI * a - .5 * Math.PI, !1)
};
var showFps = !1,
    Screen = function() {
        this.initialize();
        this.listeners = [];
        this.timers = [];
        this.removeCallbacks = [];
        this.fadeTime = 500
    };
extend(Screen, createjs.Container);
Screen.prototype.load = function(a) {
    window.activeScreen = this;
    this.parentScreen = a;
    this.alpha = 0;
    this.parentScreen ? this.parentScreen.addChild(this) : (stage.removeAllChildren(), stage.addChild(this));
    showFps && (this.FpsText = addText(this, "FPS", "24px Arial", "gray", 10, 10).set({
        textAlign: "left"
    }), this.on(createjs.Ticker, "tick", function() {
        this.FpsText.text = createjs.Ticker.getMeasuredFPS() | 0
    }, this));
    createjs.Tween.get(this).to({
        alpha: 1
    }, this.fadeTime);
    return this
};
Screen.prototype.on = function(a, b, c, d) {
    this.registerListener(a, b, c, d, a.on(b, c, d))
};
Screen.prototype.registerListener = function(a, b, c, d, e, f) {
    this.listeners.push({
        target: a,
        type: b,
        listener: c,
        scope: d,
        func: e,
        mouse: f
    })
};
Screen.prototype.startListeners = function() {
    for (var a = 0; a < this.listeners.length; ++a) null != this.listeners[a].mouse ? this.listeners[a].target.mouseEnabled = !0 : this.listeners[a].func = this.listeners[a].target.on(this.listeners[a].type, this.listeners[a].listener, this.listeners[a].scope)
};
Screen.prototype.stopListeners = function() {
    for (var a = 0; a < this.listeners.length; ++a) null != this.listeners[a].mouse ? this.listeners[a].target.mouseEnabled = !1 : this.listeners[a].target.off(this.listeners[a].type, this.listeners[a].func)
};
Screen.prototype.remove = function() {
    this.stopListeners();
    this.removeTimers();
    createjs.Tween.get(this).to({
        alpha: 0
    }, this.fadeTime).call(function() {
        this.parentScreen ? (this.parentScreen.removeChild(this), window.activeScreen = this.parentScreen) : stage.removeChild(this);
        this.removeAllEventListeners();
        this.nextScreen && this.nextScreen.load()
    }, this);
    for (var a = 0; a < this.removeCallbacks.length; ++a) this.removeCallbacks[a]()
};
Screen.prototype.unload = function(a) {
    this.nextScreen = a;
    this.remove()
};
Screen.prototype.onRemove = function(a, b) {
    this.removeCallbacks.push(a.bind(b))
};
Screen.prototype["switch"] = function(a) {
    this.stopListeners();
    a.load(this).onRemove(function() {
        this.startListeners()
    }, this)
};
Screen.prototype.setTimer = function(a, b) {
    b = setInterval(a.bind(this), b, this);
    this.timers.push(b);
    return b
};
Screen.prototype.removeTimer = function(a) {
    clearInterval(a);
    this.timers.splice(this.timers.indexOf(a), 1)
};
Screen.prototype.removeTimers = function() {
    for (var a = 0; a < this.timers.length; ++a) this.removeTimer(this.timers[a])
};
var Sound = {
        musicChannel: null,
        musicVolume: 1,
        initialize: function() {
            createjs.Sound.initializeDefaultPlugins();
            createjs.Sound.alternateExtensions = ["mp3"];
            document.addEventListener("visibilitychange", Sound.visibilityChanged, !1)
        },
        visibilityChanged: function() {
            document.hidden ? Sound.stopMusic() : Sound.startMusic()
        },
        play: function(a, b, c) {
            State.state.sound && createjs.Sound.play(a, {
                interrupt: c ? createjs.Sound.INTERRUPT_NONE : createjs.Sound.INTERRUPT_ANY,
                volume: b ? b : 1
            })
        },
        startMusic: function() {
            State.state.music && (null !==
                this.musicChannel ? (this.musicChannel.resume(), createjs.Tween.get(this.musicChannel, {
                    override: !0
                }).to({
                    volume: this.musicVolume
                }, 500)) : this.musicChannel = createjs.Sound.play("music", {
                    interrupt: createjs.Sound.INTERRUPT_ANY,
                    loop: -1,
                    volume: this.musicVolume
                }))
        },
        stopMusic: function() {
            null !== this.musicChannel && createjs.Tween.get(this.musicChannel, {
                override: !0
            }).to({
                volume: 0
            }, 500).call(function() {
                this.musicChannel.pause()
            }, [], this)
        },
        switchSound: function() {
            State.state.sound = !State.state.sound;
            State.save()
        },
        switchMusic: function() {
            State.state.music = !State.state.music;
            State.state.music ? this.startMusic() : this.stopMusic();
            State.save()
        }
    },
    State = {
        name: null,
        state: {},
        isLocalStorageSupported: function() {
            try {
                return "localStorage" in window && null !== window.localStorage
            } catch (a) {
                return !1
            }
        },
        save: function() {
            if (State.isLocalStorageSupported()) try {
                localStorage[State.name] = JSON.stringify(State.state)
            } catch (a) {}
        },
        load: function() {
            if (State.isLocalStorageSupported()) try {
                var a = localStorage[State.name];
                null != a && (State.state = JSON.parse(a))
            } catch (b) {}
        }
    },
    Viewporter = {
        viewporter: null,
        initial: -1,
        landscape: !1,
        isMobile: function() {
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) return !0
        },
        calcSize: function() {
            var a = canvas.width / canvas.height,
                b = {
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            b.width / b.height > a ? b.width = b.height * a : b.height = b.width / a;
            return b
        },
        orientationChanged: function() {
            Viewporter.isMobile() && (document.getElementById("rotate").style.display = (Viewporter.landscape ? window.innerHeight > window.innerWidth : window.innerWidth > window.innerHeight) ? "block" : "none")
        },
        sizeChanged: function() {
            Viewporter.orientationChanged();
            null === Viewporter.viewporter && (Viewporter.viewporter = document.getElementById("viewporter"), Viewporter.initial = Viewporter.landscape ? canvas.width : canvas.height);
            Viewporter.landscape ? canvas.width = Viewporter.initial : canvas.height = Viewporter.initial;
            var a = Math.min(Viewporter.landscape ? window.innerWidth : window.innerHeight, 1200),
                b = Viewporter.calcSize();
            Viewporter.landscape ? b.width < a && (canvas.width *= a / b.width, b.width = a) : b.height < a && (canvas.height *= a / b.height, b.height = a);
            Viewporter.applySize(b.width, b.height)
        },
        applySize: function(a, b) {
            canvas.style.width = a + "px";
            canvas.style.height = b + "px";
            Viewporter.viewporter.style.marginTop = .5 * -b + "px";
            Viewporter.viewporter.style.marginLeft = .5 * -a + "px"
        },
        autoResize: function() {
            var a = _.debounce(this.sizeChanged, 200);
            window.addEventListener("resize",
                a, !1);
            window.addEventListener("orientationchange", a, !1);
            this.sizeChanged()
        }
    };

function addText(a, b, c, d, e, f, g) {
    b = new createjs.Text(b, c, d);
    b.setS({
        textAlign: "center",
        x: e,
        y: f - .5 * b.getMeasuredHeight()
    });
    createjs.Sound.BrowserDetect.isFirefox && (b.y += .25 * b.getMeasuredHeight());
    g && (b.shadow = g);
    a.addChild(b);
    return b
}

function Blink(a, b, c) {
    c ? a.cache(.5 * -a.getBounds().width, .5 * -a.getBounds().height, a.getBounds().width, a.getBounds().height) : a.cache(0, 0, a.getBounds().width, a.getBounds().height);
    var d = {
        b: 0
    };
    createjs.Tween.get(d).to({
        b: 255
    }, b).to({
        b: 0
    }, b).on("change", function(a) {
        this.filters = [new createjs.ColorFilter(1, 1, 1, 1, d.b, d.b, d.b)];
        this.updateCache()
    }, a).call(function(a) {
        a.filters = null;
        a.uncache()
    }, [a])
}

function simpleButton(a, b, c, d, e, f) {
    a = (new createjs.Container).set({
        x: b,
        y: c
    }).addTo(a);
    e = addText(a, d, e, f, 0, 0, defShadow);
    d = new createjs.Shape;
    e = e.getBounds();
    a.addChildAt(d, 0);
    d.graphics.beginFill("rgba(0,0,0,0.5)").drawRoundRect(.8 * -e.width, .6 * -e.height, 1.6 * e.width, 1.4 * e.height, 10);
    a.cache(.8 * -e.width, .6 * -e.height, 1.6 * e.width, 1.4 * e.height);
    return a
}

function createShade(a, b, c, d) {
    var e = new createjs.Shape;
    e.graphics.beginFill("rgba(" + a + "," + b + "," + c + "," + d + ")").drawRect(0, 0, canvas.width, canvas.height);
    e.cache(0, 0, canvas.width, canvas.height);
    return e
}
var failScreen = function() {
    Screen.apply(this, arguments);
    var a = getBest(ActiveMode);
    Count > a && setBest(ActiveMode, Count);
    addText(this, Res.local.GameOver, makeFont(40), "#333", CX, CY - 200, defShadow);
	
    _.values(Modes);
    [{
        x: CX,
        y: CY - 80,
        w: 400,
        h: 160,
        c: "#666"
    }, {
        x: CX,
        y: CY + 50,
        w: 400,
        h: 80,
        c: "#333",
        t: Res.local.TryAgain,
        f: function() {
            this.unload(new gameScreen)
        }
    }, {
        x: CX,
        y: CY + 50 + 80 + 10,
        w: 400,
        h: 80,
        c: "#333",
        t: Res.local.Home,
        f: function() {
            this.unload(new menuScreen)
        }
    }].forEach(function(b) {
        var d = gamePanel(this, b.x, b.y, b.w, b.h, b.c);
        _.isUndefined(b.t) ? (addText(this, Res.local.Score.toUpperCase(), makeFont(18), "white", b.x, b.y - 56), addText(this, Count, makeFont(40), "white", b.x, b.y - 24), addText(this, Res.local.Best.toUpperCase(), makeFont(18), "white", b.x, b.y + 16), addText(this, a, makeFont(40), "white", b.x, b.y + 48)) : (addText(this, b.t.toUpperCase(), makeFont(32), "white", b.x, b.y), d.setAsButton(b.f, this))
    }, this);

     //alert("ssss"+ Count);
	 var str = Count;
	try{parent.__4399finishgame(str);}catch(e){}

    var b = (new createjs.Sprite(Res.soundSheet, State.state.sound ? "on" : "off")).set({
        x: CX - 60,
        y: CY + 240
    }).addTo(this);
    b.setAsButton(function() {
        Sound.switchSound();
        this.gotoAndPlay(State.state.sound ? "on" : "off")
    }, b);
    (new Res.get("gamepad")).setC({
        x: CX + 60,
        y: CY + 240
    }).addTo(this).setAsButton(function() {
        //window.location = "http://m.softgames.de"
       // SG.redirectToPortal();
	   try{parent.moregame();}catch(e){}
    }, b);
    SG_Hooks.gameOver(getModeLevel(), Count)
};
extend(failScreen, Screen);
"use strict";
var Modes = {
        Normal: "normal",
        Nightmare: "nightmare",
        Hell: "hell",
        Inferno: "inferno",
        Tutorial: "tutorial"
    },
    ActiveMode = Modes.Normal,
    Count = 0,
    colors = ["#4c8ca7", "#f96e69", "#9cdb7c", "#ffce74", "#60628b"];

function gamePanel(a, b, c, d, e, f) {
    a = (new createjs.Shape).set({
        x: b,
        y: c
    }).addTo(a);
    a.graphics.beginFill(f).drawRoundRect(.5 * -d, .5 * -e, d, e, 5);
    a.cache(.5 * -d, .5 * -e, d, e);
    return a
}

function getBest(a) {
    a = _.find(State.state.modes, {
        mode: a
    });
    return _.isUndefined(a) ? 0 : a.best
}

function setBest(a, b) {
    var c = _.find(State.state.modes, {
        mode: a
    });
    _.isUndefined(c) ? State.state.modes.push({
        mode: a,
        best: b
    }) : c.best = b;
    State.save()
}

function getModeName(a) {
    switch (a) {
        case Modes.Nightmare:
            return Res.local.Nightmare;
        case Modes.Hell:
            return Res.local.Hell;
        case Modes.Inferno:
            return Res.local.Inferno
    }
    return Res.local.Normal
}

function getModeLevel() {
    switch (ActiveMode) {
        case Modes.Nightmare:
            return 2;
        case Modes.Hell:
            return 3;
        case Modes.Inferno:
            return 4
    }
    return 1
}
var makeFont = function(a) {
        return "bold " + a + "px Verdana"
    },
    gameScreen = function() {
        Screen.apply(this, arguments);
        Count = 0;
        this.instances = [];
        var a = 2;
        switch (ActiveMode) {
            case Modes.Nightmare:
                a = 3;
                break;
            case Modes.Hell:
                a = 4;
                break;
            case Modes.Inferno:
                a = 5
        }
        var b = (canvas.height - (ActiveMode === Modes.Tutorial ? 100 : 0)) / a;
        this.lockClick = !1;
        for (var c = 0; c < a; ++c)(function() {
            var a = (new createjs.Container).setS({
                y: c * b
            }).addTo(this);
            a.index = c;
            a.back = (new createjs.Shape).addTo(a);
            a.back.graphics.beginFill(colors[c]).drawRect(0,
                0, canvas.width, b);
            a.back.graphics.beginFill("#15222d").drawRect(0, b - 16, canvas.width, 16);
            a.flash = (new createjs.Shape).set({
                visible: !1
            }).addTo(a);
            a.flash.graphics.beginFill("white").drawRect(0, 0, canvas.width, b);
            a.hero = (new createjs.Sprite(Res.heroSheet, "none")).setS({
                x: 100,
                y: b - 61
            }).addTo(a);
            a.slimesLayer = (new createjs.Container).addTo(a);
            a.slimeDieLayer = (new createjs.Container).addTo(a);
            a.mom = (new createjs.Sprite(Res.momSheet, "none")).setS({
                x: canvas.width,
                y: b - 2
            }).addTo(a);
            a.fireInterval = _.random(10,
                100);
            _.isUndefined(this.firstAttackAdded) && (a.fireInterval = _.random(10, 30), this.firstAttackAdded = 1);
            a.fireCounter = 0;
            a.slimes = [];
            a.isAttacking = !1;
            if (ActiveMode === Modes.Tutorial) {
                addText(a, _.isUndefined(this.tutorialFirstAdded) ? Res.local.Tutorial1 : Res.local.Tutorial2, makeFont(30), "#333", CX, 70, defShadow);
                this.tutorialFirstAdded = !0;
                a.hand = (new createjs.Sprite(Res.handSheet, "none")).setS({
                    x: CX,
                    y: .5 * b
                }).addTo(a);
                var e = gamePanel(this, CX, canvas.height - 50, 400, 80, "#333");
                addText(this, Res.local.LetsPlay.toUpperCase(),
                    makeFont(35), "white", CX, canvas.height - 50);
                e.setAsButton(function() {
                    this.beforeUnload();
                    this.unload(new menuScreen)
                }, this)
            }
            this.setTimer(function() {
                ActiveMode === Modes.Tutorial && 0 < this.getSlimesToAttack(a).length && !a.isAttacking && (a.hand.gotoAndPlay("action"), this.attack(a));
                if (!this.lockClick && (++a.fireCounter, a.fireCounter >= a.fireInterval)) {
                    a.fireCounter = 0;
                    a.fireInterval = _.random(10, 100);
                    a.mom.gotoAndPlay("action");
                    Sound.play("slimeStartSound");
                    var b = (new createjs.Sprite(Res.slimeSheet, "action")).setS({
                        x: a.mom.x,
                        y: a.mom.y - 16 + 3
                    }).addTo(a.slimesLayer);
                    createjs.Tween.get(b).to({
                        x: a.hero.x
                    }, _.random(3E3, 4E3)).call(function() {
                        ActiveMode === Modes.Tutorial ? b.removeFrom() : (this.lockClick = !0, Sound.play("dieSound"), a.flash.visible = !0, _.delay(function() {
                            a.flash.visible = !1
                        }, 100), this.beforeUnload(), b.removeFrom(), a.hero.gotoAndPlay("die"), a.hero.on("animationend", function(b) {
                            b.remove();
                            createjs.Tween.get(a.hero).to({
                                y: a.hero.y + 20,
                                alpha: 0
                            }, 1E3)
                        }), _.delay(function() {
                            this.unload(new failScreen)
                        }.bind(this), 1E3))
                    }, [], this);
                    a.slimes.push(b)
                }
            }, 100);
            this.instances.push(a)
        }).call(this);
        this.counter = addText(this, "0", "bold 60px Verdana", "#15222d", CX, 30, defShadow);
        ActiveMode === Modes.Tutorial && (this.counter.visible = !1);
        this.on(stage, "stagemousedown", function(a) {
            if (window.activeScreen === this && !this.lockClick && ActiveMode !== Modes.Tutorial) {
                var c = null;
                this.instances.forEach(function(f) {
                    InRange(a.stageY - f.y, 0, b) && (c = f)
                }, this);
                null !== c && activeScreen.attack(c)
            }
        }, this);
        SG_Hooks.start()
    };
extend(gameScreen, Screen);
gameScreen.prototype.beforeUnload = function() {
    this.lockClick = !0;
    this.stopListeners();
    this.removeTimers();
    this.instances.forEach(function(a) {
        a.slimes.forEach(function(a) {
            createjs.Tween.removeTweens(a)
        })
    })
};
gameScreen.prototype.getSlimesToAttack = function(a) {
    var b = [];
    a.slimes.forEach(function(c) {
        75 >= c.x - a.hero.x && b.push(c)
    });
    return b
};
gameScreen.prototype.attack = function(a) {
    activeScreen.getSlimesToAttack(a);
    a.hero.on("animationend", function(b) {
        b.remove();
        activeScreen.getSlimesToAttack(a).forEach(function(b) {
            b.defeated = !0;
            createjs.Tween.removeTweens(b);
            a.slimes.splice(a.slimes.indexOf(b), 1);
            Sound.play("slimeDieSound");
            ++Count;
            this.counter.text = Count;
            var d = (new createjs.Sprite(Res.slimeDieSheet, "action")).setS({
                x: b.x,
                y: b.y + 30
            }).addTo(a.slimeDieLayer);
            d.on("animationend", function(a) {
                a.remove();
                d.removeFrom()
            });
            b.removeFrom()
        }, activeScreen);
        a.isAttacking = !1
    });
    a.isAttacking = !0;
    a.hero.gotoAndPlay("action");
    Sound.play("attackSound")
};
var loadScreen = function() {
    Screen.apply(this, arguments);
    this.barsLayer = (new createjs.Container).set({
        scaleX: 0,
        scaleY: 0,
        x: .5 * canvas.width,
        y: .5 * canvas.height
    }).addTo(this);
    createjs.Tween.get(this.barsLayer).to({
        scaleX: 1,
        scaleY: 1
    }, 300);
    var a = (new createjs.Shape).addTo(this.barsLayer);
    a.graphics.beginFill("rgba(0,100,100,0.5)").drawCircle(0, 0, 87);
    a.shadow = new createjs.Shadow("#000", 0, 0, 10);
    this.barShadow = new RadialBar(this.barsLayer, 0, 0, 80, "#bbb", 10);
    this.barShadow.update(1);
    this.bar = new RadialBar(this.barsLayer,
        0, 0, 80, "#e3ea0c", 10);
    this.bar.strokeStyle = 2;
    this.bar.update(this.barPos);
    this.clockShadow = new createjs.Bitmap("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAByCAYAAADj29d4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkJBMkQ1QzQyNjZDMTFFNEE1RkJCQTBBQTg4NjkzMDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkJBMkQ1QzMyNjZDMTFFNEE1RkJCQTBBQTg4NjkzMDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFMkNGNTIwMjY2OTExRTQ4OEQzQUU1RjBCODZCOEE5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFMkNGNTIxMjY2OTExRTQ4OEQzQUU1RjBCODZCOEE5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+zYPwcAAACvxJREFUeNrsXX2QVmUV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");
    this.clockColor = new createjs.Bitmap("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAByCAYAAADj29d4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRTJDRjUyMDI2NjkxMUU0ODhEM0FFNUYwQjg2QjhBOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRTJDRjUyMTI2NjkxMUU0ODhEM0FFNUYwQjg2QjhBOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFMkNGNTFFMjY2OTExRTQ4OEQzQUU1RjBCODZCOEE5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFMkNGNTFGMjY2OTExRTQ4OEQzQUU1RjBCODZCOEE5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+4E1UEQAACldJREFUeNrsXVtwldUV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");
    this.clockShadow.setS({
        regX: 32,
        regY: 58
    }).addTo(this.barsLayer);
    this.clockColor.setS({
        regX: 32,
        regY: 58
    }).addTo(this.barsLayer);
    this.clockMask = new createjs.Shape;
    this.clockColor.mask = this.clockMask
};
extend(loadScreen, Screen);
loadScreen.prototype.loadingProgress = function() {
    this.bar.update(loader.progress);
    this.clockMask.graphics.clear();
    this.clockMask.graphics.beginFill("white").drawRect(-32, 60 - 120 * loader.progress, 64, 120)
};
loadScreen.prototype.fileLoaded = function(a) {
    switch (a.item.id) {
        case "logo":
            this.logo = (new createjs.Bitmap(loader.getResult("logo"))).setC({
                x: .5 * canvas.width,
                y: .88 * canvas.height,
                alpha: 0
            }).addTo(this).fade(0, 1, 500), this.logo.setAsButton(function() {
                
            }, this)
    }
};
loadScreen.prototype.loadingComplete = function() {
    Res.prepare();
    createjs.Tween.get(this.barsLayer, {
        override: !0
    }).to({
        scaleX: 0,
        scaleY: 0
    }, 300).call(function() {
        this.logo.fade(1, 0, 100);
        this.unload(new menuScreen)
    }, [], this)
};
var loadList = [{
        src: "logo.png",
        id: "logo"
    }, {
        src: "gamepad.png",
        id: "gamepad"
    }, {
        src: "hero.png",
        id: "hero"
    }, {
        src: "mom.png",
        id: "mom"
    }, {
        src: "slime.png",
        id: "slime"
    }, {
        src: "slimeDie.png",
        id: "slimeDie"
    }, {
        src: "sound.png",
        id: "sound"
    }, {
        src: "hand.png",
        id: "hand"
    }, {
        src: "audio/click.ogg",
        id: "clickSound",
        type: createjs.LoadQueue.SOUND
    }, {
        src: "audio/attack.ogg",
        id: "attackSound",
        type: createjs.LoadQueue.SOUND
    }, {
        src: "audio/die.ogg",
        id: "dieSound",
        type: createjs.LoadQueue.SOUND
    }, {
        src: "audio/slimeDie.ogg",
        id: "slimeDieSound",
        type: createjs.LoadQueue.SOUND
    }, {
        src: "audio/slimeStart.ogg",
        id: "slimeStartSound",
        type: createjs.LoadQueue.SOUND
    }, {
        src: "local.json",
        id: "local",
        type: createjs.LoadQueue.JSON
    }],
    canvas, stage, loader, defShadow = new createjs.Shadow("#333", 0, 0, 3),
    language = "en",
    debug = !0,
    CX, CY;
window.attachEvent ? window.attachEvent("onload", main) : window.addEventListener("load", main, !0);

function main() {
    canvas = document.getElementById("scene");
    Viewporter.autoResize();
    stage = new createjs.Stage(canvas);
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", function() {
        stage.update()
    });
    CX = .5 * canvas.width;
    CY = .5 * canvas.height;
    stage.enableMouseOver(0);
    createjs.Touch.isSupported() && (fixDoubleClickAndroid(), createjs.Touch.enable(stage, !0));
    window.addEventListener("touchstart", function() {
        return !1
    });
    window.scrollTo(0, createjs.isAndroid ? 1 : 0);
    Sound.initialize();
    State.name = "Fight-release-1";
    State.state = {
        sound: !0,
        music: !0,
        modes: []
    };
    State.load();
    language = SG.lang; //SG_Hooks.getLanguage("en ru de pt it fr es tr".split(" "));
    SG_Hooks.setOrientationHandler(Viewporter.orientationChanged);
    SG_Hooks.setResizeHandler(Viewporter.sizeChanged);
    var a = (new loadScreen).load();
    loader = new createjs.LoadQueue(!0, "assets/");
    loader.installPlugin(createjs.Sound);
    loader.setMaxConnections(10);
    loader.on("progress", a.loadingProgress, a);
    loader.on("fileload", a.fileLoaded, a);
    loader.on("complete", a.loadingComplete, a);
    loader.loadManifest(loadList)
}
var menuScreen = function() {
    Screen.apply(this, arguments);
    addText(this, "Let Them Fight", makeFont(40), "#333", CX, CY - 200, defShadow);
    var a = 400 / 3 - 7,
        b = _.values(Modes),
        c = [{
            x: CX,
            y: CY - 100,
            w: 400
        }, {
            x: CX - 200 + .5 * a,
            y: CY - 10,
            w: a
        }, {
            x: CX - 200 + 1.5 * a + 10,
            y: CY - 10,
            w: a
        }, {
            x: CX - 200 + 2.5 * a + 20,
            y: CY - 10,
            w: a
        }, {
            x: CX,
            y: CY + 80,
            w: 400
        }];
    c.forEach(function(a) {
        (function() {
            var e = c.indexOf(a),
                f;
            e < b.length && (b[e] === Modes.Tutorial ? (f = gamePanel(this, a.x, a.y, a.w, 80, "#ccc"), addText(this, Res.local.HowToPlay.toUpperCase(), makeFont(35), "#333", a.x, a.y),
                f.mode = b[e]) : (f = gamePanel(this, a.x, a.y, a.w, 80, colors[e]), f.mode = b[e], addText(this, getModeName(f.mode).toUpperCase(), makeFont(0 === e ? 35 : 17), "#333", a.x, a.y - 10), addText(this, Res.local.Best.toUpperCase() + ": " + getBest(f.mode), makeFont(16), "#333", a.x, a.y + 20)));
            f.setAsButton(function() {
                ActiveMode = f.mode;
                this.unload(new gameScreen)
            }, this)
        }).call(this)
    }, this);
    a = (new createjs.Sprite(Res.soundSheet, State.state.sound ? "on" : "off")).set({
        x: CX - 60,
        y: CY + 220
    }).addTo(this);
    a.setAsButton(function() {
        Sound.switchSound();
        this.gotoAndPlay(State.state.sound ? "on" : "off")
    }, a);
    (new Res.get("gamepad")).setC({
        x: CX + 60,
        y: CY + 220
    }).addTo(this).setAsButton(function() {
        //window.location = "http://m.softgames.de"
       // SG.redirectToPortal();
	   try{parent.moregame();}catch(e){}
    }, a)
};
extend(menuScreen, Screen);
var Res = {
    get: function(a) {
        return new createjs.Bitmap(loader.getResult(a))
    },
    prepare: function() {
        this.locals = loader.getResult("local");
        this.local = this.locals[language];
        this.heroSheet = new createjs.SpriteSheet({
            images: [loader.getResult("hero")],
            frames: {
                width: 129,
                height: 99,
                regX: 64.5,
                regY: 49.5,
                count: 27
            },
            animations: {
                none: [0],
                action: [0, 19, "none", 2],
                die: [20, 26, !1, .5]
            }
        });
        this.momSheet = new createjs.SpriteSheet({
            images: [loader.getResult("mom")],
            frames: {
                width: 131,
                height: 155,
                regX: 131,
                regY: 155,
                count: 17
            },
            animations: {
                none: [0],
                action: [0, 16, "none", 1]
            }
        });
        this.slimeSheet = new createjs.SpriteSheet({
            images: [loader.getResult("slime")],
            frames: {
                width: 39,
                height: 29,
                regX: 19.5,
                regY: 29,
                count: 17
            },
            animations: {
                action: [0, 16, !0, 1]
            }
        });
        this.slimeDieSheet = new createjs.SpriteSheet({
            images: [loader.getResult("slimeDie")],
            frames: {
                width: 125,
                height: 147,
                regX: 62.5,
                regY: 73.5,
                count: 18
            },
            animations: {
                action: [0, 17, !1, 1]
            }
        });
        this.soundSheet = new createjs.SpriteSheet({
            images: [loader.getResult("sound")],
            frames: {
                width: 64,
                height: 64,
                regX: 32,
                regY: 32,
                count: 2
            },
            animations: {
                on: [0],
                off: [1]
            }
        });
        this.handSheet = new createjs.SpriteSheet({
            images: [loader.getResult("hand")],
            frames: {
                width: 103,
                height: 151,
                regX: 51.5,
                regY: 75.5,
                count: 2
            },
            animations: {
                none: [1],
                action: [0, 1, "none", .1]
            }
        })
    }
};