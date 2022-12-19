import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalAction from '../../Modals/ModalAction';
import { AppContext } from '../../../contexts/AppContext';
import { updateTrainee } from '../../../actions/TraineeActions';
import { formatDate, inputDateFormat, removeWhiteSpaces } from '../../../utils';
import { Button, Col, Row } from 'react-bootstrap';

const validate = (name, surname, gender, entryDate) => {
	if (name === '' || surname === '' || gender === '' || entryDate === '')
		return true;
	return false;
};

const TraineeForm = ({ trainee, setTrainee }) => {
	const { trainees, setTrainees, user } = useContext(AppContext);
	const [name, setName] = useState(trainee?.name || '');
	const [surname, setSurname] = useState(trainee?.surname || '');
	const [birthDate, setBirthDate] = useState(trainee?.birthDate || '');
	const [dni, setDni] = useState(trainee?.dni || '');
	const [gender, setGender] = useState(trainee?.gender || '');
	const [weight, setWeight] = useState(trainee?.weight || '');
	const [height, setHeight] = useState(trainee?.height || '');
	const [entryDate, setEntryDate] = useState(
		inputDateFormat(formatDate(new Date(trainee?.entryDate))) || ''
	);
	const [months, setMonths] = useState(trainee?.permanence?.months || 0);
	const [activationDate, setActivationDate] = useState(
		trainee?.permanence?.activationDate
			? inputDateFormat(
					formatDate(new Date(trainee?.permanence?.activationDate))
			  )
			: ''
	);
	const [expiryDate, setExpiryDate] = useState(
		trainee?.permanence?.expiryDate
			? inputDateFormat(formatDate(new Date(trainee?.permanence?.expiryDate)))
			: ''
	);
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (!months || months < 3) {
			setActivationDate('');
			setExpiryDate('');
		} else {
			setActivationDate(inputDateFormat(formatDate(new Date())));
			setExpiryDate(
				inputDateFormat(
					formatDate(
						new Date(
							new Date().setMonth(new Date().getMonth() + Number(months))
						)
					)
				)
			);
		}
	}, [months, setActivationDate, setExpiryDate]);

	const invalidData = validate(name, surname, gender, entryDate);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const formControlClass = 'form-control';
	const formSelectClass = 'form-select';
	const fieldEmptyClass = 'form-field-empty';

	const onSubmitHandler = (ev) => {
		ev.preventDefault();
		if (trainee) {
			if (!invalidData) {
				handleShow();
			} else {
				if (!name)
					ev.target.name.className = `${formControlClass} ${fieldEmptyClass}`;
				if (!surname)
					ev.target.surname.className = `${formControlClass} ${fieldEmptyClass}`;
				if (!gender)
					ev.target.gender.className = `${formSelectClass} ${fieldEmptyClass}`;
				if (!entryDate)
					ev.target.entryDate.className = `${formControlClass} ${fieldEmptyClass}`;
			}
		}
	};

	const handleUpdateTrainee = () => {
		const body = {
			name: removeWhiteSpaces(name),
			surname: removeWhiteSpaces(surname),
			birthDate,
			dni,
			gender,
			weight,
			height,
			permanenceMonths: Number(months),
		};
		updateTrainee(trainee.id, body, user.token).then((res) => {
			const trainneIndex = trainees.findIndex(
				(trainee) => trainee.id === res.id
			);
			trainees[trainneIndex] = res;
			setTrainees(trainees);
			handleClose();
		});
	};

	validate(name, surname, gender, entryDate);

	return (
		<>
			<form onSubmit={onSubmitHandler}>
				<Row>
					<Col>
						Nombre
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
						Apellidos
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
							minLength='3'
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
						DNI
						<input
							className='form-control'
							type='text'
							name='dni'
							placeholder='DNI'
							autoComplete='off'
							value={dni}
							onChange={(ev) => setDni(ev.target.value)}
							pattern='[0-9]{8}[A-Za-z]{1}'
						/>
					</Col>
				</Row>
				<Row className='my-3'>
					<Col>
						Género
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

				<hr />

				<Row className='my-3'>
					<Col>
						<div className='d-flex'>
							<div className='input-group'>
								<input
									className='form-control w-50'
									type={'number'}
									name='weight'
									placeholder='Peso'
									autoComplete='off'
									value={weight}
									onChange={(ev) => setWeight(ev.target.value)}
								/>
								<span className='input-group-text' id='inputGroupPrepend'>
									Kg
								</span>
							</div>
							<div className='input-group'>
								<input
									className='form-control w-50'
									type={'number'}
									name='height'
									placeholder='Altura'
									autoComplete='off'
									value={height}
									onChange={(ev) => setHeight(ev.target.value)}
								/>
								<span className='input-group-text' id='inputGroupPrepend'>
									cm
								</span>
							</div>
						</div>
					</Col>
				</Row>

				<hr />

				<Row className='my-3'>
					<Col>
						Fecha Incorporación
						<input
							className='form-control'
							type={'date'}
							name='entryDate'
							autoComplete='off'
							value={entryDate}
							onChange={(ev) => {
								setEntryDate(ev.target.value);
								ev.target.className = formControlClass;
							}}
						/>
					</Col>
				</Row>

				<Row className='my-3'>
					<Col>
						Fecha Permanencia
						<div className='d-flex'>
							<input
								className='form-control w-25'
								type={'number'}
								name='months'
								placeholder='Meses'
								autoComplete='off'
								value={months}
								onChange={(ev) => setMonths(ev.target.value)}
								max='12'
							/>
							<input
								className='form-control w-75'
								type={'date'}
								name='activationDate'
								autoComplete='off'
								value={activationDate}
								onChange={(ev) => setActivationDate(ev.target.value)}
								disabled
							/>
						</div>
					</Col>
				</Row>
				<Row className='my-3'>
					<Col>
						Fecha Expiración
						<input
							className='form-control'
							type={'date'}
							name='expiryDate'
							autoComplete='off'
							value={expiryDate}
							onChange={(ev) => setExpiryDate(ev.target.value)}
							disabled
						/>
					</Col>
				</Row>

				<hr />

				<Row className='my-3'>
					<Col>
						<span>Entrenador Seleccionado: </span>
						<input
							className='form-control'
							type={'text'}
							value={`${user.name}`}
							onChange={(ev) => {}}
							disabled
						/>
						<Button className='mt-1 bbtn-r' variant='danger' size='sm'>
							Cambiar
						</Button>
					</Col>
				</Row>

				<Button className='w-100 my-3 bbtn-r' variant='primary' type={'submit'}>
					Actualizar
				</Button>
			</form>
			<ModalAction
				showModal={show}
				handlerCloseModal={handleClose}
				modalTitle={'Cuidado!'}
				modalBody={'¿Seguro que quieres realizar cambios?'}
				modalFooter={
					<>
						{' '}
						<Button
							className='bbtn-r'
							variant='secondary'
							onClick={handleClose}
						>
							Cancelar
						</Button>
						<Button
							className='bbtn-r'
							variant='primary'
							onClick={handleUpdateTrainee}
						>
							Aceptar
						</Button>
					</>
				}
			></ModalAction>
		</>
	);
};

TraineeForm.propTypes = {
	trainee: PropTypes.any,
	setTrainee: PropTypes.func,
};

export default TraineeForm;
