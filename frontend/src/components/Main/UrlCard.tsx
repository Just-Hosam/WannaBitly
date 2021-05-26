import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useHistory } from 'react-router-dom';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

interface Props {
	data: Url;
	setUrls: React.Dispatch<React.SetStateAction<Url[]>>;
	setFormMode: React.Dispatch<React.SetStateAction<string>>;
	setEditableUrl: React.Dispatch<React.SetStateAction<Url>>;
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
	let history = useHistory();

	const handleEdit = (updatedUrl: Url) => {
		props.setFormMode('EDIT');
		props.setEditableUrl(updatedUrl);
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

	const handleAnalytics = () => {
		history.push('/analytics');
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
			<div className="urls-card-icons">
				<CopyToClipboard text={props.data.short_url}>
					<Tooltip title="Copy to Clipboard">
						<IconButton className="urls-btns" aria-label="copy">
							<i className="fas fa-copy"></i>
						</IconButton>
					</Tooltip>
				</CopyToClipboard>
				<Tooltip title="Edit">
					<IconButton onClick={() => handleEdit(props.data)} className="urls-btns" aria-label="edit">
						<i className="fas fa-pen"></i>
					</IconButton>
				</Tooltip>
				<Tooltip title="Delete">
					<IconButton onClick={handleDelete} className="urls-btns" aria-label="delete">
						<i className="fas fa-trash"></i>
					</IconButton>
				</Tooltip>
				<Tooltip title="Analytics">
					<IconButton onClick={handleAnalytics} className="urls-btns analytics-btn" aria-label="analytics">
						<i className="fas fa-chart-pie"></i>
					</IconButton>
				</Tooltip>
			</div>
		</li>
	);
};

export default UrlCard;
