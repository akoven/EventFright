import React from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getEventThunk } from '../../store/event';

const SplashPage = () =>{

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const allEvents = useSelector(state => Object.values(state.event))

    useEffect(() =>{
        dispatch(getEventThunk())
    }, [dispatch])

    console.log('ALL EVENTS: ',allEvents)

    return(
        <div className='main'>
            <div className='banner-div'>
                <h1>Events and frontpage image will appear here</h1>
                <div>
                    <img className='banner-img' src='https://i.ytimg.com/vi/Ah7285f_byI/maxresdefault.jpg' alt='https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/lake-michigan-moonrise-steve-gadomski.jpg'/>
                </div>
            </div>
            <div>
                <h3>Check out these categories</h3>
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
