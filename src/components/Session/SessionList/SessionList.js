import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../../Trainee/TraineeInfo';
import { AppContext } from '../../../contexts/AppContext';
import { Accordion, Button, Card, Col, Row } from 'react-bootstrap';
import SessionModal from '../SessionModal';

const renderTrainee = (filteredTrainee) => {
	if (filteredTrainee) {
		return (
			<Card key={filteredTrainee.id} className='m-2 border border-0'>
				<Card.Header className='p-0'>
					<TraineeInfo trainee={filteredTrainee}></TraineeInfo>
				</Card.Header>
			</Card>
		);
	}
};

const renderSession = (
	session,
	trainees,
	onClickSession,
	handleUpdateSession
) => {
	return (
		<Accordion key={session.id} className='my-2'>
			<Accordion.Item>
				<Accordion.Header>
					<Row>
						<Col>{session.name}</Col>
						<Col>
							<i>{session.sessionType}</i>
						</Col>
					</Row>
				</Accordion.Header>
				<Accordion.Body>
					<Row className='justify-content-center'>
						<Col xs='auto'>
							<SessionModal
								textButton='Editar'
								session={session}
								handleUpdateSession={handleUpdateSession}
							></SessionModal>
						</Col>
						<Col xs='auto'>
							<Button
								variant='secondary'
								onClick={() => onClickSession(session.id)}
							>
								Eliminar
							</Button>
						</Col>
					</Row>
					<Row className='mt-2'>
						<Col>
							{session.trainees && session.trainees !== 0 ? (
								session.trainees.map((traineeId) => {
									const filteredTrainee = trainees.find(
										(trainee) => trainee.id === traineeId
									);
									return renderTrainee(filteredTrainee);
								})
							) : (
								<p className='text-danger'>No se han encontrado alumnos</p>
							)}
						</Col>
					</Row>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
};

const SessionList = ({ onClickSession, handleUpdateSession }) => {
	const { trainees, sessions } = useContext(AppContext);
	return (
		<Row>
			<Col>
				{sessions && sessions.length !== 0 ? (
					sessions.map((session) =>
						renderSession(
							session,
							trainees,
							onClickSession,
							handleUpdateSession
						)
					)
				) : (
					<p className='text-danger'>No se han encontrado sesiones</p>
				)}
			</Col>
		</Row>
	);
};

SessionList.propTypes = {
	onClickSession: PropTypes.func,
	handleUpdateSession: PropTypes.func,
};

export default SessionList;
