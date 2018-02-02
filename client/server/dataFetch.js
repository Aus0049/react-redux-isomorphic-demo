/**
 * Created by Aus on 2018/1/30.
 */
import { createStore } from "redux"

import reducers from "../src/store/reducers"

import {
    actions
} from "../src/containers/home/store/actions"

import fetchUtil from "./fetchUtil"

let host = process.argv[2];

const fetchList = function (store) {
    return fetchUtil(`${host}/api/say/get-list`).then(res => {
        if(res.status){
            store.dispatch(actions.updateList(res.data))
        }

        return res;
    })
};

module.exports = function fetchData(req) {
    const store = createStore(reducers)
    const promises = [
        fetchList(store)
    ];

    return {
        promises,
        store
    }
};