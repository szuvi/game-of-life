import { v4 as uuidv4 } from 'uuid';

class Cell {
  constructor(x, y) {
    this.alive = false;
    this.pos = [x, y];
    this.id = uuidv4();
  }

  toggleState() {
    this.alive = !this.alive;
  }

  resurrect() {
    if (this.alive === false) {
      this.alive = true;
    }
  }

  kill() {
    if (this.alive === true) {
      this.alive = false;
    }
  }
}

export default Cell;
