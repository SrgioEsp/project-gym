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
	let result;
	try {
		const options = {
			body: data,
			headers: { 'content-type': 'application/json' },
		};
		const res = await helpHttp().post(urlTrainee, options);
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
		const res = await helpHttp().del(`${urlTrainee}/${id}`);
		result = res;
	} catch (error) {
		console.log(error);
		result = error;
	}
	return result;
};

export const updateTrainee = async (id) => {
	let result;
	try {
		const res = await helpHttp().put(`${urlTrainee}/${id}`);
		result = res;
	} catch (error) {
		console.log(error);
		result = error;
	}
	return result;
};
