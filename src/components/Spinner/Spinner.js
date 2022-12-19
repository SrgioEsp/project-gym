import React from 'react';
import PropTypes from 'prop-types';
import SpinnerBootstrap from 'react-bootstrap/Spinner';
import { Col, Row } from 'react-bootstrap';
import logo from './../../assets/img/logo.jpg';

const Spinner = (props) => {
	return (
		<Row className='loadingRow'>
			<Col className='loadingCol'>
				<img src={logo} alt='logo' className='mb-5' />
				<SpinnerBootstrap animation='border' role='status'></SpinnerBootstrap>
			</Col>
		</Row>
	);
};

Spinner.propTypes = {};

export default Spinner;
