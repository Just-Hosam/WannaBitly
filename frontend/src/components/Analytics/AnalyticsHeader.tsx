import { useHistory } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const AnalyticsHeader = () => {
	let history = useHistory();

	const handleClick = () => {
		history.push('/');
	};

	return (
		<header id="analytics-header">
			<IconButton className="add-btn" onClick={handleClick}>
				<ArrowBackIcon />
			</IconButton>
			<h2>Analytics</h2>
		</header>
	);
};

export default AnalyticsHeader;
