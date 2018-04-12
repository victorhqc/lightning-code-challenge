import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import highlightCode from './utils/highlightCode';

import Button from './elements/Button';

import testCases from '../test/testCases';

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
  if (ratio < 4 / 5) {
    return COLORS.green;
  }

  // 4 / 5 tests or all tests pass
  return COLORS.blue;
};

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
  margin: none;
  list-style: none;
  padding: none;
`;

const TestResult = styled.li`
  color: white;
  background-color: ${getTestResultColor};
`;

class TestsResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ratio: 0,
      tests: [],
    };

    this.doRefreshResults = this.doRefreshResults.bind(this);
  }

  componentDidUpdate() {
    highlightCode();
  }

  doRefreshResults() {
    const {
      code,
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
        <h2>Engineer level</h2>
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
      <Fragment>
        {this.renderEngineerLevel()}
        {this.renderTestResults()}
        <Button onClick={this.doRefreshResults}>Refresh results</Button>
      </Fragment>
    );
  }
}

TestsResults.propTypes = {
  code: PropTypes.string.isRequired,
};

export default TestsResults;
