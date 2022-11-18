import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../components/WelcomeScreen';
import { storage } from './../storage';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

const WelcomePage = (props) => {
	return (
		<Container>
			<Row>
				<Col>
					<WelcomeScreen>
						<Link
							to={storage.get('user_session') ? '/home' : '/login'}
							className='btn btn-primary'
						>
							Entrar
						</Link>
					</WelcomeScreen>
				</Col>
			</Row>
		</Container>
	);
};

WelcomePage.propTypes = {};

export default WelcomePage;
