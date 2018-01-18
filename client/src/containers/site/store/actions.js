/**
 * Created by Aus on 2018/1/18.
 */
import axios from 'axios'
import CryptoJS from 'crypto-js';
import * as actionType from './actionTypes'

const apiRoutePrefix = '/api';

function fetchSignUp (username, phone, password) {
    return (dispatch, getState) => {
        return axios.post(`${apiRoutePrefix}/users/sign-up`, {
            username: username,
            phone: phone,
            password: CryptoJS.MD5(password).toString()
        })
            .then(response => response.data)
            .catch(response => response.data)
    }
}

export const actionCreators = {
    fetchSignUp
};