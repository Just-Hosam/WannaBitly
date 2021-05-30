import { GoogleLogin } from 'react-google-login';
import refreshTokenSetup from '../../helpers/refreshTokenSetup';

import Button from '@material-ui/core/Button';

const clientId = '850469791131-sr92fi9mga2ejm2ebhttiidb1o0mrnsq.apps.googleusercontent.com';

const GoogleLoginButton = () => {
	const onSuccess = (res: any) => {
		console.log('[Login Success] currentUser:', res.profileObj);
		refreshTokenSetup(res);
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
