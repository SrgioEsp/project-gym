import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { Row, Col } from 'react-bootstrap';
import TraineeList from '../components/TraineeList/TraineeList';
import { Link } from 'react-router-dom';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import Spinner from '../components/Spinner';
import { delTrainee } from '../actions/TraineeActions';
import { AppContext } from '../contexts/AppContext';
import { getTraineesByUserId } from '../actions/TraineesActions';

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
			delTrainee(id, trainees, setTrainees).then((res) => {
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
	setLoading: PropTypes.func.isRequired,
};

export default TraineesPage;
