import GoogleLoginButton from '../Login-Register/GoogleLoginButton';

interface Props {
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogReg = (props: Props) => {
	return (
		<div id="log-reg">
			<GoogleLoginButton setIsLoggedIn={props.setIsLoggedIn} />
		</div>
	);
};

export default LogReg;
