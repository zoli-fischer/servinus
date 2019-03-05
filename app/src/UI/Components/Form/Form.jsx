import React from 'react';

export default function Form({ onSubmit: onSubmitProps, children, ...rest }) {

    function onSubmit(event) {
        event.preventDefault();
        onSubmitProps();
    }

    return (
        <form onSubmit={onSubmit} {...rest}>{children}</form>
    );
}
