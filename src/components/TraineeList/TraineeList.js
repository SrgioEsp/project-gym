import React from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../TraineeInfo';
import { formatDate } from '../../utils';
import { Button, Col, Row } from 'react-bootstrap';
import { BsFillPersonXFill } from 'react-icons/bs';

const renderTrainee = (eventOnClickTrainee, trainee, currentDayFormat) => {
	return (
		<li key={trainee.id}>
			<Row>
				<Col>
					<TraineeInfo trainee={trainee}></TraineeInfo>
				</Col>
				<Col xs='auto'>
					{!currentDayFormat && (
						<Button
							variant='danger'
							size='sm'
							onClick={() => eventOnClickTrainee(trainee.id)}
						>
							Eliminar <BsFillPersonXFill></BsFillPersonXFill>
						</Button>
					)}
				</Col>
			</Row>
		</li>
	);
};

const TraineeList = ({ trainees, onClickTrainee, currentDay }) => {
	let currentDayFormat = '';
	if (currentDay && typeof currentDay === 'object') {
		currentDayFormat = formatDate(currentDay);
		trainees = trainees.filter(({ date }) => date === currentDayFormat);
	}

	return (
		<div className='mt-3'>
			<Row className='justify-content-center'>
				<Col>{currentDayFormat ? 'TraineeList Filtered' : 'TraineeList'}</Col>
			</Row>
			<Row>
				<Col>
					<ul>
						{trainees.length !== 0 ? (
							trainees.map((trainee) =>
								renderTrainee(onClickTrainee, trainee, currentDayFormat)
							)
						) : (
							// <Spinner></Spinner>
							<p className='text-danger'>No se han encontrado alumnos</p>
						)}
					</ul>
				</Col>
			</Row>
		</div>
	);
};

TraineeList.propTypes = {
	trainees: PropTypes.array.isRequired,
	onClickTrainee: PropTypes.func.isRequired,
	currentDay: PropTypes.any,
};

export default TraineeList;
