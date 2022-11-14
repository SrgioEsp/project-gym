import { urlGroups } from '../api/urls';
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
