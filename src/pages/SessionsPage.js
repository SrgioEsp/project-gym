import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import VerticallyCenteredModal from '../components/Modals/VerticallyCenteredModal';
import SessionFormComponent from './../components/Session/SessionFormComponent';
import SessionList from '../components/Session/SessionList';
import { AppContext } from '../contexts/AppContext';
import { delSession, updateSession } from '../actions/SessionsActions';
import { setSessionType } from '../utils';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import NavTopButton from '../components/NavTopButton/NavTopButton';
import ModalAction from '../components/Modals/ModalAction';

const SessionsPage = () => {
	const { sessions, setSessions, user, setUser, trainees, setTrainees } =
		useContext(AppContext);
	const [showModal, setShowModal] = useState(false);
	const [show, setShow] = useState(false);
	const [sessionId, setSessionId] = useState('');

	useEffect(() => {
		if (!trainees || trainees.length === 0) {
			if (user.trainees && user.trainees.length !== 0) {
				setTrainees(user.trainees);
			}
		}
		if (!sessions || sessions.length === 0) {
			if (user.sessions && user.sessions.length !== 0) {
				user.sessions = user.sessions.map((session) => setSessionType(session));
				setSessions(user.sessions);
			}
		}
	}, []);

	const handleClose = () => setShow(false);

	const onClickHandleDelSession = (id) => {
		delSession(id, user.token).then((res) => {
			const newData = sessions.filter((session) => session.id !== id);
			user.sessions = newData;
			setUser(user);
			setSessions(newData);
		});
		handleClose();
	};

	const handleUpdateSession = (sessionId, body) => {
		updateSession(sessionId, body, user.token).then((res) => {
			if (res) {
				res = setSessionType(res);
				const sessionIndex = sessions.findIndex(
					(session) => session.id === res.id
				);
				sessions[sessionIndex] = res;
				setSessions(sessions);
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
			<VerticallyCenteredModal
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<SessionFormComponent
					setShowModal={setShowModal}
				></SessionFormComponent>
			</VerticallyCenteredModal>
		</>
	);
	const text = 'SESIONES';

	return (
		<AppFrame>
			<NavTopButton
				btnBack={btnBack}
				btnAct={btnAct}
				text={text}
			></NavTopButton>
			<Row className='mt-3'>
				<Col>
					<SessionList
						handleUpdateSession={handleUpdateSession}
						onClickHandleDelSession={(id) => {
							setSessionId(id);
							setShow(true);
						}}
					></SessionList>
				</Col>
			</Row>
			<ModalAction
				showModal={show}
				handlerCloseModal={handleClose}
				modalTitle={'Cuidado!'}
				modalBody={'¿Desea eliminar la sesión?'}
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
							onClick={() => onClickHandleDelSession(sessionId)}
						>
							Aceptar
						</Button>
					</>
				}
			></ModalAction>
		</AppFrame>
	);
};

SessionsPage.propTypes = {};

export default SessionsPage;
