import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../TraineeInfo';
import { AppContext } from '../../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonXFill } from 'react-icons/bs';
import { Col, Row } from 'react-bootstrap';
import TraineeShow from '../TraineeShow/TraineeShow';

const renderTrainee = (onClickDelTrainee, trainee, navigate) => {
	const delBtn = (
		<button
			className='btnDelAlum'
			size='sm'
			onClick={() => onClickDelTrainee(trainee.id)}
		>
			Eliminar <BsFillPersonXFill></BsFillPersonXFill>
		</button>
	);
	return (
		<TraineeShow
			key={trainee.id}
			delBtn={delBtn}
			width={'container-trainee-show-full'}
		>
			<TraineeInfo
				trainee={trainee}
				onClickHandler={() =>
					navigate(`/trainees/${trainee.name}?id=${trainee.id}`)
				}
			></TraineeInfo>
		</TraineeShow>
	);
};

const TraineeList = ({ onClickDelTrainee }) => {
	const { trainees } = useContext(AppContext);
	const navigate = useNavigate();

	return (
		<div className='mt-3'>
			<Row>
				<Col className='trainee-list-container'>
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
