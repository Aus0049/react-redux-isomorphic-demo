/**
 * Created by Aus on 2018/3/1.
 */
import React from 'react';
import { hydrate, render } from 'react-dom';
import thunk from 'redux-thunk'
import reduxLogger from 'redux-logger'
import {createStore, compose, applyMiddleware, combineReducers} from "redux"
import { BrowserRouter as Router, } from "react-router-dom"
import {Provider} from "react-redux"
import reducer from "./reducers/"
import Routes from "./route"
import '../public/style/index.scss';

// createStore
const middleware = [thunk, reduxLogger];

const store = createStore(
    reducer,
    window.__INITIAL_STATE__,
    compose(
        applyMiddleware(...middleware),
    )
);

store.subscribe(() => {
    console.log('store subscribe');
    console.log(store.getState());
});

// 处理客户端渲染和服务端渲染切换
const currentRender = module.hot ? render : hydrate ;

currentRender(
    <Provider store={store}>
        <Router>
            <Routes />
        </Router>
    </Provider>,
    document.getElementById('root')
);
