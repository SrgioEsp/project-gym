import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TraineesPage from './pages/TraineesPage';
import { helpHttp } from './helpers/helpHttp';
import { urlTrainees } from './api/urls';
import NotFoundPage from './pages/NotFoundPage';
import TraineePage from './pages/TraineePage';

import './App.css';
import { AppContext } from './contexts/AppContext';

function App() {
	const [trainees, setTrainees] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		const getTrainees = async () => {
			try {
				const data = await helpHttp().get(urlTrainees);
				setTrainees(data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		getTrainees();
	}, []);

	return (
		<AppContext.Provider value={{ trainees, setTrainees }}>
			<p>Project GYM</p>
			<Router>
				<Routes>
					<Route path='/' element={<WelcomePage></WelcomePage>} />
					<Route path='/login' element={<LoginPage></LoginPage>} />
					<Route
						path='/home'
						element={<MainPage spinner={loading}></MainPage>}
					/>
					<Route
						path='/trainees'
						element={<TraineesPage spinner={loading}></TraineesPage>}
					/>
					<Route path='/trainees/new' element={<TraineePage></TraineePage>} />
					{/* <Route path='/trainees/:id' element={<TraineePage></TraineePage>} />F */}
					<Route path='*' element={<NotFoundPage></NotFoundPage>} />
				</Routes>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
