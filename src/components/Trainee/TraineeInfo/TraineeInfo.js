import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const TraineeInfo = ({ trainee }) => {
	return (
		<div>
			<p>
				<b>
					{trainee.name} {trainee.surname}
				</b>
			</p>
		</div>
	);
};

TraineeInfo.propTypes = {
	trainee: PropTypes.object.isRequired,
};

export default TraineeInfo;
