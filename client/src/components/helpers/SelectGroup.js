import React from 'react';

const SelectGroup = ({
	name,
	value,
	error,
	info,
	onChange,
	options, // array of options
	msg
}) => {
	const selectOptions = options.map(option => (
		<option key={option.label} value={option.value}>
			{option.label}
		</option>
	));
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
			{/* <div className="invalid-feedback">
				{typeof msg[0] === 'string'
					? msg[0]
					: typeof msg[0] === 'object'
						? msg[0][name]
						: null}
			</div> */}
		</div>
	);
};

// ! Add Proptypes to all input helper components

export default SelectGroup;
