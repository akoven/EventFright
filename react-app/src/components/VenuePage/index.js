import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVenueThunk } from "../../store/venue";


const VenuePage = () =>{

    const dispatch = useDispatch();
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
    const [zipCode, setZipCode] = useState('00000')

    return(
        <div>
            <h3>Available Venues</h3>
            {allVenues.map(venue => <div><p>{venue.name}</p></div>)}
            <form>
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
                    <input
                        type="string"
                        value={state ? state:''}
                        onChange ={e => setState(e.target.value)}
                        required/>
                </div>
                <div>
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
                    <input
                        type="decimal"
                        value={zipCode ? zipCode:''}
                        onChange ={e => setZipCode(e.target.value)}
                        required/>
                </div>
                <div>
                    <input
                        type="decimal"
                        value={zipCode ? zipCode:''}
                        onChange ={e => setZipCode(e.target.value)}
                        required/>
                </div>
            </form>
        </div>

    )
}

export default VenuePage;
