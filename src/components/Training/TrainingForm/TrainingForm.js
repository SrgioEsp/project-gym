import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../../contexts/AppContext';
import { removeWhiteSpaces } from '../../../utils';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import MultiSelect from '../../MultiSelect/MultiSelect';
import { createTraining } from '../../../actions/TrainingActions';

const emptyFields = (
	setName,
	setExercise,
	setExercises,
	setDropdownIdSession
) => {
	setName('');
	setExercise('');
	setExercises([]);
	setDropdownIdSession([]);
};

const renderExercise = (exercise, onClickHandlerRemoveExercise) => {
	return (
		<tr key={exercise}>
			<td>{exercise}</td>
			<td>
				{RiDeleteBin2Fill ? (
					<RiDeleteBin2Fill
						onClick={() => onClickHandlerRemoveExercise(exercise)}
					></RiDeleteBin2Fill>
				) : (
					<Button
						variant='danger'
						onClick={() => onClickHandlerRemoveExercise(exercise)}
					>
						-
					</Button>
				)}
			</td>
		</tr>
	);
};

const validate = (name) => {
	if (name === '') return true;
	return false;
};

const TrainingForm = ({
	handleUpdateTrainingSession,
	onClickHandlerDelTrainingSession,
	setShowModal,
	trainingSession,
}) => {
	const { user, sessions, training, setTraining } = useContext(AppContext);
	const [exercise, setExercise] = useState('');
	const [exercises, setExercises] = useState(trainingSession?.exercises || []);
	const [name, setName] = useState(
		(trainingSession && trainingSession.name) || ''
	);
	const [dropdownIdSession, setDropdownIdSession] = useState(
		trainingSession?.sessions ? trainingSession.sessions : []
	);

	const invalidData = validate(removeWhiteSpaces(name));

	const closeModal = () => {
		if (!training) {
			emptyFields(setName, setExercise, setExercises, setDropdownIdSession);
		}
		setShowModal(false);
	};

	const onClickHandlerRemoveExercise = (exercise) => {
		const exercisesWithoutExercise = exercises.filter((e) => e !== exercise);
		setExercises(exercisesWithoutExercise);
	};

	const formControlClass = 'form-control';
	const fieldEmptyClass = 'form-field-empty';

	const onSubmitHandler = (ev) => {
		ev.preventDefault();
		if (!invalidData) {
			const body = {
				user: user.id,
				name: removeWhiteSpaces(name),
				sessions: dropdownIdSession,
				exercises,
			};
			if (trainingSession) {
				handleUpdateTrainingSession(trainingSession.id, body);
			} else {
				createTraining(body, user.token).then((res) => {
					setTraining([...training, res]);
					closeModal();
				});
			}
		} else {
			if (!removeWhiteSpaces(name))
				ev.target.name.className = `${formControlClass} ${fieldEmptyClass}`;
		}
	};

	return (
		<>
			<form onSubmit={onSubmitHandler}>
				<Row>
					<Col>
						<input
							className='form-control'
							type='text'
							name='name'
							placeholder='Entrenamiento'
							autoComplete='off'
							value={name}
							onChange={(ev) => {
								setName(ev.target.value);
								if (name) ev.target.className = formControlClass;
							}}
							minLength='3'
						/>
					</Col>
				</Row>
				<Row className='my-3'>
					<Col>
						<MultiSelect
							state={dropdownIdSession}
							setState={setDropdownIdSession}
							arrayValues={sessions}
							textDropdown={'Sesiones'}
						></MultiSelect>
					</Col>
					<Col>
						<span
							style={dropdownIdSession.length === 0 ? { color: 'red' } : {}}
						>
							{dropdownIdSession.length === 0
								? 'Ninguna sesión seleccionada'
								: sessions
										.filter((session) => dropdownIdSession.includes(session.id))
										.map((session) => ` -${session.name}`)}
						</span>
					</Col>
				</Row>
				<Row>
					<Col>
						<input
							className='form-control'
							type='text'
							name='exercise'
							placeholder='Ejercicio'
							autoComplete='off'
							value={exercise}
							onChange={(ev) => setExercise(ev.target.value)}
						/>
					</Col>
					<Col>
						<Button
							variant='success'
							onClick={() => {
								if (removeWhiteSpaces(exercise)) {
									setExercise('');
									setExercises([...exercises, exercise]);
								}
							}}
						>
							Añadir
						</Button>
					</Col>
				</Row>
				<Row>
					<Col xs='auto' className='mt-3 w-100'>
						<Table>
							<thead>
								<tr>
									<th>{`Ejercicios (${exercises.length})`}</th>
								</tr>
							</thead>
							<tbody>
								{exercises.length !== 0 &&
									exercises.map((exercise) =>
										renderExercise(exercise, onClickHandlerRemoveExercise)
									)}
							</tbody>
						</Table>
						<span className='m-2'>
							{exercises.length === 0 ? '*No hay ningún ejercicio' : ''}
						</span>
					</Col>
				</Row>
				<Row className='justify-content-end mt-4'>
					{trainingSession && (
						<Col xs='auto'>
							<Button
								className='bbtn-r'
								variant='danger'
								onClick={() => {
									setShowModal(false);
									onClickHandlerDelTrainingSession(trainingSession.id);
								}}
							>
								Eliminar
							</Button>
						</Col>
					)}
					<Col xs='auto'>
						<Button className='bbtn-r' type='submit'>
							Guardar
						</Button>
					</Col>
				</Row>
			</form>
		</>
	);
};

TrainingForm.propTypes = {
	handleUpdateTrainingSession: PropTypes.func,
	onClickHandlerDelTrainingSession: PropTypes.func,
	setShowModal: PropTypes.func,
	trainingSession: PropTypes.object,
};

export default TrainingForm;
