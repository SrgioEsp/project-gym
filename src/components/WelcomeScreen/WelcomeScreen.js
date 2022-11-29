import React from 'react';
import PropTypes from 'prop-types';

const WelcomeScreen = ({ children }) => {
	return (
		<div>
			<div className='welcomeScreen'>{children}</div>
		</div>
	);
};

WelcomeScreen.propTypes = {
	children: PropTypes.node,
};

export default WelcomeScreen;
