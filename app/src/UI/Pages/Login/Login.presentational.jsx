import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createAPI } from 'Factories/API';
import Logo from 'Components/Logo/Logo';
import Frame from 'Components/Frame/Frame';
import Input from 'Components/Form/Input/Input';
import Form from 'Components/Form/Form';
import Button from 'Components/Form/Button/Button';
import Switch from 'Components/Form/Switch/Switch';
import Styles from './Login.presentational.scss';
import ContentStyles from 'Styles/Content.scss';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(true);
    const [showError, setShowError] = useState(false);

    function onSubmit() {
        createAPI().auth(email, password, remember)
            .then(response => {
                props.setUserData({
                    token: response.data.authToken,
                    id: response.data.userId,
                    fname: response.data.fname,
                    accessGroups: response.data.accessGroups,
                });
            })
            .catch(response => {
                setShowError(true);
                console.error(response.error);
            });
    }

    return (
        <Frame className={Styles.Frame} showHeader={false}>
            <div className={Styles.FlexWrapper}>
                <div className="container h-100">
                    <div className="row h-100">
                        <div className={`col-12 offset-0 col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-center align-self-center ${Styles.FormWrapper}`}>
                            <Logo className="mb-4" />
                            <h1 className={ContentStyles.H1}>Sign in</h1>
                            <Form onSubmit={onSubmit}>
                                <Input type="email" name="email" onChange={value => { setEmail(value); setShowError(false); }}>Email address</Input>
                                <Input type="password" name="password" onChange={value => { setPassword(value); setShowError(false); }}>Password</Input>
                                {
                                    showError ? (
                                        <div className="alert alert-danger">
                                            <small>Wrong email and/or password. Please try again.</small>
                                        </div>
                                    ) : null
                                }
                                <Button type="submit" className="btn btn-primary btn-lg btn-block">Submit</Button>
                                <Switch checked={remember} onChange={value => { setRemember(value); setShowError(false); }} className="mt-3">Remember me</Switch>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Frame>
    );
}

Login.propTypes = {
    setUserData: PropTypes.func,
};

Login.defaultProps = {
    setUserData: () => {},
};
