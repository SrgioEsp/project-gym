import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import { Container, Row, Col } from 'react-bootstrap';
import logo from './../assets/img/moverte.jpg';

const LoginPage = (props) => {
	return (
		<Container className='loginPage'>
			<Row className='logoContainer'>
				<Col>
					<img src={logo} alt={'logo'} />
				</Col>
			</Row>
			<Row className='loginContainer'>
				<Col>
					<LoginForm></LoginForm>
				</Col>
			</Row>
		</Container>
	);
};

LoginPage.propTypes = {};

export default LoginPage;
