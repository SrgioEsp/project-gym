import React from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../TraineeInfo';

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
		<li key={trainee} onClick={eventOnClickTrainee}>
			<TraineeInfo trainee={trainee}></TraineeInfo>
		</li>
	);
};

const TraineeList = ({ trainees, onClickTrainee }) => {
	return (
		<div className='mt-3'>
			TraineeList
			<ul>
				{trainees.map((trainee) => renderTrainee(onClickTrainee, trainee))}
			</ul>
		</div>
	);
};

TraineeList.propTypes = {
	trainees: PropTypes.array.isRequired,
	onClickTrainee: PropTypes.func.isRequired,
};

export default TraineeList;
