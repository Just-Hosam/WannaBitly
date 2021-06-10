import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import PaletteIcon from '@material-ui/icons/Palette';
import Tooltip from '@material-ui/core/Tooltip';

const ThemesButton = () => {
	const history = useHistory();

	return (
		<Tooltip title="Themes">
			<Button variant="contained" className="nav-btn" onClick={() => history.push(`/themes`)}>
				<PaletteIcon />
			</Button>
		</Tooltip>
	);
};

export default ThemesButton;
