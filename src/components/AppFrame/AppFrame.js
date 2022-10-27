import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

const AppFrame = ({ children }) => {
	return (
		<Container>
			<Row className='border p-3 mb-3'>
				<Col>
					<Navbar>
						<Container>
							<Navbar.Brand href='#home'>Project GYM</Navbar.Brand>
							<Navbar.Toggle />
							<Navbar.Collapse className='justify-content-end'>
								<Navbar.Text>
									Usuario: <a href='#login'>Sergio Prueba</a>
								</Navbar.Text>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</Col>
			</Row>
			{children}
		</Container>
	);
};

AppFrame.propTypes = {
	children: PropTypes.node,
};

export default AppFrame;
