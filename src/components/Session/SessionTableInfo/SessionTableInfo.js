import React from 'react';
import PropTypes from 'prop-types';

const SessionTableInfo = ({ session }) => {
	return (
		<>
			<td>
				<input
					className='form-control'
					type={'text'}
					readOnly
					value={session.day}
				/>
			</td>
			<td>
				<input
					className='form-control'
					type={'text'}
					readOnly
					value={session.startTime}
				/>
			</td>
			<td>
				<input
					className='form-control'
					type={'text'}
					readOnly
					value={session.endTime}
				/>
			</td>
		</>
	);
};

SessionTableInfo.propTypes = {
	session: PropTypes.any,
};

export default SessionTableInfo;
