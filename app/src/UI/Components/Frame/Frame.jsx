import React from 'react';
import Header from 'Components/Header/Header';
import Styles from './Frame.scss';

export default function Frame({ className, children, headerBackgroundColor, ...rest }) {
    return (
        <div className={`${Styles.Frame} flex-nowrap ${className}`} {...rest}>
            <Header className={Styles.Header} style={{ backgroundColor: headerBackgroundColor }} />
            <div className={Styles.Content}>
                {children}
            </div>
        </div>
    );
}
