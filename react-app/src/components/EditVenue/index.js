import {useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVenueThunk } from "../../store/venue";
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { editVenueThunk } from '../../store/venue';
import './index.css'

const EditVenue = () =>{

    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const currentUser = useSelector(state => state.session.user);
    const selectedVenue = useSelector(state => state.venue);
    const states = ['AK','AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WV','WI','WY']
    const regex = /^\d{5}$/;


    useEffect(() =>{
        dispatch(getVenueThunk())
        // console.log(selectedVenue[id].name)
    }, [dispatch])

    const [name, setName] = useState(selectedVenue[id].name)
    const [address, setAdress] = useState(selectedVenue[id].address)
    const [city, setCity] = useState(selectedVenue[id].city)
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState(selectedVenue[id].zip_code)
    const [latitude, setLatitude] = useState(selectedVenue[id].latitude)
    const [longitude, setLongitude] = useState(selectedVenue[id].longitude)
    const [validationErrors, setValidationErrors] = useState([])

    const errors = [];


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

        if(name.length === 0){
            errors.push('You must provide a name for your venue')
        };

        if(address.length === 0){
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
        }

        setValidationErrors(errors);

        if(errors.length === 0){
            const editedVenue = await dispatch(editVenueThunk(payload, id));
            if(editedVenue){
                alert('successfully created edited venue')
                history.push(`/create-venue/${currentUser.id}`)
                // console.log('validation error length: ', errors)
            };
        }
    };


    return(
        <div className='edit-venue-div'>
            <header className='edit-venue-header'>
                <span className="create-venue-home-pg-div"><NavLink to={'/'} className='create-venue-home-pg-link'>Event Fright</NavLink></span>
                <span><NavLink to={`/create-venue/${currentUser.id}`} className='edit-venue-nav-link'>{'<< Back to venues'}</NavLink></span>
            </header>
            <h3 className='edit-venue-label'>Edit Venue</h3>
            <div className='edit-venue-form-div'>
                <form className='edit-venue-form-field' onSubmit={handleEdit}>
                    <ul>
                        {validationErrors.map(error => <li className="venue-err-msgs">{error}</li>)}
                    </ul>
                    <h4 className='edit-venue-required-field'>Required fields are red and marked with an *</h4>
                    <div className='edit-venue-name-div'>
                        <label className='edit-venue-name-label'>Venue Name *</label>
                        <input
                        type="string"
                        value={name ? name:''}
                        onChange={e => setName(e.target.value)}
                        placeholder="required"/>
                    </div>
                    <div className='edit-venue-address-div'>
                        <label className='edit-venue-address-label'>Venue Address *</label>
                        <input
                            type="string"
                            value={address ? address:''}
                            onChange={e => setAdress(e.target.value)}
                            placeholder="required"/>
                    </div>
                    <div className='edit-venue-city-div'>
                        <label className='edit-venue-city-label'>City *</label>
                        <input
                            type="string"
                            value={city ? city: ''}
                            onChange={e => setCity(e.target.value)}
                            placeholder='required'
                            />
                    </div>
                    <div className='edit-venue-state-div'>
                        <label className='edit-venue-state-label'>State *</label>
                        <select onChange ={e => setState(e.target.value)}>
                            <option value='' disabled selected>select a state</option>
                            {states.map(state => <option value={state}>{state}</option>)}
                        </select>
                    </div>
                    <div className='edit-venue-zip-div'>
                        <label className='edit-venue-zip-label'>Zip Code *</label>
                        <input
                            type="string"
                            placeholder="5 digit zip codes only"
                            value={zipCode ? zipCode:''}
                            onChange ={e => setZipCode(e.target.value)}
                        />
                    </div>
                    <div className='edit-venue-lat-div'>
                        <label className='edit-venue-lat-label'>Latitude</label>
                        <input
                            type="decimal"
                            value={latitude ? latitude:''}
                            onChange ={e => setLatitude(e.target.value)}
                            placeholder='optional'
                        />
                    </div>
                    <div className='edit-venue-lon-div'>
                        <label className='edit-venue-lon-label'>Longitude</label>
                        <input
                            type="decimal"
                            value={longitude ? longitude:''}
                            onChange ={e => setLongitude(e.target.value)}
                            placeholder='optional'
                        />
                    </div>
                    <span className='submit-cancel-span'>
                        <button type="submit" className='edit-venue-submit'>Submit</button>
                        <button className='edit-venue-cancel' onClick={() => history.push(`/create-venue/${currentUser.id}`)}>Cancel</button>
                    </span>

                </form>
            </div>
        </div>
    )
}

export default EditVenue;
