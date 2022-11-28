import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import SessionList from '../components/Session/SessionList';
import SessionModal from '../components/Session/SessionModal';
import Spinner from '../components/Spinner';
import { AppContext } from '../contexts/AppContext';
import { delSession, updateSession } from '../actions/SessionsActions';
import { setSessionType } from '../utils';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const SessionsPage = () => {
	const { sessions, setSessions, user, trainees, setTrainees } =
		useContext(AppContext);

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
			delSession(id).then((res) => {
				const newData = sessions.filter((session) => session.id !== id);
				setSessions(newData);
			});
	};

	const handleUpdateSession = (session, body) => {
		updateSession(session.id, body).then((res) => {
			res = setSessionType(res);
			const sessionIndex = sessions.findIndex(
				(session) => session.id === res.id
			);
			sessions[sessionIndex] = res;
			setSessions(sessions);
		});
	};

	return (
		<AppFrame>
			<Row>
				<Col>
					<Link to={'/home'} className='btn btn-primary'>
						Atrás
					</Link>
				</Col>
				<Col>
					<h5>SESIONES</h5>
				</Col>
				<Col xs='auto'>
					<SessionModal textButton={'Crear'}></SessionModal>
				</Col>
			</Row>
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
