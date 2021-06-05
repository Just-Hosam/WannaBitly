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

	const time = `${timeArr[0]}:${timeArr[1]} ${timeArr[2][3]}${timeArr[2][4]}`;
	const date = convertedDateObj.toLocaleDateString();

	return {
		time,
		date,
	};
};

export default tableDataFormatter;
