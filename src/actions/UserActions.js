import { urlUsers } from '../api/urls';
import { helpHttp } from '../helpers/helpHttp';

export const getLoginUser = async (data) => {
	let result;
	try {
		const options = {
			body: data,
			headers: { 'content-type': 'application/json' },
		};
		const res = await helpHttp().post(urlUsers, options);
		result = res;
	} catch (error) {
		console.error(error);
		result = error;
	}
	return result;
};

export const getUserById = async (id) => {
	try {
		return await helpHttp().get(`${urlUsers}/${id}`);
	} catch (error) {
		console.log(error);
	}
};
