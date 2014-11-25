
var language = "en";
var locale = {
   zn: {
      "lookse": "看你有多色",
      "loading": "加载中...",
      "color" : "找出所有色块里颜色不同的一个",
      "start": "开始游戏",
      "fenshu" : "得分：",
      "pause" : "暂停",
      "youare" : "经鉴定，您是：",
      "onemore" : "再来一次",
      "gamepause" : "游戏暂停",
      "gamecon" : "继续游戏"
   },
   en: {
      "lookse": "Color Sniper",
      "loading": "Loading...",
      "color" : "Find out the different color lump.",
      "start": "Start",
      "fenshu" : "Score：",
      "pause" : "Pause",
      "youare" : "You are:",
      "onemore" : "Play again",
      "gamepause" : "Pause",
      "gamecon" : "Continue"
   }
}

function fillLocaleText(){ 
    var localeEl = document.querySelectorAll("[data-locale]");
    var len = localeEl.length;
    
    for(var i=0; i < len; i++){
        var el = localeEl[i];
        var key = el.getAttribute("data-locale");
        el.innerHTML = locale[language][key];
    }
}

fillLocaleText();