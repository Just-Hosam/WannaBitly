import { useState } from 'react';

import CustomThemeForm from './CustomThemeForm';
import ThemesHeader from './ThemesHeader';
import ThemesList from './ThemesList';
import NotificationSnack from '../Main/NotificationSnack';

const ThemesCard = () => {
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [messageSnackBar, setMessageSnackBar] = useState('');

	return (
		<div id="themes">
			<ThemesHeader />
			<ThemesList setOpenSnackBar={setOpenSnackBar} setMessageSnackBar={setMessageSnackBar} />
			<CustomThemeForm setOpenSnackBar={setOpenSnackBar} setMessageSnackBar={setMessageSnackBar} />
			<NotificationSnack
				messageSnackBar={messageSnackBar}
				openSnackBar={openSnackBar}
				setOpenSnackBar={setOpenSnackBar}
			/>
		</div>
	);
};

export default ThemesCard;
