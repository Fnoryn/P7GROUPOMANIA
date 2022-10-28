import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux' 
import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/index'


const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)
root.render( 
  <Provider store={store}>
  <BrowserRouter >
  <App />
  </BrowserRouter>
  </Provider>

);

