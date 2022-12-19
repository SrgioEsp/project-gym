import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../../Trainee/TraineeInfo';
import { AppContext } from '../../../contexts/AppContext';
import { Col, Row } from 'react-bootstrap';
import VerticallyCenteredModal from '../../Modals/VerticallyCenteredModal';
import SessionFormComponent from '../SessionFormComponent';
import TraineeShow from '../../Trainee/TraineeShow/TraineeShow';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { formatDate } from '../../../utils';

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
	onClickHandleUpdateSession,
	showRenderTrainee,
	setShowRenderTrainee,
	clickedSessionId,
	setClickedSessionId
) => {
	return (
		<div key={session.id} className='sessionContainer'>
			<Row
				onClick={() => !currentDate && onClickHandleUpdateSession(session)}
				className='session-list-row'
			>
				<Col>
					<p className='fs-6 fw-bolder'>{session.name}</p>
				</Col>
				{currentDate && (
					<Col>
						<b>
							{session.days.weekdays.map((weekday) =>
								new Date(weekday.day).getDate() === currentDate.getDate()
									? weekday.startTime
									: ''
							)}
						</b>
						/
						{session.days.weekdays.map((weekday) =>
							new Date(weekday.day).getDate() === currentDate.getDate()
								? weekday.endTime
								: ''
						)}
					</Col>
				)}
				<Col className='session-type'>
					<i>{session.sessionType}</i>
				</Col>
			</Row>
			<Row>
				<Col className='btn-show-trainees-col'>
					<button
						className='btn-show-trainees bg-show-trainees'
						onClick={() => {
							if (showRenderTrainee) {
								if (session.id !== clickedSessionId) {
									setShowRenderTrainee(true);
								} else {
									setShowRenderTrainee(false);
								}
							} else {
								setShowRenderTrainee(true);
							}
							setClickedSessionId(session.id);
						}}
					>
						{showRenderTrainee && session.id === clickedSessionId ? (
							<BsChevronUp></BsChevronUp>
						) : (
							<BsChevronDown></BsChevronDown>
						)}
					</button>
				</Col>
			</Row>
			{showRenderTrainee && (
				<Row>
					<Col
						className='bg-show-trainees'
						onClick={() => !currentDate && onClickHandleUpdateSession(session)}
					>
						{session.trainees &&
							session.trainees !== 0 &&
							session.id === clickedSessionId &&
							session.trainees.map((traineeId) => {
								const filteredTrainee = trainees.find(
									(trainee) => trainee.id === traineeId
								);
								return renderTrainee(filteredTrainee);
							})}
					</Col>
				</Row>
			)}
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
	const [showRenderTrainee, setShowRenderTrainee] = useState(false);
	const [clickedSessionId, setClickedSessionId] = useState('');

	const handleSessions = currentDate
		? sessions.filter(
				(session) =>
					currentDate &&
					session.days.weekdays
						.map((weekday) => formatDate(new Date(weekday.day)))
						.includes(formatDate(currentDate)) === true
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
								onClickHandleUpdateSession,
								showRenderTrainee,
								setShowRenderTrainee,
								clickedSessionId,
								setClickedSessionId
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
