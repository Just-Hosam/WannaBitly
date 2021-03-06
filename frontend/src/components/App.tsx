import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import MainCard from './Main/MainCard';
import AnalyticsCard from './Analytics/AnalyticsCard';
import NotLoggedIn from './Main/NotLoggedIn';
import ThemesCard from './Themes/ThemesCard';

import applyTheme from '../helpers/applyTheme';

function App() {
	const [cookies] = useCookies(['userId']);
	const isLoggedIn = cookies.userId ? true : false;

	useEffect(() => {
		const theme = localStorage.getItem('theme');
		const currentTheme = localStorage.getItem('currentTheme');
		const customTheme = localStorage.getItem('customTheme');
		if ((theme === 'default' || theme === 'light' || theme === 'dark') && currentTheme) {
			applyTheme(JSON.parse(currentTheme));
		} else if (theme === 'custom' && customTheme) {
			applyTheme(JSON.parse(customTheme));
		}
	}, []);

	return (
		<div className="App">
			<Router>
				<NavBar />
				{!isLoggedIn && <NotLoggedIn />}
				<Switch>
					<Route path="/analytics/:urlId">{isLoggedIn && <AnalyticsCard />}</Route>
					<Route path="/themes">{isLoggedIn && <ThemesCard />}</Route>
					<Route path="/">{isLoggedIn && <MainCard />}</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
