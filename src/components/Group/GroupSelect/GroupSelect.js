import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../../Trainee/TraineeInfo';
import { AppContext } from '../../../contexts/AppContext';
import { Col, Row } from 'react-bootstrap';
import { GROUP_TYPES } from '../../../constants';
import { mapWeekDays } from '../../../utils';

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

const renderGroup = (group, trainees) => {
	return (
		<Row key={group.id}>
			<Col>
				<li>
					<p>{group.name}</p>
					<ul>
						{group.trainees && group.trainees !== 0 ? (
							group.trainees.map((traineeId) => {
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

const GroupSelect = ({ groups, currentDay }) => {
	const { trainees } = useContext(AppContext);
	const [groupType, setGroupType] = useState('');
	return (
		<div>
			Grupos:{' '}
			<select
				defaultValue={''}
				className='form-select'
				aria-label='Floating label select example'
				onChange={(ev) => {
					setGroupType(ev.target.value);
				}}
			>
				<option value={''} disabled>
					Grupos
				</option>
				<option value={GROUP_TYPES.INDIVIDUAL}>{GROUP_TYPES.INDIVIDUAL}</option>
				<option value={GROUP_TYPES.DUO}>{GROUP_TYPES.DUO}</option>
				<option value={GROUP_TYPES.TRIO}>{GROUP_TYPES.TRIO}</option>
				<option value={GROUP_TYPES.CUARTETO}>{GROUP_TYPES.CUARTETO}</option>
				<option value={GROUP_TYPES.GRUPO_GRANDE}>
					{GROUP_TYPES.GRUPO_GRANDE}
				</option>
			</select>
			<Row>
				<Col>
					<ul>
						{groups && groups.length !== 0 ? (
							groups
								.filter(
									(group) =>
										group.groupType === groupType &&
										group.days.weekdays
											.map((session) => session.day)
											.includes(mapWeekDays[currentDay.getDay()]) === true
								)
								.map((group) => renderGroup(group, trainees))
						) : (
							<p className='text-danger'>No se han encontrado grupos</p>
						)}
					</ul>
				</Col>
			</Row>
		</div>
	);
};

GroupSelect.propTypes = {
	groups: PropTypes.any,
	currentDay: PropTypes.object.isRequired,
};

export default GroupSelect;
