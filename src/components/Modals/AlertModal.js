import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AlertModal = ({ showModal, setShowModal, header, body, action }) => {
	return (
		<>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>{header}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{body}</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={() => setShowModal(false)}>
						Cancelar
					</Button>
					<Button
						variant='danger'
						onClick={() => {
							action = (act) => act();
							setShowModal(false);
						}}
					>
						Aceptar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

AlertModal.propTypes = {
	showModal: PropTypes.bool,
	setShowModal: PropTypes.func,
	header: PropTypes.any,
	body: PropTypes.any,
	action: PropTypes.any,
};

export default AlertModal;
