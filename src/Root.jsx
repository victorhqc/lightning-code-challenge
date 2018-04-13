import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';
import { ThemeProvider, injectGlobal } from 'styled-components';
import createHistory from 'history/createBrowserHistory';

import 'highlight.js/styles/monokai.css';

import TopHeader from './components/TopHeader';
import App from './components/App';

import configureStore from './store';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  body {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const history = createHistory();

const store = configureStore({}, history);


const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={{ mode: 'dark', size: 'normal' }}>
        <Fragment>
          <TopHeader />
          <App />
        </Fragment>
      </ThemeProvider>
    </Router>
  </Provider>
);

export default Root;
