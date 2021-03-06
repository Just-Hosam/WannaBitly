import IconButton from '@material-ui/core/IconButton';
import PaletteIcon from '@material-ui/icons/Palette';
import Tooltip from '@material-ui/core/Tooltip';

import applyTheme from '../../helpers/applyTheme';
import themes from '../../helpers/themesColors';

interface Props {
	theme: {
		name: ThemeName;
		cardColor: string;
		buttonColor: string;
		blockColor1: string;
		blockColor2: string;
		blockColor3: string;
	};
	setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
	setMessageSnackBar: React.Dispatch<React.SetStateAction<string>>;
}

type ThemeName = 'default' | 'light' | 'dark';

const ThemesListItem = (props: Props) => {
	const handleClick = (themeName: ThemeName) => {
		localStorage.setItem('theme', themeName);
		localStorage.setItem('currentTheme', JSON.stringify(themes[themeName]));
		applyTheme(themes[themeName]);
		props.setMessageSnackBar('Theme Selected');
		props.setOpenSnackBar(true);
	};

	return (
		<li id="themes-list-item" style={{ backgroundColor: props.theme.cardColor }}>
			<Tooltip title="Select">
				<IconButton
					className="themes-btn"
					style={{ color: props.theme.buttonColor }}
					onClick={() => handleClick(props.theme.name)}
				>
					<PaletteIcon />
				</IconButton>
			</Tooltip>

			<div className="color-box" style={{ backgroundColor: props.theme.blockColor1 }}></div>
			<div className="color-box" style={{ backgroundColor: props.theme.blockColor2 }}></div>
			<div className="color-box" style={{ backgroundColor: props.theme.blockColor3 }}></div>
		</li>
	);
};

export default ThemesListItem;
