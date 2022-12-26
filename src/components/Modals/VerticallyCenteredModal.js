import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'></Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.body}</Modal.Body>
			{/* <Modal.Footer>
				<Button className='bbtn-r' variant='secondary' onClick={props.onHide}>
					Cerrar
				</Button>
			</Modal.Footer> */}
		</Modal>
	);
}

MyVerticallyCenteredModal.propTypes = {
	onHide: PropTypes.any,
	body: PropTypes.node,
};

const VerticallyCenteredModal = ({ showModal, setShowModal, children }) => {
	return (
		<>
			<MyVerticallyCenteredModal
				body={children}
				show={showModal}
				onHide={() => setShowModal(false)}
			/>
		</>
	);
};

VerticallyCenteredModal.propTypes = {
	showModal: PropTypes.bool,
	setShowModal: PropTypes.func,
	children: PropTypes.node,
};

export default VerticallyCenteredModal;
