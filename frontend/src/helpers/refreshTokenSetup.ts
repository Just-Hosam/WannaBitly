// no idea how to type res
const refreshTokenSetup = (res: any) => {
	let refreshTime = (res.tokenObj.exprires_in || 3600 - 5 * 60) * 1000;

	const refreshToken = async () => {
		const newAuthRes = await res.reloadAuthResponse();
		refreshTime = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

		setTimeout(refreshToken, refreshTime);
	};
	setTimeout(refreshToken, refreshTime);
};

export default refreshTokenSetup;
