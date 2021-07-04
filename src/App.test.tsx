import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const headerText = screen.getByText(/Rick And Morty/i);
  expect(headerText).toBeInTheDocument();
});
