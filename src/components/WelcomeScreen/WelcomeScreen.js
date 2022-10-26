import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

const WelcomeScreen = (props) => {
	return (
		<div>
			<p>WelcomeScreen</p>
			<div className='d-grid gap-2'>
				<Link to={'/login'} className='btn btn-primary'>
					Entrar
				</Link>
			</div>
		</div>
	);
};

WelcomeScreen.propTypes = {};

export default WelcomeScreen;
