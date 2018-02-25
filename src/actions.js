import {BASELINE_SPEED, PLAYFIELD_DIMENSIONS} from './consts';
import newPieceFromBag from './bag';
import tetrominos from './tetrominos';
import S from './sfactory';
import {createRow} from './game';

export const ROTATE = 'rotate';
export const COMMIT = 'commit';
export const MOVE = 'move';
export const TICK = 'tick';

const OK = 'ok';
const NOK = 'nok';
const DROP = 'drop';

const fieldCheck = field => {
  let newField = [];
  let removed = 0;
  for (let y = 0; y < field.length; ++y) {
    const mapped = S.map(S.prop('type'), field[y]);
    const isFull = S.joinWith('', mapped).length === PLAYFIELD_DIMENSIONS[0];
    if (isFull) {
      removed++;
    } else {
      newField.push(field[y]);
    }
  }
  if (removed === 0) {
    return field;
  }
  newField = S.concat(newField, S.map(createRow, S.range(0, removed)));
  return fieldCheck(newField);
};

const moveCheck = (field, piece, x, y) => {
  const newX = piece.x + (x || 0);
  const newY = piece.y + (y || 0);
  const ret = {x: newX, y: newY};
  const rot = tetrominos[piece.type].rotations[piece.rotation];
  for (let i = 0; i < rot.length; ++i) {
    const x1 = newX + rot[i][0]
    const y1 = newY - rot[i][1];
    const overX = x1 >= PLAYFIELD_DIMENSIONS[0] || x1 < 0;
    const atBottom = y1 < 0;
    const taken = (atBottom || overX) ? false : !!field[y1][x1].type;
    const movingSideWays = !y;
    if (overX || (taken && movingSideWays)) {
      ret.result = NOK;
      ret.bad = {x: x1, y: y1};
      return ret;
    }
    if (atBottom || (taken && !movingSideWays)) {
      ret.result = DROP;
      ret.bad = {y: y1, x: x1};
      return ret;
    }
  }
  ret.result = OK;
  return ret;
};

export const shouldTick = (game, timestamp) =>
  (timestamp - game.timestamp > BASELINE_SPEED);

function applyAction(game, action, ...params) {
  switch(action) {
    case ROTATE: {
      const piece = game.piece;
      const newPiece = Object.assign({}, piece,
        {rotation: (piece.rotation + 1) % 4});

      // TODO wall kick
      let check;
      let counter = 0;
      while (counter < PLAYFIELD_DIMENSIONS[0]) {
        check = moveCheck(game.field, newPiece);
        if (check.result === NOK) {
          if (check.bad.x < 0) {
            newPiece.x = newPiece.x - check.bad.x;
          } else {
            newPiece.x = newPiece.x -
              (check.bad.x - PLAYFIELD_DIMENSIONS[0] + 1);
          }
        } else {
          break;
        }
        ++counter;
      }

      return check.result === OK ?
        Object.assign({}, game, {piece: newPiece}) : game;
    }
    case MOVE: {
      const piece = game.piece;
      const moveX = params[0][0] || 0;
      const moveY = params[0][1] || 0;
      const check = moveCheck(game.field, piece, moveX, moveY);
      if (check.result === OK) {
        const newPiece = Object.assign({}, piece, {x: check.x, y: check.y});
        return Object.assign({}, game, {piece: newPiece});
      } else if (check.result === DROP) {
        return applyAction(game, COMMIT, piece);
      }
      return game;
    }
    case COMMIT: {
      const commitPiece = params[0];
      const rot = tetrominos[commitPiece.type].rotations[commitPiece.rotation];
      let newField = [...game.field];
      for (let i = 0; i < rot.length; ++i) {
        const x1 = commitPiece.x + rot[i][0]
        const y1 = commitPiece.y - rot[i][1];
        newField[y1][x1].type = commitPiece.type;
      }
      newField = fieldCheck(newField);
      const newPiece = newPieceFromBag();
      return Object.assign({}, game, {piece: newPiece, field: newField});
    }
    case TICK: {
      const piece = game.piece;
      const check = moveCheck(game.field, piece, 0, -1);
      let newPiece = piece;
      if (check.result === OK) {
        newPiece = Object.assign({}, piece, {y: check.y});
      } else if (check.result === DROP) {
        return applyAction(game, COMMIT, piece);
      }
      return Object.assign({}, game, {piece: newPiece, timestamp: params[0]});
    }
    default:
      return game;
  }
}

export default applyAction;
