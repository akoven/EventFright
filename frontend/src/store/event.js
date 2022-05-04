import { csrfFetch } from './csrf';

const CREATE_EVENT = 'event/createEventAction';

const createEventAction = (event) => {
    return{
        type:CREATE_EVENT,
        payload: event
    };
};

export const createEvent = (event) => async(dispatch) => {
    const {name,date,capacity} = event;
    const response = await csrfFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({
            name,
            date,
            capacity
        })
    });
    const event = await response.json();
    dispatch(createEventAction(event));
    return event;

}

    const initialState = {event: null};

    const eventReducer = (state = initialState, action) => {
        let newState;
        switch(action.type){
            case CREATE_EVENT:
                newState = Object.assign({}, state);
                newState[action.payload.id] = action.payload;
                console.log(newState);
                return newState;
            default:
                return state;
        }

    };

    export default eventReducer;
