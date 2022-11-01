import React from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import Calendar from '../components/Calendar';
import { Row, Col } from 'react-bootstrap';
import TraineeList from '../components/TraineeList/TraineeList';

const trainees = [
	{
		name: 'alumno prueba',
		date: new Date(),
	},
	{
		name: 'alumno prueba2',
		date: new Date(),
	},
	{
		name: 'alumno prueba3',
		date: new Date(),
	},
];

const MainPage = (props) => {
	return (
		<AppFrame>
			<Row className='justify-content-sm-center'>
				<Col xs='auto'>
					<Calendar></Calendar>
				</Col>
			</Row>
			<Row>
				<Col xs='auto'>
					<TraineeList
						trainees={trainees}
						onClickTrainee={() => {}}
					></TraineeList>
				</Col>
			</Row>
			{/* <Row>
				<Col xs='auto'>
					<TraineeList
						trainees={trainees}
						onClickTrainee={() => {}}
					></TraineeList>
				</Col>
			</Row> */}
		</AppFrame>
	);
};

MainPage.propTypes = {};

export default MainPage;
