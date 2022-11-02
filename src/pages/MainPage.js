import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import Calendar from '../components/Calendar';
import { Row, Col } from 'react-bootstrap';
import TraineeList from '../components/TraineeList/TraineeList';
import { Link } from 'react-router-dom';
import Spinner from './../components/Spinner';

const MainPage = ({ trainees, spinner }) => {
	const [calendarDay, onChangeCalendarDay] = useState(new Date());

	return (
		<AppFrame>
			<Row className='justify-content-center'>
				<Col xs='auto'>
					<Calendar
						value={calendarDay}
						onChange={onChangeCalendarDay}
					></Calendar>
				</Col>
			</Row>
			<Row>
				<Col>
					{trainees && !spinner ? (
						<TraineeList
							trainees={trainees}
							onClickTrainee={() => {}}
							currentDay={calendarDay}
						></TraineeList>
					) : (
						<Spinner></Spinner>
					)}
				</Col>
			</Row>
			<Row className='justify-content-center mt-3'>
				<Col xs='auto'>
					<Link to={'/trainees'} className='btn btn-primary'>
						Alumnos
					</Link>
				</Col>
			</Row>
		</AppFrame>
	);
};

MainPage.propTypes = {
	trainees: PropTypes.array.isRequired,
	spinner: PropTypes.bool.isRequired,
};

export default MainPage;
