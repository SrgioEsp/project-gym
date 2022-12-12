import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

const NavTopButton = ({ btnBack, btnAct, text }) => {
	return (
		<Row className='nav-top-buttons'>
			{btnBack && <Col className='nav-top-buttons-back'>{btnBack}</Col>}
			{text && (
				<Col className='nav-top-buttons-text'>
					<h5>{text}</h5>
				</Col>
			)}
			{btnAct && <Col className='nav-top-buttons-act'>{btnAct}</Col>}
		</Row>
	);
};

NavTopButton.propTypes = {
	btnBack: PropTypes.any,
	btnAct: PropTypes.any,
	text: PropTypes.string,
};

export default NavTopButton;
