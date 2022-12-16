import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Calendar as ReactCalendar } from 'react-calendar';
import { AppContext } from '../../contexts/AppContext';
import { formatDate } from '../../utils';

import 'react-calendar/dist/Calendar.css';

const Calendar = ({ value, onChange, setShowModal }) => {
	const { sessions } = useContext(AppContext);

	const setClassNameIsActive = (date) => {
		if (sessions && sessions.length !== 0) {
			let isActive = false;

			sessions.forEach((session) => {
				session.days.weekdays.forEach((weekday) => {
					if (
						formatDate(new Date(weekday.day)) === formatDate(new Date(date))
					) {
						isActive = true;
					}
				});
			});

			return isActive && 'sessions-calendar-active';
		}
	};

	return (
		<ReactCalendar
			onChange={onChange}
			value={value}
			onClickDay={(value, event) => {
				setShowModal(true);
			}}
			className='calendar'
			tileClassName={({ date }) => setClassNameIsActive(date)}
		/>
	);
};

Calendar.propTypes = {
	value: PropTypes.any.isRequired,
	onChange: PropTypes.any.isRequired,
	setShowModal: PropTypes.func,
};

export default Calendar;
