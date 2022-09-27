import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVenueThunk } from "../../store/venue";
import { useHistory } from "react-router-dom";
import { addVenueThunk } from "../../store/venue";
import { deleteVenueThunk } from "../../store/venue";

const VenuePage = () =>{

    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user)
    const allVenues = useSelector(state => Object.values(state.venue))
    const states = ['AK','AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WV','WI','WY']

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
        console.log('payload being passed to add venue thunk ',payload)
        const newVenue = await dispatch(addVenueThunk(payload))
        if(newVenue){
            history.push('/')
        }
    }

    const handleDelete = async (venueId) =>{
        await dispatch(deleteVenueThunk(venueId))
        history.push('/')
    }

    return(
        <div>
            <h3>Available Venues</h3>
            {allVenues.map(venue => <div><span><p>{venue.name}</p></span><span><button onClick={() => history.push(`/venues/${venue.id}`)}>Edit</button></span><span><button onClick={() => handleDelete(venue.id)}>Delete</button></span></div>)}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Venue Name</label>
                    <input
                    type="string"
                    value={venueName ? venueName:''}
                    onChange={e => setVenueName(e.target.value)}
                    required
                    placeholder="required"/>
                </div>
                <div>
                    <label>Venue Address</label>
                    <input
                        type="string"
                        value={venueAddress ? venueAddress:''}
                        onChange={e => setVenueAdress(e.target.value)}
                        required
                        placeholder="required"/>
                </div>
                <div>
                    <label>City</label>
                    <input
                        type="string"
                        value={city ? city: ''}
                        onChange={e => setCity(e.target.value)}
                        required
                        />
                </div>
                <div>
                    <label>State</label>
                    <select onChange ={e => setState(e.target.value)}>
                        <option value = '' disabled selected>select a state</option>
                        {states.map(state => <option value={state}>{state}</option>)}
                    </select>
                </div>
                <div>
                    <label>Zip Code</label>
                    <input
                        type="string"
                        placeholder="5 digit zip codes only"
                        value={zipCode ? zipCode:''}
                        onChange ={e => setZipCode(e.target.value)}
                        required
                        minLength={5}
                        maxLength={5}/>
                </div>
                <div>
                    <label>Latitude</label>
                    <input
                        type="decimal"
                        value={latitude ? latitude:''}
                        onChange ={e => setLatitude(e.target.value)}
                        placeholder='optional'
                    />
                </div>
                <div>
                    <label>Longitude</label>
                    <input
                        type="decimal"
                        value={longitude ? longitude:''}
                        onChange ={e => setLongitude(e.target.value)}
                        placeholder='optional'
                    />
                </div>
                <button type="submit">Submit</button>
                <button onClick={() => history.push('/')}>Cancel</button>

            </form>
        </div>

    )
}

export default VenuePage;
