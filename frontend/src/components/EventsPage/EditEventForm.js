import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {editEventThunk} from '../../store/event';
import { useParams, useHistory } from 'react-router-dom';

const EditEventForm = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const {id} = useParams();
    const selectedEvent = useSelector(state => state.events.id)

    const [name, setName] = useState(selectedEvent.name);
    const [date, setDate] = useState(selectedEvent.date);
    const [capacity, setCapacity] = useState(selectedEvent.capacity);

    const handleSubmit = e => {
        e.preventDefault();
        const event = {id,name,date,capacity};
        const editedEvent = dispatch(editEventThunk(event));

        if(editedEvent){
            history.push('/homepage')
        }


    }

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

export default EditEventForm;
