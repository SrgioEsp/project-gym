import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { Row, Col, Button } from 'react-bootstrap';
import TraineeList from '../components/TraineeList/TraineeList';
import { Link } from 'react-router-dom';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import Spinner from '../components/Spinner';
import { helpHttp } from '../helpers/helpHttp';
import { urlTrainees } from '../api/urls';
import { formatDate } from '../utils';

const TraineesPage = ({ trainees, setTrainees, spinner }) => {
	const onClickHandler = () => {
		console.log('Añadir Alumno');
		const createMockTrainee = async () => {
			try {
				const data = { name: 'alumno prueba', date: formatDate(new Date()) };
				const options = {
					body: data,
					headers: { 'content-type': 'application/json' },
				};
				const res = await helpHttp().post(urlTrainees, options);
				setTrainees([...trainees, res]);
			} catch (error) {
				console.log(error);
			}
		};
		createMockTrainee();
	};

	return (
		<AppFrame>
			<Row>
				<Col xs='auto'>
					<Link to={'/home'} className='btn btn-primary'>
						Atrás
					</Link>
				</Col>
				<Col className='d-grid gap-2'>
					<Button onClick={onClickHandler}>
						Añadir <BsFillPersonPlusFill></BsFillPersonPlusFill>
					</Button>
				</Col>
			</Row>
			<Row>
				<Col xs='auto'>
					{trainees && !spinner ? (
						<TraineeList
							trainees={trainees}
							onClickTrainee={() => {}}
						></TraineeList>
					) : (
						<Spinner></Spinner>
					)}
				</Col>
			</Row>
		</AppFrame>
	);
};

TraineesPage.propTypes = {
	trainees: PropTypes.array.isRequired,
	setTrainees: PropTypes.func,
	spinner: PropTypes.bool.isRequired,
};

export default TraineesPage;
