import React from 'react';
import PropTypes from 'prop-types';
import {
    Route, Redirect,
} from 'react-router-dom';

export default function PublicRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => (
                !rest.isSessionUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: '/',
                        state: { from: props.location },
                    }}
                    />
                )
            )}
        />
    );
}

PublicRoute.propTypes = {
    isSessionUser: PropTypes.bool,
};

PublicRoute.defaultProps = {
    isSessionUser: false,
};
