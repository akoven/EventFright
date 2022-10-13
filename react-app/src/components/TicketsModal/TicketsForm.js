import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addTicketsThunk } from "../../store/tickets";

const TicketsForm = () =>{

    const currentUser = useSelector(state => state.user.session)
    const allEvents = useSelector(state => Object.values(state.event))
    const allTickets = useSelector(state => Object.values(state.ticket))
    const selectedEvent = allEvents.filter(event => event.id === +eventId.id)
    const userTicketsForEvent = allEvents.filter(ticket => ticket.event_id === +eventId.id && ticket.user_id === currentUser.id)
    const eventId = useParams();
    const history = useHistory();
    const dispatch = useDispatch();


    const [purchasedTickets, setPurchasedTickets] = useState(0)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [csv, setCsv] = useState('')
    const [zipCode, setZipCode] = useState('')

    const ticketArray = allTickets.filter(ticket => ticket.event_id === +eventId.id)
    const availableTickets = userTicketsForEvent.tickets_available;

    useEffect(() => {
        console.log('all event ids: ',eventArray)
    }, [dispatch])

    const handlePurchase = async e =>{
        e.preventDefault();
        const totalTickets = 0;
        for(ticket in ticketArray){
            totalTickets += ticket.tickets_sold
        };

        const tickets_available = selectedEvent[0].capacity - totalTickets

        const payload={
            event_id: +eventId.id,
            user_id: currentUser.id,
            tickets_sold: purchasedTickets,
            tickets_available: tickets_available,
            first_name: firstName,
            last_name: lastName,
            card_number: cardNumber,
            csv: csv,
            zip_code: zipCode
        };

        const newPurchase = await dispatch(addTicketsThunk(payload))
        if(newPurchase){
            history.push('/tickets')
        }
    }

    return(
        <form onSubmit={handlePurchase}>
            <h5>Tickets available: {availableTickets}</h5>

            <label>How many tickets? : </label>
            <input
             type='number'
             value={purchasedTickets ? purchasedTickets:''}
             onChange={e => setPurchasedTickets(purchasedTickets)}
             placeholder='maximum tickets per customer is 10'
             min={1}
             max={10}
             />

             <input
             type='string'
             value={firstName ? firstName:''}
             onChange={e => setFirstName(firstName)}
             placeholder='first name'
             />

             <input
             type="string"
             value={lastName ? lastName:''}
             onChange={e => setLastName(lastName)}
             placeholder='last name'
             />

             <input
             type="string"
             value={cardNumber ? cardNumber:''}
             onChange={e => setCardNumber(cardNumber)}
             placeholder='16 digit credit card number'
             />

             <input
             type="string"
             value={csv ? csv:''}
             onChange={e => setCsv(csv)}
             placeholder='csv'
             />

             <input
             type='string'
             value={zipCode ? zipCode:''}
             onChange={e => setZipCode(zipCode)}
             placeholder='5 digit zip code only'
             />

             <span>
                <button type='submit' disabled={userTicketsForEvent === 10}>Purchase Tickets</button>
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

export default TicketsForm
