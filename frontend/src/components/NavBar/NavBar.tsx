import LogReg from './LogReg';
import UserDetails from './UserDetails';

const NavBar = () => {
	const isLoggedIn = true;

	return (
		<div id="navbar">
			<h1>WannaBitly</h1>
			<div id="nav-details">
				{!isLoggedIn && <LogReg />}
				{isLoggedIn && <UserDetails />}
			</div>
		</div>
	);
};

export default NavBar;
