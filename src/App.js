import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TraineesPage from './pages/TraineesPage';
import { helpHttp } from './helpers/helpHttp';
import { urlTrainees } from './api/urls';

import './App.css';
import NotFoundPage from './pages/NotFoundPage';

function App() {
	const [trainees, setTrainees] = useState([]);
	useEffect(() => {
		const getTrainees = async () => {
			try {
				const data = await helpHttp().get(urlTrainees);
				setTrainees(data);
			} catch (error) {
				console.log(error);
			}
		};
		getTrainees();
	}, []);

	return (
		<div>
			<p>Project GYM</p>
			<Router>
				<Routes>
					<Route path='/' element={<WelcomePage></WelcomePage>} />
					<Route path='/login' element={<LoginPage></LoginPage>} />
					<Route
						path='/home'
						element={<MainPage trainees={trainees}></MainPage>}
					/>
					<Route
						path='/trainees'
						element={<TraineesPage trainees={trainees}></TraineesPage>}
					/>
					<Route path='*' element={<NotFoundPage></NotFoundPage>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
