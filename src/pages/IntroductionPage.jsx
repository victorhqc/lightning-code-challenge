import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import Link from '../elements/Link';

import highlightCode from '../utils/highlightCode';

class IntroductionPage extends Component {
  componentDidMount() {
    highlightCode();
  }

  render() {
    const {
      instructions,
      href,
    } = this.props;

    return (
      <Fragment>
        <h1>Hello Fresh Lightning Code Challenge</h1>
        <ReactMarkdown source={instructions} />
        <br />
        <Link to={href} href={href}>
          Start test!
        </Link>
      </Fragment>
    );
  }
}

IntroductionPage.propTypes = {
  instructions: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default IntroductionPage;
