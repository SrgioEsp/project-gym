import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../TraineeInfo';
import { AppContext } from '../../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonXFill } from 'react-icons/bs';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';

const renderTrainee = (eventOnClickTrainee, trainee, navigate) => {
	return (
		<Card key={trainee.id} className='m-2 d-flex flex-row border border-0'>
			<Card.Header
				className='w-75 p-2 mx-2'
				onClick={() => navigate(`/trainees/${trainee.name}?id=${trainee.id}`)}
			>
				<TraineeInfo trainee={trainee}></TraineeInfo>
			</Card.Header>
			<Card.Body className='w-25 p-0'>
				<Button
					className='h-100 w-100'
					variant='secondary'
					size='sm'
					onClick={() => eventOnClickTrainee(trainee.id)}
				>
					Eliminar <BsFillPersonXFill></BsFillPersonXFill>
				</Button>
			</Card.Body>
		</Card>
	);
};

const TraineeList = ({ onClickTrainee }) => {
	const { trainees } = useContext(AppContext);
	const navigate = useNavigate();

	return (
		<div className='mt-3'>
			<Row>
				<Col>
					{trainees.length !== 0 ? (
						trainees.map((trainee) =>
							renderTrainee(onClickTrainee, trainee, navigate)
						)
					) : (
						<p className='text-danger'>No se han encontrado alumnos</p>
					)}
				</Col>
			</Row>
		</div>
	);
};

TraineeList.propTypes = {
	onClickTrainee: PropTypes.func.isRequired,
};

export default TraineeList;
