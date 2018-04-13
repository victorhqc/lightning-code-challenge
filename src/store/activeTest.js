import autodux from 'autodux';
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
