import React from 'react';
import { Link } from 'react-router-dom';
import map from 'lodash/map';

import Container from '../elements/Container';

import { TESTS } from '../constants/tests';

const TestListPage = () => (
  <Container>
    <h2>Tests available</h2>
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
