import GoogleLoginButton from '../Login-Register/GoogleLoginButton';

interface Props {
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
			<GoogleLoginButton setUserData={props.setUserData} />
		</div>
	);
};

export default LogReg;
