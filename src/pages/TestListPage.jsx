import React from 'react';
import map from 'lodash/map';
import ReactMarkdown from 'react-markdown';

import Container from '../elements/Container';
import Link from '../elements/Link';

import { TESTS } from '../constants/tests';

const INTRO = `
# Lightning Code Challenge

## Introduction
Welcome to the lightning challenge, this application will try to test your JavaScript knowledge.
You'll have to write code that passes the predefined unit tests for it. The more tests your code
passes, the better score you'll get.

## Objective
Your code needs to pass as many unit tests as possible. You don't need to
write them, they are already ready for you. Just focus on writing the implementation.

## Tests available
`;

const TestListPage = () => (
  <Container padding="default">
    <ReactMarkdown source={INTRO} />
    <ul>
      {map(TESTS, test => (
        <li key={test.path}>
          <Link href={`/intro${test.path}`} to={`/intro${test.path}`}>
            {test.name}
          </Link>
        </li>
      ))}
    </ul>
  </Container>
);

export default TestListPage;
