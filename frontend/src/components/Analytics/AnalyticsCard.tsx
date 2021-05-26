import { useState, useEffect } from 'react';
import axios from 'axios';

import AnalyticsHeader from './AnalyticsHeader';
import AnalyticsLineChart from './AnalyticsLineChart';
import ClicksList from './ClicksList';

interface Click {
	id: number;
	url_id: number;
	time: string;
	date: string;
	city: string;
	country: string;
}

const clicksChartData = [
	{ month: 'Jan 21', clicks: 15 },
	{ month: 'Feb 21', clicks: 18 },
	{ month: 'Mar 21', clicks: 21 },
	{ month: 'Apr 21', clicks: 10 },
	{ month: 'May 21', clicks: 20 },
	{ month: 'Jun 21', clicks: 10 },
	{ month: 'Jul 21', clicks: 25 },
	{ month: 'Aug 21', clicks: 12 },
	{ month: 'Sep 21', clicks: 19 },
];

const AnalyticsCard = () => {
	const userId = 1;
	const urlId = 1;
	const [clicksData, setClicksData] = useState<Click[]>([]);

	useEffect(() => {
		axios
			.get(`/users/${userId}/urls/${urlId}/clicks`)
			.then((res) => setClicksData(res.data))
			.catch((err: Error) => console.log(err));
	}, []);

	return (
		<div id="analytics-card">
			<AnalyticsHeader />
			<AnalyticsLineChart clicksChartData={clicksChartData} />
			<ClicksList clicksData={clicksData} />
		</div>
	);
};

export default AnalyticsCard;
