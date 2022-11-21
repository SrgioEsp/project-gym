import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import Calendar from '../components/Calendar';
import SessionSelect from '../components/Session/SessionSelect';
import Spinner from './../components/Spinner';
import { AppContext } from '../contexts/AppContext';
import { getTraineesByUserId } from '../actions/TraineesActions';
import { getSessionsByUserId } from '../actions/SessionsActions';
import { setSessionType } from '../utils';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const MainPage = ({ spinner, setLoading }) => {
	const { trainees, setTrainees, user, sessions, setSessions } =
		useContext(AppContext);
	const [calendarDay, onChangeCalendarDay] = useState(new Date());

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
					res = res.map((grupo) => setSessionType(grupo));
					setSessions(res);
					setLoading(false);
				}
			});
		}
	}, []);

	return (
		<AppFrame>
			<Row className='justify-content-center'>
				<Col xs='auto'>
					<Calendar
						value={calendarDay}
						onChange={onChangeCalendarDay}
					></Calendar>
				</Col>
			</Row>
			<Row className='justify-content-center mt-3'>
				<Col xs='auto'>
					{sessions && !spinner ? (
						<SessionSelect sessions={sessions} currentDay={calendarDay}></SessionSelect>
					) : (
						<Spinner></Spinner>
					)}
				</Col>
			</Row>
			<Row className='justify-content-center mt-3'>
				<Col xs='auto'>
					<Link to={'/trainees'} className='btn btn-primary'>
						Alumnos
					</Link>
				</Col>
			</Row>

			<Row className='justify-content-center mt-3'>
				<Col xs='auto'>
					<Link to={'/sessions'} className='btn btn-success'>
						Grupos
					</Link>
				</Col>
			</Row>
		</AppFrame>
	);
};

MainPage.propTypes = {
	spinner: PropTypes.bool.isRequired,
	setLoading: PropTypes.func.isRequired,
};

export default MainPage;
