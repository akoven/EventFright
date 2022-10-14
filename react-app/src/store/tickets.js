const GET_TICKETS = 'tickets/get_tickets'
const ADD_TICKETS = 'tickets/add_tickets'
const DELETE_TICKETS = 'tickets/delete_tickets'

const getTicketsAction = (tickets) =>{
    return{
        type: GET_TICKETS,
        tickets
    }
};

const addTicketsAction = (ticket) =>{
    return{
        type: ADD_TICKETS,
        ticket
    }
};

export const getTicketsThunk = () => async dispatch =>{
    const response = await fetch('/api/tickets/') //finish building tickets route next

    if(response.ok){
        const ticket = await response.json();
        dispatch(getTicketsAction(ticket));
        const allTickets={};
        ticket.tickets.forEach(ticket => (allTickets[ticket.id] = ticket));
        return {...allTickets};
    };
};

export const addTicketsThunk = (tickets) => async dispatch =>{
    const response = await('/api/tickets/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(tickets)
    });

    if(response.ok){
        const purchasedTicket = await response.json();
        dispatch(addTicketsAction(purchasedTicket));
        return purchasedTicket;
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
        default:
            return state;
    }
}

export default ticketsReducer;
