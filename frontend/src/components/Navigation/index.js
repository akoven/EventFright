import React from 'react';
import {NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css'

const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if(sessionUser){
        sessionLinks = (
            <ProfileButton user={sessionUser}/>
        )
    }else{
        sessionLinks = (
            <nav>
                <div className='login-signup'>
                    <NavLink to='/login' className='login'>Log In</NavLink>
                    <NavLink to='/signup' className='signup'>Sign up</NavLink>
                </div>
            </nav>
        )
    }

    return(
        <ul>
            <li>
                <NavLink exact to='/' id='home-link'>EventFright</NavLink>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
}

export default Navigation;
