import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import map from 'lodash/map';

import storeActiveTest from '../store/activeTest';
import storeTests, { testsPropTypes, testPropTypes } from '../store/tests';

import {
  getColor,
  getHeaderHeight,
  getPadding,
} from '../utils/theme';
import {
  getTestPathFromLocation,
  isPathnameInInstructions,
  withRouterProps,
} from '../utils/router';

import Container from '../elements/Container';
import Link from '../elements/Link';

const Nav = styled.nav`

`;

const StyledContainer = Container.extend`
  border-right: 1px solid ${getColor}10;
  height: calc(100vh - ${getHeaderHeight}px - (${getPadding}px * 2));

  h4 {
    margin-top: 0;
  }
`;

const Navigation = (props) => {
  const {
    testByPathName,
    tests,
  } = props;

  if (!testByPathName) {
    return (
      <Fragment>
        <h4>Tests available</h4>
        <Nav>
          {map(tests, test => (
            <li key={test.path}>
              <Link href={`/intro${test.path}`} to={`/intro${test.path}`}>
                {test.name}
              </Link>
            </li>
          ))}
        </Nav>
      </Fragment>
    );
  }

  if (isPathnameInInstructions(props)) {
    return (
      <Link
        margin="small"
        to={testByPathName.path}
        href={testByPathName.path}
      >
        Test
      </Link>
    );
  }

  return (
    <Link
      margin="small"
      to={`/intro${testByPathName.path}`}
      href={`/intro${testByPathName.path}`}
    >
      Instructions
    </Link>
  );
};

Navigation.propTypes = {
  ...testPropTypes,
  ...testsPropTypes,
};

const SideBar = props => (
  <StyledContainer padding="default">
    <Navigation {...props} />
  </StyledContainer>
);

SideBar.propTypes = {
  ...withRouterProps,
};

const mapStateToProps = (state, props) => ({
  testByPathName: storeTests.selectors.getTestByPathName(
    state,
    getTestPathFromLocation(props),
  ),
  tests: storeTests.selectors.getTests(state),
});

const mapDispatchToProps = {
  setActiveTest: storeActiveTest.actions.storeActiveTest,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(SideBar);
