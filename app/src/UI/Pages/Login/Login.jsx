import React, { useState } from 'react';
import { createAPI } from 'Factories/API';
import Frame from 'Components/Frame/Frame';
import Input from 'Components/Form/Input/Input';
import Form from 'Components/Form/Form';
import Button from 'Components/Form/Button/Button';
import Switch from 'Components/Form/Switch/Switch';
import Styles from './Login.scss';
import ContentStyles from 'Styles/Content.scss';

export default function name(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    function onSubmit() {
        createAPI().auth(email, password)
            .then(response => {
                props.setUserData({
                    token: response.data.authToken,
                    id: response.data.userId,
                });
            })
            .catch(response => {
                setShowError(true);
                console.error(response.error);
            });
    }

    return (
        <Frame>
            <div className={Styles.FlexWrapper}>
                <div className={`container h-100`}>
                    <div className="row h-100 align-content-center">
                        <div className={`col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 ${Styles.FormWrapper}`}>
                            <h1 className={ContentStyles.H1}>Sign in</h1>
                            <Form onSubmit={onSubmit}>
                                <Input type="email" onChange={(value) => { setEmail(value); setShowError(false); }}>Email address</Input>
                                <Input type="password" onChange={(value) => { setPassword(value); setShowError(false); }}>Password</Input>
                                {
                                    showError ? (
                                        <div className="alert alert-danger">
                                            <small>Wrong email and/or password. Please try again.</small>
                                        </div>
                                    ) : null
                                }
                                <Button type="submit" className="btn btn-primary btn-lg btn-block">Submit</Button>
                                <Switch checked={true} className="mt-3">Remember me</Switch>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Frame>
    );
}
