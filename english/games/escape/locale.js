//扩展String format方法
String.prototype.format = function() {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,                
    function(m,i){
        return args[i];
    });
};
var language = "en";
var locale = {
   zn: {
   	  "loading":"游戏加载中...",
      "duck": "哥，挺住18秒！躲开条子",
      "holdon" : "你坚持了{0}秒，击败了全国{1}%的\n人，恭喜获得{2}称号",
      "holdup": "哥，挺住18秒！躲开条子。这次坚持了1秒，击败了全国1%的人",
      "name" : "小男人",
      "name2" : "宅男",
      "name3" : "成年男子",
      "name4" : "猛男",
      "secret" : "发现一个高分秘籍，哥坚持了{0}秒，你不知道吧！",
      "comeon" : "哥，挺住18秒!哥坚持了{0}秒，击败了全国{1}%的人，来试试吧！",
      
      "get" : "获取18秒秘籍",
      "look" : "查看",
      "again" : "重新来过",
      "title" : "哥，挺住18秒",
      "more" : "更多游戏",
      "friend" : "分享到朋友圈",
      "share" :"哥！分享！",
      "start" : "开始游戏",
      "move" : "移动哥,不要撞到条子"
      
   },
   en: {
      "loading":"Loading…",
      "duck": "Hold on for 18 seconds to avoid the moving blocks.",
      "holdon" : "You hold on for {0}seconds, beating {1}% players with the tile of {2}",
      "holdup": "Man, hold on for 18 seconds to avoid the moving blocks. You hold on for 1 second, beating 1% players. ",
      "name" : "Little man",
      "name2" : "Indoorsman",
      "name3" : "Grownup",
      "name4" : "Tough man",
      "secret" : "Got high-score cheats. I hold on for {0} seconds, jealous?",
      "comeon" : "Man, hold on for 18 seconds. I hold on for {0} seconds, beating {1} players. Have a try.",
      
      "get" : "Get cheats",
      "look" : "Check",
      "again" : "Play again",
      "title" : "Man, hold on for 18 seconds.",
      "more" : "More games",
      "friend" : "Share to social networks",
      "share" :"Share",
      "start" : "Start",
      "move" : "Move me to avoid the moving blocks."

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