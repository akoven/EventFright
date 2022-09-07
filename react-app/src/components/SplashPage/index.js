import React from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getEventThunk } from '../../store/event';
// import { getCategoryThunk } from '../../store/category';
import { getVenueThunk } from '../../store/venue';
const SplashPage = () =>{

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const allEvents = useSelector(state => Object.values(state.event))
    const allVenues = useSelector(state => Object.values(state.venue))
    // const allCategories = useSelector(state => Object.values(state.category))
    // const selectedVenue  = allVenues.filter(venue => venue.id + 1 === event.venue_id)

    useEffect(() =>{
        dispatch(getEventThunk())

    }, [dispatch])

    useEffect(() =>{
        dispatch(getVenueThunk())
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getCategoryThunk())
    // }, [dispatch])

    console.log('ALL EVENTS: ',allEvents)
    console.log('ALL VENUES: ',allVenues)
    const selectedVenue = [];
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
                {/* {allCategories.map(category =><div>{category.type}</div>)} */}
                <h3>Local Events</h3>
                {allEvents.map(event => <div>
                    <img src={event.event_image}/>
                    <h3>{event.event_name}</h3>
                    <p>{event.description}</p>
                    <p>Date and Time: {event.date}</p>
                    <p>Capacity: {event.capacity}</p>
                    <p>{event.venue_id}</p>
                </div>)}
            </div>

        </div>
    )
}

{/* {allVenues.filter(venue => venue.id + 1 === event.venue_id ? <div>{venue.name}</div>:'')} */}
export default SplashPage;
