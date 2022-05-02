import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './LoginForm.css';

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

    if(sessionUser) {

        <Redirect to="/" />;

    }else{

        return(
            <form onSubmit={handleSubmit} className="background">
                <ul>
                    {errors.map((error,id) => <li key={id}>{error}</li>)}
                </ul>
                <label className='username'>
                    Username or Email:
                    <input
                    type = "text"
                    value={credentials}
                    onChange={e => setCredentials(e.target.value)}
                    required />
                </label>
                <label className='password'>
                    Password
                    <input
                    type="password"
                    value={password}
                    onChange = {e => setPassword(e.target.value)}
                    required
                    />
                </label>
                <button type='submit'>Log In</button>
            </form>
        )
    }
}



export default LoginFormPage;
