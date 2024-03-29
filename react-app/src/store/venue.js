const GET_ALL_VENUES = 'venues/get_all_venues'
const ADD_VENUE = 'venues/add_venue'
const UPDATE_VENUE = 'venues/update_venue'
const DELETE_VENUE = 'venues/delete_venue'

const getAllVenues = (venue) =>{
    return{
        type: GET_ALL_VENUES,
        venue
    }
};

const addVenue = (venue) =>{
    return{
        type: ADD_VENUE,
        venue
    }
};

const editVenue = (venue) =>{
    return{
        type: UPDATE_VENUE,
        venue
    }
};

const deleteVenue = (venueId) =>{
    return{
        type: DELETE_VENUE,
        venueId
    }
};

export const getVenueThunk = () => async dispatch =>{
    const response = await fetch('/api/venues/')

    if (response.ok){
        const venue = await response.json();
        dispatch(getAllVenues(venue));
        const allVenues = {};
        venue.venues.forEach(venue => (allVenues[venue.id ] = venue));
        return {...allVenues}
    }
};

export const addVenueThunk = (venue) => async dispatch =>{
    const response = await fetch('/api/venues/', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(venue)
    });

    if (response.ok){
        const newVenue = await response.json();
        dispatch(addVenue(newVenue));
        return newVenue;
    }
    return null;
};

export const editVenueThunk = (payload, venueId) => async dispatch =>{
    const response = await fetch(`/api/venues/${venueId}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    });

    // console.log('PAYLOAD FROM EDIT VENUE THUNK: ', payload)
    // console.log('CURRENT VENUE ID: ', venueId)

    if (response.ok){
        const venue = await response.json();
        dispatch(editVenue(venue));
        return venue;
    }
    return null;
}

export const deleteVenueThunk = (venueId) => async dispatch =>{
    const response = await fetch(`/api/venues/${venueId}`, {
        method: 'DELETE'
    });
    if (response.ok){
        dispatch(deleteVenue(venueId));
        return 'successfully deleted venue'
    }
    return 'cannot delete this venue at this time';

};

const venueReducer = (state = {}, action) =>{
    let newState = {};
    switch(action.type){
        case GET_ALL_VENUES:
            const venues={};
            action.venue.venues.forEach(venue => venues[venue.id] = venue);
            return venues;
        case ADD_VENUE:
            newState = {...state};
            newState[action.venue.id] = action.venue;
            return newState;
        case UPDATE_VENUE:
            newState = {...state};
            newState[action.venue.id] = action.venue;
            return newState;
        case DELETE_VENUE:
            newState = {...state};
            delete newState[action.venueId];
            return newState;
        default:
            return state;
    }
}

export default venueReducer;
