import { Observable } from 'rxjs';
import Cell from './Cell';

class Board {
  constructor(size) {
    this.fields = Board.generate(size);
    this.subscriber = null;
  }

  getBoardState$() {
    return new Observable((subscriber) => {
      this.subscriber = subscriber;
    });
  }

  toggleAtPos(x, y) {
    const cell = this.fields[x][y];
    cell.toggle();
    this.pushUpdate();
  }

  pushUpdate() {
    if (this.subscriber != null) {
      this.subscriber.next(this.fields);
    }
  }

  getState() {
    return this.fields;
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

  static generate(size) {
    const board = [];
    for (let i = 0; i < size; i += 1) {
      board[i] = [];
      for (let j = 0; j < size; j += 1) {
        board[i][j] = new Cell(i, j);
      }
    }
  }
}

export default Board;
