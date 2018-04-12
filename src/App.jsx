import React from 'react';
import styled from 'styled-components';
import {
  Router,
  Route,
  Switch,
} from 'react-router';
import createHistory from 'history/createBrowserHistory';

import 'highlight.js/styles/tomorrow.css';

import TestPage from './pages/TestPage';
import IntroductionPage from './pages/IntroductionPage';

const Main = styled.div`
  font-family: sans-serif;
`;

const history = createHistory();

const App = () => (
  <Main>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={IntroductionPage} />
        <Route path="/test" component={TestPage} />
      </Switch>
    </Router>
  </Main>
);

export default App;
