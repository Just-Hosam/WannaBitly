import ClicksListItem from './ClicksListItem';

interface Props {
	clicksData: Click[];
}

interface Click {
	id: number;
	url_id: number;
	time: string;
	date: string;
	city: string;
	country: string;
}

const ClicksList = (props: Props) => {
	const clicksComponents = props.clicksData.map((elem) => <ClicksListItem key={elem.id} data={elem} />);

	return (
		<div id="clicks-list-cont">
			<table id="clicks-list">
				<tr>
					<th>Time</th>
					<th>Date</th>
					<th>City</th>
					<th>Country</th>
				</tr>
				{clicksComponents}
			</table>
		</div>
	);
};

export default ClicksList;
