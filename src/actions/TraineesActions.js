import { urlTrainees } from '../api/urls';
import { helpHttp } from '../helpers/helpHttp';

export const getTraineesByUserId = async (userId) => {
	let result;
	try {
		await helpHttp()
			.get(`${urlTrainees}/${userId}`)
			.then((res) => {
				if (res) {
					result = res;
				}
			});
	} catch (error) {
		console.log(error);
		result = error;
	}
	return result;
};
