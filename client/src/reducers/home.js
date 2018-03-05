/**
 * Created by Aus on 2018/2/28.
 */
import {actionsTypes} from "../actions";

const homeInitState = {
    list: []
};

export default function (state = {...homeInitState}, action) {
    switch (action.type) {
        case actionsTypes.HOME_UPDATE_LIST: {
            // 更新list
            state.list = action.payload;

            return {...state};
        }
        default: {
            return state;
        }
    }
}