import React, { useState, useEffect } from 'react';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TraineesPage from './pages/TraineesPage';
import NotFoundPage from './pages/NotFoundPage';
import TraineePage from './pages/TraineePage';
import SessionsPage from './pages/SessionsPage';
import { AppContext } from './contexts/AppContext';
import { storage } from './storage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { getUserById } from './actions/UserActions';

function App() {
	const [user, setUser] = useState(null);
	const [trainees, setTrainees] = useState([]);
	const [sessions, setSessions] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (storage.get('user_session')) {
			if (!user) {
				getUserById(storage.get('user_session').id).then((res) => {
					setUser(res);
				});
			}
		}
	}, []);

	return (
		<AppContext.Provider
			value={{ user, setUser, trainees, setTrainees, sessions, setSessions }}
		>
			<Router>
				<Routes>
					<Route path='/' element={<WelcomePage></WelcomePage>} />
					{!user && <Route path='/login' element={<LoginPage></LoginPage>} />}
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
							element={
								<TraineesPage
									spinner={loading}
									setLoading={setLoading}
								></TraineesPage>
							}
						/>
					)}
					{user && (
						<Route
							path='/trainees/:name'
							element={
								<TraineePage
									spinner={loading}
									setLoading={setLoading}
								></TraineePage>
							}
						/>
					)}
					{user && (
						<Route
							path='/sessions'
							element={
								<SessionsPage
									spinner={loading}
									setLoading={setLoading}
									sessions={sessions}
									setSessions={setSessions}
								></SessionsPage>
							}
						/>
					)}
					<Route path='*' element={<NotFoundPage></NotFoundPage>} />
				</Routes>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
