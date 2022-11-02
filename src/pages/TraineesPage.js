import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { Row, Col, Button } from 'react-bootstrap';
import TraineeList from '../components/TraineeList/TraineeList';
import { Link } from 'react-router-dom';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import Spinner from '../components/Spinner';

const TraineesPage = ({ trainees, spinner }) => {
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
	spinner: PropTypes.bool.isRequired,
};

export default TraineesPage;
