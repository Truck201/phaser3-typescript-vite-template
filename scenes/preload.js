
export default class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }

    preload() {
        // Cargar Fonts
        this.load.bitmapFont('pixelFont', 'assets/font/font.png', 'assets/font/font.fnt');
        // Cajas del menu principal
        this.load.image('box', './public/assets/azul_hoja.png');

        this.load.image('game-image', './public/assets/gackground.png');
        //this.load.image('image-name', './public/assets/');

        // Escenario Game 
    }

    update() {
        console.log("start-pass")
        this.scene.start("main-menu")
    }

}