import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const ModalAction = ({
	showModal,
	handlerCloseModal,
	modalTitle,
	modalBody,
	modalFooter,
}) => {
	return (
		<Modal show={showModal} onHide={handlerCloseModal}>
			{modalTitle && (
				<Modal.Header closeButton>
					<Modal.Title>{modalTitle}</Modal.Title>
				</Modal.Header>
			)}
			{modalBody && <Modal.Body>{modalBody}</Modal.Body>}
			{modalFooter && <Modal.Footer>{modalFooter}</Modal.Footer>}
		</Modal>
	);
};

ModalAction.propTypes = {
	showModal: PropTypes.any,
	handlerCloseModal: PropTypes.any,
	modalTitle: PropTypes.any,
	modalBody: PropTypes.any,
	modalFooter: PropTypes.any,
};

export default ModalAction;
