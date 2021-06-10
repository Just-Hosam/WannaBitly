import { useHistory } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tooltip from '@material-ui/core/Tooltip';

const ThemesHeader = () => {
	let history = useHistory();

	const handleClick = () => {
		history.push('/');
	};

	return (
		<header id="themes-header">
			<Tooltip title="Back">
				<IconButton className="back-btn" onClick={handleClick}>
					<ArrowBackIcon />
				</IconButton>
			</Tooltip>
			<h2>Themes</h2>
		</header>
	);
};

export default ThemesHeader;
