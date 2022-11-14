import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap';
import { AppContext } from '../../contexts/AppContext';
import { formatDate } from '../../utils';
import { GROUP_TYPES } from '../../constants';
import { createGroup } from '../../actions/GroupsActions';

const GroupForm = ({ currentDay }) => {
	const { trainees, user } = useContext(AppContext);
	const onSubmitHandler = (ev) => {
		ev.preventDefault();
		const date = formatDate(currentDay);
		const name = ev.target.name.value;
		const traineeId = ev.target.selectTrainee.value;
		const groupType = ev.target.groupType.value;
		if (name && traineeId && groupType) {
			createGroup({
				userId: user.id,
				trainees: [traineeId],
				groupType,
				name,
				date,
			}).then((res) => console.log(res));
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
						className='form-select'
						name='selectTrainee'
						aria-label='Floating label select example'
						onChange={(ev) => {}}
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
	currentDay: PropTypes.object.isRequired,
};

export default GroupForm;
