var nave;
var balas;
var timer = 0;
var delay = 400;

var Iniciar = {
    preload: function(){
        //Cargar los elementos
        juego.load.image('nave', 'img/nave.png')
        juego.load.image('bala', 'img/bala.png')
        juego.load.image('malo', 'img/asteroide.png')
        juego.load.image('fondo', 'img/fondo.png')
    },
    create: function() {
        //mostrar en pantalla
        juego.add.tileSprite(0, 0, 400, 540, 'bg');
        //agregar el canvas a la nave
        nave = juego.add.sprite(40, juego.height / 2, 'nave');
        //punto de apoyo centrado
        nave.anchor.setTo(0.5);
        //agregar funciones de fisica de tipo Arcade
        juego.physics.startSystem(Phaser.Phisics.ARCADE);
        //activar fisica para la nave
        juego.physics.arcade.enable(nave, true);
        // limitar el giro de la nave 
        juego.body.allowRotation = false;
        //crear balas
        balas = juego.add.group();
        balas.enableBody = true;
        balas.setBodyType = Phaser.Phisics.ARCADE;
        balas.createMultiple(20, 'laser');
        balas.setAll('anchor.x', 0.5);
        balas.setAll('anchor.y', 1);
        balas.setAll('checkWorldBouds', true);
        balas.setAll('outOfBoundsKill', true);

    },

    update: function() {
        //animar juego
        fondoJuego.tilePosition.x -= 3;
        nave.rotation = 
        juego.physics.arcade.angleToPointer(nave);
        //disparar balas
        if(juego.imput.activePointer.isDown){
            this.disparar();
        }
    },
    //funcion disparar una sola bala
    disparar: function(){
        timer = juego.time.now + delay;
        var bala = balas.getFirstDead();
        if(juego.time.now > timer && balas.countDead() > 0) {
            bala.anchor.setTo(0.5);
            bala.reset(nave.x, nave.y);
            bala.rotation = 
            juego.physics.arcade.angleToPointer(bala);
            juego.physics.arcade.moveToPointer(bala, 300);
        }
    }
};