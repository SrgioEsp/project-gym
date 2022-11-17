import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';

const inputValue = (dropdownValue, setDropDownValue, value) => {
	return (
		<div key={value}>
			<input
				type={'checkbox'}
				value={dropdownValue}
				onChange={(ev) => {
					if (ev.target.checked) {
						setDropDownValue([...dropdownValue, value]);
					} else {
						setDropDownValue(dropdownValue.filter((d) => d !== value));
					}
				}}
			/>
			{' ' + value}
		</div>
	);
};

const MultiSelectLabel = ({ state, setState, arrayValues, textDropdown }) => {
	return (
		<Dropdown>
			<Dropdown.Toggle variant='secondary' id='dropdown-basic'>
				{state.length !== 0
					? state.length > 3
						? `${state.length} +`
						: state.map((value) => value + ' ')
					: textDropdown}
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<div className='ms-3'>
					{arrayValues.map((value) => {
						return inputValue(state, setState, value);
					})}
				</div>
			</Dropdown.Menu>
		</Dropdown>
	);
};

MultiSelectLabel.propTypes = {
	state: PropTypes.array,
	setState: PropTypes.func,
	arrayValues: PropTypes.array,
	textDropdown: PropTypes.string,
};

export default MultiSelectLabel;
