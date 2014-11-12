if (!this.hasOwnProperty("window")) {
    window = {};
}

var NullLocalStorage = (function () {
    function NullLocalStorage() {
        this.data = {};
    }

    NullLocalStorage.prototype.getItem = function (key) {
        return this.data[key];
    };

    NullLocalStorage.prototype.setItem = function (key, value) {
        this.data[key] = value;
    };

    NullLocalStorage.prototype.removeItem = function (key) {
        delete this.data[key];
    };

    NullLocalStorage.prototype.clear = function () {
        for (var key in this.data) {
            this.removeItem(key);
        }
    };
    return NullLocalStorage;
})();

var EgretLocalStorage = (function () {
    function EgretLocalStorage() {
        if (egret_webview.io.isFileExists(EgretLocalStorage.filePath)) {
            runtimeDebug("文件存在");
            var str = egret_webview.io.readFile(EgretLocalStorage.filePath, null);
            runtimeDebug(str);
            this.data = JSON.parse(str);
            runtimeDebug("ReadFileSuccess");
        }
        else {
            runtimeDebug("文件不存在");
            this.data = {};
        }
    }

    EgretLocalStorage.prototype.getItem = function (key) {
        return this.data[key];
    };

    EgretLocalStorage.prototype.setItem = function (key, value) {
        this.data[key] = value;
        this.save();
    };

    EgretLocalStorage.prototype.removeItem = function (key) {
        delete this.data[key];
        this.save();
    };


    EgretLocalStorage.prototype.clear = function () {
        for (var key in this.data) {
            delete this.data[key];
        }
        this.save();
    };
    EgretLocalStorage.prototype.save = function () {
        var isSuccess = egret_webview.io.writeFile(EgretLocalStorage.filePath, JSON.stringify(this.data), null);
        if (isSuccess) {
            runtimeDebug("WriteFileSuccess");
        }
        else {
            runtimeDebug("WriteFileFail");
        }
    };
    EgretLocalStorage.filePath = "LocalStorage.local";
    return EgretLocalStorage;
})();

window.EgretRuntimeBridgeInit = function() {
    if (window && window.hasOwnProperty("egret_webview") && typeof(egret_webview) != "undefined") {
        runtimeDebug("UseEgretWebview");
        egret_webview.onDestory = function () {
        };
        egret_webview.onPause = function () {
        };
        egret_webview.onResume = function () {
        };
        egret.localStorage = new EgretLocalStorage();

        initPromiseObject();
        //初始化NetContext
        initWebviewNetContext();
        initSound();
        context = egret.MainContext.instance;
        context.netContext = new egret.WebviewNetContext();
    }
    //else if(window && window.localStorage && window.localStorage.getItem)
    else {
        runtimeDebug("UnUseEgretWebview");
        egret.localStorage = new NullLocalStorage();

    }
}

function initWebviewNetContext() {
    var __extends = this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        __.prototype = b.prototype;
        d.prototype = new __();
    };
    (function (egret) {
        var WebviewNetContext = (function (_super) {
            __extends(WebviewNetContext, _super);
            function WebviewNetContext() {
                _super.call(this);
            }

            WebviewNetContext.prototype.loadSound = function (loader) {
                var request = loader._request;
                var url = request.url;
                var savePath = request.url;
                if (url.indexOf("http://") == -1) {
                    var base = "";
                    if (window["game_version"]) {
                        base = window.game_version + "/";
                    }
                    runtimeDebug("base::" + base);
                    url = location.href.slice(0, location.href.lastIndexOf("/") + 1) + base + url;
                }
                runtimeDebug("savePath：" + savePath);
                runtimeDebug("url：" + url);
                var promise = egret_webview.PromiseObject.create();
                promise.onSuccessFunc = function () {
                    runtimeDebug("download音乐成功！");
                    egret_webview.audio.preloadEffect(savePath);
                    var sound = new egret.Sound();
                    sound.path = savePath;
                    loader.data = sound;
                    egret.callLater(egret.Event.dispatchEvent, egret.Event, loader, egret.Event.COMPLETE);
                };
                promise.onErrorFunc = function () {
                    runtimeDebug("download音乐失败！" + url);
                    egret.IOErrorEvent.dispatchIOErrorEvent(loader);
                };
                egret_webview.io.download(url, savePath, promise.name);
            };
            return WebviewNetContext;
        })(egret.HTML5NetContext);
        egret.WebviewNetContext = WebviewNetContext;
    })(egret);
}

function initSound() {
    var egret_webview_sound = {};
    egret_webview_sound.volume = 1;
    egret_webview_sound.play = function (loop) {
        if (typeof loop == "undefined") {
            loop = false;
        }
        if (this.type == egret.Sound.MUSIC) {
            egret_webview.audio.playBackgroundMusic(this.path, loop);
            runtimeDebug("播放背景音乐");
        }
        else if (this.type == egret.Sound.EFFECT) {
            this.effect_id = egret_webview.audio.playEffect(this.path, loop);
            runtimeDebug("播放音效");
        }
    };
    egret_webview_sound.pause = function () {
        if (this.type == egret.Sound.MUSIC) {
            egret_webview.audio.stopBackgroundMusic();
        }
        else if (this.type == egret.Sound.EFFECT) {
            if (this.effect_id) {
                egret_webview.audio.stopEffect(this.effect_id);
                this.effect_id = null;
            }
        }
    };
    egret_webview_sound.load = function () {

    };
    egret_webview_sound.preload = function (type) {
        runtimeDebug("preload" + type);
        this.type = type;
        if (this.type == egret.Sound.MUSIC) {
            egret_webview.audio.preloadBackgroundMusic(this.path);
        }
        else if (this.type == egret.Sound.EFFECT) {
            egret_webview.audio.preloadEffect(this.path);
        }
    };
    egret_webview_sound.setVolume = function (value) {
        this.volume = value;
    };
    egret_webview_sound.getVolume = function () {
        return this.volume;
    };
    for (var key in egret_webview_sound) {
        egret.Sound.prototype[key] = egret_webview_sound[key];
    }
}

window.onerror = function () {
    runtimeDebug(arguments[0]);
    runtimeDebug(arguments[1]);
    runtimeDebug(arguments[2]);
};

function runtimeDebug(txt) {
    if (window && window.debugTxt) {
        window.debugTxt.text = window.debugTxt.text + "\n" + txt;
    }
}


if (typeof(egret_webview) == "undefined") {
    if (typeof(window.____egret_webview) == "undefined") {
        //Runtime出错了！！
        //alert("_js : window.____egret_webview undefined");
    }
    else {
        var egret_webview = {};
        egret_webview.obj = window.____egret_webview;
        console.log("_js : egret_webview =  " + egret_webview.obj);
        egret_webview.io = window.____egtIO;
        console.log("_js : egret_webview.io =  " + egret_webview.io);
        egret_webview.audio = window.____egtAudio;
        console.log("_js : egret_webview.audio =  " + egret_webview.audio);
    }
}

function initPromiseObject() {
    egret_webview.promiseObjectList = [];
    var PromiseObject = (function () {
        function PromiseObject() {
            var name = "PromiseObject" + PromiseObject.count;
            this.name = name;
            window[name] = this;
            PromiseObject.count++;
        }

        PromiseObject.create = function () {
            if (egret_webview.promiseObjectList.length) {
                return egret_webview.promiseObjectList.pop();
            }
            else {
                return new egret_webview.PromiseObject();
            }
        };

        PromiseObject.prototype.onSuccess = function () {
            if (this.onSuccessFunc) {
                this.onSuccessFunc.call(this.onSuccessThisObject);
            }
            this.destroy();
        };
        PromiseObject.prototype.onError = function (errorcode) {
            if (this.onErrorFunc) {
                this.onErrorFunc.call(this.onErrorThisObject);
            }
            this.destroy();
        };
        PromiseObject.prototype.destroy = function () {
            this.onSuccessFunc = null;
            this.onSuccessThisObject = null;
            this.onErrorFunc = null;
            this.onErrorThisObject = null;
            egret.promiseObjectList.push(this);
        };
        PromiseObject.count = 1;
        return PromiseObject;
    })();
    egret_webview.PromiseObject = PromiseObject;
}

