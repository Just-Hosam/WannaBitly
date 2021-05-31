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
	const [userData, setUserData] = useState<User>({
		id: 0,
		first_name: '',
		last_name: '',
		email: '',
	});
	const isLog = userData.id ? true : false;

	return (
		<div id="navbar">
			<h1>WannaBitly</h1>
			<div id="nav-details">
				{!isLog && <LogReg setUserData={setUserData} />}
				{isLog && <UserDetails userData={userData} setUserData={setUserData} />}
			</div>
		</div>
	);
};

export default NavBar;
