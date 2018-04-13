import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});

const middleware = history => [
  loggerMiddleware,
  routerMiddleware(history),
];

const configureStore = (state = {}, history) => createStore(
  reducers,
  state,
  applyMiddleware(...middleware(history)),
);

export default configureStore;
