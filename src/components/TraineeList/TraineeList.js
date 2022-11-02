import React from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../TraineeInfo';
import { formatDate } from '../../utils';
import { Button, Col, Row } from 'react-bootstrap';
import { BsFillPersonPlusFill } from 'react-icons/bs';

// se va a convertir en una función que retorna otra función
// const renderTrainee = (eventOnClickTrainee) => (trainee) => {
// 	return (
// 		<li key={trainee} onClick={eventOnClickTrainee}>
// 			<TraineeInfo trainee={trainee}></TraineeInfo>
// 		</li>
// 	);
// };

const renderTrainee = (eventOnClickTrainee, trainee) => {
	return (
		<li key={trainee.id} onClick={eventOnClickTrainee}>
			<TraineeInfo trainee={trainee}></TraineeInfo>
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
				<Col xs='auto'>
					{currentDayFormat && (
						<Button variant='success' size='sm'>
							Añadir <BsFillPersonPlusFill></BsFillPersonPlusFill>
						</Button>
					)}
				</Col>
			</Row>
			<Row>
				<Col>
					<ul>
						{trainees.length !== 0 ? (
							trainees.map((trainee) => renderTrainee(onClickTrainee, trainee))
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
