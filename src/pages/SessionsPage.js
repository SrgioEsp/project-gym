import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import SessionList from '../components/Session/SessionList';
import SessionModal from '../components/Session/SessionModal';
import Spinner from '../components/Spinner';
import { AppContext } from '../contexts/AppContext';
import { delSession, getSessionsByUserId } from '../actions/SessionsActions';
import { getTraineesByUserId } from '../actions/TraineesActions';
import { setSessionType } from '../utils';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const SessionsPage = ({ spinner, setLoading }) => {
	const { sessions, setSessions, user, trainees, setTrainees } =
		useContext(AppContext);

	useEffect(() => {
		if (!trainees || trainees.length === 0) {
			setLoading(true);
			getTraineesByUserId(user.id).then((res) => {
				if (res) {
					setTrainees(res);
					setLoading(false);
				}
			});
		}
		if (!sessions || sessions.length === 0) {
			setLoading(true);
			getSessionsByUserId(user.id).then((res) => {
				if (res) {
					res = res.map((session) => setSessionType(session));
					setSessions(res);
					setLoading(false);
				}
			});
		}
	}, []);

	const onClickHandlerDelSession = (id) => {
		const msj = confirm('Desea eliminar el grupo');
		if (msj)
			delSession(id).then((res) => {
				const newData = sessions.filter((session) => session.id !== id);
				setSessions(newData);
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
					<SessionModal></SessionModal>
				</Col>
			</Row>
			<Row className='mt-3'>
				<Col>
					{sessions && !spinner ? (
						<SessionList
							onClickSession={(id) => {
								onClickHandlerDelSession(id);
							}}
						></SessionList>
					) : (
						<Spinner></Spinner>
					)}
				</Col>
			</Row>
		</AppFrame>
	);
};

SessionsPage.propTypes = {
	spinner: PropTypes.bool.isRequired,
	setLoading: PropTypes.func.isRequired,
};

export default SessionsPage;
