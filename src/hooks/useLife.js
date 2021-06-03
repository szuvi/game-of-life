import * as React from 'react';
import Board from '../utils/Board';
import LifeUpdater from '../utils/LifeUpdater';

function useLife(initialSize) {
  const myBoard = React.useMemo(() => new Board(initialSize), [initialSize]);
  const updater = React.useMemo(() => new LifeUpdater(myBoard), [myBoard]);

  return {
    getState: () => myBoard.getState(),
    getBoardUpdates$: () => myBoard.getBoardUpdates$(),
    toggleAtPos: (pos) => myBoard.toggleAtPos(pos),
    wipeBoard: () => myBoard.killAll(),
    fillWholeBoard: () => myBoard.resurrectAll(),
    startUpdates: (time) => updater.start(time),
    endUpdates: () => updater.end(),
  };
}

export default useLife;
