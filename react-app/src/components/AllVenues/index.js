import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVenueThunk } from "../../store/venue";
import { useHistory, NavLink } from "react-router-dom";
import { deleteVenueThunk } from "../../store/venue";
import './index.css';

const AllVenues = () =>{

    const allVenues = useSelector(state => Object.values(state.venue));
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() =>{
        dispatch(getVenueThunk())
        // console.log('ALL VENUES: ',allVenues)
    },[dispatch])

    const handleDelete = async (venueId) =>{
        await dispatch(deleteVenueThunk(venueId))
    }

    return(
        <>
            <header>
                <NavLink to='/create-venue' className={'nav-link-venue'}>{'<< Back to create venues page'}</NavLink>
            </header>
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
        </>
    )
}

export default AllVenues;
