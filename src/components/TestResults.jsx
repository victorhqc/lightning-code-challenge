import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import codeResults, {
  updatedAtProps,
  resultsProps,
} from '../store/codeResults';


import highlightCode from '../utils/highlightCode';

import RatioAsEmojis from './RatioAsEmojis';
import Container from '../atoms/Container';

const getPassingTests = ({ tests, passedTests }) =>
  `${passedTests} / ${tests.length}`;

const EngineerLevelContainer = styled.div`
  color: white;
  width: 100%;
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
`;

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

  renderGrade() {
    const { resultsData } = this.props;

    return (
      <EngineerLevelContainer
        ratio={resultsData.ratio}
      >
        <h2>
          <RatioAsEmojis ratio={resultsData.ratio} />
          <br />
          <small>Tests passing: {getPassingTests(resultsData)}</small>
        </h2>
      </EngineerLevelContainer>
    );
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
    return (
      <Container>
        {this.renderGrade()}
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
