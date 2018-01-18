/**
 * Created by Aus on 2018/1/18.
 */
import * as actionType from './actionTypes'

const siteInitialState = {
    list: 111,
};

export default function siteReducer (state = {...siteInitialState}, action) {
    switch (action.type) {
        default : {
            return {...state};
        }
    }
}