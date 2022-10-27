import React from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import Calendar from '../components/Calendar';
import { Row, Col } from 'react-bootstrap';

const MainPage = (props) => {
	return (
		<AppFrame>
			<Row className='justify-content-sm-center'>
				<Col xs='auto'>
					<Calendar></Calendar>
				</Col>
			</Row>
		</AppFrame>
	);
};

MainPage.propTypes = {};

export default MainPage;
