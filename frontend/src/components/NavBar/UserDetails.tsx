import GoogleLogoutButton from '../Login-Register/GoogleLogoutButton';

interface Props {
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
				<h3>
					{props.userData.first_name} {props.userData.last_name}
				</h3>

				<span>{props.userData.email}</span>
			</div>
			<GoogleLogoutButton setUserData={props.setUserData} />
		</div>
	);
};

export default UserDetails;
