import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVenueThunk } from "../../store/venue";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { addVenueThunk } from "../../store/venue";
import { deleteVenueThunk } from "../../store/venue";
import './index.css';

const CreateVenue = () =>{

    const dispatch = useDispatch();
    const history = useHistory();
    const allVenues = useSelector(state => Object.values(state.venue));
    const states = ['AK','AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WV','WI','WY'];

    const userId = useParams();
    const currentUser = useSelector(state => state.session.user);
    const customVenues = allVenues.filter(venue => venue.user_id === +userId.id)
    //set error check for zip code length, state abbreviations, regex.test
    const regex = /^\d{5}$/;

    useEffect(() =>{
        dispatch(getVenueThunk())
        // console.log(regex.test(zipCode)) true
        console.log('custom venues ', customVenues)
        // console.log('user id ',userId.id)
    },[dispatch])

    const [venueName, setVenueName] = useState('')
    const [venueAddress, setVenueAdress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [validationErrors, setValidationErrors] = useState([])

    const errors = [];

    const handleSubmit = async e =>{

        e.preventDefault();

        const payload = {
            user_id: currentUser.id,
            name: venueName,
            address: venueAddress,
            city: city,
            state: state,
            zip_code: zipCode,
            latitude: latitude,
            longitude: longitude
        }
        // console.log('payload being passed to add venue thunk ',payload)
        // setVenueName('')
        // setVenueAdress('')
        // setCity('')
        // setState('')
        // setZipCode('')
        // setLatitude(0)
        // setLongitude(0)

        if(venueName.length === 0){
            errors.push('You must provide a name for your venue')
        }else if(venueName.length > 50){
            errors.push('Your venues name needs to be 50 characters or less')
        };

        if(venueAddress.length === 0){
            errors.push('You must provide an address for your venue')
        }

        if(city.length === 0){
            errors.push('You must provide a city')
        };

        if(state.length === 0){
            errors.push('You must select a state')
        };

        if(!regex.test(zipCode)){
            errors.push('The zip code must be a 5 digit number')
        };

        setValidationErrors(errors);

        if(errors.length === 0){
            const newVenue = await dispatch(addVenueThunk(payload));
            if(newVenue){
                alert('successfully created a new venue')
                history.push(`/create-venue/${currentUser.id}`)
            };
        }

        setVenueName('')
        setVenueAdress('')
        setCity('')
        setState(state[0])
        setZipCode('')
        setLatitude(0)
        setLongitude(0)
    }

    const handleDelete = async (venueId) =>{
       const response = await dispatch(deleteVenueThunk(venueId))
       alert(response)
    }

    return(
        <div className="create-venue-pg">
            <header>
                <span className="create-venue-home-pg-div"><NavLink to={'/'} className='create-venue-home-pg-link'>Event Fright</NavLink></span>
                <span className="new-event-span"><NavLink className='new-event-nav-link' to={'/create-event'}>{'<< Back to create new event page'}</NavLink></span>
            </header>
            <h3 className="available-venue-label">Your Custom Venues</h3>
            {customVenues.map(venue =>
                <span className="available-venues">
                    <p className="single-venue">{venue.name}</p>
                    <span className="create-venue-edit-btn-span">
                        <button className='create-venue-edit-btn' onClick={() => history.push(`/edit-venue/${venue.id}`)}>Edit</button>
                    </span>
                    <span className="create-venue-delete-btn-span">
                        <button className="create-venue-delete-btn" onClick={() => handleDelete(venue.id)}>Delete</button>
                    </span>
                </span>

            )}
            <h3 className="create-venue-label">Create a venue</h3>
            <div className='venue-form-field'>
                <form onSubmit={handleSubmit} className='form-body'>
                    <ul>
                        {validationErrors.map(error => <li className="venue-err-msgs">{error}</li>)}
                    </ul>
                    <h4 className="required-venue-fields">Required fields are red and marked with an *</h4>
                    <div className="name-div">
                        <label className="name-label">Venue Name *</label>
                        <input
                        type="string"
                        value={venueName ? venueName:''}
                        onChange={e => setVenueName(e.target.value)}
                        placeholder="required"/>
                        <p className="venue-name-chars">{venueName.length <= 50 || venueName.length === 0  ? 50-venueName.length:0}/50 chars left</p>
                    </div>
                    <div className="address-div">
                        <label className="address-label">Venue Address *</label>
                        <input
                            type="string"
                            value={venueAddress ? venueAddress:''}
                            onChange={e => setVenueAdress(e.target.value)}
                            placeholder="required"/>
                    </div>
                    <div className="city-div">
                        <label className="city-label">City *</label>
                        <input
                            placeholder="required"
                            type="string"
                            value={city ? city: ''}
                            onChange={e => setCity(e.target.value)}
                            />
                    </div>
                    <div className="state-div">
                        <label className="state-label">State *</label>
                        <select onChange ={e => setState(e.target.value)}>
                            <option value = '' disabled selected>select a state</option>
                            {states.map(state => <option value={state}>{state}</option>)}
                        </select>
                    </div>
                    <div className="zip-div">
                        <label className="zip-label">Zip Code *</label>
                        <input
                            type="string"
                            placeholder="5 digit zip codes only"
                            value={zipCode ? zipCode:''}
                            onChange ={e => setZipCode(e.target.value)}
                        />
                    </div>
                    <div className="lat-div">
                        <label className="lat-label">Latitude</label>
                        <input
                            type="decimal"
                            value={latitude ? latitude:''}
                            onChange ={e => setLatitude(e.target.value)}
                            placeholder='optional'
                        />
                    </div>
                    <div className="long-div">
                        <label className="long-label">Longitude</label>
                        <input
                            type="decimal"
                            value={longitude ? longitude:''}
                            onChange ={e => setLongitude(e.target.value)}
                            placeholder='optional'
                        />
                    </div>
                    <div className="submit-cancel-venue-div">
                        <span className="submit-span">
                            <button type="submit" className="submit-venue-btn">Submit</button>
                        </span>
                        <span className="cancel-span">
                            <button className="cancel-venue-btn" onClick={() => history.push('/')}>Cancel</button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateVenue;
