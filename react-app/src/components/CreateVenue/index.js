import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVenueThunk } from "../../store/venue";
import { useHistory } from "react-router-dom";
import { addVenueThunk } from "../../store/venue";
import { deleteVenueThunk } from "../../store/venue";
import './index.css';

const CreateVenue = () =>{

    const dispatch = useDispatch();
    const history = useHistory();
    const allVenues = useSelector(state => Object.values(state.venue));
    const states = ['AK','AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WV','WI','WY'];

    //set error check for zip code length, state abbreviations, regex.test
    const regex = /^\d{5}$/;

    useEffect(() =>{
        dispatch(getVenueThunk())
        // console.log(regex.test(zipCode)) true
    },[dispatch])

    const [venueName, setVenueName] = useState('')
    const [venueAddress, setVenueAdress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState(states[0])
    const [zipCode, setZipCode] = useState('')
    const [latitude, setLatitude] = useState(0.0000)
    const [longitude, setLongitude] = useState(0.0000)

    const handleSubmit = async e =>{
        e.preventDefault();
        const payload = {
            name: venueName,
            address: venueAddress,
            city: city,
            state: state,
            zip_code: zipCode,
            latitude: latitude,
            longitude: longitude
        }
        // console.log('payload being passed to add venue thunk ',payload)
        const newVenue = await dispatch(addVenueThunk(payload))
        if(newVenue){
            history.push('/create-venue')
        }
    }

    const handleDelete = async (venueId) =>{
        await dispatch(deleteVenueThunk(venueId))
        history.push('/')
    }

    return(
        <div className="create-venue-pg">
            <h3>Available Venues</h3>
            {allVenues.map(venue =>
            <span className="available-venues">
                <div>
                    <p>{venue.name}</p>
                </div>
                <span className="edit-btn">
                    <button onClick={() => history.push(`/venues/${venue.id}`)}>Edit</button>
                </span>
                <span className="delete-btn">
                    <button onClick={() => handleDelete(venue.id)}>Delete</button>
                </span>
            </span>
            )}

            <div className='form-field'>
                <form onSubmit={handleSubmit} className='form-body'>
                    <div className="name-div">
                        <label className="name-label">Venue Name*</label>
                        <input
                        type="string"
                        value={venueName ? venueName:''}
                        onChange={e => setVenueName(e.target.value)}
                        required
                        placeholder="required"/>
                    </div>
                    <div className="address-div">
                        <label className="address-label">Venue Address*</label>
                        <input
                            type="string"
                            value={venueAddress ? venueAddress:''}
                            onChange={e => setVenueAdress(e.target.value)}
                            required
                            placeholder="required"/>
                    </div>
                    <div className="city-div">
                        <label className="city-label">City*</label>
                        <input
                            placeholder="required"
                            type="string"
                            value={city ? city: ''}
                            onChange={e => setCity(e.target.value)}
                            required
                            />
                    </div>
                    <div className="state-div">
                        <label className="state-label">State*</label>
                        <select onChange ={e => setState(e.target.value)}>
                            <option value = '' disabled selected>select a state</option>
                            {states.map(state => <option value={state}>{state}</option>)}
                        </select>
                    </div>
                    <div className="zip-div">
                        <label className="zip-label">Zip Code*</label>
                        <input
                            type="string"
                            placeholder="5 digit zip codes only"
                            value={zipCode ? zipCode:''}
                            onChange ={e => setZipCode(e.target.value)}
                            required
                            minLength={5}
                            maxLength={5}/>
                    </div>
                    <div className="lat-div">
                        <label className="lat-label">Latitude*</label>
                        <input
                            type="decimal"
                            value={latitude ? latitude:''}
                            onChange ={e => setLatitude(e.target.value)}
                            placeholder='optional'
                        />
                    </div>
                    <div className="long-div">
                        <label className="long-label">Longitude*</label>
                        <input
                            type="decimal"
                            value={longitude ? longitude:''}
                            onChange ={e => setLongitude(e.target.value)}
                            placeholder='optional'
                        />
                    </div>
                    <div className="submit-cancel-venue-div">
                        <span>
                            <button type="submit" className="submit-venue-btn">Submit</button>
                        </span>
                        <span className="cancel-venue-btn">
                            <button onClick={() => history.push('/')}>Cancel</button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateVenue;
