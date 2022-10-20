import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addTicketsThunk, getTicketsThunk } from "../../store/ticket";
import './TicketsForm.css'

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
    const [errorValidation, setErrorValidation] = useState([])

    const ticketArray = allTickets.filter(ticket => ticket.event.id === +eventId.id);
    const userEventTicketArray = userTicketsForEvent.map(ticket => ticket.tickets_sold);
    const allTicketsForEventArray  = allTicketsForEvent.map(ticket => ticket.tickets_sold);
    // const userEventTicketArray = allTickets.map(ticket => ticket.tickets_sold);
    // const totalTickets = userEventTicketArray.map(ticket => initialTickets += ticket)
    const zipCodeValidator = /^\d{5}$/;
    const creditCardValidator = /^\d{16}$/;
    const csvValidator = /^\d{3}$/;

    let errors = [];

    let userTickets = 0;
    for(const num of userEventTicketArray){
        userTickets += num
    };

    let totalTickets = 0;
    for(const num of allTicketsForEventArray){
        totalTickets += num;
    };

    useEffect(() => {
        dispatch(getTicketsThunk());
        console.log('all tickets for user: ',allTickets)
        console.log('user tickets for event: ',userTicketsForEvent)
        console.log('purchased tickets: ',userEventTicketArray)
        // console.log('total tickets: ', initialTickets)

    }, [dispatch]);

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

        const cardNumberArr = allTicketsForEvent.map(ticket => ticket.card_number)

        // if(firstName.length === 0){
        //     errors.push('First name is mandatory')
        // };

        // if(lastName.length === 0){
        //     errors.push('Last name is mandatory')
        // };

        if(!creditCardValidator.test(cardNumber) || cardNumber.length === 0){
            errors.push('Please provide a valid credit card number without dashes')
        };

        if(!zipCodeValidator.test(zipCode)){
            errors.push('The zip code must be a 5 digit number')
        };

        if(cardNumberArr.includes(cardNumber)){
            errors.push('User already made a purchase for this event')
        };

        if(!csvValidator.test(csv) || csvValidator.length === 0){
            errors.push('Please provide a valid csv number')
        };

        setErrorValidation(errors)
        // console.log('payload for user ticket: ',payload)

        if(errors.length === 0){
            const newPurchase = await dispatch(addTicketsThunk(payload));
            // console.log('response: ',newPurchase)
            if(newPurchase){
                alert('Purchase made!');
                history.push('/tickets');
            }
        }
    }

    return(
        <form onSubmit={handlePurchase}>
            {/* {console.log('TESTING!!!!!!!!!!!!!!!!!')} */}
            <h5>Tickets available: {selectedEvent[0].capacity - totalTickets}</h5>
                <ul>
                    {errorValidation.map(error => <li className="tickets-error-msgs">{error}</li>)}
                </ul>

            {<li className="tickets-per-customer">Tickets per customer: 10</li>}
            <div className="ticket-amount">
                <label className="tickets-label">How many tickets? : </label>
                <input
                className="num-of-tickets-input"
                type='number'
                value={purchasedTickets ? purchasedTickets:''}
                onChange={e => setPurchasedTickets(e.target.value)}
                required
                min={1}
                max={10}
                />
            </div>
            <div className="first-name-div">
                <input
                type='string'
                value={firstName ? firstName:''}
                onChange={e => setFirstName(e.target.value)}
                placeholder='first name'
                required
                />
            </div>
            <div className="last-name-div">
                <input
                type="string"
                value={lastName ? lastName:''}
                onChange={e => setLastName(e.target.value)}
                placeholder='last name'
                required
                />
            </div>
            <div className="card-number-div">
                <input
                type="string"
                value={cardNumber ? cardNumber:''}
                onChange={e => setCardNumber(e.target.value)}
                placeholder='16 digit credit card number'
                />
            </div>
            <div className="csv-div">
                <input
                type="string"
                value={csv ? csv:''}
                onChange={e => setCsv(e.target.value)}
                placeholder='csv'
                />
            </div>
            <div className="zip-code-div">
                <input
                type='string'
                value={zipCode ? zipCode:''}
                onChange={e => setZipCode(e.target.value)}
                placeholder='5 digit zip code only'
                />
            </div>
            <div className="buttons-div">
                <span className="purchase-tickets-btn-span">
                    <button className='purchase-tickets-btn' type='submit' disabled={userTickets == 10 || selectedEvent[0].capacity - totalTickets === 0}>Purchase Tickets</button>
                </span>
                <span className="cancel-ticket-purchase-span">
                    <button className='cancel-tickets-btn' onClick={() => history.push(`/tickets`)}>Cancel</button>
                </span>
            </div>
        </form>
    )
}

export default TicketsForm
// disabled={userTicketsForEvent.tickets_sold === 10}
