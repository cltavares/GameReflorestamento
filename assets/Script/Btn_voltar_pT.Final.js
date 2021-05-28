cc.Class({
    extends: cc.Component,
   
    // use this for initialization
    onLoad: function () {
        cc.director.preloadScene('Final');
        
        this.node.on('touchend', function(){
            cc.log("Volta_p_tela_final");
            cc.director.loadScene('Final');
           // cc.director.resume();
        });

    },
});