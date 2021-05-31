import { useState } from 'react';

import LogReg from './LogReg';
import UserDetails from './UserDetails';

interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
}

const NavBar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState<User>({
		id: 0,
		first_name: '',
		last_name: '',
		email: '',
	});

	return (
		<div id="navbar">
			<h1>WannaBitly</h1>
			<div id="nav-details">
				{!isLoggedIn && <LogReg setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />}
				{isLoggedIn && (
					<UserDetails userData={userData} setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />
				)}
			</div>
		</div>
	);
};

export default NavBar;
