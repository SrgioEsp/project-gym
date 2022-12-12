import { urlUsers } from '../api/urls';
import { helpHttp } from '../helpers/helpHttp';

export const getLoginUser = async (data) => {
	try {
		const options = {
			body: data,
			headers: { 'content-type': 'application/json' },
		};
		return await helpHttp().post(urlUsers, options);
	} catch (error) {
		console.error(error);
	}
};

export const getUserById = async (id, token) => {
	try {
		return await helpHttp().get(`${urlUsers}/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
	} catch (error) {
		console.log(error);
	}
};
