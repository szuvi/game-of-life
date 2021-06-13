/* eslint-disable react/prop-types */
import * as React from 'react';
import styled from 'styled-components';

const StyledCell = styled.button`
  height: 2rem;
  width: 2rem;
  border: 1px solid ${(props) => props.theme.main};
  background: ${(props) => (props.alive ? props.theme.main : 'none')};
  &:hover {
    background: ${(props) => (props.disabled ? 'none' : props.theme.main)};
    opacity: 50%;
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  }
  &:active {
    opacity: 100%;
  }
`;

StyledCell.defaultProps = {
  alive: false,
  theme: {
    main: '#000',
  },
};

function Cell({ onClick, disabled, alive, pos }) {
  const handleToggle = () => onClick(pos);
  return (
    <StyledCell onClick={handleToggle} disabled={disabled} alive={alive} />
  );
}

function MemoizedCell({ onClick, disabled, alive, pos }) {
  return React.useMemo(
    () => (
      <Cell onClick={onClick} disabled={disabled} alive={alive} pos={pos} />
    ),
    [onClick, disabled, alive, pos],
  );
}

export default MemoizedCell;
