import React from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { Row, Col } from 'react-bootstrap';
import TraineeList from '../components/TraineeList/TraineeList';
import { Link } from 'react-router-dom';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import Spinner from '../components/Spinner';
import { delTrainee } from '../actions/TraineeActions';

const TraineesPage = ({ trainees, setTrainees, spinner }) => {
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
							trainees={trainees}
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
	trainees: PropTypes.array.isRequired,
	setTrainees: PropTypes.func,
	spinner: PropTypes.bool.isRequired,
};

export default TraineesPage;
