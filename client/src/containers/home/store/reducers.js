/**
 * Created by Aus on 2018/1/17.
 */
import * as actionType from './actionTypes'

const homeInitialState = {
    list: 111,
};

export default function homeReducer (state = {...homeInitialState}, action) {
    switch (action.type) {
        case actionType.HOME_GET_LIST : {
            state.list = action.payload;

            return {...state};
        }
        default : {
            return {...state};
        }
    }
}