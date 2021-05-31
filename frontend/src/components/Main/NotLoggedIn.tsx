import GoogleLoginButton from '../Login-Register/GoogleLoginButton';

const NotLoggedIn = () => {
	return (
		<div id="not-loggedin-card">
			<header>
				<h2>
					Welcome to <span>WannaBitly</span>
				</h2>
				<p>Just a wannabe Bitly</p>
			</header>
			<GoogleLoginButton />
		</div>
	);
};

export default NotLoggedIn;
