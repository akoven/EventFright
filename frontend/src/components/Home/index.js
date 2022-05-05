import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getEventThunk} from '../../store/event'
// import { Redirect } from "react-router-dom";

const Home = () => {
    const events = useSelector(state => state.events);
    const eventsArr = Object.values(events || {});

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEventThunk())
    },[dispatch])
    return(
        <>
            <h1>Events!</h1>
            {eventsArr?.map(event => (
                <>
                    <p>Event: {event.name}</p>
                    <p>Date: {event.date}</p>
                    <p>Max Capacity: {event.capacity}</p>
                    <button type='button' onClick={event => window.location.href=`/edit-event/${event.id}`}>Edit</button>
                    <button type='button'>Delete</button>
                </>

            ))}
        </>
    )
}

export default Home;
