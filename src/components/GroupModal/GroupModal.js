import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import MultiSelect from '../MultiSelect/MultiSelect';
import GroupSessionInfo from '../GroupSession/GroupSessionInfo';
import { createGroup } from '../../actions/GroupsActions';
import { AppContext } from '../../contexts/AppContext';
import { daysOfWeek } from '../../constants';
import { Button, Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

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

const renderSession = (session, onClickHandlerRemoveSession) => {
	return (
		<tr key={session.day}>
			<GroupSessionInfo session={session}></GroupSessionInfo>
			<td>
				<Button
					variant='danger'
					onClick={() => onClickHandlerRemoveSession(session.day)}
				>
					-
				</Button>
			</td>
		</tr>
	);
};

const GroupModal = () => {
	const [show, setShow] = useState(false);
	const { trainees, user, groups, setGroups } = useContext(AppContext);
	const [name, setName] = useState('');
	const [dropdownIdTrainee, setDropDownIdTrainee] = useState([]);
	const [day, setDay] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [weekdays, setWeekdays] = useState([]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const closeModal = () => {
		emptyFields(
			setName,
			setDropDownIdTrainee,
			setDay,
			setStartTime,
			setEndTime,
			setWeekdays
		);
		handleClose();
	};

	const onClickHandleCreateSession = () => {
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
				console.log('No puede haber dos sesiones del mismo grupo en un día');
			}
		}
	};

	const onClickHandlerRemoveSession = (day) => {
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
			createGroup({
				userId: user.id,
				name,
				trainees: dropdownIdTrainee,
				days: {
					weekdays,
				},
			}).then((res) => {
				console.log(res);
				setGroups([...groups, res]);
				closeModal();
			});
		}
	};

	return (
		<>
			<Button variant='success' onClick={handleShow}>
				Añadir
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Crear Grupo</Modal.Title>
				</Modal.Header>
				<form onSubmit={onSubmitHandler}>
					<Modal.Body>
						<Row>
							<Col>
								<input
									className='form-control'
									type='text'
									name='name'
									placeholder='Nombre Grupo'
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
								Dia
								<select
									defaultValue={''}
									className='form-select'
									onChange={(ev) => setDay(ev.target.value)}
								>
									<option value={''} disabled>
										- - -
									</option>
									{daysOfWeek.map((d) => {
										return <option key={d}>{d}</option>;
									})}
								</select>
							</Col>
							<Col>
								Hora Inicio
								<input
									className='form-control'
									type={'time'}
									onChange={(ev) => setStartTime(ev.target.value)}
								/>
							</Col>
							<Col>
								Hora Fin
								<input
									className='form-control'
									type={'time'}
									onChange={(ev) => setEndTime(ev.target.value)}
								/>
							</Col>
						</Row>
						<Row>
							<Col xs='auto' className='mt-3'>
								<Button
									variant='success'
									size='sm'
									onClick={() => onClickHandleCreateSession()}
								>
									Añadir Sesión
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
											weekdays.map((session) =>
												renderSession(session, onClickHandlerRemoveSession)
											)}
									</tbody>
								</Table>
							</Col>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={closeModal}>
							Cerrar
						</Button>
						<Button variant='primary' type={'submit'}>
							Guardar
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
};

GroupModal.propTypes = {};

export default GroupModal;
