import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = () => {
	return (
		<div className="spinner">
			<CircularProgress disableShrink style={{ width: 80, height: 80 }} />
		</div>
	);
};

export default Spinner;
