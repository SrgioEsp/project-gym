import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../TraineeInfo';
import { AppContext } from '../../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonXFill } from 'react-icons/bs';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';

const renderTrainee = (onClickDelTrainee, trainee, navigate) => {
	return (
		<Card key={trainee.id} className='cardAlumDel'>
			<Card.Header
				onClick={() => navigate(`/trainees/${trainee.name}?id=${trainee.id}`)}
			>
				<TraineeInfo trainee={trainee}></TraineeInfo>
			</Card.Header>
			<Card.Body>
				<Button
					className='h-100 w-100 btnDelAlum'
					size='sm'
					onClick={() => onClickDelTrainee(trainee.id)}
				>
					Eliminar <BsFillPersonXFill></BsFillPersonXFill>
				</Button>
			</Card.Body>
		</Card>
	);
};

const TraineeList = ({ onClickDelTrainee }) => {
	const { trainees } = useContext(AppContext);
	const navigate = useNavigate();

	return (
		<div className='mt-3'>
			<Row>
				<Col className='trainee-list-Container'>
					{trainees.length !== 0 ? (
						trainees.map((trainee) =>
							renderTrainee(onClickDelTrainee, trainee, navigate)
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
	onClickDelTrainee: PropTypes.func.isRequired,
};

export default TraineeList;
