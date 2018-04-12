import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as ReactRouterLink } from 'react-router-dom';

import { getColor } from '../utils/theme';

const Link = ({ className, children, ...restOfProps }) => (
  <ReactRouterLink
    {...restOfProps}
    className={className}
  >
    {children}
  </ReactRouterLink>
);

Link.defaultProps = {
  children: null,
};

Link.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.element,
};

const StyledLink = styled(Link)`
  color: ${getColor};
`;

export default StyledLink;
