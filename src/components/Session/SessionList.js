import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../Trainee/TraineeInfo';
import { AppContext } from '../../contexts/AppContext';
import { Col, Row } from 'react-bootstrap';
import VerticallyCenteredModal from '../Modals/VerticallyCenteredModal';
import SessionFormComponent from './SessionFormComponent';
import TraineeShow from '../Trainee/TraineeShow/TraineeShow';

const renderTrainee = (filteredTrainee) => {
	if (filteredTrainee) {
		return (
			<div key={filteredTrainee.id}>
				<TraineeShow>
					<TraineeInfo trainee={filteredTrainee}></TraineeInfo>
				</TraineeShow>
			</div>
		);
	}
};

const renderSession = (
	session,
	trainees,
	currentDate,
	onClickHandleUpdateSession
) => {
	return (
		<div
			key={session.id}
			className='sessionContainer'
			onClick={() => !currentDate && onClickHandleUpdateSession(session)}
		>
			<Row className='d-flex justify-content-center'>
				<Col xs='auto'>
					<h6>{session.name}</h6>
				</Col>
				{currentDate && (
					<Col>
						<b>
							{session.days.weekdays.map((weekday) =>
								new Date(weekday.day).getDay() === currentDate.getDay()
									? weekday.startTime
									: ''
							)}
						</b>
						/
						{session.days.weekdays.map((weekday) =>
							new Date(weekday.day).getDay() === currentDate.getDay()
								? weekday.endTime
								: ''
						)}
					</Col>
				)}
				<Col className='border border-1 rounded-pill d-flex justify-content-center me-3'>
					<i>{session.sessionType}</i>
				</Col>
			</Row>
			<Row className='mt-2'>
				<Col>
					{session.trainees &&
						session.trainees !== 0 &&
						session.trainees.map((traineeId) => {
							const filteredTrainee = trainees.find(
								(trainee) => trainee.id === traineeId
							);
							return renderTrainee(filteredTrainee);
						})}
				</Col>
			</Row>
		</div>
	);
};

const SessionList = ({
	currentDate,
	handleUpdateSession,
	onClickHandleDelSession,
}) => {
	const { trainees, sessions } = useContext(AppContext);
	const [showModal, setShowModal] = useState(false);
	const [session, setSession] = useState({});
	const handleSessions = currentDate
		? sessions.filter(
				(session) =>
					currentDate &&
					session.days.weekdays
						.map((weekday) => new Date(weekday.day).getDate())
						.includes(currentDate.getDate()) === true
		  )
		: sessions;
	const onClickHandleUpdateSession = (selectSession) => {
		setShowModal(true);
		setSession(selectSession);
	};
	return (
		<>
			<Row>
				<Col className='session-list-contnainer'>
					{handleSessions && handleSessions.length !== 0 ? (
						handleSessions.map((session) =>
							renderSession(
								session,
								trainees,
								currentDate,
								onClickHandleUpdateSession
							)
						)
					) : (
						<p className='text-danger'>No se han encontrado sesiones</p>
					)}
				</Col>
			</Row>
			<VerticallyCenteredModal
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<SessionFormComponent
					session={session}
					handleUpdateSession={handleUpdateSession}
					onClickHandleDelSession={onClickHandleDelSession}
					setShowModal={setShowModal}
				></SessionFormComponent>
			</VerticallyCenteredModal>
		</>
	);
};

SessionList.propTypes = {
	currentDate: PropTypes.object,
	handleUpdateSession: PropTypes.func,
	onClickHandleDelSession: PropTypes.func,
};

export default SessionList;
