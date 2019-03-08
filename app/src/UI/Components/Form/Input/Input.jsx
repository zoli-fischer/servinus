import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Styles from './Input.scss';

export default function Input({
    onChange, type, className, children, ...rest
}) {
    const [value, setValue] = useState('');
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        onChange(value);
    },
    [value]);

    return (
        <div className={`form-group ${className}`} {...rest}>
            <div className={`${Styles.InputWrapper} ${focused ? Styles.Focused : null}`}>
                <label className={Styles.Label}>{children}</label>
                <input
                    className={`form-control  ${Styles.Input}`}
                    type={type}
                    onChange={event => { setValue(event.target.value); }}
                    onFocus={() => { setFocused(true); }}
                    onBlur={() => { setFocused(false); }}
                    value={value}
                />
            </div>
            <div className="invalid-feedback">Example invalid custom select feedback</div>
        </div>
    );
}

Input.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    className: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
};

Input.defaultProps = {
    children: null,
    className: null,
    type: 'text',
    onChange: () => {},
};
