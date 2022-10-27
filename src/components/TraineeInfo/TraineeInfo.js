import React from 'react';
import PropTypes from 'prop-types';

const TraineeInfo = ({ trainee }) => {
	return (
		<div>
			<p className='h5'>{trainee}</p>
		</div>
	);
};

TraineeInfo.propTypes = {
	trainee: PropTypes.string.isRequired,
};

export default TraineeInfo;
