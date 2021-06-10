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
				<Line type="monotone" dataKey="clicks" stroke="var(--accent-color)" />
				<CartesianGrid stroke="var(--text-color-icon)" />
				<XAxis dataKey="month" tickMargin={10} stroke="var(--text-color-alt)" />
				<YAxis tickMargin={5} allowDecimals={false} stroke="var(--text-color-alt)" />
				<Tooltip />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default AnalyticsLineChart;
