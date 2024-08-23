import Game from "./scenes/game.js";
import MainMenu from "./scenes/menu_principal.js";
import Opciones from "./scenes/opciones.js";
import PauseMenu from "./scenes/pause_menu.js";
import Preload from "./scenes/preload.js";
import BattleScene from "./scenes/battle-scene.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth * 0.9, // Ajusta el ancho al 90% del ancho de la ventana
  height: window.innerHeight * 0.9, // Ajusta la altura al 90% de la altura de la ventana
  parent: "game-container", // Asegúrate de que el juego se inicialice en el contenedor correcto

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 240 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  backgroundColor: "#5c5b5b",
  scene: [Preload, MainMenu, Game, PauseMenu, Opciones, BattleScene],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);

// Adjust the game size when the window is resized
window.addEventListener("resize", () => {
  game.scale.resize(window.innerWidth * 0.9, window.innerHeight * 0.9);
});

// Add event listener for F11 key press
window.addEventListener("keydown", (event) => {
  if (event.key === "F11") {
    event.preventDefault(); // Prevent the default action of F11
    game.scale.resize(window.innerWidth * 0.9, window.innerHeight * 0.9);
  }
});
