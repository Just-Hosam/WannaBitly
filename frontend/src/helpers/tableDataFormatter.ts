interface Click {
	id: number;
	url_id: number;
	timestamp: number;
}

interface DataPoint {
	time: string;
	date: string;
}

const tableDataFormatter = (click: Click): DataPoint => {
	const convertedDateObj = new Date(Number(click.timestamp));
	const convertedTime = convertedDateObj.toLocaleTimeString();
	const timeArr = convertedTime.split(':');

	const date = convertedDateObj.toLocaleDateString();
	let time = `${timeArr[0]}:${timeArr[1]}`;
	time += Number(timeArr[0]) > 12 ? null : ` ${timeArr[2][3]}${timeArr[2][4]}`;

	return {
		time,
		date,
	};
};

export default tableDataFormatter;
