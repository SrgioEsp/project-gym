import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { AppContext } from '../../contexts/AppContext';
import { storage } from '../../storage';

const AppFrame = ({ children }) => {
	const { user } = useContext(AppContext);
	return (
		<Container>
			<Row className='border p-3 mb-3'>
				<Col>
					<Navbar>
						<Container>
							<Navbar.Brand href='#home'>Mi Gimnasio</Navbar.Brand>
							<Navbar.Toggle />
							<Navbar.Collapse className='justify-content-end'>
								<Navbar.Text>
									Usuario:{' '}
									<a
										href='/login'
										onClick={() => storage.remove('user_session')}
									>
										{user.name}
									</a>
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
