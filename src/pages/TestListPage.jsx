import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import map from 'lodash/map';

import { TESTS } from '../constants/tests';

const TestListPage = () => (
  <Fragment>
    <h2>Tests available</h2>
    <ul>
      {map(TESTS, test => (
        <li key={test.href}>
          <Link href={`test/${test.href}/intro`} to={`test/${test.href}/intro`}>
            {test.name}
          </Link>
        </li>
      ))}
    </ul>
  </Fragment>
);

export default TestListPage;
