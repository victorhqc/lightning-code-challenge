import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import isEmpty from 'lodash/isEmpty';

import codeResults, {
  updatedAtProps,
  resultsProps,
} from '../store/codeResults';

import { getMargin } from '../utils/theme';

import highlightCode from '../utils/highlightCode';

import Container from '../atoms/Container';
import { H1 } from '../atoms/Headings';

const TestResultsContainer = styled.ul`
  margin: 0;
  list-style: none;
  padding: 0;
  overflow: auto;
`;

const TestResult = styled.li`
  color: white;
  padding: 5px;
`;

const NoTestsTitle = H1.extend`
  text-align: center;
  margin-top: ${getMargin}px;
`;

const EmptyResults = () => (
  <Container verticalAlign style={{ height: '100%' }}>
    <NoTestsTitle margin="xlarge">
      Run{' '}
      <span role="img" aria-label="">
        🔥
      </span>
      {' '}your code to see the results
    </NoTestsTitle>
  </Container>
);

class TestsResults extends Component {
  constructor(props) {
    super(props);

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
      setData,
    } = this.props;

    const results = testCases(code);
    setData(results);
  }

  renderTestResults() {
    const { resultsData } = this.props;

    return (
      <TestResultsContainer>
        {resultsData.tests.map(({
          name,
          error,
          isFailed,
        }) => (
          <TestResult
            key={name}
          >
            <ReactMarkdown
              source={`### ${isFailed ? '⚠️' : '👌'} ${name}
${isFailed ? error : ''}`}
            />
          </TestResult>
        ))}
      </TestResultsContainer>
    );
  }

  render() {
    const { resultsData } = this.props;

    if (isEmpty(resultsData.tests)) {
      return (
        <EmptyResults />
      );
    }

    return (
      <Container padding="default">
        {this.renderTestResults()}
      </Container>
    );
  }
}

TestsResults.propTypes = {
  code: PropTypes.string.isRequired,
  testCases: PropTypes.func.isRequired,

  ...resultsProps,
  ...updatedAtProps,
};

const mapStateToprops = state => ({
  updatedAt: codeResults.selectors.getUpdatedAt(state),
  resultsData: codeResults.selectors.getData(state),
});

const mapDispatchToProps = {
  setData: codeResults.actions.setData,
};

export default connect(mapStateToprops, mapDispatchToProps)(TestsResults);
