import styled from 'styled-components';

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
  grid-template-rows: repeat(${(props) => props.size}, 1fr);
  grid-gap: 0.2rem;
`;

BoardGrid.defaultProps = {
  size: 10,
};

export default BoardGrid;
