import React from 'react';
import PropTypes from 'prop-types';

export default function Form({ onSubmit: onSubmitProps, children, ...rest }) {
    function onSubmit(event) {
        event.preventDefault();
        onSubmitProps();
    }

    return (
        <form onSubmit={onSubmit} {...rest}>{children}</form>
    );
}

Form.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.string]),
    onSubmit: PropTypes.func,
};

Form.defaultProps = {
    children: null,
    onSubmit: () => {},
};
