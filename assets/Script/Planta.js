
cc.Class({
    extends: cc.Component,

    onLoad: function() {
  
        this.node.on('touchend', function(){

            if(!cc.director.isPaused()){
                this.node.dispatchEvent(new cc.Event.EventCustom('planta_pega', true));
                this.node.removeFromParent();
                this.adicionarScore();
            }

        }, this);
    },

    adicionarScore: function() {
        score++;
    },
});
