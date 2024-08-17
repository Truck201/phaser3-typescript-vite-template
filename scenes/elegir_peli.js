export default class Eleccion extends Phaser.Scene {
  constructor() {
    super("eleccion");

    this.lastKeyPressTime = 0;
  }

  create() {
    this.playerSelections = [[], []]; // Almacena la selección de los jugadores
    this.currentPlayer = 0; // Jugador Actual (0 o 1)

    this.add.text(20, 20, "Jugador 1: Elige 3 elementos", {
      fontSize: "20px",
      fill: "#fff",
    });

    // Crear 20 elementos para elegir
    this.elements = [];
    const elementConfigs = [
      { key: "element1", animation: "anim1" }, // Imagen 1, animación 1
      { key: "element2", animation: "anim2" }, // Imagen 2, animación 2
      { key: "element3", animation: "anim3" }, // Imagen 3, animación 3
      // Agrega más configuraciones para los 20 elementos
    ];

    for (let i = 0; i < 20; i++) {
      let config = elementConfigs[i % elementConfigs.length]; // Usar configuraciones cíclicamente
      let element = this.add
        .sprite(50 + (i % 5) * 100, 100 + Math.floor(i / 5) * 100, config.key)
        .setInteractive()
        .on("pointerdown", () => this.toggleElementSelection(element, i));
      element.play(config.animation); // Reproducir la animación
      this.elements.push(element);
    }


    // Botón para confirmar las elecciones
    this.confirmButton = this.add.text(300, 500, "Confirmar", { fontSize: "20px", fill: "#fff" })
      .setInteractive()
      .on('pointerdown', () => this.confirmSelections())
      .setVisible(false);

    // Botón para volver a la escena anterior
    this.backButton = this.add.text(20, 500, "Volver", { fontSize: "20px", fill: "#fff" })
      .setInteractive()
      .on('pointerdown', () => this.scene.start('menu_principal'));
  }

  toggleElementSelection(element, index) {
    if (element.selected) {
      element.clearTint(); // Quitar el color de selección
      element.selected = false;
      this.playerSelections[this.currentPlayer] = this.playerSelections[this.currentPlayer].filter(i => i !== index);
    } else if (this.playerSelections[this.currentPlayer].length < 3) {
      element.setTint(0x00ff00); // Cambiar color para indicar selección
      element.selected = true;
      this.playerSelections[this.currentPlayer].push(index);
    }

    // Mostrar o esconder el botón de confirmar
    this.confirmButton.setVisible(this.playerSelections[this.currentPlayer].length === 3);
  }
  

  confirmSelections() {
    if (this.currentPlayer === 0) {
      this.currentPlayer = 1;
      this.add.text(20, 20, "Jugador 2: Elige 3 elementos", {
        fontSize: "20px",
        fill: "#fff",
      });
      this.confirmButton.setVisible(false);
      this.elements.forEach((element) => {
        element.clearTint();
        element.selected = false;
      });
    } else {
      this.scene.start("main", { selections: this.playerSelections });
    }
  }

  update() {}
}
