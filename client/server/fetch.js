/**
 * Created by Aus on 2018/2/28.
 */
import 'isomorphic-fetch';

import { createStore } from "redux";
import {actions} from '../src/actions/';

import reducer from "../src/reducers";

const fetchHomeList = (store) => {
    return fetch('http://localhost:9000/api/aaa')
        .then((response)=>{
            console.log('then response------');
            return response.json();
        })
        .then((res)=>{
            console.log(res.data.length);
            store.dispatch(actions.updateHomeList(res.data));

            return res;
        })
        .catch((res)=>{
            console.log('catch res------');
            console.log(res);
        });
};

export default function (req) {
    const store = createStore(reducer);

    const promises = [
        fetchHomeList(store)
    ];

    return {
        promises,
        store
    }
}
