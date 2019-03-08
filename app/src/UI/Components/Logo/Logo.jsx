import React from 'react';
import PropTypes from 'prop-types';
import Style from './Logo.scss';

export default function Logo({ className, ...rest }) {
    return (
        <div className={`${Style.Logo} ${className}`} {...rest}>
            Servinus
        </div>
    );
}

Logo.propTypes = {
    className: PropTypes.string,
};

Logo.defaultProps = {
    className: null,
};
