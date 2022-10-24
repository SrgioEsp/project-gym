import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

const WelcomeScreen = (props) => {
	return (
		<div>
			WelcomeScreen
			<div className='d-grid gap-2'>
				<Button href='#' variant='primary' size='lg'>
					Entrar
				</Button>
			</div>
		</div>
	);
};

WelcomeScreen.propTypes = {};

export default WelcomeScreen;
