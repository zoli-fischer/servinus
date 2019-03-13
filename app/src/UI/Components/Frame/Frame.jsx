import React from 'react';
import PropTypes from 'prop-types';
import Header from 'Containers/Header/Header';
import Styles from './Frame.scss';

export default function Frame({
    className, children, showHeader, ...rest
}) {
    return (
        <div className={`${Styles.Frame} flex-nowrap ${className}`} {...rest}>
            {showHeader ? <Header className={Styles.Header} /> : null}
            <div className={Styles.Content}>
                {children}
            </div>
        </div>
    );
}

Frame.propTypes = {
    showHeader: PropTypes.bool,
    children: PropTypes.element,
    className: PropTypes.string,
};

Frame.defaultProps = {
    showHeader: true,
    children: null,
    className: null,
};
