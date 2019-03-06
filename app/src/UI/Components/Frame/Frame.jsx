import React from 'react';
import Header from 'Components/Header/Header';
import Style from './Frame.scss';

export default function Frame({ className, children, ...rest }) {
    return (
        <div className={`${Style.Frame} ${className}`} {...rest}>
            <Header />
            <div>
                {children}
            </div>
        </div>
    );
}
