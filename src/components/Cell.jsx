import styled from 'styled-components';

const Cell = styled.button`
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

Cell.defaultProps = {
  alive: false,
  theme: {
    main: '#000',
  },
};

export default Cell;
