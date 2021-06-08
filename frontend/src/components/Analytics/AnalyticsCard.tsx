import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import io from 'socket.io-client';
import axios from 'axios';

// Helper
import chartDataFormatter from '../../helpers/chartDataFormatter';

// Components
import AnalyticsHeader from './AnalyticsHeader';
import AnalyticsLineChart from './AnalyticsLineChart';
import ClicksList from './ClicksList';
import NoClicksData from './NoClicksData';
import TotalClicks from './TotalClicks';
import Spinner from '../Elements/Spinner';

// Socket
const socket = io('https://wannabitly.herokuapp.com/');

// Types
interface Params {
	urlId: string;
}

interface Click {
	id: number;
	url_id: number;
	timestamp: number;
}

const AnalyticsCard = () => {
	const [cookies] = useCookies(['userId']);
	const [clicksData, setClicksData] = useState<Click[]>([]);
	const [mode, setmode] = useState('LOADING');
	const { urlId } = useParams<Params>();
	const userId = cookies.userId;

	useEffect(() => {
		socket.on('click', (click) => setClicksData((prev) => [click, ...prev]));
		axios
			.get(`/users/${userId}/urls/${urlId}/clicks`)
			.then((res) => {
				setClicksData(res.data);
				setmode(res.data.length === 0 ? 'NOTVISITED' : 'DATA');
			})
			.catch((err: Error) => console.log(err));
	}, [urlId, userId]);

	return (
		<div id="analytics-card">
			<AnalyticsHeader />
			{mode === 'LOADING' && <Spinner />}
			{mode === 'NOTVISITED' && <NoClicksData />}
			{mode === 'DATA' && <AnalyticsLineChart clicksChartData={chartDataFormatter(clicksData, isMobile)} />}
			{mode === 'DATA' && (
				<div id="click-data-cont">
					<TotalClicks clicksNum={clicksData.length} />
					<ClicksList clicksData={clicksData} />
				</div>
			)}
		</div>
	);
};

export default AnalyticsCard;
