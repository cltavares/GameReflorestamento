cc.Class({
    extends: cc.Component,
   
    // use this for initialization
    onLoad: function () {
        cc.director.preloadScene('Sobre');
        
        this.node.on('touchend', function(){
            cc.log("Ir_p_tela_sobre");
            cc.director.loadScene('Sobre');
           // cc.director.resume();
        });

    },
});