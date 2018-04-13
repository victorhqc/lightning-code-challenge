import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import {
  Route,
  Switch,
} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import reduce from 'lodash/reduce';

import 'highlight.js/styles/monokai.css';

import TopHeader from './components/TopHeader';
import SideBar from './components/SideBar';

import { Flex, Box } from './elements/Grid';

import InstructionsPage from './pages/InstructionsPage';
import TestPage from './pages/TestPage';
import AboutPage from './pages/AboutPage';

import { TESTS } from './constants/tests';
import { HEADER_HEIGHT } from './constants/theme';

import { getBackgroundColor } from './utils/theme';

import configureStore from './store';

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

const store = configureStore({}, history);

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
    component: InstructionsPage,
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
  <Provider store={store}>
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
                  <Route exact path="/" component={AboutPage} />
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
  </Provider>
);

export default App;
