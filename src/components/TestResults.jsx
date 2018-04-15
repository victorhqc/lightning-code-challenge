import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import isEmpty from 'lodash/isEmpty';

import codeResults, {
  updatedAtProps,
  resultsProps,
} from '../store/codeResults';

import { getMargin, getPadding, getComplementBackgroundColor } from '../utils/theme';

import highlightCode from '../utils/highlightCode';

import Container from '../atoms/Container';
import { H1, H3 } from '../atoms/Headings';
import List from '../atoms/List';
import Sticky from '../atoms/Sticky';

const NoTestsTitle = H1.extend`
  text-align: center;
  margin-top: ${getMargin}px;
`;

const TestsContainer = Container.extend`
  overflow: auto;
  height: calc(100% - ${props => props.height + getPadding(props)}px);
  padding-top: ${props => props.height}px;
`;

const TestListElement = List.Element.extend`
  &:nth-child(even) {
    background-color: ${getComplementBackgroundColor};
  }

  h4 {
    margin: 0;
  }
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
      <List>
        {resultsData.tests.map(({
          name,
          error,
          isFailed,
        }) => (
          <TestListElement
            clickable={false}
            key={name}
          >
            <ReactMarkdown
              source={`#### ${isFailed ? '❗️' : '✅'} ${name}
${isFailed ? error : ''}`}
            />
          </TestListElement>
        ))}
      </List>
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
      <Fragment>
        <Sticky height="40px">
          <Container padding="small">
            <H3>Test results</H3>
          </Container>
        </Sticky>
        <TestsContainer padding="small" height={40}>
          {this.renderTestResults()}
        </TestsContainer>
      </Fragment>
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
