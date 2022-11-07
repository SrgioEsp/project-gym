import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TraineesPage from './pages/TraineesPage';
import NotFoundPage from './pages/NotFoundPage';
import TraineePage from './pages/TraineePage';

import './App.css';
import { AppContext } from './contexts/AppContext';

function App() {
	const [user, setUser] = useState(null);
	const [trainees, setTrainees] = useState([]);
	const [loading, setLoading] = useState(false);

	return (
		<AppContext.Provider value={{ user, setUser, trainees, setTrainees }}>
			<p>Project GYM</p>
			<Router>
				<Routes>
					<Route path='/' element={<WelcomePage></WelcomePage>} />
					<Route path='/login' element={<LoginPage></LoginPage>} />
					{user && (
						<Route
							path='/home'
							element={
								<MainPage spinner={loading} setLoading={setLoading}></MainPage>
							}
						/>
					)}
					{user && (
						<Route
							path='/trainees'
							element={<TraineesPage spinner={loading}></TraineesPage>}
						/>
					)}
					{user && (
						<Route path='/trainees/new' element={<TraineePage></TraineePage>} />
					)}
					{/* <Route path='/trainees/:id' element={<TraineePage></TraineePage>} />F */}
					<Route path='*' element={<NotFoundPage></NotFoundPage>} />
				</Routes>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
