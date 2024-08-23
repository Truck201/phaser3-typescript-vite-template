// scenes/BattleScene.js
export default class BattleScene extends Phaser.Scene {
  constructor() {
    super("battle-scene");
  }

  create() {
    let barWidth = 25;
    let width = this.game.config.width;
    let height = this.game.config.height;

    // Crear la barra principal
    let barraX = (width * 1) / 2; // Posición Barra en X
    let barraY = (height * 4.3) / 5; // Posición de alto en las barras Y
    this.mainBar = this.add.rectangle(barraX, barraY, 240, barWidth, 0x272736); 

    this.noCorrect = this.add.rectangle(barraX, barraY, 60, barWidth, 0xffe478); // Barra color

    this.correct = this.add.rectangle(barraX, barraY, 23, barWidth, 0x42f81d); // Barra acierto

    // Crear la barra más pequeña que se mueve 1
    let barr1Width = barraX - 120; // Posición Barra chica 1
    this.movingBar = this.add.rectangle(
      barr1Width,
      barraY,
      4,
      barWidth,
      0x4b5bab  // AZUL 
    );
    this.isMovingRight = true;

    // Crear la barra que se mueve 2
    let barr2Width = barraX + 120; // Posición Barra chica 1
    this.movingBar2 = this.add.rectangle(
      barr2Width,
      barraY,
      4,
      barWidth,
      0xb0305c // ROJO 
    );
    this.isMovingRight2 = false;

    // Añadir un texto para mostrar los puntos 1 
    this.score = 0;
    this.scoreText = this.add.text((width * 1) / 30, 360, "Score: 0", {
      fontSize: "28px",
      fontFamily: "Arial Black, Gadget, sans-serif",
      fill: "#4b5bab", //  AZUL
      fontWeight: "bold",
      padding: { x: 6, y: 3 },
      backgroundColor: "#ffffff",
      border: "60px solid #000000",
    });

    // Añadir un texto para mostrar los puntos 2
    this.score2 = 0;
    this.scoreText2 = this.add.text((width * 8.3) / 10, 360, "Score: 0", {
      fontSize: "28px",
      fontFamily: "Arial Black, Gadget, sans-serif",
      fill: "#b0305c", // ROJO 
      fontWeight: "bold",
      padding: { x: 6, y: 3 },
      backgroundColor: "#ffffff",
      border: "60px solid #000000",
    });

    // Inicializar la velocidad de la barra pequeña 1
    this.movingSpeed = 3.4;

    // Inicializar la velocidad de la barra pequeña 2
    this.movingSpeed2 = 3.4;

    // Detectar la pulsación de la tecla 'SPACE'
    this.input.keyboard.on("keydown-SPACE", this.checkPosition2, this);
    // Detectar la pulsación de la tecla 'ENTER'
    this.input.keyboard.on("keydown-ENTER", this.checkPosition, this);

    // Evento para el segundo juego
    this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => {
        null;
      },
    });
  }

  update() {
    this.movimientoBarra1();
    this.movimientoBarra2();
  }

  movimientoBarra1() {
    // Movimiento de la barra pequeña
    if (this.isMovingRight) {
      this.movingBar.x += this.movingSpeed;
      if (this.movingBar.x >= this.mainBar.x + 120) {
        this.isMovingRight = false;
      }
    } else {
      this.movingBar.x -= this.movingSpeed;
      if (this.movingBar.x <= this.mainBar.x - 120) {
        this.isMovingRight = true;
      }
    }
  }

  movimientoBarra2() {
    // Movimiento de la barra pequeña 2
    if (this.isMovingRight2) {
      this.movingBar2.x += this.movingSpeed2;
      if (this.movingBar2.x >= this.mainBar.x + 120) {
        this.isMovingRight2 = false;
      }
    } else {
      this.movingBar2.x -= this.movingSpeed2;
      if (this.movingBar2.x <= this.mainBar.x - 120) {
        this.isMovingRight2 = true;
      }
    }
  }

  checkPosition2() {
    const centerX = this.mainBar.x;
    const tolerance = 10;
    if (Math.abs(this.movingBar.x - centerX) < tolerance) {
      if (this.score < 2) {
        this.score++;
        this.scoreText.setText("Score: " + this.score);
        this.movingSpeed += 3.5;
      } else {
        this.showWinnerText("Jugador 1"); // Function
        this.movingSpeed2 = 0;
        this.movingSpeed = 0;
      }
    } else {
      this.score = 0;
      this.scoreText.setText("Score: " + this.score);
      this.movingSpeed = 3.4;
    }
  }

  checkPosition() {
    const centerX = this.mainBar.x;
    const tolerance = 10;
    if (Math.abs(this.movingBar2.x - centerX) < tolerance) {
      if (this.score2 < 2) {
        this.score2++;
        this.scoreText2.setText("Score: " + this.score2);
        this.movingSpeed2 += 3.5;
      } else {
        this.showWinnerText("Jugador 2"); // Function
        this.movingSpeed2 = 0;
        this.movingSpeed = 0;
      }
    } else {
      this.score2 = 0;
      this.scoreText2.setText("Score: " + this.score2);
      this.movingSpeed2 = 3.4;
    }
  }

  showWinnerText(player) {
    const width = this.game.config.width;
    const height = this.game.config.height;
    console.log("adasm");
    this.winnerText = this.add
      .text(width / 2, height / 2 - 90, `${player} ha ganado el CONTROL`, {
        fontSize: "50px",
        fill: "#FFD700", // Color Texto
        fontFamily: "Arial Black, Gadget, sans-serif",
        backgroundColor: "#000000",
        padding: { x: 10, y: 5 },
        border: "60px solid #000000",
      })
      .setOrigin(0.5);

    // Ir a la escena del segundo juego.
    this.time.delayedCall(3000, () => {
      this.winnerText.setVisible(false);
      this.scene.stop();
    });
  }

  secondGame() {}
}
