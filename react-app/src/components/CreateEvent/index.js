import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from "react-router-dom";
import { addEventThunk } from "../../store/event";

const CreateEvent = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);
    // const category = useSelector(state => state.categories);
    const locations = useSelector(state => state.venues);

    const [eventImg,setUserImg] = useState('')
    // const [host, setHost] = useState()
    const [eventName,setEventName] = useState('')
    const [selectCategory, setSelectCategory] = useState('')
    const [eventLocation, setEventLocation] = useState('')
    const [eventDescription,setEventDescription] = useState('')
    const [eventImage, setEventImage] = useState('')
    const [eventDate,setEventDate] = useState(new Date())
    const [eventCapacity,setEventCapacity] = useState('')

    // console.log('current user: ',currentUser.id)
    // console.log('CATEGORIES: ',category)
    // console.log('LOCATION: ', location)


    const handleSubmit= async e =>{
        e.preventDefault();
        const payload = {
            host_id: currentUser.id,
            eventLocation,
            selectCategory,
            eventName,
            eventDescription,
            eventImage,
            eventDate,
            eventCapacity
        }

        console.log('payload being passed to add event thunk ',payload)
        const newEvent = await dispatch(addEventThunk(payload))
        if(newEvent){
            history.push('/')
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event Title</label>
                    <input
                        type="string"
                        placeholder="Be clear and descriptive."
                        value={eventName ? eventName:''}
                        onChange={e => setEventName(e.target.value)}
                        required
                        />
                </div>
                <div>
                    <label>Event Image</label>
                    <input
                        type="string"
                        placeholder="image formats .jpg, .jpeg, .png only"
                        value={eventImage ? eventImage:''}
                        onChange={e => setEventImage(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        type = "text"
                        placeholder="give a brief event description, 2000 characters or less"
                        value={eventDescription ? eventDescription:''}
                        onChange={e => setEventDescription(e.target.value)}
                        required
                    />
                </div>
                {/* <div>
                    <label>Orgainizer</label>
                    <input
                        type="string"
                        placeholder="Tell attendees who is organizing this event."
                        value={host ? host:''}
                        onChange={e => setHost(e.target.value)}
                        required
                        />
                </div> */}
                <div>
                    <label>Category</label>
                    <select onChange={e => setSelectCategory(e.target.value)}>
                        <option value="Entertainment">Flim, Media, and Entertainment</option>
                        <option value="Outdoors">Outdoors</option>
                        <option value="Dining">Dining</option>
                    </select>
                </div>
                <div>
                    <label>Location</label>
                    <select onChange={e => setEventLocation(e.target.value)}>
                        {/* <option value="Old Prison">Eastern State Penitentiary</option>
                        <option value="Smyer">Smyer</option>
                        <option value="Hotel">Hart House Hotel</option> */}
                        {locations.map(location =>{
                            <option>{location.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label>Capacity</label>
                    <input
                        type="number"
                        value = {eventCapacity ? eventCapacity:''}
                        onChange={e => setEventCapacity(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date and Time</label>
                    <DatePicker selected={eventDate} onChange={eventDate =>setEventDate(eventDate)} showTimeSelect timeFormat="HH:mm:ss" timeIntervals={15} dateFormat="yyyy-MM-dd"/>
                </div>
                <span>
                    <button type="submit">Submit</button>
                    <button onClick={() => history.push('/')}>Cancel</button>
                </span>
            </form>
        </div>

    )
}

export default CreateEvent;
