import { useState } from "react";
import { Modal } from "../../context/Modal";
import EditVenue from "./EditVenue";
import DeleteVenue from "./DeleteVenue";

const EditDeleteModal = () =>{
    const [showModal, setShowModal] = useState(false)

    return(
        <>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditVenue />
                </Modal>
            )}

            <button onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteVenue />
                </Modal>
            )}


        </>
    )

}
