import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import TraineeList from '../components/Trainee/TraineeList';
import { AppContext } from '../contexts/AppContext';
import { delTrainee } from '../actions/TraineeActions';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import TraineeModal from '../components/Trainee/TraineeModal/TraineeModal';
import NavTopButton from '../components/NavTopButton/NavTopButton';

const TraineesPage = () => {
	const { trainees, setTrainees, user, setUser } = useContext(AppContext);

	useEffect(() => {
		if (!trainees || trainees.length === 0) {
			if (user.trainees && user.trainees.length !== 0) {
				setTrainees(user.trainees);
			}
		}
	}, []);

	const onClickHandlerDelTrainee = (id) => {
		const msj = confirm('Desea eliminar el alumno');
		if (msj)
			delTrainee(id, user.token).then((res) => {
				const newData = trainees.filter((trainee) => trainee.id !== id);
				user.trainees = newData;
				setUser(user);
				setTrainees(newData);
			});
	};

	const btnBack = (
		<Link to={'/home'} className='btn btn-primary'>
			Atrás
		</Link>
	);

	const btnAct = <TraineeModal></TraineeModal>;

	const text = 'ALUMNOS';

	return (
		<AppFrame>
			<NavTopButton
				btnBack={btnBack}
				btnAct={btnAct}
				text={text}
			></NavTopButton>
			<Row className='justify-content-center'>
				<Col xs='auto'>
					<TraineeList
						onClickDelTrainee={(id) => {
							onClickHandlerDelTrainee(id);
						}}
					></TraineeList>
				</Col>
			</Row>
		</AppFrame>
	);
};

TraineesPage.propTypes = {};

export default TraineesPage;
