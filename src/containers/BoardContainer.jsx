import * as React from 'react';
import PropTypes from 'prop-types';
import { map } from 'rxjs/operators';
import Cell from '../components/Cell';
import useLife from '../hooks/useLife';
import BoardGrid from '../components/BoardGrid';
import Container from '../components/Container';
import Controls from './Controls';

function BoardContainer({ size }) {
  const game = useLife(size);
  const [board, setBoard] = React.useState(() => game.getState());
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const subscription = game
      .getBoardUpdates$()
      .pipe(map((fields) => fields.flat()))
      .subscribe((cellsArray) => setBoard(cellsArray));
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

BoardContainer.propTypes = {
  size: PropTypes.number.isRequired,
};

export default BoardContainer;
