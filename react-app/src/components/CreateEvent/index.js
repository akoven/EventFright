import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const CreateEvent = () =>{
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const category = useSelector(state => state.categories);
    const location = useSelector(state => state.venues)

    const [eventImg,setUserImg] = useState()
    const [host, setHost] = useState()
    const [eventName,setEventName] = useState()
    const [selectCategory, setSelectCategory] = useState()
    const [eventLocation, setEventLocation] = useState()
    const [eventDescription,setEventDescription] = useState()
    const [eventDate,setEventDate] = useState(new Date())
    const [eventCapacity,setEventCapacity] = useState()

    console.log('current user: ',currentUser.id)
    // console.log('CATEGORIES: ',category)
    // console.log('LOCATION: ', location)


    const handleSubmit= async e =>{
        e.preventDefault();
    }

    return(
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
                <label>Orgainizer</label>
                <input
                    type="string"
                    placeholder="Tell attendees who is organizing this event."
                    value={host ? host:''}
                    onChange={e => setHost(e.target.value)}
                    required
                    />
            </div>
            <div>
                <label>Category</label>
                <select>
                    <option value="Entertainment">Flim, Media, and Entertainment</option>
                    <option value="Outdoors">Outdoors</option>
                    <option value="Dining">Dining</option>
                </select>
            </div>
            <div>
                <label>Location</label>
                <select>
                    <option value="Old Prison">Eastern State Penitentiary</option>
                    <option value="Smyer">Smyer</option>
                    <option value="Hotel">Hart House Hotel</option>
                </select>
            </div>
            <div>
                <label>Date and Time</label>
                <DatePicker selected={eventDate} onChange={eventDate =>setEventDate(eventDate)} showTimeSelect timeFormat="HH:mm:ss" timeIntervals={15} dateFormat="yyyy-MM-dd"/>
            </div>
        </form>
    )
}

export default CreateEvent;
