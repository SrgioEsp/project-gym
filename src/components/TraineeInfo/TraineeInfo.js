import React from 'react';
import PropTypes from 'prop-types';

const TraineeInfo = ({ trainee, children }) => {
	const { name, date } = trainee;
	return (
		<div>
			<p className='h5'>
				{name} {children}
			</p>
			<p>{date}</p>
		</div>
	);
};

TraineeInfo.propTypes = {
	trainee: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default TraineeInfo;
