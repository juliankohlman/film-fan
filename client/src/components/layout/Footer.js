import React from 'react';

const Footer = () => {
	return (
		// footer.bg - dark.text - white.mt - 5.p - 4.text - center
		<footer className="bg-dark text-white mt-5 p-4 text-center">
			Copyright &copy; {new Date().getFullYear()} FilmFan
		</footer>
	);
};

export default Footer;
