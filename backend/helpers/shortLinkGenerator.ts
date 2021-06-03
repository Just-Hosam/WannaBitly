const shortLinkGenerator = (): string => {
	let randomStr = 'www.wbtly.ca/s/';
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * chars.length);
		randomStr += chars[randomIndex];
	}

	return randomStr;
};

export default shortLinkGenerator;
