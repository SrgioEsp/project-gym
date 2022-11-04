import { urlTrainees } from '../api/urls';
import { helpHttp } from '../helpers/helpHttp';

export const createTrainee = async (data, trainees, setTrainees) => {
	let result;
	try {
		const options = {
			body: data,
			headers: { 'content-type': 'application/json' },
		};
		await helpHttp()
			.post(urlTrainees, options)
			.then((res) => {
				result = res;
				setTrainees([...trainees, res]);
			});
	} catch (error) {
		console.log(error);
		result = error;
	}
	return result;
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
