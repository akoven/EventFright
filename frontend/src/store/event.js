import { csrfFetch } from './csrf';

const checkUserLogIn = (user) => {
    return{
        type:CHECK_USER,
        payload: user
    };
};

export const createEvent = (event) => async(dispatch) => {
    const {name,date,capacity} = event;
    const response = await csrfFetch('/api/event', {
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

    const initialState = {user: null};

    const eventReducer = (state = initialState, action) => {
        let newState;
        switch(action.type){
            case CHECK_USER:
                newState = Object.assign({}, state);
                newState.user = action.payload;
                return newState;
            default:
                return state;
        }
    }

    export default eventReducer;
