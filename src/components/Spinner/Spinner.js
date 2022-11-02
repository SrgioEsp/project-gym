import React from 'react';
import PropTypes from 'prop-types';
import SpinnerBootstrap from 'react-bootstrap/Spinner';

const Spinner = (props) => {
	return (
		<SpinnerBootstrap animation='border' role='status'>
			<span className='visually-hidden'>Loading...</span>
		</SpinnerBootstrap>
	);
};

Spinner.propTypes = {};

export default Spinner;
