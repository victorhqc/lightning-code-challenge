import React from 'react';
import styled from 'styled-components';
import {
  Route,
  Switch,
} from 'react-router';
import reduce from 'lodash/reduce';

import 'highlight.js/styles/monokai.css';

import SideBar from './SideBar';

import { Flex, Box } from '../elements/Grid';

import InstructionsPage from '../pages/InstructionsPage';
import TestPage from '../pages/TestPage';
import AboutPage from '../pages/AboutPage';

import { TESTS } from '../constants/tests';

import {
  getBackgroundColor,
  getAllHeight,
  getHeaderHeight,
} from '../utils/theme';

const Main = styled.div`
  background-color: ${getBackgroundColor};
  width: 100%;
  height: ${getAllHeight};
  margin-top: ${getHeaderHeight}px;
`;


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
);

export default App;
