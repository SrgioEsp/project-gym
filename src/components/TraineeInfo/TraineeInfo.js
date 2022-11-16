import React from 'react';
import PropTypes from 'prop-types';

const TraineeInfo = ({ trainee }) => {
	const { name, date } = trainee;
	return (
		<div>
			<p>
				<b>{name}</b> {date}
			</p>
		</div>
	);
};

TraineeInfo.propTypes = {
	trainee: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default TraineeInfo;
