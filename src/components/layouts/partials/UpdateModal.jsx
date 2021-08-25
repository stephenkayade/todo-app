import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap'

const UpdateModal = ({isShow, closeModal}) => {
    return(
        <>
            <Modal
                show={isShow}
                onHide={() => {}}
                keyboard={false}
                aria-labelledby="_modal"
                centered
                className="md-modal"
            
            >
                <Modal.Body>
                    Hi, Welcome
                </Modal.Body>

            </Modal>
        </>
    )
}

export default UpdateModal;