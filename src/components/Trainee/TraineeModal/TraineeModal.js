import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../../contexts/AppContext';
import { Button, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { createTrainee } from '../../../actions/TraineeActions';

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

	const onSubmitHandler = (ev) => {
		ev.preventDefault();
		if (!!name && !!surname && !!birthDate && !!dni && !!gender) {
			createTrainee(
				{
					name,
					surname,
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
									onChange={(ev) => setName(ev.target.value)}
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
									}}
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
									placeholder='DNI'
									autoComplete='off'
									value={dni}
									onChange={(ev) => setDni(ev.target.value)}
								/>
							</Col>
						</Row>
						<Row className='my-3'>
							<Col>
								<select
									defaultValue={gender}
									className='form-select'
									onChange={(ev) => setGender(ev.target.value)}
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
