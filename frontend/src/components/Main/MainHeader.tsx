import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

interface Props {
	formMode: string;
	setFormMode: React.Dispatch<React.SetStateAction<string>>;
}

const MainHeader = (props: Props) => {
	const handleAddButton = (currentMode: string) => {
		if (currentMode === '' || currentMode === 'EDIT') props.setFormMode('ADD');
		if (currentMode === 'ADD') props.setFormMode('');
	};

	return (
		<header>
			{props.formMode === '' && <h2>Urls</h2>}
			{props.formMode === 'ADD' && <h2>Add Url</h2>}
			{props.formMode === 'EDIT' && <h2>Edit Url</h2>}
			<IconButton className="add-btn" onClick={() => handleAddButton(props.formMode)}>
				<AddIcon />
			</IconButton>
		</header>
	);
};

export default MainHeader;
