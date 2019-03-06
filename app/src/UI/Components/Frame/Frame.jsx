import React from 'react';
import Header from 'Components/Header/Header';
import Styles from './Frame.scss';

export default function Frame({ className, children, showHeader, ...rest }) {
    return (
        <div className={`${Styles.Frame} flex-nowrap ${className}`} {...rest}>
            {showHeader ? <Header className={Styles.Header} /> : null}
            <div className={Styles.Content}>
                {children}
            </div>
        </div>
    );
}
