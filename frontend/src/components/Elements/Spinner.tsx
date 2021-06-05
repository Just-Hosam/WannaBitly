import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = () => {
	return (
		<div className="spinner">
			<CircularProgress style={{ width: 100, height: 100 }} />
		</div>
	);
};

export default Spinner;
