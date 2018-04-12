import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import Link from '../elements/Link';

import highlightCode from '../utils/highlightCode';

const INTRO = `
# Lightning Code Challenge

## Introduction
Welcome to the lightning challenge, this application will try to test your JavaScript knowledge.
You'll have to write code that passes the predefined unit tests for it. The more tests your code
passes, the better score you'll get.

## Objective
Your code needs to pass as many unit tests as possible. You don't need to
write them, they are already ready for you. Just focus on writing the implementation.

## Additional notes

You can go back to the instructions as many times as you need, all the code you write is
saved every time you refresh the results of your code. **You have 30 minutes to solve the test.**
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
