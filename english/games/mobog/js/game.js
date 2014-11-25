$(function(){
   var canvas = document.getElementById("game");
   
   var obstacles = document.getElementById("obstacles");

   var RESOURCE = {
      "bird": "bird.png",
      "cloud": "cloud.png",
      "face": "face.png",
      "plane": "plane.png",
      
      "astronauts": "astronauts.png",
      "flying" : "flying.png",
      "flyplane" : "flyplane.png",
      "hot-air-balloon": "hot-air-balloon.png",
      "star": "star.png",
      "sun": "sun.png",
      //obs
      "12": "more/12.png",
      "13": "more/13.png",
      "14": "more/14.png",
      "15": "more/15.png",
      "16": "more/16.png",
      "17": "more/17.png",
      "18": "more/18.png",
      "19": "more/19.png",
      "20": "more/20.png",
      "21": "more/21.png",
      "22": "more/22.png",
      "23": "more/23.png",
      "24": "more/24.png",
      "25": "more/25.png",
      "26": "more/26.png",
      "27": "more/27.png",
      "28": "more/28.png",
      "29": "more/29.png",
      "30": "more/30.png",
      "31": "more/31.png",
      "32": "more/32.png",
      "33": "more/33.png",
      "34": "more/34.png",
      "logo":"more/logo.png",
      
      //non-obs
      "sky": "sky.jpg",
      "defaultBg" : "default.jpg",
      "genie" : "genie.png",
      "space": "space.jpg",
      "play" : "button.jpg"
   };
   
   
   var randomList = ["astronauts", "flying", "flyplane", "logo",
                     "hot-air-balloon", "star", "sun",
                     "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",
                     "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34"];

   var loadingResource = function(mapList, complete){
       var list = Object.getOwnPropertyNames(mapList);
       var len = list.length;
       
       var loaded = 0;
       
       list.forEach(function(item){
           var image = new Image();
           image.src = "images/" + mapList[item];
           image.onload = function(){
               loaded++;
               mapList[item] = image;
               if(loaded == len){
                   complete();
               }
           }
           image.onerror = function(){
               loaded++;
           }
       });
   };
   
   var windowToCanvas = function (canvas, x, y) {
	    var bbox = canvas.getBoundingClientRect();
	    return { 
		    x: x - bbox.left * (canvas.width  / bbox.width),
			y: y - bbox.top  * (canvas.height / bbox.height)
		};
    };
    
    var initGameCanvasSize = function(){
       var width = window.innerWidth > 420 ? 480 : window.innerWidth;
       var height = window.innerHeight > 720 ? 720 : window.innerHeight;
       
       obstacles.width = canvas.width = width;
       obstacles.height = canvas.height = height;
       
       $("#container").css({
           width: width,
           height: height,
           left: "50%",
           marginLeft: -width/2
       });
    };
    
    
    var Game = (function(){
        var context = canvas.getContext("2d");
        var obContext = obstacles.getContext("2d");
        
        var bgInterval = 0;
        var obsInterval = 0;
        var bgStartY = 0 ;
        
        var startTime = 0;
        
        var obsManager = {
            list: [],
            
            objsGroup: [],
            
            reset: function(){
                this.list.length = 0;
                this.renderSky = false;
            },
            
            push: function(o){
                this.list.push(o);
            },
            
            initSky: function(){

                var olist = ["bird", "cloud", "face", "plane"];
                var ix1 = Math.min(Math.round( Math.random() * olist.length ), olist.length - 1);
                var obs1 = new Obs(RESOURCE[olist[ix1]]);
                
                obsManager.push(obs1);
                obs1.render();
                
                
                
                olist.splice(ix1, 1);
                
                var ix2 = Math.min(Math.round(Math.random() * olist.length), olist.length - 1);
                var obs2 = new Obs(RESOURCE[olist[ix2]]);
                obsManager.push(obs2);
                
                obs2.y = obs1.y  - 200;
                
                obs2.render();
                
                olist.splice(ix2, 1);
                
                
                var obs3 = new Obs(RESOURCE[olist[0]]);
                obsManager.push(obs3);
                
                obs3.y = obs2.y  - 220;
                obs3.render();
                
                var obs4 = new Obs(RESOURCE[olist[1]]);
                obsManager.push(obs4);
                obs4.y = obs3.y  - 200;
                obs4.render();
                
            },
            
            render2: function(){
                if(!this.renderSky){
                    this.renderSky = true;
                    this.initSky();
                }
                
                obContext.clearRect(0, 0, canvas.width, canvas.height);
                
                for(var i=0; i < this.list.length; i++){
                    var item = this.list[i];
                    
                    if(item.y > canvas.height){
                        this.list.splice(i, 1);
                        i--;
                    }
                    
                    item.render();
                }
                
                if(this.list[this.list.length - 1].y > 150){
                    var t = Date.now() - startTime;
                    if(t > 4000 && t < 6000){
                        var imgname = "logo";
                    }else{
                        var raninx = Math.min(Math.round( Math.random() * randomList.length ), randomList.length - 1);
                        var imgname = randomList[raninx];
                    }
                    
                    
                    var x = Math.min(Math.random() * canvas.width, canvas.width - RESOURCE[imgname].width);
                    var y = RESOURCE[imgname].height + Math.random() * 250
                    
                    var obs = new Obs(RESOURCE[imgname], {
                        x: x,
                        y: -y
                    });
                    
                    if(y > 220){
                        var newIndex = Math.min(Math.round( Math.random() * randomList.length ), randomList.length - 1);
                        var newname = randomList[newIndex];
                        
                        y = y + Math.random() * 40;
                        
                        var newobs = new Obs(RESOURCE[newname], {
                            x: x,
                            y: -y
                        });
                        
                        if(obs.width + newobs.width < canvas.width - 160){
                             var r = Math.random() * 40;
                             
                             var newx = x - newobs.width < 0 ? x + obs.width + r: x - newobs.width - r;
                             newobs.x = newx;
                             
                             var leftO = newobs.x > obs.x ? obs : newobs;
                             var rightO = newobs.x > obs.x ? newobs : obs;
                             
                             //genie必须能过去
                             if(leftO.x > 100 || rightO.x - leftO.x - leftO.width > 100 || canvas.width - rightO.x - rightO.width > 100){
                                 this.list.push(newobs);
                             }
                        }
                    }
                    
                    this.list.push(obs);
                }
            },
            
            render: function(){
                this.render2();
            }
        };
        
        var Obs = function(img, opts){
            var x = Math.random() * obstacles.width;
            try{
               x = x >= obstacles.width - img.width ? obstacles.width - img.width : x;
            }catch(e){
               debugger;
            }
            
            this.x = x;
            this.y = 0 - img.height;
            
            if(opts){
                this.x = opts.x;
                this.y = opts.y;
            }
            
            this.width = img.width/2;
            this.height = img.height/2;
        
            
            this.render = function(){
                var now = Date.now();
                
                var timestamp = now - startTime;
                
                if(timestamp < 4000){
                    this.y += 5;
                }else if(timestamp < 8000){
                    this.y += 6;
                }else if(timestamp < 15000){
                    this.y += 7;
                }else if(timestamp < 25000){
                    this.y += 8;
                }else if(timestamp < 35000){
                    this.y += 9;
                }else if(timestamp < 45000){
                    this.y += 10;
                }else if(timestamp < 55000){
                    this.y += 12;
                }else{
                    this.y += 20;
                }
                
                this.x = parseInt(this.x);
                this.y = parseInt(this.y);
                
                obContext.drawImage(img, 0, 0, img.width, img.height, this.x, this.y, this.width, this.height);
            }
        };
        
        
        return {
        
            scrollBg: function(){
               var _this = this;
               var img = RESOURCE["sky"];
               var topImg = RESOURCE["space"];
               
               var width = canvas.width;
               var height = canvas.height;
               
               var imgWidth = width;
               var imgHeight = img.height * width /img.width;
               
               bgStartY = parseInt(imgHeight > canvas.height ? canvas.height - imgHeight : 0);
               var newStart = 0;
               
               bgInterval = setInterval(function(){
                   bgStartY += 1;
                   context.clearRect(0, 0, canvas.width, canvas.height);
                   
                   var topImgWidth = canvas.width;
                   var topImgHeight = parseInt(topImg.height * width /topImg.width);
                   
                   if(bgStartY <= canvas.height){
                       context.drawImage(img, 0, 0, img.width, img.height, 0, bgStartY, imgWidth, imgHeight);
                       var topImgY = bgStartY - topImgHeight ;
                       context.drawImage(topImg, 0, 0, topImg.width, topImg.height, 0, topImgY, topImgWidth, topImgHeight);
                   }else{
                       newStart++;
                       var topImgY = newStart - topImgHeight ;
                       
                       context.drawImage(topImg, 0, 0, topImg.width, topImg.height, 0, newStart, topImgWidth, topImgHeight);
                       context.drawImage(topImg, 0, 0, topImg.width, topImg.height, 0, topImgY, topImgWidth, topImgHeight);
                       
                       if(newStart == canvas.height){
                           newStart = 0;
                       }
                   }
               }, 25);
            },
            
            launchObstacles: function(){
                var _this = this;
                var $distance = $("#distance");
                
                obsInterval = setInterval(function(){
                    obsManager.render();
                    
                    for(var i=0; i < obsManager.list.length; i++){
                        var item = obsManager.list[i];
                        
                        if(_this.checkItem( item )){
                           _this.clear();
                           return;
                        }
                    }
                    for(var j=0; j < obsManager.objsGroup.length; j++){
                        var item = obsManager.objsGroup[j];
                        if(_this.checkItem( item )){
                           _this.clear();
                           return;
                        }
                    }
                    
                    var t = Date.now() - startTime;
                    var m = Math.round(t / 1000 * 100);
                    $distance.html(m + ' M');
                }, 20);
            },
            
            
            checkItem: function(item){
                var _this = this;
                var p1 = _this.checkHit(_this.gX + 10, _this.gY + 10, item);
                var p2 = _this.checkHit(_this.gX + 42, _this.gY, item);
                var p3 = _this.checkHit(_this.gX + 74, _this.gY + 10, item);
                
                var p4 = _this.checkHit(_this.gX + 10, _this.gY + 63, item);
                var p5 = _this.checkHit(_this.gX + 42, _this.gY + 63, item);
                var p6 = _this.checkHit(_this.gX + 74, _this.gY + 63, item);
                
                var p7 = _this.checkHit(_this.gX + 10, _this.gY + 117, item);
                var p8 = _this.checkHit(_this.gX + 42, _this.gY + 117, item);
                var p9 = _this.checkHit(_this.gX + 74, _this.gY + 117, item);
                
                
                if(p1 || p2 || p3 || p4 || p5 || p6 || p7 || p8 || p9){
                   return true;
                }
                return false;
            },
            
            checkHit: function(x, y, item){
               if(x > item.x && x < (item.x + item.width) && y > item.y && y < (item.y + item.height)){
                  console.log(x, y, item.x, item.y, item.width, item.height);
                   return true;
               }
               return false;
            },
            
            clear: function(){
                clearInterval(bgInterval);
                clearInterval(obsInterval);
                
                context.clearRect(0, 0, canvas.width, canvas.height);
                obContext.clearRect(0, 0, obstacles.width, obstacles.height);
                
                this.initBg();
                
                $("#genie").hide();
                
                var t = Date.now() - startTime;
                var m = Math.round(t / 1000 * 100);
                
                $("#high").html( Math.round(t / 1000 * 100));
                if(m > 5000){
                   $("#user").html( "90%");
                }else if(m > 4000){
                   $("#user").html( "80%");
                }else if(m > 3000){
                   $("#user").html( "50%");
                }else if(m > 2000){
                   $("#user").html( "20%");
                }else if(m > 1000){
                   $("#user").html( "10%");
                }else{
                   $("#user").html( "5%");
                }
                $("#distance").hide();
                $("#result").show();
            },
            
            start: function(){
                $("#distance").show();
                startTime = Date.now();
                $("#genie").show();
                this.initGenie();
                this.scrollBg();
                
                this.launchObstacles();
            },
            
            cont: function(){
                bgStartY = 0 ;
                this.setDefaultGenie();
                startTime = Date.now();
                $("#genie").show();
                
                obsManager.reset();
                
                this.scrollBg();
                
                this.launchObstacles();
                $("#distance").show();
                $("#result").hide();
            },
            
            setDefaultGenie: function(){
                var $genie = $("#genie");
                var gx = canvas.width/2 - $genie.width()/2;
                var gy = canvas.height - $genie.height() - 20;
                
                this.gX = gx;
                this.gY = gy;
                
                $genie.css({
                    top: gy,
                    left: gx
                });
            },
            
            initGenie: function(){
                var $genie = $("#genie");
                var _this = this;
                
                this.setDefaultGenie();
                
                $("#continue").on("click", function(){
                    _this.cont();
                });
                $(".share-btn.fb").on("click", function(){
                    _this.share();
                });
                $(".share-btn.tw").on("click", function(){
                    _this.shareTwitter();
                });
                
                if("ontouchstart" in window){
                    this.bindGenie();
                }else{
                    this.PCBindGenie();
                }
            },
            
            PCBindGenie: function(){
                var target = $("#genie");
                var _this = this;
                
                
                target.on("mousedown", function(ev){
                    ev.preventDefault();
                    var sx = ev.pageX;
                    var sy = ev.pageY;
                    
                    var sgx =_this.gX;
                    var sgy =_this.gY;
                    
                    $(document).on("mousemove", function(ev){
                        ev.preventDefault();
                        var xx = sgx + ev.pageX - sx;
                        var yy = sgy + ev.pageY - sy;
                        
                        if(xx > -10 && xx <= canvas.width - 72){
                            _this.gX = xx;
                            setTimeout(function(){
                                target[0].style.left = _this.gX + "px";
                            });
                        }
                        
                        if(yy > 0 && yy <= canvas.height - 63 ){
                           _this.gY = yy;
                           setTimeout(function(){
                               target[0].style.top = _this.gY + "px";
                           }, 10);
                           
                        }
                    });
                    
                    $(document).on("mouseup", function(ev){
                        ev.preventDefault();
                        
                        var xx = sgx + ev.pageX - sx;
                        var yy = sgy + ev.pageY - sy;
                        
                        if(xx > -10 && xx <= canvas.width - 72){
                            _this.gX = xx;
                        }
                        
                        if(yy > 0 && yy <= canvas.height - 63 ){
                           _this.gY = yy;
                        }
                        
                        $(document).off("mousemove");
                        $(document).off("mouseup");
                    });
                });
            },
            
            bindGenie: function(){
                var target = document.getElementById("genie");
                var _this = this;
                
                var prex = 0;
                var prey = 0;
                
                touch.on('#genie', 'touchstart', function(ev){
                    ev.preventDefault();
                    prex = 0;
                    prey = 0;
                });
                
                touch.on('#genie', 'drag', function(ev){
                    var revx = ev.x - prex;
                    var revy = ev.y - prey;
                    
                    var gx = _this.gX + revx;
                    var gy = _this.gY + revy;
                    
                    if(gx > -10 && gx <= canvas.width - 72){
                        prex = ev.x;
                       
                        _this.gX = gx;
                        setTimeout(function(){
                           target.style.left = _this.gX + "px";
                        }, 10);
                        
                    }
                    
                    if(gy > 0 && gy <= canvas.height - 63 ){
                       prey = ev.y;
                       _this.gY = gy;
                       setTimeout(function(){
                           target.style.top = _this.gY + "px";
                       }, 10);
                    }
                    
                    //this.style.webkitTransform = "translate3d(" + offx + "px," + offy + "px,0)";
                });

                touch.on('#genie', 'dragend', function(ev){
                    var revx = ev.x - prex;
                    var revy = ev.y - prey;
                    
                    var gx = _this.gX + revx;
                    var gy = _this.gY + revy;
                    
                    if(gx > -10 && gx <= canvas.width - 72){
                        prex = ev.x;
                        _this.gX = _this.gX + revx;
                    }
                    
                    if(gy > 0 && gy <= canvas.height - 63 ){
                        prey = ev.y;
                       _this.gY = _this.gY + revy;
                    }
                });
            },
            
            initBg: function(){
               var _this = this;
               var img = RESOURCE["defaultBg"];
               
               var width = canvas.width;
               var height = canvas.height;
               
               var imgWidth = width;
               var imgHeight = img.height * width /img.width;
               
               var initStarty = parseInt(imgHeight > canvas.height ? canvas.height - imgHeight : 0);
               
               context.clearRect(0, 0, canvas.width, canvas.height);
               
               context.drawImage(img, 0, 0, img.width, img.height, 0, initStarty, imgWidth, imgHeight);
               
            },
            share: function(){
                var shareURL = encodeURIComponent(location.href);
                
                location.href= "https://www.facebook.com/dialog/share?app_id=274758712646553&display=popup&href=" + shareURL + "&redirect_uri=" + shareURL;
            },
            shareTwitter: function(){
                var shareurl = encodeURIComponent(location.href);
                var text = "Mysterious Genie2.0 Adventure！Dare you challenge me?";
                location.href = 'https://twitter.com/intent/tweet?text='+ text + ' ' + shareurl;
            }
        }
    })();
   initGameCanvasSize();
   loadingResource(RESOURCE, function(){
       $("#loading").hide();
       
       touch.on("#start-pannel .start", "click", function(){
           $("#start-pannel").hide();
           Game.start();
       });
       Game.initBg();
   });
   
   var download = function(){
       if("ontouchstart" in window){
            location.href = "http://product.mobogenie.com/android/clientDownload.htm?media=1028";
        }else{
            location.href = "http://product.mobogenie.com/pc/clientDownload.htm?media=10002";
        }
       
   };
   touch.on(".init-panel", "tap", download);
   touch.on("#more", "tap", download);
});