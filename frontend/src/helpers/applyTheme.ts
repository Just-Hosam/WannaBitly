const applyTheme = (colorsObj: any): void => {
	for (const color in colorsObj) {
		document.documentElement.style.setProperty(color, colorsObj[color]);
	}
};

export default applyTheme;
