import React from 'react';
import ReactMarkdown from 'react-markdown';

import Container from '../atoms/Container';

const INTRO = `
# Lightning Code Challenge

## Introduction
Welcome to the lightning challenge, this application will try to test your JavaScript knowledge.
You'll have to write code that passes the predefined unit tests for it. The more tests your code
passes, the better score you'll get.

## Objective
Your code needs to pass as many unit tests as possible. You don't need to
write them, they are already ready for you. Just focus on writing the implementation.
`;

const TestListPage = () => (
  <Container padding="default">
    <ReactMarkdown source={INTRO} />
  </Container>
);

export default TestListPage;
