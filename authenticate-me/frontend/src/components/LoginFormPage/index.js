import {useState} from 'react';
import React, {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as sessionActions from '../../store/session';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credentials, setCredentials] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({credentials,password}))
        .catch(async(res) => {
            const data = await res.json();
            if(data && data.errors) setErrors(data.errors);
        });
    }

    if(sessionUser){
        return <Redirect to="/" />
    }
    return(
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error,id) => <li key={id}>{error}</li>)}
            </ul>
            <label>
                Username or Email:
                <input
                type = "text"
                value={credentials}
                onChange={e => setCredentials(e.target.value)}
                required />
            </label>
            <label>
                Password
                <input
                type="password"
                value={credentials}
                onChange = {e => setPassword(e.target.value)}
                required
                />
            </label>
            <button type='submit'>Log In</button>
        </form>
    )
}

export default LoginFormPage;
