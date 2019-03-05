import React, { useState, useEffect } from 'react';
import Styles from './Input.scss';

export default function Input({ onChange, type, children, ...rest }) {
    const [value, setValue] = useState('');
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        onChange(value);
    },
    [value]);

    return (
        <div className="form-group">
            <div className={`${Styles.InputWrapper} ${focused ? Styles.Focused : null}`}>
                <label className={Styles.Label}>{children}</label>
                <input
                    className={`form-control  ${Styles.Input}`}
                    type={type}
                    onChange={(event) => { setValue(event.target.value); }}
                    onFocus={(event) => { setFocused(true); }}
                    onBlur={(event) => { setFocused(false); }}
                    value={value} />
            </div>
            <div className="invalid-feedback">Example invalid custom select feedback</div>
        </div>
    );
}
