import GoogleLogoutButton from '../Login-Register/GoogleLogoutButton';

interface Props {
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	setUserData: React.Dispatch<React.SetStateAction<User>>;
	userData: User;
}

interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
}

const UserDetails = (props: Props) => {
	return (
		<div id="user-details">
			<div id="user-info">
				<div>
					<i className="far fa-edit"></i>
					<h3>
						{props.userData.first_name} {props.userData.last_name}
					</h3>
				</div>
				<span>{props.userData.email}</span>
			</div>
			<GoogleLogoutButton setIsLoggedIn={props.setIsLoggedIn} setUserData={props.setUserData} />
		</div>
	);
};

export default UserDetails;
