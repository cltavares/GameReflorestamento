cc.Class({
    extends: cc.Component,
    
    properties: {

        background2: {
            default: null,
            type: cc.Node
        },
        gameOverLayer2:{
            default: null,
            type: cc.Layout
        },

        btn_play2:{
            default: null,
            type: cc.Node
        },

        scoreLabel2:{
            default: null,
            type: cc.Label
        },

        lifeLabel2:{
            default: null,
            type: cc.Label
        },

     	pauseLabel2:{
            default: null,
            type: cc.Label
        },

        plantas2: {
            default: [],
            type: cc.Prefab
        },
        plantaLayer2:{
            default: null,
            type: cc.Layout
        },

        tempoMin2: 0,
        tempoMax2: 0,
        score2: 0,
        maxLife2: 0,
        qtdPlantaFase: 0,
        selecionadaFase: 0,
        isLaunch2: false
    },





    onLoad () {
        var plantaCount2 = 0;
        var delta2 = 0;
        window.score2 = window.score2 || 0;

        var self2 = this;
        //dá uma pausa de Int16Array s
        self2.scheduleOnce(function(){
            self2.initGame();
        }, 1);

        /*
        self.node.on('planta_pega', function(event) {
            cc.log('planta_pega GAME');
            plantaCount--;
        }, self);
        */

        this.scoreLabel2.string = score2.toString();        
        this.plantaLayer2.node.setContentSize(this.background2.width, this.background2.height);
        this.btn_play2.setPosition(1000,1000);
       
    },






    initGame: function(){
        this.life2 = this.maxLife2;
        this.lifeLabel2.string = this.life2.toString();
        
        //this.scoreLabel.string = score.toString();
        
        this.isLaunch2 = true;
    },



    onPause: function(){
        if (cc.director.isPaused()){
            cc.director.resume();
            this.pauseLabel2.node.active = false;
        }
        else{
            cc.director.pause();
            this.pauseLabel2.node.active = true;
        }
        
    },

    gerarPlanta: function(dt) {
        if (this.isLaunch2 === false){
            return;
        }
        
        if (this.plantaCount2 > 5){
            return;
        }
        
        this.delta2 += dt;
        //gera a planta 1 s
        if (this.delta2 < 1){ 
            return;
        }
        
        this.delta2 = 0;
        
        var plantaLayer2 = this.plantaLayer2.node;
        
        var winSize2 = plantaLayer2.getContentSize();


        //local planta cai eixo x
        var localAleatorioX2 = winSize2.width * Math.random();

        //local planta onde eh gerado
        var localAleatorioY2 = winSize2.height - 100;

        
        var totalPlanta2 = this.plantas2.length - 1;
        
        //var planta = cc.instantiate(this.plantas[0]);
        var planta2 = cc.instantiate(this.plantas2[Math.ceil(totalPlanta2 * Math.random())]);
        
        planta2.setPosition(localAleatorioX2, localAleatorioY2);


        
        //var tempoQueda = Math.random() * 6 + 2;
        var tempoQueda2 = Math.random() * this.tempoMax2 + this.tempoMin2;
        
        var self2 = this;
        
        var moveby2 = cc.moveBy(tempoQueda2, 0, -winSize2.height + this.tempoMin2-30);
        //var moveby = cc.moveBy(tempoQueda, 0, -winSize.height-30);
        
        var sequenciaPlanta2 = cc.sequence(
            moveby2, 
            cc.removeSelf(true), 
            cc.callFunc(function() {self2._plantaCount2--}, self2),
            cc.callFunc(function() {self2.gameOver();}, self2)
        );
        
        planta2.runAction(sequenciaPlanta2);
        
        plantaLayer2.addChild(planta2);
        
        this.plantaCount2++;
        
    },

    novaPlantaPosicao: function() {
        var winSize2 = this.plantaLayer2.node.getContentSize();
        
        //local planta cai eixo x
        var localAleatorioX2 = winSize2.width * Math.random();
        
        //local planta onde eh gerado
        var localAleatorioY2 = winSize2.height - 100;
        
        return (localAleatorioX2,localAleatorioY2);
    },


    exibirScore: function() {
        cc.log('scoreLabel novo2');
        this.scoreLabel2.string = score2.toString();

        //Segunda fase
        if (score2 === 4){
                      
            cc.director.loadScene('Transição_de_Fase-2p3');
        
        }

    },

     gameOver: function (){
        if (this.life2 === 0){
             this.isLaunch2 = false;
             this.gameOverLayer2.node.active = true;
             
             this.plantaLayer2.node.stopAllActions();
             this.plantaLayer2.node.removeAllChildren();
             
             cc.log('scoreLabel gameOver2');
             //window.score = 0;
             //this.exibirScore();             
             this.btn_play2.setPosition(265.96, 379.068);
        }else{
            this.life2--;
            this.lifeLabel2.string = this.life2.toString();
        }  
    },

    update (dt) {  
        cc.log('update');      
        this.gerarPlanta(dt);
        this.exibirScore();

    },


});
