import React from 'react';

const SelectGroup = ({ name, value, error, info, onChange, options }) => {
	const selectOptions = options.map(option => (
		<option key={option.label} value={option.value}>
			{option.label}
		</option>
	));

	console.log('Select group: ', error);

	return (
		<div className="form-group">
			<select
				className={
					error
						? 'form-control form-control-lg is-invalid'
						: 'form-control form-control-lg'
				}
				name={name}
				value={value}
				onChange={onChange}
			>
				{selectOptions}
			</select>
			{info && <small className="form-text text-muted">{info}</small>}
			<div className="invalid-feedback">{error}</div>
		</div>
	);
};

// ! Add Proptypes to all input helper components

export default SelectGroup;
