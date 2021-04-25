cc.Class({
    extends: cc.Component,

    onLoad: function() {
  
        this.node.on('touchend', function(){
            cc.game.end();
        }, this);
    }
});