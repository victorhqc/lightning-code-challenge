import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import activeTest from './activeTest';

export default combineReducers({
  router: routerReducer,
  activeTest: activeTest.reducer,
});
