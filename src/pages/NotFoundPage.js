import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = (props) => {
	return (
		<Container>
			<Row className='justify-content-center'>
				<Col xs='auto'>
					<p className='h3'>PAGE NOT FOUND :( </p>
				</Col>
			</Row>
			<Row className='justify-content-center'>
				<Col xs='auto'>
					<Link to='/home' className='btn btn-primary'>
						Inicio
					</Link>
				</Col>
			</Row>
		</Container>
	);
};

NotFoundPage.propTypes = {};

export default NotFoundPage;
