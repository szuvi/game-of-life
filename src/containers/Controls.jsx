import * as React from 'react';
import PropTypes from 'prop-types';
import ClearButton from '../components/ClearButton';
import Row from '../components/Row';

function Controls({ handleStart, handleStop, handleClear, started }) {
  return (
    <Row>
      <ClearButton onClick={handleStart} disabled={started}>
        Start
      </ClearButton>
      <ClearButton onClick={handleStop} disabled={!started}>
        Stop
      </ClearButton>
      <ClearButton onClick={handleClear} disabled={started}>
        Clear
      </ClearButton>
    </Row>
  );
}

Controls.propTypes = {
  handleStart: PropTypes.func.isRequired,
  handleStop: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  started: PropTypes.bool.isRequired,
};

export default Controls;
