export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
    this.isPaused = false;
    this.lastKeyPressTime = 0;
  }

  create() {
    let width = this.scale.width;
    let height = this.scale.height;

    //Agregar los cursores
    this.cursor = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on("keydown-ESC", () => {
      const currentTime = this.time.now;
      console.log("pres scape");
      // Verificar si ha pasado suficiente tiempo desde la última pulsación
      if (currentTime - this.lastKeyPressTime > 250) {
        // 700 ms de delay
        this.lastKeyPressTime = currentTime;
        this.scene.pause("main");
        console.log("Pause Game");
        this.scene.launch("PauseMenu", { mainScene: this });
      }
    });

    this.box = this.add
      .text(20, 20, "Menu", {
        fontSize: "130px",
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: { x: 10, y: 5 },
        border: "60px solid #000000",
      })
      .setInteractive();
    this.box.setScale(0.32);
    this.box.on("pointerdown", () => this.toggleOptions());

    // Crear las opciones (inicialmente invisibles)
    this.options = [];
    const optionTexts = ["Opción 1", "Opción 2", "Opción 3"];
    for (let i = 0; i < optionTexts.length; i++) {
      let option = this.add
        .text(20, 60 + i * 50, optionTexts[i], {
          fontSize: "120px",
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: { x: 10, y: 5 },
          border: "50px solid #000000",
        })
        .setInteractive();
      option.visible = false;
      option.setScale(0.3);
      option.on("pointerdown", () => this.toggleOption(option));
      this.options.push(option);
    }
  }

  update() {}

  movimientoJugadorUno() {}

  movimientoJugadorDos() {}

  toggleOptions() {
    // Mostrar u ocultar las opciones
    this.options.forEach((option, index) => {
      if (option.visible) {
        this.tweens.add({
          targets: option,
          y: option.y - 20,
          alpha: 0,
          duration: 500,
          onComplete: () => option.setVisible(false),
        });
      } else {
        option.setVisible(true);
        this.tweens.add({
          targets: option,
          y: option.y + 20,
          alpha: 1,
          duration: 500,
        });
      }
    });
  }

  toggleOption(option) {
    // Activar o desactivar la opción
    option.setStyle({
      backgroundColor:
        option.style.backgroundColor === "#ffffff" ? "#00ff00" : "#ffffff",
    });
  }
}
