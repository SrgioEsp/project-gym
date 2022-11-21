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

export const setSessionType = (session) => {
	switch (session.trainees.length) {
		case 0:
			break;
		case 1:
			session.sessionType = 'INDIVIDUAL';
			break;
		case 2:
			session.sessionType = 'DUO';
			break;
		case 3:
			session.sessionType = 'TRIO';
			break;
		case 4:
			session.sessionType = 'CUARTETO';
			break;
		default:
			session.sessionType = 'GRUPO GRANDE';
			break;
	}
	return session;
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

export const convertWeekDaysToString = (numberOfDay) => {
	switch (numberOfDay) {
		case 1:
			return 'Lunes';
		case 2:
			return 'Martes';
		case 3:
			return 'Miercoles';
		case 4:
			return 'Jueves';
		case 5:
			return 'Viernes';
		case 6:
			return 'Sabado';
		case 0:
			return 'Domingo';
	}
};

export const convertWeekDaysToNumber = (stringOfDay) => {
	switch (stringOfDay) {
		case 'Lunes':
			return 1;
		case 'Martes':
			return 2;
		case 'Miercoles':
			return 3;
		case 'Jueves':
			return 4;
		case 'Viernes':
			return 5;
		case 'Sabado':
			return 6;
		case 'Domingo':
			return 0;
	}
};
