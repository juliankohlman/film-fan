import React from 'react';

const InputGroup = ({
	name,
	placeholder,
	value,
	error,
	icon,
	type,
	onChange
}) => {
	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<i className={icon} />
				</span>
			</div>
			<textarea
				className={
					error
						? 'form-control form-control-lg is-invalid'
						: 'form-control form-control-lg'
				}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
			{/* {info && <small className="form-text text-muted">{info}</small>} */}
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

export default InputGroup;
