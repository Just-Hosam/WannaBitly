interface Props {
	data: Click;
}

interface Click {
	id: number;
	url_id: number;
	time: string;
	date: string;
}

const ClicksListItem = (props: Props) => {
	return (
		<tr className="clicks-list-item">
			<td>{props.data.time}</td>
			<td>{props.data.date}</td>
		</tr>
	);
};

export default ClicksListItem;
