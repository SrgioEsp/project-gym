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

export const createSession = async (data) => {
	try {
		const options = {
			body: data,
			headers: { 'content-type': 'application/json' },
		};
		return await helpHttp().post(urlSession, options);
	} catch (error) {
		console.log(error);
	}
};

export const delSession = async (id) => {
	try {
		return await helpHttp().del(`${urlSession}/${id}`);
	} catch (error) {
		console.log(error);
	}
};
