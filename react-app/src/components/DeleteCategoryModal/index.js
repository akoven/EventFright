import { Modal } from "../../context/Modal";
import { useState } from "react";
import DeleteDisplay from "./DeleteDisplay";

const DeleteCategoryModal = () =>{

    const [showModal, setShowModal] = useState(false)

    return(
        <div>
            <div onClick={() => setShowModal(true)}></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteDisplay  onClick={() => setShowModal(false)}/>
                </Modal>
            )}
        </div>
    )
}

export default DeleteCategoryModal;
