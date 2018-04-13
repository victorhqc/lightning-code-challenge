import autodux from 'autodux';
import PropTypes from 'prop-types';
import find from 'lodash/find';

import { TESTS } from '../constants/tests';

const activeTest = autodux({
  slice: 'activeTest',
  initial: {},
  actions: {
    setActiveTest: (state, name) => find(TESTS, test => test.name === name),
  },
});

export default activeTest;


export const activeTestProps = {
  activeTest: PropTypes.shape({
    instructions: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    defaultCode: PropTypes.string.isRequired,
    testCases: PropTypes.func.isRequired,
  }),
};
