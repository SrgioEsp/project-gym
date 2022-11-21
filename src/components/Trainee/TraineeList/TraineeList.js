import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../TraineeInfo';
import { AppContext } from '../../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonXFill } from 'react-icons/bs';
import { Button, Col, Row } from 'react-bootstrap';

const renderTrainee = (eventOnClickTrainee, trainee, navigate) => {
	return (
		<Row key={trainee.id}>
			<Col>
				<li
					onClick={() => navigate(`/trainees/${trainee.name}?id=${trainee.id}`)}
				>
					<TraineeInfo trainee={trainee}></TraineeInfo>
				</li>
			</Col>
			<Col xs='auto'>
				<Button
					variant='danger'
					size='sm'
					onClick={() => eventOnClickTrainee(trainee.id)}
				>
					Eliminar <BsFillPersonXFill></BsFillPersonXFill>
				</Button>
			</Col>
		</Row>
	);
};

const TraineeList = ({ onClickTrainee }) => {
	const { trainees } = useContext(AppContext);
	const navigate = useNavigate();

	return (
		<div className='mt-3'>
			<Row>
				<Col>
					<ul>
						{trainees.length !== 0 ? (
							trainees.map((trainee) =>
								renderTrainee(onClickTrainee, trainee, navigate)
							)
						) : (
							<p className='text-danger'>No se han encontrado alumnos</p>
						)}
					</ul>
				</Col>
			</Row>
		</div>
	);
};

TraineeList.propTypes = {
	onClickTrainee: PropTypes.func.isRequired,
};

export default TraineeList;
