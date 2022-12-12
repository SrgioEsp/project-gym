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

const SessionsPage = () => {
	const { sessions, setSessions, user, setUser, trainees, setTrainees } =
		useContext(AppContext);
	const [showModal, setShowModal] = useState(false);

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

	const onClickHandleDelSession = (id) => {
		const msj = confirm('Desea eliminar el grupo');
		if (msj)
			delSession(id, user.token).then((res) => {
				const newData = sessions.filter((session) => session.id !== id);
				user.sessions = newData;
				setUser(user);
				setSessions(newData);
			});
	};

	const handleUpdateSession = (session, body) => {
		updateSession(session.id, body, user.token).then((res) => {
			res = setSessionType(res);
			const sessionIndex = sessions.findIndex(
				(session) => session.id === res.id
			);
			sessions[sessionIndex] = res;
			setSessions(sessions);
		});
	};

	const btnBack = (
		<Link to={'/home'} className='btn btn-primary'>
			Atrás
		</Link>
	);
	const btnAct = (
		<>
			<Button onClick={() => setShowModal(true)} variant='success'>
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
						onClickHandleDelSession={onClickHandleDelSession}
					></SessionList>
				</Col>
			</Row>
		</AppFrame>
	);
};

SessionsPage.propTypes = {};

export default SessionsPage;
