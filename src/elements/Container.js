import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  getColor,
  getPadding,
  paddingProps,

  getMargin,
  marginProps,
  getMarginY,
  marginYProps,
  getMarginX,
  marginXProps,
} from '../utils/theme';

const Container = styled.div`
  color: ${getColor};
  padding: ${getPadding}px;
  height: 100%;

  margin: ${getMargin}px;
  margin-top: ${getMarginY}px;
  margin-bottom: ${getMarginY}px;
  margin-left: ${getMarginX}px;
  margin-right: ${getMarginX}px;
`;

Container.propTypes = {
  noBackground: PropTypes.bool,
  ...paddingProps,
  ...marginProps,
  ...marginYProps,
  ...marginXProps,
};

export default Container;
