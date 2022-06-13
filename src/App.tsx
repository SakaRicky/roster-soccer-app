import React from "react";
import "./App.css";
import { Container } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StateProvider } from "./state";
import { TeamManagement, FormationOverview } from "./Pages";

function App() {
	return (
		<StateProvider>
			<BrowserRouter>
				<Container>
					<div className="App bg-dark text-normal p-12 h-screen">
						<Routes>
							<Route index element={<TeamManagement />} />
							<Route path="field" element={<FormationOverview />} />
							{/* <div className="p-6"></div> */}
						</Routes>
					</div>
				</Container>
			</BrowserRouter>
		</StateProvider>
	);
}

export default App;
