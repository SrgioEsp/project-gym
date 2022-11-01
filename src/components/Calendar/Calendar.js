import React from 'react';
import PropTypes from 'prop-types';
import { Calendar as ReactCalendar } from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

const Calendar = ({ value, onChange }) => {
	return (
		<div>
			<p>Calendar</p>
			<ReactCalendar onChange={onChange} value={value} />
		</div>
	);
};

Calendar.propTypes = {
	value: PropTypes.any.isRequired,
	onChange: PropTypes.any.isRequired,
};

export default Calendar;
