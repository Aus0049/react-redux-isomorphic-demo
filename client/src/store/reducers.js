/**
 * Created by Aus on 2018/1/16.
 */
import { combineReducers } from 'redux'
import home from '../containers/home/store'

export const makeRootReducer = () => combineReducers({
    home
});

// export const injectReducer = (store, { key, reducer }) => {
//     store.asyncReducers[key] = reducer
//     store.replaceReducer(makeRootReducer(store.asyncReducers))
// }

export default makeRootReducer
