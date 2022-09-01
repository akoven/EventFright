const GET_ALL_EVENTS = 'events/get_all_events'
const ADD_EVENT = 'events/add_event'

const getAllEvents = (event) =>{
    return{
        type: GET_ALL_EVENTS,
        event
    }
}

export const getEventThunk = () => async dispatch =>{
    const response = await fetch('/api/events/')

    console.log('******************RESPONSE********************** ', response)
    if (response.ok){
        const event = await response.json();
        console.log('******************************EVENT************************',event)
        dispatch(getAllEvents(event));
        const allEvents = {};
        event.events.forEach((event) => (allEvents[event.id] = event))
        return {...allEvents}
    }

    return 'something went wrong in backend'
}


const eventReducer = (state = {}, action) =>{
    let newState = {};
    switch(action.type){
        case GET_ALL_EVENTS:
            const events = {};
            action.event.events.forEach(event => events[event.id] = event);
            return events;
        default:
            return state;
    }
}

export default eventReducer;
