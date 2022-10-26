import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginForm = (props) => {
	return (
		<div>
			<p>LoginForm</p>
			<Form>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Usuario</Form.Label>
					<Form.Control type='email' placeholder='Usuario' />
					<Form.Text className='text-muted'></Form.Text>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Contraseña</Form.Label>
					<Form.Control type='password' placeholder='Contraseña' />
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicCheckbox'>
					<Form.Check type='checkbox' label='recordar usuario' />
				</Form.Group>
				<Button href='/home' variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</div>
	);
};

LoginForm.propTypes = {};

export default LoginForm;
