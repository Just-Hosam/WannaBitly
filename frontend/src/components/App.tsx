import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import MainCard from './Main/MainCard';
import AnalyticsCard from './Analytics/AnalyticsCard';

function App() {
	const [analyticsId, setAnalyticsId] = useState(0);

	return (
		<div className="App">
			<NavBar />
			<Router>
				<Switch>
					<Route path="/analytics">
						<AnalyticsCard analyticsId={analyticsId} />
					</Route>
					<Route path="/">
						<MainCard setAnalyticsId={setAnalyticsId} />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
