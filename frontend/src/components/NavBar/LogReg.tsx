import GoogleLoginButton from '../Login-Register/GoogleLoginButton';

interface Props {
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	setUserData: React.Dispatch<React.SetStateAction<User>>;
}

interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
}

const LogReg = (props: Props) => {
	return (
		<div id="log-reg">
			<GoogleLoginButton setUserData={props.setUserData} setIsLoggedIn={props.setIsLoggedIn} />
		</div>
	);
};

export default LogReg;
