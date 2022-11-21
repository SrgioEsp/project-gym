import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';

const inputValue = (dropdownValue, setDropDownValue, obj) => {
	return (
		<div key={obj.id}>
			<input
				type={'checkbox'}
				checked={dropdownValue.includes(obj.id)}
				value={dropdownValue}
				onChange={(ev) => {
					if (ev.target.checked) {
						setDropDownValue([...dropdownValue, obj.id]);
					} else {
						setDropDownValue(dropdownValue.filter((id) => id !== obj.id));
					}
				}}
			/>
			{' ' + obj.name + ' '}
		</div>
	);
};

const MultiSelect = ({ state, setState, arrayValues, textDropdown }) => {
	return (
		<Dropdown>
			<Dropdown.Toggle variant='secondary' id='dropdown-basic'>
				{textDropdown}
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<div className='mx-3'>
					{arrayValues.map((obj) => {
						return inputValue(state, setState, obj);
					})}
				</div>
			</Dropdown.Menu>
		</Dropdown>
	);
};

MultiSelect.propTypes = {
	state: PropTypes.array,
	setState: PropTypes.func,
	arrayValues: PropTypes.array,
	textDropdown: PropTypes.string,
};

export default MultiSelect;
