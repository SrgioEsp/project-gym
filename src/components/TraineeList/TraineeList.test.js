import TraineeList from './TraineeList';
import { fireEvent, render } from '@testing-library/react';

const trainees = [
	{
		name: 'alumno prueba',
		date: '31/1/2002',
	},
	{
		name: 'alumno prueba2',
		date: '13/2/2002',
	},
	{
		name: 'alumno prueba3',
		date: '1/11/2022',
	},
];

test('TraineeList renders', async () => {
	const { findAllByRole } = render(
		<TraineeList trainees={trainees}></TraineeList>
	);

	const items = await findAllByRole('listitem');
	expect(items).toHaveLength(3);
});

test('TraineeList click on item', async () => {
	const fnClickOnItem = jest.fn();
	const { findAllByRole } = render(
		<TraineeList
			trainees={trainees}
			onClickTrainee={fnClickOnItem}
		></TraineeList>
	);

	const item = await findAllByRole('listitem');
	fireEvent.click(item[0]);

	expect(fnClickOnItem).toHaveBeenCalledTimes(1);
});
