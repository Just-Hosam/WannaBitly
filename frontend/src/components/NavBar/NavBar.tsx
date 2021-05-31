import { useState } from 'react';

import LogReg from './LogReg';
import UserDetails from './UserDetails';

const NavBar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const data = {
		first_name: 'Hosam',
		last_name: 'Dahrooge',
		email: 'Hosam_Dahrooge@test.com',
	};

	return (
		<div id="navbar">
			<h1>WannaBitly</h1>
			<div id="nav-details">
				{!isLoggedIn && <LogReg setIsLoggedIn={setIsLoggedIn} />}
				{isLoggedIn && <UserDetails data={data} setIsLoggedIn={setIsLoggedIn} />}
			</div>
		</div>
	);
};

export default NavBar;
