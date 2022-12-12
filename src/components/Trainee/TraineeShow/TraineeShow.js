import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

const TraineeShow = ({ delBtn, children }) => {
	return (
		<div className='container-trainee-show'>
			<Row>
				<Col>{children}</Col>
			</Row>
			{delBtn && (
				<Row>
					<Col>{delBtn}</Col>
				</Row>
			)}
		</div>
	);
};

TraineeShow.propTypes = {
	children: PropTypes.node,
	delBtn: PropTypes.node,
};

export default TraineeShow;
