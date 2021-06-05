interface Click {
	id: number;
	url_id: number;
	time: string;
	date: string;
}

interface DataPoint {
	month: string;
	clicks: number;
}

const chartDataFormatter = (clicksData: Click[]): DataPoint[] => {
	const monthArr: string[] = [];
	const resultArr: DataPoint[] = [];

	for (const click of clicksData) {
		const dateArr = click.date.split('/');
		const monthPart = monthNameGen(Number(dateArr[1]));
		const yearPart = dateArr[2][2] + dateArr[2][3];
		const month = `${monthPart} ${yearPart}`;

		monthArr.push(month);
	}

	for (const month of monthArr) {
		let isFound = false;
		if (resultArr.length === 0) resultArr.push({ month, clicks: 0 });

		for (const dataPoint of resultArr) {
			if (month === dataPoint.month) {
				dataPoint.clicks++;
				isFound = true;
				break;
			}
		}

		if (!isFound) resultArr.push({ month, clicks: 1 });
	}

	return resultArr.reverse();
};

const monthNameGen = (monthNum: number): string => {
	if (monthNum === 1) return 'Jan';
	if (monthNum === 2) return 'Feb';
	if (monthNum === 3) return 'Mar';
	if (monthNum === 4) return 'Apr';
	if (monthNum === 5) return 'May';
	if (monthNum === 6) return 'Jun';
	if (monthNum === 7) return 'Jul';
	if (monthNum === 8) return 'Aug';
	if (monthNum === 9) return 'Sep';
	if (monthNum === 10) return 'Oct';
	if (monthNum === 11) return 'Nov';
	return 'Dec';
};

export default chartDataFormatter;
