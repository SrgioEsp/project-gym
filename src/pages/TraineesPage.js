import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { Row, Col } from 'react-bootstrap';
import TraineeList from '../components/TraineeList/TraineeList';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import Spinner from '../components/Spinner';
import { delTrainee } from '../actions/TraineeActions';
import { AppContext } from '../contexts/AppContext';

const TraineesPage = ({ spinner }) => {
	const { trainees, setTrainees } = useContext(AppContext);
	const navigate = useNavigate();

	// You should call navigate() in a React.useEffect(), not when your component is first rendered.
	// useEffect(() => {
	// 	if (!trainees || trainees.length === 0) navigate('/home');
	// }, []);

	const onClickHandlerDelTrainee = (id) => {
		const msj = confirm('Desea eliminar el alumno');
		if (msj) delTrainee(id, trainees, setTrainees);
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
					<Link to='/trainees/new' className='btn btn-success'>
						Añadir <BsFillPersonPlusFill></BsFillPersonPlusFill>
					</Link>
				</Col>
			</Row>
			<Row>
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
};

export default TraineesPage;
