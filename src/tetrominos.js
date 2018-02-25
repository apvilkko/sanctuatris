export const TYPES = 'IOTSZJL'.split('');

export default {
  I: {
    type: 'I',
    color: '#00ffff', // cyan
    rotations: [
      [[-1, 0], [0, 0], [1, 0], [2, 0]],
      [[1, -1], [1, 0], [1, 1], [1, 2]],
      [[-1, 1], [0, 1], [1, 1], [2, 1]],
      [[0, -1], [0, 0], [0, 1], [0, 2]],
    ],
  },
  O: {
    type: 'O',
    color: '#ffff00', // yellow
    rotations: [
      [[0, -1], [1, -1], [0, 0], [1, 0]],
      [[0, -1], [1, -1], [0, 0], [1, 0]],
      [[0, -1], [1, -1], [0, 0], [1, 0]],
      [[0, -1], [1, -1], [0, 0], [1, 0]],
    ],
  },
  T: {
    type: 'T',
    color: '#800080', // purple
    rotations: [
      [[0, -1], [-1, 0], [0, 0], [1, 0]],
      [[0, -1], [0, 0], [1, 0], [0, 1]],
      [[-1, 0], [0, 0], [1, 0], [0, 1]],
      [[0, -1], [-1, 0], [0, 0], [0, 1]],
    ],
  },
  S: {
    type: 'S',
    color: '#008000', // green
    rotations: [
      [[0, -1], [1, -1], [-1, 0], [0, 0]],
      [[0, -1], [0, 0], [1, 0], [1, 1]],
      [[0, 0], [1, 0], [-1, 1], [0, 1]],
      [[-1, -1], [-1, 0], [0, 0], [0, 1]],
    ],
  },
  Z: {
    type: 'Z',
    color: '#ff0000', // red
    rotations: [
      [[-1, -1], [0, -1], [0, 0], [1, 0]],
      [[1, -1], [0, 0], [1, 0], [0, 1]],
      [[-1, 0], [0, 0], [0, 1], [1, 1]],
      [[0, -1], [-1, 0], [0, 0], [-1, 1]],
    ],
  },
  J: {
    type: 'J',
    color: '#0000ff', // blue
    rotations: [
      [[-1, -1], [-1, 0], [0, 0], [1, 0]],
      [[0, -1], [1, -1], [0, 0], [0, 1]],
      [[-1, 0], [0, 0], [1, 0], [1, 1]],
      [[0, -1], [0, 0], [-1, 1], [0, 1]],
    ],
  },
  L: {
    type: 'L',
    color: '#ffa500', // orange
    rotations: [
      [[1, -1], [-1, 0], [0, 0], [1, 0]],
      [[0, -1], [0, 0], [0, 1], [1, 1]],
      [[-1, 0], [0, 0], [1, 0], [-1, 1]],
      [[-1, -1], [0, -1], [0, 0], [0, 1]],
    ],
  },
}