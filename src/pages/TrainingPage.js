import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import VerticallyCenteredModal from '../components/Modals/VerticallyCenteredModal';
import { AppContext } from '../contexts/AppContext';
import { setSessionType } from '../utils';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import NavTopButton from '../components/NavTopButton/NavTopButton';
import ModalAction from '../components/Modals/ModalAction';
import TrainingList from '../components/Training/TrainingList/TrainingList';
import TrainingForm from '../components/Training/TrainingForm/TrainingForm';

const TrainingPage = () => {
	const { sessions, setSessions, user } = useContext(AppContext);
	const [training, setTraining] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (!sessions || sessions.length === 0) {
			if (user.sessions && user.sessions.length !== 0) {
				user.sessions = user.sessions.map((session) => setSessionType(session));
				setSessions(user.sessions);
			}
		}
	}, []);

	const handleClose = () => setShow(false);

	const onClickHandlerTrainingSession = (id) => {
		console.log(id);
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
			<VerticallyCenteredModal
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<TrainingForm
					training={training}
					setTraining={setTraining}
				></TrainingForm>
			</VerticallyCenteredModal>
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
						training={training}
						onClickHandlerTrainingSession={onClickHandlerTrainingSession}
					></TrainingList>
				</Col>
			</Row>
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
						<Button className='bbtn-r' variant='primary' onClick={() => {}}>
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
