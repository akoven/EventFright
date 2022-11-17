const GET_ALL_EVENTS = 'events/get_all_events'
const ADD_EVENT = 'events/add_event'
const UPDATE_EVENT = 'events/update_event'
const DELETE_EVENT = 'events/delete_event'

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

const updateEvent = (event) =>{
    return{
        type: UPDATE_EVENT,
        event
    }
}


const deleteEvent = (eventId) =>{
    return{
        type: DELETE_EVENT,
        eventId
    }
}

export const getEventThunk = () => async dispatch =>{
    const response = await fetch('/api/events/')

    // console.log('******************RESPONSE********************** ', response)
    if (response.ok){
        const event = await response.json();
        // console.log('******************************EVENT************************',event)
        dispatch(getAllEvents(event));
        // const allEvents = {};
        // event.events.forEach((event) => (allEvents[event.id] = event))
        // return {...allEvents}
    }


    return 'something went wrong in backend'
}

export const addEventThunk = (event) => async dispatch =>{
    // console.log('EVENT FROM ADD EVENT THUNK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',event)
    const response = await fetch (`/api/events/`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(event)
    });
    // console.log('RESPONSE FROM ADD EVENT THUNK!!!!!!!!!!!!!!!!!!!!!!!!! ', response)

    if (response.ok){
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!JSON event !!!!!!!!!!!!!!!!!!!!!!!!',JSON.stringify(event))
        const newEvent = await response.json();
        // console.log('NEW EVENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',newEvent)
        dispatch(addNewEvent(newEvent));
        return newEvent;
    }
    return null;
}

export const editEventThunk = (payload, eventId) => async dispatch =>{
    const response = await fetch (`/api/events/${eventId}`, {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(payload)
    });
    // console.log('event id ',eventId)
    // console.log(typeof(eventId)); number type
    // console.log('PAYLOAD FROM EDIT EVENT THUNK: ', payload)
    // console.log('EVENT ID: ',eventId)
    // console.log('event id datatype: ',typeof(eventId))
    // console.log('RESPONSE FROM EDIT EVENT THUNK!!!!!!!!!!!!!!!!!!!!!!!!! ', response)
    if (response.ok){
        const event = await response.json();
        dispatch(updateEvent(event));
        return event;
    }
    return null;
}

export const removeEventThunk = (eventId) => async dispatch =>{
    const response = await fetch (`/api/events/${eventId}`, {
        method:'DELETE'});

        if (response.ok){
            dispatch(deleteEvent(eventId));
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
            newState={...state};
            newState[action.event.id] = action.event;
            return newState;
        case UPDATE_EVENT:
            newState = {...state};
            newState[action.event.id] = action.event;
            return newState;
        case DELETE_EVENT:
            newState = {...state}
            delete newState[action.eventId]
            return newState
        default:
            return state;
    }
}

export default eventReducer;
