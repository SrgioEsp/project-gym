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
		console.log(error);
		result = error;
	}
	return result;
};
