import React from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../components/TraineeInfo';
import AppFrame from '../components/AppFrame';
import { Col, Row } from 'react-bootstrap';

const TraineePage = ({ trainee }) => {
	return (
		<AppFrame>
			<Row>
				<Col>
					<TraineeInfo trainee={trainee}></TraineeInfo>
				</Col>
			</Row>
		</AppFrame>
	);
};

TraineePage.propTypes = {
	trainee: PropTypes.object,
};

export default TraineePage;
