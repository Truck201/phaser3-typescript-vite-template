// scenes/BattleScene.js

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super("battle-scene");
  }

  create() {
    let barHeigth = 95;
    let width = this.game.config.width;
    let height = this.game.config.height;

    // Crear la barra principal
    let barraX = (width * 1) / 2; // Posición Barra en X
    let barraY = (height * 4.3) / 5; // Posición de alto en las barras Y
    this.mainBar = this.add.rectangle(barraX, barraY, 840, barHeigth, 0x272736);

    const myColors = [0x5f574f, 0xfff1e8, 0x121213, 0xb0305c, 0x4b5bab]; // 0 GRIS , 1 BLANCO, 2 NEGRO , 3 ROJO, 4 AZUL ;
    let color1 = true;
    let border = 30.2;

    // Array para los sprites, los porolocos de colores
    const pororoes = [
      "pororo-chico.v1",
      "pororo-chico.v2",
      "pororo-chico.v3",
      "pororo-chico.v4",
      "pororo-chico.v5",
      "pororo-chico.v6",
      "pororo-chico.v7",
    ];

    // Array para almacenar los rectángulos de colores
    this.noCorrectRects = [];

    // Array para almacenar los recolectables
    this.collectibles = [];

    // Variable para almacenar el recolectable en colisión
    this.collidingCollectible = null;

    for (let i = 0; i < 28; i++) {
      let keysX = width / 5.5 + i * border;
      let keysY = barraY;
      let rect;

      if (color1) {
        rect = this.add.rectangle(keysX, keysY, border, barHeigth, myColors[0]); // Barra color
        color1 = false;
      } else {
        rect = this.add.rectangle(keysX, keysY, border, barHeigth, myColors[0]); // Barra color
        color1 = true;
      }
      // Crear el objeto hijo (puedes ajustarlo según lo que necesites)
      rect.child = this.add.rectangle(
        keysX,
        keysY,
        border - 10,
        barHeigth - 10,
        myColors[2]
      );

      // Añadir el rectángulo al array
      this.noCorrectRects.push(rect);

      // Seleccionar un sprite aleatorio del array
      let randomSprite = Phaser.Math.RND.pick(pororoes);

      // Crear el pororó PEQUEÑO en medio de la barra principal
      this.collectibleRect = this.physics.add
        .sprite(
          keysX, // Posición en X centrada
          barraY - 25, // Misma posición Y que la barra principal
          randomSprite // Random de un array
        )
        .setScale(1.4)
        .setSize(17, 12);

      // Objeto inamovible
      this.collectibleRect.setImmovable(true);
      // Evitar la acción de la gravedad
      this.collectibleRect.body.allowGravity = false;

      // Añadir el recolectable al array
      this.collectibles.push(this.collectibleRect);

      // Agregar pororó GIGANTE
      this.addBigOne = this.physics.add
        .sprite(keysX, barraY - 60, "pororo-grande.v1")
        .setScale(1.8)
        .setSize(24, 19);

      // Objeto inamovible
      this.addBigOne.setImmovable(true);
      // Evitar la acción de la gravedad
      this.addBigOne.body.allowGravity = false;
    }

    // Crear la barra más pequeña que se mueve 1
    let barr1Width = barraX - 300; // Posición Barra chica 1
    this.movingBar = this.add.rectangle(
      barr1Width,
      barraY,
      20,
      barHeigth + 15,
      myColors[3] // ROJO
    );
    this.isMovingRight = true;

    // Crear la barra que se mueve 2
    let barr2Width = barraX + 300; // Posición Barra chica 1
    this.movingBar2 = this.add.rectangle(
      barr2Width,
      barraY,
      20,
      barHeigth + 15,
      myColors[4] // AZUL
    );
    this.isMovingRight2 = false;

    // Añadir un texto para mostrar los puntos 1
    this.score = 0;
    this.scoreText = this.add.text((width * 1) / 30, 360, "Score: 0", {
      fontSize: "28px",
      fontFamily: "Arial Black, Gadget, sans-serif",
      fill: "#b0305c", // ROJO
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
      fill: "#4b5bab", // AZUL
      fontWeight: "bold",
      padding: { x: 6, y: 3 },
      backgroundColor: "#ffffff",
      border: "60px solid #000000",
    });

    // Inicializar la velocidad de la barra pequeña 1 azul
    this.movingSpeed = 3.4;

    // Inicializar la velocidad de la barra pequeña 2 Roja
    this.movingSpeed2 = 3.4;

    // Evento para el segundo juego
    this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => {
        null;
      },
    });

    //Agregar los cursores
    this.cursor = this.input.keyboard.createCursorKeys();

    // Inicializar las teclas para el manejo de eventos
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.keyEnter = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    this.KeyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Listener
    this.KeyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // Listener

    // Detectar la pulsación de la tecla 'SPACE'
    this.keySpace.on("down", () => this.collectItem(this.movingBar));
    // Detectar la pulsación de la tecla 'ENTER'
    this.keyEnter.on("down", () => this.collectItem(this.movingBar2));

    // Añadir detección de colisión para recolectables
    this.physics.add.overlap(
      this.movingBar,
      this.collectibles,
      this.collectItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.movingBar2,
      this.collectibles,
      this.collectItem,
      null,
      this
    );
  }

  update() {
    this.movimientoBarra1();
    this.movimientoBarra2();
    this.chequearBarra();
  }

  collectItem(movingBar) {
    // Buscar el recolectable que está en la posición de la barra móvil
    let collectible = this.collectibles.find((c) =>
      Phaser.Geom.Intersects.RectangleToRectangle(
        movingBar.getBounds(),
        c.getBounds()
      )
    );

    if (collectible && !collectible.isDestroyed) {
      collectible.isDestroyed = true; // Marcar el recolectable como destruido
      collectible.destroy(); // Destruir el recolectable
      if (movingBar === this.movingBar) {
        this.score++; // Incrementar el puntaje del jugador 1
        this.scoreText.setText("Score: " + this.score);
      } else if (movingBar === this.movingBar2) {
        this.score2++; // Incrementar el puntaje del jugador 2
        this.scoreText2.setText("Score: " + this.score2);
      }
    }
  }

  movimientoBarra1() {
    const width = this.game.config.width;
    // Movimiento de la barra pequeña AZUL
    if (this.KeyD.isDown && this.movingBar.x < width / 2 + 415) {
      this.movingBar.x += this.movingSpeed;
    } else if (this.KeyA.isDown && this.movingBar.x > width / 2 - 415) {
      this.movingBar.x -= this.movingSpeed;
    }
  }

  movimientoBarra2() {
    const width = this.game.config.width;
    // Movimiento de la barra pequeña ROJA (Jugador 2 con las flechas)
    if (this.cursor.left.isDown && this.movingBar2.x > width / 2 - 415) {
      this.movingBar2.x -= this.movingSpeed2;
    }
    if (this.cursor.right.isDown && this.movingBar2.x < width / 2 + 415) {
      this.movingBar2.x += this.movingSpeed2;
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

  chequearBarra() {
    this.noCorrectRects.forEach((rect) => {
      // Verificar si las barras están colisionando con el rectángulo
      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          this.movingBar.getBounds(),
          rect.getBounds()
        ) ||
        Phaser.Geom.Intersects.RectangleToRectangle(
          this.movingBar2.getBounds(),
          rect.getBounds()
        )
      ) {
        rect.child.setScale(1.095); // Aumentar el tamaño del hijo si hay colisión
      } else {
        rect.child.setScale(1); // Volver al tamaño normal si no hay colisión
      }
    });
  }

  secondGame() {}
}
