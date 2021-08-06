import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from 'redux';
import reducers from './reducers';
import App from './App';
import './assets/css/index.css';

const store = createStore(reducers);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
