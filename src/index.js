import App from './App';
import React from 'react';
import { render } from 'react-dom';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import appReducer from './reducers';

// Logger with default options
import logger from 'redux-logger'
const store = createStore(
  appReducer,
  applyMiddleware(logger)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
