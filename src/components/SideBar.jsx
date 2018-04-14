import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { mapProps } from 'recompose';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import map from 'lodash/map';
import isEqual from 'lodash/isEqual';

import storeActiveTest from '../store/activeTest';
import storeTests, { testsPropTypes, testPropTypes } from '../store/tests';
import codeResults, { resultsProps } from '../store/codeResults';

import {
  getColor,
  getHeaderHeight,
  getMargin,
} from '../utils/theme';
import {
  getTestPathFromLocation,
  isPathnameInInstructions,
  withRouterProps,
} from '../utils/router';

import Container from '../atoms/Container';
import List from '../atoms/List';

import RatioAsEmojis from './RatioAsEmojis';

const localPropTypes = {
  locationIn: PropTypes.oneOf(['home', 'instructions', 'test']).isRequired,
};

const Nav = styled.nav`

`;

const StyledContainer = Container.extend`
  border-right: 1px solid ${getColor}10;
  height: calc(100vh - ${getHeaderHeight}px);

  h4 {
    margin-top: 0;
  }
`;

const Results = ({ locationIn, resultsData }) => {
  if (locationIn !== 'test') {
    return null;
  }

  return (
    <Container padding="default">
      <h4>Results</h4>
      <RatioAsEmojis ratio={resultsData.ratio} />
      <p>
        Tests passing:
        {' '}
        {resultsData.passedTests}
        {' / '}
        {resultsData.tests.length}
      </p>
    </Container>
  );
};

Results.propTypes = {
  ...localPropTypes,
  ...resultsProps,
};

const SubElement = List.Element.extend`
  margin-left: ${getMargin}px;
`;

SubElement.defaultProps = {
  margin: 'small',
  padding: 'small',
};

const isTestActive = ({ test, testByPathName }) => {
  if (!testByPathName) {
    return false;
  }

  return test.name === testByPathName.name;
};

const NavigationData = ({ test, testByPathName, locationIn }) => {
  if (
    locationIn === 'home'
    || !(isTestActive({ test, testByPathName }))
  ) {
    return null;
  }

  return (
    <Fragment>
      <SubElement active={locationIn === 'instructions' ? 'active' : 'default'}>
        <List.Link
          margin="small"
          to={`/intro${testByPathName.path}`}
          href={`/intro${testByPathName.path}`}
        >
          Instructions
        </List.Link>
      </SubElement>
      <SubElement active={locationIn === 'test' ? 'active' : 'default'}>
        <List.Link
          margin="small"
          to={testByPathName.path}
          href={testByPathName.path}
        >
          Test
        </List.Link>
      </SubElement>
    </Fragment>
  );
};

NavigationData.propTypes = {
  ...localPropTypes,
  ...testPropTypes,
};

const Navigation = ({ tests, ...restOfProps }) => (
  <Container padding="default">
    <h4>Tests available</h4>
    <Nav>
      <List>
        {map(tests, test => (
          <Fragment key={test.path}>
            <List.Element
              active={isTestActive({ test, ...restOfProps }) ? 'active' : 'default'}
            >
              <List.Link href={`/intro${test.path}`} to={`/intro${test.path}`}>
                {test.name}
              </List.Link>
            </List.Element>
            <NavigationData
              test={test}
              {...restOfProps}
            />
          </Fragment>
        ))}
      </List>
    </Nav>
  </Container>
);

Navigation.propTypes = {
  ...testsPropTypes,
  ...testPropTypes,
};

class SideBar extends Component {
  constructor(props) {
    super(props);

    const {
      setActiveTest,
      testByPathName,
      locationIn,
    } = props;

    if (locationIn === 'instructions' || locationIn === 'test') {
      setActiveTest(testByPathName.name);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      testByPathName,
      setActiveTest,
    } = this.props;

    if (
      nextProps.testByPathName
      && !isEqual(testByPathName, nextProps.testByPathName)
    ) {
      setActiveTest(nextProps.testByPathName.name);
    }
  }

  render() {
    return (
      <StyledContainer>
        <Navigation {...this.props} />
        <Results {...this.props} />
      </StyledContainer>
    );
  }
}

SideBar.propTypes = {
  ...localPropTypes,
  ...withRouterProps,
};

const mapStateToProps = (state, props) => ({
  testByPathName: storeTests.selectors.getTestByPathName(state)(getTestPathFromLocation(props)),
  tests: storeTests.selectors.getTests(state),
  resultsData: codeResults.selectors.getData(state),
});

const mapDispatchToProps = {
  setActiveTest: storeActiveTest.actions.setActiveTest,
};

const getLocationStatus = (props) => {
  if (!props.testByPathName) {
    return 'home';
  }

  if (isPathnameInInstructions(props)) {
    return 'instructions';
  }

  return 'test';
};

const mappedProps = mapProps(props => ({
  ...props,
  locationIn: getLocationStatus(props),
}));

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  mappedProps,
)(SideBar);
