import React, {useState} from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from 'react-router-dom';

const SignUpFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState([]);

    if(sessionUser) <Redirect to='/' />;

    const handleSubmit = e =>{
        e.preventDefault();
        if(password === passwordConfirmation){
            setErrors([]);
            return dispatch(sessionActions.signup({email,username,password})).catch(async(res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors);
            });
        }
        return setErrors(['Passwords must match, please try again.'])
    };

    return(
        <form onSubmit={handleSubmit}>
            <ul>{errors.map((error,id) => <li key={id}>{error}</li>)}</ul>
            <label>
                Username:
                <input
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                />
            </label>
            <label>
                Email:
                <input
                type='email'
                value={email}
                onChange = {e => setEmail(e.target.value)}
                required
                />
            </label>
            <label>
                Password:
                <input
                type='password'
                value={password}
                onChange = {e => setPassword(e.target.value)}
                required
                />
            </label>
            <label>
                Confirm Password:
                <input
                type='password'
                value={passwordConfirmation}
                onChange = {e => setPasswordConfirmation(e.target.value)}
                required
                />
            </label>
            <button type='submit'>Sign Up!</button>
        </form>
    )
}

export default SignUpFormPage;
