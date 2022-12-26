import { urlTraining } from '../api/urls';
import { helpHttp } from '../helpers/helpHttp';

export const createTraining = async (data, token) => {
	try {
		const options = {
			body: data,
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		return await helpHttp().post(urlTraining, options);
	} catch (error) {
		console.log(error);
	}
};

export const updateTraining = async (id, body, token) => {
	try {
		const options = {
			body,
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		return await helpHttp().put(`${urlTraining}/${id}`, options);
	} catch (error) {
		console.log(error);
	}
};

export const delTraining = async (id, token) => {
	try {
		return await helpHttp().del(`${urlTraining}/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		// console.log(error);
	}
};
