import React, { Fragment } from 'react';
import styled from 'styled-components';
import { mapProps } from 'recompose';
import {
  Router,
  Route,
  Switch,
} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import map from 'lodash/map';

import 'highlight.js/styles/tomorrow.css';

import IntroductionPage from './pages/IntroductionPage';
import TestPage from './pages/TestPage';
import TestListPage from './pages/TestListPage';

import { TESTS } from './constants/tests';

const Main = styled.div`
  font-family: sans-serif;
`;

const history = createHistory();

const mapTestRoutes = (test) => {
  const mappedProps = mapProps(props => ({
    ...props,
    ...test,
  }));

  return (
    <Fragment>
      <Route
        exact
        key={`${test.href}/intro`}
        path={`${test.href}/intro`}
        component={mappedProps(IntroductionPage)}
      />
      <Route
        exact
        key={`${test.href}`}
        path={`${test.href}`}
        component={mappedProps(TestPage)}
      />
    </Fragment>
  );
};

const App = () => (
  <Main>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={TestListPage} />
        {map(TESTS, mapTestRoutes)}
      </Switch>
    </Router>
  </Main>
);

export default App;
