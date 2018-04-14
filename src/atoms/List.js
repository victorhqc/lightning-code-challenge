import styled from 'styled-components';

import {
  getPadding,
  getComplementBackgroundColor,
  getActiveBorder,
  getActiveBackgroundColor,
} from '../utils/theme';

import Link from './Link';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Element = styled.li`
  padding: ${getPadding}px;
  cursor: pointer;
  background-color: ${getActiveBackgroundColor};
  border-left: 2px solid ${getActiveBorder};

  &:hover {
    background-color: ${getComplementBackgroundColor};
  }
`;

Element.defaultProps = {
  padding: 'small',
  active: 'default',
};

List.Element = Element;

const LinkElement = Link.extend`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
`;

List.Link = LinkElement;

export default List;
