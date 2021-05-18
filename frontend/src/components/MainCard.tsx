import { useState } from 'react';

import AddUrlForm from './AddUrlForm';
import IconButton from '@material-ui/core/IconButton';

const MainCard = () => {
	const [isVisible, setIsVisible] = useState(true);

	return (
		<div id="main-card">
			<header>
				<header>
					<h2>Wannabe Bitly</h2>
					<IconButton className="add-btn" onClick={() => setIsVisible(!isVisible)}>
						<i className="fas fa-plus-circle"></i>
					</IconButton>
				</header>
				{isVisible && <AddUrlForm />}
			</header>
			<ul>
				<li>A collection of url components</li>
				<li>A collection of url components</li>
			</ul>
		</div>
	);
};

export default MainCard;
