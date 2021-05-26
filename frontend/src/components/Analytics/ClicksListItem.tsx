interface Props {
	data: Click;
}

interface Click {
	id: number;
	url_id: number;
	time: string;
	date: string;
	city: string;
	country: string;
}

const ClicksListItem = (props: Props) => {
	return (
		<tr className="clicks-list-item">
			<td>{props.data.time}</td>
			<td>{props.data.date}</td>
			<td>{props.data.city}</td>
			<td>{props.data.country}</td>
		</tr>
	);
};

export default ClicksListItem;
