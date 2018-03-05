/**
 * Created by Aus on 2018/2/28.
 */
import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import Layout from '../layout';
import Home from '../containers/Home';
import About from '../containers/About';
import NotFound from '../containers/NotFound';
import Header from '../components/header';

export default class Routes extends React.Component {
    render() {
        return (
            <Layout>
                <Header />
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/home" />} />
                    <Route path="/home" component={Home} />
                    <Route path="/about" component={About} />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        );
    }
}