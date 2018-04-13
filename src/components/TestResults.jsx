import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import codeResults, { updatedAtProps } from '../store/codeResults';

import highlightCode from '../utils/highlightCode';

import Container from '../elements/Container';

const COLORS = {
  red: '#ef476f',
  yellow: '#ffd166',
  green: '#06d6a0',
  blue: '#118ab2',
};

const getEngineerLevelColor = ({ ratio }) => {
  // const ratio =  testsPassed / totalTests;

  // Less than a fifth the tests pass
  if (ratio < 1 / 5) {
    return COLORS.red;
  }

  // one fifth tests pass but less than half
  if (ratio < 1 / 2) {
    return COLORS.yellow;
  }

  // One half tests pass but less than 4 / 5
  if (ratio < 1) {
    return COLORS.green;
  }

  // all tests pass
  return COLORS.blue;
};

const getEngineerLevel = ({ ratio }) => {
  if (ratio < 1 / 5) {
    return 'junior';
  }

  if (ratio < 1 / 2) {
    return 'mid';
  }

  if (ratio < 1) {
    return 'mid-high';
  }

  return 'senior';
};

const getPassingTests = ({ tests, passedTests }) =>
  `${passedTests} / ${tests.length}`;

const getTestResultColor = ({ isFailed }) => {
  if (isFailed) {
    return COLORS.red;
  }

  return COLORS.green;
};

const EngineerLevelContainer = styled.div`
  color: white;
  width: 100%;
  background-color: ${getEngineerLevelColor};
`;

const TestResultsContainer = styled.ul`
  margin: 0;
  list-style: none;
  padding: 0;
  overflow: auto;
`;

const TestResult = styled.li`
  color: white;
  padding: 5px;
  background-color: ${getTestResultColor};
`;

class TestsResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ratio: 0,
      passedTests: 0,
      tests: [],
    };

    this.doRefreshResults = this.doRefreshResults.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      updatedAt,
    } = this.props;

    if (updatedAt !== nextProps.updatedAt) {
      this.doRefreshResults();
    }
  }

  componentDidUpdate() {
    highlightCode();
  }

  doRefreshResults() {
    const {
      code,
      testCases,
    } = this.props;

    this.setState({
      ...testCases(code),
    });
  }

  renderEngineerLevel() {
    const { ratio } = this.state;

    return (
      <EngineerLevelContainer
        ratio={ratio}
      >
        <h2>
          Engineer level: {getEngineerLevel({ ratio })}
          <br />
          <small>Tests passing: {getPassingTests(this.state)}</small>
        </h2>
      </EngineerLevelContainer>
    );
  }

  renderTestResults() {
    const { tests } = this.state;

    return (
      <TestResultsContainer>
        {tests.map(({
          name,
          error,
          ...restOfTest
        }) => (
          <TestResult
            key={name}
            {...restOfTest}
          >
            <ReactMarkdown
              source={`### ${name}
${restOfTest.isFailed ? error : ''}
`}
            />
          </TestResult>
        ))}
      </TestResultsContainer>
    );
  }

  render() {
    return (
      <Container>
        {this.renderEngineerLevel()}
        {this.renderTestResults()}
      </Container>
    );
  }
}

TestsResults.propTypes = {
  code: PropTypes.string.isRequired,
  testCases: PropTypes.func.isRequired,

  ...updatedAtProps,
};

const mapStateToprops = state => ({
  updatedAt: codeResults.selectors.getUpdatedAt(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToprops, mapDispatchToProps)(TestsResults);
