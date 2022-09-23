import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory, useParams } from "react-router-dom";
import { editEventThunk } from "../../store/event";
// import { getVenueThunk } from "../../store/venue";
// import { getCategoryThunk } from "../../store/category";
import './index.css';

const EditEvent = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const currentUser = useSelector(state => state.session.user);
    const selectedEvent = useSelector(state => state.event);
    const categories = useSelector(state => Object.values(state.category));
    // console.log('selectedEvent results: ',selectedEvent[id])
    const venues = useSelector(state => Object.values(state.venue));
    // console.log('categories: ', categories);
    // console.log('venues: ', venues);
    // console.log(typeof(currentUser.id));
    // useEffect(() =>{
    //     dispatch(getVenueThunk());
    // }, [dispatch]);

    // useEffect(() =>{
    //     dispatch(getCategoryThunk());
    // }, [dispatch])

    const [eventName, setEventName] = useState(selectedEvent[id].event_name)
    const [eventImage, setEventImage] = useState(selectedEvent[id].event_image)
    const [eventDescription, setEventDescription] = useState(selectedEvent[id].description)
    const [eventCategory, setEventCategory] = useState('');
    const [eventVenue, setEventVenue] = useState('');
    const [eventCapacity, setEventCapacity] = useState(selectedEvent[id].capacity);
    const [eventDate, setEventDate] = useState(new Date());

    const venue_id = +eventVenue
    const category_id = +eventCategory
    const event_name = eventName
    const description = eventDescription
    const event_image = eventImage
    const date = `${eventDate}`
    const capacity = +eventCapacity


    const handleSubmit= async e =>{
        e.preventDefault();
        const payload = {
            host_id: currentUser.id,
            venue_id,
            category_id,
            event_name,
            description,
            event_image,
            date,
            capacity
        }
        // console.log('payload being passed to thunk: ',payload)
        // console.log(typeof(+eventCapacity))
        // console.log(typeof(currentUser.id))

        const editedEvent = await dispatch(editEventThunk(payload, id));
        if(editedEvent){
            history.push(`/events/${currentUser.id}`)
        }
    }

    return(
        <div>
            <header>
                <span><button onClick={() => history.push('/create-category')}>Create a new category</button></span>
                <span><button onClick={() => history.push('/create-venue')}>Create a new venue</button></span>
                <span className="user-events"><button onClick={() => history.push(`/events/${currentUser.id}`)}>See your events</button></span>
            </header>
            <div className="form-field">
                <form onSubmit={handleSubmit} className="form-body">
                    <div className="event-name">
                        <label>Event Name</label>
                        <input
                            type="string"
                            placeholder="Be clear and descriptive."
                            value={eventName ? eventName:''}
                            onChange={e => setEventName(e.target.value)}
                            required
                            />
                    </div>
                    <div className="event-img">
                        <label>Event Image</label>
                        <input
                            type="string"
                            placeholder="image formats .jpg, .jpeg, .png only"
                            value={eventImage ? eventImage:''}
                            onChange={e => setEventImage(e.target.value)}
                            required
                        />
                    </div>
                    <div className="description">
                        <label>Description</label>
                        <textarea
                            type = "text"
                            placeholder="give a brief event description, 2000 characters or less"
                            value={eventDescription ? eventDescription:''}
                            onChange={e => setEventDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="category">
                        <label>Category</label>
                        <select onChange={e => setEventCategory(e.target.value)}>
                            <option value='' disabled selected>select a category</option>
                            {categories.map(category => <option value={category.id}>{category.type}</option>)}
                        </select>
                    </div>
                    <div className="venue">
                        <label>Venue</label>
                        <select onChange={e => setEventVenue(e.target.value)}>
                            <option value='' disabled selected>select a venue</option>
                            {venues.map(location =>
                                <option value={location.id}>{location.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="capacity">
                        <label>Capacity</label>
                        <input
                            type="number"
                            value = {eventCapacity ? eventCapacity:''}
                            onChange={e => setEventCapacity(e.target.value)}
                            min={1}
                        />
                    </div>
                    <div className="date">
                        <label>Date and Time</label>
                        <DatePicker selected={eventDate} onChange={eventDate =>setEventDate(eventDate)} showTimeSelect timeFormat="HH:mm:ss" timeIntervals={15} dateFormat="yyyy-MM-dd"/>
                    </div>
                    <div className="submit-cancel">
                        <span className="submit-btn">
                            <button type="submit">Submit</button>
                        </span>
                        <span className="cancel-btn">
                            <button onClick={() => history.push(`/events/${currentUser.id}`)}>Cancel</button>
                        </span>
                    </div>
                </form>
                <img src={`${eventImage}`} alt='image appears here' className="edit-image" />
            </div>
        </div>

    )

}

export default EditEvent;
