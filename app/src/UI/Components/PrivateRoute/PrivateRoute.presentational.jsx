import React from 'react';
import PropTypes from 'prop-types';
import {
    Route, Redirect,
} from 'react-router-dom';

export default function PrivateRoute({ component: Component, accessGroups, ...rest }) {
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
    accessGroups: PropTypes.arrayOf(PropTypes.string),
};

PrivateRoute.defaultProps = {
    isSessionUser: false,
    accessGroups: null,
};
