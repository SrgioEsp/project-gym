import { convertWeekDaysToNumber } from '../../../utils';

export const getNextSession = (sessions, traineeId) => {
	const getSessionsByTraineeId = sessions.filter((session) =>
		session.trainees.find((id) => traineeId === id)
	);
	const currentDay = new Date();

	let nextSession = {};

	if (getSessionsByTraineeId.length !== 0) {
		// SI TIENE UN GRUPO
		if (getSessionsByTraineeId.length < 2) {
			const session = getSessionsByTraineeId[0].days.weekdays.map(
				(session) => session
			);
			if (session.length !== 0 && session.length < 2) {
				if (convertWeekDaysToNumber(session[0].day) === currentDay.getDay()) {
					const hour = Number(session[0].startTime.split(':')[0]);
					const min = Number(session[0].startTime.split(':')[1]);
					if (currentDay.getHours() < hour) {
						nextSession = session[0];
					} else if (currentDay.getMinutes() <= min) {
						nextSession = session[0];
					}
				} else if (
					convertWeekDaysToNumber(session[0].day) > currentDay.getDay()
				) {
					nextSession = session[0];
				}
			}
		} else {
			// SI TIENE MÁS DE UN GRUPO
			const sessions = [];
			getSessionsByTraineeId.map((session) =>
				session.days.weekdays.map((session) => {
					if (currentDay.getDay() === convertWeekDaysToNumber(session.day)) {
						const hour = Number(session.startTime.split(':')[0]);
						const min = Number(session.startTime.split(':')[1]);
						if (currentDay.getHours() < hour) {
							sessions.push(session);
						} else if (
							currentDay.getHours() === hour &&
							currentDay.getMinutes() <= min
						) {
							sessions.push(session);
						}
					} else if (
						currentDay.getDay() < convertWeekDaysToNumber(session.day)
					) {
						sessions.push(session);
					}
					return session;
				})
			);
			console.log(sessions);
			if (sessions.length === 1) {
				nextSession = sessions[0];
			} else {
				let previousDay = -1;
				let currentSession = {};
				sessions.map((session) => {
					if (convertWeekDaysToNumber(session.day) === currentDay.getDay()) {
						nextSession = session;
					} else {
						if (previousDay !== -1) {
							if (convertWeekDaysToNumber(session.day) > previousDay) {
								previousDay = convertWeekDaysToNumber(session.day);
								currentSession = session;
							}
						} else {
							previousDay = convertWeekDaysToNumber(session.day);
						}
					}
					return session;
				});
				nextSession = currentSession;
			}
		}
	}

	console.log(nextSession);
	return nextSession;
};
