import React from 'react';
import Logo from 'Components/Logo/Logo';
import Styles from './Header.scss';

export default function Header({ children, className, ...rest }) {
    return (
        <header className={`${Styles.Wrapper} ${className}`} {...rest}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col flex-grow-0">
                        <Logo />
                    </div>
                    <div className="col align-self-center">{children}</div>
                    <div className="col align-self-center flex-grow-0"></div>
                </div>
            </div>
        </header>
    );
}
