import React from 'react';

const TextFieldGroup = ({
	name,
	placeholder,
	value,
	label,
	error,
	info,
	type,
	onChange,
	disabled
}) => {
	return (
		<div className="form-group">
			<input
				type={type}
				className={
					msg.length > 0
						? 'form-control form-control-lg is-invalid'
						: 'form-control form-control-lg'
				}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				disabled={disabled}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			<div className="invalid-feedback">
				{msg[0] && msg[0].name ? msg[0].name : null}
			</div>
		</div>
	);
};

export default TextFieldGroup;
