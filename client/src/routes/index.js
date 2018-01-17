/**
 * Created by Aus on 2018/1/16.
 */
import React from 'react';
import {
    Route,
    Redirect,
    Switch
} from "react-router-dom"
import PageNotFound from "./pageNotFound/component/PageNotFound"
// import Redirect from "./pageNotFound/redirect"
import Home from "../containers/home"
//
// // export const createRoutes = store => ({
// //     path: '/',
// //     component: Layout,
// //     indexRoute: Home,
// //     childRoutes: [
// //         PageNotFound(),
// //         Redirect,
// //     ],
// // });

export default class Routes extends React.Component {
    render () {
        return (
            <Switch>
                {/*-- 首页重定向 --*/}
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <Route path="/home" component={Home}/>
                <Route path="/404" component={PageNotFound}/>
                <Route path="/*" render={() => <Redirect to="/404" />}/>
            </Switch>
        );
    }
}

// const createRoutes = store => ([
//     {
//         component: Layout,
//         routes: [
//             { path: '/',
//                 exact: true,
//                 component: Home,
//             },
//             { path: '/404',
//                 component: PageNotFound,
//             },
//             { path: '*',
//                 component: PageNotFound,
//             },
//         ]
//
//     }
// ]);
//
// export default createRoutes
// const routes = [
//     { component: bContainer,
//         routes: [
//             { path: '/',
//                 exact: true,
//                 component: bContainer
//             },
//             { path: '/b/b',
//                 component: bContainer,
//                 routes: [
//                     { path: '/b/b/b',
//                         component: bContainer
//                     }
//                 ]
//             }
//         ]
//     }
// ]