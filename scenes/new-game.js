/* Escena que aparece cuando un jugadór ya ganó, 
aparece frente a la escena main.(Launch)
    Hacer como un barra que cae de arriba.
    Volver a jugar, Menu princpal.
*/

export default class NewGame extends Phaser.Scene {
    constructor() {
      super("new-game");
    }

    create() {

    // Detectar la pulsación de la tecla 'SPACE'
    this.input.keyboard.on("keydown-SPACE", this.collectItem, this);
    // Detectar la pulsación de la tecla 'ENTER'
    this.input.keyboard.on("keydown-ENTER", this.collectItem, this);

        // Crear el rectángulo pequeño en medio de la barra principal
      this.collectibleRect = this.add.rectangle(
        keysX, // Posición en X centrada
        barraY + 9, // Misma posición Y que la barra principal
        20, // Ancho del rectángulo
        20, // Alto del rectángulo
        0xff0000 // Color rojo para que sea visible
      );

      // Habilitar detección de colisión entre las barras móviles y el rectángulo pequeño
    this.physics.add.overlap(
      this.movingBar,
      this.collectibleRect,
      this.collectItem,
      null,
      this
    );

    this.physics.add.overlap(
      this.movingBar2,
      this.collectibleRect,
      this.collectItem,
      null,
      this
    );
      
    }

    collectItem(movingBar, collectibleRect) {
      // Lógica para recolectar el rectángulo, puede ser aumentar el puntaje, desaparecer el rectángulo, etc.
      collectibleRect.destroy(); // Destruye el rectángulo recolectado
      this.score++; // Ejemplo: incrementar el puntaje del jugador
      this.scoreText.setText("Score: " + this.score);
    }

}


