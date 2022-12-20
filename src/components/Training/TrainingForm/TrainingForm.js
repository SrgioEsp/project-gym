import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../../contexts/AppContext';
import { removeWhiteSpaces } from '../../../utils';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import MultiSelect from '../../MultiSelect/MultiSelect';

const emptyFields = () => {};

const validate = (name) => {
	return false;
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

const TrainingForm = ({
	onClickHandlerDelTraining,
	onClickHandlerUpdateTraining,
	setShowModal,
	training,
	setTraining,
	trainingSession,
}) => {
	const { user, sessions } = useContext(AppContext);
	const [name, setName] = useState(
		(trainingSession && trainingSession.name) || ''
	);
	const [dropdownIdSession, setDropdownIdSession] = useState([]);
	const [exercise, setExercise] = useState('');
	const [exercises, setExercises] = useState(
		(trainingSession && trainingSession.exercises) || []
	);

	const invalidData = validate(name);

	const closeModal = () => {};

	const onClickHandlerRemoveExercise = (exercise) => {
		const exercisesWithoutExercise = exercises.filter((e) => e !== exercise);
		setExercises(exercisesWithoutExercise);
	};

	const formControlClass = 'form-control';
	const fieldEmptyClass = 'form-field-empty';

	const onSubmitHandler = (ev) => {
		ev.preventDefault();
		if (!invalidData) {
			setTraining([
				...training,
				{
					id: Math.random(),
					name,
					exercises,
				},
			]);
		} else {
			if (!name)
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
								setExercise('');
								setExercises([...exercises, exercise]);
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
	onClickHandlerDelTraining: PropTypes.func,
	onClickHandlerUpdateTraining: PropTypes.func,
	setShowModal: PropTypes.func,
	training: PropTypes.array,
	setTraining: PropTypes.func,
	trainingSession: PropTypes.object,
};

export default TrainingForm;
