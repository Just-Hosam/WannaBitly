import { useHistory } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tooltip from '@material-ui/core/Tooltip';

const AnalyticsHeader = () => {
	let history = useHistory();

	const handleClick = () => {
		history.push('/');
	};

	return (
		<header id="analytics-header">
			<Tooltip title="Back">
				<IconButton className="back-btn" onClick={handleClick}>
					<ArrowBackIcon />
				</IconButton>
			</Tooltip>
			<h2>Analytics</h2>
		</header>
	);
};

export default AnalyticsHeader;
