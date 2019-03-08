import React from 'react';
import PropTypes from 'prop-types';
import {
    Route, Redirect,
} from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => (
                rest.isSessionUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location },
                    }}
                    />
                )
            )}
        />
    );
}

PrivateRoute.propTypes = {
    component: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired,
    isSessionUser: PropTypes.bool,
};

PrivateRoute.defaultProps = {
    isSessionUser: false,
};
