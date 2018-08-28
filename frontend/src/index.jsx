import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import multi from 'redux-multi'
import Modal from 'react-modal'

import App from './main/app';
import ROOT_REDUCER from './main/reducers';

const DEV_TOOLS = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(promise,thunk, multi)(createStore)(ROOT_REDUCER, DEV_TOOLS)

Modal.setAppElement('#appRoot')

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
, document.getElementById('appRoot'))