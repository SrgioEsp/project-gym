import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { Row, Col, Button } from 'react-bootstrap';
import TraineeList from '../components/TraineeList/TraineeList';
import { Link } from 'react-router-dom';
import { BsFillPersonPlusFill } from 'react-icons/bs';

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

const TraineesPage = (props) => {
	return (
		<AppFrame>
			<Row>
				<Col xs='auto'>
					<Link to={'/home'} className='btn btn-primary'>
						Atrás
					</Link>
				</Col>
				{/* <Col className='d-grid gap-2'>
					<Button>
						Añadir <BsFillPersonPlusFill></BsFillPersonPlusFill>
					</Button>
				</Col> */}
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

TraineesPage.propTypes = {};

export default TraineesPage;
