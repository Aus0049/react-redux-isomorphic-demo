/**
 * Created by Aus on 2018/1/16.
 */
import React from 'react';
import Layout from "../layout"
import PageNotFound from "./pageNotFound"
import Redirect from "./pageNotFound/redirect"
import Home from "../containers/home"

export const createRoutes = store => ({
    path: '/',
    component: Layout,
    indexRoute: Home,
    childRoutes: [
        PageNotFound(),
        Redirect,
    ],
});

export default createRoutes
