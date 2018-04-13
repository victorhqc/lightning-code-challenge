import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import {
  getComplementBackgroundColor,
  getComplementColor,

  getMargin,
  marginProps,

  getPadding,
  paddingProps,
} from '../utils/theme';

import Link from './Link';

import { HEADER_HEIGHT } from '../constants/theme';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background-color: ${getComplementBackgroundColor};
  display: flex;
`;

const Brand = styled.div`
  color: ${getComplementColor};
  font-size: 1.4em;
  padding-top: 10px;
  padding-left: ${getPadding}px;
  font-weight: lighter;

  a {
    text-decoration: none;
    color: ${getComplementColor};
  }

  span {
    color: #ebd60e;
  }
`;

Brand.propTypes = {
  ...paddingProps,
};

const Nav = styled.nav`
  padding-top: 18px;
  margin-left: ${getMargin}px;

  a {
    text-decoration: none;
    color: ${getComplementColor};
  }
`;

Nav.propTypes = {
  ...marginProps,
};

const Navigation = ({ location }) => {
  const { pathname } = location;

  if (
    !pathname
    || pathname === '/'
  ) {
    return null;
  }

  const pathnameMatch = pathname.match(/\/[a-z-]+/g);
  const testPathname = pathnameMatch[pathnameMatch.length - 1];

  return (
    <Nav margin="large">
      <Link
        margin="small"
        to={`/intro${testPathname}`}
        href={`/intro${testPathname}`}
      >
        Introduction
      </Link>
      <Link
        margin="small"
        to={testPathname}
        href={testPathname}
      >
        Test
      </Link>
    </Nav>
  );
};

Navigation.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const TopHeader = props => (
  <Header>
    <Brand padding="default">
      <Link to="/" href="/">
        <span role="img" aria-label="lightning">
          ⚡
        </span>
        code challenge
      </Link>
    </Brand>
    <Navigation {...props} />
  </Header>
);

export default withRouter(TopHeader);
