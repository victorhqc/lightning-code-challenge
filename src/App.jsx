import React, { Fragment } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import {
  Router,
  Route,
  Switch,
} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import reduce from 'lodash/reduce';

import 'highlight.js/styles/monokai.css';

import TopHeader from './components/TopHeader';
import SideBar from './components/SideBar';

import { Flex, Box } from './elements/Grid';

import IntroductionPage from './pages/IntroductionPage';
import TestPage from './pages/TestPage';
import TestListPage from './pages/TestListPage';

import { TESTS } from './constants/tests';
import { HEADER_HEIGHT } from './constants/theme';

import { getBackgroundColor } from './utils/theme';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  body {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const Main = styled.div`
  background-color: ${getBackgroundColor};
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  margin-top: ${HEADER_HEIGHT}px;
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
  <Router history={history}>
    <ThemeProvider theme={{ mode: 'dark', size: 'normal' }}>
      <Fragment>
        <TopHeader />
        <Main>
          <Flex>
            <Box width={1 / 6}>
              <SideBar />
            </Box>
            <Box width={5 / 6}>
              <Switch>
                <Route exact path="/" component={TestListPage} />
                {addRoutes().map(route => (
                  <RouteWithSubRoutes key={route.path} {...route} />
                ))}
              </Switch>
            </Box>
          </Flex>
        </Main>
      </Fragment>
    </ThemeProvider>
  </Router>
);

export default App;
