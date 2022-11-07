import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { Col, Row } from 'react-bootstrap';
import TraineeForm from '../components/TraineeForm/TraineeForm';
import { Link, useLocation } from 'react-router-dom';
import TraineeData from '../components/TraineeData/TraineeData';
import { TraineeContext } from '../contexts/TraineeContext';
import { getTrainee } from '../actions/TraineeActions';
import Spinner from '../components/Spinner';

const TraineePage = ({ spinner, setLoading }) => {
	const [trainee, setTrainee] = useState(null);
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const id = query.get('id');

	useEffect(() => {
		if (id) {
			setLoading(true);
			getTrainee(id).then((res) => {
				setTrainee(res);
				setLoading(false);
			});
		}
	}, []);

	return (
		<AppFrame>
			<TraineeContext.Provider value={{ trainee, setTrainee }}>
				<Row>
					<Col xs='auto'>
						<Link to={'/trainees'} className='btn btn-primary'>
							Atrás
						</Link>
					</Col>
				</Row>
				{!id && (
					<Row className='justify-content-center'>
						<Col xs='auto'>
							<TraineeForm></TraineeForm>
						</Col>
					</Row>
				)}
				{id && !spinner ? (
					<Row className='justify-content-center'>
						<Col xs='auto'>
							<TraineeData id={id}></TraineeData>
						</Col>
					</Row>
				) : (
					spinner && <Spinner></Spinner>
				)}
			</TraineeContext.Provider>
		</AppFrame>
	);
};

TraineePage.propTypes = {
	spinner: PropTypes.bool,
	setLoading: PropTypes.func,
};

export default TraineePage;
