import axios from 'axios';
import { useCookies } from 'react-cookie';
import { GoogleLogin } from 'react-google-login';
import refreshTokenSetup from '../../helpers/refreshTokenSetup';

import Button from '@material-ui/core/Button';

const clientId = '850469791131-sr92fi9mga2ejm2ebhttiidb1o0mrnsq.apps.googleusercontent.com';

const GoogleLoginButton = () => {
	const [, setCookie] = useCookies(['userId', 'userInfo']);

	const onSuccess = (res: any) => {
		refreshTokenSetup(res);

		const userEmail = res.profileObj.email;
		const userFirstName = res.profileObj.givenName;
		const userLastName = res.profileObj.familyName;

		axios
			.post(`/login`, { userEmail }, { headers: { 'Access-Control-Allow-Origin': '*' } })
			.then((loginRes) => {
				if (loginRes.data) {
					setCookie('userId', loginRes.data.id, { path: '/' });
					setCookie('userInfo', { userEmail, userFirstName, userLastName }, { path: '/' });
					return;
				}
				axios
					.post('/register', { userEmail })
					.then((resgisterResponse) => {
						setCookie('userId', resgisterResponse.data.id, { path: '/' });
						setCookie('userInfo', { userEmail, userFirstName, userLastName }, { path: '/' });
					})
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
