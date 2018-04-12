import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import Link from '../elements/Link';

import highlightCode from '../utils/highlightCode';

const INTRO = `
# Lightning Code Challenge

## Introduction
Follow the instructions to write the piece of code instructed. The more
tests it passes, the better score you'll get.

## Objective
Your code needs to pass as many unit tests as possible. You don't need to
write them, they are already ready for you, so no need to do anything there.
Just focus on finishing as much as possible.
`;

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
      <Fragment>
        <ReactMarkdown source={INTRO} />
        <ReactMarkdown source={instructions} />
        <br />
        <Link to={path} href={path}>
          Start test!
        </Link>
      </Fragment>
    );
  }
}

IntroductionPage.propTypes = {
  instructions: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default IntroductionPage;
