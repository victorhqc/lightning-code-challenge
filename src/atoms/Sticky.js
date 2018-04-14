import styled from 'styled-components';

import { getBackgroundColor } from '../utils/theme';

const Sticky = styled.div`
  position: fixed;
  height: ${props => props.height};
  width: 100%;

  background-color: ${getBackgroundColor};
`;

export default Sticky;
