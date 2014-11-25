
function isShouJi() {
	var isiPad = navigator.userAgent.match(/(iPad|iPhone|iPod|Android|Windows Phone)/i) != null;
	if(isiPad){
	
	}else{
		//不是手机
		document.location.href = "http://game.2sky.cn/game/quickMark.html";
	}
}