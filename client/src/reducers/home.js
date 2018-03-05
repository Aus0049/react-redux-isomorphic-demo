/**
 * Created by Aus on 2018/2/28.
 */
import {actionsTypes} from "../actions";

const homeInitState = {
    list: []
};

export default function (state = {...homeInitState}, action) {
    switch (action.type) {
        case actionsTypes.HOME_FETCH_LIST: {
            console.log('reducer');
            return {...state};
        }
        default: {
            return state;
        }
    }
}