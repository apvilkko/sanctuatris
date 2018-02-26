import {INTERNAL_RESOLUTION, VIEWPORT_COVER_AMOUNT} from './consts';
import S from './sfactory';
import applyAction, {ROTATE, MOVE} from './actions';

const zip2 = S.curry3((fn, a, b) => {
  const res = S.lift2(fn, a, b);
  return [S.head(res), S.last(res)];
});

const resizeCanvas = (win, canvas) => () => {
  const windowSize = [win.innerWidth, win.innerHeight];
  const scales = S.pipe([
    S.map(S.mult(VIEWPORT_COVER_AMOUNT)),
    zip2(S.div, INTERNAL_RESOLUTION),
    S.map(S.fromMaybe(0)),
  ])(windowSize);
  const newScale = Math.min(...scales);
  [canvas.width, canvas.height] = S.map(S.mult(newScale), INTERNAL_RESOLUTION);
  canvas._internalScale = newScale;
};

const handleInputs = state => event => {
  let action = [];
  switch (event.key) {
    case 'ArrowUp': {
      action = [ROTATE];
      break;
    }
    case 'ArrowDown': {
      action = [MOVE, [0, -1]];
      break;
    }
    case 'ArrowLeft': {
      action = [MOVE, [-1, 0]];
      break;
    }
    case 'ArrowRight': {
      action = [MOVE, [1, 0]];
      break;
    }
    default: break;
  }
  state.game = applyAction(state.game, ...action);
};

let resizeListener;
let keyListener;

export default (doc, win, gameContainer) => {
  const canvas = doc.createElement('canvas');
  const context = canvas.getContext('2d');
  resizeListener = resizeCanvas(win, canvas);
  keyListener = handleInputs(gameContainer);
  win.addEventListener('load', resizeListener);
  win.addEventListener('resize', resizeListener);
  win.addEventListener('keydown', keyListener);
  return {
    canvas,
    context,
  };
};
