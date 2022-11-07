import { urlTrainees } from '../api/urls';
import { helpHttp } from '../helpers/helpHttp';

export const createTrainee = async (data) => {
	let result;
	try {
		const options = {
			body: data,
			headers: { 'content-type': 'application/json' },
		};
		const res = await helpHttp().post(urlTrainees, options);
		result = res;
	} catch (error) {
		console.log(error);
		result = error;
	}
	return result;
};

export const delTrainee = async (id) => {
	let result;
	try {
		const res = await helpHttp().del(`${urlTrainees}/${id}`);
		result = res;
	} catch (error) {
		console.log(error);
		result = error;
	}
	return result;
};
