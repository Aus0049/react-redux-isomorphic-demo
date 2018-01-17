import React from 'react';
// import { hydrate } from 'react-dom';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import App from './containers/app/App';

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
    // ssr use this
    // hydrate (
    //     <App store={store} />,
    //     MOUNT_NODE
    // );

    ReactDOM.render(
        <App store={store} />,
        MOUNT_NODE
    );
};

// ========================================================
// Developer Tools Setup
// ========================================================
if (window.__DEV__) {
    if (window.devToolsExtension) {
        window.devToolsExtension.open()
    }
}

// This code is excluded from production bundle
if (window.__DEV__) {
    if (module.hot) {
        // Development render functions
        const renderApp = render
        const renderError = (error) => {
            const RedBox = require('redbox-react')['default']

            ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
        }

        // Wrap render in try/catch
        render = () => {
            try {
                renderApp()
            } catch (error) {
                console.error(error)
                renderError(error)
            }
        }

        // Setup hot module replacement
        module.hot.accept('./routes/index', () =>
            setImmediate(() => {
                ReactDOM.unmountComponentAtNode(MOUNT_NODE)
                render()
            })
        )
    }
}

// ========================================================
// Go!
// ========================================================
render()
