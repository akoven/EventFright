import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login, demoUserLogin } from '../../store/session';
import Login from '../login';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-pg-div'>
      <h1>Welcome to Event Fright</h1>
      <h2>Enter if you dare!</h2>
      <div className='login-form-div'>
        <form onSubmit={onLogin} className='login-form'>
          <h3>Login or try out Event Fright as a demo user</h3>
          <ul>
            {errors.map((error, ind) => (
              <li className='error-msgs' key={ind}>{error}</li>
            ))}
          </ul>
          <p className='required-fields'>All required fields are red and marked with an *</p>
          <div className='email-input-div'>
            <label htmlFor='email' className='email-label'>Email *</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='password-input-div'>
            <label htmlFor='password' className='password-label'>Password *</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <div className='login-btns-div'>
              <span className='login-btn-span'>
                <button className='login-btn' type='submit'>Login</button>
              </span>
              <span className='demo-login-btn-span'>
                <button type='button' className='demo-btn' onClick={() => {dispatch(demoUserLogin())}}>Demo User</button>
              </span>
              <div className='sign-up-text-div'>
                <p>New to the Event Fright? Sign up!</p>
              </div>
              <div>
                <button className='sign-up-btn' onClick={() => history.push('/sign-up')}>Sign Up</button>
              </div>
              <div className='google-login'><Login /></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
