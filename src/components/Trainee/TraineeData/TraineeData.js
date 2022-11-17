import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import { TraineeContext } from '../../contexts/TraineeContext';

const TraineeData = () => {
	const { trainee } = useContext(TraineeContext);

	return (
		<Container>
			<Row>
				<Col>Nombre: {trainee && trainee.name}</Col>
			</Row>

			<Row>
				<Col>Fecha Entrada: {trainee && trainee.date}</Col>
			</Row>

			<Row>
				<Col>Edad: {trainee && trainee.edad}</Col>
			</Row>

			<Row>
				<Col>Peso: {trainee && trainee.peso}</Col>
			</Row>

			<Row>
				<Col>Altura: {trainee && trainee.altura}</Col>
			</Row>
		</Container>
	);
};

TraineeData.propTypes = {};

export default TraineeData;
