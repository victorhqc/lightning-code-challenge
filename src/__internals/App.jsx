import React from 'react';
import styled from 'styled-components';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import TestResults from './TestResults';
import Introduction from './Introduction';

const Main = styled.div`
  font-family: sans-serif;
`;

const history = createHistory();

const App = () => (
  <Main>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Introduction} />
        <Route path="/test" component={TestResults} />
      </Switch>
    </Router>
  </Main>
);

export default App;
