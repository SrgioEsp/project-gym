import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

const TraineeInfo = ({ trainee }) => {
	return (
		<Row className='trainee-info-row'>
			<Col>
				<b>{trainee.name}</b>
			</Col>
			<Col>
				<b>{trainee.surname}</b>
			</Col>
		</Row>
	);
};

TraineeInfo.propTypes = {
	trainee: PropTypes.object.isRequired,
};

export default TraineeInfo;
