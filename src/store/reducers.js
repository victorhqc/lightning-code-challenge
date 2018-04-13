import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import activeTest from './activeTest';
import tests from './tests';
import codeResults from './codeResults';

export default combineReducers({
  router: routerReducer,
  activeTest: activeTest.reducer,
  tests: tests.reducer,
  codeResults: codeResults.reducer,
});
