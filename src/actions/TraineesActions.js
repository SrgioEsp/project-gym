import { urlTrainees } from '../api/urls';
import { helpHttp } from '../helpers/helpHttp';

export const getTraineesByUserId = async (userId) => {
	let result;
	try {
		const data = await helpHttp().get(`${urlTrainees}?userId=${userId}`);
		result = data;
	} catch (error) {
		console.log(error);
		result = error;
	}
	return result;
};
