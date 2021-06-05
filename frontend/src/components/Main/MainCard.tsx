import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import UrlCard from './UrlCard';
import AddUrlForm from './AddUrlForm';
import EditUrlForm from './EditUrlForm';
import MainHeader from './MainHeader';
import NewUserInstructions from './NewUserInstructions';
import NotificationSnack from './NotificationSnack';
import Spinner from '../Elements/Spinner';

interface Url {
	id: number;
	user_id: number;
	short_url: string;
	long_url: string;
	description: string;
}

const MainCard = () => {
	const [cookies] = useCookies(['userId']);
	const [formMode, setFormMode] = useState('');
	const [mode, setMode] = useState('LOADING');
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
					setMode(res.data.length === 0 ? 'NEWUSER' : 'DATA');
					setUrls(res.data);
				})
				.catch((err) => console.log('Error at MainCard useEffect GET request', err));
		}
	}, [userId]);

	const urlsList = urls.map((elem) => (
		<UrlCard
			setEditableUrl={setEditableUrl}
			setFormMode={setFormMode}
			setUrls={setUrls}
			key={elem.id}
			data={elem}
			setOpenSnackBar={setOpenSnackBar}
			setMessageSnackBar={setMessageSnackBar}
		/>
	));

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
			{mode === 'LOADING' && <Spinner />}
			{mode === 'DATA' && <ul>{urlsList}</ul>}
			{mode === 'NEWUSER' && <NewUserInstructions />}
			<NotificationSnack
				messageSnackBar={messageSnackBar}
				openSnackBar={openSnackBar}
				setOpenSnackBar={setOpenSnackBar}
			/>
		</div>
	);
};

export default MainCard;
