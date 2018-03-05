/**
 * Created by Aus on 2018/2/28.
 */
import 'isomorphic-fetch';

import { createStore } from "redux";

import reducer from "../src/reducers";

let host = process.argv[2];

const fetchHomeList = (store) => {
    return fetch(`${host}/site/test-url`)
        .then((res)=>{
            console.log('then res------');
            console.log(res);
        })
        .catch((res)=>{
            console.log('catch res------');
            console.log(res);
        });
};

export default function (req) {
    const store = createStore(reducer);

    const promises = [
        fetchHomeList
    ];

    return {
        promises,
        store
    }
}
