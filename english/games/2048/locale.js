
var language = "en";
var locale = {
   zn: {
      "score": "分数",
      "best" : "历史最佳",
      "sub_title": "冲击<strong>2048!</strong>",
      "newgame" : "刷新",
      "try_again" : "重试",
      "win_text" : "你赢啦!",
      "game_over" : "游戏结束!"
   },
   en: {
      "score": "SCORE",
      "best" : "BEST",
      "sub_title": "Join the numbers and get to the <strong>2048 tile!</strong>",
      "newgame" : "New Game",
      "try_again" : "Try again",
      "win_text" : "You win!",
      "game_over" : "Game over!"
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