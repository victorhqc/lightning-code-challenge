import React, { Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import map from 'lodash/map';

import { TESTS } from '../constants/tests';

import {
  getColor,
  getHeaderHeight,
  getPadding,
} from '../utils/theme';
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
  height: calc(100vh - ${getHeaderHeight}px - (${getPadding}px * 2));

  h4 {
    margin-top: 0;
  }
`;

const Navigation = (props) => {
  const testPathname = getTestPathFromLocation(props);
  if (!testPathname) {
    return (
      <Fragment>
        <h4>Tests available</h4>
        <Nav>
          {map(TESTS, test => (
            <li key={test.path}>
              <Link href={`/intro${test.path}`} to={`/intro${test.path}`}>
                {test.name}
              </Link>
            </li>
          ))}
        </Nav>
      </Fragment>
    );
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
    <Navigation {...props} />
  </StyledContainer>
);

SideBar.propTypes = {
  ...withRouterProps,
};

export default withRouter(SideBar);
