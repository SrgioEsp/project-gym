import React from 'react';
import PropTypes from 'prop-types';
import { Calendar as ReactCalendar } from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

const Calendar = ({ value, onChange, setShowModal }) => {
	return (
		<div>
			<ReactCalendar
				onChange={onChange}
				value={value}
				onClickDay={(value, event) => {
					setShowModal(true);
				}}
			/>
		</div>
	);
};

Calendar.propTypes = {
	value: PropTypes.any.isRequired,
	onChange: PropTypes.any.isRequired,
	setShowModal: PropTypes.func,
};

export default Calendar;
