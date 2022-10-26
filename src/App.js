import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import LoginForm from './components/LoginForm/LoginForm';

function App() {
	return (
		<div>
			<p>Project GYM</p>
			<Router>
				<Routes>
					<Route path='/' element={<WelcomeScreen></WelcomeScreen>} />
					<Route path='/login' element={<LoginForm></LoginForm>} />
					<Route path='/home' element={'Home'} />
					<Route path='*' element={'Home'} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
