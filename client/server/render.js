/**
 * Created by Aus on 2018/2/28.
 */
import fs from 'fs'
import path from 'path'

import React from 'react';
// import ReactDOM from 'react-dom';
import { StaticRouter as Router } from "react-router-dom"
import { renderToString } from "react-dom/server"
import { Provider } from "react-redux"
import Routes from '../src/route';

function getAssets() {
    return getAssets.assets || (() => {
            getAssets.assets = JSON.parse(fs.readFileSync(path.join(__dirname, '../webpack-assets.json')));
            return getAssets.assets
        })()
}

export default function render(req, res, store) {
    const context = {};

    const html = renderToString(
        <Provider store={store}>
            <Router location={req.baseUrl} context={context}>
                <Routes />
            </Router>
        </Provider>
    );

    // <Route>中访问/,重定向到/home路由时
    if (context.url) {
        res.redirect('/home');
        return;
    }

    const main = getAssets();
    const app = main.javascript.app;
    const style = main.styles.app;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link href=${style} rel="stylesheet"></link>
        <title>SSR</title>
    </head>
    <body>
        <div id="root">
            ${html}
        </div>
    </body>
    <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}
    </script>
    <script src=${app}></script>
    </html>
    `
}
