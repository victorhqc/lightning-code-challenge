/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { Component, Fragment } from 'react';
import map from 'lodash/map';
import ReactMarkdown from 'react-markdown';

import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow.css';

import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

import Link from './elements/Link';

const introductionText = `
# Hello Fresh Lightning Code Challenge

## Introduction
Follow the instructions to write the piece of code instructed. The more
tests it passes, the better score you'll get.

## Objective
Your code needs to pass as many unit tests as possible. You don't need to
write them, they are already ready for you, so no need to do anything there.
Just focus on finishing as much as possible.

## Instructions
Write a function called **parseElements** that receive an array of objects and
applies the following rules:
- It returns a new object with keys based in the element's type, i.e.
  \`\`\`js
  var array = [{type: 'foo'}, {type: 'bar'}];
  // returns
  var parsedObject = {
    foo: [{ type: 'foo' }],
    bar: [{ type: 'bar' }]
  };
  \`\`\`
- The elements inside the new arrays should be ordered by name.
- The elements that have **isActive** as false, should not be included.
- No mutations should exist.

_Additional Notes: Use any additional function you see fit to accomplish the result._
`;

class Introduction extends Component {
  componentDidMount() {
    const codeBlocks = document.getElementsByClassName('language-js');
    map(codeBlocks, codeBlock => hljs.highlightBlock(codeBlock));
  }

  render() {
    return (
      <Fragment>
        <ReactMarkdown source={introductionText} />
        <br />
        <Link to="/test">
          Start test!
        </Link>
      </Fragment>
    );
  }
}

export default Introduction;
