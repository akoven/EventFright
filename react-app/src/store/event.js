const GET_ALL_EVENTS = 'events/get_all_events'
const ADD_EVENT = 'events/add_event'

const getAllEvents = (event) =>{
    return{
        type: GET_ALL_EVENTS,
        event
    }
}

const addNewEvent = (event) =>{
    return{
        type: ADD_EVENT,
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

export const addEventThunk = (event, userId) => async dispatch =>{
    const response = await fetch (`/api/events/${userId}`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(event)
    });

    if (response.ok){
        const newEvent = await response.json();
        dispatch(addNewEvent(newEvent));
        return newEvent;
    }
    return null;
}

const eventReducer = (state = {}, action) =>{
    let newState = {};
    switch(action.type){
        case GET_ALL_EVENTS:
            const events = {};
            action.event.events.forEach(event => events[event.id] = event);
            return events;
        case ADD_EVENT:
            let newState={...state};
            newState[action.event.id] = action.event;
            return newState;
        default:
            return state;
    }
}

export default eventReducer;
