import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import Styles from './Switch.scss';

export default function FormSwitch({
    children, checked, className, style, onChange: onChangeProps,
    ...rest
}) {
    const [value, setValue] = useState(!!checked);

    function onChange(event) {
        setValue(event);
        // todo: remove after proptype validation
        if (typeof onChangeProps === 'function') {
            onChangeProps(event);
        }
    }

    return (
        <div className={`form-group ${className}`} style={style}>
            <div className={Styles.Wrapper}>
                <div className={Styles.Text}>{children}</div>
                <label className={Styles.SwitchWrapper}>
                    <Switch
                        onChange={onChange}
                        checked={value}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={25}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={16}
                        width={42}
                        {...rest}
                    />
                </label>
            </div>
        </div>
    );
}

FormSwitch.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    className: PropTypes.string,
    checked: PropTypes.bool,
    style: PropTypes.object,
    onChange: PropTypes.func,
};

FormSwitch.defaultProps = {
    children: null,
    className: null,
    checked: false,
    style: {},
    onChange: () => {},
};
