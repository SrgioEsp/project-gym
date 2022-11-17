import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap';
import { AppContext } from '../../contexts/AppContext';
import { daysOfWeek } from '../../constants';
import MultiSelect from '../MultiSelect/MultiSelect';

const GroupForm = () => {
	const { trainees, user } = useContext(AppContext);
	const [dropdownIdTrainee, setDropDownIdTrainee] = useState([]);
	const [day, setDay] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [weekdays, setWeekdays] = useState([]);

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

	const onSubmitHandler = (ev) => {
		ev.preventDefault();
	};
	return (
		<form onSubmit={onSubmitHandler}>
			<Row>
				<Col>
					<input
						className='form-control'
						type='text'
						name='name'
						placeholder='Nombre Grupo'
						autoComplete='off'
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
					{weekdays.length !== 0 &&
						weekdays.map((obj) => {
							return obj.day + ' ' + obj.startTime + ' ' + obj.endTime + ' ';
						})}
				</Col>
			</Row>
			{/* <Row>
				<Col xs='auto' className='mt-3'>
					<Button type='submit' variant='success' size='sm'>
						Añadir
					</Button>
				</Col>
			</Row> */}
		</form>
	);
};

GroupForm.propTypes = {};

export default GroupForm;
