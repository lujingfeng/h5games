var SG_Hooks = {
    debug : false,
    
	getLanguage : function( supportedLanguages ){
		return SG.initLangs(supportedLanguages);
	},
	
	start : function(){
        SG_Hooks.debug && console.log('game started');
        SG.trigger({type:'start'});
        _hmt.push(["_trackEvent", "button", "gameStart"]);
	},
	
	levelUp : function( level, score, callback){
        SG_Hooks.debug && console.log('level up:' + level + '/' + score);
		SG.trigger({type:'levelUp', level:level, lastLevelScore:score}, callback);
        LBShare.updateData({          //修改分享文案
            desc: "我玩Candy Rain得了"+score+"分，过了"+(level+1)+"关，你也来试试吧！"
        });
        LBShare.statScore("分数"+score+"分，过了"+(level+1)+"关") ;
        LBShare.showAd({pos: 'top' });
        LBShare.showAd({pos: 'footer' });
        LBShare.showAd({pos: 'banner', bannerShowOps: [2, 4] });
	},
	
	gameOver : function( level, score, callback){
        SG_Hooks.debug && console.log('game over:' + level + '/' + score);
		SG.trigger({type:'gameOver', score:score}, callback);
        LBShare.updateData({          //修改分享文案
            desc: "我玩Candy Rain得了"+score+"分，过了"+(level+1)+"关，你也来试试吧！"
        });
        LBShare.statScore("分数"+score+"分，过了"+(level+1)+"关") ;

        LBShare.showAd({pos: 'top' });
        LBShare.showAd({pos: 'footer' });
        LBShare.showAd({pos: 'banner', bannerShowOps: [2, 4] });

    },
	
    gameCompleted : function( score, callback ){
        SG_Hooks.debug && console.log('game completed:' + score);
        SG.trigger({type:'gameCompleted', score:score}, callback);
    },
    
    gamePause : function( state, callback ){ // state: on|off
        SG_Hooks.debug && console.log('game pause:' + state);
        SG.trigger({type:'gamePause', state:state}, callback);
    },
    
    gameRestart : function( callback ){
        SG_Hooks.debug && console.log('game restart:');
        SG.trigger({type:'gameRestart'}, callback);

    },
    
    selectMainMenu : function(callback){
        SG_Hooks.debug && console.log('selectMainMenu:');
        SG.trigger({type:'selectMainMenu'}, callback);
    },
    
    selectLevel : function( level, callback ){
        SG_Hooks.debug && console.log('selectLevel:'+level);
        SG.trigger({type:'selectLevel', level:level}, callback);
    },
    
    setSound : function( state, callback ){ // state: on|off
        SG_Hooks.debug && console.log('setSound:'+state);
        SG.trigger({type:'gameCompleted', state:state}, callback);
    },
    
    setOrientationHandler : function( f ){
		SG.setOrientationHandler( f );
	},
	
	setResizeHandler: function ( f ){
		SG.setResizeHandler(f);
	}
};