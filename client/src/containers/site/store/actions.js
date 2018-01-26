/**
 * Created by Aus on 2018/1/18.
 */
import axios from 'axios'
import * as actionType from './actionTypes'

const apiRoutePrefix = '/api';

// 注册
function fetchSignUp (username, phone, password) {
    return (dispatch, getState) => {
        return axios.post(`${apiRoutePrefix}/users/sign-up`, {
            username: username,
            phone: phone,
            password: password
        })
            .then(response => response.data)
            .catch(response => response.data)
    }
}

// 登录
function fetchSignIn (username, password) {
    return (dispatch, getState) => {
        return axios.post(`${apiRoutePrefix}/users/sign-in`, {
            username: username,
            password: password
        })
            .then(response => response.data)
            .catch(response => response.data)
    }
}

// 注销
function fetchSignOut () {
    return (dispatch, getState) => {
        return axios.post(`${apiRoutePrefix}/users/sign-out`)
            .then(response => response.data)
            .catch(response => response.data)
    }
}

// 存储个人信息
const updatePersonalInfo = (obj) => ({
    type: actionType.SITE_UPDATE_PERSONAL_INFO,
    payload: obj
});

export const actionCreators = {
    fetchSignUp,
    fetchSignIn,
    fetchSignOut,

    updatePersonalInfo
};