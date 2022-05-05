import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getEventThunk} from '../../store/event'
// import { useParams } from "react-router-dom";
import './index.css';

const Home = () => {
    const events = useSelector(state => state.events);
    const eventsArr = Object.values(events || {});
    // const {id} = useParams();
    const session = useSelector(state => state.session.user);
    const [hidden, setHidden] = useState('hidden');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEventThunk())
    },[dispatch])

    useEffect(() => {
        if(session?.user.id){
            setHidden('')
        }else{
            setHidden('hidden')
        }
    },[session])
    return(
        <>
            <h1>Events!</h1>
            {eventsArr?.map(event => (
                <>
                    <p>Event: {event.name}</p>
                    <p>Date: {event.date}</p>
                    <p>Max Capacity: {event.capacity}</p>
                    <button type='button' className={`${hidden}`} onClick={event => window.location.href=`/edit-event/${event.id}`}>Edit</button>
                    <button type='button'>Delete</button>
                </>

            ))}
        </>
    )
}

export default Home;
