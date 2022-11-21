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

export const setGroupType = (group) => {
	switch (group.trainees.length) {
		case 0:
			break;
		case 1:
			group.groupType = 'INDIVIDUAL';
			break;
		case 2:
			group.groupType = 'DUO';
			break;
		case 3:
			group.groupType = 'TRIO';
			break;
		case 4:
			group.groupType = 'CUARTETO';
			break;
		default:
			group.groupType = 'GRUPO GRANDE';
			break;
	}
	return group;
};

export const mapWeekDays = {
	1: 'Lunes',
	2: 'Martes',
	3: 'Miercoles',
	4: 'Jueves',
	5: 'Viernes',
	6: 'Sabado',
	0: 'Domingo',
};
