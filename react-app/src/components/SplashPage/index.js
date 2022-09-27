import React from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getEventThunk } from '../../store/event';
import { getCategoryThunk } from '../../store/category';
import { getVenueThunk } from '../../store/venue';

const SplashPage = () =>{

    const dispatch = useDispatch();
    // const currentUser = useSelector(state => state.session.user)
    const allEvents = useSelector(state => Object.values(state.event))
    // const allVenues = useSelector(state => Object.values(state.venue))
    const allCategories = useSelector(state => Object.values(state.category))


    useEffect(() =>{
        dispatch(getEventThunk())

    }, [dispatch])

    useEffect(() =>{
        dispatch(getVenueThunk())
    }, [dispatch])

    useEffect(() => {
        dispatch(getCategoryThunk())
    }, [dispatch])

    // console.log('ALL EVENTS: ',allEvents)
    // console.log('ALL VENUES: ',allVenues)
    // console.log('Time: ', (new Date(allEvents[3].date) - new Date(allEvents[0].date))/86400000)
    return(
        <div className='main'>
            <div className='banner-div'>
                <h1>Browse our events or post your own event!</h1>
                <div>
                    <img className='banner-img' src='https://i.pinimg.com/originals/8c/31/0d/8c310d583f66f16a80331c008068ecd6.jpg'/>
                </div>
            </div>
            <div>

                <h3>Check out these categories</h3>
                {allCategories.map(category =><div className='front-pg-category'>{category.type}</div>)}
                <h3>Local Events</h3>
                {allEvents.map(event => <div className='event-card'>
                    <img className='image-div' src={event.event_image}/>
                    <h3>{event.event_name}</h3>
                    <p>{event.description}</p>
                    <p>Date and Time: {event.date}</p>
                    <p>Capacity: {event.capacity}</p>
                    <p>Location: {event.venue.name}</p>
                    <p>{event.venue.address} {event.venue.city}, {event.venue.state} {event.venue.zip_code}</p>
                    <p>Category: {event.category.type}</p>

                </div>)}
            </div>

        </div>
    )
}

{/* {allVenues.filter(venue => venue.id === event.venue_id ? <p>Location: {venue.name}</p>:null)} */}
export default SplashPage;
