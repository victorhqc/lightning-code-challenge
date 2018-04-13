import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import activeTest from './activeTest';
import tests from './tests';

export default combineReducers({
  router: routerReducer,
  activeTest: activeTest.reducer,
  tests: tests.reducer,
});
