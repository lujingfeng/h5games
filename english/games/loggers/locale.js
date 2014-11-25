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
      "tap": "左右点击，躲避树枝！",
      "high" : "您获得的分数太低，没有排名!\n获得称号:{0}",
      "rank": "全宇宙排名 {0} 位\n击败了全宇宙{1}%的网友\n获得称号：{2}",
	  "ming": "全国排名xxx位\n击败了全国88%的网友\n获得称号：灵敏手指",
	  "load": "游戏努力加载中...",
	  "loading": "游戏加载中...{0}/{1}",
	  "name":"手疾眼快 身手不凡 心手相应 眼明手快 心灵手巧 手到擒来 妙手回春 手脚麻利 一手遮天",
	  "name1":"游手好闲",
	  "name2":"手忙脚乱",
	  "name3":"捶足顿胸",
	  "name4":"手残",
	  "share":"请点击右上角\n点击【分享到朋友圈】\n测测好友的灵敏指数吧！",
	  "contact":"联系我们：smallAppleStudio@163.com\nPowered by egret framework",
	  "stop":"根本停不下来，玩过之后我整双手都灵活了！",
	  "best":"我一口气狂砍{0}棵树，超过了全宇宙{1}%的人，完全停不下来，求虐！"
   },
   en: {
     "tap": "Tap left and right to shy away from branches！",
     "high" : "Score not high enough to get onto the leaderboard.\n You got the title:{0}",
     "rank": "Ranking: No.{0};\nYou beat {1}% players.\n You got the title:{2}",
	 "ming": "National ranking xxx bit \n defeated country 88% of the users \n get the title: sensitive fingers",
	 "load": "Game effort Loading ...",
	 "loading": "Game Loading ...{0}/{1}",
	 "name":"Shoujiyankuai extraordinary skill Hand and Heart agile ingenuity Shoudaoqinlai Miaoshouhuichun nimble hoodwink",
	 "name1":"Idle",
	 "name2":"Rush",
	 "name3":"Fist foot Dayton chest",
	 "name4":"Hand residual",
	 "share":"Please click on the upper right corner \n click [Share Friend circle] \n Cece friend's sensitive index it!",
	 "contact":"",
	 "stop":"Did not stop, then I played the whole hands are flexible!",
	 "best":"I scored {0} tree breath, exceeding the whole universe {1} percent, totally not stop, seek child!"
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