import { Observable } from 'rxjs';
import Cell from './Cell';
import positionModifiers from './positionModifiers';

class Board {
  constructor(size) {
    this.size = size;
    this.fields = Board.generate(size);
    this.subscriber = null;
  }

  getState() {
    return this.fields.flat();
  }

  getBoardUpdates$() {
    return new Observable((subscriber) => {
      this.subscriber = subscriber;
    });
  }

  toggleAtPos([x, y]) {
    const cell = this.fields[x][y];
    cell.toggleState();
    this.pushUpdate();
  }

  toggleBatch(arrOfCells) {
    arrOfCells.forEach(({ pos: [x, y] }) => {
      if (this.isInBounds([x, y])) {
        this.fields[x][y].toggleState();
      }
    });
    this.pushUpdate();
  }

  pushUpdate() {
    if (this.subscriber != null) {
      this.subscriber.next(this.fields);
    }
  }

  killAll() {
    this.forEachField((cell) => cell.kill());
    this.pushUpdate();
  }

  resurrectAll() {
    this.forEachField((cell) => cell.resurrect());
    this.pushUpdate();
  }

  forEachField(callback) {
    this.fields.forEach((row) => row.forEach((field) => callback(field)));
  }

  getFieldNeighbours([x, y]) {
    return Object.values(positionModifiers)
      .map((modifier) => this.getCellAtPos(modifier([x, y])))
      .filter((cell) => cell != null);
  }

  getCellAtPos([x, y]) {
    if (!this.isInBounds([x, y])) {
      return null;
    }
    return this.fields[x][y];
  }

  isInBounds([x, y]) {
    return x < this.size && x >= 0 && y < this.size && y >= 0;
  }

  static generate(size) {
    const board = [];
    for (let i = 0; i < size; i += 1) {
      board[i] = [];
      for (let j = 0; j < size; j += 1) {
        board[i][j] = new Cell(i, j);
      }
    }
    return board;
  }
}

export default Board;
