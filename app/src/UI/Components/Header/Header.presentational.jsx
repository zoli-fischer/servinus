import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { hasUserAccess, ACCESS_GROUP_UPLOAD, ACCESS_GROUP_USERS } from 'Globals/UserAccessGroups';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from 'Components/Logo/Logo';
import Styles from './Header.presentational.scss';

export default function Header({
    children, className, onLogout, isSessionUser, userData, ...rest
}) {
    const [showDropDown, setShowDropDown] = useState(false);
    const userContainerRef = useRef(null);
    const userDropDownContainerRef = useRef(null);

    function onDocumentMouseDown(event) {
        if (!((userContainerRef.current && userContainerRef.current.contains(event.target))
            || (userDropDownContainerRef.current && userDropDownContainerRef.current.contains(event.target)))) {
            setShowDropDown(false);
        }
    }

    function onDocumentClick(event) {
        if (userDropDownContainerRef.current && userDropDownContainerRef.current.contains(event.target)) {
            setTimeout(() => {
                if (userDropDownContainerRef.current) {
                    setShowDropDown(false);
                }
            }, 100);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', onDocumentMouseDown);
        document.addEventListener('click', onDocumentClick);
        return () => {
            document.removeEventListener('mousedown', onDocumentMouseDown);
            document.removeEventListener('click', onDocumentClick);
        };
    }, []);

    return (
        <header className={`${Styles.Wrapper} ${className}`} {...rest}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col flex-grow-0">
                        <Logo />
                    </div>
                    <div className="col align-self-center">{children}</div>
                    <div className={`${Styles.IconHolder} col align-self-center text-right flex-grow-0`}>
                        { isSessionUser ? (
                            <React.Fragment>
                                <button type="button" className={`${Styles.Icon}`}><FontAwesomeIcon icon="search" /></button>
                                <div ref={userContainerRef} className={`${Styles.UserContainer}`}>
                                    <button
                                        type="button"
                                        className={`${Styles.Icon}`}
                                        onClick={() => { setShowDropDown(value => !value); }}
                                    >
                                        <FontAwesomeIcon icon="user" />
                                    </button>
                                    <button
                                        type="button"
                                        className={`${Styles.Name}`}
                                        onClick={() => { setShowDropDown(value => !value); }}
                                    >
                                        {userData.fname}
                                    </button>
                                    {
                                        showDropDown
                                            ? ReactDOM.createPortal((
                                                <React.Fragment>
                                                    <div ref={userDropDownContainerRef} className={`${Styles.UserDropDown}`}>
                                                        <ul>
                                                            <li>
                                                                <button type="button">
                                                                    <span><FontAwesomeIcon icon="user" /></span>
                                                                    <span>My account</span>
                                                                </button>
                                                            </li>
                                                            {
                                                                hasUserAccess(userData, ACCESS_GROUP_USERS) ? (
                                                                    <li>
                                                                        <button type="button">
                                                                            <span><FontAwesomeIcon icon="users" /></span>
                                                                            <span>Users</span>
                                                                        </button>
                                                                    </li>
                                                                ) : null
                                                            }
                                                            {
                                                                hasUserAccess(userData, ACCESS_GROUP_UPLOAD) ? (
                                                                    <li>
                                                                        <button type="button">
                                                                            <span><FontAwesomeIcon icon="file-upload" /></span>
                                                                            <span>Upload</span>
                                                                        </button>
                                                                    </li>
                                                                ) : null
                                                            }
                                                            <li>
                                                                <button type="button" onClick={() => { onLogout(); setShowDropDown(false); }}>
                                                                    <span><FontAwesomeIcon icon="sign-out-alt" /></span>
                                                                    <span>Logout</span>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </React.Fragment>
                                            ), document.body)
                                            : null
                                    }
                                </div>
                            </React.Fragment>
                        ) : null
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    children: PropTypes.element,
    className: PropTypes.string,
    onLogout: PropTypes.func,
    isSessionUser: PropTypes.bool,
    userData: PropTypes.object,
};

Header.defaultProps = {
    children: null,
    className: null,
    onLogout: () => {},
    isSessionUser: false,
    userData: null,
};
