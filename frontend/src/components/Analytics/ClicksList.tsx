import ClicksListItem from './ClicksListItem';

interface Props {
	clicksData: Click[];
}

interface Click {
	id: number;
	url_id: number;
	timestamp: number;
}

const ClicksList = (props: Props) => {
	const clicksComponents = props.clicksData.map((elem) => <ClicksListItem key={elem.id} clickData={elem} />);

	return (
		<div id="clicks-list-cont">
			<table id="clicks-list">
				<thead>
					<tr>
						<th>Time</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>{clicksComponents}</tbody>
			</table>
		</div>
	);
};

export default ClicksList;
