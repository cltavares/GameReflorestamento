
cc.Class({
    extends: cc.Component,

    onLoad: function() {
  
        this.node.on('touchend', function(){
            this.node.dispatchEvent(new cc.Event.EventCustom('planta_pega', true));
            this.node.removeFromParent();
            this.adicionarScore();
        }, this);
    },

    adicionarScore: function() {
        score3++;
    },

    /*
    onPause: function(){
        if (cc.director.isPaused()){
            cc.director.resume();
            this.pauseLabel.node.active = false;
        }
        else{
            cc.director.pause();
            this.pauseLabel.node.active = true;
        }
        
    },
    */

});
