import {
  FIELD_BOTTOM_OFFSET, RECT_SIZE, INTERNAL_RESOLUTION, VISIBLE_ROWS,
  PLAYFIELD_DIMENSIONS
} from './consts';
import tetrominos from './tetrominos';
import S from './sfactory';

function lum(hex, lum) {
  const rgb = ["#"];
  let c;
  for (let i = 0; i < 3; i++) {
    const ci = parseInt(hex.substr(i * 2 + 1, 2), 16);
    const r = Math.round(
      Math.min(Math.max(0, ci + (ci * lum)), 255)
    ).toString(16);
    rgb.push(("00" + r).substr(r.length));
  }
  return rgb.join('');
}

const COLOR_MAP = S.pipe([
  S.values,
  S.map(item => [item.type, {
    color: item.color,
    lighter: lum(item.color, 0.2),
    darker: lum(item.color, -0.2),
  }]),
  S.fromPairs,
])(tetrominos);

const getColor = cell => (COLOR_MAP[cell.type] || {});

const HALF = RECT_SIZE / 2;
const INVISIBLE = 'rgba(0,0,0,0)';
const CELL_SIZE = RECT_SIZE + 1;

const drawCell = (context, cell, x0, y0, x, y) => {
  if (y >= VISIBLE_ROWS || y < 0 || x < 0 || x >= PLAYFIELD_DIMENSIONS[0]) {
    return;
  }
  const {color, lighter, darker} = getColor(cell);
  const hasPiece = !!color;
  const x1 = x0 + x * CELL_SIZE;
  const y1 = y0 - y * CELL_SIZE;

  if (hasPiece) {
    context.beginPath();
    context.rect(x1, y1, RECT_SIZE, RECT_SIZE);
    context.fillStyle = color;
    context.fill();
    context.closePath();

    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x1 + RECT_SIZE, y1);
    context.lineTo(x1 + HALF, y1 + HALF);
    context.lineTo(x1, y1);
    context.fillStyle = lighter;
    context.fill();
    context.strokeStyle = INVISIBLE;
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(x1, y1 + RECT_SIZE);
    context.lineTo(x1 + RECT_SIZE, y1 + RECT_SIZE);
    context.lineTo(x1 + HALF, y1 + HALF);
    context.lineTo(x1, y1 + RECT_SIZE);
    context.fillStyle = darker;
    context.fill();
    context.strokeStyle = INVISIBLE;
    context.stroke();
    context.closePath();
  }
};

export default (scene, gameContainer) => {
  const {canvas, context} = scene;
  const game = gameContainer.game;
  context.scale(canvas._internalScale, canvas._internalScale);

  context.beginPath();
  context.rect(0, 0, INTERNAL_RESOLUTION[0], INTERNAL_RESOLUTION[1]);
  context.fillStyle = 'black';
  context.fill();
  context.closePath();

  const x0 = FIELD_BOTTOM_OFFSET[0] * INTERNAL_RESOLUTION[0];
  const y0 = FIELD_BOTTOM_OFFSET[1] * INTERNAL_RESOLUTION[1];

  const fieldW = PLAYFIELD_DIMENSIONS[0] * CELL_SIZE + 1;
  const fieldH = VISIBLE_ROWS * CELL_SIZE + 1;
  context.beginPath();
  context.rect(x0 - 1, y0 + CELL_SIZE - fieldH, fieldW, fieldH);
  context.strokeStyle = '#222';
  context.stroke();
  context.closePath();

  for (let y = 0; y < VISIBLE_ROWS; ++y) {
    for (let x = 0; x < game.field[y].length; ++x) {
      drawCell(context, game.field[y][x], x0, y0, x, y);
    }
  }

  const rot = tetrominos[game.piece.type].rotations[game.piece.rotation];
  for (let i = 0; i < rot.length; ++i) {
    drawCell(context, game.piece, x0, y0,
      game.piece.x + rot[i][0], game.piece.y - rot[i][1]);
  }

  context.setTransform(1, 0, 0, 1, 0, 0);
}
