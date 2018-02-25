import init from './src/init';
import loop from './src/loop';
import game from './src/game';

const gameContainer = {
  game: game(),
};

const scene = init(document, window, gameContainer);
const root = document.getElementById('app');
root.appendChild(scene.canvas);
loop(window, scene, gameContainer);
