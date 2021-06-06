import { useCookies } from 'react-cookie';

import UserDetails from './UserDetails';

const NavBar = () => {
	const [cookies] = useCookies(['userInfo']);
	const isLoggedIn = cookies.userInfo ? true : false;

	return (
		<div id="navbar">
			<h1>WannaBitly</h1>
			{isLoggedIn && <UserDetails />}
		</div>
	);
};

export default NavBar;
