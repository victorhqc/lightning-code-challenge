import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getColor } from '../utils/theme';

const Container = styled.div`
  color: ${getColor};
`;

Container.propTypes = {
  noBackground: PropTypes.bool,
};

export default Container;
