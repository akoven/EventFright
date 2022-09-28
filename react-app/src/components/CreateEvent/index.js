import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from "react-router-dom";
import { addEventThunk } from "../../store/event";
// import { getVenueThunk } from "../../store/venue";
// import { getCategoryThunk } from "../../store/category";
import './index.css';

// set error check for capacity less than 1, dates that are in the past
const CreateEvent = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);
    const categories = useSelector(state => Object.values(state.category));
    const venues = useSelector(state => Object.values(state.venue));

    // useEffect(() =>{
    //     dispatch(getVenueThunk());
    // }, [dispatch]);

    // useEffect(() =>{
    //     dispatch(getCategoryThunk());
    // }, [dispatch])

    // const [host, setHost] = useState()
    const [selectCategory, setSelectCategory] = useState('')
    const [eventName, setEventName] = useState('')
    const [eventVenue, setEventVenue] = useState('')
    const [eventCategory, setEventCategory] = useState('')
    const [eventDescription,setEventDescription] = useState('')
    const [eventImage, setEventImage] = useState('')
    const [eventDate,setEventDate] = useState(new Date())
    const [eventCapacity,setEventCapacity] = useState('')

    // console.log('current user: ',currentUser.id)
    // console.log('CATEGORIES: ',categories)
    // console.log('LOCATIONS: ', venues)
    // console.log('EVENT VENUE: ', eventVenue)
    // console.log('EVENT CATEGORY: ', eventCategory)


    // const options = {
    //     weekday: 'long',
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric'
    // };

    const handleSubmit= async e =>{
        e.preventDefault();
        const payload = {
            host_id: currentUser.id,
            venue_id: +eventVenue,
            category_id: +eventCategory,
            event_name: eventName,
            description: eventDescription,
            event_image: eventImage,
            date: eventDate.toLocaleString('en-US'),
            capacity: +eventCapacity
        }


        // console.log('payload being passed to add event thunk ',payload)
        // console.log('selected date ', new Date(eventDate))
            // console.log('NEW DATE: ', eventDate.toLocaleString('en-US', options))
            // console.log('NEW DATE: ', eventDate.toLocaleString('en-US', {hour12: true}))

        const newEvent = await dispatch(addEventThunk(payload))
        if(newEvent){
            history.push('/')
        }
    };

    return(
        <div className="create-event-page">
            <header>
                <span><button onClick={() => history.push('/create-category')}>Create a new category</button></span>
                <span><button onClick={() => history.push('/create-venue')}>Create a new venue</button></span>
                <span className="user-events"><button onClick={() => history.push(`/events/${currentUser.id}`)}>See your events</button></span>
            </header>
            <div className="form-field">
                <form onSubmit={handleSubmit} className="form-body">
                    <div className="event-name">
                        <label className="event-name-label">Event Name</label>
                        <input
                            type="string"
                            placeholder="Be clear and descriptive."
                            value={eventName ? eventName:''}
                            onChange={e => setEventName(e.target.value)}
                            required
                            />
                    </div>
                    <div className="event-img">
                        <label className="event-image-label">Event Image</label>
                        <input
                            type="string"
                            placeholder="image formats .jpg, .jpeg, .png only"
                            value={eventImage ? eventImage:''}
                            onChange={e => setEventImage(e.target.value)}
                            required
                        />
                    </div>
                    <div className="description">
                        <label className="event-description-label">Description</label>
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
                    <div className="category">
                        <label className="event-category-label">Category</label>
                        <select onChange={e => setEventCategory(e.target.value)}>
                            <option value='' disabled selected>select a category</option>
                            {categories.map(category => <option value={category.id}>{category.type}</option>)}
                        </select>
                    </div>
                    <div className="venue">
                        <label className="event-venue-label">Venue</label>
                        <select onChange={e => setEventVenue(e.target.value)}>
                            <option value='' disabled selected>select a venue</option>
                            {venues.map(location =>
                                <option value={location.id}>{location.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="capacity">
                        <label className="event-capacity-label">Capacity</label>
                        <input
                            type="number"
                            value = {eventCapacity ? eventCapacity:''}
                            onChange={e => setEventCapacity(e.target.value)}
                            min={1}
                        />
                    </div>
                    <div className="date">
                        <label className="event-date-label">Date and Time</label>
                        <DatePicker selected={eventDate} onChange={eventDate =>setEventDate(eventDate)} showTimeSelect timeFormat="HH:mm:ss" timeIntervals={15} dateFormat="yyyy-MM-dd"/>
                    </div>
                    <div className="submit-cancel">
                        <span className="submit-btn">
                            <button type="submit">Submit</button>
                        </span>
                        <span className="cancel-btn">
                            <button onClick={() => history.push('/')}>Cancel</button>
                        </span>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default CreateEvent;
