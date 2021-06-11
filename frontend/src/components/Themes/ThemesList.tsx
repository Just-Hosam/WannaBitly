import ThemesListItem from './ThemesListItem';

interface Props {
	setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
	setMessageSnackBar: React.Dispatch<React.SetStateAction<string>>;
}

interface ThemeCard {
	name: ThemeName;
	cardColor: string;
	buttonColor: string;
	blockColor1: string;
	blockColor2: string;
	blockColor3: string;
}

type ThemeName = 'default' | 'light' | 'dark';

const themeCardArr: ThemeCard[] = [
	{
		name: 'light',
		cardColor: '#fff',
		buttonColor: 'rgba(114, 114, 114, 0.932)',
		blockColor1: '#fafafa',
		blockColor2: 'rgb(96, 83, 247)',
		blockColor3: 'rgb(128, 118, 251)',
	},
	{
		name: 'default',
		cardColor: '#fff',
		buttonColor: 'rgba(114, 114, 114, 0.932)',
		blockColor1: '#202b3a',
		blockColor2: '#eec124',
		blockColor3: '#d3a500',
	},
	{
		name: 'dark',
		cardColor: '#2c303a',
		buttonColor: '#ccc',
		blockColor1: '#1f1f1f',
		blockColor2: '#e2a54a',
		blockColor3: '#d39a45',
	},
];

const ThemesList = (props: Props) => {
	const ThemesListComponents = themeCardArr.map((theme, themeIdx) => (
		<ThemesListItem
			key={themeIdx}
			theme={theme}
			setOpenSnackBar={props.setOpenSnackBar}
			setMessageSnackBar={props.setMessageSnackBar}
		/>
	));
	return <ul id="themes-list">{ThemesListComponents}</ul>;
};

export default ThemesList;
