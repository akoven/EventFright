
import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
import { logout } from '../store/session';
import './NavBar.css'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
  const dispatch = useDispatch()
  const history = useHistory()
  const [openMenu, setOpenMenu] = useState(false)

  const userMenu = () =>{
    if(openMenu)return;
    setOpenMenu(true)
  }

  useEffect(() =>{
    if(!openMenu) return;
    const closeMenu = () =>{
      setOpenMenu(false)
    }
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [openMenu]);

  const logoutAction = e =>{
    e.preventDefault();
    dispatch(logout());
    history.push('/login');
  }

  return(
    <div>
      <header>
          <div className='title'>
            <h1>Event Fright</h1>
            <div className='test-btn'>
              <button className='userBtn' onClick={userMenu}>
                <span className='user-email'><i class="fa-solid fa-user" /> {currentUser.email}</span>
              </button>
              {
               openMenu && (
                <ul className='logoutDiv'>
                  <li>
                    <button onClick={logoutAction} className='logoutBtn'>
                      Log out
                    </button>
                  </li>
                  <li>
                    <NavLink className='user-events-nav-bar-btn' to={`/events/${currentUser.id}`}>Check out your events</NavLink>
                  </li>
                  <li><NavLink className='venue-btn' to={`/create-venue/${currentUser.id}`}>Add a venue</NavLink></li>
                  <li><NavLink className='category-btn' to={`/create-category/${currentUser.id}`}>Add a category</NavLink></li>
                </ul>
                )
              }
              <NavLink className='createEvent' to={'/create-event'}>
                <span className='create-event-link'><i class="fa-regular fa-plus" /> Create an event</span>
              </NavLink>

              <NavLink className='tickets' to={'/tickets'}>
              <i class="fa-solid fa-ticket" />Get Tickets
              </NavLink>
            </div>
          </div>

      </header>

    </div>
  );
}

export default NavBar;
