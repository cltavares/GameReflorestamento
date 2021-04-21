cc.Class({
    extends: cc.Component,
   
    // use this for initialization
    onLoad: function () {
        cc.director.preloadScene('Reflorestamento-2');
        
        this.node.on('touchend', function(){
            cc.log("TESTE-fase-2");
            window.score = 0;
            cc.director.loadScene('Reflorestamento-2');
           // cc.director.resume();
        });

    },
});
