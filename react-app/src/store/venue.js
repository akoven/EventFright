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

const deleteVenue = (venue) =>{
    return{
        type: DELETE_VENUE,
        venue
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

export const editVenueThunk = (venue) => async dispatch =>{
    const response = await fetch(`/api/venues/${venue.id}`, {
        method: 'PUT',
        headers: {'Content-Type/':'application/json'},
        body: JSON.stringify(venue)
    });

    if (response.ok){
        const newVenue = await response.json();
        dispatch(editVenue(newVenue));
        return newVenue;
    }
    return null;
}

export const deleteVenueThunk = (venue) => async dispatch =>{
    const response = await fetch(`/api/venues/${venue.id}`, {
        method: 'DELETE'
    });
    dispatch(deleteVenue(venue));
    return response;
};

const venueReducer = (state = {}, action) =>{
    // let newState = {};
    switch(action.type){
        case GET_ALL_VENUES:
            const venues={};
            action.venue.venues.forEach(venue => venues[venue.id] = venue);
            return venues;
        case ADD_VENUE:
            let newState = {...state};
            newState[action.venue.id] = action.venue;
            return newState;
        case UPDATE_VENUE:
            newState = {...state};
            newState[action.venue.id] = action.venue;
            return newState;
        case DELETE_VENUE:
            delete newState[action.venue.id];
            return newState;
        default:
            return state;
    }
}

export default venueReducer;
