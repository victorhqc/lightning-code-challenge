import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const RatioAsEmojis = ({ ratio }) => {
  if (ratio < 1 / 5) {
    return (
      <Fragment>
        <span role="img" aria-label="disappointed">
          😞
        </span>
        {' '}
        <span role="img" aria-label="potato">
          🥔
        </span>
      </Fragment>
    );
  }

  if (ratio < 1 / 2) {
    return (
      <Fragment>
        <span role="img" aria-label="neutral">
          😐
        </span>
        {' '}
        <span role="img" aria-label="shrimp">
          🍤
        </span>
      </Fragment>
    );
  }

  if (ratio < 1) {
    return (
      <Fragment>
        <span role="img" aria-label="Slightly Smiling Face">
          🙂
        </span>
        {' '}
        <span role="img" aria-label="Taco">
          🌮
        </span>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <span role="img" aria-label="Smiling Face With Sunglasses">
        😎
      </span>
      {' '}
      <span role="img" aria-label="Pancakes">
        🥞
      </span>
    </Fragment>
  );
};

RatioAsEmojis.propTypes = {
  ratio: PropTypes.number.isRequired,
};

export default RatioAsEmojis;
