import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getEventThunk } from '../../store/event';
import { NavLink, useHistory } from "react-router-dom";
import defaultImage from '../../images/defaultImage.jpg';
import './index.css';

const Tickets = () =>{

    const dispatch = useDispatch();
    const allEvents = useSelector(state => Object.values(state.event))
    const history = useHistory();

    useEffect(() =>{
        dispatch(getEventThunk())
    }, [dispatch])


    return(
        <div className="registration-page">
            <header className="purchase-button">
                <span className="registration-header-span">
                    <NavLink to={'/'} className='registration-pg-home-link'>Event Fright</NavLink>
                    <span className="purchase-btn-span"><button className="purchase-btn" onClick={() => history.push('/tickets/new')}>See your purchases</button></span>
                </span>
            </header>
            <h3 className="tickets-header">Upcoming Events</h3>
            {allEvents.map(event => <div className="event-registration-div">
                <img className='registration-img' src={event.event_image} alt='https://st.depositphotos.com/1026550/4380/i/600/depositphotos_43807431-stock-photo-halloween.jpg' onError={e =>{
                        if(event.event_image){
                            e.currentTarget.src='https://st.depositphotos.com/1026550/4380/i/600/depositphotos_43807431-stock-photo-halloween.jpg'
                        }
                    }
                }/>
                <h3>{event.event_name}</h3>
                <p>{event.description}</p>
                <p>Date and Time: {event.date}</p>
                <p>Tickets Available: {event.capacity}</p>
                <p>Location: {event.venue.name}</p>
                <p>{event.venue.address} {event.venue.city}, {event.venue.state} {event.venue.zip_code}</p>
                <p>Category: {event.category.type}</p>
                <button className="purchase-ticket-btn" onClick={() => history.push('/tickets/new')}>Purchase Tickets</button>
            </div>
            )
        }
        {/* comment! */}

        </div>

    )
}

export default Tickets;
