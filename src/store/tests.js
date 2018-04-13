import autodux from 'autodux';
import map from 'lodash/map';

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
});

export default tests;
