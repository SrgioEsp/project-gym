import { urlTrainee } from '../api/urls';
import { helpHttp } from '../helpers/helpHttp';

export const getTrainee = async (id) => {
	let result;
	try {
		const res = await helpHttp().get(`${urlTrainee}/${id}`);
		result = res;
	} catch (error) {
		console.log(error);
		result = null;
	}
	return result;
};

export const createTrainee = async (data) => {
	try {
		const options = {
			body: data,
			headers: { 'content-type': 'application/json' },
		};
		return await helpHttp().post(urlTrainee, options);
	} catch (error) {
		console.log(error);
	}
};

export const delTrainee = async (id) => {
	try {
		return await helpHttp().del(`${urlTrainee}/${id}`);
	} catch (error) {
		console.log(error);
	}
};

export const updateTrainee = async (id, body) => {
	try {
		const options = {
			body,
			headers: { 'content-type': 'application/json' },
		};
		return await helpHttp().put(`${urlTrainee}/${id}`, options);
	} catch (error) {
		console.log(error);
	}
};
