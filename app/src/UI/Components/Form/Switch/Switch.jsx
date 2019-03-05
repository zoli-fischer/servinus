import React, { useState, useEffect } from 'react';
import Switch from "react-switch";

export default function FormSwitch({ children, checked, onChange: onChangeProps, ...rest }) {
    const [value, setValue] = useState(!!checked);

    function onChange(event) {
        setValue(event);
        // todo: remove after proptype validation
        if (typeof onChangeProps === 'function') {
            onChangeProps(event);
        }
    }

    return (
        <label>
            <span>{children}</span>
            <Switch onChange={onChange} checked={value} {...rest} />
        </label>
    );
}
