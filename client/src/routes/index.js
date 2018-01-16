/**
 * Created by Aus on 2018/1/16.
 */
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from "react-router-dom";
import Header from "../component/header"
import Layout from "../layout"
import Home from "../containers/home"

export default class Rout extends React.Component {
    render() {
        return (
            <Layout>
                <Header />
                <div className="main">
                    <Route exact path="/" render={() => <Redirect to="/home" />} />
                    <Route path="/home" component={Home} />
                </div>
            </Layout>
        );
    }
}
