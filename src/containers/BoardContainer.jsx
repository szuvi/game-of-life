import * as React from 'react';
import { map } from 'rxjs/operators';
import { useParams } from 'react-router-dom';
import MemoizedCell from '../components/Cell';
import useLife from '../hooks/useLife';
import BoardGrid from '../components/BoardGrid';
import Container from '../components/Container';
import Controls from './Controls';

function BoardContainer() {
  const { size } = useParams();
  const game = useLife(size);
  const [board, setBoard] = React.useState(() => game.getState().flat());
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const subscription = game
      .getBoardUpdates$()
      .pipe(map((fields) => fields.flat()))
      .subscribe((cellsArray) => setBoard(cellsArray));
    return () => {
      subscription.unsubscribe();
    };
  }, [game]);

  const handleStart = () => {
    setStarted(true);
    game.startUpdates(100);
  };

  const handleStop = () => {
    setStarted(false);
    game.endUpdates();
  };

  const handleClear = () => {
    game.wipeBoard();
  };

  const handleToggle = React.useCallback(
    (pos) => {
      game.toggleAtPos(pos);
    },
    [game],
  );

  return (
    <Container centered>
      <BoardGrid size={size}>
        {board.map((cell) => (
          <MemoizedCell
            onClick={handleToggle}
            disabled={started}
            key={cell.id}
            pos={cell.pos}
            alive={cell.alive}
          />
        ))}
      </BoardGrid>
      <Controls
        handleStart={handleStart}
        handleStop={handleStop}
        handleClear={handleClear}
        started={started}
      />
    </Container>
  );
}

export default BoardContainer;
