import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap';
import { createTrainee } from '../../actions/TraineeActions';
import { formatDate, inputDateFormat } from '../../utils';
import { AppContext } from '../../contexts/AppContext';

const emptyFields = (setName, setfechaEntrada, ev) => {
	setName('');
	setfechaEntrada('');
	ev.target.edad.value = '';
	ev.target.peso.value = '';
	ev.target.altura.value = '';
};

const validate = (nombre, fechaEntrada) => {
	if (nombre === '') return 'Introduzca un nombre';
	if (!fechaEntrada) return 'Introduzca una fecha';
};

const TraineeForm = ({ trainee, setTrainee }) => {
	const { trainees, setTrainees, user } = useContext(AppContext);
	const [name, setName] = useState('');
	const [fechaEntrada, setfechaEntrada] = useState('');
	const [msgAdd, setMsgAdd] = useState(null);

	const delMsg = () => {
		setTimeout(() => {
			setMsgAdd(null);
		}, 3000);
	};
	const errMsg = validate(name, fechaEntrada);

	const onSubmitHandler = (ev) => {
		ev.preventDefault();
		const date = formatDate(new Date(fechaEntrada));
		const edad = ev.target.edad.value;
		const peso = ev.target.peso.value;
		const altura = ev.target.altura.value;
		if (!trainee) {
			createTrainee({
				name,
				date,
				edad,
				peso,
				altura,
				userId: user.id,
			}).then((res) => {
				setTrainees([...trainees, res]);
				setMsgAdd('Alumno creado correctamente');
				emptyFields(setName, setfechaEntrada, ev);
			});
		}
	};

	return (
		<form onSubmit={onSubmitHandler}>
			<Row className='justify-content-center'>
				<Col xs='auto'>
					<p className='text-danger'>{errMsg}</p>
					{msgAdd && <p className='bg-success text-white'>{msgAdd}</p>}
					{delMsg()}
				</Col>
			</Row>
			<Row>
				<Col>
					<input
						type='text'
						name='nombre'
						placeholder='Nombre Alumno'
						autoComplete='off'
						value={trainee ? trainee.name : name}
						onChange={(ev) => {
							setName(ev.target.value);
						}}
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<input
						type='date'
						name='fechaEntrada'
						value={trainee ? inputDateFormat(trainee.date) : fechaEntrada}
						onChange={(ev) => {
							setfechaEntrada(ev.target.value);
						}}
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<input
						type={'number'}
						name='edad'
						autoComplete='off'
						placeholder='Edad'
						value={trainee ? trainee.edad : ''}
						onChange={(ev) => {}}
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<input
						type={'number'}
						name='peso'
						autoComplete='off'
						placeholder='Peso'
						value={trainee ? trainee.peso : ''}
						onChange={(ev) => {}}
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<input
						type={'number'}
						name='altura'
						autoComplete='off'
						placeholder='Altura'
						value={trainee ? trainee.altura : ''}
						onChange={(ev) => {}}
					/>
				</Col>
			</Row>
			<Row>
				<Col xs='auto'>
					<Button type='submit' disabled={errMsg} variant='success' size='sm'>
						{trainee ? 'Editar' : 'Añadir'}
					</Button>
					{!trainee && (
						<Button
							type='reset'
							variant='danger'
							size='sm'
							onClick={() => {
								setName('');
								setfechaEntrada('');
							}}
						>
							Cancelar
						</Button>
					)}
				</Col>
			</Row>
		</form>
	);
};

TraineeForm.propTypes = {
	trainee: PropTypes.any,
	setTrainee: PropTypes.func,
};

export default TraineeForm;
