import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import TraineeList from '../components/Trainee/TraineeList';
import { AppContext } from '../contexts/AppContext';
import { delTrainee } from '../actions/TraineeActions';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import TraineeModal from '../components/Trainee/TraineeModal/TraineeModal';
import NavTopButton from '../components/NavTopButton/NavTopButton';
import ModalAction from '../components/Modals/ModalAction';

const TraineesPage = () => {
	const { trainees, setTrainees, user, setUser } = useContext(AppContext);
	const [show, setShow] = useState(false);
	const [idTrainee, setIdTrainee] = useState('');

	useEffect(() => {
		if (!trainees || trainees.length === 0) {
			if (user.trainees && user.trainees.length !== 0) {
				setTrainees(user.trainees);
			}
		}
	}, []);

	const handleClose = () => setShow(false);

	const onClickHandlerDelTrainee = (id) => {
		delTrainee(id, user.token).then((res) => {
			const newData = trainees.filter((trainee) => trainee.id !== id);
			user.trainees = newData;
			setUser(user);
			setTrainees(newData);
		});
		handleClose();
	};

	const btnBack = (
		<Link to={'/home'} className='btn btn-primary bbtn-r'>
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
							setIdTrainee(id);
							setShow(true);
						}}
					></TraineeList>
				</Col>
			</Row>
			<ModalAction
				showModal={show}
				handlerCloseModal={handleClose}
				modalTitle='Cuidado!'
				modalBody={'¿Desea eliminar el alumno?'}
				modalFooter={
					<>
						{' '}
						<Button
							className='bbtn-r'
							variant='secondary'
							onClick={handleClose}
						>
							Cancelar
						</Button>
						<Button
							className='bbtn-r'
							variant='primary'
							onClick={() => onClickHandlerDelTrainee(idTrainee)}
						>
							Aceptar
						</Button>
					</>
				}
			></ModalAction>
		</AppFrame>
	);
};

TraineesPage.propTypes = {};

export default TraineesPage;
