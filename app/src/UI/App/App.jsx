import React from 'react';
import {
    BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import AsyncComponent from 'Components/AsyncComponent/AsyncComponent';
import PublicRoute from 'Containers/PublicRoute/PublicRoute';
import PrivateRoute from 'Containers/PrivateRoute/PrivateRoute';

const Login = AsyncComponent(() => import('Containers/Pages/Login/Login'));
const Users = AsyncComponent(() => import('Containers/Pages/Users/Users'));
const NotFound = AsyncComponent(() => import('Pages/NotFound/NotFound'));

export default function App(props) {
    return (
        <Router>
            <Switch>
                <PublicRoute path="/login" exact component={Login} />
                <PrivateRoute path="/" exact component={Users} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}
