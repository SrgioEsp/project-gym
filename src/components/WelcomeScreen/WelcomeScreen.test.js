import { render, screen } from '@testing-library/react';
import WelcomeScreen from './WelcomeScreen';

test('renders learn react link', () => {
	render(<WelcomeScreen />);
	const linkElement = screen.getByText(/WelcomeScreen/i);
	expect(linkElement).toBeInTheDocument();
});
