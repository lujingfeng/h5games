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
      "loading": "游戏加载中...{0}/{1}"
   },
   en: {
     "loading": "Loading...{0}/{1}"
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