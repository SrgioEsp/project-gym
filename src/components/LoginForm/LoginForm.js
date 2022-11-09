import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { AppContext } from '../../contexts/AppContext';
import { storage } from '../../storage';
import { getLoginUser } from '../../actions/UserActions';

const validate = (name, password) => {
	if (name === '') return 'Introduzca usuario';
	if (password === '') return 'Introduzca contraseña';
};

const login = async (data, navigate, setIsInvalid, setUser) => {
	getLoginUser(data).then((res) => {
		if (res && res.id && res.name) {
			setUser(res);
			storage.set('user_session', res);
			navigate('/home');
		} else {
			setIsInvalid(true);
		}
	});
};

const LoginForm = (props) => {
	const { setUser } = useContext(AppContext);

	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [isInvalid, setIsInvalid] = useState(false);
	// const [users, setUsers] = useState(null);
	const navigate = useNavigate();

	const errMsg = validate(name, password);

	const onSubmitHandler = (ev) => {
		ev.preventDefault();
		login({ name, password }, navigate, setIsInvalid, setUser);
	};

	validate(name, password);

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
									name='name'
									placeholder='Nombre de Usuario'
									autoComplete='off'
									value={name}
									onChange={(ev) => setName(ev.target.value)}
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
									name='password'
									placeholder='Contraseña'
									value={password}
									onChange={(ev) => setPassword(ev.target.value)}
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
