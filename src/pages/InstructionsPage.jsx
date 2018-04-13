import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import storeActiveTest, { activeTestProps } from '../store/activeTest';

import Container from '../elements/Container';
import Link from '../elements/Link';

import highlightCode from '../utils/highlightCode';

class IntroductionPage extends Component {
  componentDidMount() {
    highlightCode();
  }

  render() {
    const {
      activeTest,
    } = this.props;

    if (!activeTest) {
      return null;
    }

    const {
      instructions,
      path,
    } = activeTest;

    return (
      <Container padding="default">
        <ReactMarkdown source={instructions} />
        <br />
        <Link to={path} href={path}>
          Start test!
        </Link>
      </Container>
    );
  }
}

IntroductionPage.propTypes = {
  ...activeTestProps,
};

const mapStateToProps = state => ({
  activeTest: storeActiveTest.selectors.getActiveTest(state),
});

export default connect(mapStateToProps)(IntroductionPage);
