import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../components/WelcomeScreen';
import { Link } from 'react-router-dom';

const WelcomePage = (props) => {
	return (
		<WelcomeScreen>
			<Link to={'/login'} className='btn btn-primary'>
				Entrar
			</Link>
		</WelcomeScreen>
	);
};

WelcomePage.propTypes = {};

export default WelcomePage;
