
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import { useSelector } from 'react-redux';

const NavBar = () => {
  // return (
  //   <nav>
  //     <ul>
  //       <li>
  //         <NavLink to='/' exact={true} activeClassName='active'>
  //           Home
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to='/login' exact={true} activeClassName='active'>
  //           Login
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to='/sign-up' exact={true} activeClassName='active'>
  //           Sign Up
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to='/users' exact={true} activeClassName='active'>
  //           Users
  //         </NavLink>
  //       </li>
  //       <li>
  //         <LogoutButton />
  //       </li>
  //     </ul>
  //   </nav>
  // );

  const currentUser = useSelector(state => state.session.user)

  return(
    <div>
      <header>
          <div className='title'>
            <h1>Event Fright</h1>
            <div className='test-btn'>
              <button className='userBtn'>
                <i class="fa-solid fa-user" /> {currentUser.email}
              </button>
            </div>
              <button className='createEvent'>Create an event</button>
          </div>

      </header>

    </div>
  );
}

export default NavBar;
