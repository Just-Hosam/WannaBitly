import axios from 'axios';

import IconButton from '@material-ui/core/IconButton';

interface Props {
	data: Url;
	setUrls: React.Dispatch<React.SetStateAction<Url[]>>;
}

interface Url {
	id: number;
	user_id: number;
	short_url: string;
	long_url: string;
	description: string;
}

const UrlCard = (props: Props) => {
	const userId = 1;

	const handleCopy = () => {
		navigator.clipboard.writeText(props.data.short_url);
	};

	const handleDelete = () => {
		axios
			.delete(`/users/${userId}/urls/${props.data.id}`)
			.then(() => {
				props.setUrls((prev) => {
					return prev.filter((elem: Url): boolean => elem.id !== props.data.id);
				});
			})
			.catch((err) => console.log(`err`, err));
	};

	return (
		<li className="url-card">
			{props.data.description && <p>{props.data.description}</p>}
			{!props.data.description && (
				<div className="urls-cont">
					<p>{props.data.short_url}</p>
					<span>{props.data.long_url}</span>
				</div>
			)}
			<div>
				<IconButton onClick={handleCopy} className="urls-btns" aria-label="copy">
					<i className="fas fa-copy"></i>
				</IconButton>
				<IconButton className="urls-btns" aria-label="edit">
					<i className="fas fa-pen"></i>
				</IconButton>
				<IconButton onClick={handleDelete} className="urls-btns" aria-label="delete">
					<i className="fas fa-trash"></i>
				</IconButton>
				<IconButton className="urls-btns analytics-btn" aria-label="analytics">
					<i className="fas fa-chart-pie"></i>
				</IconButton>
			</div>
		</li>
	);
};

export default UrlCard;
