import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Reducers from 'Reducers/Reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from 'App/App';
import * as serviceWorker from 'PWA/serviceWorker';

const middlewares = [applyMiddleware(thunk)];

/* eslint-disable no-underscore-dangle */
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 }));
}
/* eslint-enable */

const store = createStore(
    Reducers,
    compose(...middlewares),
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
