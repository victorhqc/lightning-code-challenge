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

const verticalAlign = (props) => {
  if (!props.verticalAlign) {
    return null;
  }

  return `
    display: flex;
    justify-content: center;
    flex-direction: column;
  `;
};

const Container = styled.div`
  color: ${getColor};
  padding: ${getPadding}px;

  margin: ${getMargin}px;
  margin-top: ${getMarginY}px;
  margin-bottom: ${getMarginY}px;
  margin-left: ${getMarginX}px;
  margin-right: ${getMarginX}px;

  ${verticalAlign}
`;

Container.propTypes = {
  noBackground: PropTypes.bool,
  ...paddingProps,
  ...marginProps,
  ...marginYProps,
  ...marginXProps,
};

export default Container;
