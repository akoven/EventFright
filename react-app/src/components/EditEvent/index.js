import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory, useParams } from "react-router-dom";
import { editEventThunk } from "../../store/event";
import { getVenueThunk } from "../../store/venue";
import { getCategoryThunk } from "../../store/category";
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
    useEffect(() =>{
        dispatch(getVenueThunk());
    }, [dispatch]);

    useEffect(() =>{
        dispatch(getCategoryThunk());
    }, [dispatch])

    const [eventName, setEventName] = useState(selectedEvent[id].event_name)
    const [eventImage, setEventImage] = useState(selectedEvent[id].event_image)
    const [eventDescription, setEventDescription] = useState(selectedEvent[id].description)
    const [eventCategory, setEventCategory] = useState('');
    const [eventVenue, setEventVenue] = useState('');
    const [eventCapacity, setEventCapacity] = useState(selectedEvent[id].capacity);
    const [eventDate, setEventDate] = useState(new Date());
    const [validationErrors, setValidationErrors] = useState([])

    const host_id = currentUser.id
    const venue_id = +eventVenue
    const category_id = +eventCategory
    const event_name = eventName
    const description = eventDescription
    const event_image = eventImage
    const date = eventDate.toLocaleString('en-US')
    const capacity = +eventCapacity

    let errors = [];

    const filterTime = (date) =>{
        const isPast = new Date().getTime() < date.getTime();
        return isPast;
    };

    const handleSubmit= async e =>{
        e.preventDefault();
        const payload = {
            host_id,
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
        if(eventName.length === 0 && eventName.length <= 50){
            errors.push('You must provide an event name');
        };

        if(eventName.length > 50){
            errors.push('Your event name must be 50 characters long or less')
        };

        if(eventImage.length === 0){
            errors.push('You must provide an image url')
        }

        if(!eventImage.includes('.jpg') && !eventImage.includes('.jpeg') && !eventImage.includes('.png')){
            errors.push('Your image must be in .jpg, .jpeg, or .png formats')
        }

        if(eventDescription.length === 0){
            errors.push('You must provide a brief description')
        }else if(eventDescription.length > 2000){
            errors.push('Your description should be 2000 characters or less')
        }

        if(+eventVenue === 0){
            errors.push('You must select a venue')
        }

        if(+eventCategory === 0){
            errors.push('You must select a category')
        }

        if(eventCapacity === 0){
            errors.push('You must provide the capacity for your event')
        }

        // if(new Date(eventDate) - new Date() <= 0){
        //     errors.push('You must select a date and time in the future')
        // }

        setValidationErrors(errors);

        if(errors.length === 0){
            const editedEvent = await dispatch(editEventThunk(payload, id));
            if(editedEvent){
                alert('successfully created edited event')
                history.push(`/events/${currentUser.id}`)
            }
        }
    }

    return(
        <div className="edit-event-pg">
            <header className='category-venue-header'>
                <span className='see-category-span'><button className='see-category-btn' onClick={() => history.push(`/create-category/${currentUser.id}`)}>See categories</button></span>
                <span className='see-venue-span'><button className='see-venue-btn' onClick={() => history.push(`/create-venue/${currentUser.id}`)}>See venues</button></span>
                <span className="user-events"><button className='user-events-btn' onClick={() => history.push(`/events/${currentUser.id}`)}>See your events</button></span>
            </header>
            <h3 className="edit-event-label">Edit Event</h3>
            <div className="form-field">
                <form onSubmit={handleSubmit} className="form-body">
                    <ul>
                        {validationErrors.map(error => <li className="error-msgs">{error}</li>)}
                    </ul>
                    <h4 className="required-fields">Required fields are in red in marked with an *</h4>
                    <div className="event-name">
                        <label className="event-name-label">Event Name *</label>
                        <input
                            type="string"
                            placeholder="Be clear and descriptive."
                            value={eventName ? eventName:''}
                            onChange={e => setEventName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="event-img">
                        <label className="event-img-label">Event Image *</label>
                        <input
                            type="string"
                            placeholder="image formats .jpg, .jpeg, .png only"
                            value={eventImage ? eventImage:''}
                            onChange={e => setEventImage(e.target.value)}
                            required
                        />
                    </div>
                    <div className="description">
                        <label className="description-label">Description *</label>
                        <textarea
                            type = "text"
                            placeholder="give a brief event description, 2000 characters or less"
                            value={eventDescription ? eventDescription:''}
                            onChange={e => setEventDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="category">
                        <label className="event-category-label">Category *</label>
                        <select onChange={e => setEventCategory(e.target.value)}>
                            <option value='' disabled selected>select a category</option>
                            {categories.map(category => <option value={category.id}>{category.type}</option>)}
                        </select>
                    </div>
                    <div className="venue">
                        <label className="venue-label">Venue *</label>
                        <select onChange={e => setEventVenue(e.target.value)}>
                            <option value='' disabled selected>select a venue</option>
                            {venues.map(location =>
                                <option value={location.id}>{location.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="capacity">
                        <label className="capacity-label">Capacity *</label>
                        <input
                            type="number"
                            value = {eventCapacity ? eventCapacity:''}
                            onChange={e => setEventCapacity(e.target.value)}
                            min={1}
                            max={300}
                        />
                    </div>
                    <div className="date">
                        <label className="date-time-label">Date and Time *</label>
                        <DatePicker selected={eventDate} onChange={eventDate =>setEventDate(eventDate)} showTimeSelect timeFormat="h:mm aa" timeIntervals={15} dateFormat="MM/dd/yyy" minDate={new Date()} filterTime={filterTime}/>
                    </div>
                    <div className="submit-cancel">
                        <span className="submit-btn">
                            <button type="submit" className="edit-event-submit-btn">Submit</button>
                        </span>
                        <span className="cancel-btn">
                            <button onClick={() => history.push(`/events/${currentUser.id}`)} className='edit-event-cancel-btn'>Cancel</button>
                        </span>
                    </div>
                </form>
                <img src={`${eventImage}`} alt='image appears here' className="edit-image"  onError={e => {e.currentTarget.src = 'default image here'}}/>
            </div>
        </div>

    )

}

export default EditEvent;
