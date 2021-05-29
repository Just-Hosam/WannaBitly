import { useState, useEffect } from 'react';
import axios from 'axios';
import chartDataFormatter from '../../helpers/chartDataFormatter';

import AnalyticsHeader from './AnalyticsHeader';
import AnalyticsLineChart from './AnalyticsLineChart';
import ClicksList from './ClicksList';
import NoClicksData from './NoClicksData';

interface Props {
	analyticsId: number;
}

interface Click {
	id: number;
	url_id: number;
	time: string;
	date: string;
	city: string;
	country: string;
}

const AnalyticsCard = (props: Props) => {
	const userId = 1;
	const urlId = props.analyticsId;
	const [clicksData, setClicksData] = useState<Click[]>([]);

	useEffect(() => {
		axios
			.get(`/users/${userId}/urls/${urlId}/clicks`)
			.then((res) => setClicksData(res.data))
			.catch((err: Error) => console.log(err));
	}, [urlId]);

	const isNotVisited = clicksData.length === 0 ? true : false;
	console.log(`urlId`, urlId);

	return (
		<div id="analytics-card">
			<AnalyticsHeader />
			{isNotVisited && <NoClicksData />}
			{!isNotVisited && <AnalyticsLineChart clicksChartData={chartDataFormatter(clicksData)} />}
			{!isNotVisited && <ClicksList clicksData={clicksData} />}
		</div>
	);
};

export default AnalyticsCard;
