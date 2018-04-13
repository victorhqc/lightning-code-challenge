import React, { Fragment, Component } from 'react';
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

const RatioAsEmoji = ({ ratio }) => {
  if (ratio < 1 / 5) {
    return (
      <Fragment>
        <span role="img" aria-label="disappointed">
          😞
        </span>
        <span role="img" aria-label="potato">
          🥔
        </span>
      </Fragment>
    );
  }

  if (ratio < 1 / 2) {
    return (
      <Fragment>
        <span role="img" aria-label="neutral">
          😐
        </span>
        <span role="img" aria-label="shrimp">
          🍤
        </span>
      </Fragment>
    );
  }

  if (ratio < 1) {
    return (
      <Fragment>
        <span role="img" aria-label="Slightly Smiling Face">
          🙂
        </span>
        <span role="img" aria-label="Taco">
          🌮
        </span>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <span role="img" aria-label="Smiling Face With Sunglasses">
        😎
      </span>
      <span role="img" aria-label="Pancakes">
        🥞
      </span>
    </Fragment>
  );
};

RatioAsEmoji.propTypes = {
  ratio: PropTypes.number.isRequired,
};

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

  renderGrade() {
    const { ratio } = this.state;

    return (
      <EngineerLevelContainer
        ratio={ratio}
      >
        <h2>
          <RatioAsEmoji ratio={ratio} />
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
        {this.renderGrade()}
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
