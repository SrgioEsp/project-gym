import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../contexts/AppContext';
import { getLoginUser } from '../../actions/UserActions';
import { storage } from '../../storage';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { removeWhiteSpaces } from '../../utils';

const validate = (name, password) => {
	if (name === '') return 'Introduzca usuario';
	if (password === '') return 'Introduzca contraseña';
};

const login = (data, navigate, setIsInvalid, setUser) => {
	getLoginUser(data).then((res) => {
		if (res && res.id && res.name) {
			setUser(res);
			storage.set('user_session', {
				id: res.id,
				token: res.token,
			});
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
	const navigate = useNavigate();

	const invalidData = validate(name, password);

	const onSubmitHandler = (ev) => {
		ev.preventDefault();
		login(
			{ name: removeWhiteSpaces(name), password },
			navigate,
			setIsInvalid,
			setUser
		);
	};

	const formControlClass = 'form-control';

	validate(name, password);

	return (
		<Container className='loginForm'>
			<Row className='justify-content-center'>
				<Col xs='auto'>
					<form onSubmit={onSubmitHandler}>
						<Row className='justify-content-center mt-3'>
							<Col xs='auto'>
								<input
									className={formControlClass}
									type='text'
									placeholder='Nombre de Usuario'
									autoComplete='on'
									value={name}
									onChange={(ev) => {
										setName(ev.target.value);
										if (name) ev.target.className = formControlClass;
									}}
									onFocus={(ev) => {
										if (isInvalid) setIsInvalid(false);
									}}
									onBlur={(ev) => {
										if (!name)
											ev.target.className =
												formControlClass + ' login-field-empty';
									}}
								/>
							</Col>
						</Row>
						<Row className='justify-content-center mt-3'>
							<Col xs='auto'>
								<input
									className='form-control'
									type='password'
									placeholder='Contraseña'
									autoComplete='on'
									value={password}
									onChange={(ev) => {
										setPassword(ev.target.value);
										if (password) ev.target.className = formControlClass;
									}}
									onFocus={(ev) => {
										if (isInvalid) setIsInvalid(false);
									}}
									onBlur={(ev) => {
										if (!password)
											ev.target.className =
												formControlClass + ' login-field-empty';
									}}
								/>
							</Col>
						</Row>
						<Row className='login-error-row'>
							{isInvalid && <span>usuario o contraseña incorrecto</span>}
						</Row>
						<Row className='justify-content-center mt-3'>
							<Col>
								<Button
									className='buttonLogin'
									type='submit'
									disabled={invalidData}
								>
									Iniciar sesión
								</Button>
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
