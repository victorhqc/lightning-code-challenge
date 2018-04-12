import React from 'react';
import styled from 'styled-components';
import {
  Router,
  Route,
  Switch,
} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import reduce from 'lodash/reduce';

import 'highlight.js/styles/tomorrow.css';

import IntroductionPage from './pages/IntroductionPage';
import TestPage from './pages/TestPage';
import TestListPage from './pages/TestListPage';

import { TESTS } from './constants/tests';

const Main = styled.div`
  font-family: sans-serif;
`;

const history = createHistory();

const mapTest = (WrappedComponent, route) => props => (
  <WrappedComponent {...props} {...route.test} />
);

const addRoutes = () => reduce(TESTS, (prev, test) => ([
  ...prev,
  {
    component: TestPage,
    path: test.path,
    test,
  },
  {
    path: `/intro${test.path}`,
    component: IntroductionPage,
    test,
  },
]), []);

const RouteWithSubRoutes = route => (
  <Route
    exact
    path={route.path}
    render={mapTest(route.component, route)}
  />
);

const App = () => (
  <Main>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={TestListPage} />
        {addRoutes().map(route => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
      </Switch>
    </Router>
  </Main>
);

export default App;
