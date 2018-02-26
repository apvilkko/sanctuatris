import {FRAME_TIME} from './consts';
import draw from './draw';
import applyAction, {TICK, shouldTick} from './actions';

let time = null;
let run = null;

const gameLoop = (scene, gameContainer, fn) => timestamp => {
  if (!time) {
    time = timestamp - 2 * FRAME_TIME;
  }
  const delta = timestamp - time;
  if (shouldTick(gameContainer.game, timestamp)) {
    gameContainer.game = applyAction(gameContainer.game, TICK, timestamp);
  }
  if (delta > FRAME_TIME) {
    time = timestamp;
    draw(scene, gameContainer);
  }
  fn(run);
};

export default (window, scene, gameContainer) => {
  const raf = window.requestAnimationFrame;
  run = gameLoop(scene, gameContainer, raf);
  raf(run);
};
