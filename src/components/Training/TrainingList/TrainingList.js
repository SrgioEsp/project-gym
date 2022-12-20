import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import VerticallyCenteredModal from '../../Modals/VerticallyCenteredModal';
import TrainingForm from '../TrainingForm/TrainingForm';

const renderTrainingSession = (
	trainingSession,
	onClickHandlerTrainingSession
) => {
	return (
		<div
			key={trainingSession.id}
			className='sessionContainer'
			onClick={() => onClickHandlerTrainingSession(trainingSession)}
		>
			<Row className='trainingSession-row-container'>
				<Col>
					<b>{trainingSession.name}</b>
				</Col>
				<Col>No hay sesiones asociadas</Col>
				<Col className='mt-2'>{`${trainingSession.exercises.length} Ejercicios`}</Col>
			</Row>
		</div>
	);
};

const TrainingList = ({ training }) => {
	const [showModal, setShowModal] = useState(false);
	const [trainingSession, setTrainingSession] = useState({});

	const onClickHandlerTrainingSession = (trainingSession) => {
		setTrainingSession(trainingSession);
		setShowModal(true);
	};

	return (
		<>
			<Row>
				<Col className='training-list-container'>
					{training && training.length !== 0 ? (
						training.map((trainingSession) =>
							renderTrainingSession(
								trainingSession,
								onClickHandlerTrainingSession
							)
						)
					) : (
						<span className='text-danger'>No hay entrenamientos</span>
					)}
				</Col>
			</Row>
			<VerticallyCenteredModal
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<TrainingForm
					training={training}
					trainingSession={trainingSession}
				></TrainingForm>
			</VerticallyCenteredModal>
		</>
	);
};

TrainingList.propTypes = {
	training: PropTypes.array,
	onClickHandlerTrainingSession: PropTypes.func,
};

export default TrainingList;
