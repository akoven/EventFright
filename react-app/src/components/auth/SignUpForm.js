import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  // const validEmail = /^[a-zA-z0-9]+@[a-zA-z]+.[a-z]$/

  const onSignUp = async (e) => {
    e.preventDefault();

    // const additionalErr = []

    // if(!validEmail.test(email)){
    //   additionalErr.push('email must be in the proper format')
    // }

    // if(password !== repeatPassword){
    //   additionalErr.push('passwords must match')
    // }

    // console.log(additionalErr)

    if(password !== repeatPassword){
      setErrors(['passwords must match'])
    }

    // if(!validEmail.test(email)){
    //   additionalErr.push('email must be in the proper format')
    // }

    // if(additionalErr.length > 0){
    //   setErrors(additionalErr)
    //   return 'some statement'
    // }

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));

        // console.log('sign up data: ', data)

        setErrors(data)

    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className='sign-up-header-div'>
      <h1>Welcome to Event Fright</h1>
      <h2>Enter if you dare!</h2>
    </div>
      <div className='sign-up-form-pg-div'>
        <div className='sign-up-form-div'>
          <form onSubmit={onSignUp} className='sign-up-form-field'>
            <h3>Sign up for free!</h3>
            <ul>
              {errors.map((error, ind) => (
                <li className='error-msgs' key={ind}>{error}</li>
              ))}
            </ul>
            <div className='username-sign-up-div'>
              <label className='username-label'>Username</label>
              <input
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
                placeholder='required'
              ></input>
            </div>
            <div className='email-sign-up-div'>
              <label className='sign-up-email-label'>Email</label>
              <input
                type='email'
                name='email'
                onChange={updateEmail}
                value={email}
                placeholder='required'
              ></input>
            </div>
            <div className='password-sign-up-div'>
              <label className='sign-up-password-label'>Password</label>
              <input
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
                placeholder='required'
              ></input>
            </div>
            <div className='repeat-password-sign-up-div'>
              <label className='repeat-password-label'>Repeat Password</label>
              <input
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                placeholder='required'
              ></input>
            </div>
            <div className='sign-up-submit-cancel-btn'>
              <span className='sign-up-submit-btn'>
                <button type='submit' className='signup-btn'>Sign Up</button>
              </span>
              <span className='sign-up-cancel-btn'>
                <button className='back-to-login' onClick={() => history.push('/')}>Back to Login</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
