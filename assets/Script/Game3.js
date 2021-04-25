cc.Class({
    extends: cc.Component,

    properties: {
        background3: {
            default: null,
            type: cc.Node
        },
        btn_play3:{
            default: null,
            type: cc.Node
        },
        gameOverLayer3:{
            default: null,
            type: cc.Layout
        },
        scoreLabel3:{
            default: null,
            type: cc.Label
        },
        lifeLabel3:{
            default: null,
            type: cc.Label
        },
        pauseLabel3:{
            default: null,
            type: cc.Label
        },
        plantas3: {
            default: [],
            type: cc.Prefab
        },
        plantaLayer3:{
            default: null,
            type: cc.Layout
        },
                
        tempoMin3: 0,
        tempoMax3: 0,
        score3: 0,
        maxLife3: 0,
        isLaunch3: false

    },

    onLoad () {
        var plantaCount3 = 0;
        var delta3 = 0;
        window.score3 = window.score3 || 0;

        var self3 = this;
        //dá uma pausa de Int16Array s
        self3.scheduleOnce(function(){
            self3.initGame();
        }, 1);

        /*
        self.node.on('planta_pega', function(event) {
            cc.log('planta_pega GAME');
            plantaCount--;
        }, self);
        */

        this.scoreLabel3.string = score3.toString();        
        this.plantaLayer3.node.setContentSize(this.background3.width, this.background3.height);
        this.btn_play3.setPosition(1000,1000);
        
    },

    initGame: function(){
        this.life3 = this.maxLife3;
        this.lifeLabel3.string = this.life3.toString();
        
        //this.scoreLabel.string = score.toString();
        
        this.isLaunch3 = true;
    },

    onPause: function(){
        if (cc.director.isPaused()){
            cc.director.resume();
            this.pauseLabel3.node.active = false;
        }
        else{
            cc.director.pause();
            this.pauseLabel3.node.active = true;
        }
        
    },

    gerarPlanta: function(dt) {
        if (this.isLaunch3 === false){
            return;
        }
        
        if (this.plantaCount3 > 5){
            return;
        }
        
        this.delta3 += dt;
        //gera a planta 1 s
        if (this.delta3 < 1){ 
            return;
        }
        
        this.delta3 = 0;
        
        var plantaLayer3 = this.plantaLayer3.node;
        
        var winSize3 = plantaLayer3.getContentSize();


        //local planta cai eixo x
        var localAleatorioX3 = winSize3.width * Math.random();

        //local planta onde eh gerado
        var localAleatorioY3 = winSize3.height - 100;

        
        var totalPlanta3 = this.plantas3.length - 1;
        
        //var planta = cc.instantiate(this.plantas[0]);
        var planta3 = cc.instantiate(this.plantas3[Math.ceil(totalPlanta3 * Math.random())]);
        
        planta3.setPosition(localAleatorioX3, localAleatorioY3);


        
        //var tempoQueda = Math.random() * 6 + 2;
        var tempoQueda3 = Math.random() * this.tempoMax3 + this.tempoMin3;
        
        var self3 = this;
        
        var moveby3 = cc.moveBy(tempoQueda3, 0, -winSize3.height + this.tempoMin3-30);
        //var moveby = cc.moveBy(tempoQueda, 0, -winSize.height-30);
        
        var sequenciaPlanta3 = cc.sequence(
            moveby3, 
            cc.removeSelf(true), 
            cc.callFunc(function() {self3._plantaCount3--}, self3),
            cc.callFunc(function() {self3.gameOver();}, self3)
        );
        
        planta3.runAction(sequenciaPlanta3);
        
        plantaLayer3.addChild(planta3);
        
        this.plantaCount3++;
        
    },

    novaPlantaPosicao: function() {
        var winSize3 = this.plantaLayer3.node.getContentSize();
        
        //local planta cai eixo x
        var localAleatorioX3 = winSize3.width * Math.random();
        
        //local planta onde eh gerado
        var localAleatorioY3 = winSize3.height - 100;
        
        return (localAleatorioX3,localAleatorioY3);
    },

    exibirScore: function() {
        cc.log('scoreLabel novo3');
        this.scoreLabel3.string = score3.toString();

        //primeira fase
        if (score3 === 6){
          

            
            cc.director.loadScene('Final');
        
           
        }

    },

    gameOver: function (){
        if (this.life3 === 0){
             this.isLaunch3 = false;
             this.gameOverLayer3.node.active = true;
             
             this.plantaLayer3.node.stopAllActions();
             this.plantaLayer3.node.removeAllChildren();
             
             cc.log('scoreLabel gameOver3');
             //window.score = 0;
             //this.exibirScore();             
             this.btn_play3.setPosition(265.96, 379.068);
        }else{
            this.life3--;
            this.lifeLabel3.string = this.life3.toString();
        }  
    },


    update (dt) {  
        cc.log('update');      
        this.gerarPlanta(dt);
        this.exibirScore();

    },
});