import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { AppContext } from '../../contexts/AppContext';
import { storage } from '../../storage';

const AppFrame = ({ children }) => {
	const { user } = useContext(AppContext);
	return (
		<Container className='appFrameContent'>
			<Row className='appFrameNavBar'>
				<Col>
					<Navbar>
						<Container>
							<div className='avatar'></div>
							<Navbar.Text className='user-name-container'>
								{user.name.toUpperCase()}
							</Navbar.Text>
							<Navbar.Toggle />
							<Navbar.Collapse className='justify-content-end'>
								<Navbar.Text className='btnLogoutContainer'>
									<a
										className='btnLogout'
										href='/login'
										onClick={() => storage.remove('user_session')}
									>
										Salir
									</a>
								</Navbar.Text>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</Col>
			</Row>
			<Row className='appFrameChildren'>
				<Col>{children}</Col>
			</Row>
		</Container>
	);
};

AppFrame.propTypes = {
	children: PropTypes.node,
};

export default AppFrame;
