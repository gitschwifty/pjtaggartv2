import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './Components/App/App';
import makeStore from './Redux/Store';
import './index.css';

const store = makeStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
