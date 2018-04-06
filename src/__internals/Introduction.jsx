/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { Fragment } from 'react';

import Link from './elements/Link';

const Introduction = () => (
  <Fragment>
    <h1>Hello Fresh Lightning Code Challenge</h1>
    <h2>Introduction</h2>
    <p>
      {`Follow the instructions to write the piece of code instructed. The more
      tests it passes, the better score you'll get.`}
    </p>
    <h2>Objective</h2>
    {`Your code needs to pass as many unit tests as possible. You don't need to
    write them, they are already ready for you, so no need to do anything there.
    Just focus on finishing as much as possible.`}
    <h2>Instructions</h2>
    <Link to="/test">
      Start test!
    </Link>
  </Fragment>
);

export default Introduction;
