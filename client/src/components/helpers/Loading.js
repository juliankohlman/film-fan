import React from 'react';
import loader from './loader.gif';

const Loading = () => (
	<div
		className="loader-container"
		style={{ background: '#f9f9f9', height: '100vh' }}
	>
		<div
			className="loader"
			style={{
				margin: 'auto',
				alignItems: 'center',
				display: 'flex',
				justifyContent: 'center'
			}}
		>
			<img
				className="loader-image"
				alt="Loading spinner"
				src={loader}
				style={{
					marginTop: '17%',
					height: '15rem',
					width: '15rem',
					borderRadius: '8px'
				}}
			/>
		</div>
	</div>
);

export default Loading;
