import { GoogleLogout } from 'react-google-login';

import Button from '@material-ui/core/Button';

const clientId = '850469791131-sr92fi9mga2ejm2ebhttiidb1o0mrnsq.apps.googleusercontent.com';

interface Props {
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoogleLogoutButton = (props: Props) => {
	const onSuccess = () => {
		alert('Logout made successfully!');
		props.setIsLoggedIn(false);
	};

	const onFailure = () => {
		alert('Logout Failed!');
	};

	return (
		<div>
			<GoogleLogout
				clientId={clientId}
				render={(renderProps) => (
					<Button
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
						variant="contained"
						className="nav-btn"
					>
						<span id="logout-text">Logout</span>
						<i className="fas fa-sign-out-alt"></i>
					</Button>
				)}
				buttonText="Logout"
				onLogoutSuccess={onSuccess}
				onFailure={onFailure}
			/>
		</div>
	);
};

export default GoogleLogoutButton;
