/**
 * Created by Aus on 2018/1/16.
 */
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import reduxLogger from 'redux-logger'
import history  from './history'
import makeRootReducer from './reducers'
import { updateLocation } from './location'

export default (initialState = {}) => {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    const middleware = [thunk, reduxLogger]

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = []
    if (window.__DEV__) {
        const devToolsExtension = window.devToolsExtension
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension())
        }
    }

    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    const store = createStore(
        makeRootReducer(),
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    )
    store.asyncReducers = {}

    console.log(history);
    // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
    store.unsubscribeHistory = history.listen(updateLocation(store))

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const reducers = require('./reducers')['default']
            store.replaceReducer(reducers(store.asyncReducers))
        })
    }

    return store
}
