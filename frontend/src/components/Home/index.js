import { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getEventThunk} from '../../store/event'

const Home = () => {
    const events = useSelector(state => state.events);
    const eventsArr = Object.values(events || {});

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEventThunk())
    },[])
    return(
        <>
            <h1>Events!</h1>
            {eventsArr?.map(event => (
                <>
                    <p>{event.name}</p>
                    <p>{event.date}</p>
                    <p>{event.capacity}</p>
                </>

            ))}
        </>
    )
}

export default Home;
