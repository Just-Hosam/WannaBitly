import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

import UserDetails from './UserDetails';

const NavBar = () => {
	const [cookies] = useCookies(['userInfo']);
	const isLoggedIn = cookies.userInfo ? true : false;
	let history = useHistory();

	return (
		<div id="navbar">
			<h1 onClick={() => history.push('/')}>WannaBitly</h1>
			{isLoggedIn && <UserDetails />}
		</div>
	);
};

export default NavBar;
