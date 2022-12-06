import React from 'react';
import PropTypes from 'prop-types';

const SessionTableInfo = ({ weekday }) => {
	return (
		<>
			<td>
				<span>{weekday.day}</span>
			</td>
			<td>
				<span>{weekday.startTime}</span>
			</td>
			<td>
				<span>{weekday.endTime}</span>
			</td>
		</>
	);
};

SessionTableInfo.propTypes = {
	weekday: PropTypes.any,
};

export default SessionTableInfo;
