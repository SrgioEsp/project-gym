import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import Calendar from '../components/Calendar';
import { Row, Col } from 'react-bootstrap';
import TraineeList from '../components/TraineeList/TraineeList';
import { Link } from 'react-router-dom';
import Spinner from './../components/Spinner';
import { AppContext } from '../contexts/AppContext';
import { getTraineesByUserId } from '../actions/TraineesActions';
import { getGroupsByUserId } from '../actions/GroupsActions';
import GroupSelect from '../components/GroupSelect/GroupSelect';
import GroupForm from '../components/GroupForm/GroupForm';

const MainPage = ({ spinner, setLoading }) => {
	const [groups, setGroups] = useState('');
	const { trainees, setTrainees, user } = useContext(AppContext);
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
		if (!groups) {
			setLoading(true);
			getGroupsByUserId(user.id).then((res) => {
				if (res) {
					setGroups(res);
					setLoading(false);
				}
			});
		}
	}, [trainees, setLoading, setTrainees, groups, setGroups]);

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
			{/* <Row>
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
			</Row> */}
			<Row className='justify-content-center mt-3'>
				<Col xs='auto'>
					<GroupSelect groups={groups} currentDay={calendarDay}></GroupSelect>
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
					<p>Crear nuevo Grupo</p>
					<GroupForm currentDay={calendarDay}></GroupForm>
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
