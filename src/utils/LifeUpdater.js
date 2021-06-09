import { interval } from 'rxjs';

class LifeUpdater {
  constructor(board) {
    this.board = board;
    this.subscription$ = null;
  }

  start(timeGap = 1000) {
    this.subscription$ = interval(timeGap).subscribe(() => this.updateBoard());
  }

  updateBoard() {
    const cellsToUpdate = this.getCellsToUpdate();
    this.board.toggleBatch(cellsToUpdate);
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

  end() {
    if (this.subscription$ != null) {
      this.subscription$.unsubscribe();
    }
  }
}

export default LifeUpdater;
