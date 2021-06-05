import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

interface Props {
	messageSnackBar: string;
	openSnackBar: boolean;
	setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
}

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NotificationSnack = (props: Props) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			open={props.openSnackBar}
			autoHideDuration={3000}
			onClose={() => props.setOpenSnackBar(false)}
		>
			<Alert onClose={() => props.setOpenSnackBar(false)} severity="success">
				{props.messageSnackBar}
			</Alert>
		</Snackbar>
	);
};

export default NotificationSnack;
