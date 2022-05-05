import { csrfFetch } from './csrf';

const CREATE_EVENT = 'event/createEventAction';
const GET_EVENT = 'event/getEventAction';
const EDIT_EVENT = 'event/editEventAction';

const createEventAction = (event) => {
    return{
        type:CREATE_EVENT,
        payload: event
    };
};

const getEventAction = (events) => {
    return{
        type:GET_EVENT,
        payload: events //payload: this is what is passed from the thunk
    };
};

const editEventAction = (event) => {
    return{
        type:EDIT_EVENT,
        payload: event
    };
};

export const createEventThunk = (event) => async(dispatch) => {
    // const {name,date,capacity} = event;
    const response = await csrfFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(event)
    });
    if(response.ok){
        const event = await response.json();
        dispatch(createEventAction(event));
        return event;
    }

    return null;

}

export const getEventThunk = () => async(dispatch) => {
    // const {name,date,capacity} = event;
    const response = await csrfFetch('/api/events');
    if(response.ok){
        const events = await response.json();
        // console.log('these are the events from the thunk, ',events);
        dispatch(getEventAction(events));
    }
}

export const editEventThunk = (event) => async(dispatch) => {

    const response = await csrfFetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    });
    if(response.ok){
        const event = await response.json();
        dispatch(editEventAction(event));
        return event;
    }
}

    const initialState = {};

    const eventReducer = (state = initialState, action) => {
        let newState;
        switch(action.type){
            case CREATE_EVENT:
                newState = Object.assign({}, state);
                newState[action.payload.id] = action.payload;
                console.log(newState);
                return newState;
            case GET_EVENT:
                newState = Object.assign({},state);//2nd arg is what you want copied into the first arg
                // newState[action.payload.id] = action.payload;
                console.log('this is the action ', action);
                action.payload.forEach(event => {
                    newState[event.id] = event
                })
                return newState;
            case EDIT_EVENT:
                newState = Object.assign({},state); //Object.assign() is turning newState into an array
                newState[action.payload.id] = action.payload;
                action.payload.forEach(event => {
                    newState[event.id] = event
                })
                return newState;
            default:
                return state;
        }

    };

    export default eventReducer;
