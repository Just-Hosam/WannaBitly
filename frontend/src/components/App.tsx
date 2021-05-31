import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import MainCard from './Main/MainCard';
import AnalyticsCard from './Analytics/AnalyticsCard';
import NotLoggedIn from './Main/NotLoggedIn';

function App() {
	const [cookies] = useCookies(['userId']);
	const [analyticsId, setAnalyticsId] = useState(0);
	const isLoggedIn = cookies.userId ? true : false;

	return (
		<div className="App">
			<NavBar />
			{!isLoggedIn && <NotLoggedIn />}
			<Router>
				<Switch>
					<Route path="/analytics">{isLoggedIn && <AnalyticsCard analyticsId={analyticsId} />}</Route>
					<Route path="/">{isLoggedIn && <MainCard setAnalyticsId={setAnalyticsId} />}</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
