
var language = "en";
var locale = {
   zn: {
      "again": "没打中,手滑!再来一次~",
      "play" : "玩到了一个坑爹的游戏，不想砸手机就千万别来玩！",
      "hungry": "没吃饱饭吗,用力用力!!",
      "cacth" : "我把企鹅打出了${m}米，击败了${n}%人，来挑战我吧！",
      "pole" : "死鬼!想把我打去北极吗!",
      "best" : "讨厌啦~怎么那么棒!",
      "distance":"本次距离:",
      "record":"最远距离:",
      "terr":"笨熊喝大力，大力出奇迹！你获得了最好的成绩，快跟好友分享一下吧"
   },
   en: {
      "again": "Oops, you missed the target. Try again.",
      "play" : "Found a craaaazy game, com and join me!",
      "hungry": "Hungry?Try harder.",
      "cacth" : "Beat the penguin to ${m} meters, defated ${n}% players. Can you break my record?",
      "pole" : "Wanna send me to the North Pole?",
      "best" : "Wow, that's awesome!",
      "distance":"Distance:",
      "record":"Record distance:",
      "terr":"Terrific! Your set the record."
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