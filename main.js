
import Game from "./scenes/game.js";
import MainMenu from "./scenes/menu_principal.js";
import Opciones from "./scenes/opciones.js";
import PauseMenu from './scenes/pause_menu.js';
import Preload from "./scenes/preload.js";

// Create a new Phaser config object
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
  
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
    backgroundColor: '#5c5b5b',
    scene: [Preload, MainMenu, Game, PauseMenu, Opciones, Eleccion],
  };
  
  // Create a new Phaser game instance
  window.game = new Phaser.Game(config);