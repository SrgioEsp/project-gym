import { urlTrainees } from '../api/urls';
import { helpHttp } from '../helpers/helpHttp';

export const createMockTrainee = async (data, trainees, setTrainees) => {
	try {
		const options = {
			body: data,
			headers: { 'content-type': 'application/json' },
		};
		const res = await helpHttp().post(urlTrainees, options);
		setTrainees([...trainees, res]);
	} catch (error) {
		console.log(error);
	}
};

export const delMockTrainee = async (id, trainees, setTrainees) => {
	try {
		await helpHttp()
			.del(`${urlTrainees}/${id}`)
			.then((res) => {
				const newData = trainees.filter((trainee) => trainee.id !== id);
				setTrainees(newData);
			});
	} catch (error) {
		console.log(error);
	}
};
