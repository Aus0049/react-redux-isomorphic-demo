/**
 * Created by Aus on 2018/1/16.
 */
import React from 'react';
import {
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import PageNotFound from './pageNotFound/component/PageNotFound';
import Home from '../containers/home';
import SignUp from '../containers/site/SignUp';
import SignIn from '../containers/site/SignIn';

export default class Routes extends React.Component {
    render () {
        return (
            <Switch>
                {/*-- 首页重定向 --*/}
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <Route path="/home" component={Home}/>
                <Route path="/sign-up" component={SignUp}/>
                <Route path="/sign-in" component={SignIn}/>
                <Route path="/404" component={PageNotFound}/>
                <Route path="/*" render={() => <Redirect to="/404" />}/>
            </Switch>
        );
    }
}