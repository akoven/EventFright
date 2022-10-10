import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getEventThunk } from '../../store/event';

import './index.css';

const EventRegistration = () =>{

    const dispatch = useDispatch();
    const allEvents = useSelector(state => Object.values(state.event));
    const eventId = useParams();
    const history = useHistory();
    const selectedEvent = allEvents.filter(event => event.id === +eventId.id)

    useEffect(() =>{
        dispatch(getEventThunk());
        console.log('ALL EVENTS: ', allEvents)
        // console.log('event id type: ', typeof(eventId.id))
        console.log('SELECTED EVENT: ', selectedEvent[0])
    }, [dispatch])

    return(
        <div className='registration-pg'>
            <div className='registration-div'>
                <header className='registration-header'><NavLink to={'/'} className='registration-homepage-link'>Event Fright</NavLink></header>
                <div className='event-info-ticket-div'>
                    <div className='event-info-div'>
                        <img className='selected-img' src={selectedEvent[0].event_image}/>
                        <h2>{selectedEvent[0].date}</h2>
                        <h1 className='selected-event-title'>{selectedEvent[0].event_name}</h1>
                        <h3>About this event:</h3>
                        <p className='selected-event-description'>{selectedEvent[0].description}</p>
                    </div>
                    <div className='registration-tickets-span'>
                        <h4>price shows here</h4>
                        <button className='tickets-btn-on-reg-pg' onClick={() => history.push(`/purchase-tickets/${selectedEvent[0].id}`)}>Tickets</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventRegistration;
