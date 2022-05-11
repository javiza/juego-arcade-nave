var juego = new Phaser.Game(400, 540, Phaser.CANVA, 'bloque_juego');
juego.state.add('Iniciar', Iniciar);
juego.state.add('Terminado', Terminado);
juego.state.start('Iniciar');
