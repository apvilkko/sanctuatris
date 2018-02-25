import S from './sfactory';
import {PLAYFIELD_DIMENSIONS, SPAWN_COORDINATES} from './consts';
import {TYPES} from './tetrominos';

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

const bag = {
  bag: [],
  getNew: () => S.concat(bag.bag, shuffle([...TYPES])),
  next: () => {
    if (bag.bag.length === 0) {
      bag.bag = bag.getNew();
    }
    return bag.bag.pop();
  }
};

const newPiece = () => ({
  type: bag.next(),
  x: SPAWN_COORDINATES[0],
  y: SPAWN_COORDINATES[1],
  rotation: 0,
});

export default newPiece;
