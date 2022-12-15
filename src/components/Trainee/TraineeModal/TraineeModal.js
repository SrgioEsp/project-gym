import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { AppContext } from '../../../contexts/AppContext';
import { removeWhiteSpaces } from '../../../utils';
import { createTrainee } from '../../../actions/TraineeActions';
import { Button, Col, Row } from 'react-bootstrap';

const emptyFields = (
	setName,
	setSurname,
	setBirthDate,
	setDni,
	setGender,
	setPermanenceMonths,
	setShowPermanenceField
) => {
	setName('');
	setSurname('');
	setBirthDate('');
	setDni('');
	setGender('');
	setPermanenceMonths(0);
	setShowPermanenceField(false);
};

const validate = (name, surname, gender) => {
	if (name === '' || surname === '' || gender === '') return true;
	return false;
};

const TraineeModal = () => {
	const { trainees, setTrainees, user } = useContext(AppContext);
	const [show, setShow] = useState(false);
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [dni, setDni] = useState('');
	const [gender, setGender] = useState('');
	const [permanenceMonths, setPermanenceMonths] = useState(0);
	const [showPermanenceField, setShowPermanenceField] = useState(false);

	const invalidData = validate(name, surname, gender);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const closeModal = () => {
		emptyFields(
			setName,
			setSurname,
			setBirthDate,
			setDni,
			setGender,
			setPermanenceMonths,
			setShowPermanenceField
		);
		handleClose();
	};

	const formControlClass = 'form-control';
	const formSelectClass = 'form-select';
	const fieldEmptyClass = 'form-field-empty';

	const onSubmitHandler = (ev) => {
		ev.preventDefault();
		if (!invalidData) {
			createTrainee(
				{
					name: removeWhiteSpaces(name),
					surname: removeWhiteSpaces(surname),
					birthDate,
					dni,
					gender,
					permanenceMonths,
				},
				user.token
			).then((res) => {
				if (res) {
					setTrainees([...trainees, res]);
					closeModal();
				}
			});
		} else {
			if (!name)
				ev.target.name.className = `${formControlClass} ${fieldEmptyClass}`;
			if (!surname)
				ev.target.surname.className = `${formControlClass} ${fieldEmptyClass}`;
			if (!gender)
				ev.target.gender.className = `${formSelectClass} ${fieldEmptyClass}`;
		}
	};

	return (
		<>
			<Button className='bbtn-r' variant='success' onClick={handleShow}>
				Añadir
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Crear Alumno</Modal.Title>
				</Modal.Header>
				<form onSubmit={onSubmitHandler}>
					<Modal.Body>
						<Row>
							<Col>
								<input
									className='form-control'
									type='text'
									name='name'
									placeholder='Nombre'
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
								<input
									className='form-control'
									type='text'
									name='surname'
									placeholder='Apellidos'
									autoComplete='off'
									value={surname}
									onChange={(ev) => {
										setSurname(ev.target.value);
										if (surname) ev.target.className = formControlClass;
									}}
									minLength='6'
								/>
							</Col>
						</Row>
						<Row className='my-3'>
							<Col>
								Fecha Nacimiento
								<input
									className='form-control'
									type={'date'}
									name='birthDate'
									autoComplete='off'
									value={birthDate}
									onChange={(ev) => setBirthDate(ev.target.value)}
								/>
							</Col>
						</Row>
						<Row className='my-3'>
							<Col>
								<input
									className='form-control'
									type='text'
									name='dni'
									placeholder='DNI ej: 12345678A'
									autoComplete='off'
									value={dni}
									onChange={(ev) => setDni(ev.target.value)}
									pattern='[0-9]{8}[A-Za-z]{1}'
								/>
							</Col>
						</Row>
						<Row className='my-3'>
							<Col>
								<select
									name='gender'
									defaultValue={gender}
									className='form-select'
									onChange={(ev) => {
										setGender(ev.target.value);
										ev.target.className = formSelectClass;
									}}
								>
									<option value={''} disabled>
										Género
									</option>
									<option value={'M'}>Masculino</option>;
									<option value={'F'}>Femenino</option>;
									<option value={'O'}>Otro</option>;
								</select>
							</Col>
						</Row>
						<Row>
							<Col>
								<input
									type={'checkbox'}
									checked={permanenceMonths !== 0}
									onChange={(ev) => {
										if (ev.target.checked) {
											setShowPermanenceField(true);
											setPermanenceMonths(3);
										} else {
											setShowPermanenceField(false);
											setPermanenceMonths(0);
										}
									}}
								/>{' '}
								Permanencia
							</Col>
						</Row>
						{showPermanenceField && (
							<Row>
								<Col>
									<input
										type='number'
										className='form-control inputPermanence'
										placeholder='Permanencia desde 3 a 12 meses'
										value={permanenceMonths}
										onChange={(ev) => setPermanenceMonths(ev.target.value)}
										min='3'
										max='12'
									/>
								</Col>
							</Row>
						)}
					</Modal.Body>
					<Modal.Footer>
						<Button className='bbtn-r' variant='secondary' onClick={closeModal}>
							Cerrar
						</Button>
						<Button className='bbtn-r' variant='primary' type={'submit'}>
							Guardar
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
};

TraineeModal.propTypes = {};

export default TraineeModal;
