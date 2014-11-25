
function w596_rank(x){
    var s ='';
	
	var t ='The Amaazing Spiderman Inferno';

	var x1=''; // 部门
	var x2=''; // 公职
    var y='';  // 人数
    var z='';  // 百分比
    
	 var arr ='';
    
	if(x>10000){
		x2='The Amazing Spiderman';
		z='99';
		y=Math.floor(  + Math.random() *  713);
	}
	 
	else if(x>3000){						// 特攻队
		arr= "Premiere Spiderman;Iron Spiderman;Super Spiderman;Popular Spiderman".split(";"); 
		x2=arr[Math.floor(Math.random() * arr.length)];
		z=myRnd(55,98);
		y=Math.floor(  + Math.random() *  97596);
		
	}
	else if(x>1000){							// 陆战队
		arr= "Naughty Spiderman;Slick Spiderman".split(";"); 
		x2=arr[Math.floor(Math.random() * arr.length)];
		z=myRnd(20,55);
		y=Math.floor(  + Math.random() *  998899);
	}
	else if(x>500){							// 文艺兵
		arr= "Primary Copycat;Secondary Copycat;Senior Copycat".split(";"); 
		x2=arr[Math.floor(Math.random() * arr.length)];
		z=myRnd(5,20);
		y=Math.floor(  + Math.random() *  72568899);
		
	}
	else{  									// 预备役
		x2='Failure';
		z=myRnd(1,5);
		
		if(e==0){z=1;}
				y=Math.floor(  + Math.random() *  895968899);

	}
	
	
	
	title = "I've gained the title "+x2+"in"+t+"，What about you?";
	//dp_submitScore(x);
    return  '<div id="weixin-share"></div><div id="weixin-text"><div id="j"><div id="txt">'+x2+'</div><div id="rank">Rank '+y+' <br/>Defeated ' + z+ '% players</div></div></div></div>';

	 
}


function myRnd(min,max){
    return Math.floor(min+Math.random()*(max-min));
}


  var isTouch = ('ontouchstart' in window);
    var touchStartEvent = isTouch ? "touchstart" : "mousedown";
    var touchEndEvent = isTouch ? "touchend" : "mouseup";


   document.addEventListener(touchStartEvent, function () {
            try {
                event.stopPropagation();
            }
            catch (err) {
            }

        }, false);
        document.addEventListener(touchEndEvent, function () {
            
            event.stopPropagation();
        }, false);
 

function bodyClick(dom) {
        dom.addEventListener(touchStartEvent, function () {

            try {
                event.stopPropagation();
            }
            catch (err) {
            }

        }, false);
        dom.addEventListener(touchEndEvent, function () {
            var linkbtn = document.getElementById("linkbtn");
            if (linkbtn && linkbtn.length) {
                linkbtn.style.display = "none";
            }
            event.stopPropagation();
        }, false);
};
var bodyx = document.getElementById("hs");
bodyClick(bodyx);