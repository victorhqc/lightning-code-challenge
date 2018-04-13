import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  getColor,
  getPadding,
  paddingProps,
} from '../utils/theme';

const Container = styled.div`
  color: ${getColor};
  padding: ${getPadding}px;
`;

Container.propTypes = {
  noBackground: PropTypes.bool,
  ...paddingProps,
};

export default Container;
