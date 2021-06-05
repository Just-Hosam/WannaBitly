interface Props {
	clicksNum: number;
}

const TotalClicks = (props: Props) => {
	return (
		<div id="total-clicks">
			<h3>Total Clicks</h3>
			<p>{props.clicksNum}</p>
		</div>
	);
};

export default TotalClicks;
