import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const EmojisWrapper = styled.h1`
  margin: 0;
`;

const RatioAsEmojis = ({ ratio }) => {
  if (ratio < 1 / 5) {
    return (
      <EmojisWrapper>
        <span role="img" aria-label="disappointed">
          😞
        </span>
        {' '}
        <span role="img" aria-label="potato">
          🥔
        </span>
      </EmojisWrapper>
    );
  }

  if (ratio < 1 / 2) {
    return (
      <EmojisWrapper>
        <span role="img" aria-label="Thinking">
          🤔
        </span>
        {' '}
        <span role="img" aria-label="shrimp">
          🍤
        </span>
      </EmojisWrapper>
    );
  }

  if (ratio < 1) {
    return (
      <EmojisWrapper>
        <span role="img" aria-label="omg">
          😱
        </span>
        {' '}
        <span role="img" aria-label="Burrito">
          🌯
        </span>
      </EmojisWrapper>
    );
  }

  return (
    <EmojisWrapper>
      <span role="img" aria-label="Smiling Face With Sunglasses">
        😎
      </span>
      {' '}
      <span role="img" aria-label="Cake">
        🍰
      </span>
    </EmojisWrapper>
  );
};

RatioAsEmojis.propTypes = {
  ratio: PropTypes.number.isRequired,
};

export default RatioAsEmojis;
