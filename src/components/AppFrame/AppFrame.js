import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

const AppFrame = ({ children }) => {
	return (
		<Container>
			<Row>
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
			</Row>
			<Row>{children}</Row>
		</Container>
	);
};

AppFrame.propTypes = {
	children: PropTypes.node,
};

export default AppFrame;
