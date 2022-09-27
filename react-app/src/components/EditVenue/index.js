import {useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVenueThunk } from "../../store/venue";
import { useHistory, useParams } from 'react-router-dom';
import { editVenueThunk } from '../../store/venue';

const EditVenue = () =>{

    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const allVenues = useSelector(state => Object.values(state.venue))
    const selectedVenue = useSelector(state => state.venue)
    const states = ['AK','AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WV','WI','WY']


    useEffect(() =>{
        dispatch(getVenueThunk())
        // console.log(+id.id-1)
        // console.log(selectedVenue[id].name)
    }, [dispatch])

    const [name, setName] = useState(selectedVenue[id].name)
    const [address, setAdress] = useState(selectedVenue[id].address)
    const [city, setCity] = useState(selectedVenue[id].city)
    const [state, setState] = useState(states[0])
    const [zipCode, setZipCode] = useState(selectedVenue[id].zip_code)
    const [latitude, setLatitude] = useState(selectedVenue[id].latitude)
    const [longitude, setLongitude] = useState(selectedVenue[id].longitude)

    const handleEdit = async e =>{
        e.preventDefault();
        const payload = {
            name,
            address,
            city,
            state,
            zip_code: zipCode,
            latitude,
            longitude
        }

        const editedVenue = await dispatch(editVenueThunk(payload, id));
        if(editedVenue){
            history.push('/create-event')
        }
    };


    return(
        <div>
            <form className='edit-venue-form-field' onSubmit={handleEdit}>
            <div>
                    <label>Venue Name</label>
                    <input
                    type="string"
                    value={name ? name:''}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="required"/>
                </div>
                <div>
                    <label>Venue Address</label>
                    <input
                        type="string"
                        value={address ? address:''}
                        onChange={e => setAdress(e.target.value)}
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
                        <option value='' disabled selected>select a state</option>
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

export default EditVenue;
