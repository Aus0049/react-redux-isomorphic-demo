/**
 * Created by Aus on 2018/1/17.
 */
import axios from 'axios'
import * as actionType from './actionTypes'

const apiRoutePrefix = '/api';

function fetchList () {
    return (dispatch, getState) => {
        return axios.get(`${apiRoutePrefix}/say/get-list`)
            .then(response => response.data)
            .then(result => {
                if(result.status){
                    dispatch(updateList(result.data));
                }
                return result;
            })
            .catch(response => response.data)
    }
}

const updateList = (payload) => ({
    type: actionType.HOME_GET_LIST,
    payload: payload
});

export const actionCreators = {
    fetchList
};

export const actions = {
    updateList
};