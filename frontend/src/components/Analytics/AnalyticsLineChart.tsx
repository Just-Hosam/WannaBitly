import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
	clicksChartData: DataPoint[];
}

interface DataPoint {
	month: string;
	clicks: number;
}

const AnalyticsLineChart = (props: Props) => {
	return (
		<ResponsiveContainer width="100%" height={175}>
			<LineChart data={props.clicksChartData} margin={{ top: 0, right: 45, left: 0, bottom: 0 }}>
				<Line type="monotone" dataKey="clicks" stroke="#8884d8" />
				<CartesianGrid stroke="#ccc" />
				<XAxis dataKey="month" tickMargin={10} />
				<YAxis tickMargin={5} allowDecimals={false} />
				<Tooltip />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default AnalyticsLineChart;
