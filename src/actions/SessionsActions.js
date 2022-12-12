import { urlSession, urlSessions } from '../api/urls';
import { helpHttp } from '../helpers/helpHttp';

export const getSessionsByUserId = async (userId) => {
	let result;
	try {
		await helpHttp()
			.get(`${urlSessions}/${userId}`)
			.then((res) => {
				if (res) {
					result = res;
				}
			});
	} catch (error) {
		console.log(error);
		result = [];
	}
	return result;
};

export const createSession = async (data, token) => {
	try {
		const options = {
			body: data,
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		return await helpHttp().post(urlSession, options);
	} catch (error) {
		console.log(error);
	}
};

export const updateSession = async (id, body, token) => {
	try {
		const options = {
			body,
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		return await helpHttp().put(`${urlSession}/${id}`, options);
	} catch (error) {
		console.log(error);
	}
};

export const delSession = async (id, token) => {
	try {
		return await helpHttp().del(`${urlSession}/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		// console.log(error);
	}
};
