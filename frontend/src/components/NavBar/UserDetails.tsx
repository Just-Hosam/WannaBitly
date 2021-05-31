import GoogleLogoutButton from '../Login-Register/GoogleLogoutButton';

interface Props {
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	data: {
		first_name: string;
		last_name: string;
		email: string;
	};
}

const UserDetails = (props: Props) => {
	return (
		<div id="user-details">
			<div id="user-info">
				<div>
					<i className="far fa-edit"></i>
					<h3>
						{props.data.first_name} {props.data.last_name}
					</h3>
				</div>
				<span>Hosam_Dahrooge@test.com</span>
			</div>
			<GoogleLogoutButton setIsLoggedIn={props.setIsLoggedIn} />
		</div>
	);
};

export default UserDetails;
