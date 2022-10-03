import React,{useEffect} from 'react';
import { useParams, Redirect, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getEventThunk } from '../../store/event';
import { removeEventThunk } from '../../store/event';
import './UserEvents.css'

const UserEvents = () =>{
    const userEvents = useSelector(state => Object.values(state.event));
    // const currentUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useParams();

    const selectedEvents = userEvents.filter(event => event.user.id === +userId.id);

    useEffect(() =>{
        dispatch(getEventThunk())
    }, [dispatch])

    // console.log('current user id: ', userId.id)
    // console.log(currentUser.id === +userId.id)
    // console.log('new events array: ',selectedEvents)

    // console.log(typeof(+userId.id))
    // console.log(typeof(parseInt(userId.id,10)))

    // const handleDelete = () =>{
    //    return
    // }

    // const handleEdit = (id) =>{
    //     history.push(`/edit-event/${id}`)
    // }

    const handleDelete = async (eventId) =>{
       await dispatch(removeEventThunk(eventId))
    }

    return(
        <div>
            <header><NavLink to='/' className='home-pg-link-user-events'>Event Fright</NavLink></header>
            <h1 className='user-event-header'>Events</h1>
            <div>
                {selectedEvents.map(event => <div className='event-card'>
                    <img className='image-div' src={event.event_image}/>
                    <h3>{event.event_name}</h3>
                    <p>{event.description}</p>
                    <p>Date and Time: {event.date}</p>
                    <p>Capacity: {event.capacity}</p>
                    <p>Location: {event.venue.name}</p>
                    <p>{event.venue.address} {event.venue.city}, {event.venue.state} {event.venue.zip_code}</p>
                    <p>Category: {event.category.type}</p>
                    <span>
                        <button className='edit-event' onClick={() => history.push(`/edit-event/${event.id}`)}>Edit</button>
                        <button className='delete-event' onClick={() => handleDelete(event.id)}>Delete</button>
                    </span>
                </div>)}
            </div>
        </div>
    )
}

export default UserEvents;
