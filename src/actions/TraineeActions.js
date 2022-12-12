import { urlTrainee } from '../api/urls';
import { helpHttp } from '../helpers/helpHttp';

export const getTrainee = async (id, token) => {
	let result;
	try {
		const res = await helpHttp().get(`${urlTrainee}/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		result = res;
	} catch (error) {
		console.log(error);
		result = null;
	}
	return result;
};

export const createTrainee = async (data, token) => {
	try {
		const options = {
			body: data,
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		return await helpHttp().post(urlTrainee, options);
	} catch (error) {
		console.log(error);
	}
};

export const delTrainee = async (id, token) => {
	try {
		return await helpHttp().del(`${urlTrainee}/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {}
};

export const updateTrainee = async (id, body, token) => {
	try {
		const options = {
			body,
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		return await helpHttp().put(`${urlTrainee}/${id}`, options);
	} catch (error) {
		console.log(error);
	}
};
