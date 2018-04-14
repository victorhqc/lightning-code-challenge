import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as ReactRouterLink } from 'react-router-dom';

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
  border: none;
  border-radius: 3px;
  color: white;
  background-color: #06d6a0;
  font-size: 2em;
  padding: 15px;
  cursor: pointer;

  &:hover {
    background-color: #05b083;
  }

  &:active {
    background-color: #047558;
  }
`;

export default StyledLink;
