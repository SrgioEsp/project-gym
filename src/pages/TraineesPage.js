import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { Row, Col, Button } from 'react-bootstrap';
import TraineeList from '../components/TraineeList/TraineeList';
import { Link } from 'react-router-dom';
import { BsFillPersonPlusFill, BsFillPersonXFill } from 'react-icons/bs';
import Spinner from '../components/Spinner';
import { formatDate } from '../utils';
import { createMockTrainee, delMockTrainee } from '../actions/TraineeActions';

const TraineesPage = ({ trainees, setTrainees, spinner }) => {
	const onClickHandlerAddTrainee = () => {
		console.log('Añadir Alumno');
		createMockTrainee(
			{ name: 'alumno prueba', date: formatDate(new Date()) },
			trainees,
			setTrainees
		);
	};

	const onClickHandlerDelTrainee = () => {
		console.log('Eliminar Alumno');
		delMockTrainee(trainees[trainees.length - 1].id, trainees, setTrainees);
	};

	return (
		<AppFrame>
			<Row>
				<Col xs='auto'>
					<Link to={'/home'} className='btn btn-primary'>
						Atrás
					</Link>
				</Col>
				<Col xs='auto'>
					<Button variant='success' onClick={onClickHandlerAddTrainee}>
						Añadir <BsFillPersonPlusFill></BsFillPersonPlusFill>
					</Button>
				</Col>
				<Col xs='auto'>
					<Button variant='danger' onClick={onClickHandlerDelTrainee}>
						Eliminar <BsFillPersonXFill></BsFillPersonXFill>
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
