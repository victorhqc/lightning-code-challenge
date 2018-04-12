import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  getComplementBackgroundColor,
  getComplementColor,
} from '../utils/theme';

import { HEADER_HEIGHT } from '../constants/theme';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background-color: ${getComplementBackgroundColor};
`;

const Brand = styled.div`
  color: ${getComplementColor};
  font-size: 1.4em;
  padding-top: 10px;
  padding-left: 10px;
  font-weight: lighter;

  a {
    text-decoration: none;
    color: ${getComplementColor};
  }

  span {
    color: #ebd60e;
  }
`;

const TopHeader = () => (
  <Header>
    <Brand>
      <Link to="/" href="/">
        <span role="img" aria-label="lightning">
          ⚡
        </span>
        code challenge
      </Link>
    </Brand>
  </Header>
);

export default TopHeader;
