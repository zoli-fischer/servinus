import React from 'react';
import Logo from 'Components/Logo/Logo';

export default function Header({ children, ...rest }) {
    return (
        <header {...rest}>
            <div>
                <Logo />
            </div>
            <div>{children}</div>
            <div>
            </div>
        </header>
    );
}
