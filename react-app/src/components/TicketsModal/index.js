import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import TicketsForm from './TicketsForm';


const TicketsModal = () =>{
    const [showModal, setShowModal] = useState(false);

    return(
        <>
            <button onClick={() => setShowModal(true)}>Purchase Tickets</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TicketsForm />
                </Modal>
            )}
        </>
    );
}

export default TicketsModal;
