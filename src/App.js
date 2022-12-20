import React, { useState, useEffect } from 'react';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TraineesPage from './pages/TraineesPage';
import NotFoundPage from './pages/NotFoundPage';
import TraineePage from './pages/TraineePage';
import SessionsPage from './pages/SessionsPage';
import TrainingPage from './pages/TrainingPage';
import Spinner from './components/Spinner';
import { AppContext } from './contexts/AppContext';
import { storage } from './storage';
import { getUserById } from './actions/UserActions';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
	const [user, setUser] = useState(null);
	const [trainees, setTrainees] = useState([]);
	const [sessions, setSessions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (storage.get('user_session')) {
			if (!user) {
				getUserById(
					storage.get('user_session').id,
					storage.get('user_session').token
				)
					.then((res) => {
						setUser(res);
						setLoading(false);
					})
					.catch(() => setLoading(false));
			}
		} else {
			setLoading(false);
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
					{user && <Route path='/home' element={<MainPage></MainPage>} />}
					{user && (
						<Route path='/trainees' element={<TraineesPage></TraineesPage>} />
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
									sessions={sessions}
									setSessions={setSessions}
								></SessionsPage>
							}
						/>
					)}
					{user && (
						<Route path='/training' element={<TrainingPage></TrainingPage>} />
					)}
					{!loading ? (
						<Route path='*' element={<NotFoundPage></NotFoundPage>} />
					) : (
						<Route path='*' element={<Spinner></Spinner>} />
					)}
				</Routes>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
