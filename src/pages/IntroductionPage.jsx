import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import Container from '../elements/Container';
import Link from '../elements/Link';

import highlightCode from '../utils/highlightCode';

class IntroductionPage extends Component {
  componentDidMount() {
    highlightCode();
  }

  render() {
    const {
      instructions,
      path,
    } = this.props;

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
  instructions: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default IntroductionPage;
