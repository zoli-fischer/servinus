import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ children, type, ...rest }) {
    return (
        /* eslint-disable-next-line react/button-has-type */
        <button type={type} {...rest}>{children}</button>
    );
}

Button.propTypes = {
    type: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

Button.defaultProps = {
    type: 'button',
    children: null,
};
