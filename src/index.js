import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider>
    <BrowserRouter>
      <div className="wrapper">
        <App />
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
