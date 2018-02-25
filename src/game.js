import {PLAYFIELD_DIMENSIONS} from './consts';
import newPiece from './bag';

const createCell = () => ({type: ''});

export const createRow = () =>
  Array.from({length: PLAYFIELD_DIMENSIONS[0]}).map(createCell);

const createField = () =>
  Array.from({length: PLAYFIELD_DIMENSIONS[1]}).map(createRow);

export default () => ({
  field: createField(),
  piece: newPiece(),
  timestamp: -1000,
});
