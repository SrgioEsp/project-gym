import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Calendar as ReactCalendar } from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import { Col, Row } from 'react-bootstrap';
import { AppContext } from '../../contexts/AppContext';
import { mapWeekDays } from '../../utils';

const Calendar = ({ value, onChange, setShowModal }) => {
	const { sessions } = useContext(AppContext);
	return (
		<ReactCalendar
			onChange={onChange}
			value={value}
			onClickDay={(value, event) => {
				setShowModal(true);
			}}
			className='calendar'
			tileClassName={({ date }) => {
				if (sessions && sessions.length !== 0) {
					let isActive = false;
					sessions.forEach((session) => {
						session.days.weekdays.forEach((weekday) => {
							if (weekday.day === mapWeekDays[date.getDay()]) {
								isActive = true;
							}
						});
					});
					return isActive && 'sessions-calendar-active';
				}
			}}
		/>
	);
};

Calendar.propTypes = {
	value: PropTypes.any.isRequired,
	onChange: PropTypes.any.isRequired,
	setShowModal: PropTypes.func,
};

export default Calendar;
