import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const TicketsModal = () =>{

    const currentUser = useSelector(state => state.user.session)
    const allEvents = useSelector(state => Object.values(state.event))
    const allTickets = useSelector(state => Object.values(state.ticket))
    const selectedEvent = allEvents.filter(event => event.id === +eventId.id)
    const eventId = useParams();
    const history = useHistory();
    const dispatch = useDispatch();


    const [purchasedTickets, setPurchasedTickets] = useState(0)
    const ticketArray = allTickets.filter(ticket => ticket.event_id === +eventId.id)
    const availableTickets = selectedEvent[0].capacity - purchasedTickets;

    useEffect(() => {
        console.log('all event ids: ',eventArray)
    }, [dispatch])

    const handlePurchase = async e =>{
        e.preventDefault();
        const totalTickets = 0;
        for(ticket in ticketArray){
            totalTickets += ticket.tickets_sold
        }

        const tickets_available = selectedEvent[0].capacity - totalTickets

        const payload={
            event_id: +eventId.id,
            user_id: currentUser.id,
            tickets_sold: purchasedTickets,
            tickets_available: tickets_available
        }
    }

    return(
        <form onSubmit={handlePurchase}>
            <h5>Tickets available: {availableTickets}</h5>
            <input
             type='number'
             value={purchasedTickets ? purchasedTickets:''}
             onChange={e => setPurchasedTickets(purchasedTickets)}
             placeholder='maximum tickets per customer is 10'
             min={1}
             max={10}
             />
             <span>
                <button type='submit'>Purchase Tickets</button>
             </span>
             <span>
                <button onClick={() => history.push(`/tickets`)}>Cancel</button>
             </span>
             <span>
                <button disabled>Return Tickets</button> {/*this will call the delete tickets thunk*/}
             </span>
        </form>
    )
}

export default TicketsModal
