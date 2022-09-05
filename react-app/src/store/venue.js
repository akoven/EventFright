const GET_ALL_VENUES = 'venues/get_all_venues'
const ADD_VENUE = 'venues/add_venue'
const UPDATE_VENUE = 'venues/update_venue'
const DELETE_VENUE = 'venues/delete_venue'

const getAllVenues = (venue) =>{
    return{
        type: GET_ALL_VENUES,
        venue
    }
}

export const getVenueThunk = () => async dispatch =>{
    const response = await fetch('/api/venues/')

    if (response.ok){
        const venue = await response.json();
        dispatch(getAllVenues(venue));
        const allVenues = {};
        venue.venues.forEach(venue => (allVenues[venue.id ] = venue));
        return {...allVenues}
    }
}


const venueReducer = (state = {}, action) =>{
    let newState = {};
    switch(action.type){
        case GET_ALL_VENUES:
            const venues={};
            action.venue.venues.forEach(venue => venues[venue.id] = venue);
            return venues;

        default:
            return state;
    }
}
