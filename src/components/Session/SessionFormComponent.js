import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import MultiSelect from '../MultiSelect/MultiSelect';
import SessionTableInfo from './SessionTableInfo/SessionTableInfo';
import { daysOfWeek } from '../../constants';
import { AppContext } from '../../contexts/AppContext';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { createSession } from '../../actions/SessionsActions';
import { setSessionType } from '../../utils';

const emptyFields = (
	setName,
	setDropDownIdTrainee,
	setDay,
	setStartTime,
	setEndTime,
	setWeekdays
) => {
	setDropDownIdTrainee([]);
	setName('');
	setDay('');
	setStartTime('');
	setEndTime('');
	setWeekdays([]);
};

const renderSessionDay = (session, onClickHandlerRemoveSessionDay) => {
	return (
		<tr key={session.day}>
			<SessionTableInfo weekday={session}></SessionTableInfo>
			<td>
				<Button
					variant='danger'
					onClick={() => onClickHandlerRemoveSessionDay(session.day)}
				>
					-
				</Button>
			</td>
		</tr>
	);
};

const SessionUpdateComponent = ({
	session,
	handleUpdateSession,
	onClickHandleDelSession,
	setShowModal,
}) => {
	const { trainees, user, sessions, setSessions } = useContext(AppContext);
	const [name, setName] = useState(session ? session.name : '');
	const [dropdownIdTrainee, setDropDownIdTrainee] = useState(
		session ? session.trainees : []
	);
	const [weekdays, setWeekdays] = useState(
		session ? session.days.weekdays : []
	);
	const [day, setDay] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');

	const closeModal = () => {
		if (!session) {
			emptyFields(
				setName,
				setDropDownIdTrainee,
				setDay,
				setStartTime,
				setEndTime,
				setWeekdays
			);
		}
		setShowModal(false);
		// handleClose();
	};

	const onClickHandleCreateSessionDay = () => {
		if (day !== '' && startTime !== '' && endTime !== '') {
			const duplicateDay = weekdays.find((obj) => obj.day === day);
			if (duplicateDay === undefined) {
				setWeekdays([
					...weekdays,
					{
						day,
						startTime,
						endTime,
					},
				]);
			} else {
				console.log('Ya se ha creado una sesión para este día');
			}
		}
	};

	const onClickHandlerRemoveSessionDay = (day) => {
		const weekdaysWithoutDay = weekdays.filter(
			(weekday) => weekday.day !== day
		);
		setWeekdays(weekdaysWithoutDay);
	};

	const onSubmitHandler = (ev) => {
		ev.preventDefault();
		if (
			name !== '' &&
			weekdays.length !== 0 &&
			dropdownIdTrainee.length !== 0
		) {
			const body = {
				user: user.id,
				name,
				trainees: dropdownIdTrainee,
				days: {
					weekdays,
				},
			};
			if (session) {
				handleUpdateSession(session, body);
			} else {
				createSession(body, user.token).then((res) => {
					res = setSessionType(res);
					setSessions([...sessions, res]);
					closeModal();
				});
			}
		}
	};

	return (
		<>
			<form onSubmit={onSubmitHandler}>
				<Row>
					<Col>
						<input
							className='form-control'
							type='text'
							name='name'
							placeholder='Nombre Sesión'
							autoComplete='off'
							value={name}
							onChange={(ev) => setName(ev.target.value)}
						/>
					</Col>
				</Row>
				<Row className='my-3'>
					<Col>
						<MultiSelect
							state={dropdownIdTrainee}
							setState={setDropDownIdTrainee}
							arrayValues={trainees}
							textDropdown={'Selección alumnos'}
						></MultiSelect>
					</Col>
				</Row>
				<Row>
					<Col>
						Hora Inicio
						<input
							className='form-control'
							type={'time'}
							value={startTime}
							onChange={(ev) => setStartTime(ev.target.value)}
						/>
					</Col>
					<Col>
						Hora Fin
						<input
							className='form-control'
							type={'time'}
							value={endTime}
							onChange={(ev) => setEndTime(ev.target.value)}
						/>
					</Col>
					<Col>
						Día
						<input
							className='form-control'
							type={'date'}
							value={day}
							onChange={(ev) => setDay(ev.target.value)}
						/>
					</Col>
				</Row>
				<Row>
					<Col xs='auto' className='mt-3'>
						<Button
							disabled={dropdownIdTrainee.length === 0}
							variant='success'
							size='sm'
							onClick={() => onClickHandleCreateSessionDay()}
						>
							Añadir Nuevo Día
						</Button>
					</Col>
				</Row>
				<Row>
					<Col xs='auto' className='mt-3'>
						<Table>
							<thead>
								<tr>
									<th>Dia</th>
									<th>Hora Inicio</th>
									<th>Hora Fin</th>
								</tr>
							</thead>
							<tbody>
								{weekdays.length !== 0 &&
									weekdays.map((day) =>
										renderSessionDay(day, onClickHandlerRemoveSessionDay)
									)}
							</tbody>
						</Table>
					</Col>
				</Row>
				<Row className='justify-content-end'>
					{session && (
						<Col xs='auto'>
							<Button
								className='bbtn-r'
								variant='danger'
								onClick={() => {
									setShowModal(false);
									onClickHandleDelSession(session.id);
								}}
							>
								Eliminar
							</Button>
						</Col>
					)}
					<Col xs='auto'>
						<Button className='bbtn-r' type='submit'>
							Guardar
						</Button>
					</Col>
				</Row>
			</form>
		</>
	);
};

SessionUpdateComponent.propTypes = {
	session: PropTypes.object,
	handleUpdateSession: PropTypes.func,
	onClickHandleDelSession: PropTypes.func,
	setShowModal: PropTypes.func,
};

export default SessionUpdateComponent;
