import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Flex as GridFlex,
  Box as GridBox,
} from 'grid-styled';

import {
  getMargin,
  marginProps,
  getMarginY,
  marginYProps,
  getMarginX,
  marginXProps,
} from '../utils/theme';

const StyledFlex = ({ className, children, ...restOfProps }) => (
  <GridFlex
    {...restOfProps}
    className={className}
  >
    {children}
  </GridFlex>
);

StyledFlex.defaultProps = {
  children: null,
};

StyledFlex.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
};


export const Flex = styled(StyledFlex)`
  height: 100%;

  margin: ${getMargin}px;
  margin-top: ${getMarginY}px;
  margin-bottom: ${getMarginY}px;
  margin-left: ${getMarginX}px;
  margin-right: ${getMarginX}px;
`;

Flex.propTypes = {
  ...marginProps,
  ...marginYProps,
  ...marginXProps,
};

const StyledBox = ({ className, children, ...restOfProps }) => (
  <GridBox
    {...restOfProps}
    className={className}
  >
    {children}
  </GridBox>
);

StyledBox.defaultProps = {
  children: null,
};

StyledBox.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
};


export const Box = styled(StyledBox)`
  height: 100%;

  margin: ${getMargin}px;
  margin-top: ${getMarginY}px;
  margin-bottom: ${getMarginY}px;
  margin-left: ${getMarginX}px;
  margin-right: ${getMarginX}px;
`;

Box.propTypes = {
  ...marginProps,
  ...marginYProps,
  ...marginXProps,
};
