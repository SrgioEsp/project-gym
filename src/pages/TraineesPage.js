import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { Row, Col, Button } from 'react-bootstrap';
import TraineeList from '../components/TraineeList/TraineeList';
import { Link } from 'react-router-dom';
import { BsFillPersonPlusFill } from 'react-icons/bs';

const TraineesPage = ({ trainees }) => {
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

TraineesPage.propTypes = {
	trainees: PropTypes.array.isRequired,
};

export default TraineesPage;
