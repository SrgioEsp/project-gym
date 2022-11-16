import { urlGroup, urlGroups } from '../api/urls';
import { helpHttp } from '../helpers/helpHttp';

export const getGroupsByUserId = async (userId) => {
	let result;
	try {
		await helpHttp()
			.get(`${urlGroups}/${userId}`)
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

export const createGroup = async (data) => {
	let result;
	try {
		const options = {
			body: data,
			headers: { 'content-type': 'application/json' },
		};
		const res = await helpHttp().post(urlGroup, options);
		result = res;
	} catch (error) {
		console.log(error);
		result = error;
	}
	return result;
};

export const delGroup = async (id) => {
	try {
		return await helpHttp().del(`${urlGroup}/${id}`);
	} catch (error) {
		console.log(error);
	}
};
