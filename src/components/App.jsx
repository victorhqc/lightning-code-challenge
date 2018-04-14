import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router';
import reduce from 'lodash/reduce';

import 'highlight.js/styles/monokai.css';

import storeTests, { testsPropTypes } from '../store/tests';

import TopHeader from './TopHeader';
import SideBar from './SideBar';

import { Flex, Box } from '../atoms/Grid';

import InstructionsPage from '../pages/InstructionsPage';
import TestPage from '../pages/TestPage';
import AboutPage from '../pages/AboutPage';

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

const addRoutes = tests => reduce(tests, (prev, test) => ([
  ...prev,
  {
    component: TestPage,
    path: test.path,
  },
  {
    path: `/intro${test.path}`,
    component: InstructionsPage,
  },
]), []);

const RouteWithSubRoutes = route => (
  <Route
    exact
    path={route.path}
    render={mapTest(route.component, route)}
  />
);

class App extends Component {
  constructor(props) {
    super(props);

    const {
      setDefaultTests,
    } = this.props;

    setDefaultTests();
  }

  render() {
    const {
      tests,
    } = this.props;

    return (
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
                {addRoutes(tests).map(route => (
                  <RouteWithSubRoutes key={route.path} {...route} />
                ))}
              </Switch>
            </Box>
          </Flex>
        </Main>
      </Fragment>
    );
  }
}

App.propTypes = {
  setDefaultTests: PropTypes.func.isRequired,
  ...testsPropTypes,
};

const mapStateToProps = state => ({
  tests: storeTests.selectors.getTests(state),
});

const mapDispatchToProps = {
  setDefaultTests: storeTests.actions.setDefaultTests,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
