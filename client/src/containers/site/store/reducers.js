/**
 * Created by Aus on 2018/1/18.
 */
import * as actionType from './actionTypes'

const siteInitialState = {
    username: '',
    phone: ''
};

export default function siteReducer (state = {...siteInitialState}, action) {
    switch (action.type) {
        case actionType.SITE_UPDATE_PERSONAL_INFO : {
            const {username, phone} = action.payload;

            state.username = username;
            state.phone = phone;

            return {...state};
        }
        default : {
            return {...state};
        }
    }
}