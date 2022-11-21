import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../../Trainee/TraineeInfo';
import { AppContext } from '../../../contexts/AppContext';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';

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

const renderSession = (session, trainees, onClickSession) => {
	return (
		<Row key={session.id}>
			<Col>
				<li>
					<div className='d-flex justify-content-between mb-2'>
						{session.name} <i>{session.sessionType}</i>{' '}
						<Dropdown>
							<Dropdown.Toggle
								variant='secondary'
								id={`action${session.id}`}
								size='sm'
							>
								Acciones
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item>
									<Button
										variant='danger'
										size='sm'
										onClick={() => onClickSession(session.id)}
									>
										Eliminar Sesión
									</Button>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
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

const SessionList = ({ onClickSession }) => {
	const { trainees, sessions } = useContext(AppContext);
	return (
		<Row>
			<Col>
				<ul>
					{sessions && sessions.length !== 0 ? (
						sessions.map((session) =>
							renderSession(session, trainees, onClickSession)
						)
					) : (
						<p className='text-danger'>No se han encontrado sesiones</p>
					)}
				</ul>
			</Col>
		</Row>
	);
};

SessionList.propTypes = {
	onClickSession: PropTypes.func,
};

export default SessionList;
