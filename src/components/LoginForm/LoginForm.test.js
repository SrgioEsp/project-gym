import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

test('renders learn react link', () => {
	render(<LoginForm />);
	const linkElement = screen.getByText(/LoginForm/i);
	expect(linkElement).toBeInTheDocument();
});
