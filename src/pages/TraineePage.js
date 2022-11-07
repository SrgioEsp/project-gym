import React from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../components/TraineeInfo';
import AppFrame from '../components/AppFrame';
import { Col, Row } from 'react-bootstrap';
import TraineeForm from '../components/TraineeForm/TraineeForm';
import { Link } from 'react-router-dom';

const TraineePage = ({ trainee }) => {
	return (
		<AppFrame>
			<Row>
				<Col xs='auto'>
					<Link to={'/trainees'} className='btn btn-primary'>
						Atrás
					</Link>
				</Col>
			</Row>
			<Row className='justify-content-center'>
				<Col xs='auto'>
					<TraineeForm></TraineeForm>
				</Col>
			</Row>
			{/* <Row>
				<Col>
					<TraineeInfo trainee={trainee}></TraineeInfo>
				</Col>
			</Row> */}
		</AppFrame>
	);
};

TraineePage.propTypes = {
	trainee: PropTypes.object,
};

export default TraineePage;
