import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import { helpHttp } from './../../helpers/helpHttp';
import { urlUsers } from '../../api/urls';
import { AppContext } from '../../contexts/AppContext';
import { storage } from '../../storage';

const validate = (nombre, pass) => {
	if (nombre === '') return 'Introduzca usuario';
	if (pass === '') return 'Introduzca contraseña';
};

const login = async (data, navigate, setIsInvalid, setUsers, setUser) => {
	try {
		const res = await helpHttp().get(urlUsers);
		if (res) {
			const user = res.filter(
				(user) => user.name === data.nombre && user.password === data.pass
			);
			if (user.length !== 0) {
				setUser({ id: user[0].id, name: user[0].name });
				storage.set('user_session', { id: user[0].id, name: user[0].name });
				navigate('/home');
			} else {
				setIsInvalid(true);
				setUsers(res);
			}
		}
	} catch (error) {
		console.log(error);
	}
};

const LoginForm = (props) => {
	const { setUser } = useContext(AppContext);

	const [nombre, setNombre] = useState('');
	const [pass, setPass] = useState('');
	const [isInvalid, setIsInvalid] = useState(false);
	const [users, setUsers] = useState(null);
	const navigate = useNavigate();

	const errMsg = validate(nombre, pass);

	const onSubmitHandler = (ev) => {
		ev.preventDefault();
		if (users) {
			const user = users.filter(
				(user) => user.name === nombre && user.password === pass
			);
			if (user.length !== 0) {
				setUser({ id: user[0].id, name: user[0].name });
				storage.set('user_session', { id: user[0].id, name: user[0].name });
				navigate('/home');
			} else {
				setIsInvalid(true);
			}
		} else {
			login({ nombre, pass }, navigate, setIsInvalid, setUsers, setUser);
		}
	};

	validate(nombre, pass);

	return (
		<Container>
			<Row className='justify-content-center'>
				<Col xs='auto'>
					<Row className='justify-content-center'>
						<Col xs='auto'>
							<p className='text-danger'>{errMsg}</p>
							{isInvalid && <p className='text-danger'>Usuario Incorrecto</p>}
						</Col>
					</Row>
					<form onSubmit={onSubmitHandler}>
						<Row className='justify-content-center mt-3'>
							<Col xs='auto'>
								<input
									type='text'
									name='nombre'
									placeholder='Nombre de Usuario'
									autoComplete='off'
									value={nombre}
									onChange={(ev) => setNombre(ev.target.value)}
									onFocus={(ev) => {
										if (isInvalid) setIsInvalid(false);
									}}
								/>
							</Col>
						</Row>
						<Row className='justify-content-center mt-3'>
							<Col xs='auto'>
								<input
									type='password'
									name='pass'
									placeholder='Contraseña'
									value={pass}
									onChange={(ev) => setPass(ev.target.value)}
									onFocus={(ev) => {
										if (isInvalid) setIsInvalid(false);
									}}
								/>
							</Col>
						</Row>
						<Row className='justify-content-center mt-3'>
							<Col xs='auto'>
								<button type='submit' disabled={errMsg}>
									Iniciar sesión
								</button>
							</Col>
						</Row>
					</form>
				</Col>
			</Row>
		</Container>
	);
};

LoginForm.propTypes = {};

export default LoginForm;
