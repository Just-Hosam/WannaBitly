import Button from '@material-ui/core/Button';

const UserDetails = () => {
	const props = {
		data: {
			first_name: 'Hosam',
			last_name: 'Dahrooge',
			email: 'Hosam_Dahrooge@test.com',
		},
	};

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
			<Button variant="contained" className="nav-btn">
				<span id="logout-text">Logout</span>
				<i className="fas fa-sign-out-alt"></i>
			</Button>
		</div>
	);
};

export default UserDetails;
