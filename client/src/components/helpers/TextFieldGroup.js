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
	console.log(error);
	return (
		<div className="form-group">
			<input
				type={type}
				className={
					error
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
			{/* <div className="invalid-feedback">
				{typeof error[0] === 'string'
					? error[0]
					: typeof error[0] === 'object'
						? error[0][name]
						: null}
			</div> */}
		</div>
	);
};

export default TextFieldGroup;
