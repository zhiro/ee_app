import { render, screen, fireEvent } from '@testing-library/react';
import Consumption from './Consumption.jsx';

test('renders year navigation when logged in', () => {
    Storage.prototype.getItem = jest.fn(() => 'some-token');

    render(<Consumption />);

    expect(screen.getByText(/current year/i)).toBeInTheDocument();
});

test('shows "please log in" message when not logged in', () => {
    Storage.prototype.getItem = jest.fn(() => null);

    render(<Consumption />);

    expect(screen.getByText(/please log in to the portal first/i)).toBeInTheDocument();
});
