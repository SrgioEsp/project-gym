import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap';
import { AppContext } from '../../contexts/AppContext';
import { GROUP_TYPES } from '../../constants';
import { createGroup } from '../../actions/GroupsActions';

const getSelectedValues = (eleId) => {
	return document.querySelectorAll(`#${eleId} option:checked`);
};

const GroupForm = ({ groups, setGroups }) => {
	const { trainees, user } = useContext(AppContext);
	const onSubmitHandler = (ev) => {
		ev.preventDefault();
		const name = ev.target.name.value;
		const groupType = ev.target.groupType.value;

		const selectedTrainees = getSelectedValues('traineeSelector');
		const selectedDays = getSelectedValues('daySelector');

		const traineeIds = Array.from(selectedTrainees).map((el) => el.value);
		const days = Array.from(selectedDays).map((el) => Number(el.value));

		if (name && traineeIds && groupType && days) {
			createGroup({
				userId: user.id,
				trainees: traineeIds,
				groupType,
				name,
				days,
			}).then((res) => {
				console.log(res);
				setGroups([...groups, res]);
			});
		}
	};
	return (
		<form onSubmit={onSubmitHandler}>
			<Row>
				<Col>
					<input
						type='text'
						name='name'
						placeholder='Nombre Grupo'
						autoComplete='off'
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<select
						multiple
						id='traineeSelector'
						className='form-select'
						name='selectTrainee'
						aria-label='Floating label select example'
					>
						<option disabled>Alumnos</option>
						{trainees.map((trainee) => {
							return (
								<option key={trainee.id} value={trainee.id}>
									{trainee.name}
								</option>
							);
						})}
					</select>
				</Col>
			</Row>
			<Row>
				<Col>
					<select
						multiple
						id='daySelector'
						className='form-select'
						name='selectDays'
						aria-label='Floating label select example'
					>
						<option value={1}>Lunes</option>
						<option value={2}>Martes</option>
						<option value={3}>Miercoes</option>
						<option value={4}>Jueves</option>
						<option value={5}>Viernes</option>
						<option value={6}>Sabado</option>
						<option value={0}>Domingo</option>
					</select>
				</Col>
			</Row>
			<Row>
				<Col>
					<select
						className='form-select'
						name='groupType'
						aria-label='Floating label select example'
					>
						<option disabled>Grupo</option>
						<option value=''>Individual</option>
						<option value={GROUP_TYPES.DUO}>Duos</option>
						<option value={GROUP_TYPES.TRIO}>Trios</option>
						<option value={GROUP_TYPES.CUARTETO}>Cuartetos</option>
					</select>
				</Col>
			</Row>
			<Row>
				<Col xs='auto'>
					<Button type='submit' variant='success' size='sm'>
						Añadir
					</Button>
				</Col>
			</Row>
		</form>
	);
};

GroupForm.propTypes = {
	groups: PropTypes.any.isRequired,
	setGroups: PropTypes.func.isRequired,
};

export default GroupForm;
