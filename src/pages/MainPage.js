import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import Calendar from '../components/Calendar';
import { AppContext } from '../contexts/AppContext';
import { convertWeekDaysToString, setSessionType } from '../utils';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import VerticallyCenteredModal from '../components/Modals/VerticallyCenteredModal';
import SessionList from '../components/Session/SessionList';

const MainPage = () => {
	const { trainees, setTrainees, user, sessions, setSessions } =
		useContext(AppContext);
	const [calendarDay, onChangeCalendarDay] = useState(new Date());
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

	return (
		<AppFrame>
			<Row className='calendarRowContainer'>
				<Col className='calendarColContainer'>
					<Calendar
						value={calendarDay}
						onChange={onChangeCalendarDay}
						setShowModal={setShowModal}
					></Calendar>
				</Col>
			</Row>
			<Row className='justify-content-center'>
				<Col xs='auto'>
					<Row className='btnAlumnosRow'>
						<Col>
							<Link to={'/trainees'} className='btn btn-primary btnAlumnos'>
								Alumnos
							</Link>
						</Col>
					</Row>
					<Row className='btnSesionesRow'>
						<Col>
							<Link to={'/sessions'} className='btn btn-success btnSesiones'>
								Sesiones
							</Link>
						</Col>
					</Row>
					<Row className='btnTrainingRow'>
						<Col>
							<Link to={'/training'} className='btn btn-warning btnTraining'>
								Entrenamientos
							</Link>
						</Col>
					</Row>
				</Col>
			</Row>
			<VerticallyCenteredModal
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<Row className='justify-content-center mb-3'>
					<Col xs='auto'>
						<h4>
							{convertWeekDaysToString(calendarDay.getDay())}{' '}
							{calendarDay.toLocaleDateString()}
						</h4>
					</Col>
				</Row>
				<Row>
					<Col>
						<SessionList currentDate={calendarDay}></SessionList>
					</Col>
				</Row>
			</VerticallyCenteredModal>
		</AppFrame>
	);
};

MainPage.propTypes = {};

export default MainPage;
