import React, {useState} from 'react';
// import * as sessionActions from '../../store/session'; working on a session action for events
import { useDispatch,useSelector } from 'react-redux';


const EventsPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [errors, setErrors] = useState([]);


    const handleSubmit = e =>{
        e.preventDefault();
        setErrors([]);
    }

    if(sessionUser){
        return(
            <form onSubmit={handleSubmit}>
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
                    type='text'
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
            </form>
        )
    };


}

export default EventsPage;
