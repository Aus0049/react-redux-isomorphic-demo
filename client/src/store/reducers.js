/**
 * Created by Aus on 2018/1/16.
 */
import { combineReducers } from 'redux'
import home from '../containers/home/store'
import site from '../containers/site/store'

export const makeRootReducer = () => combineReducers({
    home,
    site
});

// export const injectReducer = (store, { key, reducer }) => {
//     store.asyncReducers[key] = reducer
//     store.replaceReducer(makeRootReducer(store.asyncReducers))
// }

export default makeRootReducer
