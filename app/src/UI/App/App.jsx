import React from 'react';
import {
    BrowserRouter as Router, Route,
} from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Reducers from 'Reducers/Reducers';
/*
import { setData, clearData } from 'Actions/SessionUser';
import { createAPI } from 'Factories/API';
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'Globals/FontAwesome';
import AsyncComponent from 'Components/AsyncComponent/AsyncComponent';
import PublicRoute from 'Components/PublicRoute/PublicRoute';
import PrivateRoute from 'Components/PrivateRoute/PrivateRoute';
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

// On reload reload session user
/*
if (!!store.getState().sessionUser.data.token) {
    createAPI(store.getState().sessionUser.data.token)
        .authValidate()
        .then(response => {
            store.dispatch(
                setData({
                    token: response.data.authToken,
                    id: response.data.userId,
                    fname: response.data.fname,
                    accessGroups: response.data.accessGroups,
                })
            );
        })
        .catch(response => {
            store.dispatch(clearData());
            console.error(response.error);
        });
}
*/

const Login = AsyncComponent(() => import('Pages/Login/Login'));
const Home = AsyncComponent(() => import('Pages/Home/Home'));
const Upload = AsyncComponent(() => import('Pages/Upload/Upload'));
const NotFound = AsyncComponent(() => import('Pages/NotFound/NotFound'));

export default function App() {
    return (
        <Provider store={store}>
            <div className={Styles.App}>
                <Router>
                    <AnimatedSwitch
                        atEnter={{ opacity: 0 }}
                        atLeave={{ opacity: 0 }}
                        atActive={{ opacity: 1 }}
                        className={Styles.SwitchWrapper}
                    >
                        <PublicRoute path="/login" exact component={Login} />
                        <PrivateRoute path="/" exact component={Home} />
                        <PrivateRoute path="/upload" exact component={Upload} accessGroups={['upload']} />
                        <Route component={NotFound} />
                    </AnimatedSwitch>
                </Router>
            </div>
        </Provider>
    );
}
