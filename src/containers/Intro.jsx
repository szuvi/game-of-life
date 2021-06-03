import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '../components/Container';
import ClearButton from '../components/ClearButton';
import Input from '../components/Input';

function Intro() {
  const [size, setSize] = React.useState('');
  const [error, setError] = React.useState('');
  const history = useHistory();

  const handleSubmit = () => {
    if (typeof size === 'number' && !Number.isNaN(size) && size > 1) {
      history.push(`/main/${size}`);
      setError('');
    }
    setError('Incorrect input!');
  };

  return (
    <Container centered>
      <p>Input size of Board</p>
      {error.length > 0 && <p style={{ color: 'red' }}>{error} </p>}
      <Input
        id="size"
        type="number"
        onChange={(e) => setSize(+e.target.value)}
        value={size}
      />
      <ClearButton onClick={handleSubmit}>Enter</ClearButton>
    </Container>
  );
}

export default Intro;
