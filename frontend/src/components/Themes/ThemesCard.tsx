import { useState } from 'react';

import CustomThemeForm from './CustomThemeForm';
import ThemesHeader from './ThemesHeader';
import ThemesList from './ThemesList';
import NotificationSnack from '../Main/NotificationSnack';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ChromePicker } from 'react-color';

const ThemesCard = () => {
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [messageSnackBar, setMessageSnackBar] = useState('');
	const [color, setColor] = useState('#202b3a');

	const handleChange = (newColor: any) => setColor(newColor.hex);

	return (
		<div id="themes-cont">
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
			<div id="color-picker-card">
				<h3>Pick your Colors</h3>
				<p>Choose the color you want then copy paste it into you desired field.</p>
				<div id="copy-color">
					<span>{color}</span>
					<CopyToClipboard text={color}>
						<Tooltip title="Copy to Clipboard">
							<IconButton className="copy-btn">
								<FileCopyIcon />
							</IconButton>
						</Tooltip>
					</CopyToClipboard>
				</div>
				<ChromePicker color={color} onChange={handleChange} />
			</div>
		</div>
	);
};

export default ThemesCard;
