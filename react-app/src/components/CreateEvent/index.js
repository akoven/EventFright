import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from "react-router-dom";
import { addEventThunk } from "../../store/event";
import { getVenueThunk } from "../../store/venue";
import { getCategoryThunk } from "../../store/category";
// import '../DefaultImage/default-image.jpg';
import './index.css';

// set error check for capacity less than 1, dates that are in the past
const CreateEvent = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);
    const categories = useSelector(state => Object.values(state.category));
    const venues = useSelector(state => Object.values(state.venue));

    useEffect(() =>{
        dispatch(getVenueThunk());
        dispatch(getCategoryThunk());
        // console.log('date delta: ',new Date() - new Date(eventDate))
        // console.log('selected date: ',new Date(eventDate))

    }, [dispatch]);

    // useEffect(() =>{
    //     dispatch(getCategoryThunk());
    // }, [dispatch])

    // const [host, setHost] = useState()
    const [eventName, setEventName] = useState('')
    const [eventVenue, setEventVenue] = useState('')
    const [eventCategory, setEventCategory] = useState('')
    const [eventDescription,setEventDescription] = useState('')
    const [eventImage, setEventImage] = useState('')
    const [backendImg, setBackendImg] = useState(null)
    const [eventDate,setEventDate] = useState(new Date())
    const [eventCapacity,setEventCapacity] = useState(0)
    const [price, setPrice] = useState(0.00)
    const [validationErrors, setValidationErrors] = useState([])

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

    // console.log('Time: ', (new Date(allEvents[3].date) - new Date(allEvents[0].date))/86400000)

    let errors = [];

    const filterTime = (date) =>{
        const isPast = new Date().getTime() < date.getTime();
        return isPast;
    };

    const updateImage = (e) =>{
        // e.stopPropagation();
        setBackendImg(e.target.files[0]);
        // return
    }

    const handleSubmit= async e =>{
        e.preventDefault();
        const payload = {
            host_id: currentUser.id,
            venue_id: +eventVenue,
            category_id: +eventCategory,
            event_name: eventName,
            description: eventDescription,
            event_image: backendImg,
            date: eventDate.toLocaleString('en-US'),
            capacity: +eventCapacity,
            price_per_guest: price
        };

        if(eventName.length === 0 && eventName.length <= 50){
            errors.push('You must provide an event name');
        };

        if(eventName.length > 50){
            errors.push('Your event name must be 50 characters long or less')
        };

        if(eventImage.length === 0){
            errors.push('You must provide an image url')
        }
        // console.log('EVENT Image', eventImage);
        // if(!eventImage.includes('.jpg') || !eventImage.includes('.jpeg') || !eventImage.includes('.png')){
        //     errors.push('Your image must be in .jpg, .jpeg, or .png formats')
        // }

        if(eventDescription.length === 0){
            errors.push('You must provide a brief description')
        }else if(eventDescription.length > 500){
            errors.push('Your description should be 500 characters or less')
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

        // if(new Date(eventDate).getTime() - new Date().getTime() <= 0){
        //     errors.push('You must select a date in the future')
        // }

        setValidationErrors(errors);

        // console.log('payload being passed to add event thunk ',payload)
        // console.log('selected date ', new Date(eventDate))
            // console.log('NEW DATE: ', eventDate.toLocaleString('en-US', options))
            // console.log('NEW DATE: ', eventDate.toLocaleString('en-US', {hour12: true}))

        if(errors.length === 0){
            const newEvent = await dispatch(addEventThunk(payload))
            if(newEvent){
                    alert('New event added successfully!')
                    history.push('/')
                }
        };

    };

    return(
        <div className="create-event-page">
            <header>
                <div><NavLink to={'/'} className='home-pg-link-create-event'>Event Fright</NavLink></div>
                <span className="all-links-create-event-pg">
                    <button onClick={() => history.push(`/create-category/${currentUser.id}`)} className='create-category-btn'>Create a new category</button>
                    <button onClick={() => history.push(`/create-venue/${currentUser.id}`)} className='create-venue-btn'>Create a new venue</button>
                    <button onClick={() => history.push(`/events/${currentUser.id}`)} className='user-events-link'>See your events</button>
                </span>
            </header>
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
                        />
                        <p className="name-chars">{eventName.length <= 50 || eventName.length === 0 ? 50-eventName.length:0}/50 chars left</p>
                    </div>
                    <div className="event-img">
                        <label className="event-image-label">Event Image *</label>
                        <input
                            type="file"
                            placeholder="image formats .jpg, .jpeg, .png only"
                            // value={eventImage ? eventImage:''}
                            accept="backendImg/*"
                            onChange={e =>{
                                // console.log('changing image!!!!!!!!!!!!!!!', e.target.files[0])
                                updateImage(e)
                                // alert(URL.createObjectURL(e.target.files[0]))
                                setEventImage(URL.createObjectURL(e.target.files[0]))
                                // setEventImage(e.target.value)
                            }}

                            />

                    </div>
                    <div className="description">
                        <label className="event-description-label">Description *</label>
                        <textarea
                            className="description-input"
                            type = "text"
                            placeholder="give a brief event description, 2000 characters or less"
                            value={eventDescription ? eventDescription:''}
                            onChange={e => setEventDescription(e.target.value)}
                        />
                        <p className="description-chars">{eventDescription.length <= 500 || eventDescription.length === 0 ? 500-eventDescription.length:0}/500 chars left</p>
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
                        <label className="event-category-label">Category *</label>
                        <select onChange={e => setEventCategory(e.target.value)}>
                            <option value='' disabled selected>select a category</option>
                            {categories.map(category => <option value={category.id}>{category.type}</option>)}
                        </select>
                    </div>
                    <div className="venue">
                        <label className="event-venue-label">Venue *</label>
                        <select onChange={e => setEventVenue(e.target.value)}>
                            <option value='' disabled selected>select a venue</option>
                            {venues.map(location =>
                                <option value={location.id}>{location.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="capacity">
                        <label className="event-capacity-label">Capacity *</label>
                        <input
                            type="number"
                            value = {eventCapacity ? eventCapacity:''}
                            onChange={e => setEventCapacity(e.target.value)}
                            placeholder='required'
                            min={1}
                            max={300}
                        />
                    </div>
                    <div className="price">
                        <label className="event-price-label">Price</label>
                        <input
                            className="price-input-box"
                            type="decimal"
                            value = {price ? price:''}
                            onChange={e => setPrice(e.target.value)}
                            placeholder={price + '.00'}
                        />
                    </div>
                    <div className="date">
                        <label className="event-date-label">Date and Time *</label>
                        <DatePicker selected={eventDate} onChange={eventDate =>setEventDate(eventDate)} showTimeSelect timeFormat="h:mm aa" timeIntervals={15} dateFormat="MM/dd/yyyy" minDate={new Date()} filterTime={filterTime}/>
                    </div>
                    <div className="submit-cancel">
                        <span className="create-event-submit-btn-span">
                            <button type="submit" className="create-event-submit-btn">Submit</button>
                        </span>
                        <span className="create-event-cancel-btn-span">
                            <button onClick={() => history.push('/')} className='create-event-cancel-btn'>Cancel</button>
                        </span>
                    </div>
                </form>
                <img src={`${eventImage}`} alt='https://st.depositphotos.com/1026550/4380/i/600/depositphotos_43807431-stock-photo-halloween.jpg' onError={e => {e.currentTarget.src = 'https://st.depositphotos.com/1026550/4380/i/600/depositphotos_43807431-stock-photo-halloween.jpg'}} className="edit-image"/>
            </div>
        </div>

    )
}

export default CreateEvent;
