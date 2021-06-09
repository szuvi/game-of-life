/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Intro from './containers/Intro';
import BoardContainer from './containers/BoardContainer';
import Container from './components/Container';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Container fullscreen>
        <Switch>
          <Route path="/main/:size">
            <BoardContainer />
          </Route>
          <Route path="/">
            <Intro />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
