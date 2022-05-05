import React, {useState} from 'react';
import * as eventActions from '../../store/event'; //working on a session action for events
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const EventsPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [errors, setErrors] = useState([]);


    const handleSubmit = async(e) =>{
        e.preventDefault();
        setErrors([]);
        // if(!sessionUser){
        //     return alert('You must be logged in to post an event!');
        // }
        const newEvent = await dispatch(eventActions.createEventThunk({hostId: sessionUser.id,name,date,capacity}))

        // .catch(async(res) => {
        //     const data = await res.json();
        //     if(data && data.errors) setErrors(data.errors);
        // });

        if(newEvent){
            history.push('/homepage')
        }
    }

        return(
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error,id) => <li key={id}>{error}</li>)}
                </ul>
                <label>
                    Event:
                    <input
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    />
                </label>
                <label>
                    Date:
                    <input
                    type='date'
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                    />
                </label>
                <label>
                    Capacity:
                    <input
                    type='integer'
                    value={capacity}
                    onChange={e => setCapacity(e.target.value)}
                    required
                    />
                </label>
                <button>
                    Submit Event!
                </button>
                <button type='button' onClick={() => window.location.href='/homepage'}>Cancel</button>



            </form>
        )


}

export default EventsPage;
