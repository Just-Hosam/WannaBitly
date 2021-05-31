import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import refreshTokenSetup from '../../helpers/refreshTokenSetup';

import Button from '@material-ui/core/Button';

const clientId = '850469791131-sr92fi9mga2ejm2ebhttiidb1o0mrnsq.apps.googleusercontent.com';

interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
}

interface Props {
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	setUserData: React.Dispatch<React.SetStateAction<User>>;
}

const GoogleLoginButton = (props: Props) => {
	const onSuccess = (res: any) => {
		refreshTokenSetup(res);
		props.setIsLoggedIn(true);

		const userEmail = res.profileObj.email;
		const userFirstName = res.profileObj.givenName;
		const userLastName = res.profileObj.familyName;

		axios
			.post(`/login`, { userEmail })
			.then((res) => {
				if (res.data) return props.setUserData(res.data);
				axios
					.post('/register', { userEmail, userFirstName, userLastName })
					.then((res) => props.setUserData(res.data))
					.catch((err: Error) => console.log(err));
			})
			.catch((err: Error) => console.log(err));
	};

	const onFailure = (res: any) => {
		console.log('[Login Failure] res:', res);
	};

	return (
		<div>
			<GoogleLogin
				clientId={clientId}
				buttonText="Login"
				render={(renderProps) => (
					<Button
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
						variant="contained"
						className="nav-btn"
					>
						Login
					</Button>
				)}
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={'single_host_origin'}
				style={{ marginTop: '100px' }}
				isSignedIn={true}
			/>
		</div>
	);
};

export default GoogleLoginButton;
