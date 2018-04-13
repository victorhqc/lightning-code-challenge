/* eslint import/prefer-default-export: 0 */

import PropTypes from 'prop-types';

export const getValidLocationMatch = ({ location }) => {
  const { pathname } = location;

  if (
    !pathname
    || pathname === '/'
  ) {
    return null;
  }

  return pathname.match(/\/[a-z-]+/g);
};

export const isPathnameInInstructions = (props) => {
  const match = getValidLocationMatch(props);

  return match && match.length === 2;
};

export const getTestPathFromLocation = (props) => {
  const match = getValidLocationMatch(props);
  if (!match) {
    return '';
  }

  return match[match.length - 1];
};

export const withRouterProps = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
