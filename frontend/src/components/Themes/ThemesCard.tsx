import CustomThemeForm from './CustomThemeForm';
import ThemesHeader from './ThemesHeader';
import ThemesList from './ThemesList';

const ThemesCard = () => {
	return (
		<div id="themes">
			<ThemesHeader />
			<ThemesList />
			<CustomThemeForm />
		</div>
	);
};

export default ThemesCard;
