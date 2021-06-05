import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import chartDataFormatter from '../../helpers/chartDataFormatter';

import AnalyticsHeader from './AnalyticsHeader';
import AnalyticsLineChart from './AnalyticsLineChart';
import ClicksList from './ClicksList';
import NoClicksData from './NoClicksData';
import TotalClicks from './TotalClicks';

interface Params {
	urlId: string;
}

interface Click {
	id: number;
	url_id: number;
	time: string;
	date: string;
}

const AnalyticsCard = () => {
	const [cookies] = useCookies(['userId']);
	const [clicksData, setClicksData] = useState<Click[]>([]);
	const { urlId } = useParams<Params>();
	const userId = cookies.userId;

	useEffect(() => {
		axios
			.get(`/users/${userId}/urls/${urlId}/clicks`)
			.then((res) => setClicksData(res.data))
			.catch((err: Error) => console.log(err));
	}, [urlId, userId]);

	const isNotVisited = clicksData.length === 0 ? true : false;

	return (
		<div id="analytics-card">
			<AnalyticsHeader />
			{isNotVisited && <NoClicksData />}
			{!isNotVisited && <AnalyticsLineChart clicksChartData={chartDataFormatter(clicksData)} />}
			{!isNotVisited && (
				<div id="click-data-cont">
					<TotalClicks clicksNum={clicksData.length} />
					<ClicksList clicksData={clicksData} />
				</div>
			)}
		</div>
	);
};

export default AnalyticsCard;
