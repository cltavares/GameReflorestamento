cc.Class({
    extends: cc.Component, 
    // use this for initialization
    onLoad: function () {
        cc.director.preloadScene('Reflorestamento');
        
        this.node.on('touchend', function(){
            cc.log("TESTE");
            window.score = 0;
            cc.director.loadScene('Reflorestamento');
            cc.director.resume();
        });

    },
});
