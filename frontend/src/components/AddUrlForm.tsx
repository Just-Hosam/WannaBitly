import axios from 'axios';
import { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface Props {
	setUrls: React.Dispatch<React.SetStateAction<Url[]>>;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Url {
	id: number;
	user_id: number;
	short_url: string;
	long_url: string;
	description: string;
}

const AddUrlForm = (props: Props) => {
	const userId = 1;

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

	const handleSubmit = () => {
		console.log('testing hereee');
		const urlObj = addForm;
		axios
			.post(`/users/${userId}/urls`, urlObj)
			.then((res) => props.setUrls((prev) => [res.data, ...prev]))
			.catch((err) => console.log(`Error at HandleSubmit`, err));
	};

	return (
		<form id="add-url-form" onSubmit={() => handleSubmit()}>
			<TextField
				label="Long Url"
				variant="outlined"
				className="add-url-textfield"
				fullWidth
				required
				type="url"
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
				<Button onClick={() => props.setIsVisible(false)} className="add-url-cancel" variant="contained">
					Cancel
				</Button>
				<Button type="submit" className="add-url-submit" variant="contained">
					Submit
				</Button>
			</div>
		</form>
	);
};

export default AddUrlForm;
