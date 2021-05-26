import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import MainCard from './Main/MainCard';
import AnalyticsCard from './Analytics/AnalyticsCard';

function App() {
	return (
		<div className="App">
			<NavBar />
			<Router>
				<Switch>
					<Route path="/analytics" component={AnalyticsCard} />
					<Route path="/" component={MainCard} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
