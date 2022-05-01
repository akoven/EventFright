import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import * as sessionActions from '../../store/session';

const ProfileButton = ({user}) => {
    const dispatch = useDispatch();
    const [menu, setMenu] = useState(false);

    const openMenu = () =>{
        if(menu) return;
        setMenu(true);
    };

    useEffect(() => {
        if(!menu) return;
        const closeMenu = () => {
            setMenu(false);
        };
        document.addEventListener('click',closeMenu);
        return () => document.removeEventListener('click', closeMenu)
    }, [menu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
      };

    return(
        <div>
            <button onClick={openMenu}><i className="fa-solid fa-bars"/></button>
            {menu && (
                <ul className="dropdown-nav-menu">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li><button onClick={logout}>Log Out</button></li>
                </ul>
            )}
        </div>
    )
};

export default ProfileButton;
