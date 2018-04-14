import styled from 'styled-components';

import { getMargin } from '../utils/theme';

const headingStyles = `
  margin-top: 0;
  margin-bottom: ${getMargin}px;
`;

export const H1 = styled.h1`
  ${headingStyles}
`;

export const H2 = styled.h2`
  ${headingStyles}
`;

export const H3 = styled.h3`
  ${headingStyles}
`;

export const H4 = styled.h4`
  ${headingStyles}
`;
