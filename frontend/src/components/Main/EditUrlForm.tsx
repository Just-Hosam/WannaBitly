import axios from 'axios';
import { useCookies } from 'react-cookie';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface Props {
	setUrls: React.Dispatch<React.SetStateAction<Url[]>>;
	setFormMode: React.Dispatch<React.SetStateAction<string>>;
	editableUrl: Url;
	setEditableUrl: React.Dispatch<React.SetStateAction<Url>>;
}

interface Url {
	id: number;
	user_id: number;
	short_url: string;
	long_url: string;
	description: string;
}

const EditUrlForm = (props: Props) => {
	const [cookies] = useCookies(['userId']);
	const userId = cookies.userId;

	const handleChange = (value: string, textType: string) => {
		props.setEditableUrl((prev) => {
			return {
				...prev,
				[textType]: value,
			};
		});
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		axios
			.patch(`/users/${userId}/urls/${props.editableUrl.id}`, props.editableUrl)
			.then((res) => {
				props.setUrls((prev) => {
					return prev.map((elem) => {
						if (elem.id === props.editableUrl.id) return res.data;
						return elem;
					});
				});
			})
			.catch((err) => console.log(`Error at HandleSubmit`, err));
	};

	return (
		<form id="add-url-form">
			<TextField
				label="Long Url"
				variant="outlined"
				className="add-url-textfield"
				fullWidth
				required
				type="url"
				size="small"
				value={props.editableUrl.long_url}
				onChange={(e) => handleChange(e.target.value, 'long_url')}
			/>
			<TextField
				label="Description"
				variant="outlined"
				className="add-url-textfield"
				fullWidth
				size="small"
				value={props.editableUrl.description}
				onChange={(e) => handleChange(e.target.value, 'description')}
			/>
			<div id="add-url-btns">
				<Button onClick={() => props.setFormMode('')} className="add-url-cancel" variant="contained">
					Cancel
				</Button>
				<Button onClick={(e) => handleSubmit(e)} type="submit" className="add-url-submit" variant="contained">
					Update
				</Button>
			</div>
		</form>
	);
};

export default EditUrlForm;
