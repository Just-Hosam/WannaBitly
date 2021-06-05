import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import UrlCard from './UrlCard';
import AddUrlForm from './AddUrlForm';
import EditUrlForm from './EditUrlForm';
import MainHeader from './MainHeader';
import NewUserInstructions from './NewUserInstructions';
import NotificationSnack from './NotificationSnack';

interface Props {
	setAnalyticsId: React.Dispatch<React.SetStateAction<number>>;
}

interface Url {
	id: number;
	user_id: number;
	short_url: string;
	long_url: string;
	description: string;
}

const MainCard = (props: Props) => {
	const [cookies] = useCookies(['userId']);
	const [formMode, setFormMode] = useState('');
	const [urls, setUrls] = useState<Url[]>([]);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [messageSnackBar, setMessageSnackBar] = useState('');
	const [editableUrl, setEditableUrl] = useState<Url>({
		id: 0,
		user_id: 0,
		short_url: '',
		long_url: '',
		description: '',
	});
	const userId = cookies.userId;

	useEffect(() => {
		if (userId) {
			axios
				.get(`/users/${userId}/urls`)
				.then((res) => {
					if (res.data.length < 5) setFormMode('ADD');
					setUrls(res.data);
				})
				.catch((err) => console.log('Error at MainCard useEffect GET request', err));
		}
	}, [userId]);

	const urlsList = urls.map((elem) => (
		<UrlCard
			setEditableUrl={setEditableUrl}
			setAnalyticsId={props.setAnalyticsId}
			setFormMode={setFormMode}
			setUrls={setUrls}
			key={elem.id}
			data={elem}
		/>
	));

	let isNewUser = false;
	if (urls.length === 0) isNewUser = true;

	return (
		<div id="main-card">
			<header>
				<MainHeader formMode={formMode} setFormMode={setFormMode} />
				{formMode === 'EDIT' && (
					<EditUrlForm
						editableUrl={editableUrl}
						setEditableUrl={setEditableUrl}
						setUrls={setUrls}
						setFormMode={setFormMode}
						setOpenSnackBar={setOpenSnackBar}
						setMessageSnackBar={setMessageSnackBar}
					/>
				)}
				{formMode === 'ADD' && (
					<AddUrlForm
						setMessageSnackBar={setMessageSnackBar}
						setUrls={setUrls}
						setFormMode={setFormMode}
						setOpenSnackBar={setOpenSnackBar}
					/>
				)}
			</header>
			<ul>{urlsList}</ul>
			{isNewUser && <NewUserInstructions />}
			<NotificationSnack
				messageSnackBar={messageSnackBar}
				openSnackBar={openSnackBar}
				setOpenSnackBar={setOpenSnackBar}
			/>
		</div>
	);
};

export default MainCard;
