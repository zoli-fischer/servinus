import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createAPI } from 'Factories/API';

export default function Home(props) {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { sessionUser } = props;

    function getUsers() {
        setLoading(true);
        createAPI(sessionUser.token).users()
            .then(response => {
                setLoading(false);
                setUsers(response.data);
            })
            .catch(response => {
                setLoading(false);
                console.error(response.error);
            });
    }

    function clearAddUserForm() {
        setEmail('');
        setPassword('');
    }

    function addUser() {
        setLoading(true);
        createAPI(sessionUser.token).putUser(email, password)
            .then(() => {
                getUsers();
                clearAddUserForm();
            })
            .catch(response => {
                getUsers();
                console.error(response.error);
            });
    }

    function deleteUser(id) {
        setLoading(true);
        createAPI(sessionUser.token).deleteUser(id)
            .then(() => {
                getUsers();
            })
            .catch(response => {
                getUsers();
                console.error(response.error);
            });
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <React.Fragment>
            <video src="http://localhost:3000/video/stream" height="320" controls={true} />
            <div className="container mt-3 mb-3">
                <div className="row">
                    <div className="col-12">
                        <nav className="nav nav-pills flex-column flex-sm-row">
                            <ul className="nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">Users</Link>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="nav-link" onClick={props.onLogout}>Logout</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                            <div className="btn-group mr-2" role="group" aria-label="First group">
                                <button type="button" className="btn btn-secondary" onClick={getUsers}>Reload</button>
                            </div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button type="button" className="btn btn-primary" onClick={addUser}>Add</button>
                                </div>
                                <input type="email" autoComplete="new-password" className="form-control" placeholder="E-mail address" onChange={event => { setEmail(event.target.value); }} value={email} />
                                <input type="password" autoComplete="new-password" className="form-control" placeholder="Password" onChange={event => { setPassword(event.target.value); }} value={password} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                loading ? (
                    <div className="container mb-3">
                        <div className="row">
                            <div className="col-12 text-center">
                                Loading...
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container mb-3">
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-sm table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Email</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map(user => (
                                                <tr key={user.id}>
                                                    <th scope="row">{user.id}</th>
                                                    <td>{user.email}</td>
                                                    <td className="text-right">
                                                        <button disabled={sessionUser.id === user.id} type="button" className="btn btn-danger btn-sm" onClick={() => { deleteUser(user.id); }}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    );
}

Home.propTypes = {
    sessionUser: PropTypes.shape({
        token: PropTypes.string,
        id: PropTypes.number,
    }).isRequired,
    onLogout: PropTypes.func,
};

Home.defaultProps = {
    onLogout: () => {},
};
