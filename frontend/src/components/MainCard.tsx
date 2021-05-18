import { useState, useEffect } from 'react';
import axios from 'axios';

import UrlCard from './UrlCard';
import AddUrlForm from './AddUrlForm';
import IconButton from '@material-ui/core/IconButton';

interface Url {
	id: number;
	user_id: number;
	short_url: string;
	long_url: string;
	description: string;
}

const MainCard = () => {
	const userId = 1;
	const [isVisible, setIsVisible] = useState(true);
	const [urls, setUrls] = useState<Url[]>([]);

	useEffect(() => {
		axios
			.get(`/users/${userId}/urls`)
			.then((res) => setUrls(res.data))
			.catch((err) => console.log('Error at MainCard useEffect GET request', err));
	}, []);

	const urlsList = urls.map((elem) => <UrlCard setUrls={setUrls} key={elem.id} data={elem} />);

	return (
		<div id="main-card">
			<header>
				<header>
					<h2>Urls</h2>
					<IconButton className="add-btn" onClick={() => setIsVisible(!isVisible)}>
						<i className="fas fa-plus-circle"></i>
					</IconButton>
				</header>
				{isVisible && <AddUrlForm setUrls={setUrls} setIsVisible={setIsVisible} />}
			</header>
			<ul>{urlsList}</ul>
		</div>
	);
};

export default MainCard;
