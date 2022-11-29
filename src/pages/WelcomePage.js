import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../components/WelcomeScreen';
import { storage } from './../storage';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import topImg from './../assets/img/moverte3.jpg';
import logo from './../assets/img/moverte2.jpg';
import bottomImg from './../assets/img/moverte4.jpg';

const WelcomePage = (props) => {
	return (
		<Container className='welcomePage'>
			<WelcomeScreen>
				<Row className='welcomeRow opc'>
					<Col>
						<img src={topImg} alt='logo' />
					</Col>
				</Row>
				<Row className='welcomeRow'>
					<Col>
						<Link to={storage.get('user_session') ? '/home' : '/login'}>
							<img src={logo} alt='logo' />
						</Link>
					</Col>
				</Row>
				<Row className='welcomeRow opc'>
					<Col>
						<img src={bottomImg} alt='logo' />
					</Col>
				</Row>
			</WelcomeScreen>
		</Container>
	);
};

WelcomePage.propTypes = {};

export default WelcomePage;
