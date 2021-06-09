import * as React from 'react';
import { map } from 'rxjs/operators';
import { useParams } from 'react-router-dom';
import Cell from '../components/Cell';
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
    game.startUpdates(500);
  };

  const handleStop = () => {
    setStarted(false);
    game.endUpdates();
  };

  const handleToggle = (pos) => {
    game.toggleAtPos(pos);
  };

  const handleClear = () => {
    game.wipeBoard();
  };

  return (
    <Container centered>
      <BoardGrid size={size}>
        {board.map((cell) => (
          <Cell
            onClick={() => handleToggle(cell.pos)}
            disabled={started}
            key={cell.id}
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
