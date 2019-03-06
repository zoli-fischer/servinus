import React from 'react';
import Style from './Logo.scss';

export default function Header({ className, ...rest }) {
    return (
        <div className={`${Style.Logo} ${className}`} {...rest}>
            Servinus
        </div>
    );
}
