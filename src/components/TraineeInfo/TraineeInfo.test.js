import React from 'react';
import { render } from '@testing-library/react';
import TraineeInfo from './TraineeInfo';

test('TraineeInfo renders', async () => {
	// const { findAllByRole } = render(
	// 	<TraineeInfo trainee='alumno prueba'></TraineeInfo>
	// );

	// const traineeComponents = await findAllByRole('paragraph');
	// expect(traineeComponents[0]).toHaveTextContent('alumno prueba');

	render(<TraineeInfo trainee='alumno prueba'></TraineeInfo>);
	const linkElement = screen.getByText(/TraineeInfo/i);
	expect(linkElement).toBeInTheDocument();
});
