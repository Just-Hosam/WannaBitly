import tableDataFormatter from '../../helpers/tableDataFormatter';

interface Props {
	clickData: Click;
}

interface Click {
	id: number;
	url_id: number;
	timestamp: number;
}

const ClicksListItem = (props: Props) => {
	const { time, date } = tableDataFormatter(props.clickData);

	return (
		<tr className="clicks-list-item">
			<td>{time}</td>
			<td>{date}</td>
		</tr>
	);
};

export default ClicksListItem;
