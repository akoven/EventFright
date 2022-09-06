import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVenueThunk } from "../../store/venue";
import { useHistory } from "react-router-dom";
import { addVenueThunk } from "../../store/venue";
//set error check for zip code length, state abbreviations, regex.test

const VenuePage = () =>{

    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user)
    const allVenues = useSelector(state => Object.values(state.venue))

    const regex = /^\d{5}$/;

    useEffect(() =>{
        dispatch(getVenueThunk())
        // console.log(regex.test(zipCode)) true
    },[dispatch])

    const [venueName, setVenueName] = useState('')
    const [venueAddress, setVenueAdress] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [latitude, setLatitude] = useState(0.0000)
    const [longitude, setLongitude] = useState(0.0000)

    const handleSubmit = async e =>{
        e.preventDefault();
        const payload = {
            venueName,
            venueAddress,
            state,
            zipCode,
            latitude,
            longitude
        }
        console.log('payload being passed to add venue thunk ',payload)
        const newVenue = await dispatch(addVenueThunk(payload))
        if(newVenue){
            history.push('/')
        }
    }

    return(
        <div>
            <h3>Available Venues</h3>
            {allVenues.map(venue => <div><p>{venue.name}</p></div>)}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Venue Name</label>
                    <input
                    type="string"
                    value={venueName ? venueName:''}
                    onChange={e => setVenueName(e.target.value)}
                    required/>
                </div>
                <div>
                    <label>Venue Address</label>
                    <input
                        type="string"
                        value={venueAddress ? venueAddress:''}
                        onChange={e => setVenueAdress(e.target.value)}
                        required/>
                </div>
                <div>
                    <label>State</label>
                    <input
                        type="string"
                        value={state ? state:''}
                        onChange ={e => setState(e.target.value)}
                        placeholder='state abbreviation only'
                        required/>
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
