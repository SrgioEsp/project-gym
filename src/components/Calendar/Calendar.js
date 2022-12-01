import React from 'react';
import PropTypes from 'prop-types';
import { Calendar as ReactCalendar } from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import { Col, Row } from 'react-bootstrap';

const Calendar = ({ value, onChange, setShowModal }) => {
	return (
		<ReactCalendar
			onChange={onChange}
			value={value}
			onClickDay={(value, event) => {
				setShowModal(true);
			}}
			className='calendar'
		/>
	);
};

Calendar.propTypes = {
	value: PropTypes.any.isRequired,
	onChange: PropTypes.any.isRequired,
	setShowModal: PropTypes.func,
};

export default Calendar;
