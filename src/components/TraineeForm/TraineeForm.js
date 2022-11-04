import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap';
import { createMockTrainee } from '../../actions/TraineeActions';
import { formatDate } from '../../utils';

const validate = (nombre, fechaEntrada) => {
	if (nombre === '') return 'Introduzca un nombre';
	if (!fechaEntrada) return 'Introduzca una fecha';
};

const TraineeForm = ({ trainees, setTrainees }) => {
	const [name, setName] = useState('');
	const [fechaEntrada, setfechaEntrada] = useState('');

	const errMsg = validate(name, fechaEntrada);

	const onSubmitHandler = (ev) => {
		ev.preventDefault();
		const date = formatDate(new Date(fechaEntrada));
		const edad = ev.target.edad.value;
		const peso = ev.target.peso.value;
		const altura = ev.target.altura.value;
		const result = createMockTrainee(
			{
				name,
				date,
				edad,
				peso,
				altura,
			},
			trainees,
			setTrainees
		);
		console.log(result);
	};

	return (
		<form onSubmit={onSubmitHandler}>
			<Row className='justify-content-center'>
				<Col xs='auto'>
					<p className='text-danger'>{errMsg}</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<input
						type='text'
						name='nombre'
						placeholder='Nombre Alumno'
						autoComplete='off'
						value={name}
						onChange={(ev) => setName(ev.target.value)}
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<input
						type='date'
						name='fechaEntrada'
						value={fechaEntrada}
						onChange={(ev) => setfechaEntrada(ev.target.value)}
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
					/>
				</Col>
			</Row>
			<Row>
				<Col xs='auto'>
					<Button type='submit' disabled={errMsg} variant='success' size='sm'>
						Añadir
					</Button>
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
				</Col>
			</Row>
		</form>
	);
};

TraineeForm.propTypes = {
	trainees: PropTypes.array.isRequired,
	setTrainees: PropTypes.func.isRequired,
};

export default TraineeForm;
