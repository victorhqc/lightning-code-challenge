import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import { getColor } from '../utils/theme';
import {
  getTestPathFromLocation,
  isPathnameInInstructions,
  withRouterProps,
} from '../utils/router';

import Container from '../elements/Container';
import Link from '../elements/Link';

const Nav = styled.nav`

`;

const StyledContainer = Container.extend`
  border-right: 1px solid ${getColor}10;
  height: 100vh;

  h4 {
    margin-top: 0;
  }
`;

const Navigation = (props) => {
  const testPathname = getTestPathFromLocation(props);
  if (!testPathname) {
    return null;
  }

  if (isPathnameInInstructions(props)) {
    return (
      <Link
        margin="small"
        to={testPathname}
        href={testPathname}
      >
        Test
      </Link>
    );
  }

  return (
    <Link
      margin="small"
      to={`/intro${testPathname}`}
      href={`/intro${testPathname}`}
    >
      Instructions
    </Link>
  );
};

const SideBar = props => (
  <StyledContainer padding="default">
    <h4>Meta</h4>
    <Navigation {...props} />
  </StyledContainer>
);

SideBar.propTypes = {
  ...withRouterProps,
};

export default withRouter(SideBar);
