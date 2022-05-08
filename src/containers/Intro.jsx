/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from "react";
import { useHistory } from "react-router-dom";
import Container from "../components/Container";
import ClearButton from "../components/ClearButton";
import Input from "../components/Input";

function Intro() {
  const [size, setSize] = React.useState("");
  const [error, setError] = React.useState("");
  const history = useHistory();

  const handleSubmit = () => {
    if (typeof size === "number" && !Number.isNaN(size)) {
      history.push(`/main/${size}`);
      setError("");
    }
    setError("Incorrect input!");
  };

  const handleKeypress = ({ code }) => {
    if (code === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Container centered>
      {error.length > 0 && <p style={{ color: "red" }}>{error} </p>}
      <label htmlFor="size">Input size of the Board</label>
      <Input
        id="size"
        type="number"
        onKeyPress={handleKeypress}
        onChange={(e) => setSize(+e.target.value)}
        value={size}
      />

      <ClearButton onClick={handleSubmit}>Enter</ClearButton>
    </Container>
  );
}

export default Intro;
