import { useCookies } from 'react-cookie';

import GoogleLogoutButton from '../Login-Register/GoogleLogoutButton';
import ThemesButton from './ThemesButton';

const UserDetails = () => {
	const [cookies] = useCookies(['userInfo']);
	let firstName = '';
	let lastName = '';
	let email = '';

	if (cookies.userInfo) {
		firstName = cookies.userInfo.userFirstName;
		lastName = cookies.userInfo.userLastName;
		email = cookies.userInfo.userEmail;
	}

	return (
		<div id="user-details">
			<div id="user-info">
				<h3>
					{firstName || 'firstName'} {lastName || 'lastName'}
				</h3>
				<span>{email || 'email'}</span>
			</div>
			<GoogleLogoutButton />
			<ThemesButton />
		</div>
	);
};

export default UserDetails;
