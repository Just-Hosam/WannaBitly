import { useCookies } from 'react-cookie';

import LogReg from './LogReg';
import UserDetails from './UserDetails';

const NavBar = () => {
	const [cookies] = useCookies(['userInfo']);
	const isLoggedIn = cookies.userInfo ? true : false;

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
