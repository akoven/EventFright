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
            <div className='dropdown-menu'>
                <ProfileButton user={sessionUser}/>
                <NavLink to='/event-creator'>Create Event</NavLink>
            </div>
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
        <>
            <NavLink exact to='/homepage' id='home-link'>EventFright</NavLink>
            <div>
                {isLoaded && sessionLinks}
            </div>
        </>

    );
}

export default Navigation;
