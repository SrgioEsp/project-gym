import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import { Container, Row, Col } from 'react-bootstrap';

const LoginPage = (props) => {
	return (
		<Container>
			<Row>
				<Col>
					<LoginForm></LoginForm>
				</Col>
			</Row>
		</Container>
	);
};

LoginPage.propTypes = {};

export default LoginPage;
