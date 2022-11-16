import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';
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

const renderGroup = (group, trainees, onClickGroup) => {
	return (
		<Row key={group.id}>
			<Col>
				<li>
					<div className='d-flex justify-content-between mb-2'>
						{group.name} <i>{group.groupType}</i>{' '}
						<Dropdown>
							<Dropdown.Toggle
								variant='secondary'
								id={`action${group.id}`}
								size='sm'
							>
								Acciones
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item>
									<Button
										variant='danger'
										size='sm'
										onClick={() => onClickGroup(group.id)}
									>
										Eliminar Grupo
									</Button>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
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
						groups.map((group) => renderGroup(group, trainees, onClickGroup))
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
