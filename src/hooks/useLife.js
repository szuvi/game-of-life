import * as React from 'react';
import Board from '../utils/Board';
import LifeUpdater from '../utils/LifeUpdater';

function useLife(initialSize) {
  const myBoard = React.useMemo(() => new Board(initialSize), [initialSize]);
  const updater = React.useMemo(() => new LifeUpdater(myBoard), [myBoard]);

  const API = React.useMemo(
    () => ({
      getState: () => myBoard.getState(), // returns single current state of Board
      getBoardUpdates$: () => myBoard.getBoardUpdates$(), // return observable that supplies board state everytime there is a change
      toggleAtPos: (pos) => myBoard.toggleAtPos(pos),
      wipeBoard: () => myBoard.killAll(),
      fillWholeBoard: () => myBoard.resurrectAll(),
      startUpdates: (intervalTime) => updater.start(intervalTime), // starts game of life updates
      endUpdates: () => updater.end(), // ends game of life updates
    }),
    [myBoard, updater],
  );

  return API;
}

export default useLife;
