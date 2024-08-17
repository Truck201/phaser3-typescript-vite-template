// Definir la escena del menú de pausa
export default class PauseMenu extends Phaser.Scene {
  constructor() {
    super({ key: "PauseMenu" });
    this.lastKeyPressTime = 0;
  }

  create(data) {
    this.mainScene = data.mainScene;

    // Agregar texto al menú de pausa
    this.add.text(100, 100, "Juego Pausado", {
      fontSize: "32px",
      fill: "#fff",
    });

    // Agregar un botón para volver al menú principal
    const mainMenuButton = this.add
      .text(100, 200, "Volver al Menú Principal", {
        fontSize: "24px",
        fill: "#fff",
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.stop("PauseMenu");
        this.mainScene.scene.stop();
        this.scene.start("main-menu");
      });

    mainMenuButton.on("pointerover", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      mainMenuButton.setScale(1.07);
    });

    mainMenuButton.on("pointerout", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      mainMenuButton.setScale(1);
    });

    this.add.text(100, 320, "Reanude Game press Esc", {
      fontSize: "24px",
      fill: "#fff",
    });

    this.input.keyboard.on("keydown-ESC", () => {
      const currentTime = this.time.now;
      if (currentTime - this.lastKeyPressTime > 250) {
        this.lastKeyPressTime = currentTime;
        this.mainScene.scene.resume();
        this.scene.stop("PauseMenu");
        console.log("Reanude Game");
      }
    });
  }
}
