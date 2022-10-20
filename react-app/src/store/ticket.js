const GET_TICKETS = 'tickets/get_tickets'
const ADD_TICKETS = 'tickets/add_tickets'
const DELETE_TICKETS = 'tickets/delete_tickets'

const getTicketsAction = (ticket) =>{
    return{
        type: GET_TICKETS,
        ticket
    }
};

const addTicketsAction = (ticket) =>{
    return{
        type: ADD_TICKETS,
        ticket
    }
};

const deleteTicketsAction = (ticketId) =>{
    return{
        type: DELETE_TICKETS,
        ticketId
    }
}

export const getTicketsThunk = () => async dispatch =>{
    const response = await fetch('/api/tickets/')

    if(response.ok){
        const ticket = await response.json();
        dispatch(getTicketsAction(ticket));

    };
    return null;
};

export const addTicketsThunk = (ticket) => async dispatch =>{
    console.log('MADE IT TO THUNK!!!!!!!!!!')
    const response = await fetch('/api/tickets/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(ticket)
    });
    console.log('response from thunk: ', response)
    if(response.ok){
        const purchasedTicket = await response.json();
        dispatch(addTicketsAction(purchasedTicket));
        return purchasedTicket;
    }
    return null;
}

export const removeRegistrationThunk = (ticketId) => async dispatch =>{
    const response = await fetch(`/api/tickets/${ticketId}`, {method:'DELETE'});

    if(response.ok){
        dispatch(deleteTicketsAction(ticketId));
    }
    return null;
}


const ticketsReducer = (state = {}, action) =>{
    let newState = {};
    switch(action.type){
        case GET_TICKETS:
            const tickets={};
            action.ticket.tickets.forEach(ticket => tickets[ticket.id] = ticket);
            return tickets;
        case ADD_TICKETS:
            newState = {...state};
            newState[action.ticket.id] = action.ticket;
            return newState;
        case DELETE_TICKETS:
            newState = {...state};
            delete newState[action.ticketId];
            return newState;
        default:
            return state;
    }
}

export default ticketsReducer;
