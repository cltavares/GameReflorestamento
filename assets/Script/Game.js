cc.Class({
    extends: cc.Component,

    properties: {
        background: {
            default: null,
            type: cc.Node
        },
        btn_play:{
            default: null,
            type: cc.Node
        },
        gameOverLayer:{
            default: null,
            type: cc.Layout
        },
        scoreLabel:{
            default: null,
            type: cc.Label
        },
        lifeLabel:{
            default: null,
            type: cc.Label
        },
        pauseLabel:{
            default: null,
            type: cc.Label
        },
        plantas: {
            default: [],
            type: cc.Prefab
        },
        plantaLayer:{
            default: null,
            type: cc.Layout
        }, 
        gameOverAudio:{
            default: null,
            type: cc.AudioClip
        },               
        tempoMin: 0,
        tempoMax: 0,
        score: 0,
        maxLife: 0,
        qtdPlantaFase: 0,
        selecionadaFase: 0,
        isLaunch: false

    },

    onLoad () {
        var plantaCount = 0;
        var delta = 0;
        window.score = window.score || 0;

        var self = this;
        //dá uma pausa de Int16Array s
        self.scheduleOnce(function(){
            self.initGame();
        }, 1);

        this.scoreLabel.string = score.toString();        
        this.plantaLayer.node.setContentSize(this.background.width, this.background.height);
        this.btn_play.setPosition(1000,1000);
        
    },

    initGame: function(){
        this.life = this.maxLife;
        this.lifeLabel.string = this.life.toString();
        
        this.isLaunch = true;
    },

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

    gerarPlanta: function(dt) {
        if (this.isLaunch === false){
            return;
        }
        /*
        if (this.plantaCount > 5){
            return;
        }
        */
        
        this.delta += dt;
        //gera a planta 1 s
        if (this.delta < 1){ 
            return;
        }
        
        this.delta = 0;
        
        var plantaLayer = this.plantaLayer.node;
        
        var winSize = plantaLayer.getContentSize();


        //local planta cai eixo x
        var localAleatorioX = winSize.width * Math.random();

        //local planta onde eh gerado
        var localAleatorioY = winSize.height - 100;

        
        var totalPlanta = this.plantas.length - 1;
        
        
        var planta = cc.instantiate(this.plantas[Math.ceil(totalPlanta * Math.random())]);
        
          
        planta.setPosition(localAleatorioX, localAleatorioY);


        
        //var tempoQueda = Math.random() * 6 + 2;
        var tempoQueda = Math.random() * this.tempoMax + this.tempoMin;
        
        var self = this;
        
        var moveby = cc.moveBy(tempoQueda, 0, -winSize.height + this.tempoMin-30);
        //var moveby = cc.moveBy(tempoQueda, 0, -winSize.height-30);
        
        var sequenciaPlanta = cc.sequence(
            moveby, 
            cc.removeSelf(true), 
            cc.callFunc(function() {self._plantaCount--}, self),
            cc.callFunc(function() {self.gameOver();}, self)
        );
        
        planta.runAction(sequenciaPlanta);
        
        plantaLayer.addChild(planta);
        
        this.plantaCount++;
        
    },

    novaPlantaPosicao: function() {
        var winSize = this.plantaLayer.node.getContentSize();
        
        //local planta cai eixo x
        var localAleatorioX = winSize.width * Math.random();
        
        //local planta onde eh gerado
        var localAleatorioY = winSize.height - 100;
        
        return (localAleatorioX,localAleatorioY);
    },

    exibirScore: function() {
         
        this.scoreLabel.string = score.toString();

        //transicao de fases
        if (this.selecionadaFase == 1 && score === this.qtdPlantaFase){

            cc.log('selecionadaFase1');
            cc.log(this.selecionadaFase);
    
            cc.log('qtdPlantaFase1');
            cc.log(this.qtdPlantaFase);

            
            cc.director.loadScene('Transição_de_Fase-1p2');
        }else if (this.selecionadaFase == 2 && score === this.qtdPlantaFase){

              cc.log('selecionadaFase2');
              cc.log(this.selecionadaFase);
      
              cc.log('qtdPlantaFase2');
              cc.log(this.qtdPlantaFase);
  
              
              cc.director.loadScene('Transição_de_Fase-2p3');
          }else if (this.selecionadaFase == 3 && score === this.qtdPlantaFase){

              cc.log('selecionadaFasefinal');
              cc.log(this.selecionadaFase);
      
              cc.log('qtdPlantaFasefinal');
              cc.log(this.qtdPlantaFase);
  
              
              cc.director.loadScene('Final');
          }
    },

    gameOver: function (){
        if (this.life === 0){
             this.isLaunch = false;
             this.gameOverLayer.node.active = true;
             
             this.plantaLayer.node.stopAllActions();
             this.plantaLayer.node.removeAllChildren();             
           
             this.btn_play.setPosition(265.685, 384.284);
             cc.audioEngine.playEffect(this.gameOverAudio, false);
        }else{
            this.life--;
            this.lifeLabel.string = this.life.toString();
        }  
    },


    update (dt) {  
        this.gerarPlanta(dt);
        this.exibirScore();
    },
});
