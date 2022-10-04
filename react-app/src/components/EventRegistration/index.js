import { NavLink } from 'react-router-dom';
import './index.css';

const EventRegistration = () =>{
    return(
        <div className='registration-pg'>
            <header className='registration-header'><NavLink to={'/'} className='registration-homepage-link'>Event Fright</NavLink></header>
            <h1 className='coming-soon'>Coming Soon!!</h1>
        </div>
    )
}

export default EventRegistration;
