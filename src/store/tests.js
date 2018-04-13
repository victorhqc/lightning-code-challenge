import autodux from 'autodux';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import find from 'lodash/find';

import { TESTS } from '../constants/tests';

const tests = autodux({
  slice: 'tests',
  initial: [],
  actions: {
    setDefaultTests: () => map(TESTS, test => ({
      name: test.name,
      path: test.path,
    })),
  },
  selectors: {
    getTestByPathName: state => pathname => find(state, test => test.path === pathname),
  },
});

export default tests;

export const testsPropTypes = {
  tests: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
  })).isRequired,
};

export const testPropTypes = {
  testByPathName: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
  }),
};
