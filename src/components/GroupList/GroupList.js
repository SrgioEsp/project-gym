import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import TraineeInfo from '../TraineeInfo';
import { AppContext } from '../../contexts/AppContext';

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
					<p>
						{group.name} <i>{group.groupType}</i>
					</p>
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

const GroupList = ({ onClickGroup }) => {
	const { trainees, groups } = useContext(AppContext);
	return (
		<Row>
			<Col>
				<ul>
					{groups && groups.length !== 0 ? (
						groups.map((group) => renderGroup(group, trainees))
					) : (
						<p className='text-danger'>No se han encontrado grupos</p>
					)}
				</ul>
			</Col>
		</Row>
	);
};

GroupList.propTypes = {
	onClickGroup: PropTypes.func,
};

export default GroupList;
