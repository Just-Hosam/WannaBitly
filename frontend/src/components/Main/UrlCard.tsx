import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AssessmentIcon from '@material-ui/icons/Assessment';

interface Props {
	data: Url;
	setUrls: React.Dispatch<React.SetStateAction<Url[]>>;
	setFormMode: React.Dispatch<React.SetStateAction<string>>;
	setEditableUrl: React.Dispatch<React.SetStateAction<Url>>;
	setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
	setMessageSnackBar: React.Dispatch<React.SetStateAction<string>>;
}

interface Url {
	id: number;
	user_id: number;
	short_url: string;
	long_url: string;
	description: string;
}

const UrlCard = (props: Props) => {
	const [cookies] = useCookies(['userId']);
	const userId = cookies.userId;
	let history = useHistory();

	const handleEdit = (updatedUrl: Url) => {
		props.setFormMode('EDIT');
		props.setEditableUrl(updatedUrl);
	};

	const handleDelete = () => {
		axios
			.delete(`/users/${userId}/urls/${props.data.id}`)
			.then(() => {
				props.setOpenSnackBar(true);
				props.setMessageSnackBar('URL deleted');
				props.setUrls((prev) => {
					return prev.filter((elem: Url): boolean => elem.id !== props.data.id);
				});
			})
			.catch((err) => console.log(`err`, err));
	};

	const handleAnalytics = () => {
		history.push(`/analytics/${props.data.id}`);
	};

	const handleCopy = () => {
		props.setOpenSnackBar(true);
		props.setMessageSnackBar('URL copied');
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
				<CopyToClipboard text={props.data.short_url} onCopy={handleCopy}>
					<Tooltip title="Copy to Clipboard">
						<IconButton className="urls-btns" aria-label="copy">
							<FileCopyIcon />
						</IconButton>
					</Tooltip>
				</CopyToClipboard>
				<Tooltip title="Edit">
					<IconButton onClick={() => handleEdit(props.data)} className="urls-btns" aria-label="edit">
						<EditIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Delete">
					<IconButton onClick={handleDelete} className="urls-btns" aria-label="delete">
						<DeleteIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Analytics">
					<IconButton onClick={handleAnalytics} className="urls-btns analytics-btn" aria-label="analytics">
						<AssessmentIcon />
					</IconButton>
				</Tooltip>
			</div>
		</li>
	);
};

export default UrlCard;
