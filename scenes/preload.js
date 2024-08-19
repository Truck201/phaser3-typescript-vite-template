
export default class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }

    preload() {
        // Cajas del menu principal
        this.load.image('box', './public/assets/menu-art.png');
        this.load.image('button', './public/assets/menu-art.png');

        // Escenario Game
        // Marcos Personajes
        this.load.image('marco1', '../public/assets/marco1.png');
        this.load.image('marco2', './public/assets/marco2.png');
    }

    update() {
        console.log("start-pass")
        this.scene.start("main-menu")
    }

}