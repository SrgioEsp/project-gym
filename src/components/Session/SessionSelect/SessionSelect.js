import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../../Trainee/TraineeInfo';
import { AppContext } from '../../../contexts/AppContext';
import { Col, Row } from 'react-bootstrap';
import { SESSION_TYPES } from '../../../constants';
import { convertWeekDaysToNumber, mapWeekDays } from '../../../utils';

const getNumOfSessionsDay = (sessions, currentDay, type) => {
	let count = 0;
	sessions.forEach((session) => {
		if (session.sessionType === type) {
			session.days.weekdays.forEach((weekday) => {
				if (convertWeekDaysToNumber(weekday.day) === currentDay.getDay()) {
					count++;
				}
			});
		}
	});
	return count;
};

const renderTrainee = (filteredTrainee) => {
	if (filteredTrainee && filteredTrainee.length !== 0) {
		return (
			<Row key={filteredTrainee[0].id}>
				<Col>
					<li>
						<TraineeInfo trainee={filteredTrainee[0]}></TraineeInfo>
					</li>
				</Col>
			</Row>
		);
	}
};

const renderSession = (session, trainees, currentDay) => {
	return (
		<Row key={session.id}>
			<Col>
				<li>
					<p>
						{session.name} (
						{session.days.weekdays.map((weekday) =>
							convertWeekDaysToNumber(weekday.day) === currentDay.getDay()
								? weekday.startTime
								: ''
						)}
						-
						{session.days.weekdays.map((weekday) =>
							convertWeekDaysToNumber(weekday.day) === currentDay.getDay()
								? weekday.endTime
								: ''
						)}
						)
					</p>
					<ul>
						{session.trainees && session.trainees !== 0 ? (
							session.trainees.map((traineeId) => {
								const filteredTrainee = trainees.filter(
									(trainee) => trainee.id === traineeId
								);
								return renderTrainee(filteredTrainee);
							})
						) : (
							<p className='text-danger'>No se han encontrado alumnos</p>
						)}
					</ul>
				</li>
			</Col>
		</Row>
	);
};

const SessionSelect = ({ sessions, currentDay }) => {
	const { trainees } = useContext(AppContext);
	const [sessionType, setSessionType] = useState('');
	return (
		<div>
			<select
				defaultValue={''}
				className='form-select mb-2'
				aria-label='Floating label select example'
				onChange={(ev) => {
					setSessionType(ev.target.value);
				}}
			>
				<option value={''} disabled>
					Sesiones
				</option>
				<option value={SESSION_TYPES.INDIVIDUAL}>
					{SESSION_TYPES.INDIVIDUAL} (
					{getNumOfSessionsDay(sessions, currentDay, SESSION_TYPES.INDIVIDUAL)})
				</option>
				<option value={SESSION_TYPES.DUO}>
					{SESSION_TYPES.DUO} (
					{getNumOfSessionsDay(sessions, currentDay, SESSION_TYPES.DUO)})
				</option>
				<option value={SESSION_TYPES.TRIO}>
					{SESSION_TYPES.TRIO} (
					{getNumOfSessionsDay(sessions, currentDay, SESSION_TYPES.TRIO)})
				</option>
				<option value={SESSION_TYPES.CUARTETO}>
					{SESSION_TYPES.CUARTETO} (
					{getNumOfSessionsDay(sessions, currentDay, SESSION_TYPES.CUARTETO)})
				</option>
				<option value={SESSION_TYPES.QUINTETO}>
					{SESSION_TYPES.QUINTETO} (
					{getNumOfSessionsDay(sessions, currentDay, SESSION_TYPES.QUINTETO)})
				</option>
				<option value={SESSION_TYPES.GRUPO}>
					{SESSION_TYPES.GRUPO} (
					{getNumOfSessionsDay(sessions, currentDay, SESSION_TYPES.GRUPO)})
				</option>
			</select>
			<Row>
				<Col>
					<ul>
						{sessions && sessions.length !== 0 ? (
							sessions
								.filter(
									(session) =>
										session.sessionType === sessionType &&
										session.days.weekdays
											.map((weekday) => weekday.day)
											.includes(mapWeekDays[currentDay.getDay()]) === true
								)
								.map((session) => renderSession(session, trainees, currentDay))
						) : (
							<p className='text-danger'>No se han encontrado sesiones</p>
						)}
					</ul>
				</Col>
			</Row>
		</div>
	);
};

SessionSelect.propTypes = {
	sessions: PropTypes.any,
	currentDay: PropTypes.object.isRequired,
};

export default SessionSelect;
