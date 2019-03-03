import React, { useState } from 'react';
import { createAPI } from 'Factories/API';

export default function name(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    function onSubmit(event) {
        event.preventDefault();
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
        <div className="container h-100">
            <div className="row h-100 align-content-center">
                <div className="col-10 offset-1 col-md-8 offset-md-2 col-lg-4 offset-lg-4">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input onChange={(event) => { setEmail(event.target.value); setShowError(false); }} value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <div className="invalid-feedback">Example invalid custom select feedback</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input onChange={(event) => { setPassword(event.target.value); setShowError(false); }} value={password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        {
                            showError ? (
                                <div className="alert alert-danger">
                                    <small>Wrong email and/or password. Please try again.</small>
                                </div>
                            ) : null
                        }
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
