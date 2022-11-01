import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Calendar as ReactCalendar } from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

const Calendar = (props) => {
	const [value, onChange] = useState(new Date());

	return (
		<div>
			<p>Calendar</p>
			<ReactCalendar
				onChange={onChange}
				onClickDay={(value, event) => {
					console.log('Value', value);
				}}
				value={value}
			/>
		</div>
	);
};

Calendar.propTypes = {};

export default Calendar;
