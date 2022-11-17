export const formatDate = (date) => {
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const inputDateFormat = (date) => {
	const aDate = date.split('/');
	const year = aDate[2];
	const month = aDate[1].length === 1 ? `0${aDate[1]}` : aDate[1];
	const day = aDate[0].length === 1 ? `0${aDate[0]}` : aDate[0];
	return `${year}-${month}-${day}`;
};
