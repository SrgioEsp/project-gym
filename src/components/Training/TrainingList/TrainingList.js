import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import VerticallyCenteredModal from '../../Modals/VerticallyCenteredModal';
import TrainingForm from '../TrainingForm/TrainingForm';
import { AppContext } from '../../../contexts/AppContext';

const renderTrainingSession = (
	trainingSession,
	sessions,
	onClickHandlerUpdateTrainingSession
) => {
	return (
		<div
			key={trainingSession.id}
			className='trainingContainer'
			onClick={() => onClickHandlerUpdateTrainingSession(trainingSession)}
		>
			<Row className='trainingSession-row-container'>
				<Col>
					<b>{trainingSession.name}</b>
				</Col>
				<Col>
					{trainingSession?.sessions.length !== 0 && sessions
						? sessions.map((session) =>
								trainingSession?.sessions.includes(session.id)
									? ` -${session.name}`
									: ''
						  )
						: 'No hay sesiones asociadas'}
				</Col>
				<Col className='mt-2'>{`${trainingSession.exercises.length} Ejercicios`}</Col>
			</Row>
		</div>
	);
};

const TrainingList = ({
	handleUpdateTrainingSession,
	onClickHandlerDelTrainingSession,
}) => {
	const { training, sessions } = useContext(AppContext);
	const [showModal, setShowModal] = useState(false);
	const [trainingSession, setTrainingSession] = useState({});

	const onClickHandlerUpdateTrainingSession = (selectTrainingSession) => {
		setShowModal(true);
		setTrainingSession(selectTrainingSession);
	};

	return (
		<>
			<Row>
				<Col className='training-list-container'>
					{training && training.length !== 0 ? (
						training.map((trainingSession) =>
							renderTrainingSession(
								trainingSession,
								sessions,
								onClickHandlerUpdateTrainingSession
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
					handleUpdateTrainingSession={handleUpdateTrainingSession}
					onClickHandlerDelTrainingSession={onClickHandlerDelTrainingSession}
					trainingSession={trainingSession}
					setShowModal={setShowModal}
				></TrainingForm>
			</VerticallyCenteredModal>
		</>
	);
};

TrainingList.propTypes = {
	handleUpdateTrainingSession: PropTypes.func,
	onClickHandlerDelTrainingSession: PropTypes.func,
};

export default TrainingList;
