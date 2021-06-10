import IconButton from '@material-ui/core/IconButton';
import PaletteIcon from '@material-ui/icons/Palette';

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
}

type ThemeName = 'default' | 'light' | 'dark';

const ThemesListItem = (props: Props) => {
	const handleClick = (themeName: ThemeName) => {
		localStorage.setItem('theme', JSON.stringify(themes[themeName]));
		applyTheme(themes[themeName]);
	};

	return (
		<li id="themes-list-item" style={{ backgroundColor: props.theme.cardColor }}>
			<IconButton
				className="themes-btn"
				style={{ color: props.theme.buttonColor }}
				onClick={() => handleClick(props.theme.name)}
			>
				<PaletteIcon />
			</IconButton>
			<div className="color-box" style={{ backgroundColor: props.theme.blockColor1 }}></div>
			<div className="color-box" style={{ backgroundColor: props.theme.blockColor2 }}></div>
			<div className="color-box" style={{ backgroundColor: props.theme.blockColor3 }}></div>
		</li>
	);
};

export default ThemesListItem;
