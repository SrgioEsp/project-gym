import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import TraineeList from '../components/Trainee/TraineeList';
import Spinner from '../components/Spinner';
import { AppContext } from '../contexts/AppContext';
import { getTraineesByUserId } from '../actions/TraineesActions';
import { delTrainee } from '../actions/TraineeActions';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import TraineeModal from '../components/Trainee/TraineeModal/TraineeModal';

const TraineesPage = ({ spinner, setLoading }) => {
	const { trainees, setTrainees, user } = useContext(AppContext);

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
	}, []);

	const onClickHandlerDelTrainee = (id) => {
		const msj = confirm('Desea eliminar el alumno');
		if (msj)
			delTrainee(id).then((res) => {
				const newData = trainees.filter((trainee) => trainee.id !== id);
				setTrainees(newData);
			});
	};

	return (
		<AppFrame>
			<Row>
				<Col>
					<Link to={'/home'} className='btn btn-primary'>
						Atrás
					</Link>
				</Col>
				<Col xs='auto'>
					<TraineeModal></TraineeModal>
				</Col>
			</Row>
			<Row className='justify-content-center'>
				<Col xs='auto'>
					{trainees && !spinner ? (
						<TraineeList
							onClickTrainee={(id) => {
								onClickHandlerDelTrainee(id);
							}}
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
	spinner: PropTypes.bool.isRequired,
	setLoading: PropTypes.func.isRequired,
};

export default TraineesPage;
