cc.Class({
    extends: cc.Component,
   
    // use this for initialization
    onLoad: function () {
        cc.director.preloadScene('Reflorestamento-3');
        
        this.node.on('touchend', function(){
            cc.log("TESTE-fase-3");
            window.score = 0;
            cc.director.loadScene('Reflorestamento-3');
           // cc.director.resume();
        });

    },
});
