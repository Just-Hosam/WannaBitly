import { useState, useEffect } from 'react';

import IconButton from '@material-ui/core/IconButton';
import PaletteIcon from '@material-ui/icons/Palette';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import applyTheme from '../../helpers/applyTheme';
import themes from '../../helpers/themesColors';

interface Props {
	setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
	setMessageSnackBar: React.Dispatch<React.SetStateAction<string>>;
}

interface Theme {
	'--background-color': string;
	'--card-color': string;
	'--accent-color': string;
	'--accent-color-alt': string;
	'--text-color': string;
	'--text-color-alt': string;
	'--text-color-button': string;
	'--text-color-userDetails': string;
}

const CustomThemeForm = (props: Props) => {
	const [customTheme, setCustomTheme] = useState<Theme>({
		'--background-color': '',
		'--card-color': '',
		'--accent-color': '',
		'--accent-color-alt': '',
		'--text-color': '',
		'--text-color-alt': '',
		'--text-color-button': '',
		'--text-color-userDetails': '',
	});

	useEffect(() => {
		const customThemeObj = localStorage.getItem('customTheme');
		if (customThemeObj) {
			setCustomTheme(JSON.parse(customThemeObj));
		} else {
			setCustomTheme(themes.default);
		}
	}, []);

	const handleChange = (key: string, value: string) => {
		setCustomTheme((prev) => {
			return {
				...prev,
				[key]: value,
			};
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		localStorage.setItem('customTheme', JSON.stringify(customTheme));
		const isSelected = localStorage.getItem('theme') === 'custom';
		if (isSelected) applyTheme(customTheme);
		props.setMessageSnackBar('Theme Saved');
		props.setOpenSnackBar(true);
	};

	const handleClick = () => {
		localStorage.setItem('theme', 'custom');
		applyTheme(customTheme);
		props.setMessageSnackBar('Theme Selected');
		props.setOpenSnackBar(true);
	};

	return (
		<form id="custom-theme-form" onSubmit={(e) => handleSubmit(e)}>
			<div id="theme-form-btns">
				<Tooltip title="Select">
					<IconButton className="themes-btn" onClick={handleClick}>
						<PaletteIcon />
					</IconButton>
				</Tooltip>
				<Button variant="contained" id="custom-submit-btn" type="submit">
					Save
				</Button>
			</div>
			<div id="custom-theme-inputs">
				<TextField
					required
					size="small"
					className="custom-form-input"
					label="Background Color"
					value={customTheme['--background-color']}
					onChange={(e) => handleChange('--background-color', e.target.value)}
				/>
				<TextField
					required
					size="small"
					className="custom-form-input"
					label="Card Color"
					value={customTheme['--card-color']}
					onChange={(e) => handleChange('--card-color', e.target.value)}
				/>
				<TextField
					required
					size="small"
					className="custom-form-input"
					label="Accent Color"
					value={customTheme['--accent-color']}
					onChange={(e) => handleChange('--accent-color', e.target.value)}
				/>
				<TextField
					required
					size="small"
					className="custom-form-input"
					label="Alt Accent Color"
					value={customTheme['--accent-color-alt']}
					onChange={(e) => handleChange('--accent-color-alt', e.target.value)}
				/>
				<TextField
					required
					size="small"
					className="custom-form-input"
					label="Text Color"
					value={customTheme['--text-color']}
					onChange={(e) => handleChange('--text-color', e.target.value)}
				/>
				<TextField
					required
					size="small"
					className="custom-form-input"
					label="Alt Text Color"
					value={customTheme['--text-color-alt']}
					onChange={(e) => handleChange('--text-color-alt', e.target.value)}
				/>
				<TextField
					required
					size="small"
					className="custom-form-input"
					label="Button Text Color"
					value={customTheme['--text-color-button']}
					onChange={(e) => handleChange('--text-color-button', e.target.value)}
				/>
				<TextField
					required
					size="small"
					className="custom-form-input"
					label="User Info Color"
					value={customTheme['--text-color-userDetails']}
					onChange={(e) => handleChange('--text-color-userDetails', e.target.value)}
				/>
			</div>
		</form>
	);
};

export default CustomThemeForm;
