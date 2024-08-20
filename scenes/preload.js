
export default class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }

    preload() {
        // Cajas del menu principal
        this.load.image('box', './public/assets/menu-art.png');
        this.load.image('button', './public/assets/menu-art.png');

        // Escenario Game
        
        
    }

    update() {
        console.log("start-pass")
        this.scene.start("main-menu")
    }

}