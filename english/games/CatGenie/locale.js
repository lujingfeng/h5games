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
      "palace": "十分便民",
      "catah" : "自从得了神经病,整个人精神多了~",
      "normal": "经典模式",
      "veteran" : "基友模式",
      "genie" : "围住神经猫",
      "click" : "点击这里还有更多!",
      "retry" : "再来一次",
      "share" : "通知好友",
      "escaped" : "你让它跑啦!",
      
      "caught" : "您用13步抓住了神经猫",
      "caught2" : "您用{0}步抓住了神经猫",
      "rankbal" : "神经全国排名421位",
      "catchers" : "击败了精神病院80%的精神病患者",
      "title" : "获得称号：思维广",
      "nigie" : "您用{0}步抓住了神经猫和他的好基友",
      "rank" :"神经全国排名{0}位",
      "defea" : "击败了精神病院{0}的精神病患者",
      "title2" : "获得称号：{0}",
      "esc" : "你没有抓住神经猫和他的好!基!友!",
      "help" : "精神病院长又发神经病了！",
      "nocatch" : "您用{0}步都没有抓住神经猫",
      "has" : "你没有抓住神！经！猫！！",
      "name":"塞外高手, 神精病博士, 神经大神, 你是我的小苹果 , 院长派来的救兵, 精神病院长, 汝甚叼令尊知否, 传说中的高手, Magician风骚的少年, 白天睡觉喵",
      "name2":"神经大条, 我是处女座的, 停不下来, Elegant Dancer, 喵了个咪的, M78星人, 凤姐夫, Nobody",
      "name3":"神经大神"
      
   },
   en: {
      "palace": "Imperial Palace",
      "catah" : "Catch me if you can!",
      "normal": "Normal",
      "veteran" : "Veteran",
      "genie" : "Catch Genie",
      "click" : "Click to get more!",
      "retry" : "Retry",
      "share" : "Share",
      "escaped" : "Genie Escaped!",
      
      "caught" : "You've caught Genie in 13 steps",
      "caught2" : "You've caught Genie in {0} steps",
      "rankbal" : "Global Rank: 421",
      "catchers" : "Defeated 80% Genie Catchers in the world",
      "title" : "Title:",
      "nigie" : "You've caught Genie and Nigie in {0} steps",
      "rank" :"Global Rank: {0}",
      "defea" : "Defeated {0} % Genie Catchers in the world ",
      "title2" : "Title:{0}",
      "esc" : "Genie and Nigie has ESCAPED!",
      "help" : "Invite more Catchers for help!",
      "nocatch" : "You didn't catch Genie in {0} steps",
      "has" : "Genie has ESCAPED!",
	  "name":"God Controller, Terminator, Doctor X, I Am Real Genie, Super Aladdin, Ringmaster, Jasmine, The Sultan, Evil Magician, Blue Princess Merchant",
      "name2":"Lazy Butler, Greedy Minister, Brave Soldier, Elegant Dancer, Ruthless Lover, Crazy Robber, Fuddy-duddy, Nobody",
      "name3":"Doctor X"
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