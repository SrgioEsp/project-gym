import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

const TraineeInfo = ({ trainee, onClickHandler }) => {
	return (
		<Row className='trainee-info-row' onClick={onClickHandler}>
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
	onClickHandler: PropTypes.func,
};

export default TraineeInfo;
