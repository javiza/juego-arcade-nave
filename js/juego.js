var nave;
var balas;
var timer = 0;
var delay = 400;
var aparecer;
var puntos;
var vidas;
var txtPuntos;
var txtVidas;

var Iniciar = {
    preload: function(){
        //Cargar los elementos
        juego.load.image('nave', 'img/nave.png')
        juego.load.image('bala', 'img/bala.png')
        juego.load.image('malo', 'img/asteroide.png')
        juego.load.image('fondo', "img/fondo.png")
    },
    create: function() {
        //mostrar en pantalla
        juego.add.tileSprite(0, 0, 400, 540, 'fondo');
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
        balas.createMultiple(20, 'bala');
        balas.setAll('anchor.x', 0.5);
        balas.setAll('anchor.y', 1);
        balas.setAll('checkWorldBouds', true);
        balas.setAll('outOfBoundsKill', true);
        //crear enemigos individuales
        malos = juego.add.group();
        malos.enableBody = true;
        malos.setBodyType = Phaser.Physics.ARCADE;
        malos.createMultiple(20, 'asteroide');
        malos.setAll('anchor.x', 0.5);
        malos.setAll('anchor.y', 1);
        malos.setAll('checkWorldBounds', true);
        malos.setAll('outOfBoundsKill', true);
        //ciclo de enemigos
        //loop(time,funcionloop)
        aparecer = juego.time.events.loop(1500, this.crearEnemigo, this);
        //logica puntajes y vidas 
        puntos = 0;
        juego.add.text(20, 20, "Puntos", { font: "14px Arial", fill: "#FFF"});
        txtPuntos = juego.add.text(80, 20, "0", { font: "14px Arial", fill: "#FFF"});
        //vidas
        vidas = 5;
        juego.add.text(310, 20, "Vidas:", { font: "14px Arial", fill: "#FFF"});
        txtVidas = juego.add.text(360, 20, "5", { font: "14px Arial", fill: "#FFF"});
    },

    update: function() {
        //animar juego
        fondoJuego.tilePosition.x -= 3;
        nave.rotation = juego.physics.arcade.angleToPointer(nave);
        //disparar balas
        if(juego.imput.activePointer.isDown){
            this.disparar();
        }
        //colision de rocas y balas
        juego.physics.arcade.overlap(balas, malos, this.colision, null, this);
        //colision que quita vidas
        malos.forEachAlive(function(m) {
            if(m.position.x > 10 && m.position.x <12){
                vidas -= 1;
                txtVidas.text = vidas;
            }
        });
        //logica game over
        if(vidas == 0){
            juego.state.start('TERMINADO');
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
    },
    //funcion para la aparicion de enemigos
    crearEnemigo: function(){
        var enem = malos.getFirstDead();
        var num = math.floor(Math.random() * 10 +1);
        enem.reset(400, num * 55);
        //enem.reset(num * 38, 0);
        enem.anchor.setTo(0.5);
        enem.body.velocity.x = -100;
        enem.checkWorldBounds = true;
        enem.outOfBoundsKill = true;

    },
    //funcion colision de balas y enemigos
    colision: function(bala, malo){
        bala.kill();
        malo.kill();
        puntos++;
        txtPuntos.text = puntos;
    }
};