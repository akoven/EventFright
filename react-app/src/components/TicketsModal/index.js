import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import TicketsForm from './TicketsForm';
import './index.css';


const TicketsModal = () =>{
    const [showModal, setShowModal] = useState(false);
    // console.log('SHOW MODAL VALUE!!!!!!!!!!!!!!!',showModal)
    return(
        <>
            <button className='tickets-btn-on-reg-pg' onClick={() => setShowModal(true)}>Tickets</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TicketsForm />
                </Modal>
            )}
        </>
    );
}

export default TicketsModal;
