import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TraineesPage from './pages/TraineesPage';

function App() {
	return (
		<div>
			<p>Project GYM</p>
			<Router>
				<Routes>
					<Route path='/' element={<WelcomePage></WelcomePage>} />
					<Route path='/login' element={<LoginPage></LoginPage>} />
					<Route path='/home' element={<MainPage></MainPage>} />
					<Route path='/trainees' element={<TraineesPage></TraineesPage>} />
					<Route path='*' element={<MainPage></MainPage>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
