export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
    this.isPaused = false;
    this.lastKeyPressTime = 0;
  }

  init() {}

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
        this.scene.pause();
        console.log("Pause Game");
        this.scene.launch("PauseMenu", { mainScene: this });
      }
    });

    // Añadir Cuadro de Personaje Uno
    // Dimensiones
    let rectWidht = this.game.config.width / 7.8;
    let rectHeight = this.game.config.height / 4.75;

    // Posición
    let rect1X = rectWidht / 1.75; // Posición ancho
    let rect1Y = (this.game.config.height * 1) / 7.5; // Posicion alto
    // Recuadro 1
    let recuadro1 = this.add.rectangle(
      rect1X,
      rect1Y,
      rectWidht,
      rectHeight,
      0xbbbbbb
    );

    // Añadir Cuadro de Personaje Uno
    // Posición
    let rect2X = rectWidht * 7.23; // Posición ancho
    let rect2Y = (this.game.config.height * 1) / 7.5; // Posicion alto
    // Recuadro 2
    let recuadro2 = this.add.rectangle(
      rect2X,
      rect2Y,
      rectWidht,
      rectHeight,
      0xbbbbbb
    );

    // Añadimos el televisor
    // Posición
    let teleX = this.game.config.width / 2
    let teleY = this.game.config.height / 2 - 80
    // Dimensiones
    let teleWidth = teleX 
    let teleHeight = this.game.config.height / 2.3
    // Crear Televisor
    let television = this.add.rectangle(
      teleX,
      teleY,
      teleWidth,
      teleHeight,
      0xbbbbbb
    )

    // Añadimos sillones, butacas !!
    // Dimensiones
    let armchairWidth = this.game.config.width / 11
    let armchairHeight = this.game.config.height / 7
    // Posición X
    let armX = teleX / 2
    // Crear sillones
    let n = 0
    for (let i = 0; i < 10; i++ ){ 
      console.log("bucle")
      if (i < 5) {
        let armchair = this.add.rectangle(
          armX + (i*(armchairWidth + 40)), // Ajustar por cada rectangulo
          teleY * 1.88,
          armchairWidth,
          armchairHeight,
          0xbbbbbb
        )
      } else {
        let armchair = this.add.rectangle(
          armX + (n*(armchairWidth + 40)), // Ajustar por cada rectangulo
          teleY * 2.35,
          armchairWidth,
          armchairHeight,
          0xbbbbbb
        )
        n = n + 1;
      }
    }

    // Menu Button
    this.box = this.add
      .text(rectWidht * 1.2, 20, "Menu", {
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
        .text(rectWidht * 1.2, 60 + i * 45, optionTexts[i], {
          fontSize: "100px",
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: { x: 10, y: 5 },
          border: "80px solid #000000",
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
