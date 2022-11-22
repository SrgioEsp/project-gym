import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

const TraineeInfo = ({ trainee }) => {
	return (
		<Row className='justify-content-start p-2'>
			<Col xs={'auto'}>
				<b>
					{trainee.name} {trainee.surname}
				</b>
			</Col>
		</Row>
	);
};

TraineeInfo.propTypes = {
	trainee: PropTypes.object.isRequired,
};

export default TraineeInfo;
