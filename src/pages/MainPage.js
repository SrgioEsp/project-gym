import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import Calendar from '../components/Calendar';
import { Row, Col } from 'react-bootstrap';
import TraineeList from '../components/TraineeList/TraineeList';
import { Link } from 'react-router-dom';
import Spinner from './../components/Spinner';
import { AppContext } from '../contexts/AppContext';
import { helpHttp } from './../helpers/helpHttp';
import { urlTrainees } from './../api/urls';

const MainPage = ({ spinner, setLoading }) => {
	const { trainees, setTrainees, user } = useContext(AppContext);
	const [calendarDay, onChangeCalendarDay] = useState(new Date());

	useEffect(() => {
		if (!trainees || trainees.length === 0) {
			setLoading(true);
			const getTrainees = async () => {
				try {
					const data = await helpHttp().get(`${urlTrainees}?userId=${user.id}`);
					setTrainees(data);
					setLoading(false);
				} catch (error) {
					console.log(error);
					setLoading(false);
				}
			};
			getTrainees();
		}
	}, []);

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
	spinner: PropTypes.bool.isRequired,
	setLoading: PropTypes.func.isRequired,
};

export default MainPage;
