import { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const AddUrlForm = () => {
	const [addForm, setAddForm] = useState({
		long_url: '',
		description: '',
	});

	const handleChange = (value: string, textType: string) => {
		setAddForm((prev) => {
			return {
				...prev,
				[textType]: value,
			};
		});
	};

	return (
		<form id="add-url-form">
			<TextField
				label="Long Url"
				variant="outlined"
				className="add-url-textfield"
				fullWidth
				size="small"
				value={addForm.long_url}
				onChange={(e) => handleChange(e.target.value, 'long_url')}
			/>
			<TextField
				label="Description"
				variant="outlined"
				className="add-url-textfield"
				fullWidth
				size="small"
				value={addForm.description}
				onChange={(e) => handleChange(e.target.value, 'description')}
			/>
			<div id="add-url-btns">
				<Button className="add-url-cancel" variant="contained">
					Cancel
				</Button>
				<Button className="add-url-submit" variant="contained">
					Submit
				</Button>
			</div>
		</form>
	);
};

export default AddUrlForm;
