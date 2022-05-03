import { csrfFetch } from './csrf';

const CHECK_USER = 'event/checkUserLogIn';

const checkUserLogIn = (user) => {
    return{
        type:CHECK_USER,
        payload: user
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
    const data = await response.json();
    dispatch(checkUserLogIn(data.user));
    return response;

}

    const initialState = {event: null};

    const eventReducer = (state = initialState, action) => {
        let newState;
        switch(action.type){
            case CHECK_USER:
                newState = Object.assign({}, state);
                newState.event = action.payload;
                return newState;
            default:
                return state;
        }
    };

    export default eventReducer;
