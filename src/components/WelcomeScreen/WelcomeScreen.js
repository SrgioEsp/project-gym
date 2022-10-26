import React from 'react';
import PropTypes from 'prop-types';

const WelcomeScreen = ({ children }) => {
	return (
		<div>
			<p>WelcomeScreen</p>
			<div className='d-grid gap-2'>{children}</div>
		</div>
	);
};

WelcomeScreen.propTypes = {
	children: PropTypes.node,
};

export default WelcomeScreen;
