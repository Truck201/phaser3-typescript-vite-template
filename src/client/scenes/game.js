export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
    this.isPaused = false;
    this.lastKeyPressTime = 0;
  }

  init() {}

  create() {
    let barra = true;
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

    this.input.keyboard.on("keydown-Q", () => {

      // Atacar
      if (barra) {
        this.scene.launch("battle-scene", {});
        barra = false;
      } else {
        this.scene.stop("battle-scene", {});
        barra = true;
      }
    });

    const graphics = this.add.graphics();
    // Añadir Cuadro de Personaje Uno
    // Dimensiones
    let rectWidht = width / 7.8;
    let rectHeight = height / 4.75;

    // Posición
    let rect1X = rectWidht / 2; // Posición ancho
    let rect1Y = (height * 1) / 10; // Posicion alto
    // Recuadro 1
    let recuadro1 = this.add.rectangle(
      rect1X,
      rect1Y,
      rectWidht,
      rectHeight,
      0xbbbbbb // Blanco - Plateado
    );

    // Añadir Cuadro de Personaje Uno
    // Posición
    let rect2X = rectWidht / 0.136; // Posición ancho
    let rect2Y = (height * 1) / 10; // Posicion alto
    // Recuadro 2
    let recuadro2 = this.add.rectangle(
      rect2X,
      rect2Y,
      rectWidht,
      rectHeight,
      0xbbbbbb // Blanco - Plateado
    );

    // Añadimos el televisor
    // Dimensiones
    let teleWidth = width / 1.7;
    let teleHeight = height / 2.3;
    // Posición
    let teleX = width / 2;
    let teleY = height / 2 - 60;
    // Crear Televisor
    this.add.rectangle(
      teleX,
      teleY,
      teleWidth,
      teleHeight,
      0xbbbbbb // Blanco - Plateado
    );

    // Añadimos sillones, butacas !! En los Laterales
    // Dimensiones
    let armchairWidth = width / 11;
    let armchairHeight = height / 7.5;
    // Posición X
    let armX = width / 5.5
    // Crear sillones
    let n = 0;
    for (let i = 0; i < 14; i++) {
      console.log("bucle");
      if (i < 7) {
        let armchair = this.add.rectangle(
          armX + i * (armchairWidth + 20), // Ajustar por cada rectangulo
          teleY * 1.77,
          armchairWidth,
          armchairHeight,
          0xbbbbbb // Blanco - Plateado
        );
      } else {
        let armchair = this.add.rectangle(
          armX + n * (armchairWidth + 20), // Ajustar por cada rectangulo
          teleY * 2.18,
          armchairWidth,
          armchairHeight,
          0xbbbbbb // Blanco - Plateado
        );
        n = n + 1;
      }
    }

    // Texto de los personajes
    this.personaje1 = this.add.text(0, height / 4.88, "Jugador 1", {
      fontSize: "16px",
      fontFamily: "Arial Black, Gadget, sans-serif",
      fill: "#4b5bab", // AZUL
      fontWeight: "bold",
      padding: { x: 6, y: 3 },
      backgroundColor: "#ffffff",
      border: "60px solid #000000",
    });

    this.personaje2 = this.add.text(width /1.09 , height / 4.88, "Jugador 2", {
      fontSize: "18px",
      fontFamily: "Arial Black, Gadget, sans-serif",
      fill: "#b0305c", // ROJO
      fontWeight: "bold",
      padding: { x: 6, y: 3 },
      backgroundColor: "#ffffff",
      border: "60px solid #000000",
    });

    // Menu Button
    this.box = this.add
      .text(5, height -45, "Menu", {
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
        .text(5 , (height -66) + i * -42, optionTexts[i], {
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
          y: option.y + 20,
          alpha: 0,
          duration: 500,
          onComplete: () => option.setVisible(false),
        });
      } else {
        option.setVisible(true);
        this.tweens.add({
          targets: option,
          y: option.y - 20,
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
