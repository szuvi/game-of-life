import { interval } from 'rxjs';

class LifeUpdater {
  constructor(board) {
    this.board = board;
    this.subscription$ = null;

    this.start = this.start.bind(this);
    this.end = this.end.bind(this);
  }

  start(timeGap = 1000) {
    this.subscription$ = interval(timeGap).subscribe(() => this.updateBoard());
  }

  end() {
    this.subscription$.unsubscribe();
  }

  updateBoard() {
    const positionsToUpdate = this.getCellsToUpdate();
    this.board.toggleBatch(positionsToUpdate);
  }

  getCellsToUpdate() {
    const cellsToUpdate = [];
    this.board.forEachField((cell) => {
      if (this.toBeUpdated(cell)) {
        cellsToUpdate.push(cell);
      }
    });
    return cellsToUpdate;
  }

  toBeUpdated(cell) {
    const neighbours = this.board.getFieldNeighbours(cell.pos);
    const aliveNeighboursNumber = neighbours.filter(
      (neighbour) => neighbour.alive,
    ).length;
    if (cell.alive) {
      return LifeUpdater.shouldBeKilled(aliveNeighboursNumber);
    }
    return LifeUpdater.shouldBeResutrected(aliveNeighboursNumber);
  }

  static shouldBeKilled(aliveNeighboursNumber) {
    return aliveNeighboursNumber > 3 || aliveNeighboursNumber < 2;
  }

  static shouldBeResutrected(aliveNeighboursNumber) {
    return aliveNeighboursNumber === 3;
  }
}

export default LifeUpdater;
