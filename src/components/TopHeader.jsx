import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  getComplementBackgroundColor,
  getBackgroundColor,
  getComplementColor,
  getAccentColor,

  getMargin,
  marginProps,

  getPadding,
  paddingProps,
} from '../utils/theme';
import {
  getTestPathFromLocation,
  isPathnameInInstructions,
  withRouterProps,
} from '../utils/router';

import codeResults from '../store/codeResults';

import Link from '../elements/Link';

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

const Button = styled.button`
  background-color: transparent;
  color: ${getComplementColor};
  border: none;
  cursor: pointer;
  outline: none;
  height: 100%;
  font-size: 0.9em;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid ${getAccentColor};
  }

  &:active {
    background: ${getBackgroundColor};
  }
`;

const Nav = styled.nav`
  margin-left: ${getMargin}px;

  a {
    text-decoration: none;
    color: ${getComplementColor};
  }
`;

Nav.propTypes = {
  ...marginProps,
};

const Navigation = (props) => {
  const testPathname = getTestPathFromLocation(props);
  if (!testPathname || isPathnameInInstructions(props)) {
    return null;
  }

  return (
    <Nav margin="large">
      <Button onClick={props.setCodeUpdatedAt}>
        <span role="img" aria-label="">
          🔥
        </span>
        {' '}Run
      </Button>
    </Nav>
  );
};

Navigation.propTypes = {
  ...withRouterProps,
};

const TopHeader = props => (
  <Header>
    <Brand padding="default">
      <Link to="/" href="/">
        <span role="img" aria-label="lightning">
          ⚡
        </span>
        Code Challenge
      </Link>
    </Brand>
    <Navigation {...props} />
  </Header>
);

const mapDispatchToProps = {
  setCodeUpdatedAt: () => codeResults.actions.setUpdatedAt(Date.now()),
};

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(TopHeader);
