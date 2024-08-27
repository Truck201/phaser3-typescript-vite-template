export default class Preload extends Phaser.Scene {
  constructor() {
    super('preload');
  }

  preload() {
    // Cargar Fonts
    this.load.bitmapFont(
      'pixelFont',
      'assets/font/font.png',
      'assets/font/font.fnt'
    );
    // Cajas del menu principal
    this.load.image('box', './public/assets/menu-art.png');
    this.load.image('button', './public/assets/menu-art.png');
    this.load.image('game-image', './public/assets/gackground.png');
    //this.load.image('image-name', './public/assets/');

    // Escenario Game

    // Battle Scene
    this.load.spritesheet('pororo-chico.v1', './public/assets/pororo-amarillo.png', {
      frameWidth: 17,
      frameHeight: 12,
    }); // w:w: 16 px  h: 12 px 1 pix separados

    this.load.spritesheet('pororo-chico.v2', './public/assets/pororo-azul.png', {
        frameWidth: 17,
        frameHeight: 12,
    });

    this.load.spritesheet('pororo-chico.v3', './public/assets/pororo-blanco.png', {
        frameWidth: 17,
        frameHeight: 12,
    });

    this.load.spritesheet('pororo-chico.v4', './public/assets/pororo-naranja.png', {
        frameWidth: 17,
        frameHeight: 12,
    });

    this.load.spritesheet('pororo-chico.v5', './public/assets/pororo-rojo.png', {
        frameWidth: 17,
        frameHeight: 12,
    });

    this.load.spritesheet('pororo-chico.v6', './public/assets/pororo-verde.png', {
        frameWidth: 17,
        frameHeight: 12,
    });

    this.load.spritesheet('pororo-chico.v7', './public/assets/pororo-violeta.png', {
        frameWidth: 17,
        frameHeight: 12,
    });

    this.load.spritesheet('pororo-grande.v1', './public/assets/pograndes.png', {
        frameWidth: 24,
        frameHeight: 19,
    }); // w: 23 px  h: 19 px  1 pix separados
    this.load.spritesheet('mimbo-pj1', './public/assets/mimbo.png', {
        frameWidth: 54,
        frameHeight: 50,
    }); // w: 54 px   h: 50 px
    this.load.spritesheet('jack-pj2', './public/assets/jack.png', {
        frameWidth: 54,
        frameHeight: 50,
    }); // w: 54 px    h: 50 px
  }

  update() {
    console.log('start-pass');
    this.scene.start('main-menu');
  }
}
