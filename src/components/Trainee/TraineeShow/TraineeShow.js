import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

const TraineeShow = ({ delBtn, children, onClickHandler, width }) => {
	return (
		<div
			className={`container-trainee-show ${width && width}`}
			onClick={onClickHandler}
		>
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
	onClickHandler: PropTypes.func,
	width: PropTypes.string,
};

export default TraineeShow;
