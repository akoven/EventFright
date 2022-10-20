import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addTicketsThunk, getTicketsThunk } from "../../store/ticket";

const TicketsForm = () =>{

    const eventId = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user)
    const allEvents = useSelector(state => Object.values(state.event))
    const allTickets = useSelector(state => Object.values(state.ticket))
    const selectedEvent = allEvents.filter(event => event.id === +eventId.id)
    const userTicketsForEvent = allTickets.filter(ticket => ticket.event.id === +eventId.id && ticket.user.id === currentUser.id);
    const allTicketsForEvent = allTickets.filter(ticket => ticket.event.id === +eventId.id);


    const [purchasedTickets, setPurchasedTickets] = useState(0)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [csv, setCsv] = useState('')
    const [zipCode, setZipCode] = useState('')

    const ticketArray = allTickets.filter(ticket => ticket.event.id === +eventId.id);
    const userEventTicketArray = userTicketsForEvent.map(ticket => ticket.tickets_sold);
    const allTicketsForEventArray  = allTicketsForEvent.map(ticket => ticket.tickets_sold);
    // const userEventTicketArray = allTickets.map(ticket => ticket.tickets_sold);

    // const totalTickets = userEventTicketArray.map(ticket => initialTickets += ticket)

    let userTickets = 0;
    for(const num of userEventTicketArray){
        userTickets += num
    };

    let totalTickets = 0;
    for(const num of allTicketsForEventArray){
        totalTickets += num;
    }

    useEffect(() => {
        dispatch(getTicketsThunk());
        console.log('all tickets for user: ',allTickets)
        console.log('user tickets for event: ',userTicketsForEvent)
        console.log('purchased tickets: ',userEventTicketArray)
        // console.log('total tickets: ', initialTickets)

    }, [dispatch])

    const handlePurchase = async e =>{
        e.preventDefault();
        let totalTickets = 0;
        for(const num of allTicketsForEventArray){
            totalTickets += num;
        }

        const tickets_available = selectedEvent[0].capacity - totalTickets;

        const payload={
            event_id: +eventId.id,
            user_id: currentUser.id,
            tickets_sold: +purchasedTickets,
            tickets_available: tickets_available,
            first_name: firstName,
            last_name: lastName,
            card_number: cardNumber,
            csv: csv,
            zip_code: zipCode
        };

        console.log('payload for user ticket: ',payload)

        const newPurchase = await dispatch(addTicketsThunk(payload))
        console.log('response: ',newPurchase)
        if(newPurchase){
            alert('Purchase made!')
            history.push('/tickets')
        }
        alert('something went wrong')
    }

    return(
        <form onSubmit={handlePurchase}>
            {/* {console.log('TESTING!!!!!!!!!!!!!!!!!')} */}
            <h5>Tickets available: {selectedEvent[0].capacity - totalTickets}</h5>
            {/* <h6>{availableTickets}</h6> */}
            {}
            {<li>Tickets per customer: 10</li>}
            <div className="ticket-amount">
                <label className="tickets-label">How many tickets? : </label>
                <input
                type='number'
                value={purchasedTickets ? purchasedTickets:''}
                onChange={e => setPurchasedTickets(e.target.value)}
                min={1}
                max={10}
                />
            </div>
            <div>
                <input
                type='string'
                value={firstName ? firstName:''}
                onChange={e => setFirstName(e.target.value)}
                placeholder='first name'
                />
            </div>
            <div>
                <input
                type="string"
                value={lastName ? lastName:''}
                onChange={e => setLastName(e.target.value)}
                placeholder='last name'
                />
            </div>
            <div>
                <input
                type="string"
                value={cardNumber ? cardNumber:''}
                onChange={e => setCardNumber(e.target.value)}
                placeholder='16 digit credit card number'
                />
            </div>
            <div>
                <input
                type="string"
                value={csv ? csv:''}
                onChange={e => setCsv(e.target.value)}
                placeholder='csv'
                />
            </div>
            <div>
                <input
                type='string'
                value={zipCode ? zipCode:''}
                onChange={e => setZipCode(e.target.value)}
                placeholder='5 digit zip code only'
                />
            </div>

             <span>
                <button type='submit' disabled={userTickets == 10 || selectedEvent[0].capacity - totalTickets === 0}>Purchase Tickets</button>
             </span>
             <span>
                <button onClick={() => history.push(`/tickets`)}>Cancel</button>
             </span>
        </form>
    )
}

export default TicketsForm
// disabled={userTicketsForEvent.tickets_sold === 10}
