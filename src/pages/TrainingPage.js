import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import VerticallyCenteredModal from '../components/Modals/VerticallyCenteredModal';
import NavTopButton from '../components/NavTopButton/NavTopButton';
import ModalAction from '../components/Modals/ModalAction';
import TrainingList from '../components/Training/TrainingList/TrainingList';
import TrainingForm from '../components/Training/TrainingForm/TrainingForm';
import { delTraining, updateTraining } from '../actions/TrainingActions';
import { AppContext } from '../contexts/AppContext';
import { setSessionType } from '../utils';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

const TrainingPage = () => {
	const { sessions, setSessions, user, setUser, training, setTraining } =
		useContext(AppContext);
	const [showModal, setShowModal] = useState(false);
	const [show, setShow] = useState(false);
	const [trainingId, setTrainingId] = useState('');

	useEffect(() => {
		if (!sessions || sessions.length === 0) {
			if (user.sessions && user.sessions.length !== 0) {
				user.sessions = user.sessions.map((session) => setSessionType(session));
				setSessions(user.sessions);
			}
		}

		if (!training || training.length === 0) {
			if (user.training && user.training.length !== 0) {
				setTraining(user.training);
			}
		}
	}, []);

	const handleClose = () => setShow(false);

	const onClickHandleDelTraining = (id) => {
		delTraining(id, user.token).then((res) => {
			const newData = training.filter(
				(trainingSession) => trainingSession.id !== id
			);
			user.training = newData;
			setUser(user);
			setTraining(newData);
		});
		handleClose();
	};

	const handleUpdateTrainingSession = (trainingSessionId, body) => {
		updateTraining(trainingSessionId, body, user.token).then((res) => {
			if (res) {
				const trainingIndex = training.findIndex(
					(trainingSession) => trainingSession.id === res.id
				);
				training[trainingIndex] = res;
				setTraining(training);
			}
		});
	};

	const btnBack = (
		<Link to={'/home'} className='btn btn-primary bbtn-r'>
			Atrás
		</Link>
	);
	const btnAct = (
		<>
			<Button
				className='bbtn-r'
				onClick={() => setShowModal(true)}
				variant='success'
			>
				Crear
			</Button>
		</>
	);
	const text = 'Entrenamientos';

	return (
		<AppFrame>
			<NavTopButton
				btnBack={btnBack}
				btnAct={btnAct}
				text={text}
			></NavTopButton>
			<Row className='mt-3'>
				<Col>
					<TrainingList
						handleUpdateTrainingSession={handleUpdateTrainingSession}
						onClickHandlerDelTrainingSession={(id) => {
							setTrainingId(id);
							setShow(true);
						}}
					></TrainingList>
				</Col>
			</Row>
			<VerticallyCenteredModal
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<TrainingForm setShowModal={setShowModal}></TrainingForm>
			</VerticallyCenteredModal>
			<ModalAction
				showModal={show}
				handlerCloseModal={handleClose}
				modalTitle={'Cuidado!'}
				modalBody={'¿Desea eliminar el entrenamiento?'}
				modalFooter={
					<>
						{' '}
						<Button
							className='bbtn-r'
							variant='secondary'
							onClick={handleClose}
						>
							Cancelar
						</Button>
						<Button
							className='bbtn-r'
							variant='primary'
							onClick={() => onClickHandleDelTraining(trainingId)}
						>
							Aceptar
						</Button>
					</>
				}
			></ModalAction>
		</AppFrame>
	);
};

TrainingPage.propTypes = {};

export default TrainingPage;
