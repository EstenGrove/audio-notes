import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import EditNotePage from "./pages/EditNotePage";
import Navbar from "./components/shared/Navbar";

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<header className="App-header">
					<h1 className="App_header_title">Audio Notes</h1>
				</header>
				<main className="App_main">
					<Switch>
						<Route path="/notes/:id" component={EditNotePage} />
						<Route path="/" component={HomePage} />
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
