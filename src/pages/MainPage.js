import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import Calendar from '../components/Calendar';
import GroupSelect from '../components/Group/GroupSelect';
import Spinner from './../components/Spinner';
import { AppContext } from '../contexts/AppContext';
import { getTraineesByUserId } from '../actions/TraineesActions';
import { getGroupsByUserId } from '../actions/GroupsActions';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const MainPage = ({ spinner, setLoading }) => {
	const { trainees, setTrainees, user, groups, setGroups } =
		useContext(AppContext);
	const [calendarDay, onChangeCalendarDay] = useState(new Date());

	useEffect(() => {
		if (!trainees || trainees.length === 0) {
			setLoading(true);
			getTraineesByUserId(user.id).then((res) => {
				if (res) {
					setTrainees(res);
					setLoading(false);
				}
			});
		}
		if (!groups || groups.length === 0) {
			setLoading(true);
			getGroupsByUserId(user.id).then((res) => {
				if (res) {
					setGroups(res);
					setLoading(false);
				}
			});
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
			<Row className='justify-content-center mt-3'>
				<Col xs='auto'>
					{groups && !spinner ? (
						<GroupSelect groups={groups} currentDay={calendarDay}></GroupSelect>
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

			<Row className='justify-content-center mt-3'>
				<Col xs='auto'>
					<Link to={'/groups'} className='btn btn-success'>
						Grupos
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
