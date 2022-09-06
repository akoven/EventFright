import React from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getEventThunk } from '../../store/event';

const SplashPage = () =>{

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const allEvents = useSelector(state => Object.values(state.event))
    const allCategories = useSelector(state => Object.values(state.category))
    useEffect(() =>{
        dispatch(getEventThunk())
    }, [dispatch])

    console.log('ALL EVENTS: ',allEvents)

    return(
        <div className='main'>
            <div className='banner-div'>
                <h1>Events and frontpage image will appear here</h1>
                <div>
                    <img className='banner-img' src='https://i.pinimg.com/originals/8c/31/0d/8c310d583f66f16a80331c008068ecd6.jpg'/>
                </div>
            </div>
            <div>
                <h3>Check out these categories</h3>
                {allCategories.map(category =><div>{category.type}</div>)}
                <h3>Local Events</h3>
                {allEvents.map(event => <div>
                    <img src={event.event_image}/>
                    <h3>{event.event_name}</h3>
                    <p>{event.description}</p>
                    <p>Date and Time: {event.date}</p>
                    <p>Capacity: {event.capacity}</p>
                </div>)}

            </div>

        </div>
    )
}

export default SplashPage;
