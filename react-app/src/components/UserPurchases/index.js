import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getTicketsThunk } from '../../store/ticket';
import { removeRegistrationThunk } from '../../store/ticket';
import './index.css';


const UserPurchases = () =>{

    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useParams();

    const allEvents = useSelector(state => Object.values(state.event));
    const allTickets = useSelector(state => Object.values(state.ticket));

    useEffect(() =>{
        dispatch(getTicketsThunk());
        console.log('all user tickets: ', allTickets)

    }, [dispatch]);

    const handleCancellation = async (ticketId) =>{
        await dispatch(removeRegistrationThunk(ticketId))
    };

    return(
        <div className='user-purchases-pg'>
            <header className='registration-header'>
                <NavLink to={'/'} className='registration-homepage-link'>Event Fright</NavLink>
                <NavLink to={'/tickets'}>{'<< Back to Tickets page'}</NavLink>
            </header>
            <h1>Your Purchases</h1>
            <h2>{allTickets.length === 0 ? 'No purchases have been made at this time':'Your purchases are listed below'}</h2>

            {allTickets.map(ticket => <div className='user-purchases-div'>
                <img className='images-on-purchases-pg' src={ticket.event.event_image} alt='https://st.depositphotos.com/1026550/4380/i/600/depositphotos_43807431-stock-photo-halloween.jpg' onError={e =>{
                        if(ticket.event.event_image){
                            e.currentTarget.src='https://st.depositphotos.com/1026550/4380/i/600/depositphotos_43807431-stock-photo-halloween.jpg'
                        }
                    }
                }/>
                <h3>{ticket.event.event_name}</h3>
                <h4>When: {ticket.event.date}</h4>
                <h4>Where: {ticket.event.venue?.address} {ticket.event.venue.city}, {ticket.event.venue.state}</h4>
                <h4>Price per guest: {'$ '+ticket.event.price+'.00'}</h4>
                <h4>Tickets purchased: {ticket.tickets_sold}</h4>
                <span><button onClick={() => handleCancellation(ticket.id)}>Cancel Registration</button></span>
            </div>)}
        </div>
    );
}


export default UserPurchases;
