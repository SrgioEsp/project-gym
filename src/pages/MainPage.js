import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import Calendar from '../components/Calendar';
import { Row, Col } from 'react-bootstrap';
import TraineeList from '../components/TraineeList/TraineeList';

const trainees = [
	{
		name: 'alumno prueba',
		date: '31/1/2002',
	},
	{
		name: 'alumno prueba2',
		date: '13/2/2002',
	},
	{
		name: 'alumno prueba3',
		date: '1/11/2022',
	},
	{
		name: 'alumno prueba4',
		date: '1/11/2022',
	},
	{
		name: 'alumno prueba5',
		date: '1/11/2022',
	},
	{
		name: 'alumno prueba6',
		date: '2/11/2022',
	},
];

const MainPage = (props) => {
	const [calendarDay, onChangeCalendarDay] = useState(new Date());

	return (
		<AppFrame>
			<Row className='justify-content-sm-center'>
				<Col xs='auto'>
					<Calendar
						value={calendarDay}
						onChange={onChangeCalendarDay}
					></Calendar>
				</Col>
			</Row>
			<Row>
				<Col xs='auto'>
					<TraineeList
						trainees={trainees}
						onClickTrainee={() => {}}
						currentDay={calendarDay}
					></TraineeList>
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
		</AppFrame>
	);
};

MainPage.propTypes = {};

export default MainPage;
