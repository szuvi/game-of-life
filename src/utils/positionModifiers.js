const rowModifier = ([x, y], step) => [x, y + step];
const columnModifier = ([x, y], step) => [x + step, y];

const positionModifiers = {
  left: (position) => rowModifier(position, -1),
  right: (position) => rowModifier(position, +1),
  up: (position) => columnModifier(position, -1),
  down: (position) => columnModifier(position, +1),
  leftUp: (position) => rowModifier(columnModifier(position, -1), -1),
  rightUp: (position) => rowModifier(columnModifier(position, +1), -1),
  leftDown: (position) => rowModifier(columnModifier(position, -1), +1),
  rightDown: (position) => rowModifier(columnModifier(position, +1), +1),
};

export default positionModifiers;
