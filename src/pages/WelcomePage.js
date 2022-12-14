import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../components/WelcomeScreen';
import { storage } from './../storage';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const WelcomePage = (props) => {
	const navigate = useNavigate();
	
	const redirect = () => {
		const route = storage.get('user_session') ? '/home' : '/login';
		navigate(route);
	};
	return (
		<Container className='welcomePage' onClick={redirect}>
			<WelcomeScreen>
				<Row className='welcomeRow welcome-row-top'></Row>
				<Row className='welcomeRow welcome-row-center'></Row>
				<Row className='welcomeRow welcome-row-bottom'></Row>
			</WelcomeScreen>
		</Container>
	);
};

WelcomePage.propTypes = {};

export default WelcomePage;
