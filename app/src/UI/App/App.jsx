import React from 'react';
import {
    BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Reducers from 'Reducers/Reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import AsyncComponent from 'Components/AsyncComponent/AsyncComponent';
import PublicRoute from 'Containers/PublicRoute/PublicRoute';
import PrivateRoute from 'Containers/PrivateRoute/PrivateRoute';
import Styles from './App.scss';

const middlewares = [applyMiddleware(thunk)];

/* eslint-disable no-underscore-dangle */
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 }));
}
/* eslint-enable */

const store = createStore(
    Reducers,
    compose(...middlewares)
);

const Login = AsyncComponent(() => import('Containers/Pages/Login/Login'));
const Home = AsyncComponent(() => import('Containers/Pages/Home/Home'));
const NotFound = AsyncComponent(() => import('Pages/NotFound/NotFound'));

export default function App() {
    return (
        <Provider store={store}>
            <div className={Styles.App}>
                <Router>
                    <Switch>
                        <PublicRoute path="/login" exact component={Login} />
                        <PrivateRoute path="/" exact component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>
        </Provider>
    );
}
